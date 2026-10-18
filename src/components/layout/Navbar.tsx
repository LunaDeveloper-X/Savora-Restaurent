import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, UtensilsCrossed, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { totalItems, openCart } = useCart();
  const { count: favCount, openFavorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-espresso-900/95 backdrop-blur-md shadow-lg shadow-espresso-900/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="SAVORA home">
            <UtensilsCrossed
              size={20}
              className={`transition-colors duration-300 ${
                solid ? 'text-amber-400' : 'text-cream-50'
              } group-hover:text-amber-400`}
            />
            <span
              className={`text-xl md:text-2xl font-serif font-semibold tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-300 ${
                solid ? 'text-cream-50' : 'text-cream-50'
              }`}
            >
              SAVORA
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:bottom-[-6px] after:left-0 after:h-px after:bg-amber-400 after:transition-all after:duration-300 ${
                      active
                        ? 'text-amber-400 after:w-full'
                        : 'text-cream-100/80 hover:text-amber-400 after:w-0 hover:after:w-full'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action icons */}
          <div className="flex items-center gap-0.5 md:gap-4">
            <button
              onClick={openFavorites}
              className="relative text-cream-50 hover:text-amber-400 transition-colors p-2"
              aria-label={`Favorites (${favCount})`}
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute top-0 right-0 bg-wine-600 text-cream-50 text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className="relative text-cream-50 hover:text-amber-400 transition-colors p-2"
              aria-label={`Cart (${totalItems})`}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-amber-500 text-espresso-900 text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-cream-50 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-espresso-900"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-6 md:gap-8 pt-16 md:pt-20">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-serif tracking-[0.15em] transition-colors duration-300 ${
                  active ? 'text-amber-400' : 'text-cream-100 hover:text-amber-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}