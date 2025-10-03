/**
 * ProductMixPlotly - Stacked Area Chart for Product Revenue Mix
 *
 * Visualizes product portfolio revenue composition over time using
 * interactive stacked area chart with trend analysis and export capabilities.
 *
 * @example
 * <ProductMixPlotly
 *   data={productMixData}
 *   title="Product Revenue Mix (2025-2029)"
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
  purple: '#9933ff',
  pink: '#ff3399',
  orange: '#ff9933',
  teal: '#00cc99',
  blue: '#3366ff',
  gray: '#666666',
};

interface ProductData {
  name: string;
  values: number[]; // Revenue values over time
  color?: string;
  description?: string;
  category?: string;
}

interface ProductMixData {
  periods: string[]; // Time periods (e.g., "Q1 2025", "2025", etc.)
  products: ProductData[];
  currency?: string;
  unit?: string; // e.g., "Revenue", "Units Sold"
}

interface ProductMixPlotlyProps {
  data: ProductMixData;
  title?: string;
  width?: number | string;
  height?: number | string;
  theme?: 'light' | 'dark';
  showLegend?: boolean;
  loading?: boolean;
  className?: string;
  stackMode?: 'stack' | 'percent'; // Stack by value or percentage
  onProductClick?: (product: ProductData) => void;
}

/**
 * Generate product color palette
 */
const getProductColor = (index: number, customColor?: string): string => {
  if (customColor) return customColor;

  const palette = [
    BUSINESS_COLORS.primary,
    BUSINESS_COLORS.accent,
    BUSINESS_COLORS.tertiary,
    BUSINESS_COLORS.purple,
    BUSINESS_COLORS.pink,
    BUSINESS_COLORS.orange,
    BUSINESS_COLORS.teal,
    BUSINESS_COLORS.blue,
  ];

  return palette[index % palette.length];
};

/**
 * Calculate product statistics
 */
const calculateProductStats = (product: ProductData) => {
  const total = product.values.reduce((sum, v) => sum + v, 0);
  const avg = total / product.values.length;
  const max = Math.max(...product.values);
  const min = Math.min(...product.values);

  // Calculate growth rate
  const firstValue = product.values[0] || 0;
  const lastValue = product.values[product.values.length - 1] || 0;
  const growthRate = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  return { total, avg, max, min, growthRate };
};

/**
 * Format currency value
 */
const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000_000) {
    return `${sign}$${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(2)}K`;
  }
  return `${sign}$${absValue.toFixed(0)}`;
};

/**
 * ProductMixPlotly Component
 */
