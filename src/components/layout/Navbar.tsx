import { useState, type FormEvent } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { SpecimenType } from '../../types/supabase';

const TYPE_TABS: { label: string; icon: string; value: SpecimenType | '' }[] = [
  { label: 'Todos',    icon: '🌍', value: '' },
  { label: 'Insectos', icon: '🐝', value: 'insect' },
  { label: 'Plagas',   icon: '🐛', value: 'pest' },
  { label: 'Plantas',  icon: '🌿', value: 'plant' },
];

export default function Navbar() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const activeType = searchParams.get('type') ?? '';

  const buildUrl = (type: string, q: string) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (q.trim()) params.set('q', q.trim());
    return `/?${params.toString()}`;
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(buildUrl(activeType, searchInput));
  };

  const handleTabClick = (value: string) => {
    navigate(buildUrl(value, searchInput));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* ── FILA PRINCIPAL ────────────────────────────────────────────────── */}
      <div className="border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-earth-600 rounded-xl flex items-center justify-center
                text-white shadow-sm group-hover:bg-earth-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-11 4" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="block text-[15px] font-bold text-earth-900 leading-none tracking-tight">
                  BioEARTH
                </span>
                <span className="block text-[10px] text-earth-400 leading-none mt-0.5 font-medium uppercase tracking-wider">
                  Catálogo · Campus Guácimo
                </span>
              </div>
            </Link>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400 pointer-events-none"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Buscar por nombre común o científico..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-earth-200 text-sm text-earth-900
                    placeholder-earth-400 bg-earth-50 focus:bg-white
                    focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent transition"
                />
              </div>
            </form>

            {/* Acciones (derecha) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {session ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg
                    bg-earth-600 text-white hover:bg-earth-700 transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg
                    border border-earth-300 text-earth-700 hover:bg-earth-50 hover:border-earth-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILA DE CATEGORÍAS ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5">
            {TYPE_TABS.map((tab) => {
              const isActive = activeType === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabClick(tab.value)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
                    whitespace-nowrap flex-shrink-0 transition-all duration-200
                    ${isActive
                      ? 'bg-earth-700 text-white shadow-sm'
                      : 'text-earth-600 hover:bg-earth-100 hover:text-earth-800'
                    }`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}

            {/* Separador */}
            <div className="w-px h-5 bg-earth-200 mx-1 flex-shrink-0" />

            {/* Conteo de resultados visible solo en la barra, en sm+ */}
            <span className="hidden sm:block text-xs text-earth-400 pl-1 flex-shrink-0">
              Universidad EARTH · Campus Guácimo, Limón
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
