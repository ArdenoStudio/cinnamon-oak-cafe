import React from 'react';
import { REVIEWS } from '../constants';
import { Star } from './Icons';
import { motion } from 'framer-motion';

const Reviews: React.FC = () => {
  return (
    <section className="py-36 bg-obsidian-900 relative overflow-hidden bg-grain bg-botanical">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

      {/* Large quote mark watermark */}
      <div className="absolute top-0 left-6 md:left-16 select-none pointer-events-none">
        <span className="font-display text-[18rem] font-light text-white/[0.025] leading-none">"</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                className={i <= 4 ? 'fill-gold-400 text-gold-400' : 'fill-gold-400/30 text-gold-400/30'}
              />
            ))}
          </div>
          <h2
            className="font-display font-light text-ivory-50 leading-[1.05]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            4.7 Stars on Google
          </h2>
          <p className="font-body text-[10px] text-ivory-200/30 tracking-widest uppercase mt-6">
            What Our Guests Say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.15, duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.5, ease: [0.7, 0, 0.2, 1] } }}
              className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/[0.06] rounded-2xl p-10 hover:bg-white/[0.06] hover:border-gold-400/20 transition-all duration-700 group shadow-premium surface-highlight"
            >
              {/* Opening quote in gold */}
              <div className="font-display text-7xl text-gold-400/20 leading-none mb-2 group-hover:text-gold-400/30 transition-colors duration-500 select-none">
                "
              </div>

              <p className="font-display italic text-xl text-ivory-100/80 leading-relaxed mb-8 group-hover:text-ivory-100 transition-colors duration-500">
                {review.comment}
              </p>

              {/* Stars for this review */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold-400/30 bg-gold-400/10 flex items-center justify-center font-display text-gold-400 text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-body font-semibold text-xs uppercase tracking-[0.18em] text-ivory-100/70">
                    {review.name}
                  </div>
                  <div className="font-body text-xs text-ivory-200/30 mt-0.5">{review.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
};

export default Reviews;