/**
 * FinancialDashboard - Lazy-loaded export
 *
 * This file provides a lazy-loaded version of FinancialDashboard
 * to reduce initial bundle size and improve page load performance.
 *
 * File size: ~15.6 KB
 *
 * @module charts/FinancialDashboard.lazy
 */

import { lazy } from 'react';

export const FinancialDashboard = lazy(() =>
  import('./FinancialDashboard').then(module => ({
    default: module.default
  }))
);

export default FinancialDashboard;
