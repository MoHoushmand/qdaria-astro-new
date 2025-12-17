#!/usr/bin/env node

/**
 * Development Environment Setup Script
 * Sets up the development environment for Qdaria Astro project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

/**
 * Print colored message
 */
function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Execute command and return output
 */
function exec(command, silent = false) {
  try {
    const output = execSync(command, {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit'
    });
    return output;
  } catch (error) {
    if (!silent) {
      print(`Error executing: ${command}`, 'red');
      print(error.message, 'red');
    }
    throw error;
  }
}

/**
 * Check system requirements
 */
function checkSystemRequirements() {
  print('\n📋 Checking system requirements...', 'cyan');

  // Check Node version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1));

  if (majorVersion < 18) {
    print(`❌ Node.js 18+ required. Current: ${nodeVersion}`, 'red');
    process.exit(1);
  }

  print(`✓ Node.js ${nodeVersion}`, 'green');

  // Check npm
  try {
    const npmVersion = exec('npm -v', true).trim();
    print(`✓ npm ${npmVersion}`, 'green');
  } catch (error) {
    print('❌ npm not found', 'red');
    process.exit(1);
  }

  // Check git
  try {
    const gitVersion = exec('git --version', true).trim();
    print(`✓ ${gitVersion}`, 'green');
  } catch (error) {
    print('⚠ Git not found (optional)', 'yellow');
  }
}

/**
 * Verify project structure
 */
function verifyProjectStructure() {
  print('\n📁 Verifying project structure...', 'cyan');

  const requiredDirs = [
    'src',
    'src/components',
    'src/layouts',
    'src/pages',
    'src/styles',
    'src/config',
    'src/lib',
    'public',
    'tests'
  ];

  const requiredFiles = [
    'package.json',
    'astro.config.mjs',
    'tsconfig.json',
    'tailwind.config.cjs'
  ];

  let missingItems = [];

  // Check directories
  requiredDirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(dirPath)) {
      missingItems.push(`Directory: ${dir}`);
    }
  });

  // Check files
  requiredFiles.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(filePath)) {
      missingItems.push(`File: ${file}`);
    }
  });

  if (missingItems.length > 0) {
    print('❌ Missing required items:', 'red');
    missingItems.forEach(item => print(`   - ${item}`, 'red'));
    process.exit(1);
  }

  print('✓ Project structure verified', 'green');
}

/**
 * Setup environment configuration
 */
function setupEnvironment() {
  print('\n🔧 Setting up environment configuration...', 'cyan');

  const envPath = path.join(PROJECT_ROOT, '.env');
  const envExamplePath = path.join(PROJECT_ROOT, '.env.example');

  // Create .env.example if it doesn't exist
  if (!fs.existsSync(envExamplePath)) {
    const envExample = `# Qdaria Astro Environment Configuration

# Site Configuration
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SITE_NAME=Qdaria

# API Keys
# SENDGRID_API_KEY=your_sendgrid_key_here
# SUPABASE_URL=your_supabase_url_here
# SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Sentry (Error Tracking)
# SENTRY_DSN=your_sentry_dsn_here
# SENTRY_AUTH_TOKEN=your_sentry_auth_token_here

# Analytics
# PUBLIC_GA_TRACKING_ID=your_ga_tracking_id_here

# Feature Flags
NODE_ENV=development
PUBLIC_ENABLE_ANALYTICS=false

# Build Configuration
BUILD_OUTPUT=static
`;

    fs.writeFileSync(envExamplePath, envExample);
    print('✓ Created .env.example', 'green');
  }

  // Check if .env exists
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    print('✓ Created .env from .env.example', 'green');
    print('⚠ Please update .env with your API keys', 'yellow');
  } else {
    print('✓ Environment file exists', 'green');
  }
}

/**
 * Create necessary directories
 */
