# QDaria Advanced Chart Components

Enterprise-grade data visualization library with 5 sophisticated charting libraries for the QDaria pitch deck.

## 📚 Libraries Included

1. **Apache ECharts** - Complex business charts
2. **D3.js** - Custom interactive visualizations
3. **Plotly.js** - Scientific and technical charts
4. **Nivo** - Beautiful declarative charts
5. **visx** - Custom branded components

## 🚀 Quick Start

```tsx
// Import any chart component
import { EChartsComponent } from '@/components/pitch-deck/charts/advanced/EChartsComponent';
import { D3Visualization } from '@/components/pitch-deck/charts/advanced/D3Visualization';
import { PlotlyChart } from '@/components/pitch-deck/charts/advanced/PlotlyChart';
import { NivoChart } from '@/components/pitch-deck/charts/advanced/NivoChart';
import { VisxChart } from '@/components/pitch-deck/charts/advanced/VisxChart';

// Use in your component
<EChartsComponent
  type="multi-axis-line"
  data={marketGrowthData}
  title="Market Growth Projection"
  height={500}
  theme="dark"
/>
```

## 📁 Project Structure

```
charts/
├── advanced/                      # Advanced charting library wrappers
│   ├── EChartsComponent.tsx      # Apache ECharts wrapper
│   ├── D3Visualization.tsx       # D3.js custom visualizations
│   ├── PlotlyChart.tsx           # Plotly.js scientific charts
│   ├── NivoChart.tsx             # Nivo beautiful charts
│   ├── VisxChart.tsx             # visx branded components
│   └── index.ts                  # Export all advanced components
│
├── examples/                      # Working examples for each library
│   ├── market-growth-echarts.tsx
│   ├── quantum-architecture-d3.tsx
│   ├── performance-metrics-plotly.tsx
│   ├── customer-distribution-nivo.tsx
│   ├── financial-projections-visx.tsx
│   └── index.ts
│
├── types.ts                       # Shared TypeScript types
├── CHART-SELECTION-GUIDE.md      # Comprehensive selection guide
└── README.md                      # This file
```

## 🎨 QDaria Brand Colors

All charts use the official QDaria color palette:

```typescript
const QDARIA_COLORS = {
  primary: '#CCFF00',    // Electric lime
  secondary: '#9AFF00',  // Bright green
  tertiary: '#66FF00',   // Neon green
  accent: '#00d4ff',     // Cyan blue
  dark: '#1a1a1a',       // Background
  gray: '#666666',       // Muted text
};
```

## 📖 Chart Selection Decision Tree

```
Need a chart?
├─ Simple line/bar/pie? → Use Recharts (existing)
├─ Complex business visualization?
│  ├─ Multi-axis, heatmap, 3D? → Use ECharts
│  └─ Network graph, custom interaction? → Use D3.js
├─ Scientific/technical data?
│  ├─ With zoom, pan, export? → Use Plotly.js
│  └─ Simple and beautiful? → Use Nivo
└─ Need exact QDaria branding? → Use visx
```

## 🔥 Popular Examples

### Market Growth (ECharts)
```tsx
import { MarketGrowthEChartsExample } from '@/components/pitch-deck/charts/examples';

<MarketGrowthEChartsExample />
```

### Quantum Architecture (D3.js)
```tsx
import { QuantumArchitectureExample } from '@/components/pitch-deck/charts/examples';

<QuantumArchitectureExample />
```

### Performance Metrics (Plotly)
```tsx
import { QubitCoherenceExample } from '@/components/pitch-deck/charts/examples';

<QubitCoherenceExample />
```

### Industry Distribution (Nivo)
```tsx
import { IndustryDistributionExample } from '@/components/pitch-deck/charts/examples';

<IndustryDistributionExample />
```

### Revenue Projections (visx)
```tsx
import { RevenueProjectionsExample } from '@/components/pitch-deck/charts/examples';

<RevenueProjectionsExample />
```

## 📊 Component API Reference

### EChartsComponent

Complex business visualizations with multiple chart types.

