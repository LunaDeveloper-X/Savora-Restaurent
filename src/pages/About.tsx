import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { Leaf, Utensils, Heart, Award } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Quality',
    description:
      'We hold ourselves to the highest standard on every plate, every pour, every interaction. Good enough is never good enough.',
  },
  {
    icon: Utensils,
    title: 'Creativity',
    description:
      'From hand-rolled pasta to wood-fired pizzas, we blend classical technique with bold international flavors to create something uniquely SAVORA.',
  },
  {
    icon: Heart,
    title: 'Hospitality',
    description:
      'Fine dining should never feel intimidating. We create a space where elegance and warmth coexist — where every guest feels at home.',
  },
];

const stats = [
  { icon: Utensils, value: '80+', label: 'Menu Creations' },
  { icon: Leaf, value: '20+', label: 'International Flavors' },
  { icon: Award, value: '5★', label: 'Dining Experience' },
  { icon: Heart, value: '100%', label: 'Passion for Food' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="The Art of Dining"
        description="A journey of passion, craft, and the belief that a great meal is about more than just food."
        image="https://images.pexels.com/photos/20184685/pexels-photo-20184685.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
      />

      {/* Story */}
      <section className="py-24 md:py-32 bg-cream-50">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/37307308/pexels-photo-37307308.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                  alt="SAVORA restaurant interior"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-eyebrow mb-4">The Beginning</p>
              <h2 className="text-display font-serif font-light text-espresso-800">
                The Art of Dining
              </h2>
              <div className="mt-6 h-px w-12 bg-amber-400" />
              <p className="mt-6 text-base leading-relaxed text-espresso-400">
                SAVORA brings together flavors from around the world in a warm, elegant setting.
                Our kitchen focuses on carefully selected ingredients, thoughtful preparation, and
                dishes designed to turn every meal into a memorable experience.
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso-400">
                What began as a vision of chef Marco Bianchi has grown into a destination for those
                who appreciate quality and creativity. Over the years, SAVORA has earned recognition
                from critics and guests alike, but our proudest achievement remains the relationships
                we've built with the people who walk through our doors.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-espresso-900">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="text-center">
                  <stat.icon className="mx-auto text-amber-400 mb-4" size={28} />
                  <p className="text-3xl md:text-4xl font-serif font-light text-cream-50">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-cream-100/50">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chef */}
      <section className="py-24 md:py-32 bg-cream-100">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal className="order-2 lg:order-1">
              <p className="text-eyebrow mb-4">Meet the Chef</p>
              <h2 className="text-display font-serif font-light text-espresso-800">
                Marco Bianchi
              </h2>
              <p className="mt-2 text-lg font-serif italic text-amber-600">
                Founder & Executive Chef
              </p>
              <div className="mt-6 h-px w-12 bg-amber-400" />
              <p className="mt-6 text-base leading-relaxed text-espresso-400">
                Marco's culinary journey began in his grandmother's kitchen in Florence, where he
                learned that food is a language of love. He went on to train at the prestigious Le
                Cordon Bleu in Paris before spending a decade in some of Europe's most celebrated
                kitchens — including three years as sous-chef at a two-Michelin-star restaurant in
                London.
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso-400">
                At SAVORA, Marco brings together the precision of classical European technique with
                a deep respect for local, seasonal ingredients. His menus are not just collections
                of dishes — they are narratives, each course designed to surprise, delight, and tell
                a story.
              </p>
              <blockquote className="mt-6 border-l-2 border-amber-400 pl-6">
                <p className="text-lg font-serif italic text-espresso-600">
                  "I cook the way I want to be fed — with care, with honesty, and with the belief
                  that a meal shared at a table is one of life's great joys."
                </p>
              </blockquote>
            </Reveal>
            <Reveal className="order-1 lg:order-2" delay={150}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6050331/pexels-photo-6050331.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                    alt="Chef Marco Bianchi"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-4 md:-left-6 bg-amber-500 px-6 py-4 shadow-xl">
                  <p className="text-xs uppercase tracking-[0.15em] text-espresso-900">Est. 2015</p>
                  <p className="text-2xl font-serif font-medium text-espresso-900">SAVORA</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What We Believe"
            title="Our Values"
            description="Three principles that guide everything we do, from the kitchen to the dining room."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, idx) => (
              <Reveal key={val.title} delay={idx * 100}>
                <div className="group h-full bg-white p-8 border-t-2 border-transparent hover:border-amber-400 hover:shadow-lg transition-all duration-500">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                    <val.icon size={24} />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-espresso-800 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-espresso-400">{val.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Imagery strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[
          'https://images.pexels.com/photos/8856554/pexels-photo-8856554.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
          'https://images.pexels.com/photos/4253300/pexels-photo-4253300.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
          'https://images.pexels.com/photos/14885437/pexels-photo-14885437.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
          'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
        ].map((src, idx) => (
          <Reveal key={idx} delay={idx * 100}>
            <div className="aspect-square overflow-hidden">
              <img
                src={src}
                alt="SAVORA restaurant imagery"
                loading="lazy"
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 bg-espresso-900 text-center">
        <div className="container-narrow">
          <Reveal>
            <h2 className="text-display font-serif font-light text-cream-50">
              Come Experience SAVORA
            </h2>
            <p className="mt-6 text-cream-100/70">
              We would love to welcome you. Reserve your table or get in touch with our team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/reservations" variant="primary" size="lg">
                Book a Table
              </Button>
              <Button to="/menu" variant="outline" size="lg">
                Explore the Menu
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
