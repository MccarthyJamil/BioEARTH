import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSpecimens } from '../hooks/useSpecimens';
import SpecimenForm from '../components/admin/SpecimenForm';
import type { Specimen, SpecimenType } from '../types/supabase';
import { SPECIMEN_TYPE_LABELS, SPECIMEN_TYPE_ICONS } from '../types/supabase';
import { supabase } from '../lib/supabaseClient';

type View = 'list' | 'create' | 'edit';

const TYPE_TABS: { label: string; value: SpecimenType | undefined }[] = [
  { label: 'Todos',    value: undefined },
  { label: 'Insectos', value: 'insect' },
  { label: 'Plagas',   value: 'pest' },
  { label: 'Plantas',  value: 'plant' },
];

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const [view, setView] = useState<View>('list');
  const [editTarget, setEditTarget] = useState<Specimen | null>(null);
  const [activeType, setActiveType] = useState<SpecimenType | undefined>(undefined);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { specimens, loading, error, refetch } = useSpecimens({ type: activeType });

  const handleEdit = (specimen: Specimen) => {
    setEditTarget(specimen);
    setView('edit');
  };

  const handleDelete = async (id: string) => {
    await supabase.from('specimens').delete().eq('id', id);
    setDeleteConfirm(null);
    refetch();
  };

  const handleFormSuccess = () => {
    setView('list');
    setEditTarget(null);
    refetch();
  };

  return (
    <div className="min-h-screen bg-earth-50">

      {/* ── TOPBAR ──────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-earth-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-earth-600 rounded-lg flex items-center justify-center text-white text-sm">
                🌿
              </div>
              <div>
                <span className="font-semibold text-earth-900 text-sm">BioEARTH Admin</span>
                <span className="hidden sm:inline text-earth-400 text-xs ml-2">
                  {user?.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="btn-secondary text-xs py-1.5 px-3"
              >
                ← Ver catálogo
              </Link>
              <button
                onClick={signOut}
                className="text-xs text-earth-500 hover:text-red-600 px-2 py-1.5 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── HEADER DE SECCIÓN ─────────────────────────────────────────────── */}
        {view === 'list' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-earth-900">
                  Panel de administración
                </h1>
                <p className="text-sm text-earth-500 mt-0.5">
                  {specimens.length} especímenes registrados
                </p>
              </div>
              <button
                onClick={() => setView('create')}
                className="btn-primary flex items-center gap-2"
              >
                <span>+</span> Nuevo espécimen
              </button>
            </div>

            {/* Tabs de tipo */}
            <div className="flex gap-1 p-1 bg-earth-100 rounded-xl mb-6 w-fit">
              {TYPE_TABS.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveType(tab.value)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${activeType === tab.value
                      ? 'bg-white text-earth-800 shadow-sm'
                      : 'text-earth-500 hover:text-earth-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── TABLA ─────────────────────────────────────────────────────── */}
            {loading ? (
              <div className="flex items-center justify-center py-20 text-earth-500">
                <div className="w-6 h-6 border-3 border-earth-400 border-t-transparent rounded-full animate-spin mr-3" />
                Cargando...
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">
                <p>⚠️ {error}</p>
                <button onClick={refetch} className="btn-secondary mt-3 text-sm">
                  Reintentar
                </button>
              </div>
            ) : specimens.length === 0 ? (
              <div className="text-center py-20 text-earth-400">
                <p className="text-4xl mb-3">🔬</p>
                <p className="font-medium">No hay especímenes aún.</p>
                <button onClick={() => setView('create')} className="btn-primary mt-4 text-sm">
                  Crear el primero
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-earth-50 border-b border-earth-100 text-left">
                      <th className="px-4 py-3 text-earth-600 font-medium w-12">Tipo</th>
                      <th className="px-4 py-3 text-earth-600 font-medium">Nombre</th>
                      <th className="px-4 py-3 text-earth-600 font-medium hidden md:table-cell">Rol ecológico</th>
                      <th className="px-4 py-3 text-earth-600 font-medium hidden lg:table-cell">Peligro</th>
                      <th className="px-4 py-3 text-earth-600 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-50">
                    {specimens.map((s) => (
                      <tr key={s.id} className="hover:bg-earth-50 transition-colors">
                        <td className="px-4 py-3 text-center text-lg">
                          {SPECIMEN_TYPE_ICONS[s.type]}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-earth-900">{s.common_name}</p>
                          <p className="text-xs italic text-earth-400">{s.scientific_name}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="badge bg-purple-100 text-purple-700">{s.ecological_role}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-earth-600 text-xs">
                          {s.danger_level}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(s)}
                              className="text-xs text-earth-600 hover:text-earth-900 px-2 py-1 rounded hover:bg-earth-100 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(s.id)}
                              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── FORMULARIO CREAR / EDITAR ─────────────────────────────────────── */}
        {(view === 'create' || view === 'edit') && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-earth-900">
                  {view === 'edit'
                    ? `Editando: ${editTarget?.common_name}`
                    : 'Nuevo espécimen'}
                </h1>
                <p className="text-sm text-earth-500 mt-0.5">
                  {view === 'edit'
                    ? `${SPECIMEN_TYPE_LABELS[editTarget!.type]} · ${editTarget?.scientific_name}`
                    : 'Completa los campos para registrar un nuevo espécimen en el catálogo'}
                </p>
              </div>
              <button
                onClick={() => { setView('list'); setEditTarget(null); }}
                className="btn-secondary text-sm"
              >
                ← Volver
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
              <SpecimenForm
                editTarget={editTarget ?? undefined}
                onSuccess={handleFormSuccess}
                onCancel={() => { setView('list'); setEditTarget(null); }}
              />
            </div>
          </>
        )}

      </main>

      {/* ── MODAL DE CONFIRMACIÓN DE BORRADO ─────────────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-earth-900 mb-2">
              ¿Eliminar este espécimen?
            </h3>
            <p className="text-sm text-earth-600 mb-5">
              Esta acción no se puede deshacer. El registro se eliminará permanentemente de la base de datos.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
