import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ── Catálogo público ─────────────────────────────────────────── */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-earth-50">
                <Navbar />
                <CatalogPage />
              </div>
            }
          />

          {/* ── Login de administrador ───────────────────────────────────── */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ── Panel de admin (ruta protegida) ─────────────────────────── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* ── 404 ─────────────────────────────────────────────────────── */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-earth-50 flex items-center justify-center text-earth-500">
                <div className="text-center">
                  <p className="text-6xl mb-4">🍃</p>
                  <p className="text-xl font-semibold text-earth-700">Página no encontrada</p>
                  <a href="/" className="btn-primary mt-5 inline-block text-sm">
                    Volver al catálogo
                  </a>
                </div>
              </div>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
