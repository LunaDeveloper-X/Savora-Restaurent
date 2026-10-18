import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import MenuCard from '@/components/menu/MenuCard';
import DishModal from '@/components/menu/DishModal';
import { menuItems, menuCategories } from '@/data/menu';
import type { MenuCategory, MenuItem } from '@/types';

type Filter = 'All' | MenuCategory;

export default function Menu() {
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filters: Filter[] = ['All', ...menuCategories];

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = filter === 'All' || item.category === filter;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query)) ||
        item.dietaryLabels?.some((d) => d.toLowerCase().includes(query)) ||
        item.ingredients?.some((i) => i.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const handleSelectRelated = (item: MenuItem) => {
    setSelectedDish(item);
  };

  return (
    <>
      <PageHero
        eyebrow="Our Culinary Offerings"
        title="The Menu"
        description="Every dish is crafted with seasonal ingredients and an uncompromising commitment to quality. Explore our full selection of 80 international dishes, desserts, and beverages."
        image="https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
      />

      <section className="py-10 md:py-28 bg-cream-50">
        <div className="container-wide">
          {/* Search + Filters */}
          <Reveal>
            <div className="mb-8 md:mb-12">
              {/* Search bar */}
              <div className="relative max-w-md mx-auto mb-6 md:mb-10">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-300"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search dishes, ingredients, or categories..."
                  className="w-full bg-white border border-espresso-200 pl-12 pr-10 py-3.5 text-sm text-espresso-700 placeholder:text-espresso-300 focus:outline-none focus:border-amber-400 transition-colors"
                  aria-label="Search menu"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-300 hover:text-espresso-600"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category filters — horizontally scrollable on mobile */}
              <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 scrollbar-hide">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 border whitespace-nowrap flex-shrink-0 ${
                      filter === f
                        ? 'bg-espresso-800 text-cream-50 border-espresso-800'
                        : 'bg-transparent text-espresso-500 border-espresso-200 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-serif text-espresso-400">
                No dishes found. Try another search.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('All');
                }}
                className="mt-4 text-sm text-amber-600 hover:text-amber-500 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-espresso-400 mb-6 md:mb-8">
                Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
                {filter !== 'All' && ` in ${filter}`}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item, idx) => (
                  <Reveal key={item.id} delay={(idx % 4) * 80}>
                    <MenuCard item={item} onViewDetails={setSelectedDish} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <DishModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onSelectRelated={handleSelectRelated}
      />
    </>
  );
}