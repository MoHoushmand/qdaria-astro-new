import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import {
  Shield,
  Lock,
  Award,
  FileText,
  TrendingUp,
  Globe,
  Brain,
  Zap,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  BookOpen
} from 'lucide-react';

const IPPatentsSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('portfolio');

  // Patent Portfolio Data
  const patentPortfolio = [
    {
      status: 'In Preparation',
      count: 8,
      category: 'Quantum Algorithms & AI Integration',
      patents: [
        {
          title: 'Variational Quantum Eigensolver Optimization',
          target: 'Q2 2026',
          regions: ['Norway', 'EU', 'US'],
          value: '€2.5M (Projected)'
        },
        {
          title: 'Quantum-Classical Hybrid Architecture',
          target: 'Q2 2026',
          regions: ['Norway', 'EU'],
          value: '€3.2M (Projected)'
        },
        {
          title: 'Anyon Braiding Error Correction',
          target: 'Q3 2026',
          regions: ['Norway', 'Nordic Region'],
          value: '€1.8M (Projected)'
        },
        {
          title: 'Quantum Machine Learning Acceleration',
          target: 'Q3 2026',
          regions: ['EU', 'US', 'China'],
          value: '€4.5M (Projected)'
        },
        {
          title: 'Post-Quantum Cryptography System (Zipminator)',
          target: 'Q4 2026',
          regions: ['PCT (140+ countries)'],
          value: '€8.2M (Projected)'
        },
        {
          title: 'Distributed Quantum Computing Orchestration',
          target: 'Q1 2027',
          regions: ['US', 'EU', 'Japan'],
          value: '€5.1M (Projected)'
        },
        {
          title: 'Quantum-Enhanced Neural Network Training',
          target: 'Q2 2027',
          regions: ['EU', 'Nordic', 'UK'],
          value: '€3.8M (Projected)'
        },
        {
          title: 'Real-time Quantum Error Mitigation',
          target: 'Q2 2027',
          regions: ['Norway', 'EU'],
          value: '€2.9M (Projected)'
        }
      ],
      icon: Lightbulb,
      color: 'cyan'
    },
    {
      status: 'Future Pipeline',
      count: 4,
      category: 'AI Enhancement & Security',
      patents: [
        {
          title: 'Quantum Machine Learning Acceleration',
          number: 'EP-2024-123456',
          filed: '2024-Q1',
          expected: '2025-Q3',
          regions: ['EU', 'US', 'China'],
          value: '€4.5M'
        },
        {
          title: 'Post-Quantum Cryptography System (Zipminator)',
          number: 'WO-2024-567890',
          filed: '2024-Q2',
          expected: '2025-Q4',
          regions: ['PCT (140+ countries)'],
          value: '€8.2M'
        },
        {
          title: 'Distributed Quantum Computing Orchestration',
          number: 'US-2024-789012',
          filed: '2024-Q2',
          expected: '2026-Q1',
          regions: ['US', 'EU', 'Japan'],
          value: '€5.1M'
        },
        {
          title: 'Quantum-Enhanced Neural Network Training',
          number: 'EP-2024-234567',
          filed: '2024-Q3',
          expected: '2026-Q2',
          regions: ['EU', 'Nordic', 'UK'],
          value: '€3.8M'
        },
        {
          title: 'Real-time Quantum Error Mitigation',
          number: 'NO-2024-004567',
          filed: '2024-Q4',
          expected: '2026-Q2',
          regions: ['Norway', 'EU (Pending)'],
          value: '€2.9M'
        }
      ],
      icon: Clock,
      color: 'orange'
    },
    {
      status: 'Research Pipeline',
      count: 4,
      category: 'Advanced Research',
      patents: [
        {
          title: 'Topological Quantum Computing Methods',
          target: '2025-Q2',
          regions: ['US', 'EU', 'China', 'Japan'],
          value: '€6.5M'
        },
        {
          title: 'Quantum Internet Protocol Layer',
          target: '2025-Q3',
          regions: ['PCT (Global)'],
          value: '€9.8M'
        },
        {
          title: 'AI-Quantum Co-Processing System',
          target: '2025-Q3',
          regions: ['US', 'EU', 'Nordic'],
          value: '€4.2M'
        },
        {
          title: 'Quantum Financial Risk Modeling',
          target: '2025-Q4',
          regions: ['EU', 'UK', 'Singapore'],
          value: '€3.5M'
        }
      ],
      icon: Lightbulb,
      color: 'cyan'
    }
  ];

  // Trade Secrets
  const tradeSecrets = [
    {
      category: 'Quantum Algorithms',
      secrets: [
        'Proprietary VQE convergence optimization reducing iterations by 73%',
        'Custom QAOA parameter selection heuristics',
        'Hybrid quantum-classical workflow orchestration methods'
      ],
      icon: Brain,
      color: 'purple',
      protection: 'NDAs + Compartmentalized Access'
    },
    {
      category: 'Error Correction',
      secrets: [
        'Anyon braiding stabilization techniques (100μs coherence)',
        'Real-time noise characterization and mitigation',
        'Adaptive error correction code selection algorithms'
      ],
      icon: Zap,
      color: 'orange',
      protection: 'Clean Room Development'
    },
    {
      category: 'Platform Architecture',
      secrets: [
        'Rigetti Novera QPU integration and optimization layer',
        'Multi-tenant quantum job scheduling algorithms',
        'Quantum-AI hybrid computation routing logic'
      ],
      icon: Shield,
      color: 'cyan',
      protection: 'Code Obfuscation + Access Control'
    },
    {
      category: 'Security Infrastructure',
      secrets: [
        'Zipminator quantum-safe encryption implementation',
        'Crypto-agility key rotation mechanisms',
        'Post-quantum authentication protocols'
      ],
      icon: Lock,
      color: 'red',
      protection: 'Hardware Security Modules (HSM)'
    }
  ];

  // IP Value Metrics
  const ipMetrics = {
    totalPatents: 12,
    grantedPatents: 0,
    pendingPatents: 0,
    inPreparation: 8,
    researchPipeline: 4,
    countriesProtected: 15,
    estimatedValue: '€55.9M (Projected)',
    tradeSecrets: 12,
    licenseRevenuePotential: '€2-5M/year (Projected 2027+)'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 qdaria-gradient-text">
          Intellectual Property: Building Competitive Moat
        </h1>
        <p className="text-xl text-slate-400 font-light max-w-4xl mx-auto">
          Working on 12+ patent applications targeting €55.9M estimated IP portfolio value protecting our quantum-AI innovation
        </p>
        <div className="mt-4 px-6 py-3 bg-orange-500/20 border-2 border-orange-400/50 rounded-lg inline-block">
          <p className="text-orange-300 font-semibold">⚠️ No Patents Granted Yet - All applications in preparation/planning phase</p>
        </div>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            <Lightbulb className="w-4 h-4 mr-1" />
            8 In Preparation
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
            <Clock className="w-4 h-4 mr-1" />
            4 Research Pipeline
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Shield className="w-4 h-4 mr-1" />
            {ipMetrics.tradeSecrets} Trade Secrets
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="portfolio" className="qdaria-tab">
            <FileText className="w-4 h-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="secrets" className="qdaria-tab">
            <Lock className="w-4 h-4 mr-2" />
            Secrets
          </TabsTrigger>
          <TabsTrigger value="moats" className="qdaria-tab">
            <Shield className="w-4 h-4 mr-2" />
            Moats
          </TabsTrigger>
          <TabsTrigger value="strategy" className="qdaria-tab">
            <TrendingUp className="w-4 h-4 mr-2" />
            Strategy
          </TabsTrigger>
        </TabsList>

        {/* Patent Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {patentPortfolio.map((category, index) => (
              <Card key={index} className="qdaria-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-cyan-500/20">
                        <category.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.status} Patents</h3>
                        <p className="text-sm text-gray-400">{category.category}</p>
                      </div>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-4 py-2">
                      {category.count}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.patents.map((patent, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/40 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{patent.title}</h4>
                            {patent.number && (
                              <p className="text-sm text-cyan-300 font-mono mb-2">{patent.number}</p>
                            )}
                          </div>
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                            {patent.value}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Filed: </span>
                            <span className="text-slate-400 font-light">{patent.filed || patent.target || 'TBD'}</span>
                          </div>
                          {patent.granted && (
                            <div>
                              <span className="text-gray-400">Granted: </span>
                              <span className="text-green-300">{patent.granted}</span>
                            </div>
                          )}
                          {patent.expected && (
                            <div>
                              <span className="text-gray-400">Expected: </span>
                              <span className="text-orange-300">{patent.expected}</span>
                            </div>
                          )}
                          <div className="md:col-span-2">
                            <span className="text-gray-400">Regions: </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {patent.regions.map((region, i) => (
                                <Badge key={i} variant="outline" className="text-xs text-slate-400 font-light border-gray-600">
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* IP Value Summary */}
          <Card className="qdaria-card bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-2 border-orange-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Total IP Portfolio Value</h3>
                <div className="text-6xl font-bold text-orange-400 mb-4">{ipMetrics.estimatedValue}</div>
                <p className="text-slate-400 font-light mb-6">
                  Based on comparable quantum computing patents and market valuations
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{ipMetrics.grantedPatents}</div>
                    <div className="text-xs text-gray-400">Granted</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">{ipMetrics.inPreparation}</div>
                    <div className="text-xs text-gray-400">In Preparation</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">{ipMetrics.researchPipeline}</div>
                    <div className="text-xs text-gray-400">Research Pipeline</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{ipMetrics.totalPatents}</div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trade Secrets Tab */}
        <TabsContent value="secrets" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lock className="w-6 h-6 text-purple-400" />
                Proprietary Technology & Trade Secrets
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Protected through NDAs, compartmentalized access, and technical security measures
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tradeSecrets.map((category, index) => (
              <Card key={index} className="qdaria-card border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-600/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <category.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.category}</h3>
                      <p className="text-xs text-gray-400">{category.protection}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.secrets.map((secret, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-400 font-light">{secret}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competitive Moats Tab */}
        <TabsContent value="moats" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="w-6 h-6 text-cyan-400" />
                Barriers to Entry & Defensibility
              </CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* IP Strategy Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
                IP Strategy & Roadmap (2024-2028)
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Licensing Revenue Potential */}
          <Card className="qdaria-card bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Patent Licensing Revenue Potential</h3>
                <div className="text-5xl font-bold text-green-400 mb-2">{ipMetrics.licenseRevenuePotential}</div>
                <p className="text-slate-400 font-light">Annual recurring revenue from IP licensing (projected 2026+)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                  <BookOpen className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Target Industries</div>
                  <p className="text-xs text-gray-400">Finance, Healthcare, Energy, Materials</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                  <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Geographic Reach</div>
                  <p className="text-xs text-gray-400">15+ countries, expanding to 40+ by 2026</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                  <Award className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">License Types</div>
                  <p className="text-xs text-gray-400">Non-exclusive, exclusive, cross-licensing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IPPatentsSlide;
