# Integration Guide - Plotly Charts for Business Plan

## Quick Start

### 1. Import the Charts

```tsx
import {
  RiskAssessmentPlotly,
  ScenarioAnalysisPlotly,
  ProductMixPlotly
} from '@/components/business-plan-deck/charts/advanced';
```

### 2. Use in Astro Components

```astro
---
// In your .astro file
import { RiskAssessmentPlotly } from '@/components/business-plan-deck/charts/advanced';

const riskData = {
  risks: [
    { probability: 30, impact: 80, category: 'Market Risk' },
    // ... more risks
  ]
};
---

<div class="chart-container">
  <RiskAssessmentPlotly 
    data={riskData}
    title="Risk Assessment"
    client:load
  />
</div>
```

### 3. Use in React/TSX Components

```tsx
import { ProductMixPlotly } from '@/components/business-plan-deck/charts/advanced';

export const ProductAnalysis = () => {
  const productData = {
    periods: ['2025', '2026', '2027'],
    products: [
      { name: 'Product A', values: [1000000, 2000000, 3000000] },
      { name: 'Product B', values: [500000, 1500000, 2500000] },
    ]
  };

  return <ProductMixPlotly data={productData} height={600} />;
};
```

## Data Preparation

### Risk Assessment Data

```typescript
const riskData = {
  risks: [
    {
      probability: 30,      // 0-100 scale
      impact: 80,          // 0-100 scale
      category: 'Market Competition',
      description: 'Optional detailed description'
    },
    // Add 5-10 risks for best visualization
  ],
  timeHorizon: 'Next 24 Months'  // Optional
};
```

**Tips:**
- Include 5-10 risks for optimal visualization
- Vary probability and impact for interesting 3D surface
- Use clear, concise category names
- Add descriptions for click interactions

### Scenario Analysis Data

```typescript
const scenarioData = {
  periods: ['2025', '2026', '2027', '2028', '2029'],
  currency: 'USD',
  timeframe: '5-Year Projection',
  
  bestCase: [
    { label: 'Starting Capital', value: 10000000, isTotal: true },
    { label: 'Revenue Stream 1', value: 5000000 },
    { label: 'Revenue Stream 2', value: 3000000 },
    { label: 'Operating Costs', value: -4000000 },
    { label: 'Net Position', value: 14000000, isTotal: true }
  ],
  
  baseCase: [...],  // Similar structure, different values
  worstCase: [...]   // Similar structure, conservative values
};
```

**Tips:**
- Always include Starting/Net Position with `isTotal: true`
- Use negative values for costs/expenses
- Match structure across all scenarios
- Keep 5-8 steps for clarity

### Product Mix Data

```typescript
const productMixData = {
  periods: ['2025', '2026', '2027', '2028', '2029'],
  currency: 'USD',
  unit: 'Revenue',
  
  products: [
    {
      name: 'Core Product',
      values: [2000000, 4000000, 7000000, 12000000, 20000000],
      color: '#CCFF00',      // Optional custom color
      category: 'Hardware',   // Optional category
      description: 'Main revenue driver'  // Optional
    },
    // Add 3-6 products for best visualization
  ]
};
```

**Tips:**
- Include 3-6 products for optimal stacking
- Ensure all products have same number of values as periods
- Use consistent time periods across products
- Assign custom colors for brand alignment

## Styling & Layout

### Responsive Container

```css
.chart-container {
  width: 100%;
  min-height: 600px;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 1rem;
    min-height: 400px;
  }
}
```

### Dark Theme Integration

All charts are designed for dark backgrounds:

```astro
<div class="bg-[#1a1a1a] p-8 rounded-lg">
  <RiskAssessmentPlotly data={data} theme="dark" />
</div>
```

### Light Theme (if needed)

```astro
<div class="bg-white p-8 rounded-lg">
  <RiskAssessmentPlotly data={data} theme="light" />
</div>
```

## Common Props

All charts share these props:

```typescript
interface CommonProps {
  data: ChartSpecificData;     // Required, chart-specific
  title?: string;              // Chart title
  width?: number | string;     // Default: '100%'
  height?: number | string;    // Default: 600
  theme?: 'light' | 'dark';    // Default: 'dark'
  showLegend?: boolean;        // Default: true
  loading?: boolean;           // Show loading state
  className?: string;          // Additional CSS classes
}
```

## Event Handlers

### Risk Assessment

```tsx
<RiskAssessmentPlotly
  data={riskData}
  onRiskClick={(risk) => {
    console.log('Selected risk:', risk);
    // Show modal, navigate, etc.
  }}
/>
```

