// Risk Assessment Worker
// Processes risk assessment data for the heatmap visualization

self.addEventListener('message', (event) => {
  const { action, data } = event.data;

  if (action === 'processRiskData') {
    const result = processRiskData(data);
    self.postMessage({ action: 'riskDataProcessed', result });
  }
});

function processRiskData(data) {
  // If no data provided, use default sample data
  if (!data || !data.length) {
    return generateSampleRiskData();
  }

  // Process the provided data
  // Format: { name, probability, impact, category }
  const series = [];
  const categories = [...new Set(data.map(item => item.category))];
  
  // Group by category
  categories.forEach(category => {
    const categoryRisks = data.filter(item => item.category === category);
    
    // Create series data for this category
    const seriesData = categoryRisks.map(risk => ({
      x: risk.name,
      y: calculateRiskScore(risk.probability, risk.impact),
      probability: risk.probability,
      impact: risk.impact,
      description: risk.description || ''
    }));
    
    series.push({
      name: category,
      data: seriesData
    });
  });

  // Calculate risk thresholds for annotations
  const allRiskScores = data.map(risk => calculateRiskScore(risk.probability, risk.impact));
  const maxRisk = Math.max(...allRiskScores);
  const highRiskThreshold = maxRisk * 0.7;
  const mediumRiskThreshold = maxRisk * 0.4;

  return {
    series,
    categories,
    thresholds: {
      high: highRiskThreshold,
      medium: mediumRiskThreshold
    },
    maxRisk
  };
}

function calculateRiskScore(probability, impact) {
  // Simple risk score calculation: probability * impact
  return probability * impact;
}

function generateSampleRiskData() {
  const riskCategories = [
    'Technology',
    'Market',
    'Financial',
    'Operational',
    'Regulatory'
  ];

  const risks = [
    // Technology risks
    { name: 'Quantum Decoherence', probability: 7, impact: 9, category: 'Technology', description: 'Loss of quantum state due to environmental factors' },
    { name: 'Hardware Failure', probability: 5, impact: 8, category: 'Technology', description: 'Critical hardware component failure' },
    { name: 'Algorithm Inefficiency', probability: 6, impact: 7, category: 'Technology', description: 'Suboptimal algorithm performance' },
    { name: 'Integration Issues', probability: 4, impact: 6, category: 'Technology', description: 'Challenges integrating with existing systems' },
    
    // Market risks
    { name: 'Competitor Advancement', probability: 8, impact: 9, category: 'Market', description: 'Competitors achieving significant breakthroughs' },
    { name: 'Market Adoption Delay', probability: 7, impact: 8, category: 'Market', description: 'Slower than expected market adoption' },
    { name: 'Pricing Pressure', probability: 6, impact: 5, category: 'Market', description: 'Pressure to reduce pricing due to competition' },
    { name: 'Changing Market Needs', probability: 5, impact: 6, category: 'Market', description: 'Evolving customer requirements' },
    
    // Financial risks
    { name: 'Funding Shortfall', probability: 6, impact: 10, category: 'Financial', description: 'Insufficient funding for development phases' },
    { name: 'Cost Overruns', probability: 7, impact: 7, category: 'Financial', description: 'Development costs exceeding budget' },
    { name: 'Revenue Delays', probability: 6, impact: 8, category: 'Financial', description: 'Delayed revenue generation' },
    { name: 'Currency Fluctuation', probability: 4, impact: 5, category: 'Financial', description: 'Impact of currency exchange rate changes' },
    
    // Operational risks
    { name: 'Talent Shortage', probability: 8, impact: 8, category: 'Operational', description: 'Difficulty recruiting specialized quantum talent' },
    { name: 'Supply Chain Disruption', probability: 5, impact: 7, category: 'Operational', description: 'Delays in component availability' },
    { name: 'Knowledge Transfer', probability: 6, impact: 6, category: 'Operational', description: 'Challenges in knowledge sharing across teams' },
    { name: 'Process Inefficiency', probability: 4, impact: 5, category: 'Operational', description: 'Suboptimal operational processes' },
    
    // Regulatory risks
    { name: 'Export Controls', probability: 7, impact: 9, category: 'Regulatory', description: 'Restrictions on quantum technology exports' },
    { name: 'Data Privacy Regulations', probability: 6, impact: 8, category: 'Regulatory', description: 'Changing data privacy requirements' },
    { name: 'Intellectual Property', probability: 5, impact: 7, category: 'Regulatory', description: 'IP protection challenges' },
    { name: 'Standards Evolution', probability: 4, impact: 6, category: 'Regulatory', description: 'Changing industry standards' }
  ];

  // Process the sample data
  return processRiskData(risks);
}
