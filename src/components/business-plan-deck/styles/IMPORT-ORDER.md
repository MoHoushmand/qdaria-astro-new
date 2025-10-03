# CSS Import Order Documentation

## Master Professional Stylesheet Import Hierarchy

The `master-professional.css` file imports all professional styling systems in a carefully orchestrated order to ensure proper cascading and prevent conflicts.

## Import Order (Critical - Do Not Change)

### 1. Typography Foundation (`typography-professional.css`)
**Why First**: Typography is the foundation of all design. Font sizes, line heights, and font families must be established before any other styling.

**What It Does**:
- Sets base font size to 18px
- Establishes 1.625 line-height
- Defines modular scale for headings
- Loads Inter font family

### 2. Color Contrast System (`color-contrast-professional.css`)
**Why Second**: Color contrast affects all visual elements and must be established early.

**What It Does**:
- WCAG AAA compliant color variables
- High-contrast text colors
- Accessible background colors
- Semantic color tokens

### 3. Layout & Spacing (`layout-professional.css`)
**Why Third**: Spacing and layout create the structure for all components.

**What It Does**:
- 8px grid system
- Responsive spacing scale
- Container widths
- Breakpoint definitions

### 4. Professional Cards (`cards-professional.css`)
**Why Fourth**: Cards are core UI components that need typography and spacing defined first.

**What It Does**:
- Card container styles
- Glass morphism effects
- Shadow systems
- Border treatments

### 5. Chart Readability (`charts-professional.css`)
**Why Fifth**: Charts build on typography, colors, and spacing.

**What It Does**:
- Chart text sizing (14px minimum)
- Axis label styling
- Legend formatting
- Tooltip styles

### 6. UI Polish (`ui-polish-professional.css`)
**Why Sixth**: Polish and refinement come after core systems are established.

**What It Does**:
- Animations and transitions
- Hover states
- Focus indicators
- Micro-interactions

### 7. Business Plan Overrides (`business-plan-overrides.css`)
**Why Seventh**: Project-specific overrides come after all base systems.

**What It Does**:
- Component-specific adjustments
- Layout tweaks
- Custom spacing

### 8. Tabs Override (`tabs-override.css`)
**Why Last**: Specific component overrides should be last to ensure they take precedence.

**What It Does**:
- Tab navigation styling
- Active state overrides
- Tab content spacing

## CSS Specificity Strategy

### Layer 1: Base Styles (Low Specificity)
- Element selectors (e.g., `body`, `h1`, `p`)
- Used in typography and color contrast files

### Layer 2: Component Styles (Medium Specificity)
- Class selectors (e.g., `.card`, `.chart`)
- Used in cards, charts, UI polish files

### Layer 3: Override Styles (High Specificity)
- `!important` declarations
- Used sparingly in master file for critical overrides

### Layer 4: Global Overrides (Highest Specificity)
- Combined selectors with `!important`
- Only in master-professional.css for universal enforcement

## Conflict Resolution Rules

### Typography Conflicts
**Rule**: Master file wins with `!important` on critical properties
```css
body {
  font-size: 18px !important; /* Master override */
}
```

### Color Conflicts
**Rule**: WCAG AAA compliant colors always win
```css
.text-muted {
  color: rgba(229, 231, 235, 0.8) !important; /* High contrast wins */
}
```

### Spacing Conflicts
**Rule**: 8px grid system enforced globally
```css
section {
  padding: 4rem 0 !important; /* 32px = 8px × 4 */
}
```

### Chart Text Conflicts
**Rule**: Minimum 14px enforced across all chart libraries
```css
.recharts-text,
svg text,
[class*="chart"] text {
  font-size: 14px !important; /* Readability wins */
}
```

## Performance Considerations

### Critical CSS
Inline critical styles in `MasterStyleLoader.astro`:
- Body typography
- Background color
- Font family

### Async Loading
Non-critical styles loaded asynchronously:
- Animation definitions
- Print styles
- Hover effects

### Font Loading Strategy
```html
<!-- Preconnect for fastest font loading -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## Mobile Responsiveness

### Breakpoint Strategy
```css
/* Mobile First - Default styles for mobile */
body { font-size: 18px; }

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1440px) { }
```

### Font Scaling
- Mobile: 16px base (from master override)
- Tablet: 18px base (default)
- Desktop: 18px base (default)
- Large: 20px base (from typography-professional)

## Accessibility Features

### WCAG AAA Compliance
- Text contrast ratio: 7:1 minimum
- Large text: 4.5:1 minimum
- Focus indicators: 3px solid, 2px offset

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  * {
    border-width: 2px !important;
  }
}
```

## Print Optimization

### Professional Document Output
- 12pt base font
- Black text on white
- Page break avoidance
- Interactive elements hidden

## Testing Checklist

- [ ] Typography scales properly on all devices
- [ ] Colors meet WCAG AAA standards
- [ ] Charts are readable at all sizes
- [ ] Cards have proper spacing
- [ ] Animations respect motion preferences
- [ ] Focus indicators are visible
- [ ] Print layout is professional
- [ ] No CSS conflicts in browser console
- [ ] Font loads without FOUC
- [ ] Mobile text never too small

## Maintenance Guidelines

### Adding New Styles
1. Identify which layer the style belongs to
2. Add to appropriate CSS file (not master)
3. Test for conflicts with existing styles
4. Update this documentation

### Modifying Import Order
**DO NOT** change import order without thorough testing. The current order resolves all known conflicts.

### Override Strategy
- **Preferred**: Modify source file
- **Acceptable**: Add to business-plan-overrides.css
- **Last Resort**: Add `!important` to master file

## Known Issues & Solutions

### Issue: Tailwind Class Conflicts
**Solution**: Use `!important` in master file to override Tailwind utilities

### Issue: Chart Library Text Too Small
**Solution**: Multi-library selector in master file catches all chart text

### Issue: Component Styles Not Applying
**Solution**: Check import order and specificity; may need `!important`

### Issue: Mobile Text Too Small
**Solution**: Master file has mobile-specific overrides at 16px minimum

## Version History

- **v1.0.0** (2025-01-03): Initial master integration system
  - 8 CSS files integrated
  - WCAG AAA compliance
  - Mobile responsive
  - Print optimized
