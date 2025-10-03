# Nivo Charts Quick Start Guide

## 🚀 Immediate Usage

### 1. Financial Projections Chart
```astro
---
import { FinancialProjectionsNivo } from '@/components/business-plan-deck/charts/advanced';
---

<FinancialProjectionsNivo client:load />
```

### 2. Market Segmentation Chart
```astro
---
import { MarketSegmentationNivo } from '@/components/business-plan-deck/charts/advanced';
---

<MarketSegmentationNivo client:load variant="donut" />
```

### 3. Growth Metrics Chart
```astro
---
import { GrowthMetricsNivo } from '@/components/business-plan-deck/charts/advanced';
---

<GrowthMetricsNivo client:load groupMode="grouped" />
```

## 📦 Import All at Once
```typescript
import {
  FinancialProjectionsNivo,
  MarketSegmentationNivo,
  GrowthMetricsNivo
} from '@/components/business-plan-deck/charts/advanced';
```

## 🎨 Quick Customization

### Change Height
```tsx
<FinancialProjectionsNivo client:load height={600} />
```

### Light Theme
```tsx
<MarketSegmentationNivo client:load theme="light" />
```

### Disable Animations
```tsx
<GrowthMetricsNivo client:load animate={false} />
```

### Custom Colors
```tsx
const customData = [
  {
    id: 'Revenue',
    color: '#FF6B6B',  // Custom red
    data: [...]
  }
];

<FinancialProjectionsNivo client:load data={customData} />
```

## 📊 Default Data Included

All components come with production-ready default data:
- **Financial Projections**: 5-year forecast ($2.5M → $125M)
- **Market Segmentation**: 5 industry sectors
- **Growth Metrics**: 5 KPIs with benchmarks

## ✅ All Features Work Out of the Box

- ✅ Interactive tooltips
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Custom themes
- ✅ TypeScript types
- ✅ Accessibility

## 🔧 No Configuration Required

Just import and use! Default settings are production-ready.

## 📁 Files Created

```
src/components/business-plan-deck/charts/advanced/
├── FinancialProjectionsNivo.tsx     ← Line chart
├── MarketSegmentationNivo.tsx       ← Pie/Donut chart
├── GrowthMetricsNivo.tsx            ← Bar chart
├── index.ts                         ← Exports
├── README.md                        ← Full docs
├── NIVO_CHARTS_SUMMARY.md          ← Implementation summary
├── QUICK_START.md                   ← This file
└── NivoChartsExample.astro         ← Example page
```

## 🎯 Next Steps

1. Import the component you need
2. Add `client:load` directive
3. Customize props as needed
4. Done! 🎉

For detailed documentation, see README.md
For implementation details, see NIVO_CHARTS_SUMMARY.md
