/**
 * MarketSegmentationChart - Lazy-loaded export
 *
 * @module charts/MarketSegmentationChart.lazy
 */

import { lazy } from 'react';

export const MarketSegmentationChart = lazy(() =>
  import('./MarketSegmentationChart').then(module => ({
    default: module.default
  }))
);

export default MarketSegmentationChart;
