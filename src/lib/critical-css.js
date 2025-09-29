import { promises as fs } from 'fs';
import path from 'path';
import { PurgeCSS } from 'purgecss';

/**
 * Extract and inline critical CSS for better performance
 */
export async function extractCriticalCSS(html, cssFiles) {
  const purgecss = new PurgeCSS();
  const results = await purgecss.purge({
    content: [{ raw: html, extension: 'html' }],
    css: cssFiles,
    safelist: {
      standard: [/^dark/, /^hover/, /^focus/, /^active/],
      deep: [/^astro/, /^swiper/],
      greedy: [/data-/]
    },
    keyframes: true,
    variables: true,
    fontFace: true
  });

  return results.map(r => r.css).join('\n');
}

/**
 * Generate resource hints for faster loading
 */
export function generateResourceHints(assets) {
  const hints = [];

  // Preconnect to external domains
  const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
  domains.forEach(domain => {
    hints.push(`<link rel="preconnect" href="${domain}" crossorigin>`);
  });

  // Preload critical assets
  assets.forEach(asset => {
    if (asset.endsWith('.woff2')) {
      hints.push(`<link rel="preload" href="${asset}" as="font" type="font/woff2" crossorigin>`);
    } else if (asset.endsWith('.css') && asset.includes('critical')) {
      hints.push(`<link rel="preload" href="${asset}" as="style">`);
    } else if (asset.includes('webp') && asset.includes('hero')) {
      hints.push(`<link rel="preload" href="${asset}" as="image" type="image/webp">`);
    }
  });

  // DNS prefetch for third-party services
  const dnsPrefetch = ['https://www.google-analytics.com'];
  dnsPrefetch.forEach(domain => {
    hints.push(`<link rel="dns-prefetch" href="${domain}">`);
  });

  return hints.join('\n');
}

/**
 * Optimize font loading with font-display swap
 */
export function optimizeFontLoading(css) {
  return css.replace(
    /@font-face\s*{([^}]+)}/g,
    (match, content) => {
      if (!content.includes('font-display')) {
        return `@font-face {${content}; font-display: swap;}`;
      }
      return match;
    }
  );
}