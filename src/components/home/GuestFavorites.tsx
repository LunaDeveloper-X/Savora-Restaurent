import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { guestFavorites } from '@/data/menu';

export default function GuestFavorites() {
  return (
    <section className="py-24 md:py-32 bg-cream-50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Loved by Our Guests"
          title="Guest Favorites"
          description="The dishes our diners keep coming back for — rated and recommended by the people who matter most."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guestFavorites.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) * 100}>
              <Link to="/menu" className="group block h-full bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 shadow-sm">
                    <Heart size={16} className="fill-wine-600 text-wine-600" />
                  </div>
                  {item.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-espresso-900/80 px-2.5 py-1.5">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-cream-50">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-serif font-medium text-espresso-800 leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-base font-serif text-amber-600 whitespace-nowrap">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-espresso-400 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-amber-600">
                    {item.category}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-block px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] border border-espresso-300 text-espresso-600 hover:bg-espresso-800 hover:text-cream-50 hover:border-espresso-800 transition-all duration-300"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