**Props:**
- `type`: Chart type (multi-axis-line, heatmap, bubble, waterfall, stacked-area, gauge, 3d-bar)
- `data`: Chart data object
- `title`: Chart title (optional)
- `subtitle`: Chart subtitle (optional)
- `height`: Chart height in pixels (default: 400)
- `theme`: Theme variant ('light' | 'dark', default: 'dark')
- `loading`: Show loading state (default: false)
- `onChartReady`: Callback when chart is ready
- `className`: CSS class name

**Example:**
```tsx
<EChartsComponent
  type="bubble"
  data={{
    xAxisName: 'Market Share',
    yAxisName: 'Innovation Score',
    series: [
      { name: 'QDaria', data: [[15, 95, 50]], color: '#CCFF00' }
    ]
  }}
  title="Competitive Positioning"
  height={500}
/>
```

### D3Visualization

Custom interactive visualizations using D3.js.

**Props:**
- `type`: Visualization type (network-graph, org-chart, tree-diagram, sankey, force-layout)
- `data`: Visualization data (nodes, links, tree structure)
- `width`: Width in pixels (default: 800)
- `height`: Height in pixels (default: 600)
- `className`: CSS class name
- `onNodeClick`: Callback for node clicks
- `interactive`: Enable interactions (default: true)

**Example:**
```tsx
<D3Visualization
  type="network-graph"
  data={{
    nodes: [{ id: 'qpu', label: 'QPU Core', group: 0 }],
    links: [{ source: 'qpu', target: 'anyon', label: 'Controls' }]
  }}
  onNodeClick={(node) => console.log(node)}
/>
```

### PlotlyChart

Scientific and technical charts with zoom, pan, and export.

**Props:**
- `type`: Chart type (scatter-with-error, 3d-scatter, box-plot, violin, contour, surface-3d, parallel-coordinates)
- `data`: Chart data object
- `title`: Chart title (optional)
- `xLabel`: X-axis label (optional)
- `yLabel`: Y-axis label (optional)
- `zLabel`: Z-axis label for 3D (optional)
- `width`: Width (default: '100%')
- `height`: Height (default: 500)
- `theme`: Theme variant ('light' | 'dark', default: 'dark')
- `showLegend`: Show legend (default: true)
- `loading`: Show loading state (default: false)
- `onDataClick`: Callback for data point clicks

**Example:**
```tsx
<PlotlyChart
  type="scatter-with-error"
  data={{
    series: [
      {
        name: 'QDaria Qubits',
        x: [50, 100, 150],
        y: [10000, 12000, 15000],
        error: [500, 600, 700]
      }
    ]
  }}
  title="Qubit Coherence Analysis"
  xLabel="Temperature (mK)"
  yLabel="Coherence Time (μs)"
/>
```

### NivoChart

Beautiful declarative charts with smooth animations.

**Props:**
- `type`: Chart type (pie, donut, line, bar, stacked-bar, radar, area)
- `data`: Chart data array or object
- `title`: Chart title (optional)
- `height`: Chart height in pixels (default: 400)
- `theme`: Theme variant ('light' | 'dark', default: 'dark')
- `animate`: Enable animations (default: true)
- `interactive`: Enable interactions (default: true)
- `className`: CSS class name
- `colors`: Custom color palette (optional)

**Example:**
```tsx
<NivoChart
  type="donut"
  data={[
    { id: 'Pharma', value: 28, label: 'Pharmaceuticals' },
    { id: 'Finance', value: 24, label: 'Financial Services' }
  ]}
  title="Customer Distribution"
  height={500}
/>
```

### VisxChart

Custom branded components with exact QDaria styling.

**Props:**
- `type`: Chart type (branded-line, gradient-bar, animated-area, custom-combo)
- `data`: Array of data points ({ label, value })
- `width`: Width in pixels (default: 800)
- `height`: Height in pixels (default: 400)
- `title`: Chart title (optional)
- `xLabel`: X-axis label (optional)
- `yLabel`: Y-axis label (optional)
- `theme`: Theme variant ('light' | 'dark', default: 'dark')
- `color`: Primary color (default: '#CCFF00')
- `gradientFrom`: Gradient start color (default: '#CCFF00')
- `gradientTo`: Gradient end color (default: '#00d4ff')
- `className`: CSS class name
- `showGrid`: Show grid lines (default: true)
- `animate`: Enable animations (default: true)

