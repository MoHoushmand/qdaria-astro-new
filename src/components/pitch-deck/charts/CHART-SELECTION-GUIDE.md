# Chart Library Selection Guide

## Overview

This guide helps you choose the right charting library for each visualization need in the QDaria pitch deck.

## Library Comparison

| Library | Best For | Complexity | Customization | Performance | File Size |
|---------|----------|------------|---------------|-------------|-----------|
| **Recharts** | Simple charts, quick prototypes | Low | Medium | Good | Small |
| **Apache ECharts** | Complex business charts, multi-series | High | High | Excellent | Large |
| **D3.js** | Custom interactive visualizations | Very High | Very High | Excellent | Medium |
| **Plotly.js** | Scientific/technical charts | Medium | High | Very Good | Large |
| **Nivo** | Beautiful declarative charts | Low | Medium | Good | Medium |
| **visx** | Custom branded components | High | Very High | Excellent | Small |

## Decision Tree

```
Need a chart?
├─ Simple line/bar/pie? → Use Recharts
├─ Complex business visualization?
│  ├─ Multi-axis, heatmap, 3D? → Use ECharts
│  └─ Network graph, custom interaction? → Use D3.js
├─ Scientific/technical data?
│  ├─ With zoom, pan, export? → Use Plotly.js
│  └─ Simple and beautiful? → Use Nivo
└─ Need exact QDaria branding? → Use visx
```

## Slide-by-Slide Recommendations

### TitleSlide
- **Animated metrics cards**: visx custom components
- **Quick stats**: Recharts (simple)
- **Live data**: Nivo (beautiful)

**Example:**
```tsx
import { VisxChart } from './charts/advanced/VisxChart';

<VisxChart type="branded-line" data={kpiData} color="#CCFF00" />
```

---

### MarketSlide

#### TAM/SAM/SOM Breakdown
- **Library**: Nivo
- **Chart Type**: Nested pie or donut
- **Rationale**: Beautiful, clear hierarchy visualization

**Example:**
```tsx
import { NivoChart } from './charts/advanced/NivoChart';

<NivoChart
  type="donut"
  data={marketSizeData}
  title="Market Opportunity"
/>
```

#### Market Growth Over Time
- **Library**: ECharts
- **Chart Type**: Multi-axis time series
- **Rationale**: Show both absolute values and growth rates

**Example:**
```tsx
import { EChartsComponent } from './charts/advanced/EChartsComponent';

<EChartsComponent
  type="multi-axis-line"
  data={marketGrowthData}
  title="Quantum Computing Market Growth"
/>
```

#### Competitive Positioning
- **Library**: ECharts
- **Chart Type**: Bubble chart
- **Rationale**: 3 dimensions (x, y, size) for comprehensive comparison

**Example:**
```tsx
<EChartsComponent
  type="bubble"
  data={competitiveData}
  title="Competitive Positioning Matrix"
/>
```

---

### TechnologySlide

#### Quantum Architecture
- **Library**: D3.js
- **Chart Type**: Force-directed network graph
- **Rationale**: Shows interconnected components dynamically

**Example:**
```tsx
import { D3Visualization } from './charts/advanced/D3Visualization';

<D3Visualization
  type="network-graph"
  data={architectureData}
  width={900}
  height={600}
  interactive={true}
/>
```

#### Qubit Performance Metrics
- **Library**: Plotly.js
- **Chart Type**: Scatter with error bars
- **Rationale**: Scientific accuracy with confidence intervals

**Example:**
```tsx
import { PlotlyChart } from './charts/advanced/PlotlyChart';

<PlotlyChart
  type="scatter-with-error"
  data={qubitPerformanceData}
  xLabel="Temperature (mK)"
  yLabel="Coherence Time (μs)"
/>
```

#### Algorithm Comparison
- **Library**: Plotly.js
- **Chart Type**: 3D scatter plot
- **Rationale**: Compare multiple performance dimensions

**Example:**
```tsx
<PlotlyChart
  type="3d-scatter"
  data={algorithmComparisonData}
  xLabel="Qubits"
  yLabel="Success Rate"
  zLabel="Execution Time"
/>
```

#### Error Rate Distribution
- **Library**: Plotly.js
- **Chart Type**: Box plot or violin
- **Rationale**: Show statistical distribution and outliers

