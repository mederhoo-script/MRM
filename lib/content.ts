import siteData from '@/content/site.json';
import collectionsData from '@/content/collections.json';
import testimonialsData from '@/content/testimonials.json';
import designsData from '@/content/designs.json';

export type SiteConfig = typeof siteData;
export type Collection = (typeof collectionsData)[0];
export type Testimonial = (typeof testimonialsData)[0];

/** One design entry — discount fields are optional */
export interface Design {
  id: string;
  title: string;
  category: string;
  badge: string | null;
  image: string;
  withFabricPrice: string;
  sewingOnlyPrice: string;
  description: string;
  /** Original (pre-discount) price for the With Fabric option */
  withFabricOriginalPrice?: string | null;
  /** Original (pre-discount) price for the Sewing Only option */
  sewingOnlyOriginalPrice?: string | null;
}

export function getSiteConfig(): SiteConfig {
  return siteData;
}

export function getCollections(): Collection[] {
  return collectionsData;
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData;
}

export function getDesigns(): Design[] {
  return designsData as Design[];
}
