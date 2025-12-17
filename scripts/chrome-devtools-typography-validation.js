/**
 * Chrome DevTools Typography Validation Script
 * Run this in Chrome DevTools Console on business plan page
 *
 * Usage:
 * 1. Open Chrome DevTools (F12)
 * 2. Navigate to Console tab
 * 3. Copy and paste this entire script
 * 4. Press Enter to execute
 * 5. Review results in console
 */

(function validateTypography() {
  console.log('%c🔍 Typography Validation Started', 'font-size: 20px; font-weight: bold; color: #0ea5e9');
  console.log('%cValidating business plan typography...', 'color: #64748b');

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    violations: [],
    warnings_list: [],
    metrics: {}
  };

  // Configuration
  const MINIMUM_SIZES = {
    body: 18,
    chart: 14,
    label: 14,
    heading: {
      h1: 48,
      h2: 36,
      h3: 28
    }
  };

  const MINIMUM_LINE_HEIGHT = 1.5;
  const MINIMUM_CONTRAST_RATIO = 4.5; // WCAG AA standard

  // Helper: Calculate contrast ratio
  function getContrastRatio(fgColor, bgColor) {
    const getLuminance = (rgb) => {
      const [r, g, b] = rgb.match(/\d+/g).map(Number);
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Helper: Get element identifier
  function getElementIdentifier(el) {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
    return `${tag}${id}${classes}`;
  }

  // Helper: Get element context
  function getElementContext(el) {
    const text = el.textContent.trim();
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
  }

  // Check all text elements
  console.log('\n%c📋 Step 1: Collecting text elements...', 'font-weight: bold; color: #06d6ff');
  const allElements = document.querySelectorAll('*');
  const textElements = Array.from(allElements).filter(el => {
    const text = el.textContent.trim();
    const hasText = text.length > 0;
    const isLeafNode = el.children.length === 0 || el.tagName === 'P';
    const isVisible = window.getComputedStyle(el).display !== 'none';
    return hasText && isLeafNode && isVisible;
  });

  console.log(`✓ Found ${textElements.length} text elements to validate`);

  // Validate each text element
  console.log('\n%c📏 Step 2: Validating font sizes...', 'font-weight: bold; color: #06d6ff');

  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const fontSize = parseFloat(styles.fontSize);
    const lineHeight = parseFloat(styles.lineHeight) / fontSize;
    const fontWeight = styles.fontWeight;
    const color = styles.color;
    const bgColor = styles.backgroundColor;
    const tagName = el.tagName.toLowerCase();
    const elementId = getElementIdentifier(el);

    results.total++;

    // Determine minimum size based on context
    let minSize = MINIMUM_SIZES.body;
    let context = 'body text';

    if (el.closest('svg') || el.closest('.recharts-wrapper') || elementId.includes('chart')) {
      minSize = MINIMUM_SIZES.chart;
      context = 'chart text';
    } else if (el.closest('label') || tagName === 'label') {
      minSize = MINIMUM_SIZES.label;
      context = 'label text';
    }

    // Check font size
    if (fontSize < minSize) {
      results.failed++;
      results.violations.push({
        element: elementId,
        issue: 'Font size too small',
        context: context,
        current: `${fontSize.toFixed(1)}px`,
        expected: `≥${minSize}px`,
        location: getElementContext(el),
        severity: 'error'
      });
    } else if (fontSize < minSize + 2) {
      results.warnings++;
      results.warnings_list.push({
        element: elementId,
        issue: 'Font size borderline',
        context: context,
        current: `${fontSize.toFixed(1)}px`,
        recommended: `≥${minSize + 4}px`,
        location: getElementContext(el),
        severity: 'warning'
      });
      results.passed++;
    } else {
      results.passed++;
    }

    // Check line height for paragraphs
    if (tagName === 'p' && lineHeight < MINIMUM_LINE_HEIGHT) {
      results.violations.push({
        element: elementId,
        issue: 'Line height too tight',
        context: 'paragraph text',
        current: lineHeight.toFixed(2),
        expected: `≥${MINIMUM_LINE_HEIGHT}`,
        location: getElementContext(el),
        severity: 'error'
      });
    }

    // Check contrast ratio
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
      try {
        const contrast = getContrastRatio(color, bgColor);
        if (contrast < MINIMUM_CONTRAST_RATIO) {
          results.violations.push({
            element: elementId,
            issue: 'Insufficient color contrast',
            context: 'accessibility',
            current: contrast.toFixed(2),
            expected: `≥${MINIMUM_CONTRAST_RATIO}`,
            location: getElementContext(el),
            severity: 'error'
          });
        }
      } catch (e) {
        // Skip contrast check if colors can't be parsed
      }
    }
  });

  // Check headings hierarchy
  console.log('\n%c📏 Step 3: Validating heading hierarchy...', 'font-weight: bold; color: #06d6ff');
  const headings = {
    h1: document.querySelectorAll('h1, .h1, .business-plan-h1'),
    h2: document.querySelectorAll('h2, .h2, .business-plan-h2'),
    h3: document.querySelectorAll('h3, .h3, .business-plan-h3')
  };

  const headingSizes = {};
  Object.entries(headings).forEach(([tag, elements]) => {
    if (elements.length > 0) {
      const fontSize = parseFloat(window.getComputedStyle(elements[0]).fontSize);
      const minSize = MINIMUM_SIZES.heading[tag];
      const status = fontSize >= minSize ? '✅' : '❌';
      headingSizes[tag] = fontSize;
      console.log(`${status} ${tag.toUpperCase()}: ${fontSize.toFixed(1)}px (min: ${minSize}px, found: ${elements.length})`);

      if (fontSize < minSize) {
        results.violations.push({
          element: tag,
          issue: 'Heading size too small',
          context: 'heading hierarchy',
          current: `${fontSize.toFixed(1)}px`,
          expected: `≥${minSize}px`,
          severity: 'error'
        });
      }
    }
  });

  // Verify heading size progression
  if (headingSizes.h1 && headingSizes.h2 && headingSizes.h1 <= headingSizes.h2) {
    results.violations.push({
      element: 'h1/h2',
      issue: 'Invalid heading hierarchy',
      context: 'heading sizes',
      current: `h1: ${headingSizes.h1}px, h2: ${headingSizes.h2}px`,
      expected: 'h1 > h2',
      severity: 'error'
    });
  }

  // Check body text
  console.log('\n%c📖 Step 4: Validating body text...', 'font-weight: bold; color: #06d6ff');
  const bodyText = document.querySelectorAll('p, .business-plan-body, .text-lg');
  if (bodyText.length > 0) {
    const fontSize = parseFloat(window.getComputedStyle(bodyText[0]).fontSize);
    const lineHeight = parseFloat(window.getComputedStyle(bodyText[0]).lineHeight) / fontSize;
    console.log(`${fontSize >= MINIMUM_SIZES.body ? '✅' : '❌'} Font Size: ${fontSize.toFixed(1)}px (min: ${MINIMUM_SIZES.body}px)`);
    console.log(`${lineHeight >= MINIMUM_LINE_HEIGHT ? '✅' : '❌'} Line Height: ${lineHeight.toFixed(2)} (min: ${MINIMUM_LINE_HEIGHT})`);

    results.metrics.bodyFontSize = fontSize;
    results.metrics.bodyLineHeight = lineHeight;
  }

  // Check chart text
  console.log('\n%c📊 Step 5: Validating chart text...', 'font-weight: bold; color: #06d6ff');
  const chartText = document.querySelectorAll('svg text, .recharts-text, .recharts-label');
  if (chartText.length > 0) {
    const chartSizes = Array.from(chartText).map(el =>
      parseFloat(window.getComputedStyle(el).fontSize)
    );
    const minChartSize = Math.min(...chartSizes);
    const maxChartSize = Math.max(...chartSizes);
    const avgChartSize = chartSizes.reduce((a, b) => a + b, 0) / chartSizes.length;

    console.log(`${minChartSize >= MINIMUM_SIZES.chart ? '✅' : '❌'} Minimum: ${minChartSize.toFixed(1)}px (requirement: ${MINIMUM_SIZES.chart}px)`);
    console.log(`📊 Average: ${avgChartSize.toFixed(1)}px`);
    console.log(`📊 Maximum: ${maxChartSize.toFixed(1)}px`);
    console.log(`📊 Total chart text elements: ${chartSizes.length}`);

    results.metrics.chartTextMin = minChartSize;
    results.metrics.chartTextAvg = avgChartSize;
    results.metrics.chartTextMax = maxChartSize;
    results.metrics.chartTextCount = chartSizes.length;
  }

  // Summary
  console.log('\n%c═══════════════════════════════════════════════════', 'color: #64748b');
  console.log('%c📈 VALIDATION SUMMARY', 'font-size: 18px; font-weight: bold; color: #7ce000');
  console.log('%c═══════════════════════════════════════════════════', 'color: #64748b');
  console.log(`\n📊 Total Elements Checked: ${results.total}`);
  console.log(`✅ Passed: ${results.passed} (${(results.passed/results.total*100).toFixed(1)}%)`);
  console.log(`⚠️  Warnings: ${results.warnings} (${(results.warnings/results.total*100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${results.failed} (${(results.failed/results.total*100).toFixed(1)}%)`);

  const score = (results.passed / results.total * 100).toFixed(1);
  const scoreColor = score >= 90 ? '#7ce000' : score >= 75 ? '#fbbf24' : '#f87171';
  console.log(`\n%c🎯 Overall Score: ${score}%`, `font-size: 16px; font-weight: bold; color: ${scoreColor}`);

  // Warnings
  if (results.warnings_list.length > 0) {
    console.log('\n%c⚠️ WARNINGS (Borderline Cases):', 'font-weight: bold; color: #fbbf24');
    console.table(results.warnings_list);
  }

  // Violations
  if (results.violations.length > 0) {
    console.log('\n%c❌ VIOLATIONS FOUND:', 'font-weight: bold; color: #f87171');
    console.table(results.violations);

    // Group violations by type
    const violationsByType = results.violations.reduce((acc, v) => {
      acc[v.issue] = (acc[v.issue] || 0) + 1;
      return acc;
    }, {});

    console.log('\n%c📊 Violations by Type:', 'font-weight: bold; color: #64748b');
    Object.entries(violationsByType).forEach(([type, count]) => {
      console.log(`  • ${type}: ${count}`);
    });
  } else {
    console.log('\n%c🎉 ALL TYPOGRAPHY CHECKS PASSED!', 'font-size: 16px; font-weight: bold; color: #7ce000');
  }

  // Metrics summary
  console.log('\n%c📏 Key Metrics:', 'font-weight: bold; color: #06d6ff');
  Object.entries(results.metrics).forEach(([key, value]) => {
    console.log(`  • ${key}: ${typeof value === 'number' ? value.toFixed(1) : value}`);
  });

  // Store results globally for automated testing
  window.typographyValidationResults = results;

  return results;
})();
