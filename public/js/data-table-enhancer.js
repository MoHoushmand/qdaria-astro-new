/**
 * QDaria Business Plan - Data Table Enhancer
 * This script ensures all data tables are visible and properly styled,
 * working with the existing chart system rather than replacing it.
 */

(function() {
  // Run after everything else has loaded
  window.addEventListener('load', function() {
    console.log('🔍 Data Table Enhancer activating...');
    
    // Give charts time to render, then enhance tables
    setTimeout(enhanceDataTables, 500);
    
    // Run a second time after 3 seconds to catch any delayed loading
    setTimeout(enhanceDataTables, 3000);
  });
  
  function enhanceDataTables() {
    // Find all data tables
    const tables = document.querySelectorAll('.chart-data-table');
    if (tables.length === 0) {
      console.log('No data tables found, will retry later');
      return;
    }
    
    console.log(`Found ${tables.length} data tables to enhance`);
    
    // Make all tables visible
    tables.forEach(table => {
      // Ensure table is visible
      table.style.display = 'block';
      table.classList.add('visible');
      
      // Add enhanced styling
      table.style.width = '100%';
      table.style.margin = '1.5rem 0';
      table.style.borderRadius = '4px';
      table.style.background = 'rgba(15, 23, 42, 0.6)';
      table.style.border = '1px solid rgba(100, 116, 139, 0.2)';
      table.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      
      // Identify table that might be missing a header
      if (!table.querySelector('.data-table-header')) {
        const chartId = table.id.replace('-data-table', '');
        const title = getChartTitle(chartId);
        
        // Create header for the table if missing
        const header = document.createElement('div');
        header.className = 'data-table-header';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.padding = '0.75rem 1rem';
        header.style.background = 'rgba(30, 41, 59, 0.9)';
        header.style.borderBottom = '1px solid rgba(100, 116, 139, 0.2)';
        
        header.innerHTML = `
          <span class="data-table-title" style="font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.9);">
            Data Table: ${title}
          </span>
          <button type="button" class="data-table-close-btn" aria-label="Close data table" 
            style="font-size:1.25rem;background:transparent;border:none;color:rgba(255,255,255,0.6);cursor:pointer;padding:0.25rem 0.5rem;border-radius:4px;">×</button>
        `;
        
        // Find the first child and insert before it
        const firstChild = table.firstChild;
        if (firstChild) {
          table.insertBefore(header, firstChild);
        } else {
          table.appendChild(header);
        }
        
        // Add event listener to close button
        const closeBtn = header.querySelector('.data-table-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', function() {
            table.style.display = 'none';
            table.classList.remove('visible');
          });
        }
      }
      
      // Add missing toggle button if needed
      if (!document.querySelector(`button[aria-controls="${table.id}"]`)) {
        const chartContainer = document.getElementById(chartId) || document.getElementById(`${chartId}-chart`);
        if (chartContainer) {
          const toggleBtn = document.createElement('button');
          toggleBtn.type = 'button';
          toggleBtn.className = 'chart-data-table-btn';
          toggleBtn.style.display = 'inline-block';
          toggleBtn.style.background = 'rgba(30, 41, 59, 0.9)';
          toggleBtn.style.color = 'rgba(255, 255, 255, 0.9)';
          toggleBtn.style.border = '1px solid rgba(100, 116, 139, 0.2)';
          toggleBtn.style.borderRadius = '4px';
          toggleBtn.style.padding = '0.5rem 1rem';
          toggleBtn.style.margin = '0.5rem 0';
          toggleBtn.style.fontFamily = 'Inter, Arial, sans-serif';
          toggleBtn.style.fontSize = '0.85rem';
          toggleBtn.style.fontWeight = '500';
          toggleBtn.style.cursor = 'pointer';
          
          toggleBtn.setAttribute('aria-expanded', 'true');
          toggleBtn.setAttribute('aria-controls', table.id);
          toggleBtn.textContent = 'Hide Data Table';
          
          // Insert before the table if possible
          const parentNode = chartContainer.parentNode;
          if (parentNode) {
            parentNode.insertBefore(toggleBtn, table);
            
            // Add toggle functionality
            toggleBtn.addEventListener('click', function() {
              if (table.classList.contains('visible')) {
                table.classList.remove('visible');
                table.style.display = 'none';
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.textContent = 'Show Data Table';
              } else {
                table.classList.add('visible');
                table.style.display = 'block';
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.textContent = 'Hide Data Table';
              }
            });
          }
        }
      }
    });
    
    // Ensure all tables have proper content styling
    document.querySelectorAll('.chart-data-table-content').forEach(content => {
      content.style.width = '100%';
      content.style.borderCollapse = 'collapse';
      content.style.fontFamily = 'Inter, Arial, sans-serif';
      content.style.fontSize = '0.85rem';
      content.style.color = 'rgba(255, 255, 255, 0.9)';
      
      // Style table headers
      const headers = content.querySelectorAll('th');
      headers.forEach(th => {
        th.style.textAlign = 'left';
        th.style.padding = '0.75rem 1rem';
        th.style.background = 'rgba(51, 65, 85, 0.4)';
        th.style.fontWeight = '600';
        th.style.borderBottom = '1px solid rgba(100, 116, 139, 0.3)';
      });
      
      // Style table cells
      const cells = content.querySelectorAll('td');
      cells.forEach(td => {
        td.style.padding = '0.6rem 1rem';
        td.style.borderBottom = '1px solid rgba(100, 116, 139, 0.1)';
        
        // Highlight trillion-dollar values
        const cellText = td.textContent.toLowerCase();
        if (cellText.includes('t') || cellText.includes('trillion')) {
          td.style.color = '#65FF00';
          td.style.fontWeight = '600';
        }
      });
    });
    
    console.log('✅ Data tables enhanced successfully');
  }
  
  // Get chart title from container or make one up based on ID
  function getChartTitle(chartId) {
    if (!chartId) return 'Chart Data';
    
    // Try to find title element
    const parent = document.getElementById(chartId);
    if (parent) {
      const titleEl = parent.querySelector('.chart-title');
      if (titleEl && titleEl.textContent) {
        return titleEl.textContent;
      }
    }
    
    // Make up a title based on ID
    const cleanId = chartId
      .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .replace('Chart', '') // Remove "Chart" suffix
      .trim();
    
    return cleanId || 'Chart Data';
  }
})();
