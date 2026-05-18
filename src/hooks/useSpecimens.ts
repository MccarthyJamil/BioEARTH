import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Specimen, SpecimenType } from '../types/supabase';

interface UseSpecimensOptions {
  type?: SpecimenType;        // filtra por 'insect' | 'pest' | 'plant'
  search?: string;            // búsqueda por nombre
  ecologicalRole?: string;    // filtra por rol ecológico
  location?: string;          // filtra por ubicación en campus
}

interface UseSpecimensResult {
  specimens: Specimen[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSpecimens(options: UseSpecimensOptions = {}): UseSpecimensResult {
  const [specimens, setSpecimens] = useState<Specimen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecimens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('specimens')
        .select('*')
        .order('common_name', { ascending: true });

      if (options.type) {
        query = query.eq('type', options.type);
      }

      if (options.ecologicalRole) {
        query = query.eq('ecological_role', options.ecologicalRole);
      }

      // Búsqueda por texto parcial en nombre común o científico
      if (options.search?.trim()) {
        query = query.or(
          `common_name.ilike.%${options.search.trim()}%,` +
          `scientific_name.ilike.%${options.search.trim()}%`
        );
      }

      // Filtro por campus_location (array contains)
      if (options.location) {
        query = query.contains('campus_location', [options.location]);
      }

      const { data, error: dbError } = await query;

      if (dbError) throw dbError;
      setSpecimens(data ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [options.type, options.search, options.ecologicalRole, options.location]);

  useEffect(() => {
    fetchSpecimens();
  }, [fetchSpecimens]);

  return { specimens, loading, error, refetch: fetchSpecimens };
}
