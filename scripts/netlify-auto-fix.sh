#!/bin/bash
# Netlify Auto-Fix and Deploy Script
# This script automatically fixes common Netlify deployment issues

set -e

echo "🤖 Claude Code Auto-Fix for Netlify Deployment"
echo "=============================================="

# Function to install missing plugins
fix_missing_plugins() {
    echo "🔍 Checking for missing plugins..."

    # Extract plugin names from netlify.toml
    PLUGINS=$(grep "package = " netlify.toml | grep -v "^#" | sed 's/.*package = "\(.*\)"/\1/')

    for plugin in $PLUGINS; do
        if ! npm list "$plugin" >/dev/null 2>&1; then
            echo "📦 Installing missing plugin: $plugin"
            npm install --save-dev "$plugin"
        else
            echo "✅ Plugin already installed: $plugin"
        fi
    done
}

# Function to fix build errors
fix_build_errors() {
    echo "🔨 Building project to check for errors..."

    if ! npm run build 2>&1 | tee build.log; then
        echo "❌ Build failed, analyzing errors..."

        # Check for common issues
        if grep -q "Cannot find module" build.log; then
            MODULE=$(grep "Cannot find module" build.log | head -1 | sed "s/.*Cannot find module '\(.*\)'.*/\1/")
            echo "📦 Installing missing module: $MODULE"
            npm install "$MODULE"
        fi

        if grep -q "netlify-plugin" build.log; then
            fix_missing_plugins
        fi

        # Retry build
        echo "🔄 Retrying build..."
        npm run build
    fi

    echo "✅ Build successful!"
}

# Function to deploy to Netlify
deploy_to_netlify() {
    echo "🚀 Deploying to Netlify..."

    # Check if linked to site
    if ! npx netlify status >/dev/null 2>&1; then
        echo "🔗 Linking to Netlify site..."
        npx netlify link --id 6af0901e-31c7-431f-842a-2a807cc2571c
    fi

    # Deploy
    if npx netlify deploy --prod --dir=dist; then
        echo "✅ Deployment successful!"
        echo "🌐 Site is live at https://qdaria.com"
    else
        echo "❌ Deployment failed, checking logs..."
        npx netlify deploy:status
    fi
}

# Function to commit and push fixes
commit_fixes() {
    if [[ $(git status --porcelain) ]]; then
        echo "📝 Committing fixes..."
        git add -A
        git commit -m "fix: Auto-fix Netlify deployment issues

- Install missing plugins
- Fix build configuration
- Update dependencies

🤖 Auto-fixed by Claude Code"
        git push origin main
        echo "✅ Changes pushed to GitHub"
    else
        echo "ℹ️ No changes to commit"
    fi
}

# Main execution
main() {
    echo "Starting auto-fix process..."

    # Step 1: Fix missing plugins
    fix_missing_plugins

    # Step 2: Fix build errors
    fix_build_errors

    # Step 3: Commit fixes if any
    commit_fixes

    # Step 4: Deploy to Netlify
    deploy_to_netlify

    echo "🎉 Auto-fix complete!"
}

# Run main function
main