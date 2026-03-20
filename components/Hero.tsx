import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

// ─── Ease shared across reveals ───────────────────────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const ClipReveal: React.FC<{
  children: React.ReactNode;
  delay: number;
  className?: string;
}> = ({ children, delay, className = '' }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '108%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] w-full flex items-end justify-start overflow-hidden bg-obsidian-950"
    >
      {/* ── Background ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1673993445820-bf5721697cfa?auto=format&fit=crop&q=85&w=2400"
          alt="Atmospheric artisanal cafe interior"
          className="w-full h-full object-cover scale-[1.04]"
          loading="eager"
          fetchPriority="high"
        />

        {/* Lightened multi-layer treatment */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Darker overlay so centered text stays legible */}
        <div className="absolute inset-0 z-10 bg-black/40" />
        {/* Bottom push so text pops */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Subtle warm amber bloom at center-right */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 72% 50%, rgba(160,70,10,0.12) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 z-10 opacity-[0.022] bg-grain pointer-events-none" />
      </div>



      {/* ── Hero text content ─────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 pb-20 md:pb-28 flex flex-col items-center text-center">

        {/* Eyebrow — slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
          className="flex items-center justify-center gap-4 mb-7"
        >
          <div className="h-px w-12 bg-gold-400/80" />
          <span className="text-[9.5px] font-body font-semibold tracking-[0.36em] uppercase text-gold-400/85">
            Est. 2019 · Artisanal Tea House
          </span>
        </motion.div>

        {/* Headline — clip reveal per line */}
        <div className="mb-7 -ml-[0.04em] flex flex-col items-center">
          <ClipReveal delay={0.42}>
            <h1
              className="font-display font-light text-ivory-50 leading-[0.88] tracking-tightest"
              style={{ fontSize: 'clamp(4.5rem, 12vw, 11rem)' }}
            >
              The Art of
            </h1>
          </ClipReveal>

          <ClipReveal delay={0.58}>
            <h1
              className="font-display font-light italic text-gold-100 tracking-tightest"
              style={{ fontSize: 'clamp(4.5rem, 12vw, 11rem)', opacity: 0.92, lineHeight: '1.2', paddingBottom: '0.1em', marginBottom: '-0.1em' }}
            >
              Slow Living.
            </h1>
          </ClipReveal>
        </div>

        {/* Subheadline — pure blur/opacity fade, zero movement */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(7px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.95 }}
          className="font-body font-light text-ivory-200/55 text-lg md:text-xl max-w-[500px] mb-11 leading-[1.75] tracking-wide mx-auto"
        >
          Ceremonial-grade matcha and specialty coffee,<br />
          crafted with intention in the heart of Colombo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
        >
          <Magnetic strength={0.25}>
            <a
              href="#menu"
              data-cursor-text="EXPLORE"
              className="px-10 py-4 bg-gold-400 text-obsidian-950 font-body font-bold tracking-widest text-[9.5px] uppercase rounded-full hover:bg-gold-500 transition-all duration-500 shadow-premium text-center block"
            >
              Explore Menu
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#reserve"
              data-cursor-text="RESERVE"
              className="px-10 py-4 border border-ivory-100/20 text-ivory-100/80 font-body font-bold tracking-widest text-[9.5px] uppercase rounded-full hover:bg-white/[0.06] hover:border-ivory-100/40 hover:text-ivory-100 transition-all duration-500 backdrop-blur-sm text-center block"
            >
              Reservations
            </a>
          </Magnetic>
        </motion.div>

        {/* Thin stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="flex items-center justify-center gap-5"
        >
          <div className="h-px w-8 bg-gold-400/35" />
          {[
            { val: '4.9', label: 'Guest Rating' },
            { val: 'Est. 2019', label: 'Colombo, LK' },
            { val: '8am – 10pm', label: 'Open Daily' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="w-px h-5 bg-ivory-100/[0.08]" />}
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[13px] font-body font-bold text-gold-400/95 tracking-wide leading-none drop-shadow-sm">
                  {s.val}
                </span>
                <span className="text-[9px] font-body font-medium uppercase tracking-[0.25em] text-ivory-100/70 leading-none drop-shadow-sm">
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 right-10 z-20 flex-col items-center gap-3 hidden md:flex"
        style={{ opacity: 0.38 }}
      >
        <span
          className="text-[8.5px] font-body uppercase tracking-[0.32em] text-ivory-100/60"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-gold-400 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ delay: 2.5, duration: 1.2, ease: 'easeOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
