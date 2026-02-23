'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export default function Section({ children, className = '', dark = false, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`section-padding ${dark ? 'bg-brand-black text-white' : 'bg-white text-brand-black'} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
