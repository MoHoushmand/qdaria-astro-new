import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      }
    }),
    react(),
    mdx(),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: false, // We're handling images separately
      JavaScript: true,
      SVG: true,
    })
  ],
  build: {
    inlineStylesheets: 'auto',
    // Split CSS for better caching
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          'vendor-gsap': ['gsap'],
        },
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
    ssr: {
      noExternal: ['chart.js', 'react-chartjs-2']
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@': '/src',
        '@/lib': '/src/lib',
        '@/styles': '/src/styles',
        '@/components': '/src/components',
        '@js': '/src/js',
        '@config': '/src/config',
        '@images': '/src/assets/images'
      }
    }
  },
  server: {
    host: true, // Listen on all available network interfaces
    port: 4321, // Explicitly set the default port
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
      `.replace(/\s+/g, ' ').trim()
    }
  }
});
