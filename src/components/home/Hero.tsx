import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image:
      'https://images.pexels.com/photos/20095444/pexels-photo-20095444.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
    eyebrow: 'Signature Dish',
    title: 'Beef Wellington',
    text: 'Tender fillet wrapped in golden pastry, baked to perfection.',
    cta: 'Explore Menu',
    target: 'featured-dishes',
  },
  {
    image:
      'https://images.pexels.com/photos/8696533/pexels-photo-8696533.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
    eyebrow: "Chef's Choice",
    title: 'Fresh From The Sea',
    text: 'Grilled salmon, garlic prawns and more, served fresh every day.',
    cta: 'See Specials',
    target: 'featured-dishes',
  },
  {
    image: 'https://images.pexels.com/photos/37686897/pexels-photo-37686897.jpeg',
    eyebrow: 'Reservations',
    title: 'Your Table Awaits',
    text: 'An elegant evening with warm hospitality and unforgettable flavours.',
    cta: 'Book a Table',
    target: 'reservation-cta',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = slides[active];

  return (
    <section className="relative h-[58svh] min-h-[380px] w-full overflow-hidden md:h-[92svh]">
      {/* Slides */}
      {slides.map((s, i) => (
        <img
          key={s.title}
          src={s.image}
          alt={s.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/40 to-espresso-900/50" />

      {/* Text */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-wide pt-10 md:pt-0">
          <div key={active} className="max-w-[16rem] text-left md:max-w-xl">
            <p
              className="text-eyebrow text-amber-300 opacity-0"
              style={{ animation: 'fadeUp 0.7s ease-out 0.1s forwards' }}
            >
              {slide.eyebrow}
            </p>
            <h1
              className="mt-2 font-serif text-3xl font-light uppercase leading-[1.05] tracking-wide text-cream-50 opacity-0 sm:text-5xl lg:text-7xl md:mt-3"
              style={{ animation: 'fadeUp 0.7s ease-out 0.3s forwards' }}
            >
              {slide.title}
            </h1>
            <p
              className="mt-3 text-xs text-cream-100/80 opacity-0 md:mt-4 md:text-lg"
              style={{ animation: 'fadeUp 0.7s ease-out 0.5s forwards' }}
            >
              {slide.text}
            </p>
            <a
              href={`#${slide.target}`}
              onClick={scrollTo(slide.target)}
              className="mt-5 inline-flex items-center gap-2 bg-amber-500 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-espresso-900 opacity-0 transition-colors hover:bg-amber-400 md:mt-6 md:px-8 md:py-4 md:text-xs"
              style={{ animation: 'fadeUp 0.7s ease-out 0.7s forwards' }}
            >
              {slide.cta}
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? 'w-8 bg-amber-400' : 'w-4 bg-cream-100/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}