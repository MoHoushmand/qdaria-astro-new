#!/usr/bin/env node

/**
 * Bundle Analyzer Script
 * Analyzes build output and generates bundle size reports
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');
const REPORT_DIR = path.join(__dirname, '../performance-reports');

// Size thresholds (in KB)
const THRESHOLDS = {
  totalJS: 500, // Total JS should be under 500KB
  totalCSS: 100, // Total CSS should be under 100KB
  largestChunk: 200, // Largest chunk should be under 200KB
};

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function analyzeDirectory(dirPath, basePath = dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await analyzeDirectory(fullPath, basePath);
      files.push(...subFiles);
    } else {
      const size = await getFileSize(fullPath);
      const relativePath = path.relative(basePath, fullPath);
      const ext = path.extname(entry.name).toLowerCase();

      files.push({
        name: entry.name,
        path: relativePath,
        size,
        ext,
      });
    }
  }

  return files;
}

function formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

function getFileType(ext) {
  const types = {
    '.js': 'JavaScript',
    '.mjs': 'JavaScript',
    '.css': 'CSS',
    '.html': 'HTML',
    '.webp': 'Image',
    '.avif': 'Image',
    '.png': 'Image',
    '.jpg': 'Image',
    '.jpeg': 'Image',
    '.svg': 'Image',
    '.woff2': 'Font',
    '.woff': 'Font',
    '.ttf': 'Font',
    '.json': 'Data',
  };
  return types[ext] || 'Other';
}

async function analyzeBundles() {
  console.log('📦 Analyzing bundle sizes...\n');

  try {
    // Check if dist directory exists
    await fs.access(DIST_DIR);
  } catch {
    console.error('❌ Build directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Ensure report directory exists
  await fs.mkdir(REPORT_DIR, { recursive: true });

  // Analyze all files
  const files = await analyzeDirectory(DIST_DIR);

  // Group by type
  const byType = files.reduce((acc, file) => {
    const type = getFileType(file.ext);
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(file);
    return acc;
  }, {});

  // Calculate totals
  const totals = Object.entries(byType).map(([type, typeFiles]) => ({
    type,
    count: typeFiles.length,
    size: typeFiles.reduce((sum, f) => sum + f.size, 0),
    files: typeFiles.sort((a, b) => b.size - a.size),
  }));

  // Display summary
  console.log('📊 Bundle Size Analysis\n');
  console.log('━'.repeat(80));
  console.log('Type'.padEnd(20) + 'Files'.padEnd(15) + 'Total Size'.padEnd(20) + 'Status');
  console.log('━'.repeat(80));

  let totalSize = 0;
  for (const { type, count, size } of totals.sort((a, b) => b.size - a.size)) {
    totalSize += size;
    const sizeKB = size / 1024;
    let status = '✅';

    // Check thresholds
    if (type === 'JavaScript' && sizeKB > THRESHOLDS.totalJS) {
      status = '❌';
    } else if (type === 'CSS' && sizeKB > THRESHOLDS.totalCSS) {
      status = '⚠️';
    }

    console.log(
      type.padEnd(20) +
      count.toString().padEnd(15) +
      formatSize(size).padEnd(20) +
      status
    );
  }

  console.log('━'.repeat(80));
  console.log('Total'.padEnd(20) + files.length.toString().padEnd(15) + formatSize(totalSize));
  console.log();

  // Display largest files
  console.log('📈 Largest Files\n');
  console.log('━'.repeat(80));
  console.log('File'.padEnd(50) + 'Size'.padEnd(20) + 'Status');
  console.log('━'.repeat(80));

  const largestFiles = files
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  for (const file of largestFiles) {
    const sizeKB = file.size / 1024;
    let status = '✅';

    if (file.ext === '.js' && sizeKB > THRESHOLDS.largestChunk) {
      status = '⚠️';
    }

    const displayName = file.name.length > 45
      ? '...' + file.name.slice(-42)
      : file.name;

    console.log(
      displayName.padEnd(50) +
      formatSize(file.size).padEnd(20) +
      status
    );
  }
  console.log();

  // Recommendations
  console.log('💡 Recommendations\n');
  console.log('━'.repeat(80));

  const jsTotal = totals.find(t => t.type === 'JavaScript')?.size || 0;
  const cssTotal = totals.find(t => t.type === 'CSS')?.size || 0;
  const jsKB = jsTotal / 1024;
  const cssKB = cssTotal / 1024;

  const recommendations = [];

  if (jsKB > THRESHOLDS.totalJS) {
    recommendations.push({
      priority: 'HIGH',
      message: `Total JavaScript size (${jsKB.toFixed(2)} KB) exceeds threshold (${THRESHOLDS.totalJS} KB)`,
      actions: [
        'Enable more aggressive code splitting',
        'Lazy load chart libraries on demand',
        'Review and remove unused dependencies',
      ],
    });
  }

  if (cssKB > THRESHOLDS.totalCSS) {
    recommendations.push({
      priority: 'MEDIUM',
      message: `Total CSS size (${cssKB.toFixed(2)} KB) exceeds threshold (${THRESHOLDS.totalCSS} KB)`,
      actions: [
        'Purge unused Tailwind classes',
        'Extract critical CSS',
        'Minify CSS output',
      ],
    });
  }

  const largeChunks = files.filter(
    f => f.ext === '.js' && f.size / 1024 > THRESHOLDS.largestChunk
  );

  if (largeChunks.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      message: `${largeChunks.length} JavaScript chunk(s) exceed size threshold`,
      actions: [
        'Split large vendor libraries',
        'Implement dynamic imports',
        'Use module federation for shared dependencies',
      ],
    });
  }

  if (recommendations.length === 0) {
    console.log('✅ All bundle sizes are within acceptable thresholds!\n');
  } else {
    for (const rec of recommendations) {
      console.log(`⚡ [${rec.priority}] ${rec.message}`);
      rec.actions.forEach(action => {
        console.log(`     • ${action}`);
      });
      console.log();
    }
  }

  // Save detailed report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(REPORT_DIR, `bundle-analysis-${timestamp}.json`);

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: files.length,
      totalSize: totalSize,
      totalSizeFormatted: formatSize(totalSize),
    },
    byType: totals,
    largestFiles: largestFiles.map(f => ({
      name: f.name,
      path: f.path,
      size: f.size,
      sizeFormatted: formatSize(f.size),
    })),
    recommendations,
    thresholds: THRESHOLDS,
  };

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log('📋 Summary\n');
  console.log('━'.repeat(80));
  console.log(`  Detailed report saved to: ${reportPath}\n`);

  // Exit code based on recommendations
  return recommendations.filter(r => r.priority === 'HIGH').length > 0 ? 1 : 0;
}

// Run the analyzer
analyzeBundles()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
