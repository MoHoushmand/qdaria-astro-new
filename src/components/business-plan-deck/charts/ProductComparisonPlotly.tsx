import React from 'react';
import Plot from 'react-plotly.js';
import { qdariaBrand } from '../styles/design-tokens';

export const ProductComparisonPlotly = () => {
  const products = [
    { name: 'Zipminator', maturity: 90, market: 85, revenue: 92, tech: 88, customers: 87 },
    { name: 'Qm9', maturity: 75, market: 70, revenue: 68, tech: 92, customers: 65 },
    { name: 'QDiana', maturity: 45, market: 80, revenue: 35, tech: 95, customers: 40 },
    { name: 'QMikeAI', maturity: 60, market: 65, revenue: 55, tech: 85, customers: 58 },
    { name: 'QNilaya', maturity: 40, market: 55, revenue: 30, tech: 78, customers: 35 },
    { name: 'TeHaA', maturity: 55, market: 60, revenue: 48, tech: 82, customers: 50 },
    { name: 'Damon', maturity: 25, market: 70, revenue: 15, tech: 88, customers: 20 }
  ];

  const dimensions = [
    {
      label: 'Maturity',
      values: products.map(p => p.maturity),
      range: [0, 100]
    },
    {
      label: 'Market Fit',
      values: products.map(p => p.market),
      range: [0, 100]
    },
    {
      label: 'Revenue',
      values: products.map(p => p.revenue),
      range: [0, 100]
    },
    {
      label: 'Technology',
      values: products.map(p => p.tech),
      range: [0, 100]
    },
    {
      label: 'Customers',
      values: products.map(p => p.customers),
      range: [0, 100]
    }
  ];

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-6">Product Portfolio Comparison (Parallel Coordinates)</h3>
      <Plot
        data={[
          {
            type: 'parcoords',
            line: {
              color: products.map((_, i) => i),
              colorscale: [
                [0, qdariaBrand.colors.primary],
                [0.33, qdariaBrand.colors.cyan],
                [0.67, qdariaBrand.colors.green],
                [1, '#8b5cf6']
              ],
              showscale: true,
              cmin: 0,
              cmax: products.length - 1
            },
            dimensions: dimensions.map(dim => ({
              label: dim.label,
              values: dim.values,
              range: dim.range
            }))
          } as any
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#e5e7eb', family: 'system-ui', size: 12 },
          margin: { l: 120, r: 120, t: 40, b: 40 }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false
        }}
        style={{ width: '100%', height: '500px' }}
      />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
        {products.map((product, i) => (
          <div key={i} className="text-center p-3 bg-[#04a3ff]/5 rounded-lg border border-[#04a3ff]/20">
            <p className="font-bold text-[#04a3ff]">{product.name}</p>
            <p className="text-xs text-[#e5e7eb]/70 mt-1">
              Avg: {Math.round((product.maturity + product.market + product.revenue + product.tech + product.customers) / 5)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-[#e5e7eb]/70">
        <p><strong className="text-[#00ffd3]">How to read:</strong> Each line represents a product. Higher values = better performance.</p>
        <p className="mt-1">Drag axis labels to reorder dimensions and find patterns.</p>
      </div>
    </div>
  );
};
