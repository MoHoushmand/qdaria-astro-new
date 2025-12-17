#!/usr/bin/env node

/**
 * Migration via Supabase SQL API
 * Uses pg library to connect directly to Supabase PostgreSQL database
 */

import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

// Extract database connection details from SUPABASE_URL
const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseUrl) {
  console.error('❌ SUPABASE_URL not found in .env');
  process.exit(1);
}

// Parse the project ref from URL: https://PROJECT_REF.supabase.co
const projectRef = supabaseUrl.replace('https://', '').split('.')[0];

console.log(`🔗 Connecting to Supabase project: ${projectRef}`);
console.log(`📍 Database host: aws-0-us-west-1.pooler.supabase.com\n`);

// Construct connection string
// Note: This requires the database password which isn't in .env
// Supabase database connection typically requires:
// postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres

console.log('⚠️  Direct database connection requires your Supabase database password.');
console.log('⚠️  The SUPABASE_ANON_KEY in .env is for REST API access, not direct PostgreSQL connection.\n');

console.log('📋 To add the coupon_code column, please use ONE of these methods:\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('METHOD 1: Supabase Dashboard (Recommended)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('1. Go to: https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new');
console.log('2. Paste this SQL:\n');
console.log('   ALTER TABLE waitlist');
console.log('   ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);');
console.log('');
console.log("   COMMENT ON COLUMN waitlist.coupon_code IS 'Optional promotional coupon code (e.g., BETA2026)';");
console.log('\n3. Click "Run" ▶️\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('METHOD 2: Supabase CLI');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('1. Install Supabase CLI: brew install supabase/tap/supabase');
console.log('2. Login: supabase login');
console.log('3. Link project: supabase link --project-ref uogbylfpxvklfpkkstsf');
console.log('4. Run migration: supabase db push\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('METHOD 3: psql (if you have database password)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`psql "postgresql://postgres.${projectRef}:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres" -c "ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);"`);
console.log('\n(Replace [PASSWORD] with your Supabase database password)\n');

console.log('After running the migration, the form will automatically support coupon codes! 🎉');
