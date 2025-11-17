import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/qdaria-business-plan/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Download } from 'lucide-react';
import { CHART_THEME, standardTooltipStyle, standardAxisStyle, standardGridStyle } from '@/styles/chart-theme';

// Revenue data with three scenarios
const revenueDataByScenario = {
  conservative: [
    { year: 2025, qm9: 0.15, qdiana: 0.1, zipminator: 0.08, other: 0.2 },
    { year: 2026, qm9: 1.2, qdiana: 0.8, zipminator: 0.6, other: 1.4 },
    { year: 2027, qm9: 3.0, qdiana: 2.5, zipminator: 1.5, other: 3.0 },
    { year: 2028, qm9: 7.5, qdiana: 6.25, zipminator: 3.75, other: 7.5 },
    { year: 2029, qm9: 22.5, qdiana: 18.75, zipminator: 11.25, other: 22.5 },
    { year: 2030, qm9: 52.5, qdiana: 43.75, zipminator: 26.25, other: 52.5 },
  ],
  base: [
    { year: 2025, qm9: 0.125, qdiana: 0.1, zipminator: 0.1, other: 0.175 },
    { year: 2026, qm9: 0.25, qdiana: 0.2, zipminator: 0.2, other: 0.35 },
    { year: 2027, qm9: 1.25, qdiana: 1.0, zipminator: 1.0, other: 1.75 },
    { year: 2028, qm9: 5.0, qdiana: 4.0, zipminator: 4.0, other: 7.0 },
    { year: 2029, qm9: 12.5, qdiana: 10.0, zipminator: 10.0, other: 17.5 },
    { year: 2030, qm9: 25.0, qdiana: 20.0, zipminator: 20.0, other: 35.0 },
  ],
  optimistic: [
    { year: 2025, qm9: 0.3, qdiana: 0.2, zipminator: 0.15, other: 0.35 },
    { year: 2026, qm9: 2.4, qdiana: 1.6, zipminator: 1.2, other: 2.8 },
    { year: 2027, qm9: 6.0, qdiana: 5.0, zipminator: 3.0, other: 6.0 },
    { year: 2028, qm9: 15.0, qdiana: 12.5, zipminator: 7.5, other: 15.0 },
    { year: 2029, qm9: 45.0, qdiana: 37.5, zipminator: 22.5, other: 45.0 },
    { year: 2030, qm9: 105.0, qdiana: 87.5, zipminator: 52.5, other: 105.0 },
  ],
};

type Scenario = 'conservative' | 'base' | 'optimistic';

interface ProductVisibility {
  qm9: boolean;
  qdiana: boolean;
  zipminator: boolean;
  other: boolean;
}

// Use theme colors
const PRODUCT_COLORS = {
  qm9: CHART_THEME.colors.primary,
  qdiana: CHART_THEME.colors.secondary,
  zipminator: CHART_THEME.colors.accent,
  other: CHART_THEME.colors.palette.purple,
} as const;

const PRODUCT_LABELS = {
  qm9: 'Qm9 Neural Processor',
  qdiana: 'QDiana AI Platform',
  zipminator: 'Zipminator Framework',
  other: 'Other Products',
} as const;

