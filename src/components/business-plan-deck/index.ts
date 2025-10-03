/**
 * Business Plan Deck Components
 * Export all components for easy importing
 */

// Main deck component
export { default as BusinessPlanDeck } from './BusinessPlanDeck';

// Professional Layout Components
export {
  BusinessPlanLayout,
  BusinessPlanSection,
  ContentBlock,
  CardContainer,
  GridLayout,
  FlexLayout,
  Divider,
  Stack,
  ResponsiveContainer
} from './BusinessPlanLayout';

// Sidebar
export { default as Sidebar } from './Sidebar';

// Slides
export { default as ExecutiveSummarySlide } from './slides/ExecutiveSummarySlide';
export { default as MarketAnalysisSlide } from './slides/MarketAnalysisSlide';
export { default as ProductServicesSlide } from './slides/ProductsServicesSlide';
export { default as StrategicRoadmapSlide } from './slides/StrategicRoadmapSlide';
export { default as FinancialProjectionsSlide } from './slides/FinancialProjectionsSlide';
export { default as RiskAnalysisSlide } from './slides/RiskAnalysisSlide';
export { default as ExampleOptimizedSlide } from './slides/ExampleOptimizedSlide';

// Re-export all chart components
export * from './charts';
