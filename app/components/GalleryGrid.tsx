'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import "yet-another-react-lightbox/styles.css";
import { GalleryItem } from '@/lib/api';

interface GalleryGridProps {
    items: GalleryItem[];
}

// Optimized breakpoints for a balanced look
const breakpointColumnsObj = {
    default: 3,
    1280: 3,
    1024: 2,
    640: 1
};

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [index, setIndex] = useState(-1);
    const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const ITEMS_PER_PAGE = 8; // Smaller chunks for smoother loading

    useEffect(() => {
        setVisibleItems(items.slice(0, ITEMS_PER_PAGE));
    }, [items]);

    const loadMore = useCallback(() => {
        if (isLoading || visibleItems.length >= items.length) return;

        setIsLoading(true);
        // Simulate network delay for UX feel (optional, can be removed for instant)
        setTimeout(() => {
            const nextPage = page + 1;
            const newItems = items.slice(0, nextPage * ITEMS_PER_PAGE);
            setVisibleItems(newItems);
            setPage(nextPage);
            setIsLoading(false);
        }, 400);
    }, [isLoading, visibleItems.length, items, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '400px' } // Load earlier
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {visibleItems.map((item, idx) => (
                    <div
                        key={item.slug + idx} // fallback key
                        className="gallery-item group"
                        onClick={() => setIndex(idx)}
                    >
                        {/* Aspect Ratio preservation wrapper not strictly needed if we want native masonry behavior 
                where height is defined by content. Next.js Image with width/height prop works well. 
            */}
                        <Image
                            src={item.image}
                            alt={item.title || 'Photograph'}
                            width={1000}
                            height={1200} // Aspect ratio placeholder (will be ignored by style)
                            className="w-full h-auto object-cover"
                            style={{ width: '100%', height: 'auto' }} // Crucial for masonry
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={90}
                            priority={idx < 4} // Loads LCP faster
                        />

                        <div className="gallery-caption">
                            <h3 className="text-white text-lg font-medium tracking-tight font-serif italic">
                                {item.title}
                            </h3>
                            {item.date && (
                                <p className="text-white/70 text-xs mt-1 uppercase tracking-widest font-sans">
                                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </Masonry>

            <Lightbox
                index={index}
                slides={items.map(item => ({ src: item.image }))}
                open={index >= 0}
                close={() => setIndex(-1)}
                plugins={[Zoom]}
                animation={{ fade: 300 }}
                carousel={{ padding: '0px', spacing: '0%' }}
                styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
            />

            {/* Loader Sentinel */}
            <div ref={loaderRef} className="h-24 w-full flex justify-center items-center py-8">
                {isLoading && <div className="spinner"></div>}
                {!isLoading && visibleItems.length >= items.length && items.length > 0 && (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div> // Minimalist "end" dot
                )}
            </div>
        </>
    );
}
