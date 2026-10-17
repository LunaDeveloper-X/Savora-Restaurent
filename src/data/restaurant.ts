import type { Specialty } from '@/types';

export const specialties: Specialty[] = [
  {
    id: 'sp-1',
    title: 'Seasonal Ingredients',
    description:
      'Our menu changes with the seasons. We partner with local farms and fisheries to source the freshest ingredients at their peak.',
    icon: 'Leaf',
  },
  {
    id: 'sp-2',
    title: 'Crafted by Hand',
    description:
      'Pasta rolled in-house, breads baked daily, and sauces reduced for hours. Every dish carries the mark of patient, deliberate craftsmanship.',
    icon: 'Utensils',
  },
  {
    id: 'sp-3',
    title: 'Curated Wine Pairings',
    description:
      'Our sommelier has assembled a cellar of over 200 labels, with pairings designed to elevate every course of your meal.',
    icon: 'Wine',
  },
  {
    id: 'sp-4',
    title: 'Warm Hospitality',
    description:
      'Fine dining should never feel stiff. Our team creates an atmosphere where elegance meets warmth — where you feel genuinely cared for.',
    icon: 'Heart',
  },
];

export const restaurantInfo = {
  name: 'SAVORA',
  tagline: 'Fine food. Beautiful moments.',
  address: '184 Grove Street, New York, NY 10014',
  phone: '(212) 555-0184',
  email: 'hello@savora.com',
  hours: [
    { day: 'Monday – Thursday', time: '12:00 PM – 10:00 PM' },
    { day: 'Friday – Sunday', time: '12:00 PM – 11:00 PM' },
  ],
  social: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
  },
};
