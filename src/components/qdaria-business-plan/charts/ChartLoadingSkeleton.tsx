/**
 * ChartLoadingSkeleton - Consistent loading state for lazy-loaded charts
 *
 * Provides an accessible, animated skeleton while chart components load
 *
 * @module charts/ChartLoadingSkeleton
 */

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/qdaria-business-plan/ui/card';

interface ChartLoadingSkeletonProps {
  /** Height of the chart skeleton */
  height?: string;
  /** Whether to show a title skeleton */
  showTitle?: boolean;
  /** Whether to show controls skeleton */
  showControls?: boolean;
}

export const ChartLoadingSkeleton: React.FC<ChartLoadingSkeletonProps> = ({
  height = '400px',
  showTitle = true,
  showControls = true,
}) => {
  return (
    <Card
      className="w-full animate-pulse"
      role="status"
      aria-label="Loading chart..."
    >
      {showTitle && (
        <CardHeader>
          <div className="h-6 bg-gray-700/50 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-700/30 rounded w-1/2" />
        </CardHeader>
      )}
      <CardContent>
        {showControls && (
          <div className="flex gap-2 mb-4">
            <div className="h-9 bg-gray-700/50 rounded w-24" />
            <div className="h-9 bg-gray-700/50 rounded w-24" />
            <div className="ml-auto h-9 bg-gray-700/50 rounded w-32" />
          </div>
        )}
        <div
          className="bg-gray-800/30 rounded-lg relative overflow-hidden"
          style={{ height }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-700/20 to-transparent" />

          {/* Chart skeleton elements */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-full w-12">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-700/40 rounded w-full" />
              ))}
            </div>

            {/* Chart bars/lines placeholder */}
            <div className="flex-1 ml-16 mr-4 mb-8 flex items-end justify-around gap-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-700/40 rounded-t w-full transition-all"
                  style={{
                    height: `${Math.random() * 60 + 40}%`,
                  }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-around ml-16 mr-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-700/40 rounded w-12" />
              ))}
            </div>
          </div>
        </div>

        {/* Legend skeleton */}
        <div className="flex gap-4 mt-4 justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-3 bg-gray-700/50 rounded" />
              <div className="h-4 bg-gray-700/50 rounded w-20" />
            </div>
          ))}
        </div>
      </CardContent>
      <span className="sr-only">Loading chart data...</span>
    </Card>
  );
};

export default ChartLoadingSkeleton;
