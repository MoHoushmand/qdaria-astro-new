# Business Plan Deck Component

Enterprise-grade business plan presentation component for QDaria, built with React, TypeScript, and accessibility best practices.

## Features

### Core Functionality
- ✅ **Lazy-loaded slide components** for optimal performance and bundle splitting
- ✅ **Keyboard navigation** (Arrow keys, PageUp/Down, Home/End)
- ✅ **Mobile touch gestures** (swipe left/right to navigate)
- ✅ **Slide progress indicator** with visual feedback
- ✅ **PDF export functionality** for printing and sharing
- ✅ **Responsive design** - works on mobile, tablet, and desktop
- ✅ **Section-based organization** with collapsible sidebar navigation

### Accessibility (WCAG 2.1 AA Compliant)
- ✅ **ARIA landmarks and labels** for screen readers
- ✅ **Keyboard navigation** with focus management
- ✅ **Screen reader announcements** for slide changes
- ✅ **High contrast mode support**
- ✅ **Reduced motion support** for users with vestibular disorders
- ✅ **Focus visible indicators** for keyboard users

### Business Features
- ✅ **Scenario planning** - Conservative, Base, and Optimistic projections
- ✅ **Key metrics dashboard** in sidebar
- ✅ **Section-based navigation** with visual indicators
- ✅ **Print-optimized styles** for professional documentation

## Component Structure

```
business-plan-deck/
├── BusinessPlanDeck.tsx          # Main component with navigation
├── Sidebar.tsx                   # Navigation sidebar with metrics
├── index.tsx                     # Export file
├── lib/
│   └── utils.ts                  # Utility functions
├── styles/
│   └── business-plan-deck.css    # Custom styles & print CSS
└── slides/                       # Individual slide components
    ├── ExecutiveSummarySlide.tsx
    ├── CompanyOverviewSlide.tsx
    ├── MarketAnalysisSlide.tsx
    ├── CustomerSegmentsSlide.tsx
    ├── CompetitiveAnalysisSlide.tsx
    ├── ProductServicesSlide.tsx
    ├── MarketingStrategySlide.tsx
    ├── SalesStrategySlide.tsx
    ├── OperationsPlanSlide.tsx
    ├── ManagementTeamSlide.tsx
    ├── FinancialProjectionsSlide.tsx
    ├── FundingRequirementsSlide.tsx
    ├── RiskAnalysisSlide.tsx
    ├── MilestonesSlide.tsx
    └── AppendixSlide.tsx
```

## Usage

### Basic Usage in Astro

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
---

<BusinessPlanDeck client:load />
```

### With Custom Configuration

```tsx
import { BusinessPlanDeck } from '@/components/business-plan-deck';

function App() {
  return (
    <BusinessPlanDeck
      initialSlide={0}
      defaultScenario="base"
    />
  );
}
```

## Slide Component Template

Each slide component should follow this structure:

```tsx
/** @jsxImportSource react */
import React from 'react';

interface SlideProps {
  scenario: 'conservative' | 'base' | 'optimistic';
}

