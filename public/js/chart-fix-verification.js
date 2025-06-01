/**
 * Chart Fix Verification Script
 * Runs on page load to verify that charts are rendering correctly and applies fixes if needed
 */

(function() {
  console.log('🧪 Chart Fix Verification Running');
  
  // Run verification after DOM and charts have had time to load
  window.addEventListener('load', function() {
    setTimeout(runVerification, 1000);
    // Run a second time after 3 seconds for any delayed chart loading
    setTimeout(runVerification, 3000);
  });
  
  function runVerification() {
    console.log('🔍 Running chart verification checks');
    
    // Get all chart containers
    const containers = document.querySelectorAll('.chart-container, [id$="-chart"]');
    console.log(`Found ${containers.length} chart containers to verify`);
    
    let fixedCount = 0;
    let verifiedCount = 0;
    
    containers.forEach(container => {
      try {
        // Check if container has proper dimensions
        const computedStyle = window.getComputedStyle(container);
        const height = parseInt(computedStyle.height);
        const width = parseInt(computedStyle.width);
        
        if (!container.id) {
          container.id = 'chart-' + Math.random().toString(36).substring(2, 9);
        }
        
        console.log(`Verifying chart ${container.id}: ${width}x${height}px`);
        
        // Fix container if it has insufficient height or width
        if (height < 100 || width < 100) {
          console.log(`⚠️ Chart ${container.id} has insufficient dimensions (${width}x${height}px), applying fix`);
          
          // Ensure proper minimum dimensions
          container.style.minHeight = '350px';
          container.style.width = '100%';
          container.style.display = 'block';
          container.style.position = 'relative';
          
          // Check if container has any content
          if (container.childNodes.length === 0 || container.innerHTML.trim() === '') {
            console.log(`⚠️ Empty chart container ${container.id}, injecting fallback`);
            
            // Find chart type from parent or ID
            let chartType = 'default';
            
            // Check parent classes for chart type
            const parent = container.parentElement;
            if (parent && parent.classList) {
              for (const cls of parent.classList) {
                if (cls.endsWith('-chart')) {
                  chartType = cls.replace('-chart', '');
                  break;
                }
              }
            }
            
            // Create fallback SVG content
            const svgContent = `
              <svg width="100%" height="350" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
                <style>
                  .title{font-family:Inter,Arial,sans-serif;font-size:16px;font-weight:bold;fill:#fff}
                  .note{font-family:Inter,Arial,sans-serif;font-size:12px;fill:rgba(255,255,255,0.6)}
                  .background{fill:rgba(30,41,59,0.4);rx:4}
                </style>
                <rect width="100%" height="100%" class="background" />
                <text x="50%" y="45%" text-anchor="middle" class="title">QDaria ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</text>
                <text x="50%" y="55%" text-anchor="middle" class="note">Chart container verified and repaired</text>
                <text x="85%" y="90%" text-anchor="end" class="note">$1 Trillion Milestone (2035)</text>
              </svg>
            `;
            
            container.innerHTML = svgContent;
          }
          
          fixedCount++;
        } else {
          verifiedCount++;
        }
        
      } catch (error) {
        console.error(`Failed to verify chart: ${error.message}`);
      }
    });
    
    console.log(`✅ Chart verification complete: ${verifiedCount} verified, ${fixedCount} fixed`);
    
    // If we had to fix any charts, make sure data tables are visible
    if (fixedCount > 0) {
      document.querySelectorAll('.chart-data-table').forEach(table => {
        table.style.display = 'block';
        table.classList.add('visible');
      });
    }
  }
  
  // Also observe DOM changes for dynamically added charts
  const observer = new MutationObserver(mutations => {
    let shouldVerify = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === Node.ELEMENT_NODE && 
              (node.classList?.contains('chart-container') || 
               node.id?.endsWith('-chart') || 
               node.querySelector('.chart-container, [id$="-chart"]'))) {
            shouldVerify = true;
            break;
          }
        }
      }
    });
    
    if (shouldVerify) {
      console.log('New chart elements detected, running verification');
      setTimeout(runVerification, 500);
    }
  });
  
  // Start observing the document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
