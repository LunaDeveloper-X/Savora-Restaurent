interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-espresso-900/70" />
      </div>
      <div className="relative z-10 container-wide text-center pt-20">
        <p
          className="text-eyebrow text-amber-300 mb-4 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease-out 0.2s forwards' }}
        >
          {eyebrow}
        </p>
        <h1
          className="text-display font-serif font-light text-cream-50 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease-out 0.4s forwards' }}
        >
          {title}
        </h1>
        <div
          className="mt-6 mx-auto h-px w-12 bg-amber-400 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease-out 0.6s forwards' }}
        />
        {description && (
          <p
            className="mt-6 max-w-xl mx-auto text-base text-cream-100/70 leading-relaxed opacity-0"
            style={{ animation: 'fadeUp 0.7s ease-out 0.8s forwards' }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
