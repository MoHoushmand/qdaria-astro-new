/**
 * chartWorkerFactory.js
 * Factory for creating and managing web workers for chart data processing
 */

/**
 * Create a worker for chart data processing
 * @param {string} workerPath Path to the worker script
 * @returns {Worker} A worker instance
 */
function createChartWorker(workerPath) {
  return new Worker(workerPath);
}

/**
 * Send a message to a worker and get a response
 * @param {Worker} worker Worker instance
 * @param {Object} message Message to send to the worker
 * @returns {Promise<any>} A promise that resolves with the worker response
 */
function sendWorkerMessage(worker, message) {
  return new Promise((resolve, reject) => {
    const messageHandler = (event) => {
      worker.removeEventListener('message', messageHandler);
      resolve(event.data);
    };

    const errorHandler = (error) => {
      worker.removeEventListener('error', errorHandler);
      reject(error);
    };

    worker.addEventListener('message', messageHandler);
    worker.addEventListener('error', errorHandler);
    worker.postMessage(message);
  });
}

/**
 * Process chart data using a worker
 * @param {string} workerPath Path to the worker script
 * @param {Object} message Message to send to the worker
 * @returns {Promise<any>} A promise that resolves with the worker response
 */
async function processChartData(workerPath, message) {
  const worker = createChartWorker(workerPath);
  try {
    const response = await sendWorkerMessage(worker, message);
    return response;
  } catch (error) {
    console.error('Error processing chart data:', error);
    throw error;
  } finally {
    // Terminate the worker when done
    worker.terminate();
  }
}

/**
 * Create a reusable worker for chart data processing
 * @param {string} workerPath Path to the worker script
 * @returns {Object} An object with methods to interact with the worker
 */
function createReusableChartWorker(workerPath) {
  const worker = createChartWorker(workerPath);
  let messageId = 0;
  const pendingMessages = new Map();

  worker.addEventListener('message', (event) => {
    const response = event.data;
    const id = response.id;
    const pending = pendingMessages.get(id);
    
    if (pending) {
      pendingMessages.delete(id);
      if (response.error) {
        pending.reject(response.error);
      } else {
        // Handle both formats: data in a 'data' property or directly in the response
        const responseData = response.data || response;
        pending.resolve(responseData);
      }
    }
  });

  worker.addEventListener('error', (error) => {
    console.error('Worker error:', error);
    // Reject all pending messages
    pendingMessages.forEach((pending) => {
      pending.reject(error);
    });
    pendingMessages.clear();
  });

  // Create a worker wrapper that mimics the Worker interface
  const workerWrapper = {
    sendMessage: (message) => {
      const id = messageId++;
      return new Promise((resolve, reject) => {
        pendingMessages.set(id, { resolve, reject });
        worker.postMessage({ id, ...message });
      });
    },

    terminate: () => {
      worker.terminate();
      pendingMessages.clear();
    },

    postMessage: (message) => {
      worker.postMessage(message);
    },

    onmessage: null,
    addEventListener: (type, listener) => worker.addEventListener(type, listener),
    removeEventListener: (type, listener) => worker.removeEventListener(type, listener)
  };

  return workerWrapper;
}

/**
 * Create a worker for processing competitor radar chart data
 * @returns {Object} A reusable worker for competitor radar chart data
 */
function createCompetitorRadarWorker() {
  return createReusableChartWorker('/charts/competitorRadarWorker.js');
}

/**
 * Create a worker for processing market size chart data
 * @returns {Object} A reusable worker for market size chart data
 */
function createMarketSizeWorker() {
  return createReusableChartWorker('/charts/marketSizeWorker.js');
}

/**
 * Create a worker for processing SWOT analysis chart data
 * @returns {Object} A reusable worker for SWOT analysis chart data
 */
function createSWOTAnalysisWorker() {
  return createReusableChartWorker('/charts/swotAnalysisWorker.js');
}

/**
 * Create a worker for processing execution roadmap chart data
 * @returns {Object} A reusable worker for execution roadmap chart data
 */
function createExecutionRoadmapWorker() {
  return createReusableChartWorker('/charts/executionRoadmapWorker.js');
}

/**
 * Create a worker for processing revenue chart data
 * @returns {Object} A reusable worker for revenue chart data
 */
function createRevenueWorker() {
  return createReusableChartWorker('/charts/revenueWorker.js');
}

/**
 * Create a worker for processing profitability chart data
 * @returns {Object} A reusable worker for profitability chart data
 */
function createProfitabilityWorker() {
  return createReusableChartWorker('/charts/profitabilityWorker.js');
}

/**
 * Create a worker for processing risk assessment chart data
 * @returns {Object} A reusable worker for risk assessment chart data
 */
function createRiskAssessmentWorker() {
  return createReusableChartWorker('/charts/riskAssessmentWorker.js');
}

