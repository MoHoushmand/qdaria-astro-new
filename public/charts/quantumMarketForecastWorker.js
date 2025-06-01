// Quantum Market Forecast Worker
// Processes data for the Quantum Market Forecast Chart

// Listen for messages from the main thread
self.addEventListener('message', function(e) {
  try {
    const data = e.data;
    
    // Handle different actions
    switch (data.action) {
      case 'prepareData':
        const chartData = prepareChartData(
          data.years, 
          data.scenarios, 
          data.marketShare, 
          data.scenarioColors
        );
        self.postMessage({
          action: 'dataReady',
          chartData: chartData
        });
        break;
        
      default:
        self.postMessage({
          action: 'error',
          error: `Unknown action: ${data.action}`
        });
    }
  } catch (error) {
    self.postMessage({
      action: 'error',
      error: error.message
    });
  }
});

/**
 * Prepare chart data for the ApexCharts instance
 * @param {Array} years - Array of years for x-axis
 * @param {Object} scenarios - Object containing scenario names and values
 * @param {Array|null} marketShare - Array of market share values or null if not showing
 * @param {Array} scenarioColors - Array of colors for each series
 * @returns {Object} Formatted chart data for ApexCharts
 */
function prepareChartData(years, scenarios, marketShare, scenarioColors) {
  try {
    // Format series data
    const series = [];
    
    // Add scenario series
    Object.entries(scenarios).forEach(([name, data], index) => {
      series.push({
        name: name.replace(" ($B)", ""),
        data: data,
        color: scenarioColors[index % scenarioColors.length]
      });
    });
    
    // Add market share as a separate series with secondary y-axis if provided
    if (marketShare) {
      series.push({
        name: "QDaria Market Share %",
        data: marketShare,
        type: 'line',
        color: scenarioColors[3],
        yaxis: 2
      });
    }
    
    // Find milestone years (when each scenario crosses $1T)
    const milestoneYears = {};
    Object.entries(scenarios).forEach(([name, values]) => {
      const scenarioName = name.replace(" ($B)", "");
      
      for (let i = 0; i < values.length; i++) {
        // If this is the first year crossing $1T
        if (values[i] >= 1000 && (i === 0 || values[i-1] < 1000)) {
          // Interpolate to get more precise year if possible
          let milestoneYear = years[i];
          if (i > 0) {
            const prevYear = years[i-1];
            const prevValue = values[i-1];
            const currValue = values[i];
            const currYear = years[i];
            
            // Linear interpolation
            const progress = (1000 - prevValue) / (currValue - prevValue);
            milestoneYear = prevYear + progress * (currYear - prevYear);
            milestoneYear = Math.round(milestoneYear * 10) / 10; // Round to 1 decimal
          }
          
          milestoneYears[scenarioName] = {
            year: milestoneYear,
            index: i
          };
          break;
        }
      }
    });
    
    // Create annotations for $1T milestone
    const annotations = {
      points: Object.entries(milestoneYears).map(([name, info], index) => {
        const yearIndex = info.index;
        return {
          x: years[yearIndex],
          y: 1000,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: scenarioColors[index % scenarioColors.length],
            strokeWidth: 2,
            radius: 2
          },
          label: {
            borderColor: scenarioColors[index % scenarioColors.length],
            style: {
              color: '#fff',
              background: scenarioColors[index % scenarioColors.length],
              fontSize: '10px',
              padding: {
                left: 5,
                right: 5,
                top: 2,
                bottom: 2
              }
            },
            text: `${name}: ${info.year}`,
            offsetY: -15 - (index * 20), // Stack labels
            offsetX: 0
          }
        };
      }),
      yaxis: [
        {
          y: 1000,
          borderColor: '#00E396',
          strokeDashArray: 5,
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
              fontSize: '12px',
              padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
              }
            },
            text: '$1 Trillion Milestone',
            position: 'left',
            offsetX: 10
          }
        }
      ]
    };
    
    return {
      series: series,
      xaxis: {
        categories: years.map(year => year.toString())
      },
      colors: scenarioColors,
      annotations: annotations
    };
  } catch (error) {
    console.error('Error preparing chart data:', error);
    throw error;
  }
}
