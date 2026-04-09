

import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { Shield, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-12 text-center"
        >
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Accès Refusé</h1>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Vous n'avez pas les permissions nécessaires pour accéder à l'espace administration. Veuillez contacter un administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
          <div className="space-y-4">
            <Link to="/" className="btn-primary w-full py-4 block">
              Retour à l'accueil
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full py-4 font-bold text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Se déconnecter
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
