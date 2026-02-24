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
 *   • "Quick View" eye button appears top-right
 *   • "Book This Look" button slides up from bottom
 *   • Category badge always visible top-left
 */

import { useState } from 'react';
import Image from 'next/image';
import type { Design } from '@/lib/content';

interface DesignCardProps {
  design: Design;
  onQuickView?: () => void;
}

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-brand-black text-white',
  Trending: 'bg-gold text-brand-black',
};

export default function DesignCard({ design, onQuickView }: DesignCardProps) {
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

        {/* Quick View eye button — top right, appears on hover */}
        {onQuickView && (
          <button
            onClick={e => { e.preventDefault(); onQuickView(); }}
            aria-label={`Quick view ${design.title}`}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gold hover:text-white hover:border-gold"
          >
            {/* Eye icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}
      </div>

      {/* ── CARD INFO ──────────────────────────────────────────────────────── */}
      <div className="pt-3 pb-4 px-1">
        {/* Category */}
        <p className="font-inter text-[10px] tracking-widest uppercase text-gold mb-1">
          {design.category}
        </p>

        {/* Title — clicking also opens quick view */}
        <h3
          className="font-playfair text-base font-medium text-brand-black leading-snug mb-3 cursor-pointer hover:text-gold transition-colors duration-150"
          onClick={onQuickView}
        >
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

