import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import netlify from '@astrojs/netlify';
import icon from "astro-icon";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import sentry from '@sentry/astro';

// Workaround: @netlify/vite-plugin's dev middleware (netlifyPreMiddleware) intercepts
// ALL requests including Vite-internal routes (/@vite/*, /@fs/*, /@id/*, /src/*, /node_modules/*)
// and either responds with 404 (bypassing Vite entirely) or applies netlify.toml headers
// (CSP, nosniff) that break ES module loading. This plugin wraps the Netlify middleware
// to skip it for Vite-internal routes.
function netlifyDevBypass() {
  return {
    name: 'netlify-dev-bypass',
    configureServer(server) {
      // Return a post-hook -- runs after all plugins have set up their middlewares
      return () => {
        const stack = server.middlewares.stack;
        for (let i = 0; i < stack.length; i++) {
          const layer = stack[i];
          if (layer.handle && layer.handle.name === 'netlifyPreMiddleware') {
            const originalHandler = layer.handle;
            layer.handle = function wrappedNetlifyMiddleware(req, res, next) {
              const url = req.url || '';
              // Skip Netlify middleware for Vite-internal and source module routes
              if (url.startsWith('/@') || url.startsWith('/src/') ||
                  url.startsWith('/node_modules/') || url.startsWith('/api/') ||
                  url.includes('?v=') ||
                  url.includes('&t=') || url.endsWith('.ts') ||
                  url.endsWith('.tsx') || url.endsWith('.jsx') ||
                  url.includes('astro&type=')) {
                return next();
              }
              return originalHandler(req, res, next);
            };
            break;
          }
        }
      };
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    icon(),
    ...(process.env.NODE_ENV === 'production' ? [compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeComments: true,
      },
      Image: false, // We're handling images separately with sharp
      JavaScript: true,
      SVG: true,
      Logger: 1, // Minimal logging
    })] : []),
    // Sentry error tracking - only upload source maps in production with valid token
    ...(process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_AUTH_TOKEN !== 'placeholder'
      ? [sentry({
          sourceMapsUploadOptions: {
            telemetry: false,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        })]
      : [sentry({
          sourceMapsUploadOptions: {
            enabled: false,
            telemetry: false,
          },
        })]
    )
  ],
  adapter: netlify(),
  build: {
    inlineStylesheets: 'never', // Never inline for better caching
    assetsInlineLimit: 1024, // Inline only very small assets (1KB threshold)
    // Enable experimental optimizations
    split: true,
    // Minify output
    minify: true,
  },
  // Experimental flags removed - features may be stable in Astro 5.x or deprecated
  // experimental: {
  //   contentLayer: true,
  //   optimizeHoistedScript: true,
  // },
  image: {
    // Enable responsive images with srcset
    domains: [],
    formats: ['webp', 'avif'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  site: 'https://qdaria.com',
  output: 'server',
  vite: {
    plugins: [netlifyDevBypass()],
    build: {
      // Target modern browsers for smaller bundles (es2022 supports top-level await)
      target: 'es2022',
      cssCodeSplit: true,
      cssMinify: true,
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
      // Note: Custom rollupOptions output removed - interferes with Netlify adapter's internal SSR files
    },
    ssr: {
      noExternal: [
        'chart.js',
        'react-chartjs-2',
        'recharts',
        '@nivo/core',
        '@nivo/pie',
        '@nivo/sunburst',
        '@nivo/bar',
        '@nivo/line',
        '@nivo/radar'
      ],
      external: ['echarts-gl', 'echarts']
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@react-three/fiber', '@react-three/drei', 'three']
    },
    // Enable build-time CSS extraction
    css: {
      devSourcemap: false,
    },
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@': '/src',
        '@/lib/utils': '/src/components/pitch-deck/lib/utils',
        '@/lib': '/src/lib',
        '@/styles': '/src/styles',
        '@js': '/src/js',
        '@config': '/src/config',
        '@images': '/src/assets/images'
      }
    }
  },
  server: {
    host: true, // Listen on all available network interfaces
    port: 4321, // Explicitly set the default port
    // Disable compression in dev mode to prevent double encoding (gzip+br)
    compress: false,
    // CSP headers only in production (Vite dev server needs unrestricted module loading)
    headers: process.env.NODE_ENV === 'production' ? {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
        img-src 'self' data: https:;
        font-src 'self' data: https://fonts.gstatic.com;
        connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
      `.replace(/\s+/g, ' ').trim()
    } : {}
  }
});