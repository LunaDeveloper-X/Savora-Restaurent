import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/ui/Reveal';

const stats = [
  { value: 80, suffix: '+', label: 'Menu Creations' },
  { value: 20, suffix: '+', label: 'International Flavors' },
  { value: 5, suffix: '★', label: 'Dining Experience' },
  { value: 100, suffix: '%', label: 'Passion for Food' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-espresso-900">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 100}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-light text-cream-50">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <div className="mt-3 h-px w-10 bg-amber-400 mx-auto" />
                <p className="mt-3 text-xs uppercase tracking-[0.15em] text-cream-100/50">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
