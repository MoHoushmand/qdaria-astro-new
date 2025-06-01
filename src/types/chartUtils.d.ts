/**
 * Type definitions for chart utilities
 */

interface ApexChartOptions {
  chart?: {
    type?: string;
    fontFamily?: string;
    background?: string;
    foreColor?: string;
    toolbar?: {
      show?: boolean;
      tools?: {
        download?: boolean;
        selection?: boolean;
        zoom?: boolean;
        zoomin?: boolean;
        zoomout?: boolean;
        pan?: boolean;
        reset?: boolean;
      };
    };
    animations?: any;
  };
  colors?: string[];
  grid?: any;
  tooltip?: any;
  dataLabels?: any;
  stroke?: any;
  legend?: {
    show?: boolean;
    position?: 'top' | 'bottom' | 'right' | 'left';
    horizontalAlign?: string;
    fontSize?: string;
    fontFamily?: string;
    offsetY?: number;
    itemMargin?: {
      horizontal?: number;
      vertical?: number;
    };
    labels?: {
      colors?: string;
    };
    markers?: {
      width?: number;
      height?: number;
      radius?: number;
    };
  };
  xaxis?: any;
  yaxis?: any;
  responsive?: any[];
  plotOptions?: any;
  fill?: any;
  markers?: any;
  labels?: string[];
  [key: string]: any;
}

interface ChartColors {
  primary: string[];
  secondary: string[];
  grayscale: string[];
  highContrast: string[];
}

interface ChartUtils {
  getDefaultChartOptions: (chartType?: string) => ApexChartOptions;
  toggleDataTable: (tableElement: HTMLElement, buttonElement: HTMLElement) => void;
  makeSelectable: (elements: HTMLElement[]) => void;
  formatNumber: (value: number, format?: string) => string;
  generateDataTable: (
    series: Array<{name: string, data: Array<number|string>}>,
    categories: string[],
    tableElement: HTMLElement
  ) => void;
  colors: ChartColors;
}

declare global {
  interface Window {
    chartUtils?: ChartUtils;
    ApexCharts?: any;
  }
}

export {};
