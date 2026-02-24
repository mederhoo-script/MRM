'use client';

/**
 * DesignQuickView — Smileyque2-style full-page overlay adapted for MRM Fashion World.
 *
 * Layout:
 *   Left  : design image (3/4 aspect, object-contain so full image always shows)
 *   Right : category tag, title, interactive service selector (With Fabric / Sewing Only),
 *           WhatsApp booking CTA with tailored pre-fill per option, accordion tabs
 *   Bottom: "You May Also Like" horizontal strip of related designs
 *
 * Behaviour:
 *   • ESC closes the modal
 *   • Body scroll locked while open
 *   • onNavigate switches to a related design without closing
 *   • Service selection changes both the displayed price and the WhatsApp message
 */

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Design } from '@/lib/content';

interface Props {
  design: Design | null;
  allDesigns: Design[];
  onClose: () => void;
  onNavigate: (d: Design) => void;
}

type ServiceOption = 'with-fabric' | 'sewing-only';

const TABS = ['Description', 'Details & Care', 'Booking Info'] as const;
type Tab = (typeof TABS)[number];

const TAB_CONTENT: Record<Tab, string> = {
  'Description':
    'Each MRM piece is crafted to order with your exact measurements taken during consultation. Our master tailors use only premium fabrics sourced from trusted suppliers, ensuring a bespoke fit that is uniquely yours.',
  'Details & Care':
    '• Dry clean recommended\n• Store in a breathable garment bag\n• Iron on low heat with a pressing cloth\n• All garments are made to your measurements\n• Fabric quality: Premium blend as specified per design',
  'Booking Info':
    'Consultations are by appointment only. Once you book, our team will contact you within 24 hours to schedule your fitting session. Production takes 2–4 weeks depending on complexity. Payment is split: 60% upfront, 40% on delivery.',
};

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-brand-black text-white',
  Trending: 'bg-gold text-brand-black',
};

