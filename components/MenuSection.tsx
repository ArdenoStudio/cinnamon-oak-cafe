import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const categories: MenuCategory[] = ['Coffee', 'Matcha', 'Artisanal Tea', 'Breakfast', 'Mains', 'Desserts'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { ease: [0.7, 0, 0.2, 1], duration: 0.8 } },
};

const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Matcha');
  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-36 bg-ivory-50 relative overflow-hidden bg-grain bg-botanical">
      {/* Grain overlay handled by CSS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_-10%,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* Left — sticky image panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
            className="hidden lg:block lg:col-span-4"
          >
            <div className="sticky top-32 w-full h-[640px] overflow-hidden rounded-2xl shadow-premium surface-highlight group">
              <img
                src="https://images.unsplash.com/photo-1760623139024-55601a6eb2c8?auto=format&fit=crop&q=80&w=1200"
                alt="The serene minimalist interior of Cinnamon Oak Cafe Colombo"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-110 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/75 via-obsidian-950/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <p className="font-display italic text-ivory-50 text-2xl leading-snug drop-shadow-lg">
                  "Ingredients are the palette, flavour is the art."
                </p>
                <div className="h-px w-12 bg-gold-400/60 mt-4" />
              </div>
            </div>
          </motion.div>

          {/* Right — menu content */}
          <div className="lg:col-span-8">
            {/* Section header */}
            <div className="mb-14">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
              >
                <div className="h-px w-10 bg-gold-400/70" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-gold-600">
                  Curated For You
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1], delay: 0.1 }}
                className="font-display font-light text-obsidian-950 leading-[1.05] mb-10"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
              >
                Culinary Offerings
              </motion.h2>

              {/* Category tabs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-x-8 gap-y-4"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-[11px] font-body font-semibold tracking-[0.18em] uppercase transition-all duration-300 py-2 ${activeCategory === cat
                      ? 'text-obsidian-950'
                      : 'text-obsidian-900/35 hover:text-obsidian-900'
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold-400 to-gold-600"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Menu items */}
            <div className="min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  className="divide-y divide-obsidian-900/[0.07]"
                >
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="group py-7 flex justify-between items-start gap-6 cursor-default hover:pl-2 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-2xl text-obsidian-900 group-hover:text-gold-600 transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.isVegetarian && (
                            <span className="text-[8px] font-body uppercase tracking-wider text-forest-800/50 border border-forest-800/20 px-2 py-0.5 rounded-full">
                              Veg
                            </span>
                          )}
                        </div>
                        <p className="font-body font-light text-obsidian-900/50 text-sm leading-relaxed group-hover:text-obsidian-900/70 transition-colors">
                          {item.description}
                        </p>
                      </div>
                      <div className="font-display text-xl text-obsidian-900 group-hover:text-gold-600 transition-colors duration-300 whitespace-nowrap mt-1 pl-8">
                        <span className="text-xs font-body text-obsidian-900/30 mr-1">LKR</span>
                        {item.price.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16">
              <Magnetic strength={0.3}>
                <a
                  href="#reserve"
                  data-cursor-text="BOOKING"
                  className="inline-block px-12 py-4 border border-obsidian-900/20 text-obsidian-900 font-body font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-obsidian-950 hover:text-ivory-50 hover:border-obsidian-950 transition-all duration-500 shadow-premium surface-highlight"
                >
                  Book a Table
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;