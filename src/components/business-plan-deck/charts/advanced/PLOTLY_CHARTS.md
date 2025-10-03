# Plotly Interactive Charts for Business Plan

This directory contains three production-ready Plotly.js interactive charts designed specifically for business plan presentations.

## 📊 Available Charts

### 1. RiskAssessmentPlotly

**3D Surface Plot for Risk Assessment**

Visualizes business risks across probability and impact dimensions using an interactive 3D surface plot.

**Features:**
- 3D surface showing risk severity landscape
- Scatter points for individual risks with custom markers
- Interactive zoom, pan, and rotation
- Click-to-select risk details
- Color-coded severity levels (Low, Medium, High, Critical)
- Risk legend with severity ranges
- PNG export functionality

**Usage:**
```tsx
import { RiskAssessmentPlotly } from './RiskAssessmentPlotly';

const riskData = {
  risks: [
    {
      probability: 30,
      impact: 80,
      category: 'Market Competition',
      description: 'Increased competition from established providers',
    },
    // ... more risks
  ],
  timeHorizon: 'Next 24 Months',
};

<RiskAssessmentPlotly
  data={riskData}
  title="Enterprise Risk Assessment Matrix"
  height={700}
  onRiskClick={(risk) => console.log('Selected:', risk)}
/>
```

**Data Structure:**
```typescript
interface RiskDataPoint {
  probability: number;    // 0-100
  impact: number;         // 0-100
  category: string;
  description?: string;
}

interface RiskAssessmentData {
  risks: RiskDataPoint[];
  categories?: string[];
  timeHorizon?: string;
}
```

### 2. ScenarioAnalysisPlotly

**Multiple Scenario Waterfall Chart**

Compares financial scenarios (best case, base case, worst case) using interactive waterfall charts.

**Features:**
- Three scenario comparison (Best/Base/Worst case)
- Waterfall visualization showing value changes
- Toggle between scenarios or view all
- Variance analysis between scenarios
- Statistics summary for each scenario
- Automatic value formatting (K, M, B)
- PNG export functionality

**Usage:**
```tsx
import { ScenarioAnalysisPlotly } from './ScenarioAnalysisPlotly';

const scenarioData = {
  periods: ['2025', '2026', '2027', '2028', '2029'],
  currency: 'USD',
  timeframe: '5-Year Projection',
  
  bestCase: [
    { label: 'Starting Capital', value: 10_000_000, isTotal: true },
    { label: 'Product Revenue', value: 15_000_000 },
    { label: 'Operating Costs', value: -12_000_000 },
    { label: 'Net Position', value: 13_000_000, isTotal: true },
  ],
  
  baseCase: [...],
  worstCase: [...],
};

<ScenarioAnalysisPlotly
  data={scenarioData}
  title="5-Year Financial Scenarios"
  height={700}
  onScenarioSelect={(scenario) => console.log('Selected:', scenario)}
/>
```

**Data Structure:**
```typescript
interface ScenarioStep {
  label: string;
  value: number;
  isTotal?: boolean;    // For cumulative totals
  description?: string;
}

interface ScenarioData {
  bestCase: ScenarioStep[];
  baseCase: ScenarioStep[];
  worstCase: ScenarioStep[];
  currency?: string;
  timeframe?: string;
}
```

### 3. ProductMixPlotly

**Stacked Area Chart for Product Revenue Mix**

Visualizes product portfolio revenue composition over time with interactive exploration.

**Features:**
- Stacked area chart with smooth interpolation
- Toggle between absolute values and percentages
- Click-to-select individual products
- Product statistics (total, average, growth rate)
- Portfolio summary with total revenue
- Color-coded product categories
- PNG export functionality

