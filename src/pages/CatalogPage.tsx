import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpecimenType, Specimen } from '../types/supabase';
import { useSpecimens } from '../hooks/useSpecimens';
import SpecimenGrid from '../components/insects/SpecimenGrid';
import SpecimenModal from '../components/insects/SpecimenModal';

const TYPE_HERO: Record<string, { title: string; subtitle: string }> = {
  '':       { title: 'Biodiversidad de Guácimo',   subtitle: 'Explora todos los especímenes registrados en la zona' },
  insect:   { title: 'Insectos',         subtitle: 'Abejas, mariposas, escarabajos y más — los polinizadores y controladores de nuestro ecosistema' },
  pest:     { title: 'Plagas Identificadas',        subtitle: 'Especies con impacto negativo en cultivos y ecosistemas — monitoreo activo' },
  plant:    { title: 'Flora de la zona',            subtitle: 'Plantas hospederas, medicinales y estructurantes de los ecosistemas' },
};

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);

  const activeType = (searchParams.get('type') ?? '') as SpecimenType | '';
  const searchQuery = searchParams.get('q') ?? '';

  const { specimens, loading, error, refetch } = useSpecimens({
    type: activeType || undefined,
    search: searchQuery || undefined,
  });

  // Cerrar modal al cambiar filtros
  useEffect(() => {
    setSelectedSpecimen(null);
  }, [activeType, searchQuery]);

  const hero = TYPE_HERO[activeType] ?? TYPE_HERO[''];
  const hasFilters = Boolean(activeType || searchQuery);

  return (
    <main className="min-h-screen bg-earth-50">

      {/* ── HERO / HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-earth-900">
            {hero.title}
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-earth-500 max-w-2xl">
            {hero.subtitle}
          </p>

          {/* Chip de búsqueda activa */}
          {searchQuery && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-earth-600">Buscando:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                bg-earth-100 text-earth-700 font-medium">
                "{searchQuery}"
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── GRID ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SpecimenGrid
          specimens={specimens}
          loading={loading}
          error={error}
          onRetry={refetch}
          onCardClick={setSelectedSpecimen}
          totalLabel={
            !loading && !error
              ? `${specimens.length} ${specimens.length === 1 ? 'espécimen encontrado' : 'especímenes encontrados'}${hasFilters ? ' con los filtros aplicados' : ' en el catálogo'}`
              : undefined
          }
        />
      </section>

      {/* ── MODAL DE DETALLE ───────────────────────────────────────────────── */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
      />
    </main>
  );
}
