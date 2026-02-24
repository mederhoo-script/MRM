'use client';

/**
 * HeroCarousel — Sliding full-screen hero
 *
 * Full-width image slides move horizontally via CSS transform translateX —
 * both on auto-play and live touch drag.
 *
 * Touch behaviour:
 *   onTouchMove → slides follow the finger in real-time
 *   onTouchEnd  → snaps forward/back if drag > 40 px, else snaps back
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  bg: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaHref: string;
}

const slides: Slide[] = [
  {
    bg: '/images/hero001.jpg',
    tag: 'New Arrivals',
    title: 'Wear Your Story',
    subtitle: 'Bespoke luxury fashion crafted for extraordinary moments',
    ctaHref: '/collections',
  },
  {
    bg: '/images/hero002.jpeg',
    tag: 'Trending Now',
    title: 'Heritage Elegance',
    subtitle: 'Dramatic silhouettes that command every room you enter',
    ctaHref: '/collections',
  },
  {
    bg: '/images/hero002a.jpeg',
    tag: 'The Atelier',
    title: 'Crafted With Intention',
    subtitle: 'Every stitch tells a story of artistry and dedication',
    ctaHref: '/about',
  },
  {
    bg: '/images/hero003.png',
    tag: 'Bridal 2026',
    title: 'Your Perfect Day',
    subtitle: 'Fully bespoke bridal creations tailored to your vision',
    ctaHref: '/contact',
  },
  {
    bg: '/images/hero004.jpg',
    tag: "Men's Collection",
    title: 'Dressed to Inspire',
    subtitle: 'Impeccably tailored menswear for the modern gentleman',
    ctaHref: '/collections',
  },
];

const TOTAL = slides.length;
const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 500;
const MAX_DRAG_PERCENT = 0.8;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTrans] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = null;
  }, []);

  const goTo = useCallback((idx: number) => {
    const target = ((idx % TOTAL) + TOTAL) % TOTAL;
    setTrans(true);
    setDragOffset(0);
    setCurrent(target);
    setTimeout(() => setTrans(false), TRANSITION_MS + 50);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const startAuto = useCallback(() => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      setCurrent(c => {
        const target = (c + 1) % TOTAL;
        setTrans(true);
        setDragOffset(0);
        setTimeout(() => setTrans(false), TRANSITION_MS + 50);
        return target;
      });
    }, AUTOPLAY_MS);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  useEffect(() => {
    const update = () => {
      containerWidthRef.current = containerRef.current?.offsetWidth ?? window.innerWidth;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    stopAuto();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      const w = containerWidthRef.current || window.innerWidth;
      setDragOffset(Math.max(-w * MAX_DRAG_PERCENT, Math.min(w * MAX_DRAG_PERCENT, dx)));
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    } else {
      setTrans(true);
      setDragOffset(0);
      setTimeout(() => setTrans(false), TRANSITION_MS + 50);
    }
    startAuto();
  };

  const translateX = `calc(${-current * (100 / TOTAL)}% + ${dragOffset}px)`;
  const slide = slides[current];

  return (
    <section
      className="relative flex h-screen min-h-[600px] overflow-hidden select-none"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* LEFT PANEL — full width */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide track */}
        <div
          className="flex h-full"
          style={{
            width: `${TOTAL * 100}%`,
            transform: `translateX(${translateX})`,
            transition: isDragging.current
              ? 'none'
              : `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            willChange: 'transform',
          }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / TOTAL}%` }}
            >
              <Image
                src={s.bg}
                alt={s.title}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/50 z-20" />

        {/* Slide text content */}
        <div
          key={current}
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-20 pb-24 pointer-events-none"
        >
          <p className="font-inter text-[11px] tracking-[0.45em] uppercase text-gold mb-5 animate-hero-fade-up">
            {slide.tag}
          </p>
          <h1
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 animate-hero-fade-up"
            style={{ animationDelay: '0.08s' }}
          >
            {slide.title}
          </h1>
          <p
            className="font-inter text-sm text-white/70 max-w-xs mb-8 leading-relaxed animate-hero-fade-up hidden sm:block"
            style={{ animationDelay: '0.15s' }}
          >
            {slide.subtitle}
          </p>
          <div
            className="flex flex-col sm:flex-row items-start gap-3 animate-hero-fade-up pointer-events-auto"
            style={{ animationDelay: '0.22s' }}
          >
            <Link href={slide.ctaHref} className="btn-primary">
              Shop This Look
            </Link>
            <Link href="/about" className="font-inter text-[11px] tracking-[0.3em] uppercase border border-white/70 text-white px-8 py-3.5 hover:bg-white/10 transition-colors duration-300">
              Discover More
            </Link>
          </div>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center border border-white/50 text-white bg-white/10 hover:bg-white/25 transition-all duration-200 hidden md:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center border border-white/50 text-white bg-white/10 hover:bg-white/25 transition-all duration-200 hidden md:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-8 md:left-16 z-30 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={[
                'transition-all duration-300',
                i === current
                  ? 'w-7 h-[3px] bg-gold'
                  : 'w-[6px] h-[6px] rounded-full bg-white/50 hover:bg-white/80',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <div
            key={`progress-${current}`}
            className="h-full bg-gold"
            style={{ animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards` }}
          />
        </div>
      </div>
    </section>
  );
}
