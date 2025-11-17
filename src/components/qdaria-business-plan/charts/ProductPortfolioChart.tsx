import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Button } from '@/components/qdaria-business-plan/ui/button';
import { Download, TrendingUp, Rocket, FlaskConical } from 'lucide-react';

export interface ProductData {
  id: string;
  label: string;
  value: number;
  stage: 'MVP' | 'Beta' | 'GA';
  growth: number; // Percentage growth rate
  description: string;
  color: string;
}

const productData: ProductData[] = [
  {
    id: 'Qm9',
    label: 'Qm9 Platform',
    value: 25000000,
    stage: 'Beta',
    growth: 200,
    description: 'Quantum Fintech Platform',
    color: '#00CED1'
  },
  {
    id: 'QDiana',
    label: 'QDiana',
    value: 20000000,
    stage: 'Beta',
    growth: 180,
    description: 'AI Governance & Education',
    color: '#9b59b6'
  },
  {
    id: 'Zipminator',
    label: 'Zipminator',
    value: 20000000,
    stage: 'Beta',
    growth: 150,
    description: 'Quantum Compression',
    color: '#3498db'
  },
  {
    id: 'Other',
    label: 'Other Products',
    value: 35000000,
    stage: 'MVP',
    growth: 100,
    description: 'QMikeAI, QNilaya, TeHaA, Damon, and others',
    color: '#95a5a6'
  }
];

const totalRevenue = productData.reduce((sum, p) => sum + p.value, 0);

