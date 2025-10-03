# Professional Layout System Usage Guide

## Quick Start

### 1. Import the Layout Components

```typescript
import {
  BusinessPlanLayout,
  BusinessPlanSection,
  GridLayout,
  FlexLayout,
  CardContainer,
  Stack,
  Divider,
  ContentBlock
} from '@/components/business-plan-deck/BusinessPlanLayout';
```

### 2. Basic Slide Structure

```typescript
export const MySlide: React.FC = () => {
  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12" style={{ background: '#000212' }}>
      <div className="container-professional">
        <BusinessPlanSection
          title="Section Title"
          subtitle="Optional subtitle for context"
          contentWidth="wide"
          spacing="professional"
        >
          <Stack spacing="relaxed">
            <p>Your content here with optimal reading width</p>
          </Stack>
        </BusinessPlanSection>
      </div>
    </div>
  );
};
```

---

## Component Reference

### BusinessPlanLayout

**Purpose**: Main container for business plan content with consistent padding and max-width

**Props**:
- `children`: React.ReactNode (required)
- `className`: string (optional)
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: '2xl')

**Example**:
```typescript
<BusinessPlanLayout maxWidth="xl">
  {/* Your content */}
</BusinessPlanLayout>
```

---

### BusinessPlanSection

**Purpose**: Section wrapper with title, subtitle, and optimal content width

**Props**:
- `title`: string (required)
- `subtitle`: string (optional)
- `children`: React.ReactNode (required)
- `className`: string (optional)
- `titleClassName`: string (optional)
- `contentWidth`: 'narrow' | 'normal' | 'wide' | 'full' (default: 'wide')
- `spacing`: 'compact' | 'comfortable' | 'relaxed' | 'professional' (default: 'professional')
- `showDivider`: boolean (default: true)

**Example**:
```typescript
<BusinessPlanSection
  title="Market Analysis"
  subtitle="Global quantum computing market opportunity"
  contentWidth="wide"
  spacing="professional"
  showDivider={true}
>
  {/* Section content */}
</BusinessPlanSection>
```

**Spacing Options**:
- `compact`: 64px (var(--space-8))
- `comfortable`: 80px (var(--space-10))
- `relaxed`: 96px (var(--space-12))
- `professional`: 128px (var(--space-16))

**Content Width Options**:
- `narrow`: 55ch (~440px)
- `normal`: 65ch (~520px) - Optimal for body text
- `wide`: 85ch (~680px) - Good for wider content
- `full`: 100% width

---

### GridLayout

**Purpose**: Responsive grid with consistent gaps

**Props**:
- `children`: React.ReactNode (required)
- `columns`: 2 | 3 | 4 | 'auto-fit' | 'auto-fill' | 'golden' | 'golden-reverse' (default: 'auto-fit')
- `gap`: 2 | 3 | 4 | 5 | 6 | 8 | 10 (default: 6)
- `className`: string (optional)

**Example**:
```typescript
{/* 3-column grid with 48px gap */}
<GridLayout columns={3} gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</GridLayout>

{/* Golden ratio 2-column layout */}
<GridLayout columns="golden" gap={6}>
  <div>Primary content (1.618x wider)</div>
  <div>Secondary content</div>
</GridLayout>

{/* Auto-fit responsive grid */}
<GridLayout columns="auto-fit" gap={5}>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</GridLayout>
```

**Gap Values** (8px grid system):
- `gap={2}`: 16px (var(--space-2))
- `gap={3}`: 24px (var(--space-3))
- `gap={4}`: 32px (var(--space-4))
- `gap={5}`: 40px (var(--space-5))
- `gap={6}`: 48px (var(--space-6)) - **Recommended**
- `gap={8}`: 64px (var(--space-8))
- `gap={10}`: 80px (var(--space-10))

---

### FlexLayout

**Purpose**: Flexible layout with modern flex properties

**Props**:
- `children`: React.ReactNode (required)
- `direction`: 'row' | 'column' (default: 'row')
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' (default: 'start')
- `align`: 'start' | 'center' | 'end' | 'stretch' (default: 'center')
- `gap`: 2 | 3 | 4 | 5 | 6 | 8 | 10 (default: 4)
- `wrap`: boolean (default: true)
- `className`: string (optional)

