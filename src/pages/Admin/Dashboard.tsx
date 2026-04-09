

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';
import { Users, Newspaper, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newsCount: 0,
    applicationsCount: 0,
    recentApplications: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const newsSnap = await getDocs(collection(db, 'news'));
        const appsSnap = await getDocs(collection(db, 'applications'));
        const recentAppsQuery = query(collection(db, 'applications'), orderBy('createdAt', 'desc'), limit(5));
        const recentAppsSnap = await getDocs(recentAppsQuery);

        setStats({
          newsCount: newsSnap.size,
          applicationsCount: appsSnap.size,
          recentApplications: recentAppsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre espace de gestion.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
        >
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Users className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Candidatures</p>
          <h3 className="text-4xl font-display font-bold text-gray-900">{stats.applicationsCount}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
        >
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
            <Newspaper className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Articles</p>
          <h3 className="text-4xl font-display font-bold text-gray-900">{stats.newsCount}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
        >
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <TrendingUp className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Visites</p>
          <h3 className="text-4xl font-display font-bold text-gray-900">--</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Candidatures Récentes</h2>
            </div>
            <Link to="/admin/applications" className="text-medical-blue font-bold text-sm hover:underline flex items-center gap-2">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {stats.recentApplications.length > 0 ? (
              stats.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-900">{app.fullName}</h4>
                    <p className="text-xs text-gray-500">{app.formation}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    app.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">Aucune candidature pour le moment.</p>
            )}
          </div>
        </section>

        <section className="bg-medical-blue p-10 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Newspaper className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-6">Gestion du contenu</h2>
            <p className="text-white/70 mb-10 leading-relaxed">
              Publiez de nouveaux articles, mettez à jour les formations ou gérez les témoignages étudiants en quelques clics.
            </p>
            <div className="space-y-4">
              <Link to="/admin/news" className="block w-full bg-white text-medical-blue font-bold py-4 rounded-2xl text-center hover:bg-gray-50 transition-all">
                Publier une actualité
              </Link>
              <Link to="/admin/formations" className="block w-full bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl text-center hover:bg-white/20 transition-all">
                Modifier les formations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
