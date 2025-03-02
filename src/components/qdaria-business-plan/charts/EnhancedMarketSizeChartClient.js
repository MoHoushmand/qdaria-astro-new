// Client-side script for EnhancedMarketSizeChartV2.astro
document.addEventListener('DOMContentLoaded', () => {
  // Add mouse tracking for hover effect
  document.querySelectorAll('.chart-container').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Get chart elements
  const chart = document.getElementById('marketSizeChart');
  if (!chart) return; // Exit if chart not found
  
  const tooltip = document.getElementById('tooltip');
  const tooltipText = document.getElementById('tooltip-text');
  const tooltipYear = document.getElementById('tooltip-year');
  const scenarioButtons = document.querySelectorAll('.scenario-button');
  const scenarioGroups = document.querySelectorAll('.scenario-group');
  const dataPoints = document.querySelectorAll('.data-point');
  const trendlinePaths = document.querySelectorAll('.trendline-path');
  const zoomControls = document.getElementById('zoom-controls');
  const toggleTrendlinesBtn = document.getElementById('toggle-trendlines');
  const toggleZoomBtn = document.getElementById('toggle-zoom');
  const exportCsvBtn = document.getElementById('export-csv');
  const exportPngBtn = document.getElementById('export-png');

  // State variables
  let activeScenario = 'base';
  let trendlinesVisible = false;
  let zoomMode = false;
  let zoomLevel = 1;
  let panOffset = { x: 0, y: 0 };
  let isDragging = false;
  let lastMousePos = { x: 0, y: 0 };

  // Initialize chart
  initializeChart();

  function initializeChart() {
    // Add event listeners to scenario buttons
    scenarioButtons.forEach(button => {
      button.addEventListener('click', () => {
        const scenario = button.getAttribute('data-scenario');
        if (scenario) {
          setActiveScenario(scenario);
        }
      });

      // Add keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const scenario = button.getAttribute('data-scenario');
          if (scenario) {
            setActiveScenario(scenario);
          }
        }
      });
    });

    // Add event listeners to data points
    dataPoints.forEach(point => {
      point.addEventListener('mouseenter', (e) => {
        showTooltip(e.target);
      });

      point.addEventListener('mouseleave', () => {
        hideTooltip();
      });

      // Add keyboard support
      point.addEventListener('focus', (e) => {
        showTooltip(e.target);
      });

      point.addEventListener('blur', () => {
        hideTooltip();
      });

      point.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Show annotation or additional details
          showAnnotation(e.target);
        }
      });
    });

    // Add event listeners to toggle buttons
    if (toggleTrendlinesBtn) {
      toggleTrendlinesBtn.addEventListener('click', toggleTrendlines);
      toggleTrendlinesBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTrendlines();
        }
      });
    }

    if (toggleZoomBtn) {
      toggleZoomBtn.addEventListener('click', toggleZoom);
      toggleZoomBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleZoom();
        }
      });
    }

    // Add event listeners to zoom controls
    if (zoomControls) {
      const zoomIn = document.getElementById('zoom-in');
      const zoomOut = document.getElementById('zoom-out');
      const zoomReset = document.getElementById('zoom-reset');

      if (zoomIn) {
        zoomIn.addEventListener('click', () => {
          zoomChart(0.1);
        });
      }

      if (zoomOut) {
        zoomOut.addEventListener('click', () => {
          zoomChart(-0.1);
        });
      }

      if (zoomReset) {
        zoomReset.addEventListener('click', resetZoom);
      }
    }

    // Add event listeners to export buttons
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', exportToCsv);
    }

    if (exportPngBtn) {
      exportPngBtn.addEventListener('click', exportToPng);
    }

    // Add pan event listeners (for zoom mode)
    chart.addEventListener('mousedown', (e) => {
      if (!zoomMode) return;
      isDragging = true;
      lastMousePos = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      panOffset.x += dx / zoomLevel;
      panOffset.y += dy / zoomLevel;
      lastMousePos = { x: e.clientX, y: e.clientY };
      applyZoomAndPan();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Add wheel event for zooming
    chart.addEventListener('wheel', (e) => {
      if (!zoomMode) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      zoomChart(delta);
    });
  }

  function setActiveScenario(scenario) {
    // Update active scenario
    activeScenario = scenario;

    // Update button states
    scenarioButtons.forEach(button => {
      const buttonScenario = button.getAttribute('data-scenario');
      const isActive = buttonScenario === scenario || (scenario === 'compare' && buttonScenario !== 'compare');
      
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    // Update scenario visibility
    if (scenario === 'compare') {
      // Show all scenarios
      scenarioGroups.forEach(group => {
        group.style.opacity = '1';
      });
    } else {
      // Show only the selected scenario
      scenarioGroups.forEach(group => {
        const groupScenario = group.id.split('-')[0];
        group.style.opacity = groupScenario === scenario ? '1' : '0';
      });
    }

    // Announce change to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.classList.add('sr-only');
    announcer.textContent = `Showing ${scenario === 'compare' ? 'all scenarios' : scenario + ' scenario'}`;
    document.body.appendChild(announcer);
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  function showTooltip(target) {
    if (!target || !tooltip || !tooltipText || !tooltipYear) return;

    const value = target.getAttribute('data-value');
    const year = target.getAttribute('data-year');
    const scenario = target.getAttribute('data-scenario');

    if (value && year && scenario) {
      tooltipText.textContent = `$${value}B`;
      tooltipYear.textContent = `${year} (${scenario})`;

      const cx = parseFloat(target.getAttribute('cx'));
      const cy = parseFloat(target.getAttribute('cy'));

      tooltip.setAttribute('transform', `translate(${cx},${cy - 10})`);
      tooltip.style.opacity = '1';
    }
  }

  function hideTooltip() {
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }

  function showAnnotation(target) {
    // This would show additional information or annotations
    // For now, we'll just highlight the point
    target.setAttribute('r', '8');
    setTimeout(() => {
      target.setAttribute('r', '6');
    }, 500);
  }

  function toggleTrendlines() {
    trendlinesVisible = !trendlinesVisible;

    // Update button state
    if (toggleTrendlinesBtn) {
      toggleTrendlinesBtn.classList.toggle('active', trendlinesVisible);
      toggleTrendlinesBtn.setAttribute('aria-pressed', trendlinesVisible ? 'true' : 'false');
    }

    // Update trendline visibility
    trendlinePaths.forEach(path => {
      path.style.opacity = trendlinesVisible ? '1' : '0';
    });

    // Announce change to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.classList.add('sr-only');
    announcer.textContent = `Trendlines ${trendlinesVisible ? 'visible' : 'hidden'}`;
    document.body.appendChild(announcer);
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  function toggleZoom() {
    zoomMode = !zoomMode;

    // Update button state
    if (toggleZoomBtn) {
      toggleZoomBtn.classList.toggle('active', zoomMode);
      toggleZoomBtn.setAttribute('aria-pressed', zoomMode ? 'true' : 'false');
    }

    // Show/hide zoom controls
    if (zoomControls) {
      zoomControls.style.opacity = zoomMode ? '1' : '0';
    }

    // Reset zoom if turning off
    if (!zoomMode) {
      resetZoom();
    }

    // Announce change to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.classList.add('sr-only');
    announcer.textContent = `Zoom mode ${zoomMode ? 'enabled' : 'disabled'}`;
    document.body.appendChild(announcer);
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  function zoomChart(delta) {
    zoomLevel = Math.max(1, Math.min(5, zoomLevel + delta));
    applyZoomAndPan();
  }

  function resetZoom() {
    zoomLevel = 1;
    panOffset = { x: 0, y: 0 };
    applyZoomAndPan();
  }

  function applyZoomAndPan() {
    // Apply zoom and pan to the chart content
    const chartContent = chart.querySelector('g');
    if (chartContent) {
      const svgWidth = parseFloat(chart.getAttribute('width')) || 800;
      const svgHeight = parseFloat(chart.getAttribute('height')) || 500;
      const centerX = svgWidth / 2;
      const centerY = svgHeight / 2;

      chartContent.setAttribute('transform', `translate(${centerX + panOffset.x}, ${centerY + panOffset.y}) scale(${zoomLevel}) translate(${-centerX}, ${-centerY})`);
    }
  }

  function exportToCsv() {
    // Create CSV content
    let csvContent = 'Year,Conservative,Base Case,Optimistic\n';
    
    // Get data from the chart
    const years = Array.from(document.querySelectorAll('.axis-label')).map(label => label.textContent);
    const conservativeData = Array.from(document.querySelectorAll('#conservative-scenario .data-point')).map(point => point.getAttribute('data-value'));
    const baseData = Array.from(document.querySelectorAll('#base-scenario .data-point')).map(point => point.getAttribute('data-value'));
    const optimisticData = Array.from(document.querySelectorAll('#optimistic-scenario .data-point')).map(point => point.getAttribute('data-value'));
    
    // Combine data
    for (let i = 0; i < years.length; i++) {
      csvContent += `${years[i]},${conservativeData[i] || ''},${baseData[i] || ''},${optimisticData[i] || ''}\n`;
    }
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'market_size_projections.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToPng() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const svgWidth = parseFloat(chart.getAttribute('width')) || 800;
    const svgHeight = parseFloat(chart.getAttribute('height')) || 500;
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, svgWidth, svgHeight);
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(chart);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Create image from SVG
    const img = new Image();
    img.onload = function() {
      // Draw SVG on canvas
      ctx.drawImage(img, 0, 0);
      
      // Create download link
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.setAttribute('href', pngUrl);
      link.setAttribute('download', 'market_size_projections.png');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  }
});
