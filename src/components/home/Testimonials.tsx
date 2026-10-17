import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import StarRating from '@/components/ui/StarRating';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const next = () => setActive((p) => (p + 1) % count);
  const prev = () => setActive((p) => (p - 1 + count) % count);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="py-24 md:py-32 bg-espresso-900 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Guest Experiences"
          title="What Our Guests Say"
          light
        />

        <Reveal className="mt-16 max-w-3xl mx-auto">
          <div className="relative">
            <Quote className="mx-auto text-amber-400/40 mb-8" size={48} />

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="w-full flex-shrink-0 px-4">
                    <div className="text-center">
                      <StarRating rating={t.rating} size={18} className="justify-center mb-6" />
                      <p className="text-lg md:text-xl font-serif italic leading-relaxed text-cream-100/90">
                        "{t.text}"
                      </p>
                      <div className="mt-8">
                        <p className="text-base font-medium text-amber-400">{t.name}</p>
                        <p className="text-sm text-cream-100/50 mt-1">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                className="text-cream-100/50 hover:text-amber-400 transition-colors p-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 transition-all duration-300 ${
                      i === active ? 'w-8 bg-amber-400' : 'w-2 bg-cream-100/30 hover:bg-cream-100/50'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="text-cream-100/50 hover:text-amber-400 transition-colors p-2"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
