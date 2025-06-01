/**
 * TEXT NODE KILLER
 * 
 * This script aggressively removes any text nodes that contain loading-related text
 * or error messages that might appear in chart containers.
 */

(function() {
  console.log('🔪 TEXT NODE KILLER: Initializing');
  
  // Run immediately
  killTextNodes();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', killTextNodes);
  
  // And on window load
  window.addEventListener('load', killTextNodes);
  
  // Run again after a delay
  setTimeout(killTextNodes, 500);
  setTimeout(killTextNodes, 1000);
  setTimeout(killTextNodes, 2000);
  
  // Set up a MutationObserver to watch for DOM changes
  const observer = new MutationObserver(function(mutations) {
    let shouldRun = false;
    
    // Check if any mutations affect chart containers
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        const target = mutation.target;
        if (target.id && target.id.includes('Chart')) {
          shouldRun = true;
        } else if (target.classList && target.classList.contains('chart-placeholder')) {
          shouldRun = true;
        } else if (target.querySelector && target.querySelector('.chart-placeholder, [id$="-chart"]')) {
          shouldRun = true;
        }
      }
    });
    
    // Run the fix if needed
    if (shouldRun) {
      console.log('🔪 TEXT NODE KILLER: DOM changes detected, re-running');
      killTextNodes();
    }
  });
  
  // Start observing the document
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  function killTextNodes() {
    console.log('🔪 TEXT NODE KILLER: Hunting for text nodes to remove');
    
    // Get all chart containers
    const chartContainers = document.querySelectorAll('[id$="Chart"], .chart-container, .apex-chart-container');
    
    // Process each container
    chartContainers.forEach(container => {
      if (!container) return;
      
      // Get all text nodes in the container
      const textNodes = getTextNodes(container);
      
      // Check each text node for loading-related text
      textNodes.forEach(node => {
        const text = node.nodeValue.trim().toLowerCase();
        
        // Check if the text contains loading-related words
        if (text.includes('loading') || 
            text.includes('wait') || 
            text.includes('error') || 
            text.includes('failed') || 
            text.includes('unavailable') ||
            text.includes('could not') ||
            text.includes('unable to') ||
            text.includes('not available') ||
            text.includes('please try') ||
            text.includes('refresh')) {
          
          console.log(`🔪 TEXT NODE KILLER: Removing text node: "${text}"`);
          
          // Remove the node
          node.parentNode.removeChild(node);
        }
      });
    });
    
    console.log('🔪 TEXT NODE KILLER: Finished removing text nodes');
  }
  
  // Helper function to get all text nodes in an element
  function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      { acceptNode: node => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT },
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    return textNodes;
  }
})();
