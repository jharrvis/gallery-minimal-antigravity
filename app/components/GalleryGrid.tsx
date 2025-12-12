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

const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    900: 2,
    600: 1
};

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [index, setIndex] = useState(-1);
    const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const loaderRef = useRef<HTMLDivElement>(null);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        setVisibleItems(items.slice(0, ITEMS_PER_PAGE));
    }, [items]);

    const loadMore = useCallback(() => {
        if (isLoading || visibleItems.length >= items.length) return;

        setIsLoading(true);

        setTimeout(() => {
            const nextPage = page + 1;
            const newItems = items.slice(0, nextPage * ITEMS_PER_PAGE);
            setVisibleItems(newItems);
            setPage(nextPage);
            setIsLoading(false);
        }, 300);
    }, [isLoading, visibleItems.length, items, page]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleItems.length < items.length) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [visibleItems.length, items.length, loadMore]);

    const handleImageLoad = (slug: string) => {
        setLoadedImages(prev => new Set(prev).add(slug));
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {visibleItems.map((item, idx) => (
                    <div
                        key={item.slug}
                        className="gallery-card animate-fade-in"
                        style={{ animationDelay: `${(idx % ITEMS_PER_PAGE) * 0.08}s` }}
                        onClick={() => setIndex(idx)}
                    >
                        {/* Skeleton loader */}
                        {!loadedImages.has(item.slug) && (
                            <div className="skeleton" style={{ paddingBottom: '75%' }} />
                        )}

                        <Image
                            src={item.image}
                            alt={item.title || 'Gallery image'}
                            width={800}
                            height={600}
                            className={`transition-opacity duration-500 ${loadedImages.has(item.slug) ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                            onLoad={() => handleImageLoad(item.slug)}
                            priority={idx < 6}
                        />

                        {/* Caption overlay */}
                        {item.title && (
                            <div className="caption-overlay">
                                <p className="text-white text-sm font-light tracking-wide m-0">
                                    {item.title}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </Masonry>

            {/* Lightbox with zoom */}
            <Lightbox
                index={index}
                slides={items.map(item => ({
                    src: item.image,
                    alt: item.title || 'Gallery image'
                }))}
                open={index >= 0}
                close={() => setIndex(-1)}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 3,
                    scrollToZoom: true
                }}
                styles={{
                    container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
                }}
            />

            {/* Infinite scroll trigger */}
            <div ref={loaderRef} className="py-10 flex justify-center items-center">
                {isLoading && (
                    <div className="flex items-center gap-3 text-gray-400">
                        <div className="loader" />
                        <span className="text-sm font-light">Loading...</span>
                    </div>
                )}
                {!isLoading && visibleItems.length >= items.length && items.length > 0 && (
                    <p className="text-gray-300 text-sm font-light tracking-wider">
                        — End of Gallery —
                    </p>
                )}
            </div>
        </>
    );
}
