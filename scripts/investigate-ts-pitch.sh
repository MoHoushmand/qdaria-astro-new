#!/bin/bash
# Save as investigate-ts-pitch.sh

echo "🔍 TypeScript Pitch Deck Investigation"
echo "========================================"
echo ""

echo "📁 1. Finding all pitch-related files..."
find src -iname "*pitch*" -type f | sort
echo ""

echo "📦 2. Checking React/Preact integration..."
if grep -q "react\|preact" astro.config.mjs; then
    echo "✅ React/Preact found in config"
    grep -A 3 "react\|preact" astro.config.mjs
else
    echo "❌ No React/Preact integration found!"
fi
echo ""

echo "📄 3. Checking pitch.astro content..."
if [ -f "src/pages/invest/pitch.astro" ]; then
    echo "✅ pitch.astro exists"
    echo "Imports:"
    grep "^import" src/pages/invest/pitch.astro
    echo ""
    echo "Client directives:"
    grep "client:" src/pages/invest/pitch.astro
else
    echo "❌ pitch.astro NOT FOUND"
fi
echo ""

echo "🎯 4. Finding TypeScript components..."
find src -name "*.tsx" | grep -v node_modules | sort
echo ""

echo "🔗 5. Checking for broken imports..."
if [ -f "src/pages/invest/pitch.astro" ]; then
    while read import_line; do
        import_path=$(echo "$import_line" | grep -o "from ['\"].*['\"]" | sed "s/from ['\"]//g" | sed "s/['\"]//g")
        if [ -n "$import_path" ]; then
            # Convert relative path to absolute
            if [[ "$import_path" == ../* ]]; then
                check_path="src/pages/$import_path"
            elif [[ "$import_path" == ./* ]]; then
                check_path="src/pages/invest/$import_path"
            else
                check_path="src/$import_path"
            fi
            
            # Add common extensions if missing
            [ -f "$check_path" ] && echo "✅ $import_path" && continue
            [ -f "$check_path.tsx" ] && echo "✅ $import_path.tsx" && continue
            [ -f "$check_path.ts" ] && echo "✅ $import_path.ts" && continue
            [ -f "$check_path/index.tsx" ] && echo "✅ $import_path/index.tsx" && continue
            echo "❌ BROKEN: $import_path (not found)"
        fi
    done < <(grep "^import" src/pages/invest/pitch.astro)
fi
echo ""

echo "📊 6. Package dependencies..."
echo "React packages:"
grep -E '"(react|@astrojs/react|preact)"' package.json
echo ""

echo "🎬 7. Recent changes to pitch files..."
git log --oneline -5 -- "*pitch*" 2>/dev/null || echo "Not a git repo or no history"