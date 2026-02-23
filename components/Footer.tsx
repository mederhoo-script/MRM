import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40">
                <Image
                  src="/images/logo.jpg"
                  alt="MRM Fashion World"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-playfair text-white text-lg">
                MRM <span className="text-gold">Fashion World</span>
              </span>
            </div>
            <p className="font-inter text-sm text-white/50 leading-relaxed max-w-xs">
              {site.intro}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-playfair text-white text-sm tracking-widest uppercase mb-6">Atelier</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/collections', label: 'Collections' },
                { href: '/process', label: 'The Process' },
                { href: '/contact', label: 'Book Consultation' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/50 hover:text-gold transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white text-sm tracking-widest uppercase mb-6">Contact</h4>
            <div className="space-y-3">
              <p className="font-inter text-sm text-white/50">{site.contact.location}</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="block font-inter text-sm text-gold hover:text-gold-light transition-colors"
              >
                {site.contact.email}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-inter text-sm text-gold hover:text-gold-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-white/30 tracking-wide">
            © {currentYear} MRM Fashion World. All rights reserved.
          </p>
          <p className="font-inter text-xs text-white/30 tracking-wide">
            Designed Exclusively For You
          </p>
        </div>
      </div>
    </footer>
  );
}
