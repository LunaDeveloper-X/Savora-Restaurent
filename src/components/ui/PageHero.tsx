interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[260px] py-24 md:py-0 md:h-[55vh] md:min-h-[400px]">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-espresso-900/70" />
      </div>
      <div className="relative z-10 container-wide text-center md:pt-20">
        <p
          className="text-eyebrow text-amber-300 mb-2 md:mb-4 opacity-0"
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
          className="mt-3 md:mt-6 mx-auto h-px w-12 bg-amber-400 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease-out 0.6s forwards' }}
        />
        {description && (
          <p
            className="mt-3 md:mt-6 max-w-[18rem] md:max-w-xl mx-auto text-xs md:text-base text-cream-100/70 leading-relaxed opacity-0"
            style={{ animation: 'fadeUp 0.7s ease-out 0.8s forwards' }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}