/**
 * Create a worker for processing topological timeline chart data
 * @returns {Object} A reusable worker for topological timeline chart data
 */
function createTopologicalTimelineWorker() {
  return createReusableChartWorker('/charts/topologicalTimelineWorker.js');
}

/**
 * Create a worker for processing funding allocation chart data
 * @returns {Object} A reusable worker for funding allocation chart data
 */
function createFundingAllocationWorker() {
  return createReusableChartWorker('/charts/fundingAllocationWorker.js');
}

/**
 * Create a worker for processing market growth chart data
 * @returns {Object} A reusable worker for market growth chart data
 */
function createMarketGrowthWorker() {
  return createReusableChartWorker('/charts/marketGrowthWorker.js');
}

/**
 * Create a worker for processing investment distribution chart data
 * @returns {Object} A reusable worker for investment distribution chart data
 */
function createInvestmentDistributionWorker() {
  return createReusableChartWorker('/charts/investmentDistributionWorker.js');
}

/**
 * Create a worker for processing ROI comparison chart data
 * @returns {Object} A reusable worker for ROI comparison chart data
 */
function createROIComparisonWorker() {
  return createReusableChartWorker('/charts/roiComparisonWorker.js');
}

/**
 * Create a worker for processing market positioning chart data
 * @returns {Object} A reusable worker for market positioning chart data
 */
function createMarketPositioningWorker() {
  return createReusableChartWorker('/charts/marketPositioningWorker.js');
}

/**
 * Create a worker for processing revenue diversification chart data
 * @returns {Object} A reusable worker for revenue diversification chart data
 */
function createRevenueDiversificationWorker() {
  return createReusableChartWorker('/charts/revenueDiversificationWorker.js');
}

/**
 * Create a worker for processing stock performance chart data
 * @returns {Object} A reusable worker for stock performance chart data
 */
function createStockPerformanceWorker() {
  return createReusableChartWorker('/charts/stockPerformanceWorker.js');
}

/**
 * Create a worker for processing competitor strength chart data
 * @returns {Object} A reusable worker for competitor strength chart data
 */
function createCompetitorStrengthWorker() {
  return createReusableChartWorker('/charts/competitorStrengthWorker.js');
}

/**
 * Create a worker for processing organizational chart data
 * @returns {Object} A reusable worker for organizational chart data
 */
function createOrganizationalChartWorker() {
  return createReusableChartWorker('/charts/organizationalChartWorker.js');
}

/**
 * Create a worker for processing quantum hardware comparison chart data
 * @returns {Object} A reusable worker for quantum hardware comparison chart data
 */
function createQuantumHardwareComparisonWorker() {
  return createReusableChartWorker('/charts/quantumHardwareComparisonWorker.js');
}

/**
 * Create a worker for processing financial metrics mixed chart data
 * @returns {Object} A reusable worker for financial metrics mixed chart data
 */
function createFinancialMetricsMixedWorker() {
  return createReusableChartWorker('/charts/financialMetricsMixedWorker.js');
}

/**
 * Create a worker for processing forecast scenarios range chart data
 * @returns {Object} A reusable worker for forecast scenarios range chart data
 */
function createForecastScenariosRangeWorker() {
  return createReusableChartWorker('/charts/forecastScenariosRangeWorker.js');
}

// Export functions to window object
window.chartWorkerFactory = {
  createChartWorker: function(type) {
    const workerMap = {
      'competitorRadar': createCompetitorRadarWorker,
      'marketSize': createMarketSizeWorker,
      'swotAnalysis': createSWOTAnalysisWorker,
      'executionRoadmap': createExecutionRoadmapWorker,
      'revenue': createRevenueWorker,
      'profitability': createProfitabilityWorker,
      'riskAssessment': createRiskAssessmentWorker,
      'topologicalTimeline': createTopologicalTimelineWorker,
      'fundingAllocation': createFundingAllocationWorker,
      'marketGrowth': createMarketGrowthWorker,
      'investmentDistribution': createInvestmentDistributionWorker,
      'roiComparison': createROIComparisonWorker,
      'marketPositioning': createMarketPositioningWorker,
      'revenueDiversification': createRevenueDiversificationWorker,
      'stockPerformance': createStockPerformanceWorker,
      'competitorStrength': createCompetitorStrengthWorker,
      'organizationalChart': createOrganizationalChartWorker,
      'quantumHardwareComparison': createQuantumHardwareComparisonWorker,
      'financialMetricsMixed': createFinancialMetricsMixedWorker,
      'forecastScenariosRange': createForecastScenariosRangeWorker
    };

    if (workerMap[type]) {
      return workerMap[type]();
    } else {
      console.error(`No worker found for type: ${type}`);
      throw new Error(`No worker found for type: ${type}`);
    }
  },
  sendWorkerMessage,
  processChartData,
  createReusableChartWorker
};
