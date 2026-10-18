import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { featuredDishes } from '@/data/menu';

export default function FeaturedDishes() {
  return (
    <section className="py-12 md:py-32 bg-cream-50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Chef's Selection"
          title="Featured Dishes"
          description="A curated taste of what SAVORA does best — each dish crafted with seasonal ingredients and an uncompromising attention to detail."
        />

        <div className="mt-8 md:mt-16 grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-3">
          {featuredDishes.map((dish, idx) => (
            <Reveal key={dish.id} delay={(idx % 3) * 100}>
              <article className="group h-full bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-amber-500 text-espresso-900 text-[8px] md:text-[10px] font-medium uppercase tracking-[0.1em] md:tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5">
                    {dish.tags?.includes('Signature') ? 'Signature' : 'Featured'}
                  </div>
                </div>
                <div className="p-3 md:p-6">
                  <div className="flex items-start justify-between gap-2 md:gap-4 mb-1 md:mb-3">
                    <h3 className="text-xs md:text-xl font-serif font-medium text-espresso-800 leading-snug">
                      {dish.name}
                    </h3>
                    <span className="text-xs md:text-lg font-serif text-amber-600 whitespace-nowrap">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-sm leading-snug md:leading-relaxed text-espresso-400 line-clamp-2 md:line-clamp-none">
                    {dish.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 md:mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.15em] md:tracking-[0.18em] text-espresso-700 hover:text-amber-600 transition-colors group"
          >
            View Full Menu
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}