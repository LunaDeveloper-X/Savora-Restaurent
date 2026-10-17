import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { restaurantInfo } from '@/data/restaurant';

export default function Footer() {
  return (
    <footer className="bg-espresso-900 text-cream-100">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed size={22} className="text-amber-400" />
              <span className="text-2xl font-serif font-semibold tracking-[0.15em] text-cream-50">
                SAVORA
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream-100/60 max-w-xs">
              {restaurantInfo.tagline} A premium contemporary restaurant where every dish tells a
              story and every visit becomes a memory.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={restaurantInfo.social.instagram}
                className="text-cream-100/60 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={restaurantInfo.social.facebook}
                className="text-cream-100/60 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={restaurantInfo.social.twitter}
                className="text-cream-100/60 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Menu', path: '/menu' },
                { label: 'About', path: '/about' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Reservations', path: '/reservations' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-100/60 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-cream-100/60">
                <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                {restaurantInfo.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-100/60">
                <Phone size={16} className="text-amber-400 flex-shrink-0" />
                {restaurantInfo.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-100/60">
                <Mail size={16} className="text-amber-400 flex-shrink-0" />
                {restaurantInfo.email}
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400 mb-5">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {restaurantInfo.hours.map((h) => (
                <li key={h.day} className="text-sm text-cream-100/60">
                  <span className="block text-cream-100/80">{h.day}</span>
                  <span className="text-cream-100/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-100/40">
            © 2026 SAVORA. All rights reserved.
          </p>
          <p className="text-xs text-cream-100/40">
            Crafted with passion · Fine food, beautiful moments
          </p>
        </div>
      </div>
    </footer>
  );
}
