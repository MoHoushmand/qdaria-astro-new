// Worker script for ForecastScenariosRangeChart
self.addEventListener('message', function(e) {
  try {
    const message = e.data;
    
    if (message.action === 'prepareData') {
      // Chart ID from the message
      const chartId = message.chartId || 'forecastScenariosRangeChart';
      
      // Generate data for range area chart
      const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
      
      // Conservative values
      const conservativeData = [
        [1.0], [1.5], [2.5], [4.0], [7.0], [15.0], 
        [30.0], [70.0], [150.0], [300.0], [550.0]
      ];
      
      // Expected values
      const expectedData = [
        [1.3], [2.2], [3.8], [7.0], [14.0], [28.0], 
        [60.0], [120.0], [250.0], [450.0], [800.0]
      ];
      
      // Optimistic values
      const optimisticData = [
        [1.5], [3.0], [6.0], [12.0], [24.0], [50.0], 
        [100.0], [200.0], [400.0], [700.0], [1000.0]
      ];
      
      // QDaria market share percentage (as decimal)
      const marketShareData = [
        0.01, 0.05, 0.10, 0.20, 0.30, 0.40,
        0.45, 0.50, 0.55, 0.60, 0.65
      ];
      
      // Format data for chart
      const series = [
        {
          name: 'Conservative',
          data: conservativeData.map((val, idx) => val[0])
        },
        {
          name: 'Expected',
          data: expectedData.map((val, idx) => val[0])
        },
        {
          name: 'Optimistic',
          data: optimisticData.map((val, idx) => val[0])
        },
        {
          name: 'QDaria Market Share %',
          data: marketShareData
        }
      ];
      
      // Brand colors
      const colors = ['#6E6FF3', '#4285F4', '#00C2FF', '#FF9800'];
      
      // Add $1 trillion milestone annotation
      const annotations = {
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
                padding: {
                  left: 10,
                  right: 10,
                  top: 5,
                  bottom: 5
                },
                fontSize: '12px'
              },
              text: '$1 Trillion Milestone',
              position: 'center',
              offsetY: -15
            }
          }
        ],
        // Add a text annotation showing which year each scenario reaches $1T
        xaxis: [
          {
            x: '2035',
            borderColor: '#6E6FF3',
            label: {
              borderColor: '#6E6FF3',
              style: {
                color: '#fff',
                background: '#6E6FF3',
                fontSize: '10px'
              },
              text: 'Conservative: $1T',
              position: 'center',
              orientation: 'horizontal'
            }
          },
          {
            x: '2033',
            borderColor: '#4285F4',
            label: {
              borderColor: '#4285F4',
              style: {
                color: '#fff',
                background: '#4285F4',
                fontSize: '10px'
              },
              text: 'Expected: $1T',
              position: 'center',
              orientation: 'horizontal'
            }
          },
          {
            x: '2031',
            borderColor: '#00C2FF',
            label: {
              borderColor: '#00C2FF',
              style: {
                color: '#fff',
                background: '#00C2FF',
                fontSize: '10px'
              },
              text: 'Optimistic: $1T',
              position: 'center',
              orientation: 'horizontal'
            }
          }
        ]
      };
      
      // Prepare table data
      const tableData = years.map((year, idx) => ({
        Year: year,
        Conservative: `$${conservativeData[idx][0]}B`,
        Expected: `$${expectedData[idx][0]}B`,
        Optimistic: `$${optimisticData[idx][0]}B`,
        "QDaria Market Share": `${(marketShareData[idx] * 100).toFixed(1)}%`
      }));
      
      // Send data back to main thread with updated format
      self.postMessage({
        action: 'dataReady',
        id: message.id, // Pass back message ID if present
        chartData: {
          series: series,
          categories: years,
          colors: colors,
          annotations: annotations
        },
        title: "Quantum Computing Market Forecast Scenarios (2025-2035)",
        description: "Projected market size across conservative, expected, and optimistic scenarios with QDaria's estimated market share.",
        caption: "Note: Market size in billions of dollars; QDaria market share shown as percentage.",
        tableData: tableData
      });
    }
  } catch (error) {
    // Send error back to main thread
    self.postMessage({
      action: 'error',
      error: error.message
    });
  }
});
