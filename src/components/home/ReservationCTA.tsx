import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function ReservationCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/6314549/pexels-photo-6314549.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
          alt="Couple enjoying a candlelit dinner"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso-900/80" />
      </div>

      <div className="relative z-10 container-narrow text-center">
        <Reveal>
          <p className="text-eyebrow text-amber-300 mb-4">Reserve Your Table</p>
          <h2 className="text-display font-serif font-light text-cream-50">
            Join Us for an Evening to Remember
          </h2>
          <div className="mt-6 mx-auto h-px w-12 bg-amber-400" />
          <p className="mt-6 text-base md:text-lg text-cream-100/70 leading-relaxed max-w-xl mx-auto">
            Whether it is an intimate dinner for two or a celebration with friends, we would be
            honored to host you. Book your table and let us take care of the rest.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/reservations" size="lg" variant="primary">
              Book a Table
            </Button>
            <Button to="/contact" size="lg" variant="outline">
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
