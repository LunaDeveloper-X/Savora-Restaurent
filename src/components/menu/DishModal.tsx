import { useState, useEffect } from 'react';
import { X, Heart, Plus, Minus, Star } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { menuItems } from '@/data/menu';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSelectRelated: (item: MenuItem) => void;
}

export default function DishModal({ item, onClose, onSelectRelated }: DishModalProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, { groupTitle: string; optionLabel: string; priceModifier: number } | null>
  >({});

  useEffect(() => {
    if (item) {
      setQuantity(1);
      const initial: Record<string, { groupTitle: string; optionLabel: string; priceModifier: number } | null> = {};
      item.customization?.forEach((group) => {
        if (group.type === 'single') {
          initial[group.title] = {
            groupTitle: group.title,
            optionLabel: group.options[0].label,
            priceModifier: group.options[0].priceModifier,
          };
        }
      });
      setSelectedOptions(initial);
    }
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const fav = isFavorite(item.id);

  const handleSingleSelect = (groupTitle: string, label: string, modifier: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupTitle]: { groupTitle, optionLabel: label, priceModifier: modifier },
    }));
  };

  const handleMultiSelect = (groupTitle: string, label: string, modifier: number) => {
    setSelectedOptions((prev) => {
      const key = `${groupTitle}__${label}`;
      const existing = prev[key];
      if (existing) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { groupTitle, optionLabel: label, priceModifier: modifier } };
    });
  };

  const collectedOptions = Object.values(selectedOptions).filter(
    (v): v is { groupTitle: string; optionLabel: string; priceModifier: number } => v !== null
  );

  const modifiersTotal = collectedOptions.reduce((sum, o) => sum + o.priceModifier, 0);
  const unitPrice = item.price + modifiersTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity, collectedOptions);
    onClose();
  };

  const relatedDishes = menuItems
    .filter((mi) => mi.category === item.category && mi.id !== item.id)
    .slice(0, 3);

  const dietaryColors: Record<string, string> = {
    Vegetarian: 'bg-sage-100 text-sage-700',
    Spicy: 'bg-wine-100 text-wine-700',
    "Chef's Choice": 'bg-amber-100 text-amber-700',
    Popular: 'bg-espresso-100 text-espresso-700',
    New: 'bg-sage-100 text-sage-700',
    'Contains Dairy': 'bg-amber-50 text-amber-600',
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-espresso-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-cream-50 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white shadow-md transition-all"
          aria-label="Close details"
        >
          <X size={20} className="text-espresso-700" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-espresso-900/80 text-cream-100 text-[10px] font-medium uppercase tracking-[0.12em] px-3 py-1.5">
              {item.category}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 pr-10">
              <div>
                <h2 className="text-2xl font-serif font-medium text-espresso-800 leading-tight">
                  {item.name}
                </h2>
                {item.rating && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Star size={16} className="fill-amber-500 text-amber-500" />
                    <span className="text-sm font-medium text-espresso-600">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-2xl font-serif text-amber-600 whitespace-nowrap">
                ${item.price}
              </span>
            </div>

            {item.dietaryLabels && item.dietaryLabels.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.dietaryLabels.map((label) => (
                  <span
                    key={label}
                    className={`text-[10px] font-medium uppercase tracking-[0.1em] px-2.5 py-1 ${
                      dietaryColors[label] || 'bg-espresso-100 text-espresso-600'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm leading-relaxed text-espresso-500">
              {item.description}
            </p>

            {item.preparation && (
              <div className="mt-4 pt-4 border-t border-espresso-200">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-amber-600 mb-2">
                  Preparation
                </h3>
                <p className="text-sm leading-relaxed text-espresso-500">{item.preparation}</p>
              </div>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mt-4 pt-4 border-t border-espresso-200">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-amber-600 mb-2">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs text-espresso-500 bg-espresso-50 px-2.5 py-1"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {item.customization && item.customization.length > 0 && (
              <div className="mt-5 pt-4 border-t border-espresso-200 space-y-4">
                {item.customization.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-amber-600 mb-2">
                      {group.title}
                      <span className="ml-2 text-espresso-300 normal-case tracking-normal">
                        {group.type === 'single' ? '(choose one)' : '(select any)'}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isSelected =
                          group.type === 'single'
                            ? selectedOptions[group.title]?.optionLabel === option.label
                            : !!selectedOptions[`${group.title}__${option.label}`];
                        return (
                          <button
                            key={option.label}
                            onClick={() =>
                              group.type === 'single'
                                ? handleSingleSelect(group.title, option.label, option.priceModifier)
                                : handleMultiSelect(group.title, option.label, option.priceModifier)
                            }
                            className={`px-3 py-2 text-xs font-medium border transition-all duration-300 ${
                              isSelected
                                ? 'bg-espresso-800 text-cream-50 border-espresso-800'
                                : 'bg-transparent text-espresso-500 border-espresso-200 hover:border-amber-400'
                            }`}
                          >
                            {option.label}
                            {option.priceModifier > 0 && (
                              <span className="ml-1 text-amber-500">+${option.priceModifier}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-espresso-500">
                    Quantity
                  </span>
                  <div className="flex items-center border border-espresso-200">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center text-espresso-600 hover:bg-espresso-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-espresso-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center text-espresso-600 hover:bg-espresso-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <span className="text-lg font-serif text-espresso-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-espresso-900 font-medium text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                >
                  Add to Order
                </button>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="w-12 h-12 flex items-center justify-center border border-espresso-200 hover:border-wine-400 transition-all duration-300"
                  aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-300 ${
                      fav ? 'fill-wine-600 text-wine-600' : 'text-espresso-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related dishes */}
        {relatedDishes.length > 0 && (
          <div className="border-t border-espresso-200 p-6 md:p-8 bg-cream-100">
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-amber-600 mb-4">
              You may also like
            </h3>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {relatedDishes.map((related) => (
                <button
                  key={related.id}
                  onClick={() => onSelectRelated(related)}
                  className="group text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-2">
                    <img
                      src={related.image}
                      alt={related.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm font-serif font-medium text-espresso-700 leading-snug">
                    {related.name}
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">${related.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