function createDirectories() {
  print('\n📂 Creating necessary directories...', 'cyan');

  const dirs = [
    'dist',
    '.astro',
    'tests/reports',
    'tests/reports/html',
    'tests/screenshots',
    'tests/visual/reports',
    'public/temp',
    'scripts/output'
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  print('✓ Directories created', 'green');
}

/**
 * Install dependencies
 */
function installDependencies() {
  print('\n📦 Installing dependencies...', 'cyan');
  print('This may take a few minutes...', 'yellow');

  try {
    exec('npm ci');
    print('✓ Dependencies installed', 'green');
  } catch (error) {
    print('⚠ npm ci failed, trying npm install...', 'yellow');
    try {
      exec('npm install');
      print('✓ Dependencies installed', 'green');
    } catch (installError) {
      print('❌ Failed to install dependencies', 'red');
      throw installError;
    }
  }
}

/**
 * Setup Playwright
 */
function setupPlaywright() {
  print('\n🎭 Setting up Playwright...', 'cyan');

  try {
    exec('npx playwright install chromium');
    print('✓ Playwright browsers installed', 'green');
  } catch (error) {
    print('⚠ Playwright setup failed (optional)', 'yellow');
  }
}

/**
 * Verify configuration files
 */
function verifyConfiguration() {
  print('\n⚙️  Verifying configuration...', 'cyan');

  // Check package.json scripts
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8')
  );

  const requiredScripts = ['dev', 'build', 'preview'];
  const missingScripts = requiredScripts.filter(
    script => !packageJson.scripts[script]
  );

  if (missingScripts.length > 0) {
    print('⚠ Missing package.json scripts:', 'yellow');
    missingScripts.forEach(script => print(`   - ${script}`, 'yellow'));
  } else {
    print('✓ Package scripts verified', 'green');
  }

  // Check TypeScript config
  try {
    const tsConfig = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, 'tsconfig.json'), 'utf-8')
    );
    print('✓ TypeScript configuration valid', 'green');
  } catch (error) {
    print('⚠ TypeScript configuration invalid', 'yellow');
  }
}

/**
 * Print setup summary
 */
function printSummary() {
  print('\n' + '='.repeat(60), 'green');
  print('✨ Development Environment Setup Complete!', 'green');
  print('='.repeat(60), 'green');

  print('\n📝 Next Steps:', 'cyan');
  print('  1. Update .env file with your API keys');
  print('  2. Run: npm run dev (Start development server)');
  print('  3. Open: http://localhost:4321');
  print('  4. Run: npm run build (Build for production)');
  print('  5. Run: npm test (Run tests)');

  print('\n📚 Available Commands:', 'cyan');
  print('  npm run dev              - Start development server');
  print('  npm run build            - Build for production');
  print('  npm run preview          - Preview production build');
  print('  npm run test:all         - Run all tests');
  print('  npm run test:visual      - Run visual regression tests');
  print('  npm run test:a11y:all    - Run accessibility tests');

  print('\n🔗 Resources:', 'cyan');
  print('  Documentation: ./docs/');
  print('  Architecture: ./docs/architecture/');
  print('  Business Plan: /company/business-plan');
  print('');
}

/**
 * Main execution
 */
async function main() {
  try {
    print('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
    print('║   Qdaria Astro - Development Environment Setup          ║', 'cyan');
    print('╚══════════════════════════════════════════════════════════╝', 'cyan');

    checkSystemRequirements();
    verifyProjectStructure();
    setupEnvironment();
    createDirectories();

    // Only install dependencies if node_modules doesn't exist
    if (!fs.existsSync(path.join(PROJECT_ROOT, 'node_modules'))) {
      installDependencies();
    } else {
      print('\n✓ Dependencies already installed', 'green');
    }

    setupPlaywright();
    verifyConfiguration();
    printSummary();

    process.exit(0);
  } catch (error) {
    print('\n❌ Setup failed!', 'red');
    print(error.message, 'red');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