### Scenario Analysis

```tsx
<ScenarioAnalysisPlotly
  data={scenarioData}
  onScenarioSelect={(scenario) => {
    console.log('Selected scenario:', scenario); // 'best' | 'base' | 'worst'
    // Update UI, fetch details, etc.
  }}
/>
```

### Product Mix

```tsx
<ProductMixPlotly
  data={productMixData}
  stackMode="stack"  // or 'percent'
  onProductClick={(product) => {
    console.log('Selected product:', product);
    // Show details, navigate, etc.
  }}
/>
```

## Loading States

Handle async data with loading prop:

```tsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  fetchChartData().then(result => {
    setData(result);
    setLoading(false);
  });
}, []);

return (
  <RiskAssessmentPlotly 
    data={data || defaultData}
    loading={loading}
  />
);
```

## Error Handling

```tsx
const ChartWithErrorBoundary = () => {
  try {
    return <RiskAssessmentPlotly data={riskData} />;
  } catch (error) {
    return <div>Error loading chart</div>;
  }
};
```

## Performance Optimization

### 1. Memoize Data

```tsx
const chartData = useMemo(() => ({
  risks: processRisks(rawData),
  timeHorizon: '24 months'
}), [rawData]);

return <RiskAssessmentPlotly data={chartData} />;
```

### 2. Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const RiskChart = lazy(() => 
  import('@/components/business-plan-deck/charts/advanced')
    .then(mod => ({ default: mod.RiskAssessmentPlotly }))
);

export const LazyChart = () => (
  <Suspense fallback={<ChartSkeleton />}>
    <RiskChart data={data} />
  </Suspense>
);
```

### 3. Conditional Rendering

```astro
---
const showCharts = import.meta.env.PROD || Astro.params.preview;
---

{showCharts && (
  <RiskAssessmentPlotly data={riskData} client:visible />
)}
```

## Export Functionality

All charts include built-in export:

1. Click the camera icon in the chart toolbar (top-right)
2. Chart exports as high-res PNG (2x scale)
3. Filename auto-generated from chart title

Custom export configuration:

```tsx
// Charts automatically use these settings:
{
  format: 'png',
  filename: 'risk_assessment_3d',
  width: 1600,
  height: 1200,
  scale: 2  // High DPI for print quality
}
```

## Best Practices

### 1. Data Volume
- Risk Assessment: 5-10 risks optimal
- Scenario Analysis: 5-8 steps per scenario
- Product Mix: 3-6 products, 4-8 periods

### 2. Colors
- Use provided color palette for consistency
- Assign colors by category/type
- Ensure sufficient contrast

### 3. Titles & Labels
- Keep titles concise (< 50 chars)
- Use clear, business-friendly labels
- Include units (USD, %, etc.)

### 4. Interactivity
- Add event handlers for drill-down
- Show loading states for async data
- Provide tooltips with details

### 5. Responsive Design
- Test on mobile/tablet/desktop
- Adjust height for smaller screens
- Consider touch interactions

## Troubleshooting

### Chart Not Rendering

**Issue:** Chart shows blank or loading forever

**Solutions:**
```tsx
// 1. Check data structure
console.log('Chart data:', data);

// 2. Ensure client-side rendering (Astro)
<RiskAssessmentPlotly client:load />

// 3. Verify dependencies installed
npm list react-plotly.js plotly.js-dist-min
```

### TypeScript Errors

**Issue:** Type errors in data structure

**Solutions:**
```tsx
// Import types explicitly
import type { RiskDataPoint } from '@/components/business-plan-deck/charts/advanced';

// Use type assertion if needed
const risks: RiskDataPoint[] = [...];
```

### Performance Issues

**Issue:** Slow rendering or laggy interactions

**Solutions:**
```tsx
// 1. Reduce data points
const sampledData = data.slice(0, 100);

// 2. Use memoization
const chartData = useMemo(() => processData(raw), [raw]);

// 3. Lazy load
<RiskChart client:visible />  // Only load when visible
```

## Examples

See `examples.tsx` for complete working examples:
- Risk assessment with 8 risks
- 5-year scenario analysis
- Product portfolio with 6 products
- Full dashboard integration

## Support

For issues or questions:
1. Check documentation in `PLOTLY_CHARTS.md`
2. Review examples in `examples.tsx`
3. Consult Plotly.js documentation
4. Contact development team

---

**Last Updated:** 2025-10-01  
**Version:** 1.0.0
