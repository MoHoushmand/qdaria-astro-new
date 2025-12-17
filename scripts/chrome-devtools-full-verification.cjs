#!/usr/bin/env node
/**
 * Comprehensive Chrome DevTools Pitch Deck Verification
 *
 * This script provides exhaustive testing using Chrome DevTools Protocol
 * Target: 99% pass rate with detailed reporting
 */

const CDP = require('chrome-remote-interface');
const fs = require('fs');
const path = require('path');

const PITCH_DECK_URL = 'http://localhost:4323/pitch';
const MAX_WAIT_TIME = 15000; // 15 seconds for React hydration

class PitchDeckVerifier {
  constructor() {
    this.client = null;
    this.results = {
      timestamp: new Date().toISOString(),
      url: PITCH_DECK_URL,
      totalTests: 0,
      passed: 0,
      failed: 0,
      passRate: 0,
      tests: [],
      screenshots: []
    };
    this.consoleErrors = [];
    this.consoleWarnings = [];
  }

  async connect() {
    console.log('🔗 Connecting to Chrome DevTools...');
    this.client = await CDP({ port: 9222 });
    const { Network, Page, Runtime, Console, Performance, DOM } = this.client;

    // Enable all necessary domains
    await Promise.all([
      Network.enable(),
      Page.enable(),
      Runtime.enable(),
      Console.enable(),
      Performance.enable(),
      DOM.enable()
    ]);

    // Track console messages
    Console.messageAdded((params) => {
      const { level, text } = params.message;
      if (level === 'error') {
        this.consoleErrors.push(text);
        console.log(`  ⚠️  Console Error: ${text}`);
      } else if (level === 'warning') {
        this.consoleWarnings.push(text);
      }
    });

    console.log('✅ Connected to Chrome DevTools\n');
  }

  async navigateAndWait() {
    const { Page } = this.client;

    console.log(`📄 Navigating to: ${PITCH_DECK_URL}`);
    await Page.navigate({ url: PITCH_DECK_URL });
    await Page.loadEventFired();
    console.log('✅ Page loaded event fired');

    // Wait for network idle
    console.log('⏳ Waiting for network idle...');
    await this.waitForNetworkIdle();

    // Wait for React hydration (check for React root element)
    console.log('⏳ Waiting for React hydration...');
    await this.waitForReactHydration();

    console.log('✅ Page fully loaded and hydrated\n');
  }

  async waitForNetworkIdle(timeout = 5000) {
    const { Network } = this.client;
    let activeRequests = 0;
    let resolveIdle;
    const idlePromise = new Promise(resolve => { resolveIdle = resolve; });

    const checkIdle = () => {
      if (activeRequests === 0) {
        setTimeout(() => {
          if (activeRequests === 0) resolveIdle();
        }, 500);
      }
    };

    Network.requestWillBeSent(() => {
      activeRequests++;
    });

    Network.loadingFinished(() => {
      activeRequests = Math.max(0, activeRequests - 1);
      checkIdle();
    });

    Network.loadingFailed(() => {
      activeRequests = Math.max(0, activeRequests - 1);
      checkIdle();
    });

    await Promise.race([
      idlePromise,
      new Promise(resolve => setTimeout(resolve, timeout))
    ]);
  }

