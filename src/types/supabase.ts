// Tipos que reflejan exactamente el schema de Supabase.
// Si en el futuro usas `supabase gen types typescript`, este
// archivo se reemplaza por el generado automáticamente.

export type SpecimenType = 'insect' | 'pest' | 'plant';

export type EcologicalRoleDB =
  | 'Polinizador'
  | 'Controlador Biológico'
  | 'Descomponedor'
  | 'Plaga Potencial'
  | 'Indicador Ambiental'
  | 'Polinizador y Descomponedor';

export type DangerLevelDB =
  | 'Inofensivo'
  | 'Manipular con cuidado'
  | 'No manipular';

export type ConservationStatusDB =
  | 'Preocupación menor'
  | 'Casi amenazado'
  | 'Vulnerable'
  | 'En peligro'
  | 'Sin evaluación';

export interface Specimen {
  id: string;
  type: SpecimenType;
  common_name: string;
  scientific_name: string;
  category: string;
  ecological_role: EcologicalRoleDB;
  campus_location: string[];
  description: string;
  detailed_info: string | null;
  fun_fact: string | null;
  image_url: string | null;
  danger_level: DangerLevelDB;
  conservation_status: ConservationStatusDB;
  activity_period: string | null;
  size: string | null;
  flight_months: number[] | null;
  observation_count: number;
  last_observed: string | null;
  inaturalist_link: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Tipo para INSERT/UPDATE (omite campos generados por el servidor)
export type SpecimenInsert = Omit<Specimen, 'id' | 'created_at' | 'updated_at'>;
export type SpecimenUpdate = Partial<SpecimenInsert>;

// Referencia del schema para uso interno (tipado manual de resultados).
// No se usa como genérico en createClient — ver src/lib/supabaseClient.ts.
export interface Database {
  public: {
    Tables: {
      specimens: {
        Row: Specimen;
        Insert: SpecimenInsert;
        Update: SpecimenUpdate;
      };
    };
  };
}

// Etiquetas legibles para el dropdown de tipo
export const SPECIMEN_TYPE_LABELS: Record<SpecimenType, string> = {
  insect: 'Insecto',
  pest:   'Plaga',
  plant:  'Planta',
};

export const SPECIMEN_TYPE_ICONS: Record<SpecimenType, string> = {
  insect: '🐝',
  pest:   '🐛',
  plant:  '🌿',
};
