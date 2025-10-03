/** @jsxImportSource react */
import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

/**
 * OptimizedImage - Performance-optimized image component
 * - Lazy loading with Intersection Observer
 * - WebP/AVIF format support with fallbacks
 * - Responsive images with srcset
 * - Blur placeholder while loading
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Skip intersection observer for priority images
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Generate WebP and AVIF sources
  const getImageSources = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop();
    const baseUrl = baseSrc.replace(`.${ext}`, '');

    return {
      avif: `${baseUrl}.avif`,
      webp: `${baseUrl}.webp`,
      original: baseSrc,
    };
  };

  const sources = getImageSources(src);

  return (
    <picture>
      {/* Modern formats with fallbacks */}
      {isInView && (
        <>
          <source
            type="image/avif"
            srcSet={sources.avif}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={sources.webp}
            sizes={sizes}
          />
        </>
      )}

      <img
        ref={imgRef}
        src={isInView ? sources.original : ''}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        style={{
          backgroundColor: isLoaded ? 'transparent' : '#1e293b',
        }}
      />
    </picture>
  );
};

export default OptimizedImage;
