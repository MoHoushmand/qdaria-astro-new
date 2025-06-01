// Market Positioning Worker
// Processes data for the Market Positioning Chart (BUBBLE)

self.onmessage = function(e) {
  const { action, companies, metrics, colors, categories } = e.data;
  
  if (action === 'prepareMarketData') {
    // Process the market positioning data
    const chartData = processMarketData(companies, metrics, colors, categories);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'marketDataReady',
      chartData
    });
  }
};

/**
 * Process market positioning data for visualization
 * @param {Object[]} companies - Company data points
 * @param {string[]} metrics - Metrics to compare (x, y, and z axes)
 * @param {string[]} colors - Colors for each category
 * @param {string[]} categories - Company categories
 * @returns {Object} Processed chart data
 */
function processMarketData(companies, metrics, colors, categories) {
  // If no data is provided, use default sample data
  if (!companies || companies.length === 0) {
    return getDefaultMarketData();
  }
  
  // Extract metrics from the data
  const xMetric = metrics?.[0] || 'MarketShare';
  const yMetric = metrics?.[1] || 'GrowthRate';
  const zMetric = metrics?.[2] || 'Revenue';
  
  // Group companies by category
  const seriesData = {};
  
  // Initialize series for each category
  if (categories && categories.length > 0) {
    categories.forEach(category => {
      seriesData[category] = [];
    });
  }
  
  // Process each company
  companies.forEach(company => {
    const category = company.category || 'Uncategorized';
    
    // Create the category if it doesn't exist
    if (!seriesData[category]) {
      seriesData[category] = [];
    }
    
    // Add the company data point
    seriesData[category].push({
      x: company[xMetric] || 0,
      y: company[yMetric] || 0,
      z: company[zMetric] || 0,
      name: company.name || 'Unnamed Company',
      description: company.description || '',
      founded: company.founded || '',
      headquarters: company.headquarters || '',
      employees: company.employees || 0,
      funding: company.funding || 0
    });
  });
  
  // Convert to series array format for ApexCharts
  const series = Object.keys(seriesData).map((category, index) => {
    return {
      name: category,
      data: seriesData[category],
      color: colors?.[index] || getDefaultColor(index)
    };
  });
  
  // Calculate quadrant boundaries
  const allX = companies.map(c => c[xMetric] || 0);
  const allY = companies.map(c => c[yMetric] || 0);
  const allZ = companies.map(c => c[zMetric] || 0);
  
  const xAvg = allX.reduce((sum, val) => sum + val, 0) / allX.length;
  const yAvg = allY.reduce((sum, val) => sum + val, 0) / allY.length;
  
  const xMax = Math.max(...allX) * 1.1;
  const yMax = Math.max(...allY) * 1.1;
  const zMax = Math.max(...allZ);
  
  // Calculate market leaders (top right quadrant)
  const marketLeaders = companies.filter(company => 
    (company[xMetric] || 0) > xAvg && (company[yMetric] || 0) > yAvg
  ).sort((a, b) => (b[zMetric] || 0) - (a[zMetric] || 0));
  
  // Calculate emerging players (bottom right quadrant)
  const emergingPlayers = companies.filter(company => 
    (company[xMetric] || 0) <= xAvg && (company[yMetric] || 0) > yAvg
  ).sort((a, b) => (b[yMetric] || 0) - (a[yMetric] || 0));
  
  // Calculate established players (top left quadrant)
  const establishedPlayers = companies.filter(company => 
    (company[xMetric] || 0) > xAvg && (company[yMetric] || 0) <= yAvg
  ).sort((a, b) => (b[xMetric] || 0) - (a[xMetric] || 0));
  
  // Calculate niche players (bottom left quadrant)
  const nichePlayers = companies.filter(company => 
    (company[xMetric] || 0) <= xAvg && (company[yMetric] || 0) <= yAvg
  );
  
  // Calculate total market share
  const totalMarketShare = allX.reduce((sum, val) => sum + val, 0);
  
  // Calculate average growth rate
  const avgGrowthRate = allY.reduce((sum, val) => sum + val, 0) / allY.length;
  
  // Calculate total revenue
  const totalRevenue = allZ.reduce((sum, val) => sum + val, 0);
  
  // Return processed data
  return {
    series,
    xMetric,
    yMetric,
    zMetric,
    quadrants: {
      xCenter: xAvg,
      yCenter: yAvg,
      xMax,
      yMax
    },
    metrics: {
      marketLeaders,
      emergingPlayers,
      establishedPlayers,
      nichePlayers,
      totalMarketShare,
      avgGrowthRate,
      totalRevenue,
      totalCompanies: companies.length,
      categoryCounts: Object.keys(seriesData).reduce((counts, category) => {
        counts[category] = seriesData[category].length;
        return counts;
      }, {})
    }
  };
}

/**
 * Get default color based on index
 * @param {number} index - Index of the category
 * @returns {string} Color hex code
 */
function getDefaultColor(index) {
  const colors = [
    '#04a3ff', // Primary blue
    '#00ffd3', // Teal
    '#f5b700', // Yellow
    '#ff6b6b', // Red
    '#7b61ff', // Purple
    '#00d085', // Green
    '#ff9f43', // Orange
    '#ee5253', // Pink
    '#2e86de', // Light blue
    '#8395a7'  // Gray
  ];
  
  return colors[index % colors.length];
}

/**
 * Generate default market positioning data
 * @returns {Object} Default chart data
 */
