/**
 * RevenueProjectionsChart - Lazy-loaded export
 *
 * @module charts/RevenueProjectionsChart.lazy
 */

import { lazy } from 'react';

export const RevenueProjectionsChart = lazy(() =>
  import('./RevenueProjectionsChart').then(module => ({
    default: module.default
  }))
);

export default RevenueProjectionsChart;
