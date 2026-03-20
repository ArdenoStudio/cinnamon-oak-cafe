import React, { useState, useEffect } from 'react';
import { Menu, X } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

interface NavbarProps {
  isLoaded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navLinks = [
    { name: 'Home',    href: '#home',    id: 'home'    },
    { name: 'Story',   href: '#story',   id: 'story'   },
    { name: 'Menu',    href: '#menu',    id: 'menu'    },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Reserve', href: '#reserve', id: 'reserve' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1], delay: 0.15 }}
        className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          scrolled
            ? 'top-4 left-4 right-4 md:left-12 md:right-12 rounded-full overflow-hidden shadow-2xl'
            : 'top-0 left-0 right-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Backdrop — fades in on scroll */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]"
          style={{
            background: scrolled
              ? 'linear-gradient(to bottom, rgba(10,6,2,0.92) 0%, rgba(6,4,1,0.88) 100%)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
            border: scrolled ? '1px solid rgba(232,145,58,0.15)' : '1px solid transparent',
            borderRadius: scrolled ? '9999px' : '0px'
          }}
        />

        {/* Nav content */}
        <div className={`relative flex justify-between items-center transition-all duration-700 ${scrolled ? 'px-8 md:px-10 py-3' : 'px-10 md:px-16 py-5'}`}>

          {/* ── Brand wordmark ─────────────────────────── */}
          <Magnetic strength={0.18}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex flex-col leading-none cursor-pointer group"
              aria-label="Cinnamon Oak Café — Home"
            >
              <span
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
                className="text-[1.75rem] tracking-tight text-ivory-100 group-hover:text-gold-400 transition-colors duration-500"
              >
                Cinnamon Oak
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
                className="text-[1.1rem] text-gold-400/85 group-hover:text-gold-400 transition-colors duration-500 mt-0.5 tracking-wide"
              >
                Café · Colombo
              </span>
            </a>
          </Magnetic>

          {/* ── Desktop nav ────────────────────────────── */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor-text="SELECT"
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-[10px] font-body font-semibold tracking-widest uppercase transition-all duration-300 group ${
                    activeSection === link.id
                      ? 'text-gold-400'
                      : 'text-ivory-100/60 hover:text-ivory-100/90'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ease-out ${
                      activeSection === link.id
                        ? 'w-full bg-gradient-to-r from-gold-400/80 to-transparent'
                        : 'w-0 group-hover:w-full bg-gradient-to-r from-ivory-100/40 to-transparent'
                    }`}
                  />
                </a>
              ))}
            </div>

            <Magnetic strength={0.3}>
              <a
                href="#reserve"
                data-cursor-text="BOOKING"
                onClick={(e) => handleNavClick(e, '#reserve')}
                className={`px-6 py-2.5 rounded-full text-[10px] font-body font-bold tracking-widest uppercase transition-all duration-500 ${
                  scrolled
                    ? 'border border-gold-400/60 text-gold-400 hover:bg-gold-400 hover:text-obsidian-950'
                    : 'border border-ivory-100/25 text-ivory-100/80 hover:border-gold-400/60 hover:text-gold-400'
                }`}
                aria-label="Book a table"
              >
                Book Table
              </a>
            </Magnetic>
          </div>

          {/* ── Mobile toggle ───────────────────────────── */}
          <div className="md:hidden">
            <Magnetic strength={0.2}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-ivory-100/80 hover:text-ivory-100 transition-colors duration-300"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ─────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 3%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center bg-grain"
            style={{ background: 'rgba(8,5,2,0.98)', backdropFilter: 'blur(32px)' }}
          >
            <nav className="space-y-8 text-center" role="menu">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                  onClick={(e) => handleNavClick(e as any, link.href)}
                  className={`block font-display text-5xl transition-colors duration-500 tracking-tightest ${
                    activeSection === link.id
                      ? 'text-gold-400 italic'
                      : 'text-ivory-100 hover:text-gold-400 hover:italic'
                  }`}
                  role="menuitem"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                className="pt-10"
              >
                <Magnetic strength={0.3}>
                  <a
                    href="#reserve"
                    onClick={(e) => handleNavClick(e as any, '#reserve')}
                    className="inline-block px-12 py-4 bg-gold-400 text-obsidian-950 font-body font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-500 transition-all duration-500 shadow-premium"
                    role="menuitem"
                  >
                    Reserve a Table
                  </a>
                </Magnetic>
              </motion.div>
            </nav>

            {/* Ardeno credit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-1.5"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-2" />
              <div className="flex flex-col items-center leading-none">
                <span className="text-[8px] font-body uppercase tracking-[0.4em] text-ivory-200/20 mb-1">Crafted by</span>
                <span className="font-display text-xl tracking-tight text-ivory-100/60">
                  Ardeno <span className="text-gold-400/50 italic">Studio</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
