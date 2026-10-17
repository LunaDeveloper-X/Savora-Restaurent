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
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-espresso-900/80 text-cream-100 text-[10px] font-medium uppercase tracking-[0.12em] px-3 py-1.5">
          {item.category}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white shadow-sm transition-all duration-300"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${
              fav ? 'fill-wine-600 text-wine-600' : 'text-espresso-400'
            }`}
          />
        </button>
        {item.dietaryLabels && item.dietaryLabels.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {item.dietaryLabels.slice(0, 2).map((label) => (
              <span
                key={label}
                className="text-[9px] font-medium uppercase tracking-[0.1em] bg-amber-500/90 text-espresso-900 px-2 py-1"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-serif font-medium text-espresso-800 leading-snug">
            {item.name}
          </h3>
          <span className="text-base font-serif text-amber-600 whitespace-nowrap">
            ${item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-espresso-400 flex-grow line-clamp-2">
          {item.description}
        </p>
        {item.rating && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-xs font-medium text-espresso-500">{item.rating.toFixed(1)}</span>
          </div>
        )}
        <button
          onClick={() => onViewDetails(item)}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium uppercase tracking-[0.12em] border border-espresso-200 text-espresso-600 hover:bg-espresso-800 hover:text-cream-50 hover:border-espresso-800 transition-all duration-300"
        >
          <Eye size={15} />
          View Details
        </button>
      </div>
    </article>
  );
}
