
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À Propos', path: '/a-propos' },
  { 
    name: 'Formations', 
    path: '/formations',
    dropdown: [
      { name: 'Sage-femme d’État (3 ans)', path: '/formations#sage-femme' },
      { name: 'Infirmier d’État (3 ans)', path: '/formations#infirmier' },
      { name: 'Assistant infirmier (2 ans)', path: '/formations#assistant-infirmier' },
      { name: 'Aide-soignant (2 ans)', path: '/formations#aide-soignant' },
      { name: 'Délégué médical (10 mois)', path: '/formations#delegue-medical' },
      { name: 'Vendeur en pharmacie (10 mois)', path: '/formations#vendeur-pharmacie' },
    ]
  },
  { 
    name: 'Programmes', 
    path: '/programmes',
    dropdown: [
      { name: 'Diplôme d’État', path: '/programmes#etat' },
      { name: 'Diplôme d’école', path: '/programmes#ecole' },
      { name: 'Formations courtes', path: '/programmes#courtes' },
    ]
  },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Recherche', path: '/recherche' },
  { name: 'Vie Étudiante', path: '/vie-etudiante' },
  { name: 'Actualités', path: '/actualites' },
  { name: 'Contact', path: '/contact' },
];

const searchableItems = [
  { title: 'Soins Infirmiers', category: 'Formation', path: '/formations#infirmiers', description: 'Licence d\'État en soins infirmiers' },
  { title: 'Santé Publique', category: 'Formation', path: '/formations#sante-publique', description: 'Master en santé publique et gestion' },
  { title: 'Sciences Biomédicales', category: 'Formation', path: '/formations#biomedecine', description: 'Technicien supérieur de laboratoire' },
  { title: 'Procédure d\'admission', category: 'Admissions', path: '/admissions', description: 'Comment s\'inscrire à l\'IPFOSS' },
  { title: 'Frais de scolarité', category: 'Admissions', path: '/admissions#frais', description: 'Tarifs et bourses d\'études' },
  { title: 'Bourses d\'excellence', category: 'Admissions', path: '/admissions#frais', description: 'Aides financières pour les étudiants' },
  { title: 'Recherche & Innovation', category: 'Recherche', path: '/recherche', description: 'Nos projets scientifiques' },
  { title: 'Vie étudiante', category: 'Campus', path: '/vie-etudiante', description: 'Clubs, associations et vie sur le campus' },
  { title: 'Actualités', category: 'News', path: '/actualites', description: 'Derniers événements et annonces' },
  { title: 'Contactez-nous', category: 'Support', path: '/contact', description: 'Nous trouver à Dakar' },
  { title: 'Mot du Directeur', category: 'À Propos', path: '/a-propos#directeur', description: 'Message du Dr. Cheikh Saadbou Diop' },
  { title: 'Mission et Vision', category: 'À Propos', path: '/a-propos#vision', description: 'Nos valeurs et objectifs' },
  { title: 'Programmes & Diplômes', category: 'Études', path: '/programmes', description: 'Types de diplômes et certifications' },
  { title: 'Diplôme d’État', category: 'Études', path: '/programmes#etat', description: 'Formations accréditées par l’État' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : searchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-gradient-to-b from-black/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-medical-blue p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-medical-blue/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-2xl leading-none tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              IPFOSS
            </span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-medical-blue' : 'text-white/90'}`}>
              École de Santé
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group py-2">
              <Link
                to={link.path}
                className={`text-[13px] xl:text-sm font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  location.pathname === link.path 
                    ? (scrolled ? 'text-medical-blue' : 'text-white') 
                    : (scrolled ? 'text-gray-600 hover:text-primary-red' : 'text-white/80 hover:text-white')
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${scrolled ? 'bg-medical-blue' : 'bg-white'}`}
                  />
                )}
              </Link>

              {link.dropdown && (
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white shadow-2xl rounded-2xl py-4 min-w-[280px] border border-gray-100 overflow-hidden">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-6 py-3 text-sm font-medium text-gray-600 hover:text-primary-red hover:bg-gray-50 transition-colors text-left"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`p-2 rounded-full transition-all ${scrolled ? 'text-gray-500 hover:bg-gray-100 hover:text-medical-blue' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/admissions#formulaire" className={`btn-primary py-2 px-4 xl:py-2.5 xl:px-6 text-[13px] xl:text-sm ${!scrolled && 'bg-white text-medical-blue hover:bg-gray-100 border-none shadow-xl shadow-black/20'}`}>
            Candidater
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`p-2 ${scrolled ? 'text-medical-blue' : 'text-white'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className={`p-2 ${scrolled ? 'text-medical-blue' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/98 backdrop-blur-xl p-6 flex flex-col items-center pt-24"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="w-full max-w-3xl">
              <div className="relative mb-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-medical-blue w-8 h-8" />
                <input
                  ref={searchInputRef}
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Que recherchez-vous ?"
                  className="w-full bg-white rounded-2xl py-8 pl-18 pr-8 text-2xl text-gray-900 placeholder:text-gray-400 shadow-2xl focus:outline-none focus:ring-4 focus:ring-medical-blue/30 transition-all"
                />
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {filteredResults.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredResults.map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          navigate(result.path);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-medical-blue/20 rounded-xl flex items-center justify-center text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-health-green uppercase tracking-widest mb-1 block">
                              {result.category}
                            </span>
                            <h4 className="text-white text-lg font-display font-bold">{result.title}</h4>
                            {'description' in result && (
                              <p className="text-white/50 text-sm mt-1">{result.description as string}</p>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" />
                      </motion.div>
                    ))}
                  </div>
                ) : searchQuery.trim() !== '' ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-white/20" />
                    </div>
                    <p className="text-white/50 text-xl">Aucun résultat pour "<span className="text-white">{searchQuery}</span>"</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-medical-blue hover:underline font-bold"
                    >
                      Effacer la recherche
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-8 text-center">Suggestions populaires</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Infirmiers', 'Admissions', 'Bourses', 'Contact'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-medical-blue hover:text-white hover:border-medical-blue transition-all text-sm font-bold"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="bg-medical-blue p-2 rounded-lg">
                  <GraduationCap className="text-white w-6 h-6" />
                </div>
                <span className="font-display font-bold text-xl text-medical-blue">IPFOSS</span>
              </Link>
              <button
                className="p-2 text-medical-blue hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <div key={link.path}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-2xl font-display font-bold transition-colors ${
                          location.pathname === link.path ? 'text-medical-blue' : 'text-gray-400 hover:text-medical-blue'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                        <button 
                          onClick={() => setExpandedMobile(expandedMobile === link.name ? null : link.name)}
                          className="p-2 text-gray-400"
                        >
                          <ChevronDown className={`w-6 h-6 transition-transform ${expandedMobile === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {link.dropdown && expandedMobile === link.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-4 mt-4 pl-4 border-l-2 border-gray-100"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className="text-lg font-medium text-gray-500 hover:text-medical-blue"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-col gap-4">
                <Link 
                  to="/admissions#formulaire" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-medical-blue text-white rounded-2xl font-bold text-center shadow-xl shadow-medical-blue/20"
                >
                  Déposer ma candidature
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-bold text-center"
                >
                  Prendre rendez-vous
                </Link>
              </div>
              <p className="mt-8 text-center text-gray-400 text-sm font-medium">
                © 2026 IPFOSS École de Santé. Tous droits réservés.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
