import Hero from '@/components/home/Hero';
import Explore from '@/components/home/Explore';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import AboutPreview from '@/components/home/AboutPreview';
import Specialties from '@/components/home/Specialties';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import ReservationCTA from '@/components/home/ReservationCTA';
import ChefSpecial from '@/components/home/ChefSpecial';
import GuestFavorites from '@/components/home/GuestFavorites';
import Stats from '@/components/home/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <Explore />
      <div id="featured-dishes">
        <FeaturedDishes />
      </div>
      <ChefSpecial />
      <GuestFavorites />
      <Stats />
      <AboutPreview />
      <Specialties />
      <Testimonials />
      <GalleryPreview />
      <div id="reservation-cta">
        <ReservationCTA />
      </div>
    </>
  );
}