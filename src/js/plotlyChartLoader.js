/**
 * Plotly Chart Loader
 * This script helps manage loading Plotly charts in Astro
 * It provides safeguards for when client:load directives might fail
 */

// This runs on the client side only
export function initializePlotlyCharts() {
  console.log('🔄 Initializing Plotly charts');
  
  // Add Plotly CSS if not already present
  if (!document.querySelector('link[href*="plotly"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.plot.ly/plotly-2.26.0.min.css';
    document.head.appendChild(link);
  }
  
  // Add a class to indicate that Plotly is available
  document.documentElement.classList.add('plotly-available');
  
  // Find all chart placeholders and mark them as initialized
  const chartContainers = document.querySelectorAll('.plotly-chart-container');
  chartContainers.forEach(container => {
    container.classList.add('plotly-initialized');
  });
  
  // Add global error handler for Plotly
  window.addEventListener('error', (event) => {
    const errorMsg = event.message || '';
    
    // Check if the error is Plotly related
    if (
      errorMsg.includes('Plotly') || 
      errorMsg.includes('plotly') ||
      (event.filename && event.filename.includes('plotly'))
    ) {
      console.error('📊 Plotly error detected:', errorMsg);
      
      // Mark chart placeholders as having an error
      const chartContainers = document.querySelectorAll('.plotly-chart-container');
      chartContainers.forEach(container => {
        container.classList.add('plotly-error');
        
        // Show data table as fallback
        const dataTable = container.querySelector('.chart-data-table');
        if (dataTable) {
          dataTable.classList.remove('hidden');
          dataTable.classList.add('block');
        }
      });
      
      // Show a user-friendly error message
      showPlotlyErrorBanner();
    }
  });
  
  return true;
}

// Helper to show an error banner when Plotly fails to initialize
function showPlotlyErrorBanner() {
  // Only show the banner once
  if (document.getElementById('plotly-error-banner')) return;
  
  const banner = document.createElement('div');
  banner.id = 'plotly-error-banner';
  banner.style.position = 'fixed';
  banner.style.top = '20px';
  banner.style.right = '20px';
  banner.style.backgroundColor = '#ef4444';
  banner.style.color = 'white';
  banner.style.padding = '12px 20px';
  banner.style.borderRadius = '8px';
  banner.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  banner.style.zIndex = '9999';
  banner.style.maxWidth = '300px';
  
  banner.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 6px;">Chart Visualization Issue</div>
    <p style="margin-bottom: 8px; font-size: 14px;">We're displaying the data in tables instead.</p>
    <button id="close-plotly-error-banner" style="position: absolute; top: 6px; right: 10px; background: none; border: none; color: white; cursor: pointer; font-size: 18px;">&times;</button>
  `;
  
  document.body.appendChild(banner);
  
  // Add event listener to close button
  document.getElementById('close-plotly-error-banner').addEventListener('click', (e) => {
    e.preventDefault();
    banner.remove();
  });
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (banner.parentNode) {
      banner.remove();
    }
  }, 10000);
}

// This function can be called to ensure Plotly is loaded
export function ensurePlotlyLoaded() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  // If Plotly is already defined, return immediately
  if (window.Plotly) return Promise.resolve(true);
  
  // Otherwise, load Plotly dynamically
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-2.26.0.min.js';
    script.async = true;
    script.onload = () => {
      console.log('📊 Plotly library loaded dynamically');
      resolve(true);
    };
    script.onerror = () => {
      console.error('❌ Failed to load Plotly library');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

// Export a function to get chart data from a worker
export async function getChartDataFromWorker(workerPath, action = 'getData') {
  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker(workerPath);
      
      worker.onmessage = (e) => {
        if (e.data && !e.data.error) {
          resolve(e.data);
        } else {
          reject(new Error(e.data?.error || 'Unknown worker error'));
        }
        worker.terminate();
      };
      
      worker.onerror = (e) => {
        reject(new Error(`Worker error: ${e.message}`));
        worker.terminate();
      };
      
      worker.postMessage({ action });
    } catch (error) {
      reject(error);
    }
  });
}
