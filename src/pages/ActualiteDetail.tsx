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
      {/* Article Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link 
              to="/actualites" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux actualités
            </Link>
            <span className="inline-block px-4 py-1.5 bg-medical-blue text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-medical-blue" />
                {displayDate}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-medical-blue" />
                {article.author}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 prose prose-lg max-w-none"
            >
              {article.description && (
                <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 border-l-4 border-medical-blue pl-8 italic">
                  {article.description}
                </p>
              )}
              
              <div className="markdown-body text-gray-700 leading-relaxed">
                {article.content ? (
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                ) : (
                  <p>Aucun contenu disponible pour cet article.</p>
                )}
              </div>

              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap justify-between items-center gap-6">
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600">#Santé</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600">#Innovation</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600">#Sénégal</span>
                </div>
                <div className="flex gap-4">
                  <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-medical-blue hover:bg-medical-light transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-medical-blue hover:bg-medical-light transition-all">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {/* Sidebar Author */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-medical-light shadow-lg">
                <img src="/images/dr1.jpg" alt="Author" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-xl font-display font-bold text-gray-900 mb-2">{article.author}</h4>
              <p className="text-sm text-gray-500 mb-6">Expert en Santé Publique & Innovation</p>
              <button className="btn-secondary w-full py-3 text-sm">Voir le profil</button>
            </div>

            {/* Related News */}
            <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-xl text-white">
              <h4 className="text-2xl font-display font-bold mb-8">Articles Récents</h4>
              <div className="space-y-8">
                {relatedNews.map(item => (
                  <Link key={item.id} to={`/actualites/${item.id}`} className="group block">
                    <span className="text-[10px] font-bold text-medical-blue uppercase tracking-widest mb-2 block">
                      {item.category}
                    </span>
                    <h5 className="font-display font-bold group-hover:text-medical-blue transition-colors leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-2">
                      {item.date?.toDate ? item.date.toDate().toLocaleDateString() : item.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
