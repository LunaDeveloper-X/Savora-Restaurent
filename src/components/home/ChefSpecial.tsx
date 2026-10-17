import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { chefSpecials } from '@/data/menu';

export default function ChefSpecial() {
  return (
    <section className="py-24 md:py-32 bg-espresso-900">
      <div className="container-wide">
        <SectionHeading
          eyebrow="From the Kitchen"
          title="Chef's Special"
          description="Handpicked creations by Chef Marco — dishes that represent the very best of our seasonal craft."
          light
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {chefSpecials.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 100}>
              <Link to="/menu" className="group block h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-300 mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-medium text-cream-50 leading-snug">
                      {item.name}
                    </h3>
                    {item.rating && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs text-cream-100/70">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-serif text-amber-300">
                        ${item.price}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-cream-100/60 group-hover:text-amber-300 transition-colors">
                        View Menu →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
