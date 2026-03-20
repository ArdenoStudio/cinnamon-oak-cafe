import React from 'react';
import { Instagram } from './Icons';
import ArdenoLogo from './ArdenoLogo';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      heading: 'Explore',
      links: [
        { label: 'Our Story', href: '#story' },
        { label: 'Menu', href: '#menu' },
        { label: 'Gallery', href: '#gallery' },
      ],
    },
    {
      heading: 'Visit',
      links: [
        { label: 'Reservations', href: '#reserve' },
        { label: 'Directions', href: '#reserve' },
        { label: 'Contact', href: '#reserve' },
      ],
    },
  ];

  return (
    <footer className="bg-obsidian-950 text-ivory-200/40 border-t border-white/[0.05] relative overflow-hidden">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

          {/* Brand */}
          <div className="md:col-span-5">
            <h2 className="font-display font-light text-ivory-50 text-4xl mb-3 leading-tight">
              Cinnamon Oak Cafe
            </h2>
            <p className="text-[10px] font-body uppercase tracking-[0.28em] text-gold-400/60 mb-8">
              Colombo 06 · Sri Lanka
            </p>
            <p className="font-body font-light text-ivory-200/40 text-sm leading-relaxed max-w-xs">
              An artisanal tea house and specialty coffee destination, crafted with intention and reverence for the ancient craft.
            </p>

            {/* Social */}
            <div className="mt-10 flex items-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href="https://www.instagram.com/ardenostudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-cursor-text="SOCIAL"
                  className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-gold-400/50 hover:text-gold-400 transition-all duration-500 surface-highlight"
                >
                  <Instagram size={18} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-10">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[9px] font-body font-semibold uppercase tracking-[0.28em] text-ivory-200/25 mb-6">
                  {col.heading}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-sm text-ivory-200/50 hover:text-gold-400 transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hours + address */}
          <div className="md:col-span-3">
            <h3 className="text-[9px] font-body font-semibold uppercase tracking-[0.28em] text-ivory-200/25 mb-6">
              Hours
            </h3>
            <p className="font-body text-sm text-ivory-200/50 leading-relaxed mb-2">
              Daily
            </p>
            <p className="font-body text-sm text-ivory-200/50 leading-relaxed mb-8">
              7:00 AM – 10:00 PM
            </p>
            <p className="font-body text-sm text-ivory-200/40 leading-relaxed">
              No. 413, Galle Road,<br />Colombo 06, Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar — Ardeno Studio credit */}
      <div className="border-t border-white/[0.05] pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-body uppercase tracking-[0.2em] text-ivory-200/20">
            © {year} Cinnamon Oak Cafe. All rights reserved.
          </p>

          {/* Ardeno Studio credit — right side */}
          <motion.a
            href="https://ardenostudio.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
            className="group flex items-center gap-4 py-2"
            data-cursor-text="VISIT"
          >
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.25em] text-ivory-200/20 group-hover:text-ivory-200/60 transition-all duration-700">
              Designed &amp; Built by
            </span>
            <div className="relative">
              <Magnetic strength={0.3}>
                <div className="relative">
                  <ArdenoLogo variant="dark" scale={0.48} className="opacity-70 group-hover:opacity-100 transition-all duration-700 filter group-hover:drop-shadow-[0_0_15px_rgba(255,51,1,0.2)]" />
                </div>
              </Magnetic>
              {/* Subtle accent glow behind logo on hover */}
              <div className="absolute inset-0 bg-[#ff3301]/0 group-hover:bg-[#ff3301]/5 blur-2xl rounded-full transition-all duration-1000 -z-10" />
            </div>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;