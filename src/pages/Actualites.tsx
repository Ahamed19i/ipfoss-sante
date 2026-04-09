import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  description?: string;
  content?: string;
  image: string;
  date: any;
  category: string;
  author: string;
}

export default function Actualites() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="pt-10">
      <Hero 
        title="Vie de l'École"
        subtitle="Suivez la vie de l'établissement, nos conférences et nos réussites."
        image="https://images.unsplash.com/photo-1504817342169-4a5104bb5c27?auto=format&fit=crop&q=80&w=2070"
        badge="Actualités & Événements"
      />

      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-medical-blue text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-6 text-xs text-gray-400 mb-6 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-medical-blue" />
                    {item.date?.toDate ? item.date.toDate().toLocaleDateString() : item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-medical-blue" />
                    {item.author}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-medical-blue transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
                  {item.description}
                </p>
                <Link 
                  to={`/actualites/${item.id}`}
                  className="inline-flex items-center gap-3 text-medical-blue font-bold group/link hover:gap-4 transition-all"
                >
                  Lire la suite 
                  <div className="w-8 h-8 rounded-full bg-medical-light flex items-center justify-center group-hover/link:bg-medical-blue group-hover/link:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
