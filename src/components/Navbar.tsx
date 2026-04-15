
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À Propos', path: '/a-propos' },
  { 
    name: 'Formations', 
    path: '/formations',
    dropdown: [
      { name: 'Formations de 3 ans', path: '/formations#3-ans' },
      { name: 'Formations de 2 ans', path: '/formations#2-ans' },
      { name: 'Moins d\'un an', path: '/formations#moins-1-an' },
    ]
  },
  { 
    name: 'Programmes', 
    path: '/programmes',
    megaMenu: [
      {
        title: 'Formations de 3 ans',
        items: [
          { name: 'Sage-femme d’État', path: '/programmes#3-ans' },
          { name: 'Infirmier d’État', path: '/programmes#3-ans' },
        ]
      },
      {
        title: 'Formations de 2 ans',
        items: [
          { name: 'Assistant infirmier', path: '/programmes#2-ans' },
          { name: 'Aide-soignant', path: '/programmes#2-ans' },
        ]
      },
      {
        title: 'Moins d\'un an',
        items: [
          { name: 'Délégué médical', path: '/programmes#moins-1-an' },
          { name: 'Vendeur en pharmacie', path: '/programmes#moins-1-an' },
        ]
      }
    ]
  },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Vie Étudiante', path: '/vie-etudiante' },
  { name: 'Actualités', path: '/actualites' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
                {(link.dropdown || link.megaMenu) && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
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

              {link.megaMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white shadow-2xl rounded-[2rem] p-8 min-w-[700px] border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-3 gap-8">
                      {link.megaMenu.map((column, idx) => (
                        <div key={idx} className="space-y-4">
                          <h4 className="text-[10px] font-bold text-medical-blue uppercase tracking-[0.2em] border-b border-gray-100 pb-2">
                            {column.title}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {column.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="text-sm font-bold text-gray-600 hover:text-primary-red transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link to="/admissions#formulaire" className={`btn-primary py-2 px-4 xl:py-2.5 xl:px-6 text-[13px] xl:text-sm ${!scrolled && 'bg-white text-medical-blue hover:bg-gray-100 border-none shadow-xl shadow-black/20'}`}>
            Candidater
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            className={`p-2 ${scrolled ? 'text-medical-blue' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
                      {(link.dropdown || link.megaMenu) && (
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
                      {link.megaMenu && expandedMobile === link.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-6 mt-4 pl-4 border-l-2 border-gray-100"
                        >
                          {link.megaMenu.map((column, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="text-[10px] font-bold text-medical-blue uppercase tracking-widest">{column.title}</h4>
                              <div className="flex flex-col gap-3">
                                {column.items.map((item) => (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-gray-600 hover:text-medical-blue"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
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
