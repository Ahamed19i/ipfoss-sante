import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Formations from './pages/Formations';
import Admissions from './pages/Admissions';
import Recherche from './pages/Recherche';
import VieEtudiante from './pages/VieEtudiante';
import Actualites from './pages/Actualites';
import Contact from './pages/Contact';
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
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/vie-etudiante" element={<VieEtudiante />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
