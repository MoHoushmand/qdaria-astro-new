# Chart Conversion Plan: ApexCharts to Plotly Dash

## Overview

This document outlines the strategy for converting our business plan charts from ApexCharts to Plotly Dash, using a React wrapper for Plotly charts (react-plotly.js) for compatibility with Astro's static build setup.

## Motivation

ApexCharts has been causing rendering issues on the business plan page, resulting in charts not displaying properly. Plotly offers a more robust and sophisticated charting library with better support for interactive data visualization and is compatible with React components in Astro.

## Implementation Strategy

### 1. Component Architecture

- **PlotlyChartWrapper.tsx**: Base React component that wraps all Plotly charts, providing consistent styling and fallback mechanisms
- **[ChartType][Purpose]ChartPlotly.tsx**: Individual chart implementations (e.g., MarketGrowthChartPlotly.tsx)
- **plotlyChartLoader.js**: Utility script for handling Plotly loading and error scenarios

### 2. Conversion Process

1. **Setup Fallback System**
   - Create chart-fallback-handler.js to detect and handle chart loading issues
   - Implement business-plan-simple.astro and business-plan-fallback.astro for text-only alternatives

2. **Create Base Components**
   - Implement PlotlyChartWrapper.tsx as a React component
   - Ensure it supports data tables as fallbacks

3. **Chart-by-Chart Conversion**
   - Start with MarketGrowthChartPlotly.tsx and CompetitorRadarChartPlotly.tsx as examples
   - Convert remaining charts in priority order based on complexity:
     1. Basic line, area, and bar charts
     2. Radar and polar charts
     3. Complex mixed charts
     4. Specialized chart types (heatmaps, candlestick, etc.)

4. **Integration with Web Workers**
   - Continue using existing worker files for data processing
   - Ensure worker data format is compatible with Plotly structure

### 3. Client-Side Loading Strategy

- Load Plotly library only when needed
- Use client:only="react" directive in Astro components
- Implement proper error handling for "self is not defined" scenarios
- Add workarounds for hydration issues

## Technical Considerations

### Plotly Configuration

- Enable responsive layout with `useResizeHandler={true}`
- Configure plot attributes:
  ```javascript
  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'chart_export',
      height: 800,
      width: 1200,
      scale: 2
    }
  };
  ```

### Styling Approach

- Maintain QDaria brand colors across all charts
- Use dark theme compatible styling:
  ```javascript
  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      family: 'Inter, system-ui, sans-serif',
      color: '#ffffff'
    }
  };
  ```

### Accessibility Features

- Include proper ARIA attributes
- Ensure keyboard navigability
- Provide data tables as alternatives to visual charts
- Add invisible text for screen readers where appropriate

## Conversion Priority List

1. MarketGrowthChartPlotly (Line/Area) ✓
2. CompetitorRadarChartPlotly (Radar) ✓
3. ExecutionRoadmapChartPlotly (Timeline)
4. RevenueChartPlotly (Line)
5. FundingAllocationChartPlotly (Donut)
6. RiskAssessmentChartPlotly (Radar)
7. InvestmentDistributionChartPlotly (Bar)
8. ROIComparisonChartPlotly (Scatter)
9. MarketPositioningChartPlotly (Bubble)
10. RevenueDiversificationChartPlotly (Treemap)
11. FinancialMetricsMixedChartPlotly (Mixed)
12. ForecastScenariosRangeChartPlotly (Range Area)

## Fallback Strategy

- Create a chart-fallback-handler.js script to detect chart loading issues
- Provide multiple viewing options:
  1. Full Business Plan with interactive Plotly charts
  2. Simple Text-Only Version (fastest loading)
  3. Fallback Version with static data tables
- Add client-side detection to show fallback banner when charts fail to load

## Testing Requirements

- Verify rendering in both light and dark modes
- Test interactive elements (tooltips, zooming, panning)
- Ensure responsive behavior on different screen sizes
- Validate accessibility with screen readers
- Check for memory leaks with long usage sessions
- Verify data table toggle functionality
