/**
 * Automated Contrast Ratio Validation
 * Validates WCAG compliance at runtime
 */

import {
  getLuminance,
  getContrastRatio,
  hexToRgb,
  meetsWCAGLevel,
  formatContrastRatio,
  getWCAGLevel
} from './colorblind-utils';

export interface ContrastValidationResult {
  element: string;
  foreground: string;
  background: string;
  ratio: number;
  level: 'AAA' | 'AA' | 'FAIL';
  isLargeText: boolean;
  passed: boolean;
}

export interface ValidationReport {
  totalElements: number;
  passedAAA: number;
  passedAA: number;
  failed: number;
  results: ContrastValidationResult[];
  summary: string;
}

/**
 * Validate contrast ratio for a single element
 */
export function validateElementContrast(
  element: HTMLElement,
  targetLevel: 'AA' | 'AAA' = 'AAA'
): ContrastValidationResult {
  const style = window.getComputedStyle(element);
  const foreground = style.color;
  const background = getEffectiveBackgroundColor(element);
  const fontSize = parseFloat(style.fontSize);
  const fontWeight = parseInt(style.fontWeight) || 400;

  // Determine if text is "large" per WCAG definition
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);

  const ratio = getContrastRatio(rgbToHex(foreground), rgbToHex(background));
  const level = getWCAGLevel(ratio, isLargeText);
  const passed = meetsWCAGLevel(ratio, targetLevel, isLargeText);

  return {
    element: getElementSelector(element),
    foreground: rgbToHex(foreground),
    background: rgbToHex(background),
    ratio,
    level,
    isLargeText,
    passed
  };
}

/**
 * Get effective background color by traversing parent elements
 */
function getEffectiveBackgroundColor(element: HTMLElement): string {
  let current: HTMLElement | null = element;

  while (current) {
    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;

    // Check if background is not transparent
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg;
    }

    current = current.parentElement;
  }

  // Default to body background or black
  return window.getComputedStyle(document.body).backgroundColor || '#000000';
}

/**
 * Convert RGB string to hex
 */
function rgbToHex(rgb: string): string {
  if (rgb.startsWith('#')) return rgb;

  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return '#000000';

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Generate CSS selector for element
 */
function getElementSelector(element: HTMLElement): string {
  if (element.id) return `#${element.id}`;
  if (element.className) return `.${element.className.split(' ')[0]}`;
  return element.tagName.toLowerCase();
}

/**
 * Validate all text elements on page
 */
export function validatePageContrast(
  targetLevel: 'AA' | 'AAA' = 'AAA',
  selector?: string
): ValidationReport {
  const elements = selector
    ? document.querySelectorAll<HTMLElement>(selector)
    : document.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, h5, h6, p, a, button, label, span, td, th, li'
      );

  const results: ContrastValidationResult[] = [];
  let passedAAA = 0;
  let passedAA = 0;
  let failed = 0;

  elements.forEach(element => {
    // Skip hidden elements
    if (element.offsetParent === null) return;

    const result = validateElementContrast(element, targetLevel);
    results.push(result);

    if (result.level === 'AAA') {
      passedAAA++;
    } else if (result.level === 'AA') {
      passedAA++;
    } else {
      failed++;
    }
  });

  const totalElements = results.length;
  const passRate = totalElements > 0
    ? ((passedAAA / totalElements) * 100).toFixed(1)
    : '0.0';

  const summary = `
    Total Elements: ${totalElements}
    AAA Compliant: ${passedAAA} (${((passedAAA / totalElements) * 100).toFixed(1)}%)
    AA Compliant: ${passedAA} (${((passedAA / totalElements) * 100).toFixed(1)}%)
    Failed: ${failed} (${((failed / totalElements) * 100).toFixed(1)}%)
    Overall Pass Rate (AAA): ${passRate}%
  `.trim();

  return {
    totalElements,
    passedAAA,
    passedAA,
    failed,
    results,
    summary
  };
}

/**
 * Log validation results to console
 */
export function logValidationReport(report: ValidationReport, showDetails: boolean = true): void {
  console.group('🎨 Color Contrast Validation Report');
  console.log(report.summary);

  if (showDetails && report.failed > 0) {
    console.group('❌ Failed Elements');
    report.results
      .filter(r => !r.passed)
      .forEach(result => {
        console.warn(
          `${result.element}: ${formatContrastRatio(result.ratio)} (${result.level})`,
          {
            foreground: result.foreground,
            background: result.background,
            isLargeText: result.isLargeText
          }
        );
      });
    console.groupEnd();
  }

  if (showDetails && report.passedAAA > 0) {
    console.group('✅ AAA Compliant Elements (sample)');
    report.results
      .filter(r => r.level === 'AAA')
      .slice(0, 5)
      .forEach(result => {
        console.log(
          `${result.element}: ${formatContrastRatio(result.ratio)}`,
          {
            foreground: result.foreground,
            background: result.background
          }
        );
      });
    console.groupEnd();
  }

  console.groupEnd();
}

