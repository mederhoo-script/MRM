'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Collection } from '@/lib/content';

interface LookCardProps {
  collection: Collection;
  index: number;
}

export default function LookCard({ collection, index }: LookCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">{collection.category}</p>
            <p className="font-inter text-xs text-white/80">Click to discover the story</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">{collection.category}</p>
          <h3 className="font-playfair text-lg text-brand-black">{collection.title}</h3>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/90 backdrop-blur-sm px-4"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-beige">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="p-8">
              <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">{collection.category}</p>
              <h2 className="font-playfair text-2xl text-brand-black mb-1">{collection.title}</h2>
              <div className="w-10 h-px bg-gold my-4" />
              <p className="font-inter text-sm text-charcoal/80 leading-relaxed">{collection.story}</p>
              <div className="mt-8 flex gap-4">
                <a
                  href="/contact"
                  className="btn-primary text-xs"
                  onClick={() => setModalOpen(false)}
                >
                  Book Consultation
                </a>
                <button
                  className="btn-outline text-xs"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-brand-black/70 text-white hover:bg-gold transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
