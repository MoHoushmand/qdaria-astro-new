/**
 * RiskAssessmentPlotly - 3D Surface Plot for Risk Assessment
 *
 * Visualizes risk levels across different business dimensions using
 * interactive 3D surface plot with zoom, pan, and export capabilities.
 *
 * @example
 * <RiskAssessmentPlotly
 *   data={riskData}
 *   title="Enterprise Risk Assessment Matrix"
 * />
 */

import React, { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import type { Data, Layout, Config } from 'plotly.js';

// Business plan brand colors
const BUSINESS_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#00d4ff',
  dark: '#1a1a1a',
  danger: '#ff3366',
  warning: '#ffaa00',
  success: '#00ff88',
  gray: '#666666',
};

interface RiskDataPoint {
  probability: number; // 0-100
  impact: number; // 0-100
  category: string;
  description?: string;
}

interface RiskAssessmentData {
  risks: RiskDataPoint[];
  categories?: string[];
  timeHorizon?: string; // e.g., "Q1 2025", "Year 1"
}

interface RiskAssessmentPlotlyProps {
  data: RiskAssessmentData;
  title?: string;
  width?: number | string;
  height?: number | string;
  theme?: 'light' | 'dark';
  showLegend?: boolean;
  loading?: boolean;
  className?: string;
  onRiskClick?: (risk: RiskDataPoint) => void;
}

/**
 * Generate 3D surface data for risk assessment
 * Surface represents risk severity = probability × impact
 */
const generateRiskSurface = (risks: RiskDataPoint[]) => {
  // Create grid for surface plot (20x20 resolution)
  const gridSize = 20;
  const xGrid: number[] = [];
  const yGrid: number[] = [];
  const zGrid: number[][] = [];

  // Generate probability (x) and impact (y) grid
  for (let i = 0; i <= gridSize; i++) {
    xGrid.push((i / gridSize) * 100); // Probability 0-100
    yGrid.push((i / gridSize) * 100); // Impact 0-100
  }

  // Calculate risk severity for each grid point
  for (let i = 0; i <= gridSize; i++) {
    const row: number[] = [];
    for (let j = 0; j <= gridSize; j++) {
      // Risk severity = probability × impact (normalized)
      const severity = (xGrid[j] * yGrid[i]) / 100;
      row.push(severity);
    }
    zGrid.push(row);
  }

  return { xGrid, yGrid, zGrid };
};

/**
 * Categorize risk level by severity
 */
const getRiskLevel = (severity: number): { level: string; color: string } => {
  if (severity >= 70) return { level: 'Critical', color: BUSINESS_COLORS.danger };
  if (severity >= 50) return { level: 'High', color: BUSINESS_COLORS.warning };
  if (severity >= 30) return { level: 'Medium', color: BUSINESS_COLORS.accent };
  return { level: 'Low', color: BUSINESS_COLORS.success };
};

/**
 * RiskAssessmentPlotly Component
 */
