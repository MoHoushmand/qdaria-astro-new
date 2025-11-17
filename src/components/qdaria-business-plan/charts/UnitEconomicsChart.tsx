import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Label,
} from 'recharts';

// TypeScript interfaces
interface WaterfallStep {
  name: string;
  value: number;
  cumulative: number;
  type: 'positive' | 'negative' | 'total';
  description: string;
}

interface ProductBreakdown {
  product: string;
  cac: number;
  ltv: number;
  ratio: number;
  paybackMonths: number;
}

interface UnitEconomicsData {
  cac: number;
  ltv: number;
  ratio: number;
  paybackMonths: number;
  firstYearValue: number;
  expansionRevenue: number;
  retentionValue: number;
  grossMargin: number;
}

// QDaria brand colors
const COLORS = {
  primary: '#04a3ff',
  success: '#65ff00',
  warning: '#ffbb00',
  danger: '#ff4444',
  background: '#000212',
  gradient1: '#04a3ff',
  gradient2: '#65ff00',
};

// Unit economics data (standardized across business plan)
const unitEconomics: UnitEconomicsData = {
  cac: 12500,
  ltv: 100000,
  ratio: 8.0,
  paybackMonths: 4.2,
  firstYearValue: 35000,
  expansionRevenue: 40000,
  retentionValue: 25000,
  grossMargin: 0.70, // Aligned with 2030 gross margin projection
};

// Product-level breakdown
const productBreakdown: ProductBreakdown[] = [
  { product: 'Qm9 (Finance)', cac: 15000, ltv: 120000, ratio: 8.0, paybackMonths: 4.0 },
  { product: 'QDiana (Education)', cac: 10000, ltv: 80000, ratio: 8.0, paybackMonths: 4.2 },
  { product: 'Zipminator (Security)', cac: 12500, ltv: 100000, ratio: 8.0, paybackMonths: 4.5 },
];

// Calculate waterfall steps
const calculateWaterfallData = (): WaterfallStep[] => {
  const steps: WaterfallStep[] = [
    {
      name: 'CAC',
      value: -unitEconomics.cac,
      cumulative: -unitEconomics.cac,
      type: 'negative',
      description: 'Customer Acquisition Cost: Initial investment to acquire customer',
    },
    {
      name: 'First Year',
      value: unitEconomics.firstYearValue,
      cumulative: -unitEconomics.cac + unitEconomics.firstYearValue,
      type: 'positive',
      description: 'First year revenue from customer',
    },
    {
      name: 'Expansion',
      value: unitEconomics.expansionRevenue,
      cumulative: -unitEconomics.cac + unitEconomics.firstYearValue + unitEconomics.expansionRevenue,
      type: 'positive',
      description: 'Expansion revenue from upsells and cross-sells',
    },
    {
      name: 'Retention',
      value: unitEconomics.retentionValue,
      cumulative: -unitEconomics.cac + unitEconomics.firstYearValue + unitEconomics.expansionRevenue + unitEconomics.retentionValue,
      type: 'positive',
      description: 'Long-term retention value (Years 2-5)',
    },
    {
      name: 'LTV',
      value: unitEconomics.ltv,
      cumulative: unitEconomics.ltv,
      type: 'total',
      description: `Customer Lifetime Value: $${(unitEconomics.ltv / 1000).toFixed(0)}K`,
    },
  ];

  return steps;
};

interface UnitEconomicsChartProps {
  className?: string;
}

