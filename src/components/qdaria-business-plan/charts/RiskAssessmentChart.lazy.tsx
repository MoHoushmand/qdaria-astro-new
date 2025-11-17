/**
 * RiskAssessmentChart - Lazy-loaded export
 *
 * @module charts/RiskAssessmentChart.lazy
 */

import { lazy } from 'react';

export const RiskAssessmentChart = lazy(() =>
  import('./RiskAssessmentChart').then(module => ({
    default: module.default
  }))
);

export default RiskAssessmentChart;
