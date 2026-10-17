import { X, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { menuItems } from '@/data/menu';

export default function FavoritesDrawer() {
  const { favorites, isOpen, closeFavorites, toggleFavorite } = useFavorites();

  const favItems = menuItems.filter((item) => favorites.includes(item.id));

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-espresso-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeFavorites}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-cream-50 shadow-2xl transition-transform duration-400 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso-200 bg-white">
          <div className="flex items-center gap-3">
            <Heart size={20} className="fill-wine-600 text-wine-600" />
            <h2 className="text-lg font-serif font-medium text-espresso-800">
              Favorites
            </h2>
            {favorites.length > 0 && (
              <span className="bg-wine-600 text-cream-50 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </div>
          <button
            onClick={closeFavorites}
            className="text-espresso-400 hover:text-espresso-700 transition-colors"
            aria-label="Close favorites"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {favItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <Heart size={48} className="text-espresso-200 mb-4" />
            <p className="text-lg font-serif text-espresso-400">No favorites yet</p>
            <p className="mt-2 text-sm text-espresso-300">
              Tap the heart icon on any dish to save it here for later.
            </p>
            <Link
              to="/menu"
              onClick={closeFavorites}
              className="mt-6 px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] bg-espresso-800 text-cream-50 hover:bg-espresso-900 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {favItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-serif font-medium text-espresso-800 leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-espresso-400 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-serif text-amber-600">
                      ${item.price}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.1em] text-espresso-400">
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="self-start text-espresso-300 hover:text-wine-600 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
