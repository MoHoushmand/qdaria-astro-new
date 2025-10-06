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
      include: ['**/react/*', '**/pitch-deck/*'],
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
          manualChunks: (id) => {
            // Core vendor splitting - smaller chunks for better caching
            if (id.includes('node_modules')) {
              // React core - critical, load first
              if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler')) {
                return 'vendor-react-core';
              }
              // Chart libraries - heavy, load on demand
              if (id.includes('recharts') || id.includes('@nivo')) {
                return 'vendor-charts-primary';
              }
              if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
                return 'vendor-charts-secondary';
              }
              if (id.includes('echarts') || id.includes('plotly')) {
                return 'vendor-charts-advanced';
              }
              // Icon libraries
              if (id.includes('lucide-react') || id.includes('@radix-ui/react-icons')) {
                return 'vendor-icons';
              }
              // UI component libraries
              if (id.includes('@radix-ui')) {
                return 'vendor-radix-ui';
              }
              // 3D libraries - very heavy
              if (id.includes('three') || id.includes('@react-three')) {
                return 'vendor-three-js';
              }
              // Animation libraries
              if (id.includes('gsap') || id.includes('framer-motion')) {
                return 'vendor-animation';
              }
              // D3 and visualization
              if (id.includes('d3-') || id.includes('@visx')) {
                return 'vendor-d3-visx';
              }
              // Other vendors
              return 'vendor-misc';
            }

            // Ultra-aggressive slide chunking - each slide is its own chunk
            if (id.includes('pitch-deck/')) {
              // Critical first slide - inline this
              if (id.includes('TitleSlide')) return 'slide-01-title';

              // Individual slides for maximum lazy loading
              if (id.includes('ProblemSlide') || id.includes('EnhancedProblemSlide')) return 'slide-02-problem';
              if (id.includes('SolutionSlide') || id.includes('EnhancedSolutionSlide')) return 'slide-03-solution';
              if (id.includes('MarketSlide')) return 'slide-04-market';
              if (id.includes('BusinessModelSlide') || id.includes('EnhancedBusinessModelSlide')) return 'slide-05-business';
              if (id.includes('RevenueStreamsSlide')) return 'slide-06-revenue';
              if (id.includes('ProductPortfolioSlide')) return 'slide-07-product';
              if (id.includes('TechnologySlide')) return 'slide-08-tech';
              if (id.includes('TractionSlide')) return 'slide-09-traction';
              if (id.includes('CustomerValidationSlide')) return 'slide-10-customer';
              if (id.includes('GoToMarketSlide')) return 'slide-11-gtm';
              if (id.includes('IPPatentsSlide')) return 'slide-12-ip';
              if (id.includes('TeamSlide') || id.includes('EnhancedTeamSlide')) return 'slide-13-team';
              if (id.includes('FinancialsSlide')) return 'slide-14-financials';
              if (id.includes('CompetitiveSlide')) return 'slide-15-competitive';
              if (id.includes('RiskMitigationSlide')) return 'slide-16-risk';
              if (id.includes('InvestorFAQSlide')) return 'slide-17-faq';
              if (id.includes('CallToActionSlide')) return 'slide-18-cta';

              // UI components
              if (id.includes('pitch-deck/ui/')) {
                return 'ui-components';
              }

              // Chart components
              if (id.includes('pitch-deck/charts/')) {
                return 'chart-components';
              }

              // Shared utilities
              if (id.includes('pitch-deck/lib/')) {
                return 'pitch-utilities';
              }

              // Fallback
              return 'slides-misc';
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['chart.js', 'react-chartjs-2', 'recharts'],
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
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
      `.replace(/\s+/g, ' ').trim()
    }
  }
});
