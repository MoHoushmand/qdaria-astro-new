import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Users, Building2, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { AnimatedLineChart } from '../../pitch-deck/charts/AnimatedLineChart';
import { AnimatedBarChart } from '../../pitch-deck/charts/AnimatedBarChart';
import { AnimatedAreaChart } from '../../pitch-deck/charts/AnimatedAreaChart';
import { MetricCard } from '../cards/MetricCard';
import '../styles/index.css';

export const MarketAnalysisSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const marketGrowthData = [
    { year: '2024', market: 1.3, investment: 30 },
    { year: '2025', market: 2.1, investment: 45 },
    { year: '2026', market: 3.2, investment: 65 },
    { year: '2027', market: 4.8, investment: 90 },
    { year: '2028', market: 5.5, investment: 120 },
    { year: '2029', market: 6.2, investment: 155 },
    { year: '2030', market: 8.5, investment: 200 }
  ];

  const economicImpactData = [
    { year: '2025', value: 50 },
    { year: '2026', value: 120 },
    { year: '2027', value: 220 },
    { year: '2028', value: 380 },
    { year: '2029', value: 580 },
    { year: '2030', value: 820 },
    { year: '2035', value: 1300 }
  ];

  const competitorFundingData = [
    { company: 'IonQ', funding: 650, status: 'Public' },
    { company: 'Rigetti', funding: 450, status: 'Public' },
    { company: 'D-Wave', funding: 350, status: 'Public' },
    { company: 'PsiQuantum', funding: 665, status: 'Private' },
    { company: 'Atom Computing', funding: 195, status: 'Private' },
    { company: 'QDaria', funding: 1, status: 'Pre-seed' }
  ];

  const targetMarkets = [
    {
      title: 'Research Institutions',
      description: 'Hands-on quantum hardware for educational and research purposes',
      icon: <Lightbulb className="w-8 h-8" />,
      size: '$500M+',
      growth: '35% CAGR',
      color: 'cyan'
    },
    {
      title: 'Enterprise R&D',
      description: 'Pharma, materials science, and finance experimentation',
      icon: <Building2 className="w-8 h-8" />,
      size: '$2.5B+',
      growth: '42% CAGR',
      color: 'blue'
    },
    {
      title: 'Software Developers',
      description: 'Tools for quantum application development',
      icon: <Users className="w-8 h-8" />,
      size: '$1.2B+',
      growth: '38% CAGR',
      color: 'green'
    },
    {
      title: 'Business Decision Makers',
      description: 'AI-powered quantum insights without technical knowledge',
      icon: <Target className="w-8 h-8" />,
      size: '$800M+',
      growth: '45% CAGR',
      color: 'purple'
    }
  ];

  const growthDrivers = [
    {
      title: 'Heavy Investment',
      value: '$30B+',
      description: 'Government funding commitments worldwide',
      detail: 'Private VC investment exceeded $1.5B in 2024 alone'
    },
    {
      title: 'Tech Maturation',
      value: '1000+',
      description: 'Qubit systems planned within decade',
      detail: 'IBM and Google leading with ambitious roadmaps'
    },
    {
      title: 'Broader Use Cases',
      value: '10+',
      description: 'Industries actively exploring quantum',
      detail: 'Finance, pharma, logistics, cybersecurity leading adoption'
    },
    {
      title: 'QaaS Accessibility',
      value: '5+',
      description: 'Major cloud quantum platforms',
      detail: 'IBM Quantum, Azure Quantum, Amazon Braket, etc.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
      blue: { bg: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      green: { bg: 'from-green-500/10 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400' },
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
            Market Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="business-plan-section-subtitle business-plan-lead"
          >
            Exponential Growth in the Quantum Computing Ecosystem
          </motion.p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="targets">Target Markets</TabsTrigger>
            <TabsTrigger value="competitive">Competition</TabsTrigger>
            <TabsTrigger value="drivers">Growth Drivers</TabsTrigger>
          </TabsList>

          {/* Market Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="business-plan-h2">
                    Market Size & Growth Projections
                  </CardTitle>
                  <CardDescription className="business-plan-body text-secondary-contrast">
                    Global quantum computing market revenue and investment trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="chart-container-professional">
                  <AnimatedLineChart
                    data={marketGrowthData}
                    lines={[
                      { dataKey: 'market', stroke: '#04a3ff', strokeWidth: 3, name: 'Market Size ($B)' },
                      { dataKey: 'investment', stroke: '#65ff00', strokeWidth: 3, name: 'Gov. Investment ($B)' }
                    ]}
                    xAxisKey="year"
                    height={500}
                    showGrid={true}
                    showLegend={true}
                  />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Economic Impact Projection</CardTitle>
                    <CardDescription>Cumulative value creation to 2035</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedAreaChart
                      data={economicImpactData}
                      areas={[
                        { dataKey: 'value', fill: '#04a3ff', stroke: '#00ffd3', name: 'Economic Value ($B)' }
                      ]}
                      xAxisKey="year"
                      height={300}
                      showGrid={true}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="card-professional h-full">
                  <CardHeader>
                    <CardTitle className="business-plan-h3">Key Market Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <MetricCard
                      value="30%+"
                      label="Annual Growth Rate (CAGR)"
                      description="Sustained market expansion"
                    />
                    <MetricCard
                      value="$1.3T"
                      label="Total Value by 2035"
                      description="Economic impact projection"
                    />
                    <MetricCard
                      value="$1.5B+"
                      label="Private Investment (2024)"
                      description="VC funding momentum"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Target Markets Tab */}
          <TabsContent value="targets" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {targetMarkets.map((market, index) => {
                const colors = getColorClasses(market.color);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border} h-full hover:scale-105 transition-transform duration-300`}>
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={colors.text}>{market.icon}</div>
                          <CardTitle className="text-xl text-white">{market.title}</CardTitle>
                        </div>
                        <CardDescription className="text-gray-300">
                          {market.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className={`text-2xl font-bold ${colors.text}`}>{market.size}</div>
                            <div className="text-sm text-gray-400">Market Size</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${colors.text}`}>{market.growth}</div>
                            <div className="text-sm text-gray-400">Growth Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Total Addressable Market (TAM)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
                    <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                      $5B+
                    </div>
                    <div className="text-xl text-gray-300 mb-6">Combined addressable market by 2029</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Badge className="bg-cyan-500/20 text-cyan-300">Research: $500M+</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300">Enterprise: $2.5B+</Badge>
                      <Badge className="bg-green-500/20 text-green-300">Developers: $1.2B+</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300">Business: $800M+</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Competitive Landscape Tab */}
          <TabsContent value="competitive" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Competitor Funding Comparison
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Total funding raised by major quantum computing companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedBarChart
                    data={competitorFundingData}
                    bars={[
                      { dataKey: 'funding', fill: '#04a3ff', name: 'Funding ($M)' }
                    ]}
                    xAxisKey="company"
                    height={400}
                    showGrid={true}
                    colorByValue={true}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Tech Giants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400">IBM, Google, Microsoft, Intel with unlimited R&D budgets</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-cyan-500/20 text-cyan-300">Hardware Focus</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300">Cloud Platforms</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Hardware Startups</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400">IonQ, Rigetti, D-Wave, PsiQuantum with $200M-$665M funding</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/20 text-blue-300">Pure Hardware</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300">Well-Funded</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 border-green-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">QDaria's Differentiation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400">Unique combination of hardware access, software, and AI</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-500/20 text-green-300">Full Stack</Badge>
                      <Badge className="bg-cyan-500/20 text-cyan-300">AI-Powered</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300">Accessible</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Growth Drivers Tab */}
          <TabsContent value="drivers" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {growthDrivers.map((driver, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="text-xl text-white">{driver.title}</CardTitle>
                        <div className="text-3xl font-bold text-cyan-400">{driver.value}</div>
                      </div>
                      <CardDescription className="text-gray-300 text-base">
                        {driver.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 italic">{driver.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Market Momentum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Accelerating Adoption</h4>
                        <p className="text-gray-400 text-sm">
                          Early quantum use cases in finance, pharma, logistics, and cybersecurity driving enterprise interest
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                      <Shield className="w-6 h-6 text-cyan-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Strategic Importance</h4>
                        <p className="text-gray-400 text-sm">
                          Governments recognizing quantum computing as critical infrastructure with massive funding commitments
                        </p>
                      </div>
                    </div>
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

export default MarketAnalysisSlide;