function getDefaultMarketData() {
  const companies = [
    {
      name: 'QDaria',
      category: 'Quantum Startups',
      MarketShare: 2.5,
      GrowthRate: 85.0,
      Revenue: 15.0,
      description: 'Quantum computing and AI integration startup',
      founded: '2020',
      headquarters: 'Oslo, Norway',
      employees: 45,
      funding: 12.0
    },
    {
      name: 'IBM Quantum',
      category: 'Tech Giants',
      MarketShare: 18.5,
      GrowthRate: 25.0,
      Revenue: 250.0,
      description: 'IBM\'s quantum computing division',
      founded: '2016',
      headquarters: 'Armonk, NY, USA',
      employees: 350,
      funding: 500.0
    },
    {
      name: 'Google Quantum',
      category: 'Tech Giants',
      MarketShare: 15.0,
      GrowthRate: 30.0,
      Revenue: 200.0,
      description: 'Google\'s quantum computing division',
      founded: '2014',
      headquarters: 'Mountain View, CA, USA',
      employees: 300,
      funding: 450.0
    },
    {
      name: 'Microsoft Quantum',
      category: 'Tech Giants',
      MarketShare: 12.0,
      GrowthRate: 28.0,
      Revenue: 180.0,
      description: 'Microsoft\'s quantum computing division',
      founded: '2017',
      headquarters: 'Redmond, WA, USA',
      employees: 250,
      funding: 400.0
    },
    {
      name: 'Rigetti',
      category: 'Quantum Hardware',
      MarketShare: 5.0,
      GrowthRate: 45.0,
      Revenue: 30.0,
      description: 'Quantum computing hardware company',
      founded: '2013',
      headquarters: 'Berkeley, CA, USA',
      employees: 160,
      funding: 190.0
    },
    {
      name: 'IonQ',
      category: 'Quantum Hardware',
      MarketShare: 6.5,
      GrowthRate: 50.0,
      Revenue: 35.0,
      description: 'Trapped ion quantum computing company',
      founded: '2015',
      headquarters: 'College Park, MD, USA',
      employees: 180,
      funding: 200.0
    },
    {
      name: 'D-Wave',
      category: 'Quantum Hardware',
      MarketShare: 7.0,
      GrowthRate: 20.0,
      Revenue: 40.0,
      description: 'Quantum annealing hardware company',
      founded: '1999',
      headquarters: 'Burnaby, Canada',
      employees: 190,
      funding: 210.0
    },
    {
      name: 'Quantinuum',
      category: 'Quantum Hardware',
      MarketShare: 8.0,
      GrowthRate: 40.0,
      Revenue: 45.0,
      description: 'Merged entity of Honeywell Quantum and Cambridge Quantum',
      founded: '2021',
      headquarters: 'Cambridge, UK & Broomfield, CO, USA',
      employees: 400,
      funding: 300.0
    },
    {
      name: 'Xanadu',
      category: 'Quantum Startups',
      MarketShare: 3.0,
      GrowthRate: 70.0,
      Revenue: 18.0,
      description: 'Photonic quantum computing company',
      founded: '2016',
      headquarters: 'Toronto, Canada',
      employees: 80,
      funding: 100.0
    },
    {
      name: 'PsiQuantum',
      category: 'Quantum Startups',
      MarketShare: 4.0,
      GrowthRate: 65.0,
      Revenue: 25.0,
      description: 'Silicon photonic quantum computing company',
      founded: '2016',
      headquarters: 'Palo Alto, CA, USA',
      employees: 150,
      funding: 665.0
    },
    {
      name: 'Zapata Computing',
      category: 'Quantum Software',
      MarketShare: 1.8,
      GrowthRate: 60.0,
      Revenue: 12.0,
      description: 'Quantum software and algorithms company',
      founded: '2017',
      headquarters: 'Boston, MA, USA',
      employees: 60,
      funding: 67.0
    },
    {
      name: 'QC Ware',
      category: 'Quantum Software',
      MarketShare: 1.5,
      GrowthRate: 55.0,
      Revenue: 10.0,
      description: 'Quantum computing software company',
      founded: '2014',
      headquarters: 'Palo Alto, CA, USA',
      employees: 45,
      funding: 25.0
    },
    {
      name: 'Strangeworks',
      category: 'Quantum Software',
      MarketShare: 1.2,
      GrowthRate: 50.0,
      Revenue: 8.0,
      description: 'Quantum computing platform company',
      founded: '2018',
      headquarters: 'Austin, TX, USA',
      employees: 30,
      funding: 24.0
    },
    {
      name: 'Intel Quantum',
      category: 'Tech Giants',
      MarketShare: 10.0,
      GrowthRate: 15.0,
      Revenue: 150.0,
      description: 'Intel\'s quantum computing division',
      founded: '2015',
      headquarters: 'Santa Clara, CA, USA',
      employees: 200,
      funding: 300.0
    },
    {
      name: 'Alpine Quantum Technologies',
      category: 'Quantum Hardware',
      MarketShare: 2.0,
      GrowthRate: 45.0,
      Revenue: 12.0,
      description: 'Ion trap quantum computing company',
      founded: '2018',
      headquarters: 'Innsbruck, Austria',
      employees: 40,
      funding: 34.0
    },
    {
      name: 'Continuum',
      category: 'Quantum Startups',
      MarketShare: 2.0,
      GrowthRate: 80.0,
      Revenue: 14.0,
      description: 'Emerging quantum computing startup',
      founded: '2022',
      headquarters: 'San Francisco, CA, USA',
      employees: 35,
      funding: 50.0
    }
  ];
  
  const metrics = ['MarketShare', 'GrowthRate', 'Revenue'];
  
  const categories = [
    'Tech Giants',
    'Quantum Hardware',
    'Quantum Software',
    'Quantum Startups'
  ];
  
  const colors = categories.map((_, i) => getDefaultColor(i));
  
  // Process the default data
  return processMarketData(companies, metrics, colors, categories);
}