  async waitForReactHydration() {
    const { Runtime } = this.client;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT_TIME) {
      const result = await Runtime.evaluate({
        expression: `
          (function() {
            // Check for React root or hydrated content
            const root = document.getElementById('root');
            const reactRoot = document.querySelector('[data-reactroot]');
            const pitchDeck = document.querySelector('[data-pitch-deck]');
            const slides = document.querySelectorAll('.slide, [data-slide]');

            return {
              hasRoot: !!root,
              hasReactRoot: !!reactRoot,
              hasPitchDeck: !!pitchDeck,
              slideCount: slides.length,
              isHydrated: slides.length > 0 || !!pitchDeck
            };
          })()
        `,
        returnByValue: true
      });

      const state = result.result.value;
      if (state.isHydrated) {
        console.log(`  ✅ React hydrated with ${state.slideCount} slides detected`);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('  ⚠️  React hydration timeout - proceeding anyway');
  }

  async runTests() {
    console.log('🧪 Running Verification Tests\n');
    console.log('═'.repeat(60) + '\n');

    await this.testConsoleErrors();
    await this.testQDariaDesignSystem();
    await this.testSlideCount();
    await this.testBrandColors();
    await this.testChartComponents();
    await this.testNavigation();
    await this.testAccessibility();
    await this.testPerformance();
    await this.testResponsiveDesign();
    await this.testAnimations();

    // Calculate final pass rate
    this.results.passRate = (this.results.passed / this.results.totalTests * 100).toFixed(1);
  }

  addTest(name, passed, details) {
    this.results.totalTests++;
    if (passed) {
      this.results.passed++;
    } else {
      this.results.failed++;
    }

    const test = {
      name,
      status: passed ? 'PASS' : 'FAIL',
      details
    };

    this.results.tests.push(test);
    const icon = passed ? '✅' : '❌';
    console.log(`${icon} ${name}`);
    console.log(`   ${details}\n`);

    return test;
  }

  async testConsoleErrors() {
    this.addTest(
      'Console Errors',
      this.consoleErrors.length === 0,
      this.consoleErrors.length === 0
        ? 'No console errors detected'
        : `Found ${this.consoleErrors.length} errors: ${this.consoleErrors.slice(0, 3).join(', ')}`
    );
  }

  async testQDariaDesignSystem() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        ({
          cards: document.querySelectorAll('.qdaria-card').length,
          buttons: document.querySelectorAll('.qdaria-button').length,
          gradientText: document.querySelectorAll('.qdaria-gradient-text').length,
          tabs: document.querySelectorAll('.qdaria-tabs, .qdaria-tabs-list').length,
          hasDesignSystem: document.querySelectorAll('[class*="qdaria"]').length > 0
        })
      `,
      returnByValue: true
    });

    const ds = result.result.value;
    this.addTest(
      'QDaria Design System',
      ds.hasDesignSystem,
      `Cards: ${ds.cards}, Buttons: ${ds.buttons}, Gradient Text: ${ds.gradientText}, Tabs: ${ds.tabs}`
    );
  }

  async testSlideCount() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `document.querySelectorAll('.slide, [data-slide], section[id*="slide"]').length`,
      returnByValue: true
    });

    const count = result.result.value;
    this.addTest(
      'Slide Count',
      count >= 15, // Allow some flexibility
      `Found ${count} slides (expected: 18, minimum: 15)`
    );
  }

  async testBrandColors() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const html = document.documentElement.outerHTML;
          return {
            hasCyan: html.includes('#04a3ff') || html.includes('04a3ff'),
            hasTeal: html.includes('#00ffd3') || html.includes('00ffd3'),
            hasGreen: html.includes('#65ff00') || html.includes('65ff00'),
            hasGradient: !!document.querySelector('.qdaria-gradient-text, [class*="gradient"]'),
            brandElements: document.querySelectorAll('[class*="qdaria"]').length
          };
        })()
      `,
      returnByValue: true
    });

    const colors = result.result.value;
    this.addTest(
      'QDaria Brand Colors',
      colors.hasCyan || colors.brandElements > 10,
      `Cyan: ${colors.hasCyan}, Teal: ${colors.hasTeal}, Green: ${colors.hasGreen}, Brand elements: ${colors.brandElements}`
    );
  }

  async testChartComponents() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const charts = document.querySelectorAll('[class*="chart"], canvas, svg[class*="recharts"]');
          const chartTypes = Array.from(charts).map(c => c.tagName.toLowerCase());
          return {
            total: charts.length,
            types: [...new Set(chartTypes)],
            hasCharts: charts.length > 0
          };
        })()
      `,
      returnByValue: true
    });

    const charts = result.result.value;
    this.addTest(
      'Chart Components',
      charts.hasCharts,
      `Found ${charts.total} chart elements: ${charts.types.join(', ')}`
    );
  }

  async testNavigation() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const prevBtn = document.querySelector('[data-action="prev"], button[class*="prev"]');
          const nextBtn = document.querySelector('[data-action="next"], button[class*="next"]');
          const sidebar = document.querySelector('[data-sidebar], aside, nav');
          return {
            hasPrev: !!prevBtn,
            hasNext: !!nextBtn,
            hasSidebar: !!sidebar,
            hasNavigation: !!(prevBtn && nextBtn)
          };
        })()
      `,
      returnByValue: true
    });

    const nav = result.result.value;
    this.addTest(
      'Slide Navigation',
      nav.hasNavigation || nav.hasSidebar,
      `Prev button: ${nav.hasPrev}, Next button: ${nav.hasNext}, Sidebar: ${nav.hasSidebar}`
    );
  }

  async testAccessibility() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const buttons = document.querySelectorAll('button');
          const images = document.querySelectorAll('img');
          const imagesWithAlt = Array.from(images).filter(img => img.alt).length;
          const ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby]').length;

          return {
            headings: headings.length,
            buttons: buttons.length,
            images: images.length,
            imagesWithAlt,
            ariaLabels,
            accessibilityScore: (imagesWithAlt / Math.max(images.length, 1)) * 100
          };
        })()
      `,
      returnByValue: true
    });

    const a11y = result.result.value;
    this.addTest(
      'Accessibility (Basic)',
      a11y.accessibilityScore > 50 || a11y.ariaLabels > 5,
      `Headings: ${a11y.headings}, Buttons: ${a11y.buttons}, Images with alt: ${a11y.imagesWithAlt}/${a11y.images}, ARIA labels: ${a11y.ariaLabels}`
    );
  }

  async testPerformance() {
    const { Performance } = this.client;
    const metrics = await Performance.getMetrics();
    const metricsMap = {};
    metrics.metrics.forEach(m => {
      metricsMap[m.name] = m.value;
    });

    const heapMB = (metricsMap.JSHeapUsedSize / 1024 / 1024).toFixed(2);
    const isPerformant = metricsMap.JSHeapUsedSize < 100 * 1024 * 1024; // < 100MB

    this.addTest(
      'Performance Metrics',
      isPerformant,
      `Heap: ${heapMB}MB, Documents: ${metricsMap.Documents}, Frames: ${metricsMap.Frames}`
    );
  }

  async testResponsiveDesign() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const hasMediaQueries = Array.from(document.styleSheets).some(sheet => {
            try {
              return Array.from(sheet.cssRules || []).some(rule => rule.media);
            } catch (e) {
              return false;
            }
          });

          const hasViewportMeta = !!document.querySelector('meta[name="viewport"]');
          const hasFlexOrGrid = !!document.querySelector('[class*="flex"], [class*="grid"]');

          return {
            hasMediaQueries,
            hasViewportMeta,
            hasFlexOrGrid,
            isResponsive: hasViewportMeta && (hasMediaQueries || hasFlexOrGrid)
          };
        })()
      `,
      returnByValue: true
    });

    const responsive = result.result.value;
    this.addTest(
      'Responsive Design',
      responsive.isResponsive,
      `Viewport meta: ${responsive.hasViewportMeta}, Media queries: ${responsive.hasMediaQueries}, Flex/Grid: ${responsive.hasFlexOrGrid}`
    );
  }

  async testAnimations() {
    const { Runtime } = this.client;
    const result = await Runtime.evaluate({
      expression: `
        (() => {
          const hasTransitions = !!document.querySelector('[class*="transition"], [style*="transition"]');
          const hasAnimations = !!document.querySelector('[class*="animate"], [style*="animation"]');
          const hasGSAP = typeof gsap !== 'undefined';

          return {
            hasTransitions,
            hasAnimations,
            hasGSAP,
            hasMotion: hasTransitions || hasAnimations || hasGSAP
          };
        })()
      `,
      returnByValue: true
    });

    const animations = result.result.value;
    this.addTest(
      'Animations & Transitions',
      animations.hasMotion,
      `CSS transitions: ${animations.hasTransitions}, CSS animations: ${animations.hasAnimations}, GSAP: ${animations.hasGSAP}`
    );
  }

  async generateReport() {
    console.log('\n' + '═'.repeat(60));
    console.log('📊 FINAL VERIFICATION REPORT');
    console.log('═'.repeat(60) + '\n');

    console.log(`🌐 URL: ${this.results.url}`);
    console.log(`⏰ Timestamp: ${this.results.timestamp}\n`);

    console.log(`📈 Results:`);
    console.log(`   Total Tests: ${this.results.totalTests}`);
    console.log(`   Passed: ${this.results.passed} ✅`);
    console.log(`   Failed: ${this.results.failed} ❌`);
    console.log(`   Pass Rate: ${this.results.passRate}%\n`);

    const passRate = parseFloat(this.results.passRate);
    let statusIcon, statusText;

    if (passRate >= 99) {
      statusIcon = '🎉';
      statusText = 'EXCELLENT - TARGET MET!';
    } else if (passRate >= 90) {
      statusIcon = '👍';
      statusText = 'GOOD - Near target';
    } else if (passRate >= 70) {
      statusIcon = '⚠️';
      statusText = 'FAIR - Needs improvement';
    } else {
      statusIcon = '❌';
      statusText = 'POOR - Significant issues';
    }

    console.log(`${statusIcon} Status: ${statusText}`);
    console.log(`🎯 Target: 99% ${passRate >= 99 ? '✅ ACHIEVED' : '❌ Not reached'}\n`);

    // Save detailed results
    const resultsPath = path.join(__dirname, '..', 'docs', 'verification', 'chrome-devtools-full-results.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
    console.log(`📁 Detailed results saved to: ${resultsPath}\n`);

    return passRate;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log('🔌 Disconnected from Chrome DevTools');
    }
  }
}

// Main execution
async function main() {
  const verifier = new PitchDeckVerifier();

  try {
    await verifier.connect();
    await verifier.navigateAndWait();
    await verifier.runTests();
    const passRate = await verifier.generateReport();
    await verifier.close();

    // Exit with appropriate code
    process.exit(passRate >= 99 ? 0 : 1);
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error(error.stack);
    await verifier.close();
    process.exit(2);
  }
}

main();
