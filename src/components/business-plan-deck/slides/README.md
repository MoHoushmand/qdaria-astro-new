# Business Plan Deck - Slide Components

Production-ready React slide components for the QDaria Business Plan presentation deck.

## Overview

Six comprehensive slide components built with:
- **React + TypeScript** for type safety
- **Framer Motion** for smooth animations
- **shadcn/ui components** for consistency
- **Recharts** for sophisticated data visualization
- **Tailwind CSS** with custom gradient styling

## Components

### 1. ExecutiveSummarySlide.tsx (20KB)
**Purpose**: Company overview, mission, vision, and value proposition

**Features**:
- Multi-tab navigation (Overview, Mission & Vision, Value Proposition, Market Position)
- Business unit cards with status badges
- Strategic partnership displays
- Core values presentation
- Market opportunity metrics

**Key Sections**:
- Company overview with 3 core business units
- Mission and vision statements
- Three value propositions with detailed descriptions
- Market position with key metrics ($1T value by 2035)

### 2. MarketAnalysisSlide.tsx (21KB)
**Purpose**: Market size, growth projections, and competitive landscape

**Features**:
- Animated line charts for market growth
- Area charts for economic impact
- Bar charts for competitor funding
- Interactive target market cards
- Growth driver breakdowns

**Key Charts**:
- Market size projection (2024-2030)
- Economic impact visualization
- Competitor funding comparison
- TAM breakdown by segment

### 3. ProductsServicesSlide.tsx (22KB)
**Purpose**: Product portfolio with interactive cards and details

**Features**:
- Portfolio overview with 5 products
- Interactive product selection
- Detailed product information views
- Integration strategy visualization
- Future subsidiary structure

**Products Covered**:
1. Quantum Experimental Kits (rental program)
2. Zipminator (quantum compression)
3. Qm9 Platform (middleware)
4. QDiana (enterprise AI)
5. QMikeAI (developer AI)

### 4. StrategicRoadmapSlide.tsx (30KB)
**Purpose**: Timeline with milestones and IPO strategy

**Features**:
- Multi-phase timeline (2025-2030)
- Quarterly milestone tracking
- Funding round progression
- IPO timeline visualization
- Holdings structure benefits

**Key Phases**:
- 2025: Foundation (Seed $1M)
- 2026: Product Development (Series A $5-10M)
- 2027: Scaling Up (Series B $20M)
- 2028: First IPO (Zipminator)
- 2029: Multiple IPOs (Qm9, QDiana)
- 2030: Market Leadership (QMikeAI, Holdings)

### 5. RiskAnalysisSlide.tsx (31KB)
**Purpose**: Risk assessment with comprehensive mitigation strategies

**Features**:
- Risk radar chart visualization
- Risk priority matrix (impact vs. probability)
- Category filtering (Technical, Market, Operational, Regulatory)
- Detailed mitigation strategies
- Risk management framework

**Risk Categories**:
- **Technical**: Scaling challenges, error rates
- **Market**: Competition, adoption rate
- **Operational**: Talent acquisition, supply chain
- **Regulatory**: Regulatory changes, export controls

### 6. FinancialProjectionsSlide.tsx (34KB)
**Purpose**: Revenue, profitability, and funding projections

**Features**:
- Three scenario modeling (conservative, base, optimistic)
- Revenue area charts with segment breakdown
- EBITDA and margin projections
- Funding rounds timeline
- Revenue mix pie chart
- Use of funds allocation

**Key Metrics**:
- 2030 Revenue: $350M (base case)
- 2030 EBITDA: $105M (30% margin)
- Total funding needed: $29M (pre-IPO)
- IPO target: 2028 (Zipminator)

## Usage

### Basic Import

```tsx
import {
  ExecutiveSummarySlide,
  MarketAnalysisSlide,
  ProductsServicesSlide,
  StrategicRoadmapSlide,
  RiskAnalysisSlide,
  FinancialProjectionsSlide
} from '@/components/business-plan-deck/slides';

// Use in your component
<ExecutiveSummarySlide />
```

### Integration with Astro

```astro
---
import { ExecutiveSummarySlide } from '@/components/business-plan-deck/slides';
---

<div>
  <ExecutiveSummarySlide client:load />
</div>
```

### Integration with Slideshow

```tsx
const slides = [
  <ExecutiveSummarySlide />,
  <MarketAnalysisSlide />,
  <ProductsServicesSlide />,
  <StrategicRoadmapSlide />,
  <RiskAnalysisSlide />,
  <FinancialProjectionsSlide />
];
```

## Styling

All slides use the BusinessPlanLayout gradient theme:
- Primary gradient: `from-[#04a3ff] via-[#00ffd3] to-[#65ff00]`
- Background: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
- Prose styling for text content

## Dependencies

Required packages (should already be installed):
```json
{
  "react": "^18.x",
  "framer-motion": "^10.x",
  "recharts": "^2.x",
  "@radix-ui/react-tabs": "^1.x",
  "lucide-react": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

## Chart Components Used

All slides leverage the sophisticated chart components from `@/components/pitch-deck/charts/`:
- `AnimatedLineChart` - Line graphs with animation
- `AnimatedBarChart` - Bar charts with value-based coloring
- `AnimatedAreaChart` - Stacked area charts
- `AnimatedPieChart` - Donut/pie charts
- `AnimatedRadarChart` - Radar/spider charts

## Customization

### Modifying Data

Each slide contains data arrays that can be easily modified:

```tsx
// Example: Updating revenue projections
const revenueData = [
  { year: '2025', revenue: 1, ... },
  // Modify values here
];
```

### Styling

Slides use Tailwind CSS classes and can be customized via:
- Component-level className props
- Tailwind config modifications
- CSS-in-JS with Framer Motion

### Animation

Framer Motion animations can be adjusted:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }} // Adjust timing here
>
```

## Performance

All slides are optimized for performance:
- Lazy loading with React.lazy() recommended
- AnimatePresence for smooth transitions
- Optimized chart rendering
- Minimal re-renders with proper state management

## Accessibility

Slides include:
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support (via shadcn/ui)
- Responsive design for all screen sizes

## Mobile Responsiveness

All slides are fully responsive with:
- Mobile-first grid layouts
- Adaptive font sizes
- Touch-friendly interactive elements
- Optimized chart rendering for small screens

## Browser Support

Tested and working in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Sizes

- ExecutiveSummarySlide.tsx: 20KB
- MarketAnalysisSlide.tsx: 21KB
- ProductsServicesSlide.tsx: 22KB
- StrategicRoadmapSlide.tsx: 30KB
- RiskAnalysisSlide.tsx: 31KB
- FinancialProjectionsSlide.tsx: 34KB
- **Total**: 158KB of production-ready code

## Notes

- All components are client-side rendered (use `client:load` in Astro)
- Data is embedded for now but can be extracted to separate data files
- Animations trigger on mount and scroll
- Interactive elements respond to clicks and hovers
- All TypeScript interfaces are properly typed

## Future Enhancements

Potential improvements:
- Extract data to JSON/API endpoints
- Add slide transition animations
- Implement print-friendly versions
- Add export to PDF functionality
- Internationalization (i18n) support

## Support

For issues or questions:
1. Check the component source code
2. Review the shadcn/ui documentation
3. Consult Recharts documentation for chart customization
4. Review Framer Motion docs for animation adjustments
