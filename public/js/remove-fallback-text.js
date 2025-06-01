/**
 * Remove Fallback Text Nodes
 * 
 * This script removes the "chart visualization unavailable" text nodes
 * completely from the DOM, rather than just hiding them with CSS.
 */

(function() {
  // Run immediately and again after a delay
  removeFallbackText();
  window.addEventListener('load', function() {
    removeFallbackText();
    setTimeout(removeFallbackText, 1000);
    setTimeout(removeFallbackText, 3000);
  });
  
  function removeFallbackText() {
    console.log("🔪 Running fallback text node removal...");
    
    // Function to check if node contains the fallback text
    function containsFallbackText(node) {
      if (!node || !node.textContent) return false;
      
      const text = node.textContent.toLowerCase();
      return text.includes("chart visualization unavailable") || 
             text.includes("refer to the data table") ||
             text.includes("please refer to the data table");
    }
    
    // Function to remove text nodes from chart containers
    function cleanChartContainer(container) {
      // Skip already processed
      if (container.getAttribute('data-fallback-text-removed')) return;
      
      // Process child nodes
      const childNodes = Array.from(container.childNodes);
      
      childNodes.forEach(node => {
        // Check if it's a text node or element with fallback text
        if (node.nodeType === Node.TEXT_NODE && containsFallbackText(node)) {
          node.parentNode.removeChild(node);
        } 
        // Check elements for fallback text
        else if (node.nodeType === Node.ELEMENT_NODE) {
          if (containsFallbackText(node)) {
            // If it's a div or p with fallback text, remove it
            if (node.tagName === 'DIV' || node.tagName === 'P' || node.tagName === 'SPAN') {
              node.parentNode.removeChild(node);
            } else {
              // If it's another element with fallback text, clean its contents
              cleanChartContainer(node);
            }
          } else {
            // Recurse into elements
            cleanChartContainer(node);
          }
        }
      });
      
      // Mark as processed
      container.setAttribute('data-fallback-text-removed', 'true');
    }
    
    // Find all chart containers and clean them
    const chartContainers = document.querySelectorAll('.chart-container, [id$="-chart"]');
    console.log(`Found ${chartContainers.length} chart containers to clean`);
    
    chartContainers.forEach(container => {
      cleanChartContainer(container);
    });

    // Also look for fallback messages anywhere in the document
    const allElements = document.querySelectorAll('div, p, span');
    
    allElements.forEach(el => {
      if (containsFallbackText(el) && !el.closest('.chart-data-table')) {
        console.log('Found and removing fallback message:', el.textContent);
        el.style.display = 'none';
        el.textContent = '';
      }
    });
    
    console.log("✅ Completed fallback text removal");
  }
})();
