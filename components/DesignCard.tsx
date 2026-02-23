'use client';

/**
 * DesignCard — Smileyque2-style product card adapted for MRM Fashion World.
 *
 * Displays two prices per design:
 *   1. "With Fabric"  — designer sources fabric + sews (higher price)
 *   2. "Sewing Only"  — customer supplies fabric (labour-only price)
 *
 * Hover behaviour:
 *   • Image scales up (zoom)
 *   • "Book This Look" button slides up from bottom
 *   • Category badge always visible top-left
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Design } from '@/lib/content';

interface DesignCardProps {
  design: Design;
}

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-brand-black text-white',
  Trending: 'bg-gold text-brand-black',
};

export default function DesignCard({ design }: DesignCardProps) {
  const [imgError, setImgError] = useState(false);

  const badgeStyle = design.badge ? BADGE_STYLES[design.badge] ?? 'bg-charcoal text-white' : null;

  return (
    <article className="group flex flex-col bg-white overflow-hidden">
      {/* ── IMAGE AREA ─────────────────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-beige">
        {!imgError ? (
          <Image
            src={design.image}
            alt={design.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback when image fails to load */
          <div className="w-full h-full flex items-center justify-center bg-beige">
            <span className="font-inter text-xs text-charcoal/40 uppercase tracking-widest">
              {design.category}
            </span>
          </div>
        )}

        {/* Badge — top left */}
        {badgeStyle && (
          <span className={`absolute top-3 left-3 z-10 font-inter text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${badgeStyle}`}>
            {design.badge}
          </span>
        )}

        {/* "Book This Look" overlay button — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            href={`/contact?design=${design.id}`}
            className="block w-full text-center font-inter text-[10px] tracking-[0.25em] uppercase bg-white/95 text-brand-black py-3 hover:bg-gold hover:text-white transition-colors duration-200"
          >
            Book This Look
          </Link>
        </div>
      </div>

      {/* ── CARD INFO ──────────────────────────────────────────────────────── */}
      <div className="pt-3 pb-4 px-1">
        {/* Category */}
        <p className="font-inter text-[10px] tracking-widest uppercase text-gold mb-1">
          {design.category}
        </p>

        {/* Title */}
        <h3 className="font-playfair text-base font-medium text-brand-black leading-snug mb-3">
          {design.title}
        </h3>

        {/* Dual pricing */}
        <div className="space-y-1.5 border-t border-gold/20 pt-3">
          {/* Price row 1: designer supplies fabric */}
          <div className="flex items-center justify-between">
            <span className="font-inter text-[10px] text-charcoal/60 uppercase tracking-wide">
              With Fabric
            </span>
            <span className="font-inter text-sm font-semibold text-brand-black">
              {design.withFabricPrice}
            </span>
          </div>
          {/* Price row 2: customer brings own fabric */}
          <div className="flex items-center justify-between">
            <span className="font-inter text-[10px] text-charcoal/60 uppercase tracking-wide">
              Sewing Only
            </span>
            <span className="font-inter text-sm font-semibold text-gold">
              {design.sewingOnlyPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
