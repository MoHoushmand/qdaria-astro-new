# Typography Quick Reference Card

## 📏 Font Sizes (Desktop → Mobile)

```
H1:      61px → 31px    .business-plan-h1 / .bp-h1
H2:      49px → 25px    .business-plan-h2 / .bp-h2
H3:      39px → 20px    .business-plan-h3 / .bp-h3
H4:      31px → 16px    .business-plan-h4 / .bp-h4
H5:      25px → 16px    .business-plan-h5 / .bp-h5
H6:      20px → 16px    .business-plan-h6 / .bp-h6

Lead:    20px → 18px    .business-plan-lead / .bp-lead
Body:    18px → 16px    .business-plan-body / .bp-body
Small:   16px → 16px    .business-plan-body-sm / .bp-body-sm
Caption: 14px → 14px    .business-plan-caption / .bp-caption
Tiny:    12px → 12px    .business-plan-tiny / .bp-tiny

Metric:  76px → 39px    .business-plan-metric / .bp-metric
Metric+: 95px → 49px    .business-plan-metric-lg / .bp-metric-lg
```

## 📐 Line Heights

```css
1.2     Tight       Headings
1.375   Snug        Subheadings
1.5     Normal      Standard body
1.625   Relaxed     Long-form (RECOMMENDED)
1.75    Loose       Maximum spacing
```

## 🎨 Common Patterns

### Hero Section
```tsx
<h1 className="bp-h1">Executive Summary</h1>
<p className="bp-lead">Making quantum accessible</p>
```

### Section Header
```tsx
<h2 className="bp-h2">Market Analysis</h2>
<p className="bp-body">Market overview text...</p>
```

### Chart
```tsx
<h3 className="bp-chart-title">Revenue Projections</h3>
<ResponsiveContainer>...</ResponsiveContainer>
```

### Metric Card
```tsx
<div className="bp-metric">$125B</div>
<div className="bp-metric-label">Market Size</div>
```

### Data Table
```tsx
<table className="bp-table">
  <thead>
    <tr><th>Metric</th><th>Value</th></tr>
  </thead>
  <tbody>
    <tr><td>Revenue</td><td>$12M</td></tr>
  </tbody>
</table>
```

### List
```tsx
<ul className="bp-list">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

## 🔧 Utilities

```tsx
.bp-text-center        Text align center
.bp-text-left          Text align left
.bp-text-right         Text align right
.bp-uppercase          UPPERCASE
.bp-italic             Italic text
.bp-truncate           Truncate with ellipsis
.bp-line-clamp-2       Limit to 2 lines
.bp-prose              Max width 65ch
.bp-prose-narrow       Max width 50ch
.bp-prose-wide         Max width 75ch
```

## ⚡ Quick Migration

```tsx
// BEFORE
<h2 className="text-3xl font-bold">Title</h2>
<p className="text-sm text-gray-400">Text</p>

// AFTER
<h2 className="bp-h2">Title</h2>
<p className="bp-body-sm">Text</p>
```

## 🎯 Golden Rules

1. **Body text**: Minimum 18px desktop, 16px mobile
2. **Line height**: Minimum 1.5 for body text
3. **Reading width**: Maximum 65 characters per line
4. **Hierarchy**: Don't skip heading levels
5. **Contrast**: WCAG AAA (7:1 ratio)

## 📱 Breakpoints

```css
Desktop:  1280px+    Full scale
Tablet:   768-1024   Scaled down
Mobile:   <768px     Minimum 16px body
```

## ✅ Testing Checklist

- [ ] All headings use `.bp-h*` classes
- [ ] Body text uses `.bp-body` (18px)
- [ ] Charts use `.bp-chart-title`
- [ ] Metrics use `.bp-metric`
- [ ] Tables use `.bp-table`
- [ ] Reading width constrained
- [ ] Contrast ratio 7:1+
- [ ] Mobile text ≥ 16px
