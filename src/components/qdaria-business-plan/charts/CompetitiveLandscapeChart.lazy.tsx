/**
 * CompetitiveLandscapeChart - Lazy-loaded export
 *
 * This file provides a lazy-loaded version of CompetitiveLandscapeChart
 * to reduce initial bundle size and improve page load performance.
 *
 * File size: ~18.7 KB
 *
 * @module charts/CompetitiveLandscapeChart.lazy
 */

import { lazy } from 'react';

export const CompetitiveLandscapeChart = lazy(() =>
  import('./CompetitiveLandscapeChart').then(module => ({
    default: module.default
  }))
);

export default CompetitiveLandscapeChart;
