import type { Specimen } from '../../types/supabase';
import SpecimenCard from './SpecimenCard';

// ── Skeleton de carga ─────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
      <div className="aspect-[4/3] bg-earth-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 bg-earth-100 rounded w-3/4" />
        <div className="h-3 bg-earth-100 rounded w-1/2" />
        <div className="h-3 bg-earth-100 rounded w-2/3 mt-1" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 bg-earth-100 rounded-full w-24" />
        </div>
        <div className="h-3 bg-earth-100 rounded w-full" />
        <div className="h-3 bg-earth-100 rounded w-4/5" />
      </div>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface SpecimenGridProps {
  specimens: Specimen[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onCardClick: (s: Specimen) => void;
  totalLabel?: string;
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function SpecimenGrid({
  specimens,
  loading,
  error,
  onRetry,
  onCardClick,
  totalLabel,
}: SpecimenGridProps) {

  // Estado de carga: 8 skeletons
  if (loading) {
    return (
      <div>
        {totalLabel && (
          <div className="h-5 w-40 bg-earth-100 rounded animate-pulse mb-5" />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <p className="text-lg font-semibold text-earth-800">No se pudo cargar el catálogo</p>
        <p className="text-sm text-earth-500 mt-1 mb-5 max-w-sm">{error}</p>
        <button onClick={onRetry} className="btn-primary text-sm">
          Reintentar
        </button>
      </div>
    );
  }

  // Estado vacío
  if (specimens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-semibold text-earth-800">Sin resultados</p>
        <p className="text-sm text-earth-500 mt-1">
          No encontramos especímenes con esos criterios de búsqueda.
        </p>
      </div>
    );
  }

  // Grid de tarjetas
  return (
    <div>
      {totalLabel && (
        <p className="text-sm text-earth-500 mb-5">
          {totalLabel}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {specimens.map((s) => (
          <SpecimenCard key={s.id} specimen={s} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
