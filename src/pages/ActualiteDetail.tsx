

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image: string;
  date: any;
  category: string;
  author: string;
}

export default function ActualiteDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Fetch article
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() } as NewsItem);
        }

        // Fetch related news (limit to 3)
        const q = query(collection(db, 'news'), limit(4));
        const snap = await getDocs(q);
        setRelatedNews(
          snap.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as NewsItem))
            .filter(n => n.id !== id)
            .slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 text-center section-padding">
        <h2 className="text-3xl font-display font-bold mb-4">Article non trouvé</h2>
        <Link to="/actualites" className="text-medical-blue font-bold hover:underline">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const displayDate = article.date?.toDate ? article.date.toDate().toLocaleDateString() : article.date;

  return (
    <div className="pt-20">
      {/* Article Hero - Premium Style */}
      <section className="relative min-h-[60vh] md:h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link 
              to="/actualites" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-10 transition-colors group font-bold text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux actualités
            </Link>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-medical-blue text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.2em]">
                {article.category}
              </span>
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{displayDate}</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-10 leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-medical-blue/30 p-0.5">
                  <img src="/images/dr1.jpg" alt={article.author} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{article.author}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">Administration IPFOSS</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content - Clean & Readable */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                {article.description && (
                  <div className="relative mb-16">
                    <div className="absolute -left-8 top-0 bottom-0 w-1.5 bg-medical-blue rounded-full" />
                    <p className="text-2xl text-gray-900 leading-relaxed font-display font-medium italic pl-4">
                      "{article.description}"
                    </p>
                  </div>
                )}
                
                <div className="markdown-body text-gray-800 leading-[1.8] text-lg space-y-8">
                  {article.content ? (
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  ) : (
                    <p className="text-gray-400 italic">Aucun contenu disponible pour cet article.</p>
                  )}
                </div>

                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-wrap justify-between items-center gap-8">
                  <div className="flex gap-3">
                    {['Santé', 'Innovation', 'Sénégal'].map(tag => (
                      <span key={tag} className="px-5 py-2 bg-gray-50 text-gray-500 rounded-full text-xs font-bold border border-gray-100 hover:border-medical-blue hover:text-medical-blue transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4 space-y-16">
              {/* Sidebar: Newsletter or Call to Action */}
              <div className="bg-medical-blue p-10 rounded-[3rem] shadow-2xl shadow-medical-blue/20 text-white relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-2xl font-display font-bold mb-4 relative z-10">Restez informé</h4>
                <p className="text-white/80 text-sm mb-8 relative z-10 leading-relaxed">
                  Inscrivez-vous à notre newsletter pour recevoir les dernières actualités de l'école et du secteur de la santé.
                </p>
                <div className="relative z-10">
                  <input 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all mb-4"
                  />
                  <button className="w-full py-4 bg-white text-medical-blue rounded-2xl font-bold hover:shadow-xl transition-all">
                    S'abonner
                  </button>
                </div>
              </div>

              {/* Related News - Fixed Color */}
              <div>
                <div className="flex items-center justify-between mb-10">
                  <h4 className="text-2xl font-display font-bold text-gray-900">Articles Récents</h4>
                  <div className="h-px flex-grow mx-6 bg-gray-100" />
                </div>
                <div className="space-y-10">
                  {relatedNews.map(item => (
                    <Link key={item.id} to={`/actualites/${item.id}`} className="group block">
                      <div className="flex gap-6 items-start">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-medical-blue uppercase tracking-widest mb-2 block">
                            {item.category}
                          </span>
                          <h5 className="font-display font-bold text-gray-900 group-hover:text-medical-blue transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h5>
                          <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
                            {item.date?.toDate ? item.date.toDate().toLocaleDateString() : item.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
