#!/usr/bin/env node

/**
 * Migration Script: Add coupon_code column to waitlist table
 *
 * This script uses the Supabase REST API to execute SQL via the PostgREST RPC endpoint.
 * It adds the coupon_code column to the waitlist table if it doesn't exist.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🔄 Starting migration: Add coupon_code column to waitlist table...\n');

  try {
    // First, check if the column already exists by attempting to select it
    console.log('📋 Checking if coupon_code column exists...');
    const { data: testData, error: testError } = await supabase
      .from('waitlist')
      .select('coupon_code')
      .limit(1);

    if (!testError) {
      console.log('✅ Column coupon_code already exists! No migration needed.');
      return;
    }

    if (testError.code === 'PGRST204') {
      console.log('📝 Column does not exist. Attempting to add it...\n');

      // Use the SQL editor endpoint (this requires service role key)
      // Since we only have anon key, we'll try a different approach

      // Alternative: Try to insert with the new column and see what happens
      console.log('⚠️  Note: Direct SQL execution requires service role key.');
      console.log('⚠️  Please run this SQL in your Supabase SQL Editor:\n');
      console.log('----------------------------------------');
      console.log('ALTER TABLE waitlist');
      console.log('ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);');
      console.log('');
      console.log("COMMENT ON COLUMN waitlist.coupon_code IS 'Optional promotional coupon code (e.g., BETA2026)';");
      console.log('----------------------------------------\n');
      console.log('📍 Go to: https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new');
      console.log('📋 Copy the SQL above and click "Run"\n');

      console.log('🔍 Verifying current table structure...');
      const { data: structure, error: structError } = await supabase
        .from('waitlist')
        .select('*')
        .limit(0);

      if (structError) {
        console.error('❌ Error checking table structure:', structError.message);
      } else {
        console.log('✅ Waitlist table is accessible');
      }

      process.exit(1);
    } else {
      console.error('❌ Unexpected error:', testError);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
