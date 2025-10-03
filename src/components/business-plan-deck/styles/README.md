# Business Plan Deck - CSS Override System

This directory contains CSS overrides that apply the QDaria design system to business plan components.

## File Structure

### Core Files

1. **index.css** - Master import file and global styles
   - Imports all override modules
   - Defines container widths, typography, utilities
   - Includes accessibility and print styles

2. **business-plan-overrides.css** - Base component overrides
   - Container and section styles
   - Card components with gradient effects
   - Charts and data visualization
   - Tables, lists, badges, timelines
   - Metric displays
   - Animations and utilities

3. **tabs-override.css** - Tab component styling
   - Horizontal and vertical tab layouts
   - Pill-style and underline variants
   - Active states with glow effects
   - Icon and badge support
   - Responsive design

4. **cards-override.css** - Card component variants
   - Base card styling with hover effects
   - Feature cards with icons
   - Metric cards with gradient values
   - Timeline cards
   - Info cards (success, warning, error)
   - Interactive and elevated variants
   - Grid layouts

## Design System Colors

All components use QDaria's brand colors:

- **Primary**: `#04a3ff` (Cyan Blue)
- **Secondary**: `#00ffd3` (Turquoise)
- **Background**: `#000212` (Deep Space Blue)
- **Text**: `#e5e7eb` (Light Gray)

## Usage

### Import in Component Files

```typescript
import './styles/index.css';
```

### Apply Classes

```tsx
<div className="business-plan-section">
  <h2 className="business-plan-heading">Section Title</h2>
  <div className="business-plan-card-base">
    <p className="business-plan-body">Content here</p>
  </div>
</div>
```

### Available Class Patterns

#### Sections
- `business-plan-section` - Main section container with glow border
- `business-plan-container` - Dark background container

#### Typography
- `business-plan-h1` through `business-plan-h6` - Gradient headings
- `business-plan-heading` - Generic gradient heading
- `business-plan-body` - Body text
- `business-plan-text-gradient` - Apply gradient to any text
- `business-plan-text-muted` - Muted text
- `business-plan-text-accent` - Accent color text

#### Cards
- `business-plan-card-base` - Base card with hover effects
- `business-plan-feature-card` - Card with icon
- `business-plan-metric-card` - Large metric display
- `business-plan-info-card` - Info card with variants
- `business-plan-card-elevated` - Card with enhanced shadow

#### Tabs
- `business-plan-tabs` - Tab container
- `business-plan-tab` - Individual tab
- `business-plan-tabs-vertical` - Vertical tab layout
- `business-plan-tabs-pill` - Pill-style tabs
- `business-plan-tabs-underline` - Underline-style tabs

#### Layouts
- `business-plan-grid` - Base grid
- `business-plan-grid-2` - 2-column responsive grid
- `business-plan-grid-3` - 3-column responsive grid
- `business-plan-grid-4` - 4-column responsive grid

#### Components
- `business-plan-button` - Primary button style
- `business-plan-table` - Styled table
- `business-plan-list` - Styled list container
- `business-plan-badge` - Badge/tag component
- `business-plan-timeline` - Timeline layout
- `business-plan-metric` - Metric display

#### Utilities
- `business-plan-divider` - Horizontal divider
- `business-plan-glow` - Pulsing glow animation
- `business-plan-skeleton` - Loading skeleton
- `business-plan-spinner` - Loading spinner
- `business-plan-scrollbar` - Custom scrollbar

## Responsive Design

All components are mobile-first and include responsive breakpoints:
- Mobile: Default styles
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)

## Accessibility

- Focus visible states with ring indicators
- High contrast mode support
- Reduced motion support
- Screen reader utilities
- Proper ARIA support in component structure

## Animations

Subtle animations using QDaria's glow effects:
- Hover state transitions (300ms)
- Glow pulse animations (2-3s)
- Card elevation changes
- Tab active state indicators

## Performance

- Uses Tailwind's `@apply` for efficiency
- CSS custom properties for color consistency
- Hardware-accelerated transforms
- Optimized animations with `will-change`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS custom properties required
- Backdrop filters for advanced effects

## Maintenance

When updating colors or effects:
1. Update design tokens first
2. Test across all component variants
3. Verify dark mode consistency
4. Check accessibility contrast ratios

## Integration with Business Plan Components

These styles are designed to work with:
- Executive Summary slides
- Financial projection charts
- Market analysis sections
- Team and milestone displays
- Revenue model visualizations
- Investment ask presentations

---

**Version**: 1.0.0
**Last Updated**: 2025-10-03
**QDaria Design System**: v2.0
