export type InsectCategory =
  | 'Abejas'
  | 'Avispas'
  | 'Escarabajos'
  | 'Mariposas'
  | 'Polillas'
  | 'Hormigas'
  | 'Moscas'
  | 'Libélulas';

export type EcologicalRole =
  | 'Polinizador'
  | 'Controlador Biológico'
  | 'Descomponedor'
  | 'Plaga Potencial'
  | 'Indicador Ambiental'
  | 'Polinizador y Descomponedor';

export type DangerLevel =
  | 'Inofensivo'
  | 'Manipular con cuidado'
  | 'No manipular';

export type ConservationStatus =
  | 'Preocupación menor'
  | 'Casi amenazado'
  | 'Vulnerable'
  | 'En peligro'
  | 'Sin evaluación';

export interface Insect {
  id: string;
  commonName: string;
  scientificName: string;
  category: InsectCategory;
  ecologicalRole: EcologicalRole;
  campusLocation: string[];
  description: string;
  detailedInfo: string;
  funFact: string;
  imageUrl: string;
  dangerLevel: DangerLevel;
  conservationStatus: ConservationStatus;
  activityPeriod: 'Diurno' | 'Nocturno' | 'Crepuscular' | 'Todo el día';
  size: string;
  flightMonths: number[];
  observationCount: number;
  lastObserved: string;
  iNaturalistLink?: string;
}

export type FilterCategory = InsectCategory | 'Todas';
export type FilterRole = EcologicalRole | 'Todos';
export type SortOption = 'name' | 'recent' | 'observations' | 'category';

export interface InsectFilters {
  search: string;
  category: FilterCategory;
  ecologicalRole: FilterRole;
  dangerLevel: DangerLevel | 'Todos';
  campusLocation: string;
  sortBy: SortOption;
}
