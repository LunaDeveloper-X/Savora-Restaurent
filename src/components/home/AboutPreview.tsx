import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { CheckCircle } from 'lucide-react';

const highlights = [
  'Seasonal menus crafted from local ingredients',
  'Open kitchen with a view of the chefs at work',
  'Private dining available for special occasions',
  'Curated wine list with over 200 labels',
];

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-32 bg-espresso-900">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Images */}
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8856508/pexels-photo-8856508.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                  alt="Elegant table setting in SAVORA restaurant"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-right-8 w-48 md:w-60 aspect-square overflow-hidden border-8 border-espresso-900 shadow-2xl hidden sm:block">
                <img
                  src="https://images.pexels.com/photos/1327393/pexels-photo-1327393.jpeg?auto=compress&cs=tinysrgb&h=480&w=480"
                  alt="Gourmet plated dish"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={150}>
            <p className="text-eyebrow text-amber-300 mb-4">Our Story</p>
            <h2 className="text-display font-serif font-light text-cream-50">
              A Restaurant Born from Passion
            </h2>
            <div className="mt-6 h-px w-12 bg-amber-400" />
            <p className="mt-6 text-base leading-relaxed text-cream-100/70">
              Founded in 2015, SAVORA began as a vision to create a dining experience that feels both
              refined and deeply personal. Our founder and head chef, Marco Bianchi, brought his
              experience from Michelin-starred kitchens across Europe to build a place where
              exceptional food meets genuine warmth.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream-100/70">
              Today, SAVORA is a destination for those who appreciate the art of dining — where every
              plate is composed with intention, and every guest is treated as family.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-cream-100/80">
                  <CheckCircle size={18} className="text-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button to="/about" variant="primary" size="md">
                Discover SAVORA
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
