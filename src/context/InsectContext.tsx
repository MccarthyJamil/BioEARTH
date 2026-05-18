import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { insects } from '../data/insects';
import type { Insect, InsectFilters } from '../types/insect';

const DEFAULT_FILTERS: InsectFilters = {
  search: '',
  category: 'Todas',
  ecologicalRole: 'Todos',
  dangerLevel: 'Todos',
  campusLocation: 'Todas las zonas',
  sortBy: 'name',
};

interface InsectContextValue {
  allInsects: Insect[];
  filteredInsects: Insect[];
  filters: InsectFilters;
  setFilters: (filters: Partial<InsectFilters>) => void;
  resetFilters: () => void;
  selectedInsect: Insect | null;
  setSelectedInsect: (insect: Insect | null) => void;
}

const InsectContext = createContext<InsectContextValue | null>(null);

export function InsectProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<InsectFilters>(DEFAULT_FILTERS);
  const [selectedInsect, setSelectedInsect] = useState<Insect | null>(null);

  const setFilters = (partial: Partial<InsectFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => setFiltersState(DEFAULT_FILTERS);

  const filteredInsects = useMemo(() => {
    let result = [...insects];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.commonName.toLowerCase().includes(q) ||
          i.scientificName.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'Todas') {
      result = result.filter((i) => i.category === filters.category);
    }

    if (filters.ecologicalRole !== 'Todos') {
      result = result.filter((i) => i.ecologicalRole === filters.ecologicalRole);
    }

    if (filters.dangerLevel !== 'Todos') {
      result = result.filter((i) => i.dangerLevel === filters.dangerLevel);
    }

    if (filters.campusLocation !== 'Todas las zonas') {
      result = result.filter((i) =>
        i.campusLocation.includes(filters.campusLocation)
      );
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.commonName.localeCompare(b.commonName);
        case 'recent':
          return new Date(b.lastObserved).getTime() - new Date(a.lastObserved).getTime();
        case 'observations':
          return b.observationCount - a.observationCount;
        case 'category':
          return a.category.localeCompare(b.category) || a.commonName.localeCompare(b.commonName);
        default:
          return 0;
      }
    });

    return result;
  }, [filters]);

  return (
    <InsectContext.Provider
      value={{
        allInsects: insects,
        filteredInsects,
        filters,
        setFilters,
        resetFilters,
        selectedInsect,
        setSelectedInsect,
      }}
    >
      {children}
    </InsectContext.Provider>
  );
}

export function useInsects() {
  const ctx = useContext(InsectContext);
  if (!ctx) throw new Error('useInsects must be used within InsectProvider');
  return ctx;
}
