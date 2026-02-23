'use client';

import { motion } from 'framer-motion';
import type { Testimonial } from '@/lib/content';

interface TestimonialProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialProps) {
  return (
    <motion.div
      className="bg-brand-black/5 border border-gold/20 p-8 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="text-gold text-4xl font-playfair mb-4 leading-none">&ldquo;</div>
      <p className="font-playfair italic text-base text-charcoal/90 leading-relaxed mb-6">
        {testimonial.quote}
      </p>
      <div className="w-8 h-px bg-gold mb-4" />
      <p className="font-inter text-sm font-medium text-brand-black">{testimonial.name}</p>
      <p className="font-inter text-xs text-gold tracking-wide">{testimonial.title}</p>
    </motion.div>
  );
}
