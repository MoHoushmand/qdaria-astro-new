/**
 * LazyChartWrapper - Wrapper for lazy-loading charts with Intersection Observer
 *
 * Features:
 * - Lazy loads chart when it enters viewport
 * - Shows loading skeleton while chart loads
 * - Improves initial page load performance
 * - Reduces bundle size by code-splitting charts
 *
 * @module charts/LazyChartWrapper
 */

import React, { Suspense, useEffect, useRef, useState } from 'react';
import ChartLoadingSkeleton from './ChartLoadingSkeleton';

interface LazyChartWrapperProps {
  /** Lazy-loaded chart component */
  children: React.ReactNode;
  /** Height for loading skeleton */
  height?: string;
  /** Whether to show title skeleton */
  showTitle?: boolean;
  /** Whether to show controls skeleton */
  showControls?: boolean;
  /** Viewport margin for intersection observer (default: '200px') */
  rootMargin?: string;
  /** Minimum delay before loading (ms) */
  minLoadDelay?: number;
}

/**
 * LazyChartWrapper with Intersection Observer for viewport-based loading
 */
export const LazyChartWrapper: React.FC<LazyChartWrapperProps> = ({
  children,
  height = '400px',
  showTitle = true,
  showControls = true,
  rootMargin = '200px',
  minLoadDelay = 0,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);

            // Optional delay for smoother loading
            if (minLoadDelay > 0) {
              setTimeout(() => setShouldLoad(true), minLoadDelay);
            } else {
              setShouldLoad(true);
            }
          }
        });
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isInView, rootMargin, minLoadDelay]);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <Suspense
          fallback={
            <ChartLoadingSkeleton
              height={height}
              showTitle={showTitle}
              showControls={showControls}
            />
          }
        >
          {children}
        </Suspense>
      ) : (
        <ChartLoadingSkeleton
          height={height}
          showTitle={showTitle}
          showControls={showControls}
        />
      )}
    </div>
  );
};

export default LazyChartWrapper;
