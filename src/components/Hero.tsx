import { motion } from 'motion/react';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
}

export default function Hero({ title, subtitle, image, badge }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Reduced blue intensity overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900/80" />
      </div>
      <div className="section-padding relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {badge && (
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              {badge}
            </span>
          )}
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
