import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { galleryImages } from '@/data/gallery';

export default function GalleryPreview() {
  const preview = galleryImages.slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-cream-50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="A Glimpse Inside"
          title="Gallery Preview"
          description="From the kitchen to the dining room — a visual journey through the SAVORA experience."
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {preview.map((img, idx) => (
            <Reveal
              key={img.id}
              delay={idx * 80}
              className={idx === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}
            >
              <div
                className={`group relative overflow-hidden cursor-pointer ${
                  idx === 0 ? 'h-full min-h-[300px] md:min-h-[420px]' : 'aspect-square'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-espresso-900/0 group-hover:bg-espresso-900/30 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-espresso-700 hover:text-amber-600 transition-colors group"
          >
            View Full Gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