const ExampleSlide: React.FC<SlideProps> = ({ scenario }) => {
  return (
    <div className="business-plan-slide">
      <h1 className="bp-heading-1">Slide Title</h1>

      <div className="bp-grid-2">
        <div className="bp-card">
          <h2 className="bp-heading-3">Section 1</h2>
          <p className="bp-body">Content here...</p>
        </div>

        <div className="bp-card">
          <h2 className="bp-heading-3">Section 2</h2>
          <p className="bp-body">Content here...</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleSlide;
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `PageDown` | Next slide |
| `←` or `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## Mobile Gestures

- **Swipe left**: Next slide
- **Swipe right**: Previous slide

## Styling

### Using CSS Classes

The component provides utility classes for consistent styling:

```tsx
<div className="business-plan-slide">
  <h1 className="bp-heading-1">Title</h1>
  <h2 className="bp-heading-2">Subtitle</h2>
  <h3 className="bp-heading-3">Section</h3>
  <p className="bp-body">Body text</p>
  <p className="bp-caption">Caption text</p>

  <div className="bp-card">Card content</div>
  <div className="bp-card-highlight">Highlighted card</div>

  <div className="bp-grid-2">Two-column grid</div>
  <div className="bp-grid-3">Three-column grid</div>
  <div className="bp-grid-4">Four-column grid</div>

  <div className="bp-stat-box">
    <div className="bp-stat-value">€12M</div>
    <div className="bp-stat-label">Funding Ask</div>
  </div>
</div>
```

### Using Utility Functions

```tsx
import { formatCurrency, formatNumber, formatPercent } from './lib/utils';

// Format currency
formatCurrency(12000000); // "€12,000,000"

// Format large numbers
formatNumber(27900000000); // "27.9B"

// Format percentages
formatPercent(15.5); // "15.5%"

// Apply scenario adjustments
import { applyScenario } from './lib/utils';
const revenue = applyScenario(1000000, 'optimistic'); // 1,400,000
```

## Accessibility Guidelines

### For Slide Developers

1. **Use semantic HTML**: `<h1>`, `<h2>`, `<section>`, `<article>`, etc.
2. **Provide alt text** for all images
3. **Use ARIA labels** for complex interactive elements
4. **Ensure color contrast** meets WCAG AA standards (4.5:1 for text)
5. **Test with keyboard only** - ensure all functionality is accessible
6. **Add skip links** for long content sections

### Example with Accessibility

```tsx
<section aria-labelledby="market-heading">
  <h2 id="market-heading">Market Analysis</h2>

  <img
    src="/chart.png"
    alt="Market growth chart showing 45% CAGR from 2024 to 2028"
  />

  <table className="bp-table">
    <caption className="sr-only">
      Market size projections by year
    </caption>
    <thead>
      <tr>
        <th scope="col">Year</th>
        <th scope="col">Market Size</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2024</td>
        <td>€10B</td>
      </tr>
    </tbody>
  </table>
</section>
```

## Performance Optimization

### Lazy Loading

All slide components are lazy-loaded automatically:

```tsx
const ExecutiveSummarySlide = lazy(() => import('./slides/ExecutiveSummarySlide'));
```

### Image Optimization

Use optimized image formats:

```tsx
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.avif" type="image/avif" />
  <img src="/image.jpg" alt="Description" loading="lazy" />
</picture>
```

## Print Functionality

The component includes comprehensive print styles for professional PDF generation:

- Automatic page breaks between slides
- Print-optimized typography
- Hidden navigation elements
- High-quality color printing
- Professional footer with company info

### Customizing Print Output

Modify `/styles/business-plan-deck.css`:

```css
@media print {
  /* Custom print styles here */
  .business-plan-slide {
    page-break-after: always;
  }
}
```

## TypeScript Types

```typescript
interface SlideConfig {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  section?: string;
}

interface SlideProps {
  scenario: 'conservative' | 'base' | 'optimistic';
}

interface SidebarProps {
  slides: SlideConfig[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  scenario?: 'conservative' | 'base' | 'optimistic';
  setScenario?: (scenario: 'conservative' | 'base' | 'optimistic') => void;
  isOpen: boolean;
  onToggle: () => void;
}
```

## Dependencies

Required packages:
- `react` ^18.0.0
- `lucide-react` (for icons)
- `clsx` (for conditional classes)
- `tailwind-merge` (for Tailwind CSS class merging)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

### Manual Testing Checklist

- [ ] Keyboard navigation works (arrows, PageUp/Down, Home/End)
- [ ] Mobile touch gestures work (swipe left/right)
- [ ] Sidebar opens/closes correctly
- [ ] PDF export generates correctly
- [ ] All slides load without errors
- [ ] Progress indicator updates correctly
- [ ] Screen reader announces slide changes
- [ ] Focus indicators are visible
- [ ] Print styles look professional

### Automated Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { BusinessPlanDeck } from './index';

test('navigates to next slide on arrow key', () => {
  render(<BusinessPlanDeck />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText(/Section 2/i)).toBeInTheDocument();
});
```

## Contributing

When creating new slides:

1. Follow the slide component template
2. Add proper TypeScript types
3. Include accessibility features
4. Test keyboard navigation
5. Verify mobile responsiveness
6. Add print styles if needed
7. Update this README if adding new features

## License

Proprietary - QDaria AS © 2024

## Support

For questions or issues, contact the development team.
