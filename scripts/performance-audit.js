#!/usr/bin/env node

/**
 * Performance Audit Script
 * Runs Lighthouse audits and generates performance reports
 */

import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';

const AUDIT_URL = process.env.AUDIT_URL || 'http://localhost:4321/pitch-deck';
const REPORT_DIR = path.join(process.cwd(), 'performance-reports');

// Lighthouse configuration
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
    formFactor: 'desktop',
  },
};

// Performance thresholds
const THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 90,
  'largest-contentful-paint': 2500, // ms
  'cumulative-layout-shift': 0.1,
  'total-blocking-time': 200, // ms
};

async function runLighthouseAudit() {
  console.log('🚀 Starting Lighthouse performance audit...\n');

  // Ensure report directory exists
  await fs.mkdir(REPORT_DIR, { recursive: true });

  // Launch Chrome
  console.log('📱 Launching Chrome...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });

  try {
    // Run Lighthouse
    console.log(`🔍 Auditing ${AUDIT_URL}...\n`);
    const { lhr, report } = await lighthouse(
      AUDIT_URL,
      {
        port: chrome.port,
        output: ['html', 'json'],
      },
      lighthouseConfig
    );

    // Save reports
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const htmlPath = path.join(REPORT_DIR, `lighthouse-${timestamp}.html`);
    const jsonPath = path.join(REPORT_DIR, `lighthouse-${timestamp}.json`);

    await fs.writeFile(htmlPath, report[0]);
    await fs.writeFile(jsonPath, report[1]);

    console.log('📊 Performance Report\n');
    console.log('━'.repeat(60));

    // Display scores
    const categories = lhr.categories;
    for (const [key, category] of Object.entries(categories)) {
      const score = category.score * 100;
      const threshold = THRESHOLDS[key] || 90;
      const status = score >= threshold ? '✅' : '❌';
      const color = score >= threshold ? '\x1b[32m' : '\x1b[31m';

      console.log(
        `${status} ${category.title.padEnd(25)} ${color}${score.toFixed(0)}%\x1b[0m (threshold: ${threshold}%)`
      );
    }

    console.log('\n📈 Core Web Vitals\n');
    console.log('━'.repeat(60));

    // Display key metrics
    const metrics = lhr.audits;
    const coreMetrics = [
      {
        key: 'largest-contentful-paint',
        name: 'Largest Contentful Paint',
        threshold: THRESHOLDS['largest-contentful-paint'],
        unit: 'ms',
      },
      {
        key: 'cumulative-layout-shift',
        name: 'Cumulative Layout Shift',
        threshold: THRESHOLDS['cumulative-layout-shift'],
        unit: '',
      },
      {
        key: 'total-blocking-time',
        name: 'Total Blocking Time',
        threshold: THRESHOLDS['total-blocking-time'],
        unit: 'ms',
      },
    ];

    for (const metric of coreMetrics) {
      const audit = metrics[metric.key];
      if (audit) {
        const value = audit.numericValue;
        const displayValue = audit.displayValue || `${value}${metric.unit}`;
        const status = value <= metric.threshold ? '✅' : '❌';
        const color = value <= metric.threshold ? '\x1b[32m' : '\x1b[31m';

        console.log(
          `${status} ${metric.name.padEnd(30)} ${color}${displayValue}\x1b[0m (threshold: ${metric.threshold}${metric.unit})`
        );
      }
    }

    // Bundle size analysis
    console.log('\n📦 Bundle Analysis\n');
    console.log('━'.repeat(60));

    const networkRequests = lhr.audits['network-requests'];
    if (networkRequests && networkRequests.details) {
      const items = networkRequests.details.items;

      // Calculate totals by type
      const totalsByType = items.reduce((acc, item) => {
        const type = item.resourceType || 'other';
        acc[type] = (acc[type] || 0) + (item.transferSize || 0);
        return acc;
      }, {});

      for (const [type, size] of Object.entries(totalsByType).sort((a, b) => b[1] - a[1])) {
        const sizeKB = (size / 1024).toFixed(2);
        console.log(`  ${type.padEnd(20)} ${sizeKB} KB`);
      }
    }

    // Opportunities
    console.log('\n💡 Opportunities\n');
    console.log('━'.repeat(60));

    const opportunities = Object.values(metrics).filter(
      (audit) => audit.details && audit.details.type === 'opportunity' && audit.score < 1
    );

    if (opportunities.length > 0) {
      opportunities
        .sort((a, b) => b.numericValue - a.numericValue)
        .slice(0, 5)
        .forEach((opp) => {
          console.log(`  ⚡ ${opp.title}`);
          console.log(`     Potential savings: ${opp.displayValue || 'N/A'}\n`);
        });
    } else {
      console.log('  ✅ No major optimization opportunities found!\n');
    }

    // Summary
    console.log('\n📋 Summary\n');
    console.log('━'.repeat(60));
    console.log(`  Report saved to: ${htmlPath}`);
    console.log(`  JSON data saved to: ${jsonPath}\n`);

    // Check if all thresholds passed
    const allPassed = Object.entries(categories).every(
      ([key, category]) => category.score * 100 >= (THRESHOLDS[key] || 90)
    );

    if (allPassed) {
      console.log('🎉 All performance thresholds met!\n');
      return 0;
    } else {
      console.log('⚠️  Some performance thresholds not met.\n');
      return 1;
    }

  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error);
    return 1;
  } finally {
    await chrome.kill();
  }
}

// Run the audit
runLighthouseAudit()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
