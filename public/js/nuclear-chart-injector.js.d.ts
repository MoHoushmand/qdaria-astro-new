/**
 * TypeScript declaration file for nuclear-chart-injector.js
 * This helps TypeScript recognize the file as a valid JavaScript module with no exports
 */

// Define the global functions/variables used by the script to prevent TS errors
interface Window {
  chartTypeMap?: {[key: string]: string};
  chartSvgs?: {[key: string]: string};
  initCharts?: () => void;
  injectCharts?: () => void;
  findUnloadedCharts?: () => HTMLElement[];
  getChartType?: (chartId: string) => string;
  getChartHeight?: (chartType: string) => string;
}

// No exports - this is an IIFE script
export {};