const WA_NUMBER = '2348034295030';

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function DesignQuickView({ design, allDesigns, onClose, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<Tab | null>('Description');
  const [service, setService] = useState<ServiceOption>('with-fabric');

  // Reset state when design changes
  useEffect(() => {
    setActiveTab('Description');
    setService('with-fabric');
  }, [design?.id]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = design ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [design]);

  // ESC to close
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!design) return null;

  const badgeStyle = design.badge ? BADGE_STYLES[design.badge] ?? 'bg-charcoal text-white' : null;

  // Related: same category, excluding current, max 8
  const related = allDesigns
    .filter(d => d.category === design.category && d.id !== design.id)
    .slice(0, 8);

  // WhatsApp messages — tailored per service option
  const waMessageWithFabric = encodeURIComponent(
    `Hello MRM Fashion World! 👋\n\nI'm interested in the *${design.title}* (${design.category}) design.\n\n✅ *Service chosen: With Fabric*\nI would like MRM Fashion World to source the fabric and handle the complete sewing for me.\n\n💰 Price: ${design.withFabricPrice}\n\nPlease confirm availability and next steps. Thank you!`
  );
  const waMessageSewingOnly = encodeURIComponent(
    `Hello MRM Fashion World! 👋\n\nI'm interested in the *${design.title}* (${design.category}) design.\n\n✅ *Service chosen: Sewing Only*\nI already have my fabric ready and would like the sewing/tailoring service only.\n\n💰 Price: ${design.sewingOnlyPrice}\n\nPlease confirm availability and next steps. Thank you!`
  );

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${service === 'with-fabric' ? waMessageWithFabric : waMessageSewingOnly}`;

  const selectedPrice = service === 'with-fabric' ? design.withFabricPrice : design.sewingOnlyPrice;

  return (
    /* ── FULL-PAGE OVERLAY ──────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={design.title}
      style={{ animation: 'fadeIn 0.25s ease-out both' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:bg-brand-black hover:text-white transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 px-6 py-3 flex items-center gap-2 font-inter text-xs text-charcoal/50">
        <button onClick={onClose} className="hover:text-gold transition-colors">Home</button>
        <span>/</span>
        <Link href="/collections" onClick={onClose} className="hover:text-gold transition-colors">{design.category}</Link>
        <span>/</span>
        <span className="text-brand-black">{design.title}</span>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 lg:gap-14">

        {/* ── LEFT: IMAGE ──────────────────────────────────────────────────── */}
        <div className="md:w-[48%] flex-shrink-0">
          <div className="relative aspect-[3/4] bg-beige overflow-hidden">
            <Image
              src={design.image}
              alt={design.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 48vw"
              priority
            />
            {badgeStyle && (
              <span className={`absolute top-3 left-3 z-10 font-inter text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${badgeStyle}`}>
                {design.badge}
              </span>
            )}
          </div>
        </div>

        {/* ── RIGHT: DETAILS ───────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Category tag */}
          <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-gold">
            {design.category}
          </p>

          {/* Title */}
          <h1 className="font-playfair text-2xl md:text-3xl font-semibold leading-snug text-brand-black">
            {design.title}
          </h1>

          <div className="w-10 h-px bg-gold" />

          {/* Description */}
          <p className="font-inter text-sm text-charcoal/70 leading-relaxed">
            {design.description}
          </p>

          {/* ── SERVICE SELECTOR ─────────────────────────────────────────── */}
          <div>
            <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal/60 mb-3">
              Choose Your Service
            </p>

            <div className="flex flex-col gap-3">
              {/* Option A: With Fabric */}
              <label
                className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all duration-200 ${
                  service === 'with-fabric'
                    ? 'border-brand-black bg-brand-black/[0.03]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value="with-fabric"
                  checked={service === 'with-fabric'}
                  onChange={() => setService('with-fabric')}
                  className="sr-only"
                />
                {/* Custom radio dot */}
                <span className={`mt-0.5 w-5 h-5 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${service === 'with-fabric' ? 'border-brand-black' : 'border-gray-300'}`}>
                  {service === 'with-fabric' && <span className="w-2.5 h-2.5 rounded-full bg-brand-black" />}
                </span>
                <div className="flex-1">
                  <p className="font-inter text-xs font-semibold text-brand-black uppercase tracking-wide">
                    With Fabric
                  </p>
                  <p className="font-inter text-[11px] text-charcoal/60 mt-0.5 leading-relaxed">
                    MRM Fashion World sources premium fabric &amp; handles everything — cutting, sewing &amp; finishing.
                  </p>
                </div>
                <span className="font-playfair text-lg font-semibold text-brand-black flex-shrink-0">
                  {design.withFabricPrice}
                </span>
              </label>

              {/* Option B: Sewing Only */}
              <label
                className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all duration-200 ${
                  service === 'sewing-only'
                    ? 'border-gold bg-gold/[0.04]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value="sewing-only"
                  checked={service === 'sewing-only'}
                  onChange={() => setService('sewing-only')}
                  className="sr-only"
                />
                {/* Custom radio dot */}
                <span className={`mt-0.5 w-5 h-5 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${service === 'sewing-only' ? 'border-gold' : 'border-gray-300'}`}>
                  {service === 'sewing-only' && <span className="w-2.5 h-2.5 rounded-full bg-gold" />}
                </span>
                <div className="flex-1">
                  <p className="font-inter text-xs font-semibold text-gold uppercase tracking-wide">
                    Sewing Only
                  </p>
                  <p className="font-inter text-[11px] text-charcoal/60 mt-0.5 leading-relaxed">
                    You supply your own fabric. We handle the expert cutting, tailoring &amp; finishing.
                  </p>
                </div>
                <span className="font-playfair text-lg font-semibold text-gold flex-shrink-0">
                  {design.sewingOnlyPrice}
                </span>
              </label>
            </div>

            {/* Contextual confirmation message */}
            <div className={`mt-3 px-4 py-3 text-[11px] font-inter leading-relaxed ${
              service === 'with-fabric'
                ? 'bg-brand-black/5 text-brand-black border-l-2 border-brand-black'
                : 'bg-gold/10 text-charcoal border-l-2 border-gold'
            }`}>
              {service === 'with-fabric'
                ? '✓ Great choice! Our team will source the finest fabric suited to this design and handle the complete production for you.'
                : '✓ Perfect! Bring your fabric along to your consultation. Our tailors will assess it and get started immediately.'
              }
            </div>
          </div>

          {/* Selected price summary */}
          <div className="flex items-center justify-between py-3 border-t border-b border-gold/20">
            <span className="font-inter text-xs text-charcoal/60 uppercase tracking-wide">
              {service === 'with-fabric' ? 'Total (fabric + sewing)' : 'Sewing service fee'}
            </span>
            <span className={`font-playfair text-2xl font-bold ${service === 'with-fabric' ? 'text-brand-black' : 'text-gold'}`}>
              {selectedPrice}
            </span>
          </div>

          {/* ── CTA: Book via WhatsApp ────────────────────────────────────── */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full font-inter text-xs tracking-[0.2em] uppercase py-4 transition-colors duration-200 ${
              service === 'with-fabric'
                ? 'bg-brand-black text-white hover:bg-gold'
                : 'bg-gold text-brand-black hover:bg-brand-black hover:text-white'
            }`}
          >
            {WA_ICON}
            {service === 'with-fabric'
              ? 'Order With Fabric via WhatsApp'
              : 'Order Sewing Only via WhatsApp'
            }
          </a>

          {/* Secondary: contact page */}
          <Link
            href={`/contact?design=${design.id}&service=${service}`}
            onClick={onClose}
            className="flex items-center justify-center w-full font-inter text-xs tracking-[0.2em] uppercase border border-brand-black text-brand-black py-3 hover:bg-brand-black hover:text-white transition-colors duration-200"
          >
            Book a Consultation Instead
          </Link>

          <p className="font-inter text-[10px] text-charcoal/40 text-center">
            Crafted to order · Bespoke fitting · 2–4 weeks production
          </p>

          {/* ── ACCORDION TABS ───────────────────────────────────────────── */}
          <div className="border-t border-gray-100 mt-2">
            {TABS.map(tab => (
              <div key={tab} className="border-b border-gray-100">
                <button
                  onClick={() => setActiveTab(t => t === tab ? null : tab)}
                  className="w-full flex items-center justify-between py-4 font-inter text-xs tracking-[0.15em] uppercase text-brand-black hover:text-gold transition-colors duration-150"
                >
                  {tab}
                  <span className="text-lg leading-none">{activeTab === tab ? '−' : '+'}</span>
                </button>
                {activeTab === tab && (
                  <div className="pb-4 font-inter text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">
                    {TAB_CONTENT[tab]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED DESIGNS ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-beige px-4 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Discover More</p>
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-brand-black">You May Also Like</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {related.map(d => (
                <button
                  key={d.id}
                  onClick={() => onNavigate(d)}
                  className="flex-shrink-0 w-40 md:w-48 text-left group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white mb-2 relative">
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="192px"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-inter text-[10px] tracking-widest uppercase text-gold mb-0.5">
                    {d.category}
                  </p>
                  <p className="font-playfair text-sm font-medium leading-snug line-clamp-2 text-brand-black group-hover:text-gold transition-colors duration-150">
                    {d.title}
                  </p>
                  <p className="font-inter text-xs text-charcoal/60 mt-1">
                    From {d.sewingOnlyPrice}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
