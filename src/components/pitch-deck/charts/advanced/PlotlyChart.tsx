/**
 * PlotlyChart - Plotly.js wrapper for scientific and technical charts
 *
 * Best for: Performance metrics, quantum algorithm results,
 * scientific data with zoom/pan/export, error bars, 3D plots
 *
 * @example
 * <PlotlyChart
 *   type="scatter-with-error"
 *   data={qubitPerformanceData}
 *   title="Qubit Coherence Time Analysis"
 * />
 */

import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import type { Data, Layout, Config } from 'plotly.js';

// QDaria brand colors
const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#04a3ff',
  dark: '#1a1a1a',
  gray: '#666666',
};

interface PlotlyChartProps {
  type: 'scatter-with-error' | '3d-scatter' | 'box-plot' | 'violin' | 'contour' | 'surface-3d' | 'parallel-coordinates';
  data: any;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
  width?: number | string;
  height?: number | string;
  theme?: 'light' | 'dark';
  showLegend?: boolean;
  loading?: boolean;
  className?: string;
  onDataClick?: (data: any) => void;
}

/**
 * Generate Plotly data and layout configuration
 */
const getPlotlyConfig = (
  type: PlotlyChartProps['type'],
  data: any,
  title?: string,
  xLabel?: string,
  yLabel?: string,
  zLabel?: string,
  theme: 'light' | 'dark' = 'dark',
  showLegend: boolean = true
): { data: Data[]; layout: Partial<Layout> } => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'transparent' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#333333';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const baseLayout: Partial<Layout> = {
    title: {
      text: title || '',
      font: { size: 28, color: textColor, family: "'Inter', system-ui, sans-serif", weight: 700 },
    },
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    font: { color: textColor, family: "'Inter', system-ui, sans-serif", size: 14, weight: 500 },
    showlegend: showLegend,
    legend: {
      bgcolor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      bordercolor: QDARIA_COLORS.primary,
      borderwidth: 1,
      font: { size: 14, family: "'Inter', system-ui, sans-serif" },
    },
    xaxis: {
      title: { text: xLabel, font: { size: 16, weight: 600, family: "'Inter', system-ui, sans-serif" } },
      gridcolor: gridColor,
      color: textColor,
      tickfont: { size: 14, weight: 500, family: "'Inter', system-ui, sans-serif" },
    },
    yaxis: {
      title: { text: yLabel, font: { size: 16, weight: 600, family: "'Inter', system-ui, sans-serif" } },
      gridcolor: gridColor,
      color: textColor,
      tickfont: { size: 14, weight: 500, family: "'Inter', system-ui, sans-serif" },
    },
    margin: { l: 80, r: 40, t: 100, b: 80 },
  };

  let plotData: Data[] = [];

  switch (type) {
    case 'scatter-with-error':
      plotData = data.series.map((series: any, idx: number) => ({
        type: 'scatter',
        mode: 'markers+lines',
        name: series.name,
        x: series.x,
        y: series.y,
        error_y: series.error ? {
          type: 'data',
          array: series.error,
          visible: true,
          color: QDARIA_COLORS.primary,
        } : undefined,
        marker: {
          size: 8,
          color: series.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]],
          line: { width: 2, color: '#fff' },
        },
        line: {
          width: 2,
          color: series.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]],
        },
      }));
      break;

    case '3d-scatter':
      plotData = data.series.map((series: any, idx: number) => ({
        type: 'scatter3d',
        mode: 'markers',
        name: series.name,
        x: series.x,
        y: series.y,
        z: series.z,
        marker: {
          size: series.sizes || 5,
          color: series.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]],
          opacity: 0.8,
          line: { width: 1, color: '#fff' },
        },
      }));
      baseLayout.scene = {
        xaxis: { title: xLabel, gridcolor: gridColor, color: textColor },
        yaxis: { title: yLabel, gridcolor: gridColor, color: textColor },
        zaxis: { title: zLabel, gridcolor: gridColor, color: textColor },
        bgcolor: bgColor,
      };
      break;

    case 'box-plot':
      plotData = data.series.map((series: any, idx: number) => ({
        type: 'box',
        name: series.name,
        y: series.data,
        marker: {
          color: series.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]],
        },
        boxmean: 'sd',
      }));
      break;

    case 'violin':
      plotData = data.series.map((series: any, idx: number) => ({
        type: 'violin',
        name: series.name,
        y: series.data,
        box: { visible: true },
        meanline: { visible: true },
        fillcolor: series.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]],
        opacity: 0.6,
        line: { color: textColor },
      }));
      break;

    case 'contour':
      plotData = [{
        type: 'contour',
        z: data.z,
        x: data.x,
        y: data.y,
        colorscale: [
          [0, QDARIA_COLORS.dark],
          [0.5, QDARIA_COLORS.tertiary],
          [1, QDARIA_COLORS.primary],
        ],
        contours: {
          coloring: 'heatmap',
          showlabels: true,
          labelfont: { family: 'Inter', size: 12, color: textColor },
        },
        colorbar: {
          title: data.colorbarTitle || 'Value',
          titleside: 'right',
          titlefont: { color: textColor },
          tickfont: { color: textColor },
        },
      }];
      break;

    case 'surface-3d':
      plotData = [{
        type: 'surface',
        z: data.z,
        x: data.x,
        y: data.y,
        colorscale: [
          [0, QDARIA_COLORS.dark],
          [0.5, QDARIA_COLORS.tertiary],
          [1, QDARIA_COLORS.primary],
        ],
        contours: {
          z: { show: true, usecolormap: true, highlightcolor: QDARIA_COLORS.accent, project: { z: true } },
        },
        colorbar: {
          title: data.colorbarTitle || 'Value',
          titlefont: { color: textColor },
          tickfont: { color: textColor },
        },
      }];
      baseLayout.scene = {
        xaxis: { title: xLabel, gridcolor: gridColor, color: textColor },
        yaxis: { title: yLabel, gridcolor: gridColor, color: textColor },
        zaxis: { title: zLabel, gridcolor: gridColor, color: textColor },
        bgcolor: bgColor,
        camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
      };
      break;

    case 'parallel-coordinates':
      plotData = [{
        type: 'parcoords',
        line: {
          color: data.colorDimension || data.dimensions[0].values,
          colorscale: [
            [0, QDARIA_COLORS.dark],
            [0.5, QDARIA_COLORS.tertiary],
            [1, QDARIA_COLORS.primary],
          ],
        },
        dimensions: data.dimensions.map((dim: any) => ({
          label: dim.label,
          values: dim.values,
          range: dim.range,
        })),
      }];
      break;

    default:
      console.warn(`Unknown chart type: ${type}`);
  }

  return { data: plotData, layout: baseLayout };
};

/**
 * PlotlyChart Component - Scientific and technical charts
 */
export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  type,
  data,
  title,
  xLabel,
  yLabel,
  zLabel,
  width = '100%',
  height = 500,
  theme = 'dark',
  showLegend = true,
  loading = false,
  className = '',
  onDataClick,
}) => {
  const { data: plotData, layout } = useMemo(
    () => getPlotlyConfig(type, data, title, xLabel, yLabel, zLabel, theme, showLegend),
    [type, data, title, xLabel, yLabel, zLabel, theme, showLegend]
  );

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: title?.replace(/\s+/g, '_').toLowerCase() || 'chart',
      height: 800,
      width: 1200,
      scale: 2,
    },
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: QDARIA_COLORS.primary }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
      style={{ width, height }}
    >
      <Plot
        data={plotData}
        layout={{
          ...layout,
          width: typeof width === 'string' ? undefined : width,
          height: typeof height === 'number' ? height : undefined,
          autosize: typeof width === 'string',
        }}
        config={config}
        onClick={onDataClick}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
};

export default PlotlyChart;
