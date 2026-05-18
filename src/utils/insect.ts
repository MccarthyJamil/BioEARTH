import type { DangerLevel, EcologicalRole, InsectCategory } from '../types/insect';

export const DANGER_COLORS: Record<DangerLevel, string> = {
  'Inofensivo': 'bg-earth-100 text-earth-800',
  'Manipular con cuidado': 'bg-honey-300 text-honey-700',
  'No manipular': 'bg-red-100 text-red-700',
};

export const ROLE_COLORS: Record<EcologicalRole, string> = {
  'Polinizador': 'bg-purple-100 text-purple-700',
  'Controlador Biológico': 'bg-blue-100 text-blue-700',
  'Descomponedor': 'bg-amber-100 text-amber-700',
  'Plaga Potencial': 'bg-red-100 text-red-600',
  'Indicador Ambiental': 'bg-teal-100 text-teal-700',
  'Polinizador y Descomponedor': 'bg-violet-100 text-violet-700',
};

export const CATEGORY_ICONS: Record<InsectCategory, string> = {
  'Abejas': '🐝',
  'Avispas': '🪲',
  'Escarabajos': '🪳',
  'Mariposas': '🦋',
  'Polillas': '🦗',
  'Hormigas': '🐜',
  'Moscas': '🪰',
  'Libélulas': '🫧',
};

export const MONTH_NAMES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

export function formatLastObserved(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
