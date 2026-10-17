import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      <div className={center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p className={`text-eyebrow mb-4 ${light ? 'text-amber-300' : ''}`}>{eyebrow}</p>
        )}
        <h2
          className={`text-display font-serif font-light ${
            light ? 'text-cream-50' : 'text-espresso-800'
          }`}
        >
          {title}
        </h2>
        <div className={`mt-6 h-px w-12 bg-amber-400 ${center ? 'mx-auto' : ''}`} />
        {description && (
          <p
            className={`mt-6 text-base leading-relaxed ${
              light ? 'text-cream-100/70' : 'text-espresso-400'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
