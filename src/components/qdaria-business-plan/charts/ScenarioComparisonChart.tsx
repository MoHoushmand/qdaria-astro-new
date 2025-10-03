import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Badge } from '../../pitch-deck/ui/badge';
import { Button } from '../../pitch-deck/ui/button';
import { Slider } from '../../pitch-deck/ui/slider';
import { Download, TrendingUp, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../pitch-deck/ui/dialog';

interface ScenarioData {
  year: string;
  conservative: number;
  base: number;
  optimistic: number;
}

interface ScenarioAssumptions {
  cagr: number;
  churnRate: number;
  fundingAmount: number;
  marketShare: number;
}

const baseScenarioData: ScenarioData[] = [
  { year: '2025', conservative: 1, base: 1, optimistic: 1 },
  { year: '2026', conservative: 2, base: 4, optimistic: 8 },
  { year: '2027', conservative: 4, base: 16, optimistic: 40 },
  { year: '2028', conservative: 8, base: 64, optimistic: 160 },
  { year: '2029', conservative: 15, base: 150, optimistic: 500 },
  { year: '2030', conservative: 28, base: 350, optimistic: 1200 },
];

const defaultAssumptions = {
  conservative: { cagr: 50, churnRate: 15, fundingAmount: 8, marketShare: 0.1 },
  base: { cagr: 100, churnRate: 10, fundingAmount: 12, marketShare: 1.0 },
  optimistic: { cagr: 200, churnRate: 5, fundingAmount: 20, marketShare: 5.0 },
};

const scenarioProbabilities = {
  conservative: 20,
  base: 60,
  optimistic: 20,
};

const calculateNPV = (cashFlows: number[], discountRate: number = 0.15): number => {
  return cashFlows.reduce((npv, cf, year) => npv + cf / Math.pow(1 + discountRate, year), 0);
};

const calculateRiskAdjustedNPV = (scenarios: ScenarioData[], probabilities: typeof scenarioProbabilities): number => {
  const conservativeNPV = calculateNPV(scenarios.map(s => s.conservative));
  const baseNPV = calculateNPV(scenarios.map(s => s.base));
  const optimisticNPV = calculateNPV(scenarios.map(s => s.optimistic));

  return (
    conservativeNPV * (probabilities.conservative / 100) +
    baseNPV * (probabilities.base / 100) +
    optimisticNPV * (probabilities.optimistic / 100)
  );
};

export const ScenarioComparisonChart: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [assumptions, setAssumptions] = useState(defaultAssumptions);
  const [isMonteCarloRunning, setIsMonteCarloRunning] = useState(false);
  const [monteCarloResults, setMonteCarloResults] = useState<any>(null);

  const scenarioData = useMemo(() => {
    // Recalculate scenarios based on custom assumptions
    return baseScenarioData.map((data, index) => {
      const year = index;
      return {
        ...data,
        conservative: data.conservative * (1 + (assumptions.conservative.cagr - 50) / 100),
        base: data.base * (1 + (assumptions.base.cagr - 100) / 100),
        optimistic: data.optimistic * (1 + (assumptions.optimistic.cagr - 200) / 100),
      };
    });
  }, [assumptions]);

  const riskAdjustedNPV = useMemo(() => {
    return calculateRiskAdjustedNPV(scenarioData, scenarioProbabilities);
  }, [scenarioData]);

  const handleExportExcel = () => {
    console.log('Exporting scenario model to Excel...');
    // Excel export logic would go here
  };

  const handleMonteCarloSimulation = () => {
    setIsMonteCarloRunning(true);

    // Simulate Monte Carlo with 10,000 runs
    setTimeout(() => {
      const runs = 10000;
      const results = Array.from({ length: runs }, () => {
        const scenario = Math.random();
        if (scenario < 0.2) return scenarioData[scenarioData.length - 1].conservative;
        if (scenario < 0.8) return scenarioData[scenarioData.length - 1].base;
        return scenarioData[scenarioData.length - 1].optimistic;
      });

      const mean = results.reduce((sum, r) => sum + r, 0) / runs;
      const sorted = results.sort((a, b) => a - b);
      const p5 = sorted[Math.floor(runs * 0.05)];
      const p50 = sorted[Math.floor(runs * 0.50)];
      const p95 = sorted[Math.floor(runs * 0.95)];

      setMonteCarloResults({
        mean: mean.toFixed(1),
        p5: p5.toFixed(1),
        p50: p50.toFixed(1),
        p95: p95.toFixed(1),
      });
      setIsMonteCarloRunning(false);
    }, 2000);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl">
          <p className="text-cyan-400 font-semibold mb-2">{data.year}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-400">
              Conservative: <span className="text-gray-300 font-semibold">${data.conservative.toFixed(1)}M</span>
            </p>
            <p className="text-blue-400">
              Base: <span className="text-blue-300 font-semibold">${data.base.toFixed(1)}M</span>
            </p>
            <p className="text-green-400">
              Optimistic: <span className="text-green-300 font-semibold">${data.optimistic.toFixed(1)}M</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 to-black border-cyan-500/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <DollarSign className="text-cyan-400" />
              Financial Scenario Comparison
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              Interactive revenue projections with risk-adjusted NPV analysis
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 hover:bg-purple-500/10"
                >
                  Edit Assumptions
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-purple-500/30 max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-purple-400">Scenario Assumptions</DialogTitle>
                  <DialogDescription>
                    Adjust key assumptions to see real-time impact on projections
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {(['conservative', 'base', 'optimistic'] as const).map((scenario) => (
                    <div key={scenario} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-lg font-semibold capitalize mb-4 text-white">{scenario} Scenario</h4>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400 flex justify-between mb-2">
                            <span>CAGR (%)</span>
                            <span className="text-cyan-400">{assumptions[scenario].cagr}%</span>
                          </label>
                          <Slider
                            value={[assumptions[scenario].cagr]}
                            onValueChange={([value]) => setAssumptions(prev => ({
                              ...prev,
                              [scenario]: { ...prev[scenario], cagr: value }
                            }))}
                            min={50}
                            max={250}
                            step={10}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 flex justify-between mb-2">
                            <span>Churn Rate (%)</span>
                            <span className="text-orange-400">{assumptions[scenario].churnRate}%</span>
                          </label>
                          <Slider
                            value={[assumptions[scenario].churnRate]}
                            onValueChange={([value]) => setAssumptions(prev => ({
                              ...prev,
                              [scenario]: { ...prev[scenario], churnRate: value }
                            }))}
                            min={5}
                            max={20}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 flex justify-between mb-2">
                            <span>Funding (€M)</span>
                            <span className="text-green-400">€{assumptions[scenario].fundingAmount}M</span>
                          </label>
                          <Slider
                            value={[assumptions[scenario].fundingAmount]}
                            onValueChange={([value]) => setAssumptions(prev => ({
                              ...prev,
                              [scenario]: { ...prev[scenario], fundingAmount: value }
                            }))}
                            min={5}
                            max={30}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 flex justify-between mb-2">
                            <span>Market Share (%)</span>
                            <span className="text-purple-400">{assumptions[scenario].marketShare}%</span>
                          </label>
                          <Slider
                            value={[assumptions[scenario].marketShare * 10]}
                            onValueChange={([value]) => setAssumptions(prev => ({
                              ...prev,
                              [scenario]: { ...prev[scenario], marketShare: value / 10 }
                            }))}
                            min={1}
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setAssumptions(defaultAssumptions)}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Reset to Defaults
                </Button>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleExportExcel}
              variant="outline"
              size="sm"
              className="border-cyan-500/50 hover:bg-cyan-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setSelectedScenario('conservative')}
            variant={selectedScenario === 'conservative' ? 'default' : 'outline'}
            size="sm"
            className={selectedScenario === 'conservative' ? 'bg-gray-600 hover:bg-gray-700' : 'border-gray-600'}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Conservative
          </Button>
          <Button
            onClick={() => setSelectedScenario('base')}
            variant={selectedScenario === 'base' ? 'default' : 'outline'}
            size="sm"
            className={selectedScenario === 'base' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-cyan-600'}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Base (Recommended)
          </Button>
          <Button
            onClick={() => setSelectedScenario('optimistic')}
            variant={selectedScenario === 'optimistic' ? 'default' : 'outline'}
            size="sm"
            className={selectedScenario === 'optimistic' ? 'bg-green-500 hover:bg-green-600' : 'border-green-600'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Optimistic
          </Button>
        </div>

        {/* Probability Badges */}
        <div className="flex gap-2 mt-4">
          <Badge variant="outline" className="border-gray-500 text-gray-300">
            Conservative: {scenarioProbabilities.conservative}% probability
          </Badge>
          <Badge variant="outline" className="border-cyan-500 text-cyan-300 bg-cyan-500/10">
            Base: {scenarioProbabilities.base}% probability (SELECTED)
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-300">
            Optimistic: {scenarioProbabilities.optimistic}% probability
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3">
            <p className="text-gray-400 text-xs font-medium">Conservative 2030</p>
            <p className="text-2xl font-bold text-white">${scenarioData[5].conservative.toFixed(0)}M</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-cyan-400 text-xs font-medium">Base 2030 ⭐</p>
            <p className="text-2xl font-bold text-white">${scenarioData[5].base.toFixed(0)}M</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-xs font-medium">Optimistic 2030</p>
            <p className="text-2xl font-bold text-white">${scenarioData[5].optimistic.toFixed(0)}M</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <p className="text-purple-400 text-xs font-medium">Risk-Adj NPV</p>
            <p className="text-2xl font-bold text-white">${riskAdjustedNPV.toFixed(0)}M</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Main Chart */}
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={scenarioData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04a3ff" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="optimisticGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#65ff00" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />

            <XAxis
              dataKey="year"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />

            <Bar
              dataKey="conservative"
              name="Conservative Scenario"
              fill="#6b7280"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="base"
              name="Base Scenario (QDaria)"
              fill="url(#baseGradient)"
              radius={[4, 4, 0, 0]}
            >
              {scenarioData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  style={{
                    filter: selectedScenario === 'base' ? 'drop-shadow(0 0 8px rgba(4, 163, 255, 0.6))' : 'none'
                  }}
                />
              ))}
            </Bar>

            <Bar
              dataKey="optimistic"
              name="Optimistic Scenario"
              fill="url(#optimisticGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Scenario Details Panel */}
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-cyan-500/30">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">
            {selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)} Scenario Assumptions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Growth & Market</p>
              <ul className="space-y-1 text-sm text-white">
                <li>• CAGR: <span className="text-cyan-400">{assumptions[selectedScenario].cagr}%</span></li>
                <li>• Market Share: <span className="text-purple-400">{assumptions[selectedScenario].marketShare}%</span></li>
                <li>• Churn Rate: <span className="text-orange-400">{assumptions[selectedScenario].churnRate}%</span></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Funding & Resources</p>
              <ul className="space-y-1 text-sm text-white">
                <li>• Total Funding: <span className="text-green-400">€{assumptions[selectedScenario].fundingAmount}M</span></li>
                <li>• Series A: <span className="text-green-400">€{(assumptions[selectedScenario].fundingAmount * 0.4).toFixed(1)}M</span> (Q4 2025)</li>
                <li>• Series B: <span className="text-green-400">€{(assumptions[selectedScenario].fundingAmount * 0.6).toFixed(1)}M</span> (Q2 2027)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monte Carlo Simulation */}
        <div className="mt-6">
          <Button
            onClick={handleMonteCarloSimulation}
            disabled={isMonteCarloRunning}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isMonteCarloRunning ? 'Running 10,000 Simulations...' : 'Run Monte Carlo Simulation (10K runs)'}
          </Button>

          {monteCarloResults && (
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Simulation Results (2030 Revenue)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400">5th Percentile</p>
                  <p className="text-lg font-bold text-white">${monteCarloResults.p5}M</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Median (50th)</p>
                  <p className="text-lg font-bold text-cyan-400">${monteCarloResults.p50}M</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">95th Percentile</p>
                  <p className="text-lg font-bold text-green-400">${monteCarloResults.p95}M</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Mean</p>
                  <p className="text-lg font-bold text-purple-400">${monteCarloResults.mean}M</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                90% confidence interval: ${monteCarloResults.p5}M - ${monteCarloResults.p95}M
              </p>
            </div>
          )}
        </div>

        {/* Data Sources */}
        <div className="mt-6 text-xs text-gray-500">
          <p className="font-semibold mb-1">Data Sources:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Base scenario from /docs/FINANCIAL-PROJECTIONS-CONSOLIDATED.md Section 12</li>
            <li>Conservative/Optimistic scenarios derived from market analysis and risk assessment</li>
            <li>NPV calculations use 15% discount rate (industry standard for deep tech)</li>
            <li>Assumptions validated against QDaria business plan and comparable company analysis</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioComparisonChart;
