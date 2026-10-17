import { ChevronDown, UtensilsCrossed, Leaf, Award } from 'lucide-react';

export default function Hero() {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('featured-dishes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('reservation-cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
<div className="absolute inset-0 w-full h-full">
  <img
    src="https://images.pexels.com/photos/37686897/pexels-photo-37686897.jpeg"
    alt="Elegant restaurant interior with warm lighting"
    className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/40 to-espresso/90" />
</div>
      {/* Content */}
      <div className="relative z-10 container-wide text-center pt-20">
        <p
          className="text-eyebrow text-amber-300 mb-6 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease-out 0.2s forwards' }}
        >
          Premium Contemporary Restaurant
        </p>
        <h1
          className="text-hero font-serif font-light text-cream-50 opacity-0 max-w-4xl mx-auto leading-[1.1]"
          style={{ animation: 'fadeUp 0.8s ease-out 0.4s forwards' }}
        >
          Where Every Bite Becomes a Beautiful Moment
        </h1>
        <p
          className="mt-6 text-xl md:text-2xl font-serif italic text-amber-300/90 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease-out 0.6s forwards' }}
        >
          Fine food. Beautiful moments.
        </p>
        <p
          className="mt-6 max-w-xl mx-auto text-base md:text-lg text-cream-100/70 leading-relaxed opacity-0"
          style={{ animation: 'fadeUp 0.8s ease-out 0.8s forwards' }}
        >
          An intimate dining destination where seasonal ingredients, masterful technique, and warm
          hospitality come together to create unforgettable experiences.
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease-out 1s forwards' }}
        >
          <a
            href="#featured-dishes"
            onClick={scrollToMenu}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-espresso-900 font-medium text-xs uppercase tracking-[0.15em] transition-colors duration-300"
          >
            Explore Menu
          </a>
          <a
            href="#reservation-cta"
            onClick={scrollToReserve}
            className="px-8 py-4 border border-cream-100/40 text-cream-50 hover:bg-cream-50 hover:text-espresso-900 font-medium text-xs uppercase tracking-[0.15em] transition-all duration-300"
          >
            Book a Table
          </a>
        </div>

        {/* Feature row */}
        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease-out 1.2s forwards' }}
        >
          <div className="flex items-center gap-3">
            <UtensilsCrossed size={24} className="text-amber-400" />
            <div className="text-left">
              <p className="text-sm font-serif text-cream-50">80+ Dishes</p>
              <p className="text-xs text-cream-100/50">International Cuisine</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-cream-100/20" />
          <div className="flex items-center gap-3">
            <Leaf size={24} className="text-amber-400" />
            <div className="text-left">
              <p className="text-sm font-serif text-cream-50">Fresh Ingredients</p>
              <p className="text-xs text-cream-100/50">Locally Sourced</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-cream-100/20" />
          <div className="flex items-center gap-3">
            <Award size={24} className="text-amber-400" />
            <div className="text-left">
              <p className="text-sm font-serif text-cream-50">5-Star Dining</p>
              <p className="text-xs text-cream-100/50">Award Winning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        style={{ animation: 'fadeIn 1s ease-out 1.6s forwards' }}
      >
        <ChevronDown className="text-cream-100/50 animate-bounce" size={28} />
      </div>
    </section>
  );
}
