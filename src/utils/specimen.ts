import type { EcologicalRoleDB, DangerLevelDB, SpecimenType } from '../types/supabase';

export const ROLE_BADGE: Record<EcologicalRoleDB, { bg: string; text: string; dot: string }> = {
  'Polinizador':               { bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-400' },
  'Controlador Biológico':     { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-400'   },
  'Descomponedor':             { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400'  },
  'Plaga Potencial':           { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-400'    },
  'Indicador Ambiental':       { bg: 'bg-teal-100',   text: 'text-teal-700',   dot: 'bg-teal-400'   },
  'Polinizador y Descomponedor': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
};

export const DANGER_BADGE: Record<DangerLevelDB, { bg: string; text: string; icon: string }> = {
  'Inofensivo':             { bg: 'bg-earth-100', text: 'text-earth-700', icon: '✅' },
  'Manipular con cuidado':  { bg: 'bg-honey-300 bg-opacity-60', text: 'text-honey-700', icon: '⚠️' },
  'No manipular':           { bg: 'bg-red-100',   text: 'text-red-700',   icon: '🚫' },
};

export const TYPE_CONFIG: Record<SpecimenType, { label: string; icon: string; accent: string; tab: string }> = {
  insect: { label: 'Insecto', icon: '🐝', accent: 'bg-earth-600',  tab: 'text-earth-700 bg-earth-100' },
  pest:   { label: 'Plaga',   icon: '🐛', accent: 'bg-orange-500', tab: 'text-orange-700 bg-orange-100' },
  plant:  { label: 'Planta',  icon: '🌿', accent: 'bg-green-600',  tab: 'text-green-700 bg-green-100' },
};

export const PLACEHOLDER_GRADIENTS: Record<SpecimenType, string> = {
  insect: 'from-earth-200 to-earth-400',
  pest:   'from-orange-200 to-orange-400',
  plant:  'from-green-200 to-green-400',
};

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-CR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
