'use client';

/**
 * DesignCard — Smileyque2-style product card adapted for MRM Fashion World.
 *
 * Displays two prices per design:
 *   1. "With Fabric"  — designer sources fabric + sews (higher price)
 *   2. "Sewing Only"  — customer supplies fabric (labour-only price)
 *
 * Discount display:
 *   When `withFabricOriginalPrice` / `sewingOnlyOriginalPrice` are set,
 *   the original price is shown with a strikethrough beside the discounted price.
 *   A "Sale" badge is shown automatically for discounted items.
 *
 * Hover behaviour:
 *   • Image scales up (zoom)
 *   • "Quick View" eye icon button appears top-right
 *   • "Quick View" text bar slides up from bottom of image
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
  New:      'bg-brand-black text-white',
  Trending: 'bg-gold text-brand-black',
  Sale:     'bg-red-600 text-white',
};

export default function DesignCard({ design, onQuickView }: DesignCardProps) {
  const [imgError, setImgError] = useState(false);

  const hasDiscount = !!(design.withFabricOriginalPrice || design.sewingOnlyOriginalPrice);
  // Show "Sale" badge for discounted items; otherwise use the data badge
  const badge = hasDiscount ? 'Sale' : (design.badge ?? null);
  const badgeStyle = badge ? BADGE_STYLES[badge] ?? 'bg-charcoal text-white' : null;

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
          <div className="w-full h-full flex items-center justify-center bg-beige">
            <span className="font-inter text-xs text-charcoal/40 uppercase tracking-widest">
              {design.category}
            </span>
          </div>
        )}

        {/* Badge — top left */}
        {badgeStyle && (
          <span className={`absolute top-3 left-3 z-10 font-inter text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${badgeStyle}`}>
            {badge}
          </span>
        )}

        {/* Quick View eye icon button — top right, appears on hover */}
        {onQuickView && (
          <button
            onClick={e => { e.preventDefault(); onQuickView(); }}
            aria-label={`Quick view ${design.title}`}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gold hover:text-white hover:border-gold"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}

        {/* "Quick View" text bar — slides up from bottom on hover */}
        {onQuickView && (
          <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={e => { e.preventDefault(); onQuickView(); }}
              className="flex items-center justify-center gap-1.5 w-full font-inter text-[10px] tracking-[0.25em] uppercase bg-white/95 text-brand-black py-3 hover:bg-gold hover:text-white transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Quick View
            </button>
          </div>
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
          {/* Price row 1: With Fabric */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-inter text-[10px] text-charcoal/60 uppercase tracking-wide flex-shrink-0">
              With Fabric
            </span>
            <span className="flex items-baseline gap-1.5 flex-wrap justify-end">
              {design.withFabricOriginalPrice && (
                <span className="font-inter text-xs text-charcoal/40 line-through">
                  {design.withFabricOriginalPrice}
                </span>
              )}
              <span className={`font-inter text-sm font-semibold ${hasDiscount ? 'text-red-600' : 'text-brand-black'}`}>
                {design.withFabricPrice}
              </span>
            </span>
          </div>

          {/* Price row 2: Sewing Only */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-inter text-[10px] text-charcoal/60 uppercase tracking-wide flex-shrink-0">
              Sewing Only
            </span>
            <span className="flex items-baseline gap-1.5 flex-wrap justify-end">
              {design.sewingOnlyOriginalPrice && (
                <span className="font-inter text-xs text-charcoal/40 line-through">
                  {design.sewingOnlyOriginalPrice}
                </span>
              )}
              <span className={`font-inter text-sm font-semibold ${hasDiscount ? 'text-red-600' : 'text-gold'}`}>
                {design.sewingOnlyPrice}
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
