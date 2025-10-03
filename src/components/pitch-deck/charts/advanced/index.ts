/**
 * Advanced Chart Components Index
 *
 * Exports all advanced charting library wrappers for the QDaria pitch deck.
 *
 * @see CHART-SELECTION-GUIDE.md for usage recommendations
 *
 * NOTE: ECharts and Plotly are commented out to prevent SSR "self is not defined" errors
 * Use dynamic imports for these libraries in client-side only components
 */

// ECharts - Complex business visualizations (DISABLED - SSR incompatible)
// export { EChartsComponent } from './EChartsComponent';
// export type { EChartsOption } from 'echarts';

// D3.js - Custom interactive visualizations
export { D3Visualization } from './D3Visualization';

// Plotly.js - Scientific and technical charts (DISABLED - SSR incompatible)
// export { PlotlyChart } from './PlotlyChart';

// Nivo - Beautiful declarative charts
export { NivoChart } from './NivoChart';

// visx - Custom branded components
export { VisxChart } from './VisxChart';