/**
 * Generate HTML report
 */
export function generateHTMLReport(report: ValidationReport): string {
  const failedRows = report.results
    .filter(r => !r.passed)
    .map(
      r => `
      <tr class="failed">
        <td>${r.element}</td>
        <td><div class="color-box" style="background: ${r.foreground}"></div> ${r.foreground}</td>
        <td><div class="color-box" style="background: ${r.background}"></div> ${r.background}</td>
        <td>${formatContrastRatio(r.ratio)}</td>
        <td class="level-${r.level.toLowerCase()}">${r.level}</td>
        <td>${r.isLargeText ? 'Yes' : 'No'}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contrast Validation Report</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          background: #f9fafb;
        }
        h1 {
          color: #111827;
          margin-bottom: 0.5rem;
        }
        .summary {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .stat {
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
        }
        .stat-aaa { background: #d1fae5; color: #065f46; }
        .stat-aa { background: #fef3c7; color: #92400e; }
        .stat-fail { background: #fee2e2; color: #991b1b; }
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        table {
          width: 100%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
          padding: 0.75rem 1rem;
          text-align: left;
        }
        th {
          background: #111827;
          color: white;
          font-weight: 600;
        }
        tr.failed {
          background: #fef2f2;
        }
        .color-box {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          margin-right: 0.5rem;
          vertical-align: middle;
        }
        .level-aaa { color: #065f46; font-weight: 600; }
        .level-aa { color: #92400e; font-weight: 600; }
        .level-fail { color: #991b1b; font-weight: 600; }
      </style>
    </head>
    <body>
      <h1>Color Contrast Validation Report</h1>
      <div class="summary">
        <pre>${report.summary}</pre>
        <div class="stats">
          <div class="stat stat-aaa">
            <div class="stat-value">${report.passedAAA}</div>
            <div class="stat-label">AAA Compliant</div>
          </div>
          <div class="stat stat-aa">
            <div class="stat-value">${report.passedAA}</div>
            <div class="stat-label">AA Compliant</div>
          </div>
          <div class="stat stat-fail">
            <div class="stat-value">${report.failed}</div>
            <div class="stat-label">Failed</div>
          </div>
        </div>
      </div>

      ${report.failed > 0 ? `
        <h2>Failed Elements</h2>
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Foreground</th>
              <th>Background</th>
              <th>Ratio</th>
              <th>Level</th>
              <th>Large Text</th>
            </tr>
          </thead>
          <tbody>
            ${failedRows}
          </tbody>
        </table>
      ` : '<p>✅ All elements pass WCAG AAA contrast requirements!</p>'}
    </body>
    </html>
  `;
}

/**
 * Auto-validate on page load (development only)
 */
export function enableAutoValidation(): void {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'development') return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const report = validatePageContrast('AAA');
      logValidationReport(report, true);

      // Store report for external access
      (window as any).__contrastReport = report;
    }, 1000);
  });
}

/**
 * Create downloadable report
 */
export function downloadReport(report: ValidationReport): void {
  const html = generateHTMLReport(report);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contrast-report-${new Date().toISOString().split('T')[0]}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Validate specific CSS custom properties
 */
export function validateCSSVariables(): Record<string, ContrastValidationResult> {
  const root = document.documentElement;
  const style = getComputedStyle(root);

  const bgPrimary = style.getPropertyValue('--bg-primary').trim();
  const textColors = {
    primary: style.getPropertyValue('--text-primary').trim(),
    secondary: style.getPropertyValue('--text-secondary').trim(),
    tertiary: style.getPropertyValue('--text-tertiary').trim(),
    muted: style.getPropertyValue('--text-muted').trim(),
  };

  const results: Record<string, ContrastValidationResult> = {};

  Object.entries(textColors).forEach(([name, color]) => {
    if (!color) return;

    const ratio = getContrastRatio(color, bgPrimary);
    const level = getWCAGLevel(ratio, false);

    results[name] = {
      element: `--text-${name}`,
      foreground: color,
      background: bgPrimary,
      ratio,
      level,
      isLargeText: false,
      passed: level !== 'FAIL'
    };
  });

  return results;
}
