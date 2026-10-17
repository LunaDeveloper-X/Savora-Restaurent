import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { Leaf, Utensils, Wine, Heart } from 'lucide-react';
import { specialties } from '@/data/restaurant';

const iconMap: Record<string, typeof Leaf> = {
  Leaf,
  Utensils,
  Wine,
  Heart,
};

export default function Specialties() {
  return (
    <section className="py-24 md:py-32 bg-cream-100">
      <div className="container-wide">
        <SectionHeading
          eyebrow="What Sets Us Apart"
          title="Restaurant Specialties"
          description="Four principles that define the SAVORA experience — from the kitchen to your table."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((sp, idx) => {
            const Icon = iconMap[sp.icon] ?? Leaf;
            return (
              <Reveal key={sp.id} delay={idx * 100}>
                <div className="group h-full bg-white p-8 text-center hover:shadow-lg transition-shadow duration-500 border-t-2 border-transparent hover:border-amber-400">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-espresso-800 mb-3">
                    {sp.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-espresso-400">{sp.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
