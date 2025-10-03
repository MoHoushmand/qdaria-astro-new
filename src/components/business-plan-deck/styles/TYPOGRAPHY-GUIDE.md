# Professional Typography System - Implementation Guide

## Overview

This typography system implements **industry-standard best practices** for maximum readability and professional appearance. It's based on a **modular scale of 1.250 (Major Third)** and follows **WCAG 2.1 AAA** accessibility guidelines.

## Key Improvements

### Before vs. After

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Body Text Size | 16px (1rem) | **18px (1.125rem)** | +12.5% larger |
| Line Height | 1.6 | **1.625** | More generous spacing |
| Heading Hierarchy | Inconsistent | **Clear 1.250 scale** | Better structure |
| Reading Width | Unlimited | **65ch (optimal)** | Easier reading |
| Contrast Ratio | Variable | **WCAG AAA** | Better accessibility |
| Mobile Body Text | 14px | **16px minimum** | Never below readable |

## Typography Scale

### Modular Scale (Base: 16px, Ratio: 1.250)

```css
--bp-text-xs: 12px      /* Footnotes, captions */
--bp-text-sm: 14px      /* Secondary text */
--bp-text-base: 16px    /* Minimum for body */
--bp-text-md: 18px      /* RECOMMENDED body text */
--bp-text-lg: 20px      /* Lead paragraphs */
--bp-text-xl: 25px      /* Small headings */
--bp-text-2xl: 31px     /* H4 */
--bp-text-3xl: 39px     /* H3 */
--bp-text-4xl: 49px     /* H2 */
--bp-text-5xl: 61px     /* H1 */
--bp-text-6xl: 76px     /* Hero/Display */
```

### Line Heights

```css
--bp-leading-tight: 1.2        /* Headings */
--bp-leading-snug: 1.375       /* Subheadings */
--bp-leading-normal: 1.5       /* Standard body */
--bp-leading-relaxed: 1.625    /* Long-form content (RECOMMENDED) */
--bp-leading-loose: 1.75       /* Maximum spacing */
```

## Usage Examples

### Headings

```tsx
// H1 - Main page titles
<h1 className="business-plan-h1">Executive Summary</h1>

// H2 - Major sections
<h2 className="business-plan-h2">Market Analysis</h2>

// H3 - Subsections
<h3 className="business-plan-h3">Target Markets</h3>

// H4 - Minor headings
<h4 className="business-plan-h4">Key Metrics</h4>
```

### Body Text

```tsx
// Standard body text (18px - recommended)
<p className="business-plan-body">
  QDaria is revolutionizing enterprise computing by democratizing
  access to quantum+AI technologies.
</p>

// Lead paragraph (20px - extra emphasis)
<p className="business-plan-lead">
  Making quantum computing accessible to every enterprise.
</p>

// Smaller body text (16px - use sparingly)
<p className="business-plan-body-sm">
  Additional context or supporting information.
</p>
```

### Metrics and Numbers

```tsx
// Large metrics (76px)
<div className="business-plan-metric">$125B</div>
<div className="business-plan-metric-label">Total Market Size</div>

// Extra large metrics (95px)
<div className="business-plan-metric-lg">92%</div>
```

### Lists

```tsx
<ul className="business-plan-list">
  <li>Quantum hardware rental program</li>
  <li>Quantum-enhanced software platform</li>
  <li>AI-powered developer tools</li>
</ul>
```

### Tables

```tsx
<table className="business-plan-table">
  <thead>
    <tr>
      <th>Metric</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Revenue Growth</td>
      <td>340% YoY</td>
    </tr>
  </tbody>
</table>
```

### Charts

```tsx
// Chart title
<h3 className="bp-chart-title">Revenue Projections 2025-2029</h3>

// Chart labels (automatically styled)
<ResponsiveContainer>
  <LineChart data={data}>
    {/* Labels will be 14px minimum, semibold, high contrast */}
  </LineChart>
</ResponsiveContainer>
```

## Short Class Names (Aliases)

For convenience, all classes have short aliases with `bp-` prefix:

```tsx
// Both work identically
<h1 className="business-plan-h1">Title</h1>
<h1 className="bp-h1">Title</h1>

<p className="business-plan-body">Text</p>
<p className="bp-body">Text</p>
```

## Responsive Behavior

### Desktop (1280px+)
- Full size scale
- Body text: **18px**
- H1: **61px**
- Optimal reading experience

### Tablets (768px - 1024px)
- Scaled appropriately
- Body text: **16px**
- H1: **39px**
- Maintains readability

### Mobile (< 768px)
- **CRITICAL**: Body text never below **16px**
- H1: **31px**
- Line heights maintained for comfort
- Optimized for small screens

## Accessibility Features

### WCAG 2.1 AAA Compliance

1. **Contrast Ratios**
   - Body text: 90% opacity on dark bg = AAA
   - Headings: High contrast gradients
   - All text meets 7:1 ratio minimum

2. **Font Size**
   - Minimum 16px on mobile
   - 18px recommended for desktop
   - Never requires zooming

3. **Line Height**
   - Minimum 1.5 for body text
   - Prevents text crowding
   - Improves readability for all users

4. **Reading Width**
   - Maximum 65 characters per line
   - Reduces eye strain
   - Proven optimal for comprehension

### Special Accessibility Classes

