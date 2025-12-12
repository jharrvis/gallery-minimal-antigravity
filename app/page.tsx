import { getAllGalleryItems } from '@/lib/api';
import GalleryGrid from '@/app/components/GalleryGrid';
import Link from 'next/link';

export default function Home() {
  const items = getAllGalleryItems();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">G</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-gray-900">
                GALLERY
              </span>
            </Link>

            <span className="text-xs text-gray-400">
              {items.length} {items.length === 1 ? 'Photo' : 'Photos'}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl font-normal text-gray-900 leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Selected Works
        </h1>
        <p className="text-gray-500 text-sm font-light max-w-md">
          A curated collection of high-resolution photographs.
          Click any image to view in full quality.
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px bg-gray-300 w-12" />
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
        </div>
      </header>

      {/* Gallery */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No photos yet</h3>
            <p className="text-gray-500 text-sm">
              Visit <Link href="/admin" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">/admin</Link> to upload your first photo.
            </p>
          </div>
        ) : (
          <GalleryGrid items={items} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Gallery
          </p>
          <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
