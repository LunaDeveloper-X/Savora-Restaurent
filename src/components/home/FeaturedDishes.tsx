import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { featuredDishes } from '@/data/menu';

export default function FeaturedDishes() {
  return (
    <section className="py-24 md:py-32 bg-cream-50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Chef's Selection"
          title="Featured Dishes"
          description="A curated taste of what SAVORA does best — each dish crafted with seasonal ingredients and an uncompromising attention to detail."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((dish, idx) => (
            <Reveal key={dish.id} delay={idx * 100}>
              <article className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-espresso-900 text-[10px] font-medium uppercase tracking-[0.15em] px-3 py-1.5">
                    {dish.tags?.includes('Signature') ? 'Signature' : 'Featured'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-serif font-medium text-espresso-800">{dish.name}</h3>
                    <span className="text-lg font-serif text-amber-600 whitespace-nowrap">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-espresso-400">{dish.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-espresso-700 hover:text-amber-600 transition-colors group"
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
