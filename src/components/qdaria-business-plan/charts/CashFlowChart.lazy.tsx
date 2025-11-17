/**
 * CashFlowChart - Lazy-loaded export
 *
 * This file provides a lazy-loaded version of CashFlowChart
 * to reduce initial bundle size and improve page load performance.
 *
 * File size: ~18.5 KB
 *
 * @module charts/CashFlowChart.lazy
 */

import { lazy } from 'react';

export const CashFlowChart = lazy(() =>
  import('./CashFlowChart').then(module => ({
    default: module.default
  }))
);

export default CashFlowChart;
