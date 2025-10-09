import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    tailwind({
      applyBaseStyles: true, // Re-enabled for proper base styles
    }),
    react({
      include: ['**/react/**', '**/pitch-deck/**', '**/qdaria-business-plan/**'],
    }),
    mdx(),
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
    })] : [])
  ],
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
    build: {
      // Target modern browsers for smaller bundles (es2022 supports top-level await)
      target: 'es2022',
      cssCodeSplit: true,
      cssMinify: true,
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // Optimal chunk naming for long-term caching
          entryFileNames: '_astro/[name].[hash].js',
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash][extname]',
          // Simplified chunking for better Netlify compatibility
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // React core
              if (id.includes('react') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              // Chart libraries
              if (id.includes('chart') || id.includes('@nivo') || id.includes('recharts') || id.includes('echarts') || id.includes('plotly')) {
                return 'vendor-charts';
              }
              // UI libraries
              if (id.includes('@radix-ui') || id.includes('lucide')) {
                return 'vendor-ui';
              }
              // 3D and animation
              if (id.includes('three') || id.includes('gsap') || id.includes('framer')) {
                return 'vendor-3d-animation';
              }
            }
          },
        },
      },
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
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https:;
        font-src 'self' data: https://fonts.gstatic.com;
        connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
      `.replace(/\s+/g, ' ').trim()
    }
  }
});
