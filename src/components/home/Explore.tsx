import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    title: 'Our Menu',
    text: 'Steaks, seafood, pasta and desserts.',
    link: '/menu',
    image:
      'https://images.pexels.com/photos/31372404/pexels-photo-31372404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Book a Table',
    text: 'Reserve your evening with us.',
    link: '/reservations',
    image:
      'https://images.pexels.com/photos/2494648/pexels-photo-2494648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Desserts',
    text: 'Sweet endings, made fresh daily.',
    link: '/menu',
    image:
      'https://images.pexels.com/photos/10480244/pexels-photo-10480244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Gallery',
    text: 'A look inside Savora.',
    link: '/gallery',
    image:
      'https://images.pexels.com/photos/8696533/pexels-photo-8696533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Our Story',
    text: 'The people behind the plates.',
    link: '/about',
    image:
      'https://images.pexels.com/photos/20095444/pexels-photo-20095444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Private Events',
    text: 'Celebrations, designed for you.',
    link: '/contact',
    image:
      'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Explore() {
  return (
    <section className="bg-cream-50 py-10 md:py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow">Welcome</p>
          <h2 className="mt-2 font-serif text-2xl font-light text-espresso-800 md:mt-3 md:text-5xl">
            Explore the World of Savora
          </h2>
          <div className="divider-gold mt-4 md:mt-5" />
          <p className="mt-4 text-xs leading-relaxed text-espresso-500 md:mt-5 md:text-base">
            A contemporary restaurant where seasonal ingredients and warm hospitality come
            together. Whatever the occasion, there is a table waiting for you.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 md:mt-14 md:gap-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              to={c.link}
              className="group relative block aspect-square overflow-hidden md:aspect-[4/3]"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2 md:p-6">
                <h3 className="font-serif text-sm leading-tight text-cream-50 md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-cream-100/70 md:mt-1 md:text-sm">
                  {c.text}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.12em] text-amber-300 md:mt-3 md:gap-1.5 md:text-xs md:tracking-[0.15em]">
                  Explore <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}