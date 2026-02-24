'use client';

/**
 * TrendingCarousel — Continuous auto-scrolling card strip.
 * Uses all images from designs.json (Pins + short gown folders).
 *
 * Layout:
 *   Mobile  : ~2.5 cards visible (each card = 40vw)
 *   Desktop : ~4.5 cards visible (each card = 22vw)
 *
 * Motion:
 *   requestAnimationFrame ticker — auto-scrolls at ~90 px/s continuously.
 *   Touch: pause RAF, follow finger live, resume RAF on release.
 *   Mouse hover (desktop): pause while hovering.
 */

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import designsData from '@/content/designs.json';

// Use every design image for the strip
const BANNERS = designsData.map(d => ({ image: d.image, label: d.title, href: '/collections' }));
// Duplicate for seamless CSS-loop reset
const LOOP_BANNERS = [...BANNERS, ...BANNERS];

const SPEED = 0.09; // px/ms

export default function TrendingCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isTouching  = useRef(false);
  const touchStartX = useRef(0);
  const touchStartOffset = useRef(0);

  const getHalfWidth = useCallback((): number => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  }, []);

  const applyOffset = useCallback((px: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${px}px)`;
  }, []);

  const tick = useCallback((time: number) => {
    if (isTouching.current) return;
    if (lastTimeRef.current !== null) {
      const dt = time - lastTimeRef.current;
      offsetRef.current += SPEED * dt;
      const half = getHalfWidth();
      if (half > 0 && offsetRef.current >= half) offsetRef.current -= half;
      applyOffset(offsetRef.current);
    }
    lastTimeRef.current = time;
    rafRef.current = requestAnimationFrame(tick);
  }, [getHalfWidth, applyOffset]);

  const startAuto = useCallback(() => {
    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopAuto = useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    lastTimeRef.current = null;
  }, []);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  const onTouchStart = (e: React.TouchEvent) => {
    isTouching.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartOffset.current = offsetRef.current;
    stopAuto();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isTouching.current) return;
    const dx = touchStartX.current - e.touches[0].clientX;
    const half = getHalfWidth();
    let newOffset = touchStartOffset.current + dx;
    if (half > 0) newOffset = ((newOffset % half) + half) % half;
    offsetRef.current = newOffset;
    applyOffset(newOffset);
  };

  const onTouchEnd = () => { isTouching.current = false; startAuto(); };

  return (
    <div
      className="overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ transform: 'translateX(0px)' }}
      >
        {LOOP_BANNERS.map((b, i) => (
          <Link
            key={i}
            href={b.href}
            className="flex-shrink-0 w-[40vw] md:w-[22vw] px-1.5 block group"
            draggable={false}
          >
            <div className="h-[220px] md:h-[300px] relative overflow-hidden bg-beige">
              <Image
                src={b.image}
                alt={b.label}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 40vw, 22vw"
                loading={i < 5 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
            <p className="font-playfair text-sm font-semibold text-brand-black mt-2 truncate px-0.5">
              {b.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
