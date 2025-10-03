# Advanced Charts - Business Plan Deck

Production-ready financial visualization components built with @nivo, @visx, ECharts, and Plotly for business plan presentations.

## Chart Libraries

- **Nivo (@nivo)** - Financial projections, market segmentation, growth metrics
- **Visx (@visx)** - Gantt charts, heatmaps, multi-axis line charts
- **ECharts (echarts-for-react)** - Competitor analysis, market size
- **Plotly (react-plotly.js)** - Risk assessment, scenario analysis, product mix

## Components

### 1. FinancialProjectionsNivo

Multi-metric line chart for displaying financial projections over time.

**Features:**
- Multiple metric lines (Revenue, EBITDA, Net Profit)
- Smooth catmull-rom curves
- Area fill with opacity
- Custom tooltips with loss indicators
- Interactive crosshair
- Responsive design

**Usage:**
```tsx
import { FinancialProjectionsNivo } from '@/components/business-plan-deck/charts/advanced';

<FinancialProjectionsNivo
  data={[
    {
      id: 'Revenue',
      color: '#00d4ff',
      data: [
        { x: '2025', y: 2500000 },
        { x: '2026', y: 8500000 },
      ]
    }
  ]}
  height={500}
  theme="dark"
  enableArea={true}
/>
```

**Props:**
- `data` - Array of financial series (default provided)
- `height` - Chart height in pixels (default: 500)
- `theme` - 'light' | 'dark' (default: 'dark')
- `animate` - Enable animations (default: true)
- `enableArea` - Show area fill (default: true)
- `showLegend` - Display legend (default: true)
- `formatValue` - Custom value formatter

---

### 2. MarketSegmentationNivo

Pie/Donut chart for market segmentation analysis.

**Features:**
- Pie or donut variants
- Interactive hover effects
- Percentage labels on arcs
- Custom center label for donut
- Segment descriptions in tooltips
- Arc link labels (pie only)

**Usage:**
```tsx
import { MarketSegmentationNivo } from '@/components/business-plan-deck/charts/advanced';

<MarketSegmentationNivo
  data={[
    {
      id: 'financial-services',
      label: 'Financial Services',
      value: 35,
      color: '#00d4ff',
      description: 'Banking, Insurance, Trading'
    }
  ]}
  variant="donut"
  height={500}
  showPercentages={true}
/>
```

**Props:**
- `data` - Array of market segments (default provided)
- `variant` - 'pie' | 'donut' (default: 'donut')
- `height` - Chart height in pixels (default: 500)
- `theme` - 'light' | 'dark' (default: 'dark')
- `animate` - Enable animations (default: true)
- `showPercentages` - Show % on arcs (default: true)
- `showLabels` - Show arc labels (default: true)
- `showLegend` - Display legend (default: true)
- `innerRadius` - Donut inner radius 0-1 (default: 0.65)

---

### 3. GrowthMetricsNivo

Bar chart for year-over-year growth comparisons.

**Features:**
- Grouped or stacked bars
- Multiple metrics comparison
- Baseline marker at 0%
- Growth rate indicators
- YoY percentage in tooltips
- Horizontal or vertical layout

**Usage:**
```tsx
import { GrowthMetricsNivo } from '@/components/business-plan-deck/charts/advanced';

<GrowthMetricsNivo
  data={[
    {
      category: 'Revenue',
      current: 340,
      previous: 100,
      target: 500,
      industry: 150
    }
  ]}
  keys={['previous', 'current', 'target', 'industry']}
  groupMode="grouped"
  height={500}
  showComparison={true}
/>
```

**Props:**
- `data` - Array of growth data points (default provided)
- `keys` - Metrics to display (default: ['previous', 'current', 'target', 'industry'])
- `groupMode` - 'grouped' | 'stacked' (default: 'grouped')
- `height` - Chart height in pixels (default: 500)
- `theme` - 'light' | 'dark' (default: 'dark')
- `animate` - Enable animations (default: true)
- `showComparison` - Show baseline marker (default: true)
- `showGrid` - Display grid lines (default: true)
- `showLegend` - Display legend (default: true)
- `layout` - 'horizontal' | 'vertical' (default: 'vertical')
- `formatValue` - Custom value formatter

## Styling & Theme

All components use a consistent business plan theme:

**Colors:**
- Primary (Revenue/Current): `#00d4ff` (Cyan)
- Secondary (EBITDA/Target): `#CCFF00` (Lime)
- Success (Profit/Previous): `#9AFF00` (Green)
- Accent: `#66FF00` (Light Green)
- Warning (Losses): `#FF3366` (Red)
- Neutral (Industry): `#666666` (Gray)

**Typography:**
- Font: Inter, system fonts fallback
- Weights: 500 (regular), 600 (semi-bold), 700 (bold)
- Letter spacing: -0.02em for large numbers

**Animations:**
- Motion config: gentle spring physics
- Duration: 0.8s with easing
- Stagger: natural entrance animations

## Data Formats

### Financial Projections
```typescript
interface FinancialSerie {
  id: string;
  color?: string;
  data: Array<{
    x: string | number;  // Year or period
    y: number;           // Value in dollars
  }>;
}
```

### Market Segmentation
```typescript
interface MarketSegment {
  id: string;
  label: string;
  value: number;        // Percentage or absolute value
  color?: string;
  description?: string;
}
```

### Growth Metrics
```typescript
interface GrowthDataPoint {
  category: string;
  current?: number;     // Current year growth %
  previous?: number;    // Previous year growth %
  target?: number;      // Target growth %
  industry?: number;    // Industry average %
  [key: string]: string | number | undefined;
}
```

## Integration with Astro

Use the `client:load` directive for interactive charts:

```astro
---
import { FinancialProjectionsNivo } from '@/components/business-plan-deck/charts/advanced';
---

<div class="chart-container">
  <FinancialProjectionsNivo client:load />
</div>
```

## Performance Notes

- All charts are responsive and optimized for 60fps
- Default data is provided for immediate rendering
- Animations can be disabled for faster initial render
- Uses Nivo's efficient SVG rendering
- Lazy load components for better page performance

## Accessibility

- All charts include proper ARIA labels
- Tooltips are keyboard accessible
- Color contrast meets WCAG AA standards
- Screen reader compatible data tables can be added

---

## Visx Charts

### 4. MilestoneGanttVisx

Gantt chart for project timeline and milestone tracking.

**Features:**
- Timeline visualization with start/end dates
- Progress indicators (0-100%)
- Status indicators (not-started, in-progress, completed, delayed)
- Dependencies between milestones
- Category color coding
- Budget tracking
- Interactive tooltips with detailed information
- Responsive scaling

**Usage:**
```tsx
import { MilestoneGanttVisx } from '@/components/business-plan-deck/charts/advanced';

<MilestoneGanttVisx
  data={[
    {
      id: '1',
      name: 'Product Development',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-30'),
      progress: 75,
      status: 'in-progress',
      category: 'development',
      owner: 'Engineering Team',
      budget: 500000,
      description: 'Core product development',
      dependencies: []
    }
  ]}
  width={1200}
  height={600}
  theme="dark"
  showGrid={true}
  showDependencies={true}
/>
```

**Props:**
- `data` - Array of milestone objects (required)
- `width` - Chart width in pixels (default: 1000)
- `height` - Chart height in pixels (default: 600)
- `theme` - 'light' | 'dark' (default: 'dark')
- `showGrid` - Display grid lines (default: true)
- `showDependencies` - Show dependency arrows (default: true)
- `onMilestoneClick` - Callback when milestone is clicked

**Data Structure:**
```typescript
interface Milestone {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  category: string;
  dependencies?: string[]; // IDs of dependent milestones
  owner: string;
  budget?: number;
  description?: string;
}
```

---

### 5. MetricsGridVisx

Heatmap for KPI tracking across time periods.

**Features:**
- Color-coded heatmap cells
- Target vs actual comparison
- Trend indicators (up/down/stable arrows)
- Multiple color schemes (performance, heat, diverging)
- Category grouping
- Interactive tooltips with detailed metrics
- Responsive grid layout

**Usage:**
```tsx
import { MetricsGridVisx } from '@/components/business-plan-deck/charts/advanced';

<MetricsGridVisx
  data={[
    {
      metric: 'Revenue',
      period: 'Q1 2025',
      value: 250000,
      target: 300000,
      trend: 'up',
      unit: 'USD',
      category: 'Financial',
      description: 'Quarterly revenue performance'
    }
  ]}
  width={1200}
  height={700}
  theme="dark"
  colorScheme="performance"
  showTrends={true}
  showTargets={true}
/>
```