**Example:**
```tsx
<PlotlyChart
  type="box-plot"
  data={errorRateData}
  title="Gate Error Rate Comparison"
/>
```

---

### TractionSlide

#### Customer Growth
- **Library**: Nivo
- **Chart Type**: Area chart (stacked)
- **Rationale**: Beautiful, smooth animations for growth story

**Example:**
```tsx
import { NivoChart } from './charts/advanced/NivoChart';

<NivoChart
  type="area"
  data={customerGrowthData}
  title="Customer Acquisition"
/>
```

#### Key Metrics Dashboard
- **Library**: visx
- **Chart Type**: Custom branded cards
- **Rationale**: Exact QDaria styling for brand consistency

**Example:**
```tsx
import { VisxChart } from './charts/advanced/VisxChart';

<VisxChart
  type="branded-line"
  data={metricsData}
  color="#CCFF00"
/>
```

#### Pipeline Visualization
- **Library**: ECharts
- **Chart Type**: Waterfall chart
- **Rationale**: Show progression through sales funnel

**Example:**
```tsx
<EChartsComponent
  type="waterfall"
  data={pipelineData}
  title="Sales Pipeline"
/>
```

---

### FinancialsSlide

#### Revenue Projections
- **Library**: visx
- **Chart Type**: Custom branded line
- **Rationale**: Exact QDaria branding for investor materials

**Example:**
```tsx
<VisxChart
  type="branded-line"
  data={revenueData}
  color="#CCFF00"
  gradientFrom="#CCFF00"
  gradientTo="#00d4ff"
/>
```

#### Revenue Streams
- **Library**: Nivo
- **Chart Type**: Stacked bar
- **Rationale**: Clear breakdown with beautiful animations

**Example:**
```tsx
<NivoChart
  type="stacked-bar"
  data={revenueStreamsData}
  title="Revenue by Product"
/>
```

#### Unit Economics
- **Library**: visx
- **Chart Type**: Custom gradient bars
- **Rationale**: Branded visualization for key metrics

**Example:**
```tsx
<VisxChart
  type="gradient-bar"
  data={unitEconomicsData}
  gradientFrom="#00d4ff"
  gradientTo="#CCFF00"
/>
```

#### Financial Projections (Waterfall)
- **Library**: ECharts
- **Chart Type**: Waterfall
- **Rationale**: Standard financial visualization for cash flow

**Example:**
```tsx
<EChartsComponent
  type="waterfall"
  data={cashFlowData}
  title="Cash Flow Projection"
/>
```

---

### CustomerValidationSlide

#### Industry Distribution
- **Library**: Nivo
- **Chart Type**: Donut chart
- **Rationale**: Clear, beautiful breakdown by sector

**Example:**
```tsx
<NivoChart
  type="donut"
  data={industryData}
  title="Customer Distribution by Industry"
/>
```

#### Customer Satisfaction
- **Library**: ECharts
- **Chart Type**: Gauge chart
- **Rationale**: Impactful single-metric visualization

**Example:**
```tsx
<EChartsComponent
  type="gauge"
  data={{ value: 94, name: 'NPS Score' }}
  title="Net Promoter Score"
/>
```

#### Feature Usage Heatmap
- **Library**: ECharts
- **Chart Type**: Heatmap
- **Rationale**: Show patterns across customers and features

**Example:**
```tsx
<EChartsComponent
  type="heatmap"
  data={featureUsageData}
  title="Feature Adoption Matrix"
/>
```

---

### TeamSlide

#### Organization Chart
- **Library**: D3.js
- **Chart Type**: Tree diagram
- **Rationale**: Interactive hierarchical visualization

**Example:**
```tsx
<D3Visualization
  type="org-chart"
  data={orgChartData}
  width={1000}
  height={600}
/>
```

#### Skills/Expertise Radar
- **Library**: Nivo
- **Chart Type**: Radar chart
- **Rationale**: Multi-dimensional team capabilities

**Example:**
```tsx
<NivoChart
  type="radar"
  data={teamSkillsData}
  title="Team Expertise Profile"
/>
```

---

### CompetitiveSlide

#### Feature Comparison Matrix
- **Library**: ECharts
- **Chart Type**: Heatmap
- **Rationale**: Dense information, clear color coding

