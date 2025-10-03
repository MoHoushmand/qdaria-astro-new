# BusinessPlanDeck Integration Guide

Complete guide for integrating the Business Plan Deck component into your Astro application.

## Quick Start

### 1. Import in Astro Page

Create or modify `/src/pages/business-plan.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { BusinessPlanDeck } from '@/components/business-plan-deck';
import '@/components/business-plan-deck/styles/business-plan-deck.css';
---

<BaseLayout
  title="QDaria Business Plan | Series A Funding"
  description="Comprehensive business plan for QDaria's Series A funding round"
>
  <BusinessPlanDeck client:load />
</BaseLayout>
```

### 2. Import Custom CSS

Add to your main CSS file or component:

```css
@import '@/components/business-plan-deck/styles/business-plan-deck.css';
```

Or import in Astro layout:

```astro
---
import '@/components/business-plan-deck/styles/business-plan-deck.css';
---
```

## Advanced Integration

### Custom Layout with Header

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
import '@/components/business-plan-deck/styles/business-plan-deck.css';

const pageTitle = "QDaria Business Plan 2025";
const version = "v1.0";
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>{pageTitle}</title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <!-- Optional: Custom header outside the deck -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <span class="text-sm text-slate-600">{pageTitle}</span>
        <span class="text-xs text-slate-500">{version}</span>
      </div>
    </div>

    <!-- Main deck component -->
    <BusinessPlanDeck client:load />
  </body>
</html>
```

### With Authentication Guard

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';

// Check if user is authenticated (example)
const session = Astro.cookies.get('session');
if (!session) {
  return Astro.redirect('/login');
}

// Optional: Log access
console.log(`Business plan accessed by: ${session.value.userId}`);
---

<BusinessPlanDeck client:load />
```

### With Analytics Tracking

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
---

<BusinessPlanDeck client:load />

<script>
  // Track page view
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: 'Business Plan Deck',
      page_path: '/business-plan',
    });
  }

  // Track slide changes (custom event)
  document.addEventListener('slide-change', (e) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'slide_view', {
        slide_number: e.detail.slideId,
        slide_title: e.detail.slideTitle,
      });
    }
  });
</script>
```

## Environment Variables

Create `.env` file if you need configurable options:

```env
# Optional: Default scenario
PUBLIC_DEFAULT_SCENARIO=base

# Optional: Enable/disable features
PUBLIC_ENABLE_PDF_EXPORT=true
PUBLIC_ENABLE_SIDEBAR=true

# Optional: Branding
PUBLIC_COMPANY_NAME="QDaria AS"
PUBLIC_FUNDING_ROUND="Series A"
PUBLIC_FUNDING_AMOUNT="€12M"
```

Use in Astro:

```astro
---
const defaultScenario = import.meta.env.PUBLIC_DEFAULT_SCENARIO || 'base';
const enableExport = import.meta.env.PUBLIC_ENABLE_PDF_EXPORT === 'true';
---

<BusinessPlanDeck
  client:load
  defaultScenario={defaultScenario}
/>
```

## Custom Styling

### Override CSS Variables

```css
/* In your global CSS or component style */
:root {
  --bp-primary: #0ea5e9;       /* Change primary color */
  --bp-secondary: #8b5cf6;     /* Change secondary color */
  --bp-text-primary: #1e293b;  /* Change text color */
}
```

### Custom Slide Styles

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
---

<BusinessPlanDeck client:load />

<style is:global>
  /* Override specific slide styles */
  .business-plan-slide {
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Custom heading gradient */
  .bp-heading-1 {
    background: linear-gradient(135deg, #0ea5e9, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Custom card hover effect */
  .bp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
</style>
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "types": ["astro/client"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Loading States

### Custom Loading Component

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
---

<div id="deck-container">
  <!-- Custom loading state -->
  <div id="loading" class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="spinner"></div>
      <p>Loading Business Plan...</p>
    </div>
  </div>

  <BusinessPlanDeck client:load />
</div>

<script>
  // Hide loading when component is ready
  window.addEventListener('load', () => {
    document.getElementById('loading')?.remove();
  });
</script>

<style>
  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top-color: #0ea5e9;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
```

## SEO Optimization

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';

const seoTitle = "QDaria Business Plan - Series A Funding Round";
const seoDescription = "Comprehensive business plan for QDaria's €12M Series A funding round. Quantum+AI platform for enterprise.";
---

<head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  <meta name="robots" content="noindex, nofollow" /> <!-- Important: Keep confidential -->

  <!-- Open Graph -->
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:type" content="website" />

  <!-- Preload critical resources -->
  <link rel="preload" href="/logomark.png" as="image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
</head>

<body>
  <BusinessPlanDeck client:load />
</body>
```

## Security Considerations

### 1. Password Protection

```astro
---
const password = Astro.url.searchParams.get('access');
const CORRECT_PASSWORD = import.meta.env.BUSINESS_PLAN_PASSWORD;

if (password !== CORRECT_PASSWORD) {
  return new Response('Unauthorized', { status: 401 });
}
---

<BusinessPlanDeck client:load />
```

### 2. IP Whitelist (for production)

```astro
---
const allowedIPs = ['192.168.1.1', '10.0.0.1'];
const clientIP = Astro.request.headers.get('x-forwarded-for') ||
                 Astro.request.headers.get('x-real-ip');

if (!allowedIPs.includes(clientIP)) {
  return new Response('Access Denied', { status: 403 });
}
---
```

### 3. Time-Limited Access

```astro
---
const expiryDate = new Date('2025-12-31');
const now = new Date();

if (now > expiryDate) {
  return new Response('This business plan has expired', { status: 410 });
}
---
```

## Performance Optimization

### 1. Lazy Load Images

```astro
---
import { BusinessPlanDeck } from '@/components/business-plan-deck';
---

<BusinessPlanDeck client:load />

<script>
  // Lazy load images in slides
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.lazy;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  });
</script>
```

### 2. Preload Critical Slides

```astro
<head>
  <!-- Preload first slide component -->
  <link rel="modulepreload" href="/src/components/business-plan-deck/slides/ExecutiveSummarySlide.tsx" />
</head>
```

## Deployment Checklist

- [ ] Remove all console.log statements
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile responsiveness
- [ ] Verify keyboard navigation works
- [ ] Test screen reader compatibility
- [ ] Check PDF export functionality
- [ ] Verify all images load correctly
- [ ] Test print styles
- [ ] Ensure confidential content is protected
- [ ] Set up proper authentication if needed
- [ ] Configure analytics tracking
- [ ] Test loading performance
- [ ] Verify accessibility (WCAG AA)

## Troubleshooting

### Issue: Component not rendering

**Solution:** Ensure you're using `client:load` directive:

```astro
<BusinessPlanDeck client:load />
```

### Issue: Styles not applying

**Solution:** Import CSS file explicitly:

```astro
---
import '@/components/business-plan-deck/styles/business-plan-deck.css';
---
```

### Issue: TypeScript errors

**Solution:** Check path aliases in `tsconfig.json` and ensure types are imported:

```typescript
import type { SlideProps } from '@/components/business-plan-deck/types';
```

### Issue: Icons not showing

**Solution:** Install lucide-react:

```bash
npm install lucide-react
```

### Issue: Mobile navigation not working

**Solution:** Ensure viewport meta tag is set:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Support

For additional help:
1. Check the [README.md](./README.md) for component documentation
2. Review the [ExampleSlide.tsx](./slides/ExampleSlide.tsx) for implementation patterns
3. Consult the [types.ts](./types.ts) file for TypeScript definitions
4. Contact the development team

## License

Proprietary - QDaria AS © 2024
