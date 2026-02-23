'use client';

/**
 * TrendingCarousel — Continuous auto-scrolling card strip.
 *
 * Layout:
 *   Mobile  : ~2.5 cards visible (each card = 40vw)
 *   Desktop : ~4.5 cards visible (each card = 22vw)
 *
 * Motion:
 *   Pure CSS translateX animation — seamless infinite loop via duplicated items.
 *   Pauses on hover (desktop) / touch (mobile).
 *   Images use object-contain so the full photo is always visible.
 */

import { useRef } from 'react';
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

// Duplicate items so the CSS -50% translateX loop is seamless
const LOOP_BANNERS = [...BANNERS, ...BANNERS];

export default function TrendingCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause animation on touch start, resume on touch end
  const pauseAnim = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const resumeAnim = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  return (
    /*
     * Outer wrapper clips the overflowing track.
     * Touch handlers pause/resume the CSS animation on mobile.
     */
    <div
      className="overflow-hidden"
      onTouchStart={pauseAnim}
      onTouchEnd={resumeAnim}
    >
      {/*
       * Track: flex row of 20 items (10 + 10 duplicated).
       * animate-trending-scroll slides it left by -50% continuously.
       * Hovering pauses the animation so users can inspect a card.
       */}
      <div
        ref={trackRef}
        className="flex animate-trending-scroll hover:[animation-play-state:paused]"
      >
        {LOOP_BANNERS.map((b, i) => (
          <Link
            key={i}
            href={b.href}
            /*
             * Card width:
             *   40vw mobile  → 100 / 40 = 2.5 cards visible
             *   22vw desktop → 100 / 22 ≈ 4.5 cards visible
             * px-1.5 gives a small gap between cards.
             */
            className="flex-shrink-0 w-[40vw] md:w-[22vw] px-1.5 block group"
            draggable={false}
          >
            {/* Fixed-height card so all cards are the same size */}
            <div className="h-[220px] md:h-[300px] relative overflow-hidden bg-beige">
              <Image
                src={b.image}
                alt={b.label}
                fill
                /*
                 * object-contain ensures the entire image is always visible,
                 * regardless of the image's own aspect ratio.
                 * The beige background fills any letterbox space.
                 */
                className="object-contain"
                sizes="(max-width: 768px) 40vw, 22vw"
                loading={i < 5 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
            {/* Label below card */}
            <p className="font-playfair text-sm font-semibold text-brand-black mt-2 truncate px-0.5">
              {b.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