```tsx
// High contrast mode - automatically adjusts
<p className="business-plan-body">
  Text automatically enhances in high contrast mode
</p>

// Reduced motion - disables gradient animations
<h1 className="business-plan-h1">
  Gradient becomes solid color when user prefers reduced motion
</h1>
```

## Migration Guide

### Update Existing Components

#### Before:
```tsx
<h2 className="text-2xl font-bold">Title</h2>
<p className="text-sm">Body text</p>
```

#### After:
```tsx
<h2 className="business-plan-h2">Title</h2>
<p className="business-plan-body">Body text</p>
```

### Chart Components

#### Before:
```tsx
<h3 style={{ fontSize: '18px' }}>Chart Title</h3>
```

#### After:
```tsx
<h3 className="bp-chart-title">Chart Title</h3>
```

### Search and Replace Commands

```bash
# Find components with inline font sizes
grep -r "fontSize" src/components/business-plan-deck/

# Find small text sizes
grep -r "text-sm\|text-xs" src/components/business-plan-deck/

# Find headings without classes
grep -r "<h[1-6][^>]*>[^<]" src/components/business-plan-deck/
```

## Best Practices

### DO ✅

1. **Use semantic classes**
   ```tsx
   <p className="business-plan-body">Text</p>
   ```

2. **Respect reading widths**
   ```tsx
   <div className="bp-prose">
     <p>Long form content automatically constrained to 65ch</p>
   </div>
   ```

3. **Use appropriate sizes**
   ```tsx
   <p className="business-plan-lead">Important intro paragraph</p>
   <p className="business-plan-body">Regular paragraph</p>
   <p className="business-plan-caption">Footnote or caption</p>
   ```

4. **Maintain hierarchy**
   - H1 → H2 → H3 → H4 (don't skip levels)
   - One H1 per page
   - Logical nesting

### DON'T ❌

1. **Don't use inline styles for typography**
   ```tsx
   // ❌ BAD
   <p style={{ fontSize: '14px' }}>Text</p>

   // ✅ GOOD
   <p className="business-plan-body-sm">Text</p>
   ```

2. **Don't use arbitrary text sizes**
   ```tsx
   // ❌ BAD
   <p className="text-[15px]">Text</p>

   // ✅ GOOD
   <p className="bp-body-sm">Text</p>
   ```

3. **Don't ignore mobile breakpoints**
   ```tsx
   // ❌ BAD
   <p style={{ fontSize: '12px' }}>Text</p>

   // ✅ GOOD - automatically responsive
   <p className="bp-caption">Text</p>
   ```

4. **Don't exceed reading width**
   ```tsx
   // ❌ BAD
   <p style={{ width: '100%' }}>Very long line...</p>

   // ✅ GOOD - automatically constrained
   <p className="bp-body">Optimal width...</p>
   ```

## Performance Optimizations

### Font Loading

The `FontLoader.astro` component implements:

1. **Preconnect** - DNS prefetch for Google Fonts
2. **Optimal weights** - Only loads 300-900 for Inter
3. **Font display swap** - Shows fallback immediately
4. **Font smoothing** - Optimized rendering

### Variable Fonts

Consider upgrading to Inter Variable for:
- Smaller file size (single file vs multiple weights)
- Smoother weight transitions
- Better performance

```html
<!-- Future optimization -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

## Print Styles

Typography automatically optimizes for print:

- Font sizes in points (pt)
- Black text for cost savings
- Proper page breaks
- Optimized line heights

```css
@media print {
  .business-plan-body { font-size: 11pt; }
  .business-plan-h1 { font-size: 28pt; }
}
```

## Testing Checklist

Use this checklist when implementing typography:

- [ ] All headings use semantic classes (`.bp-h1`, `.bp-h2`, etc.)
- [ ] Body text is minimum 18px on desktop
- [ ] Body text is minimum 16px on mobile
- [ ] Line heights are 1.5+ for body text
- [ ] Reading width maxes at 65ch
- [ ] Charts use `.bp-chart-title` and `.bp-chart-label`
- [ ] Tables use `.business-plan-table`
- [ ] Metrics use `.business-plan-metric`
- [ ] Color contrast meets WCAG AAA (7:1)
- [ ] High contrast mode works
- [ ] Reduced motion mode works
- [ ] Print styles look good
- [ ] Mobile responsive (test at 375px, 768px, 1024px)

## Resources

### Typography References

- [Modular Scale Calculator](https://www.modularscale.com/)
- [Type Scale](https://type-scale.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Butterick's Practical Typography](https://practicaltypography.com/)

### Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Who Can Use](https://whocanuse.com/) - Color contrast simulator
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Accessibility audit

### Fonts

- [Inter Font](https://rsms.me/inter/) - Official Inter documentation
- [Google Fonts](https://fonts.google.com/specimen/Inter) - Inter on Google Fonts

## Support

For questions or issues with the typography system:

1. Check this guide first
2. Review `typography-professional.css` for CSS variables
3. Test in multiple browsers (Chrome, Firefox, Safari)
4. Validate with Lighthouse accessibility audit
5. Check responsive behavior in DevTools

## Version History

### v1.0.0 (Current)
- Initial professional typography system
- Modular scale 1.250 (Major Third)
- WCAG 2.1 AAA compliant
- Full responsive support
- Print optimization
- High contrast mode
- Reduced motion support
