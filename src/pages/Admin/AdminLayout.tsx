
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, LogOut, Globe, Menu, X, GraduationCap, UserCheck, Shield, History } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
  { icon: Newspaper, label: 'Actualités', path: '/admin/news' },
  { icon: GraduationCap, label: 'Formations', path: '/admin/formations' },
  { icon: Users, label: 'Candidatures', path: '/admin/applications' },
  { icon: UserCheck, label: 'Leads (Prospects)', path: '/admin/leads' },
  { icon: Shield, label: 'Administrateurs', path: '/admin/managers' },
  { icon: History, label: 'Audit Logs', path: '/admin/logs' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-medical-blue rounded-xl flex items-center justify-center text-white">
            <Globe className="w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold text-gray-900">IPFOSS Admin</span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-medical-blue'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[15px]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-100 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 hover:text-medical-blue transition-all">
            <Globe className="w-5 h-5" />
            <span className="text-[15px]">Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[15px]">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center text-white">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-gray-900">IPFOSS Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 bg-white pt-20 p-6 flex flex-col"
          >
            <nav className="flex-grow space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg ${
                    location.pathname === item.path
                      ? 'bg-medical-blue text-white'
                      : 'text-gray-500'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-4 pt-8 border-t border-gray-100">
              <Link to="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg text-gray-500">
                <Globe className="w-6 h-6" />
                Voir le site
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg text-red-500"
              >
                <LogOut className="w-6 h-6" />
                Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