export const RevenueProjectionsChart: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('base');
  const [visibility, setVisibility] = useState<ProductVisibility>({
    qm9: true,
    qdiana: true,
    zipminator: true,
    other: true,
  });

  // Calculate total revenue for each year
  const enrichedData = useMemo(() => {
    return revenueDataByScenario[scenario].map((item) => ({
      ...item,
      total: item.qm9 + item.qdiana + item.zipminator + item.other,
    }));
  }, [scenario]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={standardTooltipStyle}>
          <p style={{ color: CHART_THEME.colors.text.primary, fontWeight: 'bold', marginBottom: '8px' }}>{label}</p>
          {payload.reverse().map((entry: any, index: number) => (
            <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: entry.color
                }}
              />
              <span style={{ color: CHART_THEME.colors.text.secondary, fontSize: CHART_THEME.typography.sizes.sm }}>
                {PRODUCT_LABELS[entry.dataKey as keyof typeof PRODUCT_LABELS]}:
              </span>
              <span style={{ color: CHART_THEME.colors.text.primary, fontWeight: CHART_THEME.typography.weights.bold }}>
                ${entry.value.toFixed(1)}M
              </span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${CHART_THEME.colors.chart.grid}`, marginTop: '8px', paddingTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: CHART_THEME.colors.text.secondary, fontSize: CHART_THEME.typography.sizes.sm }}>Total:</span>
              <span style={{ color: CHART_THEME.colors.text.primary, fontWeight: CHART_THEME.typography.weights.bold }}>
                ${payload.reduce((sum: number, p: any) => sum + p.value, 0).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Toggle product visibility
  const handleLegendClick = (dataKey: keyof ProductVisibility) => {
    setVisibility((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Year', 'Qm9', 'QDiana', 'Zipminator', 'Other', 'Total'];
    const rows = enrichedData.map((item) => [
      item.year,
      item.qm9.toFixed(2),
      item.qdiana.toFixed(2),
      item.zipminator.toFixed(2),
      item.other.toFixed(2),
      item.total.toFixed(2),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `revenue-projections-${scenario}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-2xl font-bold text-white">
            Revenue Projections (2025-2030)
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Scenario Selector */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              {(['conservative', 'base', 'optimistic'] as Scenario[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    scenario === s
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  aria-pressed={scenario === s}
                  aria-label={`Select ${s} revenue scenario`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setScenario(s);
                    }
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            {/* Export Button */}
            <Button
              onClick={exportToCSV}
              variant="outline"
              size="sm"
              className="border-gray-700 hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Interactive Legend */}
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          {(Object.keys(PRODUCT_LABELS) as Array<keyof ProductVisibility>).map((key) => (
            <button
              key={key}
              onClick={() => handleLegendClick(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                visibility[key]
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-900 opacity-50 hover:opacity-75'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-opacity ${
                  visibility[key] ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ backgroundColor: PRODUCT_COLORS[key] }}
              />
              <span
                className={`text-sm font-medium ${
                  visibility[key] ? 'text-white' : 'text-gray-500'
                }`}
              >
                {PRODUCT_LABELS[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Stacked Area Chart */}
        <ResponsiveContainer
          width="100%"
          height={400}
          role="region"
          aria-label={`Revenue projections for ${scenario} scenario from 2025 to 2030. Total 2025: $${enrichedData[0].total.toFixed(1)}M, Total 2030: $${enrichedData[enrichedData.length - 1].total.toFixed(1)}M. Products: Qm9 Neural Processor, QDiana AI Platform, Zipminator Framework, and Other Products`}
          tabIndex={0}
        >
          <AreaChart
            data={enrichedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            title={`Revenue projections by product for ${scenario} scenario`}
          >
            <defs>
              <linearGradient id="colorQm9" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRODUCT_COLORS.qm9} stopOpacity={0.8} />
                <stop offset="95%" stopColor={PRODUCT_COLORS.qm9} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorQdiana" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRODUCT_COLORS.qdiana} stopOpacity={0.8} />
                <stop offset="95%" stopColor={PRODUCT_COLORS.qdiana} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorZipminator" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRODUCT_COLORS.zipminator} stopOpacity={0.8} />
                <stop offset="95%" stopColor={PRODUCT_COLORS.zipminator} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRODUCT_COLORS.other} stopOpacity={0.8} />
                <stop offset="95%" stopColor={PRODUCT_COLORS.other} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid {...standardGridStyle} />
            <XAxis
              dataKey="year"
              {...standardAxisStyle}
              tickFormatter={(value) => value}
            />
            <YAxis
              {...standardAxisStyle}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            {visibility.qm9 && (
              <Area
                type="monotone"
                dataKey="qm9"
                stackId="1"
                stroke={PRODUCT_COLORS.qm9}
                fill="url(#colorQm9)"
                strokeWidth={2}
              />
            )}
            {visibility.qdiana && (
              <Area
                type="monotone"
                dataKey="qdiana"
                stackId="1"
                stroke={PRODUCT_COLORS.qdiana}
                fill="url(#colorQdiana)"
                strokeWidth={2}
              />
            )}
            {visibility.zipminator && (
              <Area
                type="monotone"
                dataKey="zipminator"
                stackId="1"
                stroke={PRODUCT_COLORS.zipminator}
                fill="url(#colorZipminator)"
                strokeWidth={2}
              />
            )}
            {visibility.other && (
              <Area
                type="monotone"
                dataKey="other"
                stackId="1"
                stroke={PRODUCT_COLORS.other}
                fill="url(#colorOther)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>

        {/* Total Revenue Line Chart */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">
            Total Revenue Trajectory
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={enrichedData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid {...standardGridStyle} />
              <XAxis
                dataKey="year"
                {...standardAxisStyle}
              />
              <YAxis
                {...standardAxisStyle}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke={CHART_THEME.colors.accent}
                strokeWidth={3}
                dot={{ fill: CHART_THEME.colors.accent, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">2025 Revenue</p>
            <p className="text-2xl font-bold text-white">
              ${enrichedData[0].total.toFixed(1)}M
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">2030 Revenue</p>
            <p className="text-2xl font-bold text-white">
              ${enrichedData[enrichedData.length - 1].total.toFixed(1)}M
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">CAGR (2025-2030)</p>
            <p className="text-2xl font-bold text-white">
              {(
                (Math.pow(
                  enrichedData[enrichedData.length - 1].total / enrichedData[0].total,
                  1 / 5
                ) -
                  1) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueProjectionsChart;
