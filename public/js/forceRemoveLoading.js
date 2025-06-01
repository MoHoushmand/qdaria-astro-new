/**
 * CRITICAL FIX: Direct override to remove all loading indicators
 * This script needs to be added to the page to force remove loading indicators
 */

// Execute immediately
(function() {
  console.log('🔥 Emergency loading indicator removal activated');
  
  // Remove loading indicators immediately
  function forceRemoveAllLoadingIndicators() {
    // Get all elements with class 'chart-loading'
    const loadingElements = document.querySelectorAll('.chart-loading, [id$="-loading"]');
    
    // Force hide all loading indicators
    loadingElements.forEach(element => {
      element.style.display = 'none';
      element.style.opacity = '0';
      element.style.visibility = 'hidden';
      element.style.zIndex = '-999';
      element.innerHTML = ''; // Remove content
      console.log('✅ Forcibly removed loading indicator:', element.id || 'unnamed');
    });
    
    // Show all data tables
    const dataTables = document.querySelectorAll('.chart-data-table');
    dataTables.forEach(table => {
      table.classList.add('visible');
      table.style.display = 'block';
      table.style.visibility = 'visible';
      table.style.opacity = '1';
      console.log('📊 Forcibly showed data table:', table.id || 'unnamed');
    });
  }
  
  // Run immediately
  forceRemoveAllLoadingIndicators();
  
  // Run again after a delay to catch any dynamically added elements
  setTimeout(forceRemoveAllLoadingIndicators, 500);
  setTimeout(forceRemoveAllLoadingIndicators, 1000);
  setTimeout(forceRemoveAllLoadingIndicators, 2000);
  
  // Handle dynamically added elements by running periodically
  setInterval(forceRemoveAllLoadingIndicators, 2000);
  
  // Add it to the document load event as well
  document.addEventListener('DOMContentLoaded', () => {
    forceRemoveAllLoadingIndicators();
    setTimeout(forceRemoveAllLoadingIndicators, 1000);
  });
  
  // Also handle on window load
  window.addEventListener('load', () => {
    forceRemoveAllLoadingIndicators();
    setTimeout(forceRemoveAllLoadingIndicators, 1000);
  });
})();
