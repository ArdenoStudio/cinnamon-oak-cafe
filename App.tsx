import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureMatcha from './components/SignatureMatcha';
import MenuSection from './components/MenuSection';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Phone } from './components/Icons';
import DemoLoader from './components/DemoLoader';
import ArdenoCursor from './components/ArdenoCursor';

function App() {
  const [isLoaded, setIsLoaded] = useState(() => sessionStorage.getItem('loaderShown_cinnamon') === '1');

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_cinnamon', '1');
    setIsLoaded(true);
  };

  // Velocity-aware blur setup
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const blurValue = useTransform(scrollVelocity, [-2000, 0, 2000], [6, 0, 6]);
  const smoothBlur = useSpring(blurValue, { damping: 50, stiffness: 400 });

  return (
    <div className="min-h-screen bg-obsidian-950 text-ivory-200 font-body selection:bg-gold-400 selection:text-obsidian-950 overflow-x-hidden">
      <ArdenoCursor />
      <AnimatePresence>
        {!isLoaded && <DemoLoader demoName="Cinnamon Oak Cafe" demoLogoUrl="/logo.svg" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <Navbar isLoaded={isLoaded} />

      <motion.div
        animate={isLoaded ? {
          opacity: 1,
          y: 0,
          filter: `blur(0px)`
        } : {
          opacity: 0,
          y: 20,
          filter: `blur(10px)`
        }}
        style={{ filter: useTransform(smoothBlur, (v) => `blur(${v}px)`) }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      >
        <main>
          <Hero />
          <Story />
          <SignatureMatcha />
          <MenuSection />
          <Gallery />
          <Reviews />
          <Contact />
        </main>

        <Footer />
      </motion.div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-5 left-5 right-5 p-1.5 bg-obsidian-950/85 backdrop-blur-2xl border border-white/[0.07] md:hidden z-40 flex gap-2 rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <a
          href="tel:+94112345678"
          className="flex-1 bg-gold-400 text-obsidian-950 py-3.5 font-body font-bold uppercase tracking-[0.18em] text-[9px] flex justify-center items-center gap-2 shadow-lg rounded-full hover:bg-gold-500 transition-colors duration-300"
        >
          <Phone size={13} />
          Call Us
        </a>
        <a
          href="#menu"
          className="flex-1 bg-white/[0.06] text-ivory-100 border border-white/[0.06] py-3.5 font-body font-bold uppercase tracking-[0.18em] text-[9px] flex justify-center items-center shadow-lg rounded-full hover:bg-white/10 transition-colors duration-300"
        >
          Menu
        </a>
      </div>
    </div>
  );
}

export default App;