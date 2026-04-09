

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, X, Save, Image as ImageIcon, Calendar, Tag, User } from 'lucide-react';
import { logAction } from '../../lib/audit';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: any;
  category: string;
  author: string;
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Formation',
    author: 'Administration IPFOSS',
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const q = query(collection(db, 'news'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      setNews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem)));
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'news', editingItem.id), {
          ...formData,
          date: editingItem.date, // Keep original date or update to now?
        });
        await logAction('UPDATE', 'NEWS', `Updated news article: ${formData.title}`);
      } else {
        await addDoc(collection(db, 'news'), {
          ...formData,
          date: Timestamp.now(),
        });
        await logAction('CREATE', 'NEWS', `Created news article: ${formData.title}`);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ title: '', excerpt: '', content: '', image: '', category: 'Formation', author: 'Administration IPFOSS' });
      fetchNews();
    } catch (err) {
      console.error("Error saving news:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const item = news.find(n => n.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await deleteDoc(doc(db, 'news', id));
        await logAction('DELETE', 'NEWS', `Deleted news article: ${item?.title || id}`);
        fetchNews();
      } catch (err) {
        console.error("Error deleting news:", err);
      }
    }
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      category: item.category,
      author: item.author,
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Gestion des Actualités</h1>
          <p className="text-gray-500">Publiez et modifiez les articles du site.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', excerpt: '', content: '', image: '', category: 'Formation', author: 'Administration IPFOSS' });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2 px-8 py-4 self-start"
        >
          <Plus className="w-5 h-5" /> Nouvel Article
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {news.map((item) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.image || "https://picsum.photos/seed/medical/800/600"} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-medical-blue uppercase tracking-widest shadow-lg">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{item.excerpt}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.date?.toDate ? item.date.toDate().toLocaleDateString() : "Date inconnue"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {editingItem ? "Modifier l'article" : "Nouvel Article"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Titre</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                      placeholder="Titre de l'article"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                    >
                      <option value="Formation">Formation</option>
                      <option value="Événement">Événement</option>
                      <option value="Santé">Santé</option>
                      <option value="Vie Étudiante">Vie Étudiante</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Résumé (Excerpt)</label>
                  <textarea 
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={2}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all resize-none"
                    placeholder="Un court résumé pour la liste..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">URL de l'image</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="url" 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contenu complet (Markdown supporté)</label>
                  <textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={10}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-mono text-sm"
                    placeholder="# Titre du contenu..."
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-grow btn-primary py-5 flex items-center justify-center gap-2 text-xl shadow-xl shadow-medical-blue/20"
                  >
                    <Save className="w-6 h-6" /> Enregistrer l'article
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-10 py-5 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
