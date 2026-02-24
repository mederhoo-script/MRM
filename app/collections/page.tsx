import type { Metadata } from 'next';
import Image from 'next/image';
import DesignsSection from '@/components/DesignsSection';
import { getDesigns } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all MRM Fashion World designs — bespoke evening couture, bridal, heritage and luxury menswear.',
};

export default function CollectionsPage() {
  const designs = getDesigns();

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero003.png"
            alt="Collections"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Lookbook</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white">The Collections</h1>
          <p className="font-inter text-sm text-white/60 mt-3">{designs.length} designs available</p>
        </div>
      </section>

      {/* Pricing legend */}
      <div className="bg-beige border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-charcoal/50">Service options:</p>
          <div className="flex items-center gap-2">
            {/* Black square icon = With Fabric */}
            <span className="w-3 h-3 bg-brand-black flex-shrink-0" aria-hidden="true" />
            <span className="font-inter text-xs font-semibold text-brand-black">With Fabric:</span>
            <span className="font-inter text-xs text-charcoal/70">Designer sources &amp; sews the fabric for you</span>
          </div>
          <div className="w-px h-4 bg-gold/30 hidden sm:block" />
          <div className="flex items-center gap-2">
            {/* Gold square icon = Sewing Only */}
            <span className="w-3 h-3 bg-gold flex-shrink-0" aria-hidden="true" />
            <span className="font-inter text-xs font-semibold text-gold">Sewing Only:</span>
            <span className="font-inter text-xs text-charcoal/70">You supply the fabric, we handle the craft</span>
          </div>
          {/* Instruction visible on all sizes */}
          <p className="font-inter text-[10px] text-charcoal/40 w-full sm:w-auto sm:ml-auto">
            👆 Tap any design to choose your service &amp; book via WhatsApp
          </p>
        </div>
      </div>

      {/* Full Design Grid with Quick View */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <DesignsSection designs={designs} />
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-brand-black text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-gold text-6xl font-playfair mb-4 leading-none">&ldquo;</div>
          <p className="font-playfair italic text-xl md:text-2xl text-white leading-relaxed mb-6">
            Fashion fades, only style remains the same.
          </p>
          <div className="w-8 h-px bg-gold mx-auto" />
        </div>
      </section>
    </>
  );
}
