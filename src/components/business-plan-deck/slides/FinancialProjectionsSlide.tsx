import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart, Target, Briefcase, Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { AnimatedLineChart } from '../../pitch-deck/charts/AnimatedLineChart';
import { AnimatedBarChart } from '../../pitch-deck/charts/AnimatedBarChart';
import { AnimatedAreaChart } from '../../pitch-deck/charts/AnimatedAreaChart';
import { AnimatedPieChart } from '../../pitch-deck/charts/AnimatedPieChart';
import { MetricCard } from '../cards/MetricCard';
import '../styles/index.css';

export const FinancialProjectionsSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');

  const revenueData = {
    conservative: [
      { year: '2025', revenue: 0.5, hardware: 0.3, software: 0.1, ai: 0.1 },
      { year: '2026', revenue: 2, hardware: 1, software: 0.6, ai: 0.4 },
      { year: '2027', revenue: 8, hardware: 3, software: 3, ai: 2 },
      { year: '2028', revenue: 25, hardware: 8, software: 10, ai: 7 },
      { year: '2029', revenue: 65, hardware: 20, software: 28, ai: 17 },
      { year: '2030', revenue: 150, hardware: 40, software: 70, ai: 40 }
    ],
    base: [
      { year: '2025', revenue: 1, hardware: 0.5, software: 0.3, ai: 0.2 },
      { year: '2026', revenue: 5, hardware: 2, software: 2, ai: 1 },
      { year: '2027', revenue: 15, hardware: 5, software: 6, ai: 4 },
      { year: '2028', revenue: 50, hardware: 15, software: 22, ai: 13 },
      { year: '2029', revenue: 150, hardware: 40, software: 70, ai: 40 },
      { year: '2030', revenue: 350, hardware: 90, software: 170, ai: 90 }
    ],
    optimistic: [
      { year: '2025', revenue: 2, hardware: 1, software: 0.6, ai: 0.4 },
      { year: '2026', revenue: 10, hardware: 4, software: 4, ai: 2 },
      { year: '2027', revenue: 30, hardware: 10, software: 12, ai: 8 },
      { year: '2028', revenue: 100, hardware: 30, software: 45, ai: 25 },
      { year: '2029', revenue: 300, hardware: 80, software: 140, ai: 80 },
      { year: '2030', revenue: 700, hardware: 180, software: 340, ai: 180 }
    ]
  };

  const profitabilityData = {
    conservative: [
      { year: '2025', ebitda: -2, margin: -400 },
      { year: '2026', ebitda: -3, margin: -150 },
      { year: '2027', ebitda: -2, margin: -25 },
      { year: '2028', ebitda: 3, margin: 12 },
      { year: '2029', ebitda: 15, margin: 23 },
      { year: '2030', ebitda: 45, margin: 30 }
    ],
    base: [
      { year: '2025', ebitda: -3, margin: -300 },
      { year: '2026', ebitda: -5, margin: -100 },
      { year: '2027', ebitda: -1, margin: -7 },
      { year: '2028', ebitda: 8, margin: 16 },
      { year: '2029', ebitda: 40, margin: 27 },
      { year: '2030', ebitda: 105, margin: 30 }
    ],
    optimistic: [
      { year: '2025', ebitda: -4, margin: -200 },
      { year: '2026', ebitda: -3, margin: -30 },
      { year: '2027', ebitda: 3, margin: 10 },
      { year: '2028', ebitda: 20, margin: 20 },
      { year: '2029', ebitda: 90, margin: 30 },
      { year: '2030', ebitda: 245, margin: 35 }
    ]
  };

  const fundingRounds = [
    {
      round: 'Seed',
      year: '2025',
      amount: 1,
      valuation: 8,
      investors: 'Angel investors, accelerators',
      use: 'Product development, team building'
    },
    {
      round: 'Series A',
      year: '2026',
      amount: 8,
      valuation: 40,
      investors: 'VC firms (quantum/deep tech focus)',
      use: 'Scale operations, expand kit inventory'
    },
    {
      round: 'Series B',
      year: '2027',
      amount: 20,
      valuation: 120,
      investors: 'Growth equity, strategic investors',
      use: 'Market expansion, product maturation'
    },
    {
      round: 'IPO',
      year: '2028',
      amount: 100,
      valuation: 500,
      investors: 'Public markets (Zipminator)',
      use: 'Growth capital, subsidiary independence'
    }
  ];

  const revenueBreakdown2030 = [
    { name: 'Quantum Software', value: 170, color: '#00d4ff' },
    { name: 'Hardware Rentals', value: 90, color: '#65ff00' },
    { name: 'AI Services', value: 90, color: '#ff00ff' }
  ];

  const useOfFunds = [
    { category: 'R&D', allocation: 40, amount: 11.6 },
    { category: 'Sales & Marketing', allocation: 25, amount: 7.25 },
    { category: 'Operations', allocation: 20, amount: 5.8 },
    { category: 'Team Expansion', allocation: 10, amount: 2.9 },
    { category: 'Reserve', allocation: 5, amount: 1.45 }
  ];

  const keyMetrics = [
    {
      label: '2030 Revenue (Base)',
      value: '$350M',
      growth: '+133% YoY',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'cyan'
    },
    {
      label: '2030 EBITDA',
      value: '$105M',
      growth: '30% Margin',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'green'
    },
    {
      label: 'Total Funding Needed',
      value: '$29M',
      growth: 'Pre-IPO',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'blue'
    },
    {
      label: 'IPO Target',
      value: '2028',
      growth: 'Zipminator',
      icon: <Rocket className="w-6 h-6" />,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
      green: { bg: 'from-green-500/10 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400' },
      blue: { bg: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      purple: { bg: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section className="business-plan-section-professional">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="business-plan-section-header">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="business-plan-h1 business-plan-section-title"
          >
            Financial Projections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="business-plan-section-subtitle business-plan-lead"
          >
            Path to $350M Revenue and Profitability by 2030
          </motion.p>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {keyMetrics.map((metric, index) => {
            const colors = getColorClasses(metric.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <MetricCard
                  value={metric.value}
                  label={metric.label}
                  description={metric.growth}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="profitability">Profitability</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="breakdown">Revenue Mix</TabsTrigger>
          </TabsList>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="flex justify-center gap-3 mb-6">
              {(['conservative', 'base', 'optimistic'] as const).map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScenario(s)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    scenario === s
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 text-white'
                      : 'bg-slate-900/30 border border-slate-700/30 text-gray-400 hover:border-cyan-500/30'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={scenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="business-plan-h2">
                    Revenue Projections: {scenario.charAt(0).toUpperCase() + scenario.slice(1)} Case
                  </CardTitle>
                  <CardDescription className="business-plan-body text-secondary-contrast">
                    Total revenue and breakdown by business segment (in $M)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="chart-container-professional">
                  <AnimatedAreaChart
                    data={revenueData[scenario]}
                    areas={[
                      { dataKey: 'hardware', fill: '#65ff00', stroke: '#65ff00', name: 'Hardware Rentals' },
                      { dataKey: 'software', fill: '#00d4ff', stroke: '#00d4ff', name: 'Software Platforms' },
                      { dataKey: 'ai', fill: '#ff00ff', stroke: '#ff00ff', name: 'AI Services' }
                    ]}
                    xAxisKey="year"
                    height={400}
                    showGrid={true}
                    showLegend={true}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {(['conservative', 'base', 'optimistic'] as const).map((s, index) => {
                const data = revenueData[s];
                const finalYear = data[data.length - 1];
                const colors = ['cyan', 'blue', 'green'][index];
                const colorClasses = getColorClasses(colors);

                return (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Card className={`bg-gradient-to-br ${colorClasses.bg} border ${colorClasses.border}`}>
                      <CardHeader>
                        <CardTitle className="text-lg text-white capitalize">{s} Scenario</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                          <div className={`text-4xl font-bold ${colorClasses.text} mb-1`}>
                            ${finalYear.revenue}M
                          </div>
                          <div className="text-sm text-gray-400">2030 Revenue</div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Hardware:</span>
                            <span className="text-white font-semibold">${finalYear.hardware}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Software:</span>
                            <span className="text-white font-semibold">${finalYear.software}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">AI Services:</span>
                            <span className="text-white font-semibold">${finalYear.ai}M</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Profitability Tab */}
          <TabsContent value="profitability" className="space-y-6">
            <div className="flex justify-center gap-3 mb-6">
              {(['conservative', 'base', 'optimistic'] as const).map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScenario(s)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    scenario === s
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 text-white'
                      : 'bg-slate-900/30 border border-slate-700/30 text-gray-400 hover:border-cyan-500/30'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={scenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    EBITDA & Margin Projections: {scenario.charAt(0).toUpperCase() + scenario.slice(1)} Case
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Path to profitability with EBITDA and margin percentage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedLineChart
                    data={profitabilityData[scenario]}
                    lines={[
                      { dataKey: 'ebitda', stroke: '#00d4ff', strokeWidth: 3, name: 'EBITDA ($M)' },
                      { dataKey: 'margin', stroke: '#65ff00', strokeWidth: 3, name: 'EBITDA Margin (%)' }
                    ]}
                    xAxisKey="year"
                    height={400}
                    showGrid={true}
                    showLegend={true}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Path to Profitability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { year: '2025-2026', status: 'Investment Phase', description: 'Focus on product development and market entry' },
                      { year: '2027', status: 'Break-even Target', description: 'Achieving operational efficiency at scale' },
                      { year: '2028+', status: 'Profitable Growth', description: 'Positive EBITDA with expanding margins' },
                      { year: '2030', status: 'Target: 30% Margin', description: 'Mature operations with optimized cost structure' }
                    ].map((phase, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="p-4 bg-slate-900/50 rounded-lg border border-green-500/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="font-semibold text-white">{phase.year}</span>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">{phase.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Unit Economics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-gray-400 mb-2">Hardware Rental</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Avg. Rental Price:</span>
                          <span className="text-white font-semibold">$25K/period</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Gross Margin:</span>
                          <span className="text-green-400 font-semibold">60%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-gray-400 mb-2">Software Subscriptions</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Enterprise ARR:</span>
                          <span className="text-white font-semibold">$50K-500K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Gross Margin:</span>
                          <span className="text-green-400 font-semibold">85%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-gray-400 mb-2">AI Services</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Avg. Contract Value:</span>
                          <span className="text-white font-semibold">$100K/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Gross Margin:</span>
                          <span className="text-green-400 font-semibold">75%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Funding Tab */}
          <TabsContent value="funding" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Funding Rounds Timeline
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Progressive funding rounds leading to IPO in 2028
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedBarChart
                    data={fundingRounds}
                    bars={[
                      { dataKey: 'amount', fill: '#00d4ff', name: 'Amount Raised ($M)' }
                    ]}
                    xAxisKey="round"
                    height={350}
                    showGrid={true}
                    colorByValue={true}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-4">
              {fundingRounds.map((round, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Briefcase className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-2xl font-bold text-white">{round.round}</h3>
                            <Badge className="bg-cyan-500/20 text-cyan-300">{round.year}</Badge>
                          </div>
                          <p className="text-sm text-gray-400">{round.investors}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-cyan-400">${round.amount}M</div>
                          <div className="text-sm text-gray-400">Raised</div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Post-Money Valuation</div>
                          <div className="text-xl font-semibold text-white">${round.valuation}M</div>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Use of Funds</div>
                          <div className="text-sm text-white">{round.use}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Use of Funds Allocation</CardTitle>
                  <CardDescription className="text-gray-300">
                    Strategic allocation of total $29M pre-IPO funding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedBarChart
                    data={useOfFunds}
                    bars={[
                      { dataKey: 'amount', fill: '#00d4ff', name: 'Amount ($M)' }
                    ]}
                    xAxisKey="category"
                    height={300}
                    showGrid={true}
                    colorByValue={true}
                  />
                  <div className="grid md:grid-cols-5 gap-4 mt-6">
                    {useOfFunds.map((fund, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.05 }}
                        className="text-center p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20"
                      >
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{fund.allocation}%</div>
                        <div className="text-sm text-gray-400">{fund.category}</div>
                        <div className="text-xs text-gray-500 mt-1">${fund.amount}M</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Revenue Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                      2030 Revenue Mix
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Diversified revenue streams by product category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedPieChart
                      data={revenueBreakdown2030}
                      dataKey="value"
                      nameKey="name"
                      height={400}
                      showLegend={true}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-6"
              >
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <PieChart className="w-6 h-6 text-cyan-400" />
                      Revenue Diversification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {revenueBreakdown2030.map((segment, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{segment.name}</span>
                          <Badge style={{ backgroundColor: `${segment.color}20`, color: segment.color, borderColor: `${segment.color}50` }}>
                            ${segment.value}M
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: `${(segment.value / 350) * 100}%`,
                              backgroundColor: segment.color
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {Math.round((segment.value / 350) * 100)}% of total revenue
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Strategic Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Balanced revenue streams reduce risk',
                      'Software-heavy mix ensures high margins',
                      'Hardware rentals provide recurring revenue',
                      'AI services enable premium pricing',
                      'Scalable business model across all segments'
                    ].map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Financial Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { label: 'Gross Margin', value: '75%', description: 'Software-heavy mix' },
                      { label: 'CAC Payback', value: '12 mo', description: 'Efficient customer acquisition' },
                      { label: 'NRR', value: '130%', description: 'Strong expansion revenue' },
                      { label: 'R&D as % Rev', value: '15%', description: 'Sustainable innovation' }
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                        className="text-center p-6 bg-slate-900/50 rounded-lg border border-blue-500/20"
                      >
                        <div className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
                        <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                        <div className="text-xs text-gray-400">{metric.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};
export default FinancialProjectionsSlide;
