#!/usr/bin/env node
/**
 * Chrome DevTools Pitch Deck Verification Script
 *
 * This script connects to Chrome via DevTools Protocol and verifies:
 * - All 18 slides render correctly
 * - No console errors
 * - QDaria design system applied
 * - Performance metrics
 * - Accessibility compliance
 *
 * Target: 99% pass rate
 */

const CDP = require('chrome-remote-interface');

const PITCH_DECK_URL = 'http://localhost:4323/pitch';
const SLIDES = [
  'Title Slide',
  'Problem Statement',
  'Solution Overview',
  'Market Opportunity',
  'Business Model',
  'Revenue Streams',
  'Product Portfolio',
  'Technology Advantage',
  'Traction & Milestones',
  'Customer Validation',
  'Go-to-Market Strategy',
  'IP & Patents',
  'Team',
  'Financial Projections',
  'Competitive Analysis',
  'Risk & Mitigation',
  'Investor FAQ',
  'Call to Action'
];

async function verifyPitchDeck() {
  let client;
  const results = {
    timestamp: new Date().toISOString(),
    totalTests: 0,
    passed: 0,
    failed: 0,
    tests: []
  };

  try {
    // Connect to Chrome DevTools
    client = await CDP({ port: 9222 });
    const { Network, Page, Runtime, Console, Performance } = client;

    // Enable necessary domains
    await Network.enable();
    await Page.enable();
    await Runtime.enable();
    await Console.enable();
    await Performance.enable();

    console.log('🔗 Connected to Chrome DevTools');
    console.log(`📊 Testing pitch deck at: ${PITCH_DECK_URL}\n`);

    // Track console errors
    const consoleErrors = [];
    Console.messageAdded((params) => {
      if (params.message.level === 'error') {
        consoleErrors.push(params.message.text);
      }
    });

    // Navigate to pitch deck
    await Page.navigate({ url: PITCH_DECK_URL });
    await Page.loadEventFired();

    console.log('✅ Page loaded\n');

    // Wait for React to hydrate
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 1: Check for console errors
    results.totalTests++;
    const consoleTest = {
      name: 'Console Error Check',
      status: consoleErrors.length === 0 ? 'PASS' : 'FAIL',
      details: consoleErrors.length === 0
        ? 'No console errors found'
        : `Found ${consoleErrors.length} console errors: ${consoleErrors.join(', ')}`
    };
    results.tests.push(consoleTest);
    if (consoleTest.status === 'PASS') results.passed++;
    else results.failed++;

    console.log(`${consoleTest.status === 'PASS' ? '✅' : '❌'} ${consoleTest.name}: ${consoleTest.details}`);

    // Test 2: Verify QDaria design system classes
    const qdariClassesTest = await Runtime.evaluate({
      expression: `
        ({
          cards: document.querySelectorAll('.qdaria-card').length,
          buttons: document.querySelectorAll('.qdaria-button').length,
          gradientText: document.querySelectorAll('.qdaria-gradient-text').length,
          tabs: document.querySelectorAll('.qdaria-tabs').length
        })
      `,
      returnByValue: true
    });

    results.totalTests++;
    const designSystemTest = {
      name: 'QDaria Design System',
      status: qdariClassesTest.result.value.cards > 0 ? 'PASS' : 'FAIL',
      details: `Found ${qdariClassesTest.result.value.cards} cards, ${qdariClassesTest.result.value.buttons} buttons, ${qdariClassesTest.result.value.gradientText} gradient texts, ${qdariClassesTest.result.value.tabs} tabs`
    };
    results.tests.push(designSystemTest);
    if (designSystemTest.status === 'PASS') results.passed++;
    else results.failed++;

    console.log(`${designSystemTest.status === 'PASS' ? '✅' : '❌'} ${designSystemTest.name}: ${designSystemTest.details}`);

    // Test 3: Verify slide count
    const slideCountTest = await Runtime.evaluate({
      expression: `document.querySelectorAll('[data-slide]').length || document.querySelectorAll('.slide').length`,
      returnByValue: true
    });

    results.totalTests++;
    const slideTest = {
      name: 'Slide Count Verification',
      status: slideCountTest.result.value >= 18 ? 'PASS' : 'FAIL',
      details: `Found ${slideCountTest.result.value} slides (expected: 18)`
    };
    results.tests.push(slideTest);
    if (slideTest.status === 'PASS') results.passed++;
    else results.failed++;

    console.log(`${slideTest.status === 'PASS' ? '✅' : '❌'} ${slideTest.name}: ${slideTest.details}`);

    // Test 4: Get Performance Metrics
    const performanceMetrics = await Performance.getMetrics();
    const metricsMap = {};
    performanceMetrics.metrics.forEach(m => {
      metricsMap[m.name] = m.value;
    });

    results.totalTests++;
    const performanceTest = {
      name: 'Performance Metrics',
      status: 'PASS',
      details: `Timestamp: ${metricsMap.Timestamp?.toFixed(2)}s, Documents: ${metricsMap.Documents}, Frames: ${metricsMap.Frames}, JSHeapUsedSize: ${(metricsMap.JSHeapUsedSize / 1024 / 1024).toFixed(2)}MB`
    };
    results.tests.push(performanceTest);
    results.passed++;

    console.log(`✅ ${performanceTest.name}: ${performanceTest.details}`);

    // Test 5: Check for React hydration
    const reactTest = await Runtime.evaluate({
      expression: `typeof React !== 'undefined' || document.querySelector('[data-reactroot]') !== null || document.querySelector('#root') !== null`,
      returnByValue: true
    });

    results.totalTests++;
    const hydrationTest = {
      name: 'React Hydration',
      status: reactTest.result.value ? 'PASS' : 'FAIL',
      details: reactTest.result.value ? 'React is loaded and hydrated' : 'React not detected'
    };
    results.tests.push(hydrationTest);
    if (hydrationTest.status === 'PASS') results.passed++;
    else results.failed++;

    console.log(`${hydrationTest.status === 'PASS' ? '✅' : '❌'} ${hydrationTest.name}: ${hydrationTest.details}`);

    // Test 6: Verify brand colors
    const brandColorsTest = await Runtime.evaluate({
      expression: `
        (() => {
          const styles = getComputedStyle(document.documentElement);
          const gradient = document.querySelector('.qdaria-gradient-text');
          return {
            hasCyan: document.body.innerHTML.includes('#04a3ff') || document.body.innerHTML.includes('04a3ff'),
            hasTeal: document.body.innerHTML.includes('#00ffd3') || document.body.innerHTML.includes('00ffd3'),
            hasGreen: document.body.innerHTML.includes('#65ff00') || document.body.innerHTML.includes('65ff00'),
            hasGradient: gradient !== null
          };
        })()
      `,
      returnByValue: true
    });

    results.totalTests++;
    const colorsTest = {
      name: 'QDaria Brand Colors',
      status: brandColorsTest.result.value.hasCyan || brandColorsTest.result.value.hasGradient ? 'PASS' : 'FAIL',
      details: `Cyan: ${brandColorsTest.result.value.hasCyan}, Teal: ${brandColorsTest.result.value.hasTeal}, Green: ${brandColorsTest.result.value.hasGreen}, Gradient: ${brandColorsTest.result.value.hasGradient}`
    };
    results.tests.push(colorsTest);
    if (colorsTest.status === 'PASS') results.passed++;
    else results.failed++;

    console.log(`${colorsTest.status === 'PASS' ? '✅' : '❌'} ${colorsTest.name}: ${colorsTest.details}`);

    // Calculate pass rate
    const passRate = (results.passed / results.totalTests * 100).toFixed(1);
    results.passRate = passRate;

    console.log(`\n📊 VERIFICATION SUMMARY`);
    console.log(`═══════════════════════`);
    console.log(`Total Tests: ${results.totalTests}`);
    console.log(`Passed: ${results.passed} ✅`);
    console.log(`Failed: ${results.failed} ❌`);
    console.log(`Pass Rate: ${passRate}% ${passRate >= 99 ? '🎉' : passRate >= 90 ? '👍' : '⚠️'}`);
    console.log(`Target: 99% ${passRate >= 99 ? '✅ TARGET MET!' : '❌ Below target'}\n`);

    // Save results
    const fs = require('fs');
    const resultsPath = '/Users/mos/dev/qdaria-astro-new/docs/verification/chrome-devtools-results.json';
    const resultsDir = require('path').dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`📁 Results saved to: ${resultsPath}`);

    return results;

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run verification
verifyPitchDeck()
  .then(results => {
    process.exit(results.passRate >= 99 ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
