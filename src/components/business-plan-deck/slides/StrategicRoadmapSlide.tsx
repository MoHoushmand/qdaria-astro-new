import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Rocket, Building2, DollarSign, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { AnimatedLineChart } from '../../pitch-deck/charts/AnimatedLineChart';

interface Milestone {
  quarter: string;
  title: string;
  description: string;
  metrics?: string;
  status?: string;
}

interface Phase {
  year: string;
  title: string;
  subtitle: string;
  milestones: Milestone[];
  funding?: string;
  keyObjectives: string[];
  icon: React.ReactNode;
  color: string;
}

export const StrategicRoadmapSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedPhase, setSelectedPhase] = useState<string>('2025');

  const phases: Phase[] = [
    {
      year: '2025',
      title: 'Foundation',
      subtitle: 'Seed Stage & Market Entry',
      funding: 'Seed Round (~$1M)',
      icon: <Rocket className="w-8 h-8" />,
      color: 'cyan',
      keyObjectives: [
        'Company incorporation and team formation',
        'Initial product development (Qm9 alpha)',
        'Pilot quantum kit rental program launch',
        'Strategic partnerships with NTNU and UiO'
      ],
      milestones: [
        {
          quarter: 'Q1 2025',
          title: 'Company Founded',
          description: 'QDaria incorporated with founding team of quantum PhDs and AI experts',
          status: 'Completed'
        },
        {
          quarter: 'Q2 2025',
          title: 'Seed Funding',
          description: 'Secure angel/accelerator round of approximately $1M',
          metrics: '$1M raised',
          status: 'In Progress'
        },
        {
          quarter: 'Q3 2025',
          title: 'Pilot Launch',
          description: 'Launch quantum kit rental program with 2-3 qubit systems',
          metrics: '2 enterprise pilots',
          status: 'Planned'
        },
        {
          quarter: 'Q4 2025',
          title: 'R&D Milestones',
          description: 'Core R&D on Qm9 platform and AI agents (QDiana, QMikeAI)',
          status: 'Planned'
        }
      ]
    },
    {
      year: '2026',
      title: 'Product Development',
      subtitle: 'Market Validation & Expansion',
      funding: 'Series A (~$5-10M)',
      icon: <Building2 className="w-8 h-8" />,
      color: 'blue',
      keyObjectives: [
        'Series A funding secured',
        'Expand quantum kit inventory',
        'Zipminator beta release',
        'QMikeAI alpha integration with Qm9'
      ],
      milestones: [
        {
          quarter: 'Q1-Q2 2026',
          title: 'Series A Round',
          description: 'Raise $5-10M to accelerate product development and market expansion',
          metrics: '$5-10M target'
        },
        {
          quarter: 'Q2 2026',
          title: 'Kit Expansion',
          description: 'Expand inventory with additional 2-3 qubit kits and explore 5-qubit systems',
          metrics: '10+ rental units'
        },
        {
          quarter: 'Q3 2026',
          title: 'Zipminator Beta',
          description: 'Public beta release of quantum-accelerated compression software',
          metrics: '50+ beta testers'
        },
        {
          quarter: 'Q4 2026',
          title: 'QMikeAI Alpha',
          description: 'Integrate QMikeAI into Qm9 platform as developer assistant',
          metrics: 'Alpha release'
        }
      ]
    },
    {
      year: '2027',
      title: 'Scaling Up',
      subtitle: 'Organizational Structuring',
      funding: 'Series B (~$20M)',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'green',
      keyObjectives: [
        'Series B funding for scale',
        'QDiana full capabilities development',
        'Enhanced Qm9 platform features',
        'Reorganize into QDaria Holdings structure'
      ],
      milestones: [
        {
          quarter: 'Q1 2027',
          title: 'Series B Funding',
          description: 'Secure $20M for scaling operations and product maturation',
          metrics: '$20M raised'
        },
        {
          quarter: 'Q2 2027',
          title: 'QDiana Development',
          description: 'Develop full capabilities for enterprise AI consultant',
          metrics: 'Beta testing'
        },
        {
          quarter: 'Q3 2027',
          title: 'Qm9 Enhancement',
          description: 'Major platform upgrades with advanced error mitigation',
          metrics: 'v2.0 release'
        },
        {
          quarter: 'Q4 2027',
          title: 'Holdings Structure',
          description: 'Reorganize into QDaria Holdings with 5 subsidiaries',
          metrics: 'Corporate restructuring'
        }
      ]
    },
    {
      year: '2028',
      title: 'First IPO',
      subtitle: 'Continued Growth & Market Leadership',
      funding: 'Zipminator IPO',
      icon: <Trophy className="w-8 h-8" />,
      color: 'purple',
      keyObjectives: [
        'Zipminator Inc. initial public offering',
        'Qm9 subscription revenue generation',
        'QDiana commercial launch',
        'QMikeAI full deployment'
      ],
      milestones: [
        {
          quarter: 'Q1-Q2 2028',
          title: 'IPO Preparation',
          description: 'Prepare Zipminator Inc. for public markets',
          metrics: 'S-1 filing'
        },
        {
          quarter: 'Q3 2028',
          title: 'Zipminator IPO',
          description: 'First subsidiary IPO on NASDAQ or NYSE',
          metrics: 'Public listing',
          status: 'Target'
        },
        {
          quarter: 'Q3-Q4 2028',
          title: 'Product Launches',
          description: 'QDiana commercial launch and QMikeAI full deployment',
          metrics: 'General availability'
        },
        {
          quarter: 'Q4 2028',
          title: 'Revenue Growth',
          description: 'Qm9 begins generating significant subscription revenue',
          metrics: '$10M+ ARR'
        }
      ]
    },
    {
      year: '2029',
      title: 'Multiple IPOs',
      subtitle: 'Expansion & Diversification',
      funding: 'Qm9 & QDiana IPOs',
      icon: <Rocket className="w-8 h-8" />,
      color: 'orange',
      keyObjectives: [
        'Qm9 Inc. initial public offering',
        'QDiana Inc. initial public offering',
        'Global expansion of rental business',
        'Strategic acquisitions and partnerships'
      ],
      milestones: [
        {
          quarter: 'Q2 2029',
          title: 'Qm9 IPO',
          description: 'Second subsidiary IPO with strong platform adoption',
          metrics: 'Public listing'
        },
        {
          quarter: 'Q4 2029',
          title: 'QDiana IPO',
          description: 'Enterprise AI consultant goes public',
          metrics: 'Public listing'
        },
        {
          quarter: 'All Year',
          title: 'Global Expansion',
          description: 'Expand quantum kit rental to Asia and Europe',
          metrics: '3 continents'
        },
        {
          quarter: 'Q3-Q4 2029',
          title: 'Strategic M&A',
          description: 'Acquire complementary technologies and expand capabilities',
          metrics: '2-3 acquisitions'
        }
      ]
    },
    {
      year: '2030',
      title: 'Market Leadership',
      subtitle: 'Holdings Company Maturation',
      funding: 'QMikeAI IPO + Holdings IPO',
      icon: <Trophy className="w-8 h-8" />,
      color: 'pink',
      keyObjectives: [
        'QMikeAI Inc. initial public offering',
        'QDaria Holdings transformation complete',
        'Each subsidiary operating independently',
        'Potential holding company IPO'
      ],
      milestones: [
        {
          quarter: 'Q1 2030',
          title: 'QMikeAI IPO',
          description: 'Final planned subsidiary IPO',
          metrics: 'Public listing'
        },
        {
          quarter: 'Q2 2030',
          title: 'Holdings Maturation',
          description: 'Full transformation to holding company structure',
          metrics: '5 public subsidiaries'
        },
        {
          quarter: 'Q3 2030',
          title: 'Market Position',
          description: 'Establish leadership in quantum-AI integration space',
          metrics: 'Top 3 globally'
        },
        {
          quarter: 'Q4 2030',
          title: 'Holdings IPO',
          description: 'Potential QDaria Holdings public offering',
          metrics: 'To be determined'
        }
      ]
    }
  ];

  const ipoData: Array<{ year: string; value: number; ipo?: string }> = [
    { year: '2027', value: 0 },
    { year: '2028', value: 1, ipo: 'Zipminator' },
    { year: '2029', value: 3, ipo: 'Qm9, QDiana' },
    { year: '2030', value: 5, ipo: 'QMikeAI, Holdings' }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      cyan: { bg: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
      blue: { bg: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
      green: { bg: 'from-green-500/10 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 text-green-300' },
      purple: { bg: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
      orange: { bg: 'from-orange-500/10 to-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
      pink: { bg: 'from-pink-500/10 to-pink-600/10', border: 'border-pink-500/30', text: 'text-pink-400', badge: 'bg-pink-500/20 text-pink-300' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent"
          >
            Strategic Roadmap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto"
          >
            Path to Multiple IPOs and Market Leadership by 2030
          </motion.p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="milestones">Detailed Milestones</TabsTrigger>
            <TabsTrigger value="ipo">IPO Strategy</TabsTrigger>
          </TabsList>

          {/* Timeline View Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {phases.map((phase, index) => {
                const colors = getColorClasses(phase.color);
                return (
                  <motion.div
                    key={phase.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedPhase(phase.year)}
                  >
                    <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border} h-full ${selectedPhase === phase.year ? 'ring-2 ring-cyan-400' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <div className={colors.text}>{phase.icon}</div>
                          <Badge className={colors.badge}>{phase.year}</Badge>
                        </div>
                        <CardTitle className="text-xl text-white">{phase.title}</CardTitle>
                        <CardDescription className="text-gray-300">{phase.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Funding</div>
                          <div className={`text-sm font-semibold ${colors.text}`}>{phase.funding}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-2">Key Objectives</div>
                          <div className="space-y-1">
                            {phase.keyObjectives.slice(0, 2).map((obj, idx) => (
                              <div key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                <span className={`${colors.text} mt-0.5`}>•</span>
                                <span className="line-clamp-2">{obj}</span>
                              </div>
                            ))}
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
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Execution Timeline: 2025-2030
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Progressive growth from startup to holding company with multiple IPOs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

                    {/* Timeline items */}
                    <div className="space-y-8">
                      {phases.map((phase, index) => {
                        const colors = getColorClasses(phase.color);
                        return (
                          <motion.div
                            key={phase.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                            className="relative pl-20"
                          >
                            <div className={`absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
                              <div className={`w-3 h-3 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                            </div>
                            <div className={`p-4 bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg`}>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-bold text-white">{phase.year}: {phase.title}</h4>
                                <Badge className={colors.badge}>{phase.funding}</Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{phase.subtitle}</p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {phase.keyObjectives.map((obj, idx) => (
                                  <div key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                                    <Calendar className={`w-3 h-3 ${colors.text} mt-0.5 flex-shrink-0`} />
                                    <span>{obj}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Detailed Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <div className="grid grid-cols-6 gap-3 mb-6">
              {phases.map((phase) => {
                const colors = getColorClasses(phase.color);
                return (
                  <motion.button
                    key={phase.year}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPhase(phase.year)}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      selectedPhase === phase.year
                        ? `bg-gradient-to-r ${colors.bg} ${colors.border} border-2`
                        : 'bg-slate-900/30 border-slate-700/30 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">{phase.year}</div>
                    <div className="text-xs text-gray-400">{phase.title}</div>
                  </motion.button>
                );
              })}
            </div>

            {(() => {
              const phase = phases.find(p => p.year === selectedPhase);
              if (!phase) return null;
              const colors = getColorClasses(phase.color);

              return (
                <motion.div
                  key={selectedPhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-3">
                        <div className={colors.text}>{phase.icon}</div>
                        <div>
                          <CardTitle className="text-3xl text-white">{phase.year}: {phase.title}</CardTitle>
                          <CardDescription className="text-gray-300 text-lg">{phase.subtitle}</CardDescription>
                        </div>
                        <Badge className={`ml-auto ${colors.badge}`}>{phase.funding}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Key Objectives</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {phase.keyObjectives.map((obj, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-2 p-3 bg-slate-900/30 rounded-lg"
                            >
                              <TrendingUp className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                              <span className="text-sm text-gray-300">{obj}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Quarterly Milestones</h4>
                        <div className="space-y-3">
                          {phase.milestones.map((milestone, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + idx * 0.05 }}
                              className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Calendar className={`w-4 h-4 ${colors.text}`} />
                                    <span className="font-semibold text-white">{milestone.quarter}</span>
                                    {milestone.status && (
                                      <Badge className="bg-green-500/20 text-green-400 text-xs">{milestone.status}</Badge>
                                    )}
                                  </div>
                                  <h5 className="text-lg font-semibold text-white">{milestone.title}</h5>
                                </div>
                                {milestone.metrics && (
                                  <Badge className={colors.badge}>{milestone.metrics}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">{milestone.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })()}
          </TabsContent>

          {/* IPO Strategy Tab */}
          <TabsContent value="ipo" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    IPO Timeline & Strategy
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Progressive subsidiary IPOs leading to holding company structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedLineChart
                    data={ipoData}
                    lines={[
                      { dataKey: 'value', stroke: '#00d4ff', strokeWidth: 4, name: 'Public Subsidiaries' }
                    ]}
                    xAxisKey="year"
                    height={350}
                    showGrid={true}
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
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-purple-400" />
                      Planned IPO Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { year: '2028 H2', company: 'Zipminator Inc.', description: 'First subsidiary IPO' },
                      { year: '2029 Q2', company: 'Qm9 Inc.', description: 'Quantum platform IPO' },
                      { year: '2029 Q4', company: 'QDiana Inc.', description: 'Enterprise AI IPO' },
                      { year: '2030 Q1', company: 'QMikeAI Inc.', description: 'Developer AI IPO' },
                      { year: '2030 Q4', company: 'QDaria Holdings', description: 'Holding company IPO (optional)' }
                    ].map((ipo, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-purple-500/20"
                      >
                        <Rocket className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">{ipo.company}</div>
                          <div className="text-sm text-gray-400">{ipo.year} • {ipo.description}</div>
                        </div>
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
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-cyan-400" />
                      Holdings Structure Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: 'Independent Operations', description: 'Each subsidiary operates autonomously with dedicated management' },
                      { title: 'Focused Value Creation', description: 'Specialized business models optimized for each product line' },
                      { title: 'Multiple Exit Opportunities', description: 'Flexible exit strategies for investors through subsidiary IPOs' },
                      { title: 'Risk Diversification', description: 'Portfolio approach reduces concentration risk' },
                      { title: 'Scalable Growth', description: 'Each subsidiary can scale independently based on market demand' }
                    ].map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="p-3 bg-slate-900/50 rounded-lg border border-cyan-500/20"
                      >
                        <div className="font-semibold text-white mb-1">{benefit.title}</div>
                        <div className="text-sm text-gray-400">{benefit.description}</div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-green-500/5 to-cyan-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Path to Market Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-cyan-500/20">
                      <Trophy className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                      <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
                      <div className="text-sm text-gray-400">Public Companies by 2030</div>
                    </div>
                    <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-blue-500/20">
                      <Building2 className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                      <div className="text-3xl font-bold text-blue-400 mb-2">$1B+</div>
                      <div className="text-sm text-gray-400">Combined Market Cap Target</div>
                    </div>
                    <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-green-500/20">
                      <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-400" />
                      <div className="text-3xl font-bold text-green-400 mb-2">Top 3</div>
                      <div className="text-sm text-gray-400">Global Quantum-AI Leadership</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
export default StrategicRoadmapSlide;
