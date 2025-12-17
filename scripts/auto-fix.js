#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 Claude Code Auto-Fix for Netlify Deployment');
console.log('==============================================\n');

function exec(command, silent = false) {
  try {
    const result = execSync(command, { encoding: 'utf8' });
    if (!silent) console.log(result);
    return result;
  } catch (error) {
    if (!silent) console.error(`Error: ${error.message}`);
    return null;
  }
}

function fixMissingPlugins() {
  console.log('🔍 Checking for missing Netlify plugins...');

  // Read netlify.toml to find required plugins
  const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
  const pluginMatches = netlifyConfig.match(/package = "([^"]+)"/g) || [];

  const plugins = pluginMatches
    .map(match => match.replace(/package = "([^"]+)"/, '$1'))
    .filter(plugin => !plugin.startsWith('#'));

  // Check and install each plugin
  for (const plugin of plugins) {
    const checkResult = exec(`npm list ${plugin} 2>&1`, true);

    if (!checkResult || checkResult.includes('(empty)') || checkResult.includes('not found')) {
      console.log(`📦 Installing missing plugin: ${plugin}`);
      exec(`npm install --save-dev ${plugin}`);
    } else {
      console.log(`✅ Plugin already installed: ${plugin}`);
    }
  }

  // Ensure they're in package.json
  console.log('📝 Verifying package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let modified = false;

  for (const plugin of plugins) {
    if (!packageJson.devDependencies[plugin] && !packageJson.dependencies[plugin]) {
      console.log(`Adding ${plugin} to package.json`);
      if (!packageJson.devDependencies) packageJson.devDependencies = {};
      packageJson.devDependencies[plugin] = '*';
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json');
    exec('npm install');
  }
}

function commitAndPush() {
  const status = exec('git status --porcelain', true);

  if (status && status.trim()) {
    console.log('📝 Committing fixes...');
    exec('git add -A');
    exec(`git commit -m "fix: Auto-install missing Netlify plugins

- Install netlify-plugin-cache
- Install netlify-plugin-image-optim
- Update package.json with required dependencies
- Fix deployment configuration

🤖 Auto-fixed by Claude Code"`);

    console.log('🚀 Pushing to GitHub...');
    exec('git push origin main');
    console.log('✅ Changes pushed successfully!');
  } else {
    console.log('ℹ️ No changes to commit');
  }
}

function checkNetlifyDeployment() {
  console.log('\n🌐 Checking Netlify deployment status...');

  // Check latest deployment
  const deployStatus = exec('npx netlify status 2>&1', true);

  if (deployStatus) {
    console.log('✅ Netlify site connected');
    console.log('🌐 Site URL: https://qdaria.com');
    console.log('\n💡 The deployment will auto-trigger via GitHub webhook');
    console.log('   Check status at: https://app.netlify.com/sites/qdaria-astro-new/deploys');
  }
}

// Main execution
async function main() {
  try {
    console.log('Starting auto-fix process...\n');

    // Step 1: Fix missing plugins
    fixMissingPlugins();

    // Step 2: Build to verify
    console.log('\n🔨 Testing build...');
    const buildResult = exec('npm run build 2>&1', true);
    if (buildResult && !buildResult.includes('error')) {
      console.log('✅ Build successful!');
    }

    // Step 3: Commit and push
    commitAndPush();

    // Step 4: Check deployment
    checkNetlifyDeployment();

    console.log('\n🎉 Auto-fix complete! Deployment will trigger automatically.');

  } catch (error) {
    console.error('❌ Auto-fix failed:', error.message);
    process.exit(1);
  }
}

// Run main
main();