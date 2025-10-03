# Professional Card Component Library

World-class, readable card components for business plan metrics and content.

## Design Philosophy

1. **Generous Padding**: 24-32px for breathing room
2. **Clear Visual Hierarchy**: Large numbers, distinct labels
3. **Strong Borders & Shadows**: Professional depth and separation
4. **High Contrast**: Maximum readability on dark backgrounds
5. **Responsive Design**: Mobile-first, scales beautifully

## Components

### MetricCard
Large, impactful numbers with optional trend indicators.

```tsx
<MetricCard
  value="$8.2M"
  label="Revenue Target"
  description="Year 1 projected revenue"
  trend="up"
  trendValue="127%"
/>
```

**Use for**: Financial metrics, KPIs, growth numbers

### FeatureCard
Content cards with icons and detailed descriptions.

```tsx
<FeatureCard
  icon="🚀"
  subtitle="Innovation"
  title="Quantum Processing"
  text="Leverage cutting-edge quantum algorithms..."
/>
```

**Use for**: Product features, capabilities, benefits

### StatCard
Compact metrics for dense information display.

```tsx
<StatCard
  value="500+"
  label="Enterprise Clients"
/>
```

**Use for**: Quick stats, supporting metrics, traction numbers

### InfoCard
Color-coded information blocks for categorized content.

```tsx
<InfoCard
  type="success"
  title="Competitive Moat"
  text="Our patented algorithms create a 3-5 year lead..."
/>
```

**Types**: `success` (green), `warning` (orange), `info` (blue)

**Use for**: Opportunities, risks, strategic points

## Grid Layouts

### 2-Column Grid
```tsx
<div className="card-grid-2">
  {/* Best for feature cards with detailed content */}
</div>
```

### 3-Column Grid
```tsx
<div className="card-grid-3">
  {/* Perfect for metric cards */}
</div>
```

### 4-Column Grid
```tsx
<div className="card-grid-4">
  {/* Ideal for stat cards */}
</div>
```

## CSS Classes Reference

### Cards
- `.card-professional` - Base card style
- `.metric-card-professional` - Large metric display
- `.feature-card-professional` - Feature with icon
- `.stat-card-professional` - Compact stat
- `.info-card-success` - Success info card
- `.info-card-warning` - Warning info card
- `.info-card-info` - Info card

### Layout
- `.card-grid-2` - 2-column responsive grid
- `.card-grid-3` - 3-column responsive grid
- `.card-grid-4` - 4-column responsive grid
- `.cards-container` - Main container
- `.cards-section` - Section wrapper
- `.cards-section-title` - Section heading

## Best Practices

### Typography
- **Numbers**: 4rem (64px) for metrics, 2.5rem (40px) for stats
- **Labels**: 1.125rem (18px), uppercase, tracked
- **Body**: 1.125rem (18px) for readability
- **Titles**: 1.5rem (24px) minimum

### Colors
- **Primary**: #0ea5e9 (Sky Blue) to #06d6ff (Cyan) gradients
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Text**: #e5e7eb (Light Gray) at 85-90% opacity

### Spacing
- **Padding**: Minimum 1.5rem (24px), ideal 2rem (32px)
- **Gap**: 1.5-2rem between cards
- **Margins**: 3rem between sections

### Responsive Breakpoints
- **Desktop**: Full multi-column grids (1024px+)
- **Tablet**: 2 columns or stacked (768px-1023px)
- **Mobile**: Single column (< 768px)

## Usage Example

```tsx
import React from 'react';
import { MetricCard, FeatureCard, StatCard, InfoCard } from './cards';
import './styles/cards-professional.css';

export const BusinessMetrics = () => (
  <div className="cards-container">
    <section className="cards-section">
      <h2 className="cards-section-title">Key Metrics</h2>
      <div className="card-grid-3">
        <MetricCard value="$8.2M" label="Revenue" trend="up" trendValue="127%" />
        <MetricCard value="15K+" label="Users" trend="up" trendValue="340%" />
        <MetricCard value="42%" label="Margin" trend="up" trendValue="18%" />
      </div>
    </section>
  </div>
);
```

## Integration

1. Import CSS: `import './styles/cards-professional.css'`
2. Import components: `import { MetricCard } from './cards'`
3. Use grid layouts for organization
4. Maintain consistent spacing and typography

## Performance

- **CSS-only styling**: No runtime JavaScript overhead
- **Hardware-accelerated**: GPU-powered transforms and shadows
- **Optimized transitions**: 60fps smooth animations
- **Lazy loading ready**: Works with React.lazy and Suspense

## Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **Color contrast**: WCAG AAA compliant text
- **Focus states**: Clear keyboard navigation
- **Screen readers**: Meaningful labels and descriptions
