

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Formations from './pages/Formations';
import Admissions from './pages/Admissions';
import Recherche from './pages/Recherche';
import VieEtudiante from './pages/VieEtudiante';
import Actualites from './pages/Actualites';
import ActualiteDetail from './pages/ActualiteDetail';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import NewsManager from './pages/Admin/NewsManager';
import FormationsManager from './pages/Admin/FormationsManager';
import ApplicationsManager from './pages/Admin/ApplicationsManager';
import LeadsManager from './pages/Admin/LeadsManager';
import AdminLayout from './pages/Admin/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/recherche" element={<Recherche />} />
              <Route path="/vie-etudiante" element={<VieEtudiante />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/actualites/:id" element={<ActualiteDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="news" element={<NewsManager />} />
              <Route path="formations" element={<FormationsManager />} />
              <Route path="applications" element={<ApplicationsManager />} />
              <Route path="leads" element={<LeadsManager />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
