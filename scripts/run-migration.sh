#!/bin/bash

# Migration Script: Add coupon_code column to waitlist table
# This script provides instructions to run the SQL migration

set -e

echo "🔄 Supabase Migration: Add coupon_code column"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SQL_MIGRATION="ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50); COMMENT ON COLUMN waitlist.coupon_code IS 'Optional promotional coupon code (e.g., BETA2026)';"

echo "📋 SQL to execute:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$SQL_MIGRATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Run in Supabase Dashboard:"
echo "   https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new"
echo ""
echo "Or copy this one-liner:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$SQL_MIGRATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ After running, the waitlist form will support coupon codes!"
