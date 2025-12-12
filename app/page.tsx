import { getAllGalleryItems } from '@/lib/api';
import GalleryGrid from '@/app/components/GalleryGrid';

export default function Home() {
  const items = getAllGalleryItems();

  return (
    <main className="min-h-screen p-8 bg-white">
      <header className="mb-12">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">GALLERY</h1>
        <p className="text-sm text-gray-400 mt-2">Selected Works</p>
      </header>

      <GalleryGrid items={items} />

      <footer className="mt-24 py-8 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} Gallery
      </footer>
    </main>
  );
}
