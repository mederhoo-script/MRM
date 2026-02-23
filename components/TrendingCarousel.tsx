'use client';

/**
 * TrendingCarousel — Continuous auto-scrolling card strip with swipe support.
 *
 * Layout:
 *   Mobile  : ~2.5 cards visible (each card = 40vw)
 *   Desktop : ~4.5 cards visible (each card = 22vw)
 *
 * Motion:
 *   requestAnimationFrame ticker — auto-scrolls at ~90 px/s continuously.
 *   Touch: pause RAF, follow finger live, resume RAF on release.
 *   Mouse hover (desktop): pause while hovering.
 *   Images use object-contain so the full photo is always visible.
 */

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  image: string;
  label: string;
  href: string;
}

const BANNERS: Banner[] = [
  // ── 5 from Pins ────────────────────────────────────────────────────────────
  {
    image: '/images/Pins/00680064cb1472e22a0c6a4b49379dd5.jpg',
    label: 'New Arrivals',
    href: '/collections',
  },
  {
    image: '/images/Pins/01ca6e31d85bd471e8080613d3d38162.jpg',
    label: 'Heritage Style',
    href: '/collections',
  },
  {
    image: '/images/Pins/01ca9087f70cccc74a2f1b6be6f52980.jpg',
    label: 'Bridal Couture',
    href: '/collections',
  },
  {
    image: '/images/Pins/025f0a0ad31ddd5b409c217a793e0fcf.jpg',
    label: 'Power Dressing',
    href: '/collections',
  },
  {
    image: '/images/Pins/0263d811571dd5bccf6c48532ea89dc4.jpg',
    label: 'Evening Wear',
    href: '/collections',
  },
  // ── 5 from short gown ──────────────────────────────────────────────────────
  {
    image: '/images/short%20gown/22b44a7e1929d9b67e62772bc228429f.jpg',
    label: 'Short Gown',
    href: '/collections',
  },
  {
    image: '/images/short%20gown/3103ef9862211497c26205bcc1ff370a.jpg',
    label: 'Cocktail Dress',
    href: '/collections',
  },
  {
    image: '/images/short%20gown/36e21ac024649be6c62b4dc394e8b81c.jpg',
    label: 'Party Wear',
    href: '/collections',
  },
  {
    image: '/images/short%20gown/564aea41cd94da5fab8b7f08fca1fa68.jpg',
    label: 'Mini Collection',
    href: '/collections',
  },
  {
    image: '/images/short%20gown/70a5b47b0f982124fdfda58dd177b216.jpg',
    label: 'Resort Style',
    href: '/collections',
  },
];

// Duplicate items so when offset reaches half-width we can reset seamlessly
const LOOP_BANNERS = [...BANNERS, ...BANNERS];

// Auto-scroll speed in pixels per millisecond (~90 px/s)
const SPEED = 0.09;

export default function TrendingCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);          // current scroll position (px)
  const rafRef      = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isTouching  = useRef(false);
  const touchStartX = useRef(0);
  const touchStartOffset = useRef(0);

  // Returns the pixel width of one set of items (half the track)
  const getHalfWidth = useCallback((): number => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  }, []);

  // Apply current offset to the DOM without triggering a React re-render
  const applyOffset = useCallback((px: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${px}px)`;
  }, []);

  // RAF tick — increments offset and loops seamlessly
  const tick = useCallback((time: number) => {
    if (isTouching.current) return;

    if (lastTimeRef.current !== null) {
      const dt = time - lastTimeRef.current;
      offsetRef.current += SPEED * dt;

      // Seamless loop: once we've scrolled one full set, reset
      const half = getHalfWidth();
      if (half > 0 && offsetRef.current >= half) {
        offsetRef.current -= half;
      }
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
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // ── Touch handlers ─────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    isTouching.current     = true;
    touchStartX.current    = e.touches[0].clientX;
    touchStartOffset.current = offsetRef.current;
    stopAuto();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isTouching.current) return;

    // Positive dx → user swiped right → scroll backwards
    const dx      = touchStartX.current - e.touches[0].clientX;
    const half    = getHalfWidth();
    let newOffset = touchStartOffset.current + dx;

    // Keep in [0, half) so the loop stays valid
    if (half > 0) {
      newOffset = ((newOffset % half) + half) % half;
    }

    offsetRef.current = newOffset;
    applyOffset(newOffset);
  };

  const onTouchEnd = () => {
    isTouching.current = false;
    startAuto();
  };

  return (
    <div
      className="overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // Pause auto-scroll while hovering on desktop
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
