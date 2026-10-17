import { useState, useRef } from 'react';
import { X, Play, Pause, Video as VideoIcon } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { galleryImages, galleryCategories } from '@/data/gallery';
import { galleryVideos } from '@/data/galleryVideos';
import type { GalleryImage, GalleryVideo } from '@/types';

type Filter = 'All' | (typeof galleryCategories)[number] | 'Video';

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<GalleryVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imageFilters: Filter[] = ['All', ...galleryCategories, 'Video'];

  const filteredImages =
    filter === 'All' || filter === 'Video'
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const showVideos = filter === 'All' || filter === 'Video';

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const closeVideoLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setLightboxVideo(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Visual Journey"
        title="Gallery"
        description="Step inside SAVORA — explore our dishes, our space, our people, and the atmosphere that makes every visit special."
        image="https://images.pexels.com/photos/27626762/pexels-photo-27626762.png?auto=compress&cs=tinysrgb&h=900&w=1920"
      />

      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container-wide">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
              {imageFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 border ${
                    filter === f
                      ? 'bg-espresso-800 text-cream-50 border-espresso-800'
                      : 'bg-transparent text-espresso-500 border-espresso-200 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  {f === 'Video' && <VideoIcon size={12} className="inline mr-1.5 -mt-0.5" />}
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Videos Section */}
          {showVideos && (
            <div className="mb-12">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <VideoIcon size={20} className="text-amber-600" />
                  <h3 className="text-lg font-serif font-medium text-espresso-800">Videos</h3>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryVideos.map((video, idx) => (
                  <Reveal key={video.id} delay={(idx % 3) * 80}>
                    <button
                      onClick={() => setLightboxVideo(video)}
                      className="group relative block w-full overflow-hidden aspect-video"
                      aria-label={`Play video: ${video.title}`}
                    >
                      <img
                        src={video.poster}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-espresso-900/30 group-hover:bg-espresso-900/50 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-14 h-14 flex items-center justify-center bg-amber-500/90 group-hover:bg-amber-500 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
                          <Play size={24} className="text-espresso-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-left bg-gradient-to-t from-espresso-900/80 to-transparent">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-amber-300 mb-1">
                          Video
                        </p>
                        <p className="text-sm font-serif text-cream-50">{video.title}</p>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {filter !== 'Video' && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
              {filteredImages.map((img, idx) => (
                <Reveal key={img.id} delay={(idx % 3) * 80}>
                  <button
                    onClick={() => setLightboxImage(img)}
                    className="group relative block w-full overflow-hidden break-inside-avoid"
                    aria-label={`View ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-espresso-900/0 group-hover:bg-espresso-900/40 transition-colors duration-500 flex items-end p-4">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-amber-300 mb-1">
                          {img.category}
                        </p>
                        <p className="text-sm text-cream-50">{img.alt}</p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-espresso-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream-50 hover:text-amber-400 transition-colors z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="mt-4 text-center text-sm text-cream-100/70">
              <span className="text-amber-300 uppercase tracking-[0.15em] text-xs mr-2">
                {lightboxImage.category}
              </span>
              {lightboxImage.alt}
            </p>
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-[100] bg-espresso-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={closeVideoLightbox}
        >
          <button
            className="absolute top-6 right-6 text-cream-50 hover:text-amber-400 transition-colors z-10"
            onClick={closeVideoLightbox}
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={lightboxVideo.videoUrl}
              poster={lightboxVideo.poster}
              className="w-full max-h-[80vh] object-contain bg-black"
              playsInline
              controls
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-amber-300 uppercase tracking-[0.15em] text-xs mb-1">
                  Video
                </p>
                <p className="text-sm font-serif text-cream-50">{lightboxVideo.title}</p>
                <p className="text-xs text-cream-100/60 mt-1">{lightboxVideo.description}</p>
              </div>
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-espresso-900 text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-400 transition-colors"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
