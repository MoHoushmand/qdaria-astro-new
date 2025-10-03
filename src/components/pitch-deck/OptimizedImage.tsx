/** @jsxImportSource react */
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Optimized Image Component with WebP support and lazy loading
 * Automatically generates responsive srcset and uses WebP when available
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
}) => {
  // Convert .jpg/.png to .webp
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  // Generate responsive srcset for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop();
    const base = baseSrc.replace(/\.[^.]+$/, '');

    // Return srcset with multiple sizes
    return `
      ${base}-thumb.${ext} 150w,
      ${baseSrc} 800w
    `.trim();
  };

  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(webpSrc)}
        sizes={sizes}
      />

      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ contentVisibility: priority ? 'visible' : 'auto' }}
      />
    </picture>
  );
};

export default OptimizedImage;
