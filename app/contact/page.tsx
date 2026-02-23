import type { Metadata } from 'next';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';
import { getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description: 'Book a bespoke consultation with MRM Fashion World. Available by appointment only.',
};

export default function ContactPage() {
  const site = getSiteConfig();
  const { contact } = site;

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero002.jpeg"
            alt="Book a Consultation"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Consultation</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white">{contact.headline}</h1>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-4">Book an Appointment</p>
            <h2 className="font-playfair text-2xl text-brand-black mb-2">Let&apos;s Begin Your Story</h2>
            <div className="w-8 h-px bg-gold mb-8" />
            <p className="font-inter text-sm text-charcoal/70 mb-8 leading-relaxed">
              {contact.subtitle} Fill in the form below and we will connect via WhatsApp to schedule your private consultation.
            </p>
            <BookingForm whatsapp={site.whatsapp} whatsappMessage={contact.whatsappMessage} />
          </div>

          {/* Info */}
          <div className="lg:pl-8">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-4">Contact Details</p>
            <h2 className="font-playfair text-2xl text-brand-black mb-8">Find Us</h2>

            <div className="space-y-8">
              <div>
                <h4 className="font-inter text-xs tracking-widest uppercase text-charcoal/50 mb-2">Location</h4>
                <p className="font-playfair text-lg text-brand-black">{contact.location}</p>
              </div>
              <div className="w-16 h-px bg-gold/30" />
              <div>
                <h4 className="font-inter text-xs tracking-widest uppercase text-charcoal/50 mb-2">Email</h4>
                <a href={`mailto:${contact.email}`} className="font-playfair text-lg text-brand-black hover:text-gold transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="w-16 h-px bg-gold/30" />
              <div>
                <h4 className="font-inter text-xs tracking-widest uppercase text-charcoal/50 mb-2">WhatsApp</h4>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 font-inter text-sm font-medium hover:bg-[#20c25a] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
              <div className="w-16 h-px bg-gold/30" />
              <div className="bg-beige p-6 border-l-2 border-gold">
                <p className="font-playfair italic text-sm text-charcoal/80 leading-relaxed">
                  &ldquo;We do not rush the art of creation. Each piece is given the time it deserves to become extraordinary.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