**Usage:**
```tsx
import { ProductMixPlotly } from './ProductMixPlotly';

const productMixData = {
  periods: ['2025', '2026', '2027', '2028', '2029'],
  currency: 'USD',
  unit: 'Revenue',
  
  products: [
    {
      name: 'Quantum Simulator',
      values: [2_000_000, 4_500_000, 8_000_000, 12_000_000, 18_000_000],
      color: '#CCFF00',
      category: 'Software',
      description: 'Cloud-based quantum simulation platform',
    },
    // ... more products
  ],
};

<ProductMixPlotly
  data={productMixData}
  title="Product Revenue Mix (2025-2029)"
  height={700}
  stackMode="stack"
  onProductClick={(product) => console.log('Selected:', product)}
/>
```

**Data Structure:**
```typescript
interface ProductData {
  name: string;
  values: number[];     // Revenue values over time
  color?: string;
  description?: string;
  category?: string;
}

interface ProductMixData {
  periods: string[];    // Time periods
  products: ProductData[];
  currency?: string;
  unit?: string;        // e.g., "Revenue", "Units Sold"
}
```

## 🎨 Design System

All charts follow the business plan design system:

**Colors:**
- Primary: `#CCFF00` (Lime Green)
- Accent: `#00d4ff` (Cyan)
- Success: `#00ff88` (Green)
- Warning: `#ffaa00` (Orange)
- Danger: `#ff3366` (Red)
- Dark: `#1a1a1a` (Background)

**Typography:**
- Font Family: `Inter, sans-serif`
- Title Size: `20px`
- Body Size: `12-14px`

## 🔧 Common Props

All charts share these common props:

```typescript
interface CommonProps {
  title?: string;                  // Chart title
  width?: number | string;         // Chart width (default: '100%')
  height?: number | string;        // Chart height (default: 600)
  theme?: 'light' | 'dark';        // Color theme (default: 'dark')
  showLegend?: boolean;            // Show legend (default: true)
  loading?: boolean;               // Show loading state
  className?: string;              // Additional CSS classes
}
```

## 📦 Dependencies

All charts require:
- `react-plotly.js` - React wrapper for Plotly
- `plotly.js-dist-min` - Plotly core library
- `framer-motion` - Animations
- TypeScript types from `plotly.js`

Already installed in the project.

## 🚀 Export Functionality

All charts include built-in export functionality:
- **Format:** PNG
- **Resolution:** 2x scale (high quality)
- **Size:** 1200-1600px width, 800-1200px height
- **Access:** Via Plotly mode bar (top-right of chart)

## 💡 Best Practices

1. **Data Volume:** Keep data points under 1000 for smooth interaction
2. **Colors:** Use provided color palette for consistency
3. **Loading States:** Always handle loading states for async data
4. **Responsive:** Charts auto-resize with container
5. **Accessibility:** Include meaningful titles and labels
6. **Performance:** Use `useMemo` for expensive calculations

## 📱 Responsive Behavior

Charts automatically adapt to container width:
- Mobile: Single column layout
- Tablet: 2-column grid for statistics
- Desktop: Full-width charts with side-by-side stats

## 🎯 Example Integration

See `examples.tsx` for complete working examples including:
- Risk assessment with 8 risk categories
- 5-year scenario analysis
- Product portfolio with 6 products
- Complete dashboard layout

## 🔍 Interactive Features

**All charts support:**
- ✅ Zoom (scroll or pinch)
- ✅ Pan (drag)
- ✅ Hover tooltips
- ✅ Click events
- ✅ Legend toggle
- ✅ PNG export
- ✅ Auto-resize

**3D charts additionally support:**
- ✅ 3D rotation
- ✅ Camera angle adjustment
- ✅ Projection controls

## 📄 License

These charts are part of the QDaria business plan deck and follow the project license.

## 🤝 Support

For issues or questions about these charts:
1. Check the examples in `examples.tsx`
2. Review Plotly.js documentation
3. Contact the development team

---

**Created:** 2025-10-01  
**Last Updated:** 2025-10-01  
**Version:** 1.0.0
