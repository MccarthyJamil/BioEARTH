import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-earth-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-earth-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-earth-600 text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
