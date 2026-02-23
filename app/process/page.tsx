import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The Process',
  description: 'Discover the MRM Fashion World bespoke journey — from consultation to your final, perfect garment.',
};

export default function ProcessPage() {
  const site = getSiteConfig();
  const { process } = site;

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/process1.png"
            alt="The Bespoke Process"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Bespoke</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white">{process.headline}</h1>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-inter text-sm text-charcoal/60 leading-relaxed">{process.subtitle}</p>
          </div>

          <div className="space-y-0">
            {process.steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row gap-8 pb-16 ${
                  i < process.steps.length - 1 ? 'border-b border-gold/10 mb-16' : ''
                } ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="font-playfair text-5xl text-gold/20">{step.number}</span>
                  </div>
                  <h2 className="font-playfair text-2xl text-brand-black mb-4">{step.title}</h2>
                  <div className="w-8 h-px bg-gold mb-4" />
                  <p className="font-inter text-sm text-charcoal/70 leading-relaxed">{step.description}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-sm aspect-square border border-gold/20 flex items-center justify-center bg-beige">
                    <span className="font-playfair text-8xl text-gold/10">{step.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/process2.png"
          alt="Fabric"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center">
          <div className="text-center">
            <p className="font-playfair italic text-2xl text-white">
              Every detail. Every thread. Every you.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-black text-center">
        <div className="max-w-xl mx-auto">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-4">Ready to Begin?</p>
          <h2 className="font-playfair text-3xl text-white mb-6">Start Your Bespoke Journey</h2>
          <div className="gold-divider" />
          <p className="font-inter text-sm text-white/60 mb-10">
            Your story begins with a single conversation. Book your consultation today.
          </p>
          <Link href="/contact" className="btn-primary">
            Book Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
