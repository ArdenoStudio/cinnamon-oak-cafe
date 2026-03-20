import React from 'react';
import { motion } from 'framer-motion';

const Story: React.FC = () => {
  return (
    <section id="story" className="py-36 bg-obsidian-950 relative overflow-hidden bg-grain bg-botanical">
      {/* Subtle background texture line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      {/* Large background number — editorial touch */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
        <span className="font-display text-[22rem] font-light text-white/[0.02] leading-none">
          413
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — image with floating quote card */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative group overflow-hidden rounded-2xl shadow-premium surface-highlight">
              <img
                src="https://images.unsplash.com/photo-1759933164283-ab161f34bd02?auto=format&fit=crop&q=85&w=1200"
                alt="Traditional matcha preparation at Cinnamon Oak Cafe"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-110 brightness-75 group-hover:brightness-90"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent" />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
              className="absolute -bottom-8 -right-6 w-64 p-8 bg-obsidian-900 border border-white/[0.06] rounded-2xl shadow-premium z-20 hidden md:block backdrop-blur-3xl surface-highlight"
            >
              <p className="font-display italic text-2xl text-ivory-100 leading-tight">
                "Slowing down<br />is an art."
              </p>
              <div className="mt-4 h-px w-10 bg-gold-400/60" />
            </motion.div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gold-400"
              />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-gold-400/80">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-light text-ivory-50 leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
            >
              Uji Precision.<br />
              <span className="italic text-ivory-50/40">Colombo Soul.</span>
            </h2>

            <p className="font-body font-light text-ivory-200/50 text-base leading-relaxed mb-8">
              Founded in the pulsing heart of <span className="text-gold-400/80 font-medium">Colombo 06</span>, Cinnamon Oak Cafe is an intersection of two worlds. We bring the meticulous ritual of Japanese tea craft to the vibrant, warm hospitality of Sri Lanka.
            </p>

            <p className="font-body font-light text-ivory-200/30 text-sm leading-relaxed mb-10">
              Our journey began with a simple question: what happens when the finest ceremonial matcha from Uji meets the sun-drenched heritage of Ceylon? The result is a sanctuary on Galle Road where time slows down, and every sip tells a story of provenance.
            </p>
            <p>
              At Cinnamon Oak Cafe, we don't just serve drinks — we invite you to pause, breathe, and experience the profound depth of a perfect cup.
            </p>

            {/* Stats */}
            <div className="mt-14 flex items-center gap-0 border border-white/[0.06] rounded-xl overflow-hidden shadow-premium surface-highlight bg-white/[0.02]">
              {[
                { value: '100%', label: 'Organic Uji Matcha' },
                { value: '06', label: 'Signature Blends' },
                { value: '5th', label: 'Gen. Farm, Kyoto' },
              ].map((stat, i) => (
                <div key={i} className={`flex-1 py-7 px-6 text-center ${i !== 2 ? 'border-r border-white/[0.06]' : ''}`}>
                  <div className="font-display text-3xl text-ivory-50 mb-1">{stat.value}</div>
                  <div className="text-[9px] font-body uppercase tracking-widest text-ivory-200/35">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section >
  );
};

export default Story;