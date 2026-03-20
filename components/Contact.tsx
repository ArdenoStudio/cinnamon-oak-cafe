import React from 'react';
import { MapPin, Phone, Clock } from './Icons';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const Contact: React.FC = () => {
  return (
    <section id="reserve" className="py-36 bg-obsidian-950 text-ivory-100 relative overflow-hidden bg-grain">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">

        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold-400/70" />
            <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-gold-400/70">
              Get in Touch
            </span>
          </div>
          <h2
            className="font-display font-light text-ivory-50 leading-[0.9] tracking-tightest mb-4"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            Find <span className="italic">Us.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 border border-white/[0.06] rounded-2xl overflow-hidden shadow-premium surface-highlight">

          {/* Info block */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
            className="p-12 md:p-16 bg-white/[0.02] backdrop-blur-3xl border-r border-white/[0.06]"
          >
            <div className="space-y-12">
              {[
                {
                  Icon: MapPin,
                  label: 'Address',
                  content: 'No. 413, Galle Road,\nColombo 06, Sri Lanka.',
                },
                {
                  Icon: Clock,
                  label: 'Hours',
                  content: 'Daily: 7:00 AM – 10:00 PM',
                },
                {
                  Icon: Phone,
                  label: 'Contact',
                  content: '+94 11 234 5678',
                },
              ].map(({ Icon, label, content }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="mt-1 shrink-0">
                    <Icon
                      size={18}
                      className="text-gold-400 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-body font-semibold uppercase tracking-[0.28em] text-gold-400/70 mb-2">
                      {label}
                    </h3>
                    <p className="font-body font-light text-ivory-100/60 text-lg leading-relaxed group-hover:text-ivory-100/90 transition-colors duration-300 whitespace-pre-line">
                      {content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6">
              <Magnetic strength={0.25}>
                <a
                  href="https://wa.me/94112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="WHATSAPP"
                  className="w-full px-10 py-5 bg-gold-400 text-obsidian-950 font-body font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-gold-500 transition-all duration-500 text-center shadow-premium surface-highlight inline-block"
                  aria-label="Contact via WhatsApp"
                >
                  WhatsApp
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="tel:+94112345678"
                  data-cursor-text="CALL"
                  className="w-full px-10 py-5 border border-ivory-100/15 text-ivory-100 font-body font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-ivory-100/[0.07] transition-all duration-500 text-center surface-highlight inline-block"
                  aria-label="Call us"
                >
                  Call Now
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative h-[420px] lg:h-auto w-full group overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63374.90800726442!2d79.8256!3d6.8744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a4a6c42969b%3A0x6b876d728639257!2sColombo%2006%2C%20Colombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cinnamon Oak Cafe Location"
              className="grayscale invert group-hover:grayscale-0 group-hover:invert-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-obsidian-950/30 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;