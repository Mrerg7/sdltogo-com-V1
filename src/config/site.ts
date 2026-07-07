export const SITE = {
  name: 'sdltogo.com',
  title: 'sdltogo.com | Premium Domain for Scottsdale Catering, Event Staffing & Delivery',
  description:
    'sdltogo.com — The premium domain for custom delivery, catering, party setup, and premium event staffing in Scottsdale, Arizona. Available for acquisition.',
  url: 'https://sdltogo.com/',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  location: 'Scottsdale, Arizona',
  googleSiteVerification: '8iHRiEt_VxFI4w7p8cVWAE0OotqQDRsk4UlEHoIvziM',
} as const;

export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  heroImageId: '87df5cf7-2bd4-4e8c-fafc-90a471f34900',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('sdltogo.com Domain Acquisition Inquiry')}&body=${encodeURIComponent('Hello,\n\nI am interested in acquiring sdltogo.com.\n\nIntended use:\nBudget range:\n\nThank you.')}`;

export const DISCLAIMER_DATE = 'July 7, 2026';