**Example:**
```tsx
<EChartsComponent
  type="heatmap"
  data={featureComparisonData}
  title="Competitive Feature Matrix"
/>
```

#### Competitive Radar
- **Library**: Nivo
- **Chart Type**: Radar chart
- **Rationale**: Multi-dimensional comparison

**Example:**
```tsx
<NivoChart
  type="radar"
  data={competitiveMetricsData}
  title="Competitive Analysis"
  colors={['#CCFF00', '#0066cc', '#ea4335']}
/>
```

---

## Performance Considerations

### When to Use Each Library

**Use Recharts when:**
- Prototyping quickly
- Chart is simple (single-series line/bar/pie)
- Bundle size is critical
- No custom interactions needed

**Use ECharts when:**
- Multiple data series (>5)
- Need multi-axis charts
- Complex tooltips/interactions
- 3D visualizations required
- Heatmaps or matrix visualizations

**Use D3.js when:**
- Need completely custom visualization
- Building network/tree diagrams
- Require advanced interactions (drag, zoom, custom events)
- No pre-built chart fits the need

**Use Plotly.js when:**
- Scientific/technical accuracy required
- Need zoom, pan, export features
- Error bars or statistical visualizations
- 3D surface plots
- Interactive hover/click analysis

**Use Nivo when:**
- Want beautiful, modern design out-of-the-box
- Declarative API preferred
- Smooth animations important
- Standard chart types with great defaults

**Use visx when:**
- Need exact QDaria branding
- Building reusable custom components
- Want full control over styling
- Composing complex custom visualizations
- Bundle size optimization important

---

## Accessibility Guidelines

All charts should include:
1. **ARIA labels**: `aria-label` describing the chart
2. **Keyboard navigation**: Focus and interact without mouse
3. **Screen reader support**: Data tables as fallback
4. **Color contrast**: WCAG AA compliance (4.5:1)
5. **Responsive design**: Mobile to desktop

**Example:**
```tsx
<div role="img" aria-label="Revenue growth from 2024 to 2025">
  <VisxChart data={revenueData} />
  <ScreenReaderTable data={revenueData} />
</div>
```

---

## QDaria Brand Colors

Always use these colors for consistency:

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

---

## Quick Reference Table

| Use Case | Library | Chart Type | Example File |
|----------|---------|------------|--------------|
| Market growth | ECharts | Multi-axis line | `market-growth-echarts.tsx` |
| Competitive positioning | ECharts | Bubble | `market-growth-echarts.tsx` |
| Quantum architecture | D3.js | Network graph | `quantum-architecture-d3.tsx` |
| Team org chart | D3.js | Tree | `quantum-architecture-d3.tsx` |
| Qubit performance | Plotly | Scatter+error | `performance-metrics-plotly.tsx` |
| Algorithm 3D | Plotly | 3D scatter | `performance-metrics-plotly.tsx` |
| Industry distribution | Nivo | Donut | `customer-distribution-nivo.tsx` |
| Customer growth | Nivo | Area | `customer-distribution-nivo.tsx` |
| Revenue projections | visx | Branded line | `financial-projections-visx.tsx` |
| Unit economics | visx | Gradient bar | `financial-projections-visx.tsx` |

---

## Migration Path

If replacing existing Recharts charts:

1. **Identify the chart**: Find Recharts component in slide
2. **Choose replacement**: Use decision tree above
3. **Import new library**: Add advanced component import
4. **Transform data**: Adjust data format if needed
5. **Apply QDaria styling**: Use brand colors
6. **Test responsiveness**: Verify mobile → desktop
7. **Keep Recharts as fallback**: Don't delete until verified

**Example migration:**
```tsx
// Before (Recharts)
import { LineChart, Line } from 'recharts';
<LineChart data={data}>
  <Line dataKey="value" />
</LineChart>

// After (visx for branding)
import { VisxChart } from './charts/advanced/VisxChart';
<VisxChart type="branded-line" data={data} color="#CCFF00" />
```

---

## Support and Resources

- **ECharts**: https://echarts.apache.org/examples/
- **D3.js**: https://d3js.org/
- **Plotly**: https://plotly.com/javascript/
- **Nivo**: https://nivo.rocks/
- **visx**: https://airbnb.io/visx/

For questions, check `/src/components/pitch-deck/charts/examples/` for working implementations.
