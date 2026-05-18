import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si ya tiene sesión, redirige directo al panel
  if (session) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(
        authError.includes('Invalid login')
          ? 'Correo o contraseña incorrectos.'
          : authError
      );
      setLoading(false);
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-earth-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md mx-auto mb-3">
            🌿
          </div>
          <h1 className="text-2xl font-display font-bold text-earth-900">BioEARTH Admin</h1>
          <p className="text-sm text-earth-500 mt-1">Acceso exclusivo para administradores</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-earth-800 mb-1.5">
                Correo institucional
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="profesor@earth.ac.cr"
                className="w-full px-3.5 py-2.5 rounded-lg border border-earth-200 text-sm text-earth-900 placeholder-earth-400
                           focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-earth-800 mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-earth-200 text-sm text-earth-900 placeholder-earth-400
                           focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3 text-sm text-red-700">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-earth-400 mt-6">
          ¿Necesitas acceso? Contacta al coordinador del proyecto BioEARTH.
        </p>
      </div>
    </div>
  );
}
