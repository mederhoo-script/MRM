import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: `${site.brandName} | ${site.tagline}`,
    template: `%s | ${site.brandName}`,
  },
  description: site.intro,
  keywords: ['bespoke fashion', 'couture', 'luxury fashion', 'Nigerian designer', 'MRM Fashion World', 'tailoring'],
  openGraph: {
    title: site.brandName,
    description: site.intro,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
