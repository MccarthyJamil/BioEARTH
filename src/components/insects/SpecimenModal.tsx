import { useEffect, useState } from 'react';
import type { Specimen } from '../../types/supabase';
import { ROLE_BADGE, DANGER_BADGE, TYPE_CONFIG, PLACEHOLDER_GRADIENTS, formatDate } from '../../utils/specimen';
import Badge from '../ui/Badge';

interface SpecimenModalProps {
  specimen: Specimen | null;
  onClose: () => void;
}

export default function SpecimenModal({ specimen, onClose }: SpecimenModalProps) {
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  // Animación de entrada / salida
  useEffect(() => {
    if (specimen) {
      setImgError(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [specimen]);

  // Cerrar con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = specimen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [specimen]);

  if (!specimen) return null;

  const role    = ROLE_BADGE[specimen.ecological_role];
  const danger  = DANGER_BADGE[specimen.danger_level];
  const type    = TYPE_CONFIG[specimen.type];
  const gradient = PLACEHOLDER_GRADIENTS[specimen.type];

  return (
    /* ── BACKDROP ──────────────────────────────────────────────────────── */
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4 transition-all duration-300 ${
        visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* ── PANEL ────────────────────────────────────────────────────────── */}
      <div
        className={`relative bg-white w-full sm:max-w-2xl sm:rounded-2xl overflow-hidden shadow-2xl
          transition-transform duration-300 ease-out max-h-[92vh] sm:max-h-[88vh] flex flex-col
          ${visible ? 'translate-y-0 sm:scale-100 opacity-100' : 'translate-y-8 sm:scale-95 opacity-0'}`}
      >
        {/* Barra superior móvil (indicador de arrastre) */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-earth-200 rounded-full" />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center
            bg-white/80 hover:bg-white backdrop-blur rounded-full shadow-md text-earth-600
            hover:text-earth-900 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto flex-1">

          {/* ── IMAGEN ─────────────────────────────────────────────────── */}
          <div className="relative aspect-video bg-earth-100 flex-shrink-0">
            {specimen.image_url && !imgError ? (
              <img
                src={specimen.image_url}
                alt={specimen.common_name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-7xl opacity-50">{type.icon}</span>
              </div>
            )}
            {/* Gradiente de texto sobre imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Nombres sobre imagen */}
            <div className="absolute bottom-4 left-5 right-12">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight drop-shadow">
                {specimen.common_name}
              </h2>
              <p className="text-sm italic text-white/80 mt-0.5 drop-shadow">
                {specimen.scientific_name}
              </p>
            </div>
          </div>

          {/* ── CUERPO ─────────────────────────────────────────────────── */}
          <div className="p-5 sm:p-6 space-y-5">

            {/* Badges de clasificación */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${type.accent}`}>
                {type.icon} {type.label}
              </span>
              <Badge bg={role.bg} text={role.text} dot={role.dot}>
                {specimen.ecological_role}
              </Badge>
              <Badge bg={danger.bg} text={danger.text}>
                {danger.icon} {specimen.danger_level}
              </Badge>
              {specimen.conservation_status !== 'Sin evaluación' && (
                <Badge bg="bg-gray-100" text="text-gray-600">
                  🛡 {specimen.conservation_status}
                </Badge>
              )}
            </div>

            {/* Dato curioso */}
            {specimen.fun_fact && (
              <div className="bg-honey-300 bg-opacity-20 border border-honey-300 rounded-xl px-4 py-3.5">
                <p className="text-xs font-semibold text-honey-700 uppercase tracking-wide mb-1">✨ Dato curioso</p>
                <p className="text-sm text-earth-800 leading-relaxed">{specimen.fun_fact}</p>
              </div>
            )}

            {/* Descripción */}
            <div>
              <h4 className="text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Descripción</h4>
              <p className="text-sm text-earth-700 leading-relaxed">{specimen.description}</p>
            </div>

            {/* Info detallada */}
            {specimen.detailed_info && (
              <div>
                <h4 className="text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Información detallada</h4>
                <div className="text-sm text-earth-700 leading-relaxed whitespace-pre-wrap bg-earth-50 rounded-xl px-4 py-3.5">
                  {specimen.detailed_info}
                </div>
              </div>
            )}

            {/* Metadatos en grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '📍', label: 'Ubicación', value: specimen.campus_location.join(' · ') || '—' },
                { icon: '📅', label: 'Última observación', value: formatDate(specimen.last_observed) },
                { icon: '📏', label: 'Tamaño', value: specimen.size || '—' },
                { icon: '☀️', label: 'Actividad', value: specimen.activity_period || '—' },
              ].map((m) => (
                <div key={m.label} className="bg-earth-50 rounded-xl px-3 py-3">
                  <p className="text-lg mb-0.5">{m.icon}</p>
                  <p className="text-[10px] text-earth-400 font-medium uppercase tracking-wide">{m.label}</p>
                  <p className="text-xs text-earth-700 font-medium leading-snug mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Enlace iNaturalist */}
            {specimen.inaturalist_link && (
              <a
                href={specimen.inaturalist_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-earth-200
                  hover:border-earth-400 hover:bg-earth-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#74AC00] rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    iN
                  </div>
                  <div>
                    <p className="text-sm font-medium text-earth-800">Ver en iNaturalist</p>
                    <p className="text-xs text-earth-400">Base de datos global de biodiversidad</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-earth-400 group-hover:text-earth-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
