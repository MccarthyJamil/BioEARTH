import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import type {
  Specimen,
  SpecimenInsert,
  SpecimenType,
  EcologicalRoleDB,
  DangerLevelDB,
  ConservationStatusDB,
} from '../../types/supabase';
import { SPECIMEN_TYPE_LABELS, SPECIMEN_TYPE_ICONS } from '../../types/supabase';
import { CAMPUS_LOCATIONS } from '../../data/insects';

// ─── Constantes de selects ────────────────────────────────────────────────────
const ECOLOGICAL_ROLES: EcologicalRoleDB[] = [
  'Polinizador',
  'Controlador Biológico',
  'Descomponedor',
  'Plaga Potencial',
  'Indicador Ambiental',
  'Polinizador y Descomponedor',
];

const DANGER_LEVELS: DangerLevelDB[] = [
  'Inofensivo',
  'Manipular con cuidado',
  'No manipular',
];

const CONSERVATION_STATUSES: ConservationStatusDB[] = [
  'Preocupación menor',
  'Casi amenazado',
  'Vulnerable',
  'En peligro',
  'Sin evaluación',
];

const ACTIVITY_PERIODS = ['Diurno', 'Nocturno', 'Crepuscular', 'Todo el día'];

// ─── Estado inicial del formulario ───────────────────────────────────────────
const EMPTY_FORM: Omit<SpecimenInsert, 'created_by'> = {
  type: 'insect',
  common_name: '',
  scientific_name: '',
  category: '',
  ecological_role: 'Polinizador',
  campus_location: [],
  description: '',
  detailed_info: '',
  fun_fact: '',
  image_url: null,
  danger_level: 'Inofensivo',
  conservation_status: 'Sin evaluación',
  activity_period: 'Diurno',
  size: '',
  flight_months: [],
  observation_count: 0,
  last_observed: null,
  inaturalist_link: '',
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface SpecimenFormProps {
  editTarget?: Specimen;            // si se provee, el form entra en modo edición
  onSuccess?: (saved: Specimen) => void;
  onCancel?: () => void;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function SpecimenForm({ editTarget, onSuccess, onCancel }: SpecimenFormProps) {
  const { user } = useAuth();
  const isEdit = Boolean(editTarget);

  const [form, setForm] = useState<Omit<SpecimenInsert, 'created_by'>>(
    editTarget
      ? {
          type: editTarget.type,
          common_name: editTarget.common_name,
          scientific_name: editTarget.scientific_name,
          category: editTarget.category,
          ecological_role: editTarget.ecological_role,
          campus_location: editTarget.campus_location,
          description: editTarget.description,
          detailed_info: editTarget.detailed_info ?? '',
          fun_fact: editTarget.fun_fact ?? '',
          image_url: editTarget.image_url,
          danger_level: editTarget.danger_level,
          conservation_status: editTarget.conservation_status,
          activity_period: editTarget.activity_period ?? 'Diurno',
          size: editTarget.size ?? '',
          flight_months: editTarget.flight_months ?? [],
          observation_count: editTarget.observation_count,
          last_observed: editTarget.last_observed,
          inaturalist_link: editTarget.inaturalist_link ?? '',
        }
      : EMPTY_FORM
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editTarget?.image_url ?? null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Handlers de campos simples ─────────────────────────────────────────────
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleLocationToggle = (loc: string) => {
    setForm((prev) => ({
      ...prev,
      campus_location: prev.campus_location.includes(loc)
        ? prev.campus_location.filter((l) => l !== loc)
        : [...prev.campus_location, loc],
    }));
  };

  // ─── Selección y preview de imagen ──────────────────────────────────────────
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG, WebP o GIF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5 MB.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  // ─── Subida de imagen al Storage de Supabase ────────────────────────────────
  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `${crypto.randomUUID()}.${ext}`;
    const path = `specimens/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('specimen-images')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('specimen-images')
      .getPublicUrl(path);

    setUploading(false);
    return data.publicUrl;
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      let imageUrl = form.image_url;

      // Si hay una imagen nueva, súbela primero
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload: SpecimenInsert = {
        ...form,
        image_url: imageUrl,
        created_by: user!.id,
        // Limpia strings vacíos a null
        detailed_info: form.detailed_info || null,
        fun_fact: form.fun_fact || null,
        size: form.size || null,
        inaturalist_link: form.inaturalist_link || null,
        activity_period: form.activity_period || null,
      };

      let result: Specimen | null = null;

      if (isEdit && editTarget) {
        // UPDATE
        const { data, error: dbError } = await supabase
          .from('specimens')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .update(payload as any)
          .eq('id', editTarget.id)
          .select()
          .single();

        if (dbError) throw dbError;
        result = data as Specimen;
      } else {
        // INSERT
        const { data, error: dbError } = await supabase
          .from('specimens')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insert(payload as any)
          .select()
          .single();

        if (dbError) throw dbError;
        result = data as Specimen;
      }

      setSuccess(true);
      // result no puede ser null aquí: si dbError fue truthy, throw ya salió del bloque
      onSuccess?.(result!);

      if (!isEdit) {
        setForm(EMPTY_FORM);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al guardar el espécimen.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  // ─── UI helpers ─────────────────────────────────────────────────────────────
  const labelClass = 'block text-sm font-medium text-earth-800 mb-1.5';
  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-earth-200 text-sm text-earth-900 ' +
    'placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent transition';
  const selectClass = inputClass + ' bg-white';

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">

      {/* ── TIPO DE ESPÉCIMEN ─────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-earth-900 mb-3 flex items-center gap-2">
          <span>📋</span> Tipo de espécimen
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(SPECIMEN_TYPE_LABELS) as SpecimenType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', t)}
              className={`flex flex-col items-center gap-1.5 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all
                ${form.type === t
                  ? 'border-earth-500 bg-earth-50 text-earth-800 shadow-sm'
                  : 'border-earth-200 bg-white text-earth-500 hover:border-earth-300'}`}
            >
              <span className="text-2xl">{SPECIMEN_TYPE_ICONS[t]}</span>
              {SPECIMEN_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </section>

      {/* ── IDENTIFICACIÓN ────────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-earth-900 mb-3 flex items-center gap-2">
          <span>🔬</span> Identificación taxonómica
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="common_name" className={labelClass}>Nombre común *</label>
            <input
              id="common_name"
              type="text"
              required
              value={form.common_name}
              onChange={(e) => set('common_name', e.target.value)}
              placeholder="Abeja Angelita"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="scientific_name" className={labelClass}>Nombre científico *</label>
            <input
              id="scientific_name"
              type="text"
              required
              value={form.scientific_name}
              onChange={(e) => set('scientific_name', e.target.value)}
              placeholder="Tetragonisca angustula"
              className={`${inputClass} italic`}
            />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Categoría *</label>
            <input
              id="category"
              type="text"
              required
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              placeholder="Abejas, Mariposas, Hongos..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="size" className={labelClass}>Tamaño</label>
            <input
              id="size"
              type="text"
              value={form.size ?? ''}
              onChange={(e) => set('size', e.target.value)}
              placeholder="4–5 mm"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ── IMAGEN ───────────────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-earth-900 mb-3 flex items-center gap-2">
          <span>📷</span> Fotografía
        </h3>
        <div className="flex gap-5 items-start">
          {/* Preview */}
          <div className="w-32 h-32 flex-shrink-0 rounded-xl bg-earth-100 border-2 border-dashed border-earth-300 overflow-hidden flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">🪲</span>
            )}
          </div>
          {/* Input */}
          <div className="flex-1">
            <label className={labelClass}>Subir imagen (JPG, PNG, WebP · máx. 5MB)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="block w-full text-sm text-earth-600 file:mr-3 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-medium
                         file:bg-earth-100 file:text-earth-700 hover:file:bg-earth-200
                         file:cursor-pointer cursor-pointer"
            />
            <p className="text-xs text-earth-400 mt-1.5">
              La imagen se subirá al Storage de Supabase al guardar el registro.
            </p>
            {uploading && (
              <p className="text-xs text-earth-500 mt-1 animate-pulse">⬆️ Subiendo imagen...</p>
            )}
          </div>
        </div>
      </section>

      {/* ── ECOLOGÍA ──────────────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-earth-900 mb-3 flex items-center gap-2">
          <span>🌱</span> Datos ecológicos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="ecological_role" className={labelClass}>Rol ecológico *</label>
            <select
              id="ecological_role"
              required
              value={form.ecological_role}
              onChange={(e) => set('ecological_role', e.target.value as EcologicalRoleDB)}
              className={selectClass}
            >
              {ECOLOGICAL_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="danger_level" className={labelClass}>Nivel de peligro *</label>
            <select
              id="danger_level"
              required
              value={form.danger_level}
              onChange={(e) => set('danger_level', e.target.value as DangerLevelDB)}
              className={selectClass}
            >
              {DANGER_LEVELS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="conservation_status" className={labelClass}>Estado de conservación</label>
            <select
              id="conservation_status"
              value={form.conservation_status}
              onChange={(e) => set('conservation_status', e.target.value as ConservationStatusDB)}
              className={selectClass}
            >
              {CONSERVATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="activity_period" className={labelClass}>Período de actividad</label>
            <select
              id="activity_period"
              value={form.activity_period ?? ''}
              onChange={(e) => set('activity_period', e.target.value)}
              className={selectClass}
            >
              {ACTIVITY_PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="last_observed" className={labelClass}>Última observación</label>
            <input
              id="last_observed"
              type="date"
              value={form.last_observed ?? ''}
              onChange={(e) => set('last_observed', e.target.value || null)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="observation_count" className={labelClass}>Nº de observaciones</label>
            <input
              id="observation_count"
              type="number"
              min={0}
              value={form.observation_count}
              onChange={(e) => set('observation_count', parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Campus locations (checkboxes) */}
        <div className="mt-4">
          <label className={labelClass}>Zonas del campus</label>
          <div className="flex flex-wrap gap-2">
            {CAMPUS_LOCATIONS.map((loc) => {
              const checked = form.campus_location.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocationToggle(loc)}
                  className={`badge text-xs px-3 py-1.5 border transition-all cursor-pointer
                    ${checked
                      ? 'bg-earth-600 text-white border-earth-600'
                      : 'bg-white text-earth-600 border-earth-300 hover:border-earth-500'}`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEXTOS ────────────────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-earth-900 mb-3 flex items-center gap-2">
          <span>📝</span> Descripción y contenido
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className={labelClass}>Descripción corta (tarjeta) *</label>
            <textarea
              id="description"
              required
              rows={2}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Resumen breve que aparece en la tarjeta del catálogo..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label htmlFor="detailed_info" className={labelClass}>
              Información detallada{' '}
              <span className="font-normal text-earth-400">(acepta Markdown)</span>
            </label>
            <textarea
              id="detailed_info"
              rows={6}
              value={form.detailed_info ?? ''}
              onChange={(e) => set('detailed_info', e.target.value)}
              placeholder="## Nombre de la especie&#10;&#10;Descripción extensa, biología, comportamiento..."
              className={`${inputClass} resize-y font-mono text-xs`}
            />
          </div>
          <div>
            <label htmlFor="fun_fact" className={labelClass}>Dato curioso ✨</label>
            <input
              id="fun_fact"
              type="text"
              value={form.fun_fact ?? ''}
              onChange={(e) => set('fun_fact', e.target.value)}
              placeholder="Hecho sorprendente que captura la atención del estudiante..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inaturalist_link" className={labelClass}>Enlace a iNaturalist</label>
            <input
              id="inaturalist_link"
              type="url"
              value={form.inaturalist_link ?? ''}
              onChange={(e) => set('inaturalist_link', e.target.value)}
              placeholder="https://www.inaturalist.org/taxa/..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ── FEEDBACK y BOTONES ────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5 flex-shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-earth-50 border border-earth-300 rounded-lg px-4 py-3 text-sm text-earth-700">
          <span>✅</span>
          <span>Espécimen guardado correctamente en la base de datos.</span>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-earth-100">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary text-sm">
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={saving || uploading || !form.common_name || !form.scientific_name || !form.description}
          className="btn-primary text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {(saving || uploading) && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isEdit ? 'Guardar cambios' : 'Crear espécimen'}
        </button>
      </div>

    </form>
  );
}
