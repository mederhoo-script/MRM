import type { Metadata } from 'next';
import Image from 'next/image';
import LookCard from '@/components/LookCard';
import { getCollections } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse the MRM Fashion World lookbook — bespoke evening couture, bridal, and luxury menswear.',
};

export default function CollectionsPage() {
  const collections = getCollections();

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
        </div>
      </section>

      {/* Collections Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-inter text-sm text-charcoal/60 max-w-xl mx-auto leading-relaxed">
              Each collection is a study in restraint and intention. Click any piece to discover its story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, i) => (
              <LookCard key={collection.id} collection={collection} index={i} />
            ))}
          </div>
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
