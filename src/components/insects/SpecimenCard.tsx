import { useState } from 'react';
import type { Specimen } from '../../types/supabase';
import { ROLE_BADGE, TYPE_CONFIG, PLACEHOLDER_GRADIENTS } from '../../utils/specimen';
import Badge from '../ui/Badge';

interface SpecimenCardProps {
  specimen: Specimen;
  onClick: (s: Specimen) => void;
}

export default function SpecimenCard({ specimen, onClick }: SpecimenCardProps) {
  const [imgError, setImgError] = useState(false);
  const role = ROLE_BADGE[specimen.ecological_role];
  const type = TYPE_CONFIG[specimen.type];
  const gradient = PLACEHOLDER_GRADIENTS[specimen.type];

  const visibleLocations = specimen.campus_location.slice(0, 1);
  const extraLocations = specimen.campus_location.length - 1;

  return (
    <article
      onClick={() => onClick(specimen)}
      className="card group cursor-pointer"
      role="button"
      aria-label={`Ver detalle de ${specimen.common_name}`}
    >
      {/* ── IMAGEN ─────────────────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
        {specimen.image_url && !imgError ? (
          <img
            src={specimen.image_url}
            alt={specimen.common_name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-5xl opacity-60">{type.icon}</span>
          </div>
        )}

        {/* Gradiente inferior sobre la imagen */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Badge de tipo (esquina superior izquierda) */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold text-white shadow-sm ${type.accent}`}>
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </span>
        </div>

        {/* Contador de observaciones (esquina superior derecha) */}
        {specimen.observation_count > 0 && (
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-black/40 text-white backdrop-blur-sm">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              {specimen.observation_count}
            </span>
          </div>
        )}
      </div>

      {/* ── CUERPO ─────────────────────────────────────────────────────────── */}
      <div className="p-4">
        {/* Nombres */}
        <h3 className="font-semibold text-earth-900 leading-snug group-hover:text-earth-700 transition-colors">
          {specimen.common_name}
        </h3>
        <p className="text-xs italic text-earth-400 mt-0.5 mb-3">
          {specimen.scientific_name}
        </p>

        {/* Ubicación */}
        {specimen.campus_location.length > 0 && (
          <div className="flex items-center gap-1 mb-3 min-w-0">
            <svg className="w-3.5 h-3.5 text-earth-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-xs text-earth-500 truncate">
              {visibleLocations.join(', ')}
              {extraLocations > 0 && (
                <span className="ml-1 text-earth-400 font-medium">+{extraLocations}</span>
              )}
            </span>
          </div>
        )}

        {/* Footer: rol ecológico + descripción breve */}
        <div className="flex items-start justify-between gap-2">
          <Badge bg={role.bg} text={role.text} dot={role.dot}>
            {specimen.ecological_role}
          </Badge>
        </div>

        {/* Descripción truncada */}
        <p className="text-xs text-earth-500 mt-2.5 line-clamp-2 leading-relaxed">
          {specimen.description}
        </p>
      </div>
    </article>
  );
}
