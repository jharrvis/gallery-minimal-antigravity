import { getAllGalleryItems } from '@/lib/api';
import GalleryGrid from '@/app/components/GalleryGrid';
import Link from 'next/link';

export default function Home() {
  const items = getAllGalleryItems();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">G</span>
              </div>
              <span className="text-sm font-medium tracking-tight text-gray-900">
                GALLERY
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-400 hidden md:block">
                {items.length} {items.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Selected Works
          </h1>
          <p className="text-gray-500 text-base font-light leading-relaxed">
            A curated collection of high-resolution photographs.
            Click any image to view in full quality.
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1 max-w-[100px]" />
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</span>
        </div>
      </header>

      {/* Gallery */}
      <main className="px-6 md:px-12 max-w-7xl mx-auto pb-12">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
            <p className="text-gray-500 text-sm">
              Visit <Link href="/admin" className="text-gray-900 underline underline-offset-4">/admin</Link> to upload your first photo.
            </p>
          </div>
        ) : (
          <GalleryGrid items={items} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