export const RiskAssessmentPlotly: React.FC<RiskAssessmentPlotlyProps> = ({
  data,
  title = '3D Risk Assessment Matrix',
  width = '100%',
  height = 600,
  theme = 'dark',
  showLegend = true,
  loading = false,
  className = '',
  onRiskClick,
}) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskDataPoint | null>(null);

  const plotConfig = useMemo(() => {
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'transparent' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

    const { xGrid, yGrid, zGrid } = generateRiskSurface(data.risks);

    // 3D Surface plot for risk landscape
    const surfaceTrace: Data = {
      type: 'surface',
      x: xGrid,
      y: yGrid,
      z: zGrid,
      colorscale: [
        [0, BUSINESS_COLORS.success],
        [0.3, BUSINESS_COLORS.accent],
        [0.5, BUSINESS_COLORS.warning],
        [0.7, BUSINESS_COLORS.danger],
        [1, '#cc0000'],
      ],
      contours: {
        z: {
          show: true,
          usecolormap: true,
          highlightcolor: BUSINESS_COLORS.primary,
          project: { z: true },
        },
      },
      colorbar: {
        title: {
          text: 'Risk Severity',
          side: 'right',
          font: { color: textColor, size: 12 },
        },
        tickfont: { color: textColor },
        thickness: 20,
        len: 0.7,
        x: 1.02,
      },
      opacity: 0.9,
      name: 'Risk Surface',
    };

    // Scatter points for actual risks
    const scatterTrace: Data = {
      type: 'scatter3d',
      mode: 'markers+text',
      x: data.risks.map(r => r.probability),
      y: data.risks.map(r => r.impact),
      z: data.risks.map(r => (r.probability * r.impact) / 100),
      text: data.risks.map(r => r.category),
      textposition: 'top center',
      textfont: { color: textColor, size: 10 },
      marker: {
        size: data.risks.map(r => 8 + (r.probability * r.impact) / 500),
        color: data.risks.map(r => {
          const severity = (r.probability * r.impact) / 100;
          return getRiskLevel(severity).color;
        }),
        opacity: 0.95,
        line: { width: 2, color: BUSINESS_COLORS.primary },
        symbol: 'diamond',
      },
      hovertemplate:
        '<b>%{text}</b><br>' +
        'Probability: %{x:.1f}%<br>' +
        'Impact: %{y:.1f}%<br>' +
        'Severity: %{z:.1f}<br>' +
        '<extra></extra>',
      name: 'Risk Points',
    };

    const layout: Partial<Layout> = {
      title: {
        text: title,
        font: { size: 20, color: textColor, family: 'Inter, sans-serif', weight: 600 },
        x: 0.5,
        xanchor: 'center',
      },
      paper_bgcolor: bgColor,
      plot_bgcolor: bgColor,
      font: { color: textColor, family: 'Inter, sans-serif' },
      showlegend: showLegend,
      legend: {
        bgcolor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
        bordercolor: BUSINESS_COLORS.primary,
        borderwidth: 1,
        x: 0,
        y: 1,
      },
      scene: {
        xaxis: {
          title: { text: 'Probability (%)', font: { color: textColor } },
          gridcolor: gridColor,
          color: textColor,
          range: [0, 100],
          showspikes: false,
        },
        yaxis: {
          title: { text: 'Impact (%)', font: { color: textColor } },
          gridcolor: gridColor,
          color: textColor,
          range: [0, 100],
          showspikes: false,
        },
        zaxis: {
          title: { text: 'Risk Severity', font: { color: textColor } },
          gridcolor: gridColor,
          color: textColor,
          range: [0, 100],
          showspikes: false,
        },
        bgcolor: bgColor,
        camera: {
          eye: { x: 1.8, y: 1.8, z: 1.3 },
          center: { x: 0, y: 0, z: -0.1 },
        },
      },
      margin: { l: 0, r: 100, t: 80, b: 0 },
      hovermode: 'closest',
    };

    return {
      data: [surfaceTrace, scatterTrace],
      layout,
    };
  }, [data, title, theme, showLegend]);

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'risk_assessment_3d',
      height: 1200,
      width: 1600,
      scale: 2,
    },
  };

  const handleClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      if (point.data.name === 'Risk Points') {
        const riskIndex = point.pointIndex;
        const risk = data.risks[riskIndex];
        setSelectedRisk(risk);
        onRiskClick?.(risk);
      }
    }
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: BUSINESS_COLORS.primary }}
          />
          <p className="text-white/70">Loading risk assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Plot
        data={plotConfig.data}
        layout={{
          ...plotConfig.layout,
          width: typeof width === 'string' ? undefined : width,
          height: typeof height === 'number' ? height : undefined,
          autosize: typeof width === 'string',
        }}
        config={config}
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
        className="rounded-lg"
      />

      {/* Risk Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { level: 'Low', range: '0-30', color: BUSINESS_COLORS.success },
          { level: 'Medium', range: '30-50', color: BUSINESS_COLORS.accent },
          { level: 'High', range: '50-70', color: BUSINESS_COLORS.warning },
          { level: 'Critical', range: '70-100', color: BUSINESS_COLORS.danger },
        ].map((item) => (
          <div key={item.level} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
            <div>
              <div className="text-sm font-semibold text-white">{item.level}</div>
              <div className="text-xs text-white/60">Severity: {item.range}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Risk Details */}
      {selectedRisk && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-white/10 border border-[#CCFF00]/30"
        >
          <h4 className="text-lg font-semibold text-white mb-2">Selected Risk: {selectedRisk.category}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/60">Probability:</span>
              <span className="ml-2 text-white font-medium">{selectedRisk.probability}%</span>
            </div>
            <div>
              <span className="text-white/60">Impact:</span>
              <span className="ml-2 text-white font-medium">{selectedRisk.impact}%</span>
            </div>
            <div className="col-span-2">
              <span className="text-white/60">Severity:</span>
              <span className="ml-2 text-white font-medium">
                {((selectedRisk.probability * selectedRisk.impact) / 100).toFixed(1)}
              </span>
              <span
                className="ml-2 px-2 py-1 rounded text-xs font-semibold"
                style={{
                  backgroundColor: getRiskLevel((selectedRisk.probability * selectedRisk.impact) / 100).color + '40',
                  color: getRiskLevel((selectedRisk.probability * selectedRisk.impact) / 100).color,
                }}
              >
                {getRiskLevel((selectedRisk.probability * selectedRisk.impact) / 100).level}
              </span>
            </div>
            {selectedRisk.description && (
              <div className="col-span-2">
                <span className="text-white/60">Description:</span>
                <p className="mt-1 text-white/80">{selectedRisk.description}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RiskAssessmentPlotly;
