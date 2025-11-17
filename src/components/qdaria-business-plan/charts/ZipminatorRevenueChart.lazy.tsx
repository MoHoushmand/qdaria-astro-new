/**
 * ZipminatorRevenueChart - Lazy-loaded export
 *
 * This file provides a lazy-loaded version of ZipminatorRevenueChart
 * to reduce initial bundle size and improve page load performance.
 *
 * File size: ~16.0 KB
 *
 * @module charts/ZipminatorRevenueChart.lazy
 */

import { lazy } from 'react';

export const ZipminatorRevenueChart = lazy(() =>
  import('./ZipminatorRevenueChart').then(module => ({
    default: module.default
  }))
);

export default ZipminatorRevenueChart;