const ProductPortfolioChart: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'GA':
        return <Rocket className="w-4 h-4 text-green-500" />;
      case 'Beta':
        return <FlaskConical className="w-4 h-4 text-blue-500" />;
      case 'MVP':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const exportToPNG = () => {
    // Simple export - in production, use html2canvas or similar
    const chartElement = document.getElementById('product-portfolio-chart');
    if (chartElement) {
      alert('Export functionality requires html2canvas library. Chart ready for export.');
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  // Calculate percentage
  const getPercentage = (value: number) => {
    return ((value / totalRevenue) * 100).toFixed(1);
  };

  // Generate sparkline data (simplified visual representation)
  const generateSparkline = (growth: number) => {
    const points = [];
    let current = 100;
    for (let i = 0; i < 5; i++) {
      points.push(current);
      current *= (1 + growth / 100 / 5);
    }
    return points;
  };

  const renderSparkline = (growth: number) => {
    const points = generateSparkline(growth);
    const max = Math.max(...points);
    const normalized = points.map(p => (p / max) * 20);

    return (
      <svg width="60" height="20" className="inline-block ml-2">
        <polyline
          points={normalized.map((y, i) => `${i * 15},${20 - y}`).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-green-500"
        />
      </svg>
    );
  };

  return (
    <Card className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-cyan-500/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Product Portfolio Analysis
          </CardTitle>
          <Button
            onClick={exportToPNG}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 hover:bg-cyan-500/10"
            aria-label="Export product portfolio chart as PNG"
          >
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Export PNG
          </Button>
        </div>
        <p className="text-slate-400 text-sm">Revenue breakdown by 2030 - Total: $100M (base case)</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div
            className="lg:col-span-2"
            role="region"
            aria-label="Product portfolio pie chart showing revenue breakdown by 2030: Qm9 Platform $25M (25%), QDiana $20M (20%), Zipminator $20M (20%), Other Products $35M (35%), totaling $100M. All products showing 150-200% growth rates"
          >
            <div id="product-portfolio-chart" className="h-[500px] relative" tabIndex={0}>
              <ResponsivePie
                data={productData.map(p => ({
                  id: p.id,
                  label: p.label,
                  value: p.value,
                  color: p.color
                }))}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                title="Product portfolio revenue distribution by 2030"
                innerRadius={0.6}
                padAngle={2}
                cornerRadius={4}
                activeOuterRadiusOffset={12}
                colors={{ datum: 'data.color' }}
                borderWidth={2}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 0.3]]
                }}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#e2e8f0"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#000212"
                arcLabel={d => `${getPercentage(d.value)}%`}
                onClick={(node) => {
                  setSelectedProduct(node.id as string);
                  setShowDetails(true);
                }}
                tooltip={({ datum }) => {
                  const product = productData.find(p => p.id === datum.id);
                  if (!product) return null;

                  return (
                    <div className="bg-slate-800 border border-cyan-500/30 rounded-lg p-3 shadow-xl backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                        <span className="font-bold text-white">{product.label}</span>
                        {getStageIcon(product.stage)}
                      </div>
                      <div className="text-slate-300 text-sm space-y-1">
                        <div>{product.description}</div>
                        <div className="font-semibold text-cyan-400">
                          Revenue: {formatCurrency(product.value)}
                        </div>
                        <div className="text-green-400">
                          Growth: +{product.growth}% YoY
                        </div>
                        <div className="text-purple-400">
                          Market Share: {getPercentage(product.value)}%
                        </div>
                      </div>
                    </div>
                  );
                }}
                theme={{
                  fontSize: 12,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  tooltip: {
                    container: {
                      background: 'transparent',
                      padding: 0,
                      border: 'none',
                      boxShadow: 'none'
                    }
                  }
                }}
                layers={[
                  'arcs',
                  'arcLabels',
                  'arcLinkLabels',
                  'legends',
                  ({ centerX, centerY }) => (
                    <g key="center-metric">
                      <text
                        x={centerX}
                        y={centerY - 10}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                          fontSize: '28px',
                          fontWeight: 700,
                          fill: '#00CED1'
                        }}
                      >
                        {formatCurrency(totalRevenue)}
                      </text>
                      <text
                        x={centerX}
                        y={centerY + 20}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                          fontSize: '14px',
                          fill: '#94a3b8'
                        }}
                      >
                        Total Revenue 2030
                      </text>
                    </g>
                  )
                ]}
              />
            </div>
          </div>

          {/* Legend Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Product Portfolio</h3>
            {productData.map((product) => (
              <div
                key={product.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedProduct === product.id
                    ? 'bg-cyan-500/10 border-cyan-500/50'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/30'
                }`}
                onClick={() => {
                  setSelectedProduct(product.id);
                  setShowDetails(true);
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedProduct === product.id}
                aria-label={`${product.label}: ${formatCurrency(product.value)} revenue (${getPercentage(product.value)}% of portfolio), ${product.stage} stage, ${product.growth}% growth`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(product.id);
                    setShowDetails(true);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="font-semibold text-white text-sm">{product.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStageIcon(product.stage)}
                    <span className="text-xs text-slate-400">{product.stage}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-2">{product.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400 font-semibold">
                    {formatCurrency(product.value)}
                  </span>
                  <span className="text-slate-400">
                    {getPercentage(product.value)}%
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-green-400">+{product.growth}%</span>
                  {renderSparkline(product.growth)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Product Details */}
        {showDetails && selectedProduct && (
          <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-cyan-500/30">
            {(() => {
              const product = productData.find(p => p.id === selectedProduct);
              if (!product) return null;

              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      {product.label}
                      {getStageIcon(product.stage)}
                      <span className="text-sm text-slate-400">({product.stage})</span>
                    </h4>
                    <Button
                      onClick={() => setShowDetails(false)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-slate-400 text-xs mb-1">2030 Revenue</div>
                      <div className="text-cyan-400 text-lg font-bold">
                        {formatCurrency(product.value)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Growth Rate</div>
                      <div className="text-green-400 text-lg font-bold">+{product.growth}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Portfolio Share</div>
                      <div className="text-purple-400 text-lg font-bold">
                        {getPercentage(product.value)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Category</div>
                      <div className="text-white text-lg font-bold text-sm">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Accessibility Info */}
        <div className="mt-4 text-xs text-slate-500 text-center">
          Click on chart segments or legend items to view detailed product information. Use keyboard Tab + Enter for navigation.
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPortfolioChart;