**Example**:
```typescript
{/* Space-between layout */}
<FlexLayout justify="between" align="center" gap={4}>
  <div>Left content</div>
  <div>Right content</div>
</FlexLayout>

{/* Vertical stack */}
<FlexLayout direction="column" align="start" gap={6}>
  <h3>Title</h3>
  <p>Content</p>
  <Button>Action</Button>
</FlexLayout>
```

---

### CardContainer

**Purpose**: Card wrapper with professional spacing

**Props**:
- `children`: React.ReactNode (required)
- `spacing`: 'minimal' | 'compact' | 'comfortable' | 'spacious' (default: 'comfortable')
- `className`: string (optional)

**Example**:
```typescript
<Card>
  <CardContainer spacing="spacious">
    <h3>Card Title</h3>
    <p>Card content with generous padding (64px)</p>
  </CardContainer>
</Card>
```

**Spacing Options**:
- `minimal`: 24px (var(--space-3))
- `compact`: 32px (var(--space-4))
- `comfortable`: 48px (var(--space-6)) - **Recommended**
- `spacious`: 64px (var(--space-8))

---

### Stack

**Purpose**: Vertical stack with consistent spacing between items

**Props**:
- `children`: React.ReactNode (required)
- `spacing`: 'tight' | 'compact' | 'normal' | 'relaxed' | 'spacious' (default: 'normal')
- `className`: string (optional)

**Example**:
```typescript
<Stack spacing="relaxed">
  <h3>Section Title</h3>
  <p>First paragraph</p>
  <p>Second paragraph</p>
  <Button>Call to Action</Button>
</Stack>
```

**Spacing Options** (margin-top between children):
- `tight`: 24px (var(--space-3))
- `compact`: 16px (var(--space-2))
- `normal`: 32px (var(--space-4)) - **Recommended**
- `relaxed`: 48px (var(--space-6))
- `spacious`: 64px (var(--space-8))

---

### ContentBlock

**Purpose**: Constrain content width for optimal readability

**Props**:
- `children`: React.ReactNode (required)
- `width`: 'narrow' | 'normal' | 'wide' | 'full' (default: 'normal')
- `className`: string (optional)

**Example**:
```typescript
<ContentBlock width="normal">
  <p>
    This paragraph will be constrained to ~65 characters per line,
    which is optimal for reading comprehension and eye tracking.
  </p>
</ContentBlock>
```

---

### Divider

**Purpose**: Section divider with appropriate spacing

**Props**:
- `type`: 'professional' | 'section' | 'subtle' (default: 'professional')
- `className`: string (optional)

**Example**:
```typescript
{/* Professional divider - 64px margin */}
<Divider type="professional" />

{/* Section divider - 96px margin */}
<Divider type="section" />

{/* Subtle divider - 48px margin */}
<Divider type="subtle" />
```

---

## CSS Utility Classes

### Spacing Utilities (8px Grid)

#### Padding
```css
.p-4   /* padding: 32px (all sides) */
.px-6  /* padding-left/right: 48px */
.py-8  /* padding-top/bottom: 64px */
.pt-6  /* padding-top: 48px */
.pb-6  /* padding-bottom: 48px */
```

#### Margin
```css
.m-4    /* margin: 32px (all sides) */
.mx-6   /* margin-left/right: 48px */
.my-8   /* margin-top/bottom: 64px */
.mt-6   /* margin-top: 48px */
.mb-6   /* margin-bottom: 64px */
.mx-auto /* center horizontally */
```

#### Gap (for Grid/Flex)
```css
.gap-4  /* gap: 32px */
.gap-6  /* gap: 48px - Recommended */
.gap-8  /* gap: 64px */
```

### Container Utilities

```css
.container-professional  /* Max 1400px + responsive padding */
.container-lg           /* Max 1024px */
.container-md           /* Max 768px */
.content-block-professional /* Max 65ch (optimal reading) */
```

### Grid Utilities

```css
.grid-auto-fit   /* Responsive auto-fit grid */
.grid-2-col      /* 2-column grid */
.grid-3-col      /* 3-column grid */
.grid-golden-2   /* Golden ratio 2-column (1.618:1) */
```

### Flex Utilities

```css
.flex-row-professional  /* Flex row with 32px gap */
.flex-col-professional  /* Flex column with 32px gap */
.flex-space-between     /* Space-between with 32px gap */
.flex-center           /* Center both axes */
```

---

