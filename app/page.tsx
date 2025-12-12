import { getAllGalleryItems } from '@/lib/api';
import GalleryGrid from '@/app/components/GalleryGrid';

export default function Home() {
  const items = getAllGalleryItems();

  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* HEADER: Minimal & Sticky */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* BRAND */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter text-black uppercase">
              Julian<span className="text-gray-400 font-light">Gallery</span>
            </h1>
          </div>

          {/* META */}
          <div className="text-xs font-mono text-gray-400">
            {items.length} FRAMES
          </div>
        </div>
      </header>

      {/* HERO: Editorial style */}
      <section className="w-full max-w-[1600px] px-4 md:px-8 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-6">
            Visually curated<br />moments in time.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg font-light">
            A collection of high-resolution photographs. Unbounded scrolling.
            Designed for visual immersion.
          </p>
        </div>
      </section>

      {/* GALLERY CONTAINER */}
      <main className="w-full max-w-[1600px] px-4 md:px-8">
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="py-20 text-center text-gray-400">
            <p>No images found. Please upload via /admin</p>
          </div>
        )}
      </main>

      {/* FOOTER: Ultra minimal */}
      <footer className="w-full py-12 mt-12 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-300 font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Photography
        </p>
      </footer>
    </div>
  );
}
