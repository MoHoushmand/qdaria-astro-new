/**
 * ProductPortfolioChart - Lazy-loaded export
 *
 * @module charts/ProductPortfolioChart.lazy
 */

import { lazy } from 'react';

export const ProductPortfolioChart = lazy(() =>
  import('./ProductPortfolioChart').then(module => ({
    default: module.default
  }))
);

export default ProductPortfolioChart;
