import type { Content } from '../content/hv';

export const contractor = (content: Content): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hvconstruction.sv/#contractor',
    name: content.companyName,
    description: content.hero.description,
    image: content.hero.image,
    url: content.hero.website,
    telephone: content.contact.phone,
    areaServed: content.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SV',
      addressRegion: 'San Salvador',
      addressLocality: 'San Salvador',
    },
    sameAs: content.contact.socials,
    serviceType: content.services,
    makesOffer: content.services.map((service) => ({ '@type': 'Offer', itemOffered: service })),
  };

  return JSON.stringify(data);
};
