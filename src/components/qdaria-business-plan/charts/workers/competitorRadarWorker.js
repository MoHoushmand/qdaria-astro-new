/**
 * Worker for processing competitor radar chart data
 * This worker handles data processing for the CompetitorRadarChartApex component
 */

// Define criteria for comparison
const criteria = [
  { name: "Hardware Capability", description: "Raw quantum processing capability (qubit count, coherence, etc.)" },
  { name: "Software Ecosystem", description: "Breadth and quality of quantum software tools, languages, and libraries" },
  { name: "AI Integration", description: "Level of artificial intelligence integration with quantum systems" },
  { name: "Accessibility", description: "How easily users can access and use the quantum technology" },
  { name: "Enterprise Readiness", description: "Suitability for immediate enterprise adoption" },
  { name: "Educational Tools", description: "Quality of educational resources and tools for learning quantum computing" }
];

// Define companies to compare
const companies = [
  { name: "QDaria", color: "#04a3ff" },
  { name: "IBM Quantum", color: "#0f62fe" },
  { name: "Google Quantum", color: "#ea4335" },
  { name: "Rigetti", color: "#7b1fa2" },
  { name: "IonQ", color: "#00c853" },
  { name: "D-Wave", color: "#6200ea" },
  { name: "Microsoft", color: "#00a4ef" },
  { name: "Quantinuum", color: "#ff6b6b" },
  { name: "Continuum", color: "#ffcc00" }
];

// Define scores for each company across criteria (0-10 scale)
const scores = {
  "QDaria": [6.0, 7.5, 9.5, 9.0, 7.0, 9.5],
  "IBM Quantum": [9.0, 8.5, 7.0, 6.0, 8.0, 7.5],
  "Google Quantum": [8.5, 7.5, 8.0, 5.5, 7.0, 6.5],
  "Rigetti": [8.0, 7.0, 6.0, 5.5, 7.0, 6.0],
  "IonQ": [8.5, 7.0, 6.5, 6.0, 7.5, 6.5],
  "D-Wave": [7.5, 6.5, 5.5, 7.0, 6.5, 5.5],
  "Microsoft": [7.0, 8.0, 7.5, 6.5, 7.5, 7.0],
  "Quantinuum": [8.5, 7.5, 6.0, 5.0, 7.0, 6.0],
  "Continuum": [7.0, 6.5, 7.0, 6.0, 5.5, 6.0]
};

// Prepare data for ApexCharts
function prepareChartData() {
  // Prepare series data for ApexCharts
  const series = companies.map(company => ({
    name: company.name,
    data: scores[company.name]
  }));
  
  // Prepare categories (criteria names)
  const categories = criteria.map(c => c.name);
  
  // Prepare table data
  const tableData = criteria.map((criterion, i) => {
    const row = { criterion: criterion.name };
    companies.forEach(company => {
      row[company.name] = scores[company.name][i].toFixed(1);
    });
    return row;
  });
  
  return {
    series,
    categories,
    tableData,
    companies,
    criteria
  };
}

// Process messages from the main thread
self.onmessage = function(e) {
  if (e.data.action === 'prepareData') {
    const chartData = prepareChartData();
    self.postMessage({
      action: 'dataReady',
      chartData
    });
  }
};