export const ProductMixPlotly: React.FC<ProductMixPlotlyProps> = ({
  data,
  title = 'Product Revenue Mix Over Time',
  width = '100%',
  height = 600,
  theme = 'dark',
  showLegend = true,
  loading = false,
  className = '',
  stackMode = 'stack',
  onProductClick,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [viewMode, setViewMode] = useState<'stack' | 'percent'>(stackMode);

  const plotConfig = useMemo(() => {
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'transparent' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Generate stacked area traces for each product
    const traces: Data[] = data.products.map((product, index) => {
      const color = getProductColor(index, product.color);

      return {
        type: 'scatter',
        mode: 'lines',
        name: product.name,
        x: data.periods,
        y: product.values,
        fill: 'tonexty',
        fillcolor: color + '80', // 50% opacity
        line: {
          color: color,
          width: 2,
          shape: 'spline',
          smoothing: 0.8,
        },
        stackgroup: 'products',
        groupnorm: viewMode === 'percent' ? 'percent' : undefined,
        hovertemplate:
          '<b>%{fullData.name}</b><br>' +
          'Period: %{x}<br>' +
          'Value: ' + (viewMode === 'percent' ? '%{y:.1f}%' : `${formatCurrency(0, data.currency)} %{y:,.0f}`) + '<br>' +
          '<extra></extra>',
      };
    });

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
        orientation: 'v',
        x: 1.02,
        y: 1,
        xanchor: 'left',
      },
      xaxis: {
        title: { text: 'Time Period', font: { color: textColor } },
        gridcolor: gridColor,
        color: textColor,
        showgrid: true,
      },
      yaxis: {
        title: {
          text: viewMode === 'percent' ? 'Percentage (%)' : `${data.unit || 'Revenue'} (${data.currency || 'USD'})`,
          font: { color: textColor },
        },
        gridcolor: gridColor,
        color: textColor,
        showgrid: true,
        rangemode: 'tozero',
      },
      margin: { l: 80, r: 120, t: 80, b: 80 },
      hovermode: 'x unified',
    };

    return { data: traces, layout };
  }, [data, title, theme, showLegend, viewMode]);

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'product_mix_stacked_area',
      height: 1000,
      width: 1600,
      scale: 2,
    },
  };

  const handleClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      const productName = point.data.name;
      const product = data.products.find(p => p.name === productName);

      if (product) {
        setSelectedProduct(product);
        onProductClick?.(product);
      }
    }
  };

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const periodTotals = data.periods.map((_, periodIndex) => {
      return data.products.reduce((sum, product) => sum + (product.values[periodIndex] || 0), 0);
    });

    const total = periodTotals.reduce((sum, v) => sum + v, 0);
    const avgPerPeriod = total / data.periods.length;
    const growthRate = periodTotals[0] > 0
      ? ((periodTotals[periodTotals.length - 1] - periodTotals[0]) / periodTotals[0]) * 100
      : 0;

    return { total, avgPerPeriod, growthRate, periodTotals };
  }, [data]);

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
          <p className="text-white/70">Loading product mix analysis...</p>
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
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode('stack')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'stack'
                ? 'bg-[#CCFF00] text-black'
                : 'text-white bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            Absolute Values
          </button>
          <button
            onClick={() => setViewMode('percent')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'percent'
                ? 'bg-[#CCFF00] text-black'
                : 'text-white bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            Percentage
          </button>
        </div>

        {/* Overall Growth Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
          <span className="text-white/60 text-sm">Total Growth:</span>
          <span
            className={`text-lg font-bold ${
              overallStats.growthRate >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {overallStats.growthRate >= 0 ? '↑' : '↓'} {Math.abs(overallStats.growthRate).toFixed(1)}%
          </span>
        </div>
      </div>

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

      {/* Product Statistics Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.products.map((product, index) => {
          const stats = calculateProductStats(product);
          const color = getProductColor(index, product.color);
          const isSelected = selectedProduct?.name === product.name;

          return (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedProduct(product)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white/15 border-2'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              style={{ borderColor: isSelected ? color : undefined }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-4 h-4 rounded mt-1" style={{ backgroundColor: color }} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-white truncate">{product.name}</h4>
                  {product.category && (
                    <p className="text-xs text-white/50">{product.category}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Total:</span>
                  <span className="text-white font-semibold">{formatCurrency(stats.total, data.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Avg/Period:</span>
                  <span className="text-white font-medium">{formatCurrency(stats.avg, data.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Growth:</span>
                  <span
                    className={`font-semibold ${
                      stats.growthRate >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stats.growthRate >= 0 ? '+' : ''}{stats.growthRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-5 rounded-lg bg-white/5 border border-[#CCFF00]/30"
      >
        <h4 className="text-lg font-semibold text-white mb-4">Portfolio Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-white/60">Total Revenue:</span>
            <p className="text-xl font-bold text-[#CCFF00] mt-1">
              {formatCurrency(overallStats.total, data.currency)}
            </p>
          </div>
          <div>
            <span className="text-white/60">Avg/Period:</span>
            <p className="text-xl font-bold text-white mt-1">
              {formatCurrency(overallStats.avgPerPeriod, data.currency)}
            </p>
          </div>
          <div>
            <span className="text-white/60">Products:</span>
            <p className="text-xl font-bold text-white mt-1">{data.products.length}</p>
          </div>
          <div>
            <span className="text-white/60">Periods:</span>
            <p className="text-xl font-bold text-white mt-1">{data.periods.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Selected Product Details */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-white/10 border border-[#00d4ff]/30"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-semibold text-white">{selectedProduct.name}</h4>
              {selectedProduct.category && (
                <p className="text-sm text-white/60">{selectedProduct.category}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {selectedProduct.description && (
            <p className="text-sm text-white/80 mb-4">{selectedProduct.description}</p>
          )}

          <div className="grid grid-cols-3 gap-4">
            {selectedProduct.values.slice(0, 6).map((value, index) => (
              <div key={index} className="text-sm">
                <span className="text-white/60">{data.periods[index]}:</span>
                <p className="text-white font-medium">{formatCurrency(value, data.currency)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductMixPlotly;
