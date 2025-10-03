/** @jsxImportSource react */
import React, { Suspense, lazy } from 'react';

/**
 * LazyChart - Performance-optimized chart loader
 * Lazy loads chart libraries only when needed
 */

interface LazyChartProps {
  type: 'recharts' | 'echarts' | 'nivo' | 'chartjs' | 'plotly';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ChartLoader = () => (
  <div className="flex items-center justify-center h-64" role="status" aria-label="Loading chart">
    <div className="text-center">
      <div
        className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"
        aria-hidden="true"
      />
      <p className="text-sm text-white/60">Loading chart...</p>
    </div>
  </div>
);

/**
 * Lazy load chart wrapper component
 * Only loads the chart library when the component is rendered
 */
export const LazyChart: React.FC<LazyChartProps> = ({
  type,
  children,
  fallback = <ChartLoader />
}) => {
  // Use Suspense to lazy load chart libraries
  return (
    <Suspense fallback={fallback}>
      <div data-chart-type={type} className="w-full">
        {children}
      </div>
    </Suspense>
  );
};

/**
 * Intersection Observer-based lazy loading
 * Only loads charts when they come into viewport
 */
interface LazyChartOnViewProps extends LazyChartProps {
  rootMargin?: string;
}

export const LazyChartOnView: React.FC<LazyChartOnViewProps> = ({
  children,
  fallback = <ChartLoader />,
  rootMargin = '200px',
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className="min-h-[16rem]">
      {isVisible ? (
        <LazyChart {...props} fallback={fallback}>
          {children}
        </LazyChart>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyChart;