**Example:**
```tsx
<VisxChart
  type="branded-line"
  data={[
    { label: 'Q1 2024', value: 1100000 },
    { label: 'Q2 2024', value: 1610000 }
  ]}
  title="Revenue Projections"
  color="#CCFF00"
/>
```

## 🎯 Use Cases by Slide

| Slide | Recommended Library | Chart Type | Example |
|-------|-------------------|------------|---------|
| MarketSlide | ECharts | Multi-axis line | `market-growth-echarts.tsx` |
| TechnologySlide | D3.js | Network graph | `quantum-architecture-d3.tsx` |
| TechnologySlide | Plotly | Scatter with error | `performance-metrics-plotly.tsx` |
| TractionSlide | Nivo | Area chart | `customer-distribution-nivo.tsx` |
| FinancialsSlide | visx | Branded line | `financial-projections-visx.tsx` |
| CustomerSlide | Nivo | Donut chart | `customer-distribution-nivo.tsx` |

## 🔧 Customization

### Theme Configuration

All components support light and dark themes:

```tsx
<EChartsComponent
  type="multi-axis-line"
  data={data}
  theme="dark"  // or "light"
/>
```

### Custom Colors

Override default colors with custom palettes:

```tsx
<NivoChart
  type="bar"
  data={data}
  colors={['#CCFF00', '#00d4ff', '#9AFF00']}
/>
```

### Responsive Design

All charts are responsive by default:

```tsx
<VisxChart
  type="branded-line"
  data={data}
  width={window.innerWidth > 768 ? 900 : 400}
  height={window.innerWidth > 768 ? 500 : 300}
/>
```

## ♿ Accessibility

All charts include:
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Responsive design for all devices

**Example:**
```tsx
<div role="img" aria-label="Revenue growth from 2024 to 2025">
  <VisxChart type="branded-line" data={revenueData} />
</div>
```

## 📦 Dependencies

```json
{
  "echarts": "^5.x",
  "echarts-for-react": "^3.x",
  "d3": "^7.x",
  "plotly.js": "^2.x",
  "react-plotly.js": "^2.x",
  "@nivo/core": "^0.87.x",
  "@nivo/pie": "^0.87.x",
  "@nivo/line": "^0.87.x",
  "@nivo/bar": "^0.87.x",
  "@nivo/radar": "^0.87.x",
  "@visx/visx": "^3.x"
}
```

## 🚀 Performance Tips

1. **Memoize data transformations:**
```tsx
const chartData = useMemo(() => transformData(rawData), [rawData]);
```

2. **Lazy load heavy components:**
```tsx
const PlotlyChart = lazy(() => import('./advanced/PlotlyChart'));
```

3. **Use appropriate chart types:**
- Simple data → Recharts or Nivo
- Complex data → ECharts or Plotly
- Custom needs → D3 or visx

4. **Optimize data points:**
- Limit to 1000 points for interactive charts
- Use aggregation for larger datasets

## 🐛 Troubleshooting

### Charts not rendering
- Verify all dependencies are installed
- Check data format matches component expectations
- Ensure parent container has defined dimensions

### Performance issues
- Reduce number of data points
- Disable animations for large datasets
- Use virtualization for long lists

### Styling issues
- Verify CSS classes are applied correctly
- Check z-index for overlapping elements
- Ensure responsive breakpoints are configured

## 📚 Additional Resources

- [Chart Selection Guide](./CHART-SELECTION-GUIDE.md)
- [ECharts Documentation](https://echarts.apache.org/)
- [D3.js Documentation](https://d3js.org/)
- [Plotly Documentation](https://plotly.com/javascript/)
- [Nivo Documentation](https://nivo.rocks/)
- [visx Documentation](https://airbnb.io/visx/)

## 📄 License

Part of the QDaria pitch deck project. All rights reserved.

---

**Created:** 2025-10-01
**Version:** 1.0.0
**Author:** QDaria Development Team
