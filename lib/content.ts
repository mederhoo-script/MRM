import siteData from '@/content/site.json';
import collectionsData from '@/content/collections.json';
import testimonialsData from '@/content/testimonials.json';
import designsData from '@/content/designs.json';

export type SiteConfig = typeof siteData;
export type Collection = (typeof collectionsData)[0];
export type Testimonial = (typeof testimonialsData)[0];
export type Design = (typeof designsData)[0];

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
  return designsData;
}