export const UnitEconomicsChart: React.FC<UnitEconomicsChartProps> = ({ className = '' }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('All Products');
  const [drillDownIndex, setDrillDownIndex] = useState<number | null>(null);

  const waterfallData = calculateWaterfallData();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div
        className="bg-[#000212]/95 border border-[#04a3ff]/30 rounded-lg p-4 backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(4, 163, 255, 0.3)' }}
      >
        <h4 className="text-white font-bold mb-2">{data.name}</h4>
        <p className="text-gray-300 text-sm mb-2">{data.description}</p>
        <div className="space-y-1">
          <p className="text-[#04a3ff] font-semibold">
            Value: ${Math.abs(data.value).toLocaleString()}
          </p>
          <p className="text-[#65ff00]">
            Cumulative: ${data.cumulative.toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  // Custom bar shape for waterfall connectors
  const CustomBar = (props: any) => {
    const { x, y, width, height, payload, index } = props;
    const isNegative = payload.type === 'negative';
    const isTotal = payload.type === 'total';

    let fill = COLORS.success;
    if (isNegative) fill = COLORS.danger;
    if (isTotal) fill = COLORS.primary;

    // Add glow effect
    const glowFilter = `drop-shadow(0 0 8px ${fill})`;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          fillOpacity={0.8}
          stroke={fill}
          strokeWidth={2}
          style={{ filter: glowFilter, cursor: 'pointer' }}
          onClick={() => setDrillDownIndex(index)}
        />
        {index < waterfallData.length - 1 && (
          <line
            x1={x + width}
            y1={y + height / 2}
            x2={x + width + 20}
            y2={y + height / 2}
            stroke={COLORS.primary}
            strokeWidth={2}
            strokeDasharray="5,5"
            opacity={0.6}
          />
        )}
      </g>
    );
  };

  return (
    <div
      className={`bg-gradient-to-br from-[#000212] to-[#001a2e] rounded-xl p-6 border border-[#04a3ff]/30 ${className}`}
      role="region"
      aria-label="Unit Economics Waterfall showing customer acquisition cost of $12.5K flowing to lifetime value of $100K with 8:1 LTV/CAC ratio and 4.2 month payback period"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Unit Economics Waterfall</h3>
        <p className="text-gray-400 text-sm">
          From Customer Acquisition Cost (CAC) to Lifetime Value (LTV)
        </p>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <div className="text-gray-400 text-xs mb-1">CAC/LTV Ratio</div>
          <div className="text-2xl font-bold text-[#65ff00]">{unitEconomics.ratio}:1</div>
          <div className="text-xs text-gray-500 mt-1">vs 3:1 industry avg</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <div className="text-gray-400 text-xs mb-1">Payback Period</div>
          <div className="text-2xl font-bold text-[#65ff00]">{unitEconomics.paybackMonths} mo</div>
          <div className="text-xs text-gray-500 mt-1">48% faster than avg</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <div className="text-gray-400 text-xs mb-1">Gross Margin</div>
          <div className="text-2xl font-bold text-[#04a3ff]">{(unitEconomics.grossMargin * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-500 mt-1">2030 projection</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <div className="text-gray-400 text-xs mb-1">Customer LTV</div>
          <div className="text-2xl font-bold text-[#04a3ff]">${(unitEconomics.ltv / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-500 mt-1">Enterprise segment</div>
        </div>
      </div>

      {/* Product Toggle */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm mb-2 block">Product Breakdown:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedProduct('All Products')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedProduct === 'All Products'
                ? 'bg-[#04a3ff] text-white'
                : 'bg-[#04a3ff]/20 text-gray-300 hover:bg-[#04a3ff]/30'
            }`}
            aria-pressed={selectedProduct === 'All Products'}
            aria-label="View all products unit economics"
          >
            All Products
          </button>
          {productBreakdown.map((product) => (
            <button
              key={product.product}
              onClick={() => setSelectedProduct(product.product)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedProduct === product.product
                  ? 'bg-[#65ff00] text-black'
                  : 'bg-[#65ff00]/20 text-gray-300 hover:bg-[#65ff00]/30'
              }`}
              aria-pressed={selectedProduct === product.product}
              aria-label={`View ${product.product} unit economics details`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProduct(product.product);
                }
              }}
            >
              {product.product}
            </button>
          ))}
        </div>
      </div>

      {/* Waterfall Chart */}
      <ResponsiveContainer
        width="100%"
        height={450}
        role="region"
        aria-label={`Unit economics waterfall for ${selectedProduct} showing progression from customer acquisition cost of $12.5K through first year revenue $${unitEconomics.firstYearValue.toLocaleString()}, expansion revenue $${unitEconomics.expansionRevenue.toLocaleString()}, and retention value $${unitEconomics.retentionValue.toLocaleString()} to final lifetime value of $100K with industry-leading 8:1 LTV/CAC ratio, 4.2 month payback period, and 70% gross margin`}
        tabIndex={0}
      >
        <ComposedChart
          data={waterfallData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          title="Unit economics from acquisition to lifetime value with waterfall visualization"
        >
          <defs>
            <linearGradient id="waterfallGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.gradient1} stopOpacity={0.8} />
              <stop offset="100%" stopColor={COLORS.gradient2} stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#04a3ff" opacity={0.1} />

          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            angle={-15}
            textAnchor="end"
            height={80}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />

          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />

          <ReferenceLine
            y={0}
            stroke="#65ff00"
            strokeWidth={2}
            strokeDasharray="5 5"
          >
            <Label value="Break-even" position="insideTopRight" fill="#65ff00" />
          </ReferenceLine>

          <Bar
            dataKey="value"
            fill="url(#waterfallGradient)"
            shape={<CustomBar />}
            name="Value ($)"
          />

          <Line
            type="monotone"
            dataKey="cumulative"
            stroke={COLORS.primary}
            strokeWidth={3}
            dot={{ fill: COLORS.primary, r: 6, strokeWidth: 2, stroke: '#fff' }}
            name="Cumulative LTV"
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Drill-down Details */}
      {drillDownIndex !== null && (
        <div className="mt-6 bg-[#000212]/60 rounded-lg p-4 border border-[#65ff00]/30">
          <h4 className="text-white font-bold mb-2">
            {waterfallData[drillDownIndex].name} Details
          </h4>
          <p className="text-gray-300 text-sm mb-3">
            {waterfallData[drillDownIndex].description}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-gray-400 text-xs">Step Value:</span>
              <p className="text-[#04a3ff] font-bold">
                ${Math.abs(waterfallData[drillDownIndex].value).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Cumulative:</span>
              <p className="text-[#65ff00] font-bold">
                ${waterfallData[drillDownIndex].cumulative.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDrillDownIndex(null)}
            className="mt-3 px-4 py-1 bg-[#04a3ff]/20 hover:bg-[#04a3ff]/30 text-white rounded text-sm"
          >
            Close Details
          </button>
        </div>
      )}

      {/* Benchmark Comparison */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#65ff00]/20">
          <h4 className="text-white font-semibold mb-2 text-sm">QDaria</h4>
          <div className="text-[#65ff00] text-2xl font-bold">8:1</div>
          <div className="text-gray-400 text-xs mt-1">LTV/CAC Ratio</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#ffbb00]/20">
          <h4 className="text-white font-semibold mb-2 text-sm">Industry Average</h4>
          <div className="text-[#ffbb00] text-2xl font-bold">3:1</div>
          <div className="text-gray-400 text-xs mt-1">LTV/CAC Ratio</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <h4 className="text-white font-semibold mb-2 text-sm">Advantage</h4>
          <div className="text-[#04a3ff] text-2xl font-bold">+167%</div>
          <div className="text-gray-400 text-xs mt-1">Better than avg</div>
        </div>
      </div>

      {/* Product-specific metrics */}
      {selectedProduct !== 'All Products' && (
        <div className="mt-6 bg-gradient-to-r from-[#04a3ff]/10 to-[#65ff00]/10 rounded-lg p-4 border border-[#04a3ff]/30">
          {productBreakdown
            .filter((p) => p.product === selectedProduct)
            .map((product) => (
              <div key={product.product}>
                <h4 className="text-white font-bold mb-3">{product.product} Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <div className="text-gray-400 text-xs">CAC</div>
                    <div className="text-white font-bold">${(product.cac / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">LTV</div>
                    <div className="text-[#65ff00] font-bold">${(product.ltv / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Ratio</div>
                    <div className="text-[#04a3ff] font-bold">{product.ratio}:1</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Payback</div>
                    <div className="text-white font-bold">{product.paybackMonths} mo</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Accessibility note */}
      <div className="mt-4 text-xs text-gray-500 italic">
        Click on bars for detailed breakdown. Use product toggles to view specific metrics.
      </div>
    </div>
  );
};

export default UnitEconomicsChart;
