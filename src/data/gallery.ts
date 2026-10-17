import type { GalleryImage, GalleryCategory } from '@/types';

export const galleryImages: GalleryImage[] = [
  // Interior
  {
    id: 'g-1',
    src: 'https://images.pexels.com/photos/20184685/pexels-photo-20184685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Luxurious restaurant interior with elegant tables',
    category: 'Interior',
  },
  {
    id: 'g-2',
    src: 'https://images.pexels.com/photos/12688961/pexels-photo-12688961.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern restaurant interior with warm ambiance',
    category: 'Interior',
  },
  {
    id: 'g-3',
    src: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Elegant restaurant dining room with soft lighting',
    category: 'Interior',
  },

  // Dining table
  {
    id: 'g-4',
    src: 'https://images.pexels.com/photos/14885437/pexels-photo-14885437.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Elegant table setting with glassware and flowers',
    category: 'Dining table',
  },
  {
    id: 'g-5',
    src: 'https://images.pexels.com/photos/8856554/pexels-photo-8856554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Intimate dining setup with candles',
    category: 'Dining table',
  },
  {
    id: 'g-6',
    src: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Beautifully set dining table with fine dinnerware',
    category: 'Dining table',
  },

  // Chef preparing food
  {
    id: 'g-7',
    src: 'https://images.pexels.com/photos/4253300/pexels-photo-4253300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Chefs cooking in a contemporary open kitchen',
    category: 'Chef preparing food',
  },
  {
    id: 'g-8',
    src: 'https://images.pexels.com/photos/13422410/pexels-photo-13422410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Chef chopping vegetables in a professional kitchen',
    category: 'Chef preparing food',
  },
  {
    id: 'g-9',
    src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Chef plating a gourmet dish with precision',
    category: 'Chef preparing food',
  },

  // Steak
  {
    id: 'g-10',
    src: 'https://images.pexels.com/photos/27643022/pexels-photo-27643022.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Perfectly grilled steak with herbs',
    category: 'Steak',
  },
  {
    id: 'g-11',
    src: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Beef tenderloin with pepper sauce',
    category: 'Steak',
  },

  // Pasta
  {
    id: 'g-12',
    src: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Spaghetti Bolognese with fresh herbs',
    category: 'Pasta',
  },
  {
    id: 'g-13',
    src: 'https://images.pexels.com/photos/546945/pexels-photo-546945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Spaghetti Carbonara with crispy bacon',
    category: 'Pasta',
  },

  // Dessert
  {
    id: 'g-14',
    src: 'https://images.pexels.com/photos/10480244/pexels-photo-10480244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Chocolate lava cake with ice cream',
    category: 'Dessert',
  },
  {
    id: 'g-15',
    src: 'https://images.pexels.com/photos/241556/pexels-photo-241556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Classic creamy cheesecake',
    category: 'Dessert',
  },

  // Coffee
  {
    id: 'g-16',
    src: 'https://images.pexels.com/photos/19252265/pexels-photo-19252265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Beautiful cappuccino with latte art',
    category: 'Coffee',
  },
  {
    id: 'g-17',
    src: 'https://images.pexels.com/photos/459489/pexels-photo-459489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cafe latte with delicate foam art',
    category: 'Coffee',
  },

  // Mocktail
  {
    id: 'g-18',
    src: 'https://images.pexels.com/photos/11009211/pexels-photo-11009211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Refreshing virgin mojito with mint and lime',
    category: 'Mocktail',
  },
  {
    id: 'g-19',
    src: 'https://images.pexels.com/photos/5609524/pexels-photo-5609524.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Strawberry mojito mocktail with fresh berries',
    category: 'Mocktail',
  },
];

export const galleryCategories: GalleryCategory[] = [
  'Interior',
  'Dining table',
  'Chef preparing food',
  'Steak',
  'Pasta',
  'Dessert',
  'Coffee',
  'Mocktail',
];
