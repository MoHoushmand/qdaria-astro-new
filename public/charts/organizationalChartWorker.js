/**
 * organizationalChartWorker.js
 * Web worker for generating data for the QDaria Organizational Chart
 */

self.addEventListener('message', function(e) {
  if (e.data.type === 'getData') {
    try {
      const data = generateOrganizationalChartData();
      self.postMessage({
        type: 'chartData',
        options: data
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        message: error.message
      });
    }
  }
});

function generateOrganizationalChartData() {
  // Generate data for organizational treemap chart
  const series = [{
    data: [
      {
        x: 'QDaria Holdings',
        y: 100,
        fillColor: '#3B93A5',
        value: 'Parent Company (Est. 2025)'
      },
      {
        x: 'Zipminator Inc.',
        y: 80,
        fillColor: '#F7B844',
        value: 'Quantum Compression (IPO 2028)'
      },
      {
        x: 'Qm9 Inc.',
        y: 75,
        fillColor: '#7367F0',
        value: 'Quantum Platform (IPO 2029)'
      },
      {
        x: 'QDiana Inc.',
        y: 70,
        fillColor: '#FE4D97',
        value: 'Enterprise AI (IPO 2029)'
      },
      {
        x: 'QMikeAI Inc.',
        y: 65,
        fillColor: '#32CD32',
        value: 'Developer AI (IPO 2030)'
      },
      // Additional related entities or departments
      {
        x: 'Quantum Kit Rentals',
        y: 40,
        fillColor: '#8E82FE',
        value: 'Part of Qm9 Inc.'
      },
      {
        x: 'Quantum Software Labs',
        y: 35,
        fillColor: '#F47676',
        value: 'R&D Division'
      },
      {
        x: 'AI Integration Team',
        y: 30,
        fillColor: '#38B3F2',
        value: 'Cross-subsidiary Team'
      },
      {
        x: 'Hardware Partnerships',
        y: 25,
        fillColor: '#D9A6C7',
        value: 'Strategic Alliances'
      }
    ]
  }];

  return {
    series: series
  };
}
