import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, TrendingUp, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { AnimatedRadarChart } from '../../pitch-deck/charts/AnimatedRadarChart';

interface Risk {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  probability: 'Low' | 'Medium' | 'High';
  mitigation: string[];
  status: string;
}

export const RiskAnalysisSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const riskCategories = [
    { id: 'technical', name: 'Technical', icon: <Zap className="w-5 h-5" />, color: 'cyan' },
    { id: 'market', name: 'Market', icon: <TrendingUp className="w-5 h-5" />, color: 'blue' },
    { id: 'operational', name: 'Operational', icon: <Users className="w-5 h-5" />, color: 'green' },
    { id: 'regulatory', name: 'Regulatory', icon: <Shield className="w-5 h-5" />, color: 'purple' }
  ];

  const risks: Risk[] = [
    {
      id: 'tech-1',
      category: 'technical',
      title: 'Scaling Challenges',
      description: 'Difficulties in scaling quantum systems beyond fifty qubits while maintaining coherence and fidelity',
      impact: 'High',
      probability: 'Medium',
      mitigation: [
        'Modular architecture allowing incremental scaling',
        'Parallel development of multiple qubit technologies',
        'Built-in redundancy and error correction systems',
        'Conservative roadmap with realistic qubit targets'
      ],
      status: 'Actively Managed'
    },
    {
      id: 'tech-2',
      category: 'technical',
      title: 'Error Rates',
      description: 'Higher quantum error rates at scale affecting computation reliability',
      impact: 'High',
      probability: 'Low',
      mitigation: [
        'Inherent error correction in system architecture',
        'Advanced error detection and mitigation techniques',
        'Continuous calibration and monitoring systems',
        'Hybrid classical-quantum error management'
      ],
      status: 'Mitigated'
    },
    {
      id: 'market-1',
      category: 'market',
      title: 'Competition from Tech Giants',
      description: 'Large tech companies (IBM, Google, Microsoft) with unlimited resources entering the market',
      impact: 'Medium',
      probability: 'High',
      mitigation: [
        'Strong intellectual property protection',
        'First-mover advantage in AI-quantum integration',
        'Strategic partnerships with key institutions',
        'Focus on niche markets underserved by giants',
        'Agile development and faster time-to-market'
      ],
      status: 'Strategic Response Active'
    },
    {
      id: 'market-2',
      category: 'market',
      title: 'Adoption Rate',
      description: 'Slower than expected enterprise adoption of quantum computing solutions',
      impact: 'Medium',
      probability: 'Medium',
      mitigation: [
        'Proof-of-concept programs with pilot customers',
        'Industry-specific partnership programs',
        'Comprehensive education and training initiatives',
        'Free tier and freemium models to lower barriers',
        'Focus on demonstrable ROI use cases'
      ],
      status: 'Proactive Measures'
    },
    {
      id: 'ops-1',
      category: 'operational',
      title: 'Talent Acquisition',
      description: 'Limited pool of quantum computing experts and difficulty recruiting top talent',
      impact: 'Medium',
      probability: 'High',
      mitigation: [
        'University partnerships for talent pipeline',
        'Competitive compensation and equity packages',
        'Remote work options to access global talent',
        'Internal training and development programs',
        'Collaboration with research institutions'
      ],
      status: 'Ongoing Initiative'
    },
    {
      id: 'ops-2',
      category: 'operational',
      title: 'Supply Chain Dependencies',
      description: 'Reliance on specialized quantum hardware components with limited suppliers',
      impact: 'Medium',
      probability: 'Medium',
      mitigation: [
        'Multiple supplier relationships',
        'Strategic inventory management',
        'In-house component development where feasible',
        'Long-term supply agreements',
        'Diversified hardware technology approach'
      ],
      status: 'Risk Diversification'
    },
    {
      id: 'reg-1',
      category: 'regulatory',
      title: 'Regulatory Changes',
      description: 'New regulations affecting quantum technology development and deployment',
      impact: 'Low',
      probability: 'Medium',
      mitigation: [
        'Proactive compliance planning and monitoring',
        'Industry association participation and advocacy',
        'Regular consultation with legal experts',
        'Flexible architecture to adapt to regulations',
        'International standards engagement'
      ],
      status: 'Monitored'
    },
    {
      id: 'reg-2',
      category: 'regulatory',
      title: 'Export Controls',
      description: 'Potential export restrictions on quantum computing technology',
      impact: 'Medium',
      probability: 'Low',
      mitigation: [
        'Focus on civilian and commercial applications',
        'Compliance with current export regulations',
        'Geographic diversification of operations',
        'Cloud-based delivery reducing physical exports',
        'Engagement with government stakeholders'
      ],
      status: 'Compliance Framework'
    }
  ];

  const riskRadarData = [
    { category: 'Technical Risk', value: 7 },
    { category: 'Market Risk', value: 6 },
    { category: 'Operational Risk', value: 5 },
    { category: 'Regulatory Risk', value: 3 },
    { category: 'Financial Risk', value: 4 },
    { category: 'Competitive Risk', value: 7 }
  ];

  const getImpactColor = (impact: string) => {
    const colors = {
      High: 'bg-red-500/20 text-red-400 border-red-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[impact as keyof typeof colors] || colors.Medium;
  };

  const getProbabilityColor = (probability: string) => {
    const colors = {
      High: 'bg-red-500/20 text-red-400 border-red-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[probability as keyof typeof colors] || colors.Medium;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      technical: { bg: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
      market: { bg: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      operational: { bg: 'from-green-500/10 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400' },
      regulatory: { bg: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400' }
    };
    return colors[categoryId] || colors.technical;
  };

  const filteredRisks = selectedCategory === 'all'
    ? risks
    : risks.filter(risk => risk.category === selectedCategory);

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
            Risk Analysis & Mitigation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto"
          >
            Comprehensive Risk Assessment with Strategic Mitigation Plans
          </motion.p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Strategy</TabsTrigger>
          </TabsList>

          {/* Risk Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                      Risk Assessment Radar
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Relative severity of key risk categories (1-10 scale)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedRadarChart
                      data={riskRadarData}
                      dataKey="value"
                      categoryKey="category"
                      height={400}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Risk Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {riskCategories.map((category, index) => {
                      const colors = getCategoryColor(category.id);
                      const categoryRisks = risks.filter(r => r.category === category.id);
                      const highImpact = categoryRisks.filter(r => r.impact === 'High').length;

                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`p-4 bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={colors.text}>{category.icon}</div>
                              <div>
                                <div className="font-semibold text-white">{category.name} Risk</div>
                                <div className="text-sm text-gray-400">{categoryRisks.length} identified risks</div>
                              </div>
                            </div>
                            {highImpact > 0 && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                {highImpact} High Impact
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Shield className="w-8 h-8 text-green-400" />
                      <div>
                        <div className="text-2xl font-bold text-white">100%</div>
                        <div className="text-sm text-gray-400">Risks with Mitigation Plans</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Every identified risk has comprehensive mitigation strategies in place
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Risk Priority Matrix</CardTitle>
                  <CardDescription className="text-gray-300">
                    Assessment of impact vs. probability for all identified risks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 grid grid-cols-3 gap-4">
                      {/* High Impact Row */}
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">High Impact / Low Prob</div>
                        {risks.filter(r => r.impact === 'High' && r.probability === 'Low').map((risk, idx) => (
                          <Badge key={idx} className="bg-red-500/20 text-red-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>
                      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">High Impact / Med Prob</div>
                        {risks.filter(r => r.impact === 'High' && r.probability === 'Medium').map((risk, idx) => (
                          <Badge key={idx} className="bg-orange-500/20 text-orange-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>
                      <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">High Impact / High Prob</div>
                        {risks.filter(r => r.impact === 'High' && r.probability === 'High').map((risk, idx) => (
                          <Badge key={idx} className="bg-red-500/30 text-red-200 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>

                      {/* Medium Impact Row */}
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Med Impact / Low Prob</div>
                        {risks.filter(r => r.impact === 'Medium' && r.probability === 'Low').map((risk, idx) => (
                          <Badge key={idx} className="bg-yellow-500/20 text-yellow-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>
                      <div className="p-4 bg-yellow-500/15 border border-yellow-500/40 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Med Impact / Med Prob</div>
                        {risks.filter(r => r.impact === 'Medium' && r.probability === 'Medium').map((risk, idx) => (
                          <Badge key={idx} className="bg-yellow-500/25 text-yellow-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>
                      <div className="p-4 bg-orange-500/15 border border-orange-500/40 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Med Impact / High Prob</div>
                        {risks.filter(r => r.impact === 'Medium' && r.probability === 'High').map((risk, idx) => (
                          <Badge key={idx} className="bg-orange-500/25 text-orange-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>

                      {/* Low Impact Row */}
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Low Impact / Low Prob</div>
                      </div>
                      <div className="p-4 bg-green-500/15 border border-green-500/40 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Low Impact / Med Prob</div>
                        {risks.filter(r => r.impact === 'Low' && r.probability === 'Medium').map((risk, idx) => (
                          <Badge key={idx} className="bg-green-500/25 text-green-300 text-xs mb-1">{risk.title}</Badge>
                        ))}
                      </div>
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg min-h-[120px]">
                        <div className="text-xs text-gray-400 mb-2">Low Impact / High Prob</div>
                      </div>
                    </div>

                    {/* Axis Labels */}
                    <div className="flex flex-col justify-around text-right pr-4">
                      <div className="text-sm font-semibold text-white">High Impact</div>
                      <div className="text-sm font-semibold text-white">Medium Impact</div>
                      <div className="text-sm font-semibold text-white">Low Impact</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div className="text-sm font-semibold text-white">Low Probability</div>
                    <div className="text-sm font-semibold text-white">Medium Probability</div>
                    <div className="text-sm font-semibold text-white">High Probability</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Detailed Analysis Tab */}
          <TabsContent value="detailed" className="space-y-6">
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 text-white'
                    : 'bg-slate-900/30 border border-slate-700/30 text-gray-400 hover:border-cyan-500/30'
                }`}
              >
                All Risks ({risks.length})
              </motion.button>
              {riskCategories.map((category) => {
                const colors = getCategoryColor(category.id);
                const count = risks.filter(r => r.category === category.id).length;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap flex items-center gap-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${colors.bg} border-2 ${colors.border} text-white`
                        : 'bg-slate-900/30 border border-slate-700/30 text-gray-400 hover:border-cyan-500/30'
                    }`}
                  >
                    {category.icon}
                    {category.name} ({count})
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-4">
              {filteredRisks.map((risk, index) => {
                const colors = getCategoryColor(risk.category);
                return (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card className={`bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className={`w-6 h-6 ${colors.text}`} />
                            <div>
                              <CardTitle className="text-xl text-white">{risk.title}</CardTitle>
                              <CardDescription className="text-gray-300">
                                {risk.category.charAt(0).toUpperCase() + risk.category.slice(1)} Risk
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getImpactColor(risk.impact)}>
                              Impact: {risk.impact}
                            </Badge>
                            <Badge className={getProbabilityColor(risk.probability)}>
                              Prob: {risk.probability}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Description</h4>
                          <p className="text-gray-300">{risk.description}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Mitigation Strategies</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {risk.mitigation.map((strategy, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2 bg-slate-900/30 rounded">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{strategy}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Shield className="w-3 h-3 mr-1" />
                            {risk.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Mitigation Strategy Tab */}
          <TabsContent value="mitigation" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Comprehensive Risk Management Framework
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Multi-layered approach to risk identification, assessment, and mitigation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg text-center">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                      <div className="text-3xl font-bold text-white mb-2">Identify</div>
                      <p className="text-sm text-gray-400">Continuous monitoring and early detection of emerging risks</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-center">
                      <Shield className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                      <div className="text-3xl font-bold text-white mb-2">Assess</div>
                      <p className="text-sm text-gray-400">Systematic evaluation of impact and probability</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-500/10 to-green-500/10 border border-purple-500/20 rounded-lg text-center">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-400" />
                      <div className="text-3xl font-bold text-white mb-2">Mitigate</div>
                      <p className="text-sm text-gray-400">Strategic implementation of prevention and response plans</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Proactive Measures</h4>
                      {[
                        'Regular risk assessment reviews (quarterly)',
                        'Scenario planning and stress testing',
                        'Early warning systems and KPI monitoring',
                        'Cross-functional risk management team',
                        'Industry best practices adoption'
                      ].map((measure, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-cyan-500/10"
                        >
                          <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <span className="text-sm text-gray-300">{measure}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Reactive Capabilities</h4>
                      {[
                        'Incident response protocols and playbooks',
                        'Business continuity and disaster recovery plans',
                        'Insurance coverage for key risk areas',
                        'Crisis communication framework',
                        'Rapid pivot and adaptation capabilities'
                      ].map((capability, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-cyan-500/10"
                        >
                          <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                          <span className="text-sm text-gray-300">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-green-500/5 to-cyan-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-400" />
                    Risk Management Success Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { metric: '100%', label: 'Risks Identified' },
                      { metric: '100%', label: 'Mitigation Plans' },
                      { metric: 'Quarterly', label: 'Review Cadence' },
                      { metric: '0', label: 'Critical Incidents' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="text-center p-4 bg-slate-900/50 rounded-lg border border-green-500/20"
                      >
                        <div className="text-3xl font-bold text-green-400 mb-1">{item.metric}</div>
                        <div className="text-sm text-gray-400">{item.label}</div>
                      </motion.div>
                    ))}
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
export default RiskAnalysisSlide;
