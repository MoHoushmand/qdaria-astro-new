#!/usr/bin/env node
/**
 * Interactive database viewer for SQLite databases
 * Usage: node scripts/view-db-contents.js [database-path]
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.argv[2] || '.swarm/memory.db';

function viewDatabase(dbPath) {
  console.log('=' .repeat(80));
  console.log(`📊 DATABASE VIEWER: ${dbPath}`);
  console.log('='.repeat(80));

  try {
    if (!fs.existsSync(dbPath)) {
      console.error(`❌ Database not found: ${dbPath}`);
      process.exit(1);
    }

    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    // Database info
    const fileStats = fs.statSync(dbPath);
    console.log(`\n📁 File Info:`);
    console.log(`   Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Modified: ${fileStats.mtime.toLocaleString()}`);

    // Get all tables
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `).all();

    console.log(`\n📋 Tables (${tables.length}):`);
    console.log('─'.repeat(80));

    for (const table of tables) {
      const tableName = table.name;

      try {
        // Get row count
        const countResult = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get();
        const rowCount = countResult.count;

        // Get schema
        const schema = db.prepare(`PRAGMA table_info(${tableName})`).all();
        const columns = schema.map(col => `${col.name} (${col.type})`).join(', ');

        console.log(`\n📊 Table: ${tableName}`);
        console.log(`   Rows: ${rowCount.toLocaleString()}`);
        console.log(`   Columns: ${columns}`);

        // Show sample data (first 3 rows)
        if (rowCount > 0) {
          const sample = db.prepare(`SELECT * FROM ${tableName} LIMIT 3`).all();
          console.log(`   Sample data (first ${Math.min(3, rowCount)} rows):`);

          sample.forEach((row, idx) => {
            console.log(`\n   Row ${idx + 1}:`);
            for (const [key, value] of Object.entries(row)) {
              const displayValue = value !== null && typeof value === 'object'
                ? `[BLOB: ${Buffer.byteLength(value)} bytes]`
                : String(value).substring(0, 100);
              console.log(`      ${key}: ${displayValue}`);
            }
          });
        }

      } catch (error) {
        console.error(`   ❌ Error reading table: ${error.message}`);
      }
    }

    db.close();

    console.log('\n' + '='.repeat(80));
    console.log('✅ Database inspection complete!');
    console.log('\n💡 To export to JSON, run:');
    console.log(`   node scripts/export-db-to-json.js "${dbPath}"`);
    console.log('='.repeat(80));

  } catch (error) {
    console.error('❌ Failed to read database:', error.message);
    process.exit(1);
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  viewDatabase(DB_PATH);
}

export { viewDatabase };
