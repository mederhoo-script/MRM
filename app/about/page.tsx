import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind MRM Fashion World — craftsmanship, identity, and the art of bespoke tailoring.',
};

export default function AboutPage() {
  const site = getSiteConfig();
  const { about } = site;

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/man001.jpg"
            alt="About MRM Fashion World"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Story</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white">{about.headline}</h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-6">The Atelier</p>
            <p className="font-playfair text-xl md:text-2xl text-brand-black leading-relaxed mb-8">
              {about.story}
            </p>
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="font-playfair italic text-base text-charcoal/70 leading-relaxed">
              &ldquo;{about.philosophy}&rdquo;
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/short%20gown/36e21ac024649be6c62b4dc394e8b81c.jpg"
                alt="Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-4">What We Stand For</p>
            <h2 className="font-playfair text-3xl text-brand-black">Our Principles</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((value) => (
              <div key={value.title} className="text-center p-8 bg-white border border-gold/10">
                <div className="w-8 h-px bg-gold mx-auto mb-6" />
                <h3 className="font-playfair text-xl text-brand-black mb-4">{value.title}</h3>
                <p className="font-inter text-sm text-charcoal/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-black text-center">
        <div className="max-w-xl mx-auto">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-4">Work With Us</p>
          <h2 className="font-playfair text-3xl text-white mb-6">Commission Your Piece</h2>
          <div className="gold-divider" />
          <p className="font-inter text-sm text-white/60 mb-10 leading-relaxed">
            Every garment begins with a conversation. Let us understand your vision.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
