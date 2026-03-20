import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1741113937337-1d0273bf941d?auto=format&fit=crop&q=80&w=2670',
    label: 'The Pour',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1663872585222-b99f36d10223?auto=format&fit=crop&q=80&w=2670',
    label: 'Our Space',
    span: 'lg:col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1627308592778-290a1ec030da?auto=format&fit=crop&q=80&w=2574',
    label: 'Sweet Notes',
    span: 'lg:col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1727850005779-1e24cac382d4?auto=format&fit=crop&q=80&w=2670',
    label: 'Latte Art',
    span: 'lg:col-span-2',
  },
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-36 bg-obsidian-950 relative overflow-hidden bg-botanical">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold-400/70" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-gold-400/70">
                Visual Journal
              </span>
            </div>
            <h2
              className="font-display font-light text-ivory-50 leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Moments in <span className="italic">Light.</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/ardenostudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-body font-semibold uppercase tracking-widest text-ivory-200/30 hover:text-gold-400 transition-colors duration-500 border border-white/[0.07] px-8 py-3.5 rounded-full surface-highlight shadow-premium"
          >
            Follow @ardenostudio
          </a>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:h-[600px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
              className={`relative group overflow-hidden rounded-2xl shadow-premium cursor-pointer h-[280px] lg:h-auto surface-highlight ${img.span}`}
              data-cursor-text="VIEW"
            >
              <img
                src={`${img.src.split('?')[0]}?q=70&w=800&auto=format&fit=crop`}
                alt={img.label}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-[2s] ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.85] saturate-[0.85] group-hover:saturate-100"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent group-hover:from-obsidian-950/30 transition-all duration-700" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-gold-400/80">
                  {img.label}
                </span>
              </div>

              {/* Subtle border highlight */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 m-3 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
};

export default Gallery;