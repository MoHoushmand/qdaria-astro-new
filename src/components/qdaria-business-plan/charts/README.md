# QDaria Business Plan Chart Enhancements

This directory contains enhanced chart components for the QDaria business plan, implementing the following requirements:

## Architecture Overview

The chart components use a layered architecture:

1. **Chart.tsx/Chart.astro**: Core React and Astro components
2. **EnhancedBaseChart.tsx**: Base React component with shared functionality
3. **[ChartType][Purpose]Chart.tsx**: Specific chart implementations (MarketSize, SWOT, etc.)
4. **[ChartType][Purpose]Chart.astro**: Astro island components (client:load pattern)
5. **workers/[chartType]Worker.js**: Web workers for complex calculations

## Key Features Implemented

### Chart Visibility and Rendering
- Client-side rendering with island pattern (client:load)
- Dark mode and light mode support with proper theme detection
- Explicit width/height controls to prevent layout shift
- Z-indexing system to prevent chart element overlap

### Interactive Data Features
- Tooltips with detailed data display
- Data tables with export functionality
- View toggles (absolute vs. percentage for TAM/SAM/SOM charts)
- Scenario comparison for Market Size charts

### Typography and Spacing
- Consistent font usage (Inter for body, Poppins for headings)
- Proper spacing between chart elements and descriptions
- Consistent margins and padding

### Accessibility Features
- WCAG 2.1 AA compliance
- Screen reader compatibility with aria-live announcements
- Keyboard navigation support
- Visible focus states on all interactive elements

### Performance Optimizations
- Web workers for complex calculations
- Lazy loading through client:load directive
- Deferred initialization of non-critical chart elements
- Optimized asset loading

## How to Use

### Basic Usage

```astro
---
import MarketSizeChartEnhanced from "../components/qdaria-business-plan/charts/MarketSizeChartEnhanced.astro";

const marketSizeYears = [2025, 2026, 2027, 2028, 2029, 2030];
const marketSizeData = [2, 3.5, 5.8, 8.2, 11.5, 14.8];
---

<MarketSizeChartEnhanced
  id="marketSizeChart"
  title="Global Quantum Computing Market Size"
  description="Projected market size in billions USD through 2030"
  initialData={marketSizeData}
  years={marketSizeYears}
  smoothing={true}
  darkMode={true}
/>
```

### SWOT Analysis Chart

```astro
<SWOTChartEnhanced
  id="swotAnalysisChart"
  title="SWOT Analysis"
  description="Analysis of strengths, weaknesses, opportunities, and threats"
  strengths={strengthsData}
  weaknesses={weaknessesData}
  opportunities={opportunitiesData}
  threats={threatsData}
  darkMode={true}
/>
```

### TAM/SAM/SOM Chart

```astro
<TAMSAMSOMChartEnhanced
  id="marketDecompositionChart"
  title="Market Size Decomposition"
  description="TAM, SAM, and SOM forecasts"
  tam={1300}
  samPercentage={10}
  somPercentage={5}
  years={[2025, 2026, 2027, 2028, 2029, 2030]}
  growthRate={20}
  darkMode={true}
/>
```

## Keyboard Navigation

All charts support keyboard navigation:

- **Tab**: Focus on the chart
- **Arrow Keys**: Navigate between data points
- **Enter/Space**: Select current data point or toggle controls
- **Alt+T**: Toggle data table
- **Alt+E**: Export as image
- **Alt+C**: Export as CSV

## Responsive Design

All charts are fully responsive and adapt to different screen sizes. On smaller screens:

- Charts resize proportionally
- Controls reorganize for better touch interaction
- Tooltips adapt to available space

## Browser Compatibility

Tested and working in:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

Potential areas for further improvement:

1. Add more chart types (timeline, funnel, etc.)
2. Implement animation for transitions between data views
3. Add drag-to-zoom functionality for detailed exploration
4. Enable downloadable PDFs with chart collections