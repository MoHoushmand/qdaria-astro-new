import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
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
  output: 'static',
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
          entryFileNames: '_astro/[name].[hash].js',
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash][extname]',
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