**Props:**
- `data` - Array of metric data points (required)
- `width` - Chart width in pixels (default: 1200)
- `height` - Chart height in pixels (default: 700)
- `theme` - 'light' | 'dark' (default: 'dark')
- `colorScheme` - 'performance' | 'heat' | 'diverging' (default: 'performance')
- `showTrends` - Display trend indicators (default: true)
- `showTargets` - Show target achievement indicators (default: true)
- `onCellClick` - Callback when cell is clicked

**Data Structure:**
```typescript
interface MetricDataPoint {
  metric: string;
  period: string;
  value: number;
  target?: number;
  trend?: 'up' | 'down' | 'stable';
  unit?: string;
  category?: string;
  description?: string;
}
```

---

### 6. GrowthTrajectoryVisx

Multi-axis line chart for growth metrics with forecasting.

**Features:**
- Multiple data series with different scales
- Dual Y-axes for different metric types
- Area fills under lines
- Forecast projections with confidence intervals
- Milestone markers on timeline
- Interactive legend with series toggling
- Smooth curve interpolation
- Responsive scaling

**Usage:**
```tsx
import { GrowthTrajectoryVisx } from '@/components/business-plan-deck/charts/advanced';

<GrowthTrajectoryVisx
  series={[
    {
      id: 'revenue',
      name: 'Monthly Revenue',
      axis: 'left',
      unit: 'USD',
      color: '#CCFF00',
      data: [
        { date: new Date('2025-01-01'), value: 80000 },
        { date: new Date('2025-02-01'), value: 85000 }
      ]
    },
    {
      id: 'revenue-forecast',
      name: 'Revenue Forecast',
      axis: 'left',
      unit: 'USD',
      isForecast: true,
      data: [...],
      confidenceInterval: {
        upper: [100000, 120000, 140000],
        lower: [80000, 90000, 100000]
      }
    }
  ]}
  milestones={[
    {
      date: new Date('2025-03-01'),
      label: 'Beta Launch',
      description: 'Product beta release'
    }
  ]}
  width={1200}
  height={600}
  theme="dark"
  showGrid={true}
  showArea={true}
  showLegend={true}
  showConfidenceInterval={true}
  leftAxisLabel="Revenue (USD)"
  rightAxisLabel="Active Users"
  title="Growth Trajectory & Forecast"
/>
```

**Props:**
- `series` - Array of data series (required)
- `milestones` - Array of milestone markers (optional)
- `width` - Chart width in pixels (default: 1200)
- `height` - Chart height in pixels (default: 600)
- `theme` - 'light' | 'dark' (default: 'dark')
- `showGrid` - Display grid lines (default: true)
- `showArea` - Show area fill under lines (default: true)
- `showLegend` - Display legend (default: true)
- `showConfidenceInterval` - Show forecast confidence bands (default: true)
- `leftAxisLabel` - Label for left Y-axis
- `rightAxisLabel` - Label for right Y-axis
- `title` - Chart title

**Data Structures:**
```typescript
interface DataSeries {
  id: string;
  name: string;
  data: DataPoint[];
  color?: string;
  axis: 'left' | 'right';
  unit?: string;
  isForecast?: boolean;
  confidenceInterval?: {
    upper: number[];
    lower: number[];
  };
}

interface DataPoint {
  date: Date;
  value: number;
}

interface Milestone {
  date: Date;
  label: string;
  description?: string;
}
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Touch-optimized

## Dependencies

**Nivo:**
- `@nivo/line@^0.99.0`
- `@nivo/bar@^0.99.0`
- `@nivo/pie@^0.99.0`

**Visx:**
- `@visx/group@^3.0.0`
- `@visx/shape@^3.0.0`
- `@visx/scale@^3.0.0`
- `@visx/axis@^3.0.0`
- `@visx/grid@^3.0.0`
- `@visx/tooltip@^3.0.0`
- `@visx/gradient@^3.0.0`
- `@visx/text@^3.0.0`
- `@visx/curve@^3.0.0`
- `@visx/event@^3.0.0`

**Common:**
- `framer-motion@^11.11.17`
- `react@^18.3.1`
