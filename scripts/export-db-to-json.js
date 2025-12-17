#!/usr/bin/env node
/**
 * Export SQLite databases to human-readable JSON format
 * Usage: node scripts/export-db-to-json.js [database-path] [output-path]
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default paths
const DB_PATH = process.argv[2] || '.swarm/memory.db';
const OUTPUT_PATH = process.argv[3] || 'docs/database-exports/memory-export.json';

function exportDatabase(dbPath, outputPath) {
  console.log(`📊 Exporting database: ${dbPath}`);

  try {
    // Check if database exists
    if (!fs.existsSync(dbPath)) {
      console.error(`❌ Database not found: ${dbPath}`);
      process.exit(1);
    }

    // Open database in read-only mode
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    // Get all tables
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `).all();

    console.log(`📋 Found ${tables.length} tables:`, tables.map(t => t.name).join(', '));

    const exportData = {
      exported_at: new Date().toISOString(),
      database_path: dbPath,
      tables: {}
    };

    // Export each table
    for (const table of tables) {
      const tableName = table.name;
      console.log(`   Exporting table: ${tableName}...`);

      try {
        // Get table schema
        const schema = db.prepare(`PRAGMA table_info(${tableName})`).all();

        // Get all rows (limit to prevent huge exports)
        const rows = db.prepare(`SELECT * FROM ${tableName} LIMIT 10000`).all();

        // Convert BLOB fields to base64 if present
        const cleanRows = rows.map(row => {
          const cleanRow = { ...row };
          for (const col of schema) {
            if (col.type === 'BLOB' && cleanRow[col.name]) {
              cleanRow[col.name] = `[BLOB: ${Buffer.byteLength(cleanRow[col.name])} bytes]`;
            }
          }
          return cleanRow;
        });

        exportData.tables[tableName] = {
          schema: schema,
          row_count: rows.length,
          rows: cleanRows
        };

        console.log(`   ✅ Exported ${rows.length} rows from ${tableName}`);
      } catch (error) {
        console.error(`   ❌ Error exporting table ${tableName}:`, error.message);
        exportData.tables[tableName] = {
          error: error.message
        };
      }
    }

    db.close();

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));

    console.log(`\n✅ Export complete!`);
    console.log(`📄 Output saved to: ${outputPath}`);
    console.log(`📊 Total size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

    return exportData;

  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

// Run export
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  exportDatabase(DB_PATH, OUTPUT_PATH);
}

export { exportDatabase };
