'use client';

import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { GalleryItem } from '@/lib/api';

interface GalleryGridProps {
    items: GalleryItem[];
}

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
};

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [index, setIndex] = useState(-1);
    const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        setVisibleItems(items.slice(0, ITEMS_PER_PAGE));
    }, [items]);

    const loadMore = () => {
        const nextPage = page + 1;
        const newItems = items.slice(0, nextPage * ITEMS_PER_PAGE);
        setVisibleItems(newItems);
        setPage(nextPage);
    };

    // Simple infinite scroll observer
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
                if (visibleItems.length < items.length) {
                    loadMore();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleItems, items.length, page]);

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {visibleItems.map((item, idx) => (
                    <div key={item.slug} className="mb-4 group relative cursor-zoom-in" onClick={() => setIndex(idx)}>
                        <div className="relative w-full overflow-hidden bg-gray-100">
                            {/* Note: In a real drag-drop scenario, Next.js needs 'width/height' for 'Image' or use 'fill'. 
                   If using local files without dimensions in frontmatter, 'fill' with aspect-ratio wrapper is best or 'width=0' hack.
                   Here we use 'width=0 height=0 sizes=100vw' style={{ width: '100%', height: 'auto' }} common trick.
               */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={800}
                                height={600}
                                className="w-full h-auto transition-opacity duration-500 hover:opacity-90"
                                style={{ width: '100%', height: 'auto' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        {item.title && (
                            <div className="mt-2 text-xs text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.title}
                            </div>
                        )}
                    </div>
                ))}
            </Masonry>

            <Lightbox
                index={index}
                slides={items.map(item => ({ src: item.image }))}
                open={index >= 0}
                close={() => setIndex(-1)}
            />

            {visibleItems.length < items.length && (
                <div className="text-center py-10 opacity-50">Loading more...</div>
            )}
        </>
    );
}