## Complete Example Slide

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import {
  BusinessPlanSection,
  GridLayout,
  FlexLayout,
  CardContainer,
  Stack,
  Divider
} from '@/components/business-plan-deck/BusinessPlanLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';

export const MySlide: React.FC = () => {
  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12" style={{ background: '#000212' }}>
      <div className="container-professional">
        {/* Header Section */}
        <BusinessPlanSection
          title="Market Opportunity"
          subtitle="$125B+ total addressable market by 2030"
          contentWidth="wide"
          spacing="professional"
        >
          <Stack spacing="relaxed">
            <p className="text-lg text-gray-300 leading-relaxed">
              The quantum computing market is experiencing exponential growth,
              with enterprise adoption accelerating across key sectors.
            </p>
          </Stack>
        </BusinessPlanSection>

        {/* Metrics Grid */}
        <BusinessPlanSection
          title="Key Metrics"
          contentWidth="full"
          spacing="relaxed"
        >
          <GridLayout columns={4} gap={6}>
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 h-full">
                  <CardContainer spacing="comfortable">
                    <Stack spacing="compact">
                      <div className="text-4xl font-bold text-cyan-400">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {metric.label}
                      </div>
                    </Stack>
                  </CardContainer>
                </Card>
              </motion.div>
            ))}
          </GridLayout>
        </BusinessPlanSection>

        <Divider type="section" />

        {/* Features Grid */}
        <BusinessPlanSection
          title="Core Features"
          contentWidth="full"
          spacing="comfortable"
          showDivider={false}
        >
          <GridLayout columns={3} gap={6}>
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <FlexLayout justify="between" align="start">
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <Badge className="bg-cyan-500/20">{feature.badge}</Badge>
                  </FlexLayout>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </GridLayout>
        </BusinessPlanSection>
      </div>
    </div>
  );
};
```

---

## Best Practices

### 1. Content Width
- **Body text**: Use `contentWidth="normal"` (65ch)
- **Wider content**: Use `contentWidth="wide"` (85ch)
- **Grids/charts**: Use `contentWidth="full"`

### 2. Section Spacing
- **Standard sections**: `spacing="professional"` (128px)
- **Related sections**: `spacing="relaxed"` (96px)
- **Compact layouts**: `spacing="comfortable"` (80px)

### 3. Card Padding
- **Important content**: `spacing="spacious"` (64px)
- **Standard cards**: `spacing="comfortable"` (48px)
- **Dense layouts**: `spacing="compact"` (32px)

### 4. Grid Gaps
- **Large cards**: `gap={6}` (48px) - **Recommended**
- **Medium cards**: `gap={5}` (40px)
- **Dense grids**: `gap={4}` (32px)

### 5. Vertical Rhythm
- **Relaxed reading**: `spacing="relaxed"` (48px between items)
- **Standard content**: `spacing="normal"` (32px between items)
- **Compact lists**: `spacing="compact"` (16px between items)

---

## Responsive Behavior

All layout components are **mobile-first** and responsive:

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Automatic Adjustments
- Grid columns collapse to 1 column on mobile
- Section spacing reduces: 128px → 96px → 64px
- Card padding reduces: 64px → 48px → 32px
- Container padding: 48px → 40px → 32px → 24px

---

## Print Optimization

All components support print mode:
- Section spacing reduces to 48px
- Card padding reduces to 32px
- Page breaks avoided in grid items
- Colors preserved with `print-color-adjust: exact`

---

## Accessibility

All components follow WCAG 2.1 guidelines:
- Semantic HTML structure
- Screen reader support with `.sr-only`
- Focus states on interactive elements
- Reduced motion support
- High contrast mode support

---

## Migration Guide

### Before (Old Style)
```typescript
<div className="w-full p-8 md:p-12">
  <h2 className="text-4xl mb-6">Title</h2>
  <div className="grid grid-cols-3 gap-6">
    {/* content */}
  </div>
</div>
```

### After (Professional Layout)
```typescript
<BusinessPlanSection
  title="Title"
  contentWidth="full"
  spacing="professional"
>
  <GridLayout columns={3} gap={6}>
    {/* content */}
  </GridLayout>
</BusinessPlanSection>
```

### Benefits
- ✅ Consistent spacing (8px grid)
- ✅ Optimal reading width (65ch)
- ✅ Responsive behavior
- ✅ Print optimization
- ✅ Accessibility
- ✅ Less code duplication
