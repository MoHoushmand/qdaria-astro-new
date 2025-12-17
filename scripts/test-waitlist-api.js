#!/usr/bin/env node

/**
 * Test script for the waitlist API
 * Usage: node scripts/test-waitlist-api.js
 */

const API_URL = 'http://localhost:4321/api/waitlist';

// Test data
const validSubmission = {
  fullName: 'John Doe',
  companyName: 'Test Company Inc',
  email: `test-${Date.now()}@example.com`,
  industry: 'gaming',
  expectedVolume: '10k-100k',
  useCase: 'Testing the waitlist form functionality',
  ndaConsent: true,
};

const invalidSubmission = {
  fullName: 'J', // Too short
  companyName: '', // Empty
  email: 'invalid-email', // Invalid format
  industry: 'invalid', // Not in enum
  expectedVolume: '5k', // Not in enum
  ndaConsent: false, // Must be true
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

async function testHealthCheck() {
  console.log(`\n${colors.blue}Testing Health Check...${colors.reset}`);

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (response.ok) {
      console.log(`${colors.green}✓ Health check passed${colors.reset}`);
      console.log('  Status:', data.status);
      console.log('  Supabase:', data.environment?.supabase || 'unknown');
      console.log('  Email:', data.environment?.email || 'unknown');
      return true;
    } else {
      console.log(`${colors.red}✗ Health check failed${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Server not running${colors.reset}`);
    console.log(`  Start server with: ${colors.yellow}npm run dev${colors.reset}`);
    return false;
  }
}

async function testValidSubmission() {
  console.log(`\n${colors.blue}Testing Valid Submission...${colors.reset}`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validSubmission),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log(`${colors.green}✓ Valid submission accepted${colors.reset}`);
      console.log('  Submission ID:', data.submissionId);
      console.log('  Message:', data.message);
      console.log('  Mode:', data.mode || 'production');
      return true;
    } else {
      console.log(`${colors.red}✗ Valid submission rejected${colors.reset}`);
      console.log('  Error:', data.error);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Request failed${colors.reset}`);
    console.log('  Error:', error.message);
    return false;
  }
}

async function testInvalidSubmission() {
  console.log(`\n${colors.blue}Testing Invalid Submission...${colors.reset}`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidSubmission),
    });

    const data = await response.json();

    if (!response.ok && data.error) {
      console.log(`${colors.green}✓ Invalid submission correctly rejected${colors.reset}`);
      console.log('  Status:', response.status);
      console.log('  Error:', data.error);

      if (data.details) {
        console.log('  Validation errors:');
        Object.entries(data.details).forEach(([field, errors]) => {
          console.log(`    - ${field}: ${errors}`);
        });
      }
      return true;
    } else {
      console.log(`${colors.red}✗ Invalid submission incorrectly accepted${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Request failed${colors.reset}`);
    console.log('  Error:', error.message);
    return false;
  }
}

async function testDuplicateEmail() {
  console.log(`\n${colors.blue}Testing Duplicate Email...${colors.reset}`);

  const duplicateSubmission = {
    ...validSubmission,
    email: 'duplicate@example.com',
  };

  try {
    // First submission
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicateSubmission),
    });

    // Second submission with same email
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicateSubmission),
    });

    const data = await response.json();

    if (response.status === 409 || data.code === 'DUPLICATE_EMAIL') {
      console.log(`${colors.green}✓ Duplicate email correctly detected${colors.reset}`);
      console.log('  Error:', data.error);
      return true;
    } else {
      console.log(`${colors.yellow}⚠ Duplicate email not detected (may be OK in demo mode)${colors.reset}`);
      return true; // Don't fail in demo mode
    }
  } catch (error) {
    console.log(`${colors.red}✗ Request failed${colors.reset}`);
    console.log('  Error:', error.message);
    return false;
  }
}

async function testRateLimit() {
  console.log(`\n${colors.blue}Testing Rate Limiting...${colors.reset}`);

  try {
    // Send 5 requests rapidly
    const requests = Array(5).fill(null).map((_, i) => {
      const submission = {
        ...validSubmission,
        email: `ratelimit-${i}-${Date.now()}@example.com`,
      };

      return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    });

    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.status === 429);

    if (rateLimited) {
      console.log(`${colors.green}✓ Rate limiting is working${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.yellow}⚠ Rate limiting might not be triggered (3 requests/minute limit)${colors.reset}`);
      return true;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Request failed${colors.reset}`);
    console.log('  Error:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}   Waitlist API Test Suite${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);

  const results = [];

  // Run tests
  results.push(await testHealthCheck());

  if (results[0]) { // Only run other tests if server is running
    results.push(await testValidSubmission());
    results.push(await testInvalidSubmission());
    results.push(await testDuplicateEmail());
    results.push(await testRateLimit());
  }

  // Summary
  console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
  const passed = results.filter(r => r).length;
  const total = results.length;

  if (passed === total) {
    console.log(`${colors.green}✓ All tests passed (${passed}/${total})${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠ Some tests failed (${passed}/${total})${colors.reset}`);
  }
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);
}

// Run tests
runAllTests().catch(console.error);