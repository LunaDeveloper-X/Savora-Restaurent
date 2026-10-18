import { Heart, Eye } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';

interface MenuCardProps {
  item: MenuItem;
  onViewDetails: (item: MenuItem) => void;
}

export default function MenuCard({ item, onViewDetails }: MenuCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(item.id);

  return (
    <article className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square md:aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-espresso-900/80 text-cream-100 text-[8px] md:text-[10px] font-medium uppercase tracking-[0.08em] md:tracking-[0.12em] px-2 py-1 md:px-3 md:py-1.5 max-w-[65%] truncate">
          {item.category}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center bg-white/90 hover:bg-white shadow-sm transition-all duration-300"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={15}
            className={`md:w-[18px] md:h-[18px] transition-colors duration-300 ${
              fav ? 'fill-wine-600 text-wine-600' : 'text-espresso-400'
            }`}
          />
        </button>
        {item.dietaryLabels && item.dietaryLabels.length > 0 && (
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex flex-wrap gap-1 md:gap-1.5">
            {item.dietaryLabels.slice(0, 2).map((label, i) => (
              <span
                key={label}
                className={`text-[7px] md:text-[9px] font-medium uppercase tracking-[0.08em] md:tracking-[0.1em] bg-amber-500/90 text-espresso-900 px-1.5 py-0.5 md:px-2 md:py-1 ${
                  i === 1 ? 'hidden md:inline' : ''
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 md:gap-3 mb-1 md:mb-2">
          <h3 className="text-xs md:text-base font-serif font-medium text-espresso-800 leading-snug">
            {item.name}
          </h3>
          <span className="text-xs md:text-base font-serif text-amber-600 whitespace-nowrap">
            ${item.price}
          </span>
        </div>
        <p className="text-[10px] md:text-sm leading-snug md:leading-relaxed text-espresso-400 flex-grow line-clamp-2">
          {item.description}
        </p>
        {item.rating && (
          <div className="mt-2 md:mt-3 flex items-center gap-1 md:gap-1.5">
            <span className="text-amber-500 text-xs md:text-sm">★</span>
            <span className="text-[10px] md:text-xs font-medium text-espresso-500">
              {item.rating.toFixed(1)}
            </span>
          </div>
        )}
        <button
          onClick={() => onViewDetails(item)}
          className="mt-3 md:mt-4 flex items-center justify-center gap-1.5 md:gap-2 w-full py-2 md:py-2.5 text-[9px] md:text-xs font-medium uppercase tracking-[0.08em] md:tracking-[0.12em] border border-espresso-200 text-espresso-600 hover:bg-espresso-800 hover:text-cream-50 hover:border-espresso-800 transition-all duration-300"
        >
          <Eye size={13} className="md:w-[15px] md:h-[15px]" />
          View Details
        </button>
      </div>
    </article>
  );
}