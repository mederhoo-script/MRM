'use client';

/**
 * TrendingCarousel — Aurore-style editorial banner slider (Smileyque2 section 3).
 *
 * Layout:
 *   Mobile  : 1 banner visible, full-width
 *   Desktop : 2 banners visible side-by-side (50% each)
 *
 * Interaction:
 *   • Touch swipe (live-drag follow, snap on release)
 *   • Prev / Next arrow buttons (desktop, shown only when applicable)
 *   • Thin progress scrollbar beneath the track
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  image: string;
  label: string;
  href: string;
}

const BANNERS: Banner[] = [
  { image: '/images/look1.jpg', label: 'Evening Couture',     href: '/collections' },
  { image: '/images/look2.jpg', label: 'Bridal Bespoke',      href: '/collections' },
  { image: '/images/look3.jpg', label: 'Power Dressing',      href: '/collections' },
  { image: '/images/look4.jpg', label: 'Heritage Collection', href: '/collections' },
  { image: '/images/look5.jpg', label: "Gentleman's Atelier", href: '/collections' },
  { image: '/images/look6.jpg', label: 'Resort Luxe',         href: '/collections' },
];

const VISIBLE_DESKTOP = 2;
const SWIPE_THRESHOLD = 40;
const TOTAL = BANNERS.length;

export default function TrendingCarousel() {
  const maxOffset = TOTAL - VISIBLE_DESKTOP;

  const [offset, setOffset] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const clamp = useCallback(
    (v: number) => Math.max(0, Math.min(maxOffset, v)),
    [maxOffset],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      setOffset(o => clamp(o + dir));
      setDragDelta(0);
    },
    [clamp],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    setDragDelta(dx);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    if (!e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      go(dx < 0 ? 1 : -1);
    } else {
      setDragDelta(0);
    }
  };

  const slideWidthPct = isMobile ? 100 : 100 / VISIBLE_DESKTOP;
  const translateX = `calc(${-offset * slideWidthPct}% + ${dragDelta}px)`;

  const progressWidth =
    ((offset + (isMobile ? 1 : VISIBLE_DESKTOP)) / TOTAL) * 100;

  return (
    <div>
      {/* Track */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX})`,
            transition: isDragging.current
              ? 'none'
              : 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {BANNERS.map((b, i) => (
            <Link
              key={i}
              href={b.href}
              className="flex-shrink-0 w-full md:w-1/2 relative overflow-hidden group block"
              draggable={false}
            >
              <div className="aspect-[4/3] md:aspect-[3/2] relative overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
              {/* Label overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-5 md:p-7">
                <p className="font-playfair text-xl font-semibold text-white tracking-wide">
                  {b.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Prev arrow */}
        {offset > 0 && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center bg-white/90 border border-gray-200 hover:bg-gold hover:text-white hover:border-gold transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next arrow */}
        {offset < maxOffset && (
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center bg-white/90 border border-gray-200 hover:bg-gold hover:text-white hover:border-gold transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Thin progress scrollbar (Aurore style) */}
      <div className="h-[2px] bg-gray-200 mt-3 mx-1 relative">
        <div
          className="absolute top-0 left-0 h-full bg-brand-black transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
