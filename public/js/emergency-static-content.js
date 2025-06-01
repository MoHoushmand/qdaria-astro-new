/**
 * EMERGENCY STATIC CONTENT
 * 
 * This script completely disables all chart loading and replaces charts with static content.
 * Use this as a last resort when charts are causing the page to hang or crash.
 */

(function() {
  console.log('🚨 EMERGENCY STATIC CONTENT: Initializing');
  
  // Run immediately
  replaceWithStaticContent();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', replaceWithStaticContent);
  
  // And on window load
  window.addEventListener('load', replaceWithStaticContent);
  
  // Run again after a delay
  setTimeout(replaceWithStaticContent, 500);
  setTimeout(replaceWithStaticContent, 1000);
  setTimeout(replaceWithStaticContent, 2000);
  
  function replaceWithStaticContent() {
    console.log('🚨 EMERGENCY STATIC CONTENT: Replacing charts with static content');
    
    // Disable all scripts that might be causing issues
    disableProblematicScripts();
    
    // Replace all chart placeholders with static content
    document.querySelectorAll('.chart-placeholder').forEach(container => {
      replaceChartWithStatic(container);
    });
    
    // Force all content to be visible
    document.querySelectorAll('body *').forEach(elem => {
      if (getComputedStyle(elem).display === 'none') {
        elem.style.display = 'block';
      }
      elem.style.visibility = 'visible';
      elem.style.opacity = '1';
    });
    
    console.log('🚨 EMERGENCY STATIC CONTENT: Replacement complete');
  }
  
  function disableProblematicScripts() {
    // Create a style element to disable all animations and transitions
    const styleElem = document.createElement('style');
    styleElem.textContent = `
      * {
        animation: none !important;
        transition: none !important;
        -webkit-animation: none !important;
        -webkit-transition: none !important;
      }
    `;
    document.head.appendChild(styleElem);
    
    // Prevent ApexCharts from initializing
    window.ApexCharts = function() {
      return {
        render: function() { return Promise.resolve(); },
        updateOptions: function() { return Promise.resolve(); },
        updateSeries: function() { return Promise.resolve(); },
        hideSeries: function() {},
        showSeries: function() {},
        dataURI: function() { return Promise.resolve({ imgURI: '' }); }
      };
    };
    
    // Disable all web workers
    const originalWorker = window.Worker;
    window.Worker = function() {
      console.log('🚨 EMERGENCY STATIC CONTENT: Worker creation prevented');
      return {
        postMessage: function() {},
        terminate: function() {},
        addEventListener: function() {}
      };
    };
    
    // Prevent fetch requests
    const originalFetch = window.fetch;
    window.fetch = function() {
      console.log('🚨 EMERGENCY STATIC CONTENT: Fetch prevented');
      return Promise.resolve(new Response('{}', { status: 200 }));
    };
    
    // Prevent XMLHttpRequest
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      return {
        open: function() {},
        send: function() {},
        addEventListener: function() {},
        setRequestHeader: function() {},
        readyState: 4,
        status: 200,
        responseText: '{}'
      };
    };
    
    console.log('🚨 EMERGENCY STATIC CONTENT: Problematic scripts disabled');
  }
  
  function replaceChartWithStatic(container) {
    if (!container) return;
    
    const id = container.id;
    console.log(`🚨 EMERGENCY STATIC CONTENT: Replacing ${id} with static content`);
    
    // Get chart title and description
    const title = container.querySelector('.chart-title')?.textContent || 'Chart';
    const description = container.querySelector('.chart-description')?.textContent || '';
    
    // Create static content
    const staticContent = document.createElement('div');
    staticContent.className = 'static-chart-content';
    staticContent.style.padding = '20px';
    staticContent.style.background = 'rgba(2, 6, 23, 0.7)';
    staticContent.style.borderRadius = '8px';
    staticContent.style.border = '1px solid rgba(67, 83, 255, 0.3)';
    staticContent.style.marginBottom = '2rem';
    
    // Add title and description
    staticContent.innerHTML = `
      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: white;">${title}</h3>
      <p style="font-size: 0.875rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 1rem;">${description}</p>
      <div style="background: rgba(4, 163, 255, 0.1); padding: 20px; border-radius: 4px; text-align: center; color: white;">
        <p>Chart data is available in the table below.</p>
      </div>
    `;
    
    // Get data table
    const dataTable = container.querySelector('.chart-data-table');
    
    // Clear container and add static content
    container.innerHTML = '';
    container.appendChild(staticContent);
    
    // Add data table back if it exists
    if (dataTable) {
      container.appendChild(dataTable);
      dataTable.style.display = 'block';
      dataTable.style.visibility = 'visible';
      dataTable.style.opacity = '1';
    }
    
    // Ensure container is visible
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
  }
})();
