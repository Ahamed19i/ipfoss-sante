import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : 'justify-start'}`}>
          <div className={`w-12 h-1 rounded-full ${light ? 'bg-white/50' : 'bg-medical-blue/30'}`} />
          <span className={`text-xs font-bold uppercase tracking-[0.3em] ${light ? 'text-white/80' : 'text-medical-blue'}`}>
            IPFOSS Excellence
          </span>
          <div className={`w-12 h-1 rounded-full ${light ? 'bg-white/50' : 'bg-medical-blue/30'}`} />
        </div>
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-base md:text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
