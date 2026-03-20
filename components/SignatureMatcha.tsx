import React from 'react';
import { SIGNATURE_MATCHA } from '../constants';
import { motion } from 'framer-motion';

const SignatureMatcha: React.FC = () => {
  return (
    <section className="relative py-36 bg-forest-950 text-ivory-50 overflow-hidden bg-grain bg-botanical">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold-400/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gold-400/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold-400/70" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-gold-400/80">
                Our Masterpieces
              </span>
            </div>
            <h2
              className="font-display font-light text-ivory-50 leading-[1.0]"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
            >
              The Signature<br />
              <span className="italic text-ivory-50/40">Matcha Collection</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1], delay: 0.2 }}
            className="font-body font-light text-ivory-200/45 text-sm leading-relaxed max-w-xs tracking-wide"
          >
            Crafted with ceremonial grade matcha from Uji, Kyoto. Each cup is a balance of tradition and modern flavour innovation.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SIGNATURE_MATCHA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.12, duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-2xl shadow-premium surface-highlight group-hover:shadow-[0_24px_60px_rgba(255,51,1,0.15)] transition-shadow duration-700">
                <img
                  src={`${item.image.split('?')[0]}?q=75&w=600&auto=format&fit=crop`}
                  alt={`${item.name} - Signature Matcha at Cinnamon Oak Cafe`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-110 brightness-75 group-hover:brightness-90"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-forest-950/25 group-hover:bg-transparent transition-colors duration-700" />
                {/* Gold border on hover */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-gold-400/40 rounded-xl transition-all duration-700 pointer-events-none" />
              </div>

              <div className="text-center transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="font-display text-xl text-ivory-50 group-hover:text-gold-400 transition-colors duration-300 mb-2">
                  {item.name}
                </h3>
                <div className="h-px w-8 bg-gold-400/30 mx-auto mb-3 transition-all duration-500 group-hover:w-14 group-hover:bg-gold-400" />
                <p className="text-[10px] font-body uppercase tracking-[0.2em] text-ivory-200/40 group-hover:text-ivory-200/70 transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureMatcha;