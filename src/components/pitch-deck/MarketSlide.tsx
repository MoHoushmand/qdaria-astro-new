import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/pitch-deck/ui/table';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Area, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, Legend, ScatterChart, Scatter
} from 'recharts';
import { TrendingUp, Globe, Building2, Target, Zap, Shield, Users, DollarSign } from 'lucide-react';

const MarketSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tam');

  // Enhanced TAM data with more realistic quantum computing market projections
  const tamData = [
    { 
      year: '2024', 
      quantum: 1.2, 
      quantumAI: 2.8, 
      enterprise: 145, 
      combined: 149, 
      cagr: 28 
    },
    { 
      year: '2025', 
      quantum: 1.8, 
      quantumAI: 4.2, 
      enterprise: 185, 
      combined: 191, 
      cagr: 32 
    },
    { 
      year: '2026', 
      quantum: 2.9, 
      quantumAI: 6.8, 
      enterprise: 238, 
      combined: 248, 
      cagr: 35 
    },
    { 
      year: '2027', 
      quantum: 4.7, 
      quantumAI: 11.2, 
      enterprise: 312, 
      combined: 328, 
      cagr: 38 
    },
    { 
      year: '2028', 
      quantum: 7.8, 
      quantumAI: 18.5, 
      enterprise: 415, 
      combined: 441, 
      cagr: 42 
    }
  ];

  // Enhanced SAM segments with quantum-specific focus
  const samSegments = [
    { 
      name: 'Quantum-Enhanced AI', 
      value: 18.5, 
      growth: 45, 
      companies: 2800, 
      desc: 'AI/ML acceleration with quantum computing'
    },
    { 
      name: 'Quantum Cryptography', 
      value: 12.3, 
      growth: 52, 
      companies: 1200, 
      desc: 'Post-quantum cryptography and security'
    },
    { 
      name: 'Financial Modeling', 
      value: 15.8, 
      growth: 38, 
      companies: 850, 
      desc: 'Risk analysis and portfolio optimization'
    },
    { 
      name: 'Drug Discovery', 
      value: 22.4, 
      growth: 41, 
      companies: 420, 
      desc: 'Molecular simulation and drug development'
    },
    { 
      name: 'Supply Chain', 
      value: 8.7, 
      growth: 35, 
      companies: 3200, 
      desc: 'Optimization and logistics'
    },
    { 
      name: 'Materials Science', 
      value: 14.2, 
      growth: 48, 
      companies: 680, 
      desc: 'Material discovery and simulation'
    }
  ];

  // Enhanced SOM with European market focus and competitive positioning
  const somRegionalData = [
    { 
      region: 'DACH', 
      companies: 3200, 
      value: 12.8, 
      penetration: 15, 
      qdariaShare: 8.5, 
      competitors: ['IBM', 'Google', 'Rigetti'],
      managementEvents: 30,
      quantumReady: 850
    },
    { 
      region: 'Nordics', 
      companies: 1850, 
      value: 7.2, 
      penetration: 12, 
      qdariaShare: 18.7, 
      competitors: ['IBM', 'Cambridge Quantum'],
      managementEvents: 30,
      quantumReady: 620,
      firstMover: true
    },
    { 
      region: 'Benelux', 
      companies: 1200, 
      value: 4.8, 
      penetration: 18, 
      qdariaShare: 15.7, 
      competitors: ['Xanadu', 'IBM'],
      managementEvents: 0,
      quantumReady: 285
    },
    { 
      region: 'UK', 
      companies: 2400, 
      value: 9.6, 
      penetration: 14, 
      qdariaShare: 6.8, 
      competitors: ['Cambridge Quantum', 'IBM', 'Google'],
      managementEvents: 0,
      quantumReady: 580
    },
    { 
      region: 'France', 
      companies: 1950, 
      value: 7.8, 
      penetration: 11, 
      qdariaShare: 4.2, 
      competitors: ['IBM', 'Atos Quantum'],
      managementEvents: 0,
      quantumReady: 420
    }
  ];

  // Management Events Partnership Data
  const managementEventsData = {
    investment: 38400,
    totalMeetings: 60,
    norway: 30,
    germany: 30,
    executiveLevel: 'Prime-level',
    targetIndustries: [
      'Financial Services',
      'Manufacturing',
      'Healthcare & Pharma',
      'Energy & Utilities',
      'Technology',
      'Automotive'
    ],
    expectedRevenue: 15600000 // €15.6M projected from partnership
  };

  // Novera QPU Competitive Advantage
  const noveraAdvantage = {
    qubits: 256,
    coherenceTime: '100μs',
    gateSpeed: '10ns',
    errorRate: '0.05%',
    competitorComparison: [
      { metric: 'Gate Speed', qdaria: '10ns', competitor: '25ns', advantage: '150% faster' },
      { metric: 'Error Rate', qdaria: '0.05%', competitor: '0.15%', advantage: '3x better' },
      { metric: 'Coherence', qdaria: '100μs', competitor: '45μs', advantage: '2.2x longer' }
    ]
  };

  // European Expansion Timeline
  const expansionTimeline = [
    { phase: 'Q1 2024', milestone: 'Management Events Partnership Launch', status: 'completed' },
    { phase: 'Q2 2024', milestone: 'Novera QPU Deployment', status: 'completed' },
    { phase: 'Q3 2024', milestone: 'Nordic Market Entry', status: 'in-progress' },
    { phase: 'Q4 2024', milestone: 'German Market Penetration', status: 'planned' },
    { phase: 'Q1 2025', milestone: 'European Quantum Leadership', status: 'planned' }
  ];

  // Competitive landscape data for market opportunity
  const competitorData = [
    { name: 'QDaria', marketShare: 8.2, funding: 12, focus: 'Enterprise AI+Quantum', strength: 95 },
    { name: 'IBM Quantum', marketShare: 28.5, funding: 1000, focus: 'Hardware + Cloud', strength: 88 },
    { name: 'Google Quantum', marketShare: 22.1, funding: 800, focus: 'Research + Cloud', strength: 92 },
    { name: 'Rigetti', marketShare: 8.7, funding: 200, focus: 'Hardware QPUs', strength: 78 },
    { name: 'IonQ', marketShare: 6.4, funding: 150, focus: 'Trapped Ion', strength: 82 },
    { name: 'Cambridge Quantum', marketShare: 5.8, funding: 80, focus: 'Software Stack', strength: 75 },
    { name: 'Xanadu', marketShare: 4.2, funding: 100, focus: 'Photonic Quantum', strength: 73 },
    { name: 'Others', marketShare: 16.1, funding: 500, focus: 'Various', strength: 65 }
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-4 md:space-y-6">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold qdaria-gradient-text px-2">
            €441B European Quantum Market: QDaria's Strategic Partnership Advantage
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white px-2">
            Management Events Partnership + Novera QPU = European Market Dominance
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto px-2">
            QDaria's €38,400 investment in 60 prime-level executive meetings across Nordic and German
            quantum-ready markets, powered by first-mover Novera QPU advantage
          </p>
        </div>

        {/* Market Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
          <div className="qdaria-stat-card p-3 md:p-6">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3" />
            <div className="text-xl md:text-3xl font-bold text-white">60</div>
            <div className="text-xs md:text-sm text-gray-300">Executive Meetings</div>
          </div>
          <div className="qdaria-stat-card p-3 md:p-6">
            <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3" />
            <div className="text-xl md:text-3xl font-bold text-white">€15.6M</div>
            <div className="text-xs md:text-sm text-gray-300">Projected Revenue</div>
          </div>
          <div className="qdaria-stat-card p-3 md:p-6">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3" />
            <div className="text-xl md:text-3xl font-bold text-white">18.7%</div>
            <div className="text-xs md:text-sm text-gray-300">Nordic Market Share</div>
          </div>
          <div className="qdaria-stat-card p-3 md:p-6">
            <Target className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3" />
            <div className="text-xl md:text-3xl font-bold text-white">406x</div>
            <div className="text-xs md:text-sm text-gray-300">Partnership ROI</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6 md:mt-8">
          <Badge className="qdaria-badge text-xs sm:text-sm md:text-lg px-3 py-1.5 md:px-6 md:py-3">
            <Users className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />Management Events Partnership
          </Badge>
          <Badge className="qdaria-badge text-xs sm:text-sm md:text-lg px-3 py-1.5 md:px-6 md:py-3">
            <Zap className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />Novera QPU Advantage
          </Badge>
          <Badge className="qdaria-badge text-xs sm:text-sm md:text-lg px-3 py-1.5 md:px-6 md:py-3">
            <Globe className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />Nordic First-Mover
          </Badge>
        </div>
      </div>

      {/* Enhanced Tabs with New Market Data */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-3 md:grid-cols-6 gap-1">
          <TabsTrigger value="tam" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Globe className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden sm:inline">TAM - €441B</span>
            <span className="sm:hidden">TAM</span>
          </TabsTrigger>
          <TabsTrigger value="sam" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Target className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden sm:inline">SAM - €92B</span>
            <span className="sm:hidden">SAM</span>
          </TabsTrigger>
          <TabsTrigger value="som" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Building2 className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden sm:inline">SOM - €42B</span>
            <span className="sm:hidden">SOM</span>
          </TabsTrigger>
          <TabsTrigger value="european" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Users className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden lg:inline">European Strategy</span>
            <span className="lg:hidden">Europe</span>
          </TabsTrigger>
          <TabsTrigger value="novera" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Zap className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden sm:inline">Novera QPU</span>
            <span className="sm:hidden">QPU</span>
          </TabsTrigger>
          <TabsTrigger value="competitive" className="qdaria-tab text-xs md:text-sm px-2 py-2 md:px-4">
            <Shield className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden lg:inline">Competitive</span>
            <span className="lg:hidden">Comp</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tam" className="qdaria-chart-content">
          <div className="space-y-6">
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Globe className="text-cyan-400" />
                  Global Quantum Computing Market Evolution (€B)
                </CardTitle>
                <CardDescription className="qdaria-chart-description">
                  Total Addressable Market growth across quantum computing and quantum-enhanced AI segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
                  <ComposedChart data={tamData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="quantumGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="quantumAIGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#66b3ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#66b3ff" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="enterpriseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0099cc" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#0099cc" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                    <XAxis 
                      dataKey="year" 
                      stroke="var(--qdaria-text-secondary)" 
                      fontSize={12}
                      tickLine={{ stroke: 'var(--qdaria-border-accent)' }}
                    />
                    <YAxis 
                      stroke="var(--qdaria-text-secondary)" 
                      fontSize={12}
                      tickLine={{ stroke: 'var(--qdaria-border-accent)' }}
                      label={{ value: 'Market Value (€B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'var(--qdaria-text-secondary)' } }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--qdaria-bg-primary)', 
                        border: '2px solid var(--qdaria-border-primary)', 
                        borderRadius: '12px',
                        boxShadow: 'var(--qdaria-glow-primary)',
                        backdropFilter: 'blur(12px)',
                        color: 'var(--qdaria-text-primary)'
                      }}
                      formatter={(value: any, name: string) => [
                        `€${value}B`,
                        name === 'combined' ? 'Total Market' :
                        name === 'quantumAI' ? 'Quantum-AI Hybrid' :
                        name === 'quantum' ? 'Pure Quantum' :
                        'Enterprise AI'
                      ]}
                      labelStyle={{ color: 'var(--qdaria-primary)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="combined" 
                      fill="url(#quantumGradient)" 
                      stroke="#00d4ff" 
                      strokeWidth={3} 
                      name="combined" 
                    />
                    <Bar dataKey="quantumAI" fill="url(#quantumAIGradient)" name="quantumAI" />
                    <Line 
                      type="monotone" 
                      dataKey="quantum" 
                      stroke="#33ccff" 
                      strokeWidth={3} 
                      dot={{ fill: '#33ccff', strokeWidth: 2, r: 6 }}
                      name="quantum" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market Growth Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="qdaria-stat-card p-6">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">€441B</div>
                  <div className="text-sm text-gray-300">Total TAM 2028</div>
                  <div className="text-xs text-cyan-400 mt-2">42% CAGR</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-6">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">€18.5B</div>
                  <div className="text-sm text-gray-300">Quantum-AI Segment</div>
                  <div className="text-xs text-cyan-400 mt-2">Fastest Growing</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-6">
                <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">€7.8B</div>
                  <div className="text-sm text-gray-300">Pure Quantum 2028</div>
                  <div className="text-xs text-cyan-400 mt-2">QDaria's Focus</div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sam" className="qdaria-chart-content">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Target className="text-cyan-400" />
                    Quantum Market Segments
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Serviceable market breakdown by quantum application areas (€B)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart outerRadius="80%" data={samSegments}>
                      <PolarGrid stroke="rgba(0, 212, 255, 0.3)" />
                      <PolarAngleAxis 
                        dataKey="name" 
                        stroke="var(--qdaria-text-secondary)" 
                        fontSize={11}
                        tick={{ fill: 'var(--qdaria-text-secondary)' }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 25]} 
                        stroke="var(--qdaria-text-muted)" 
                        fontSize={10}
                        tick={{ fill: 'var(--qdaria-text-muted)' }}
                      />
                      <Radar 
                        name="Market Value (€B)" 
                        dataKey="value" 
                        stroke="#00d4ff" 
                        fill="#00d4ff" 
                        fillOpacity={0.4} 
                        strokeWidth={2}
                      />
                      <Radar 
                        name="Growth Rate (%)" 
                        dataKey="growth" 
                        stroke="#66b3ff" 
                        fill="#66b3ff" 
                        fillOpacity={0.2} 
                        strokeWidth={2}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--qdaria-bg-primary)', 
                          border: '2px solid var(--qdaria-border-primary)', 
                          borderRadius: '12px',
                          boxShadow: 'var(--qdaria-glow-primary)',
                          backdropFilter: 'blur(12px)',
                          color: 'var(--qdaria-text-primary)'
                        }}
                        formatter={(value: any, name: string) => [
                          name.includes('Growth') ? `${value}%` : `€${value}B`,
                          name
                        ]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Market Segments Table */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Building2 className="text-cyan-400" />
                    Segment Analysis
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Detailed breakdown of quantum application markets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table className="qdaria-data-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-cyan-400">Segment</TableHead>
                        <TableHead className="text-cyan-400">Market €B</TableHead>
                        <TableHead className="text-cyan-400">Growth %</TableHead>
                        <TableHead className="text-cyan-400">Companies</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samSegments.map((segment, index) => (
                        <TableRow key={index} className="hover:bg-cyan-400/5">
                          <TableCell className="font-medium">
                            <div>
                              <div className="text-white">{segment.name}</div>
                              <div className="text-xs text-gray-400 mt-1">{segment.desc}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-cyan-400 font-semibold">€{segment.value}B</TableCell>
                          <TableCell>
                            <Badge className="qdaria-badge">{segment.growth}%</Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{segment.companies.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* SAM Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">€92B</div>
                  <div className="text-sm text-gray-300">Total SAM</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">44%</div>
                  <div className="text-sm text-gray-300">Avg Growth</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">9,150</div>
                  <div className="text-sm text-gray-300">Total Companies</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">6</div>
                  <div className="text-sm text-gray-300">Key Segments</div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="som" className="qdaria-chart-content">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Regional Market Chart */}
              <Card className="qdaria-chart-container lg:col-span-2">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Building2 className="text-cyan-400" />
                    European Serviceable Obtainable Market
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Regional market size, penetration, and QDaria's competitive position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={somRegionalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                      <XAxis 
                        dataKey="region" 
                        stroke="var(--qdaria-text-secondary)" 
                        fontSize={12}
                        tickLine={{ stroke: 'var(--qdaria-border-accent)' }}
                      />
                      <YAxis 
                        yAxisId="left" 
                        stroke="#00d4ff" 
                        fontSize={12}
                        label={{ value: 'Market Value (€B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#00d4ff' } }} 
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke="#66b3ff" 
                        fontSize={12}
                        label={{ value: 'QDaria Share (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#66b3ff' } }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--qdaria-bg-primary)', 
                          border: '2px solid var(--qdaria-border-primary)', 
                          borderRadius: '12px',
                          boxShadow: 'var(--qdaria-glow-primary)',
                          backdropFilter: 'blur(12px)',
                          color: 'var(--qdaria-text-primary)'
                        }}
                        formatter={(value: any, name: string) => [
                          name === 'value' ? `€${value}B` : 
                          name === 'qdariaShare' ? `${value}%` :
                          `${value}%`,
                          name === 'value' ? 'Market Value' : 
                          name === 'qdariaShare' ? 'QDaria Share' :
                          'Market Penetration'
                        ]}
                      />
                      <Bar dataKey="value" yAxisId="left" fill="rgba(0, 212, 255, 0.7)" name="value" />
                      <Line 
                        type="monotone" 
                        dataKey="qdariaShare" 
                        yAxisId="right" 
                        stroke="#66b3ff" 
                        strokeWidth={3} 
                        dot={{ fill: '#66b3ff', strokeWidth: 2, r: 6 }}
                        name="qdariaShare" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="penetration" 
                        yAxisId="right" 
                        stroke="#0099cc" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={{ fill: '#0099cc', strokeWidth: 2, r: 4 }}
                        name="penetration" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* QDaria Position Summary */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Shield className="text-cyan-400" />
                    QDaria Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {somRegionalData.map((region, index) => (
                      <div key={index} className="border border-cyan-400/20 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-white">{region.region}</span>
                          <Badge className="qdaria-badge">{region.qdariaShare}%</Badge>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div>Market: €{region.value}B</div>
                          <div>Companies: {region.companies.toLocaleString()}</div>
                          <div className="text-xs text-cyan-400">
                            vs. {region.competitors.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Regional Market Table */}
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Globe className="text-cyan-400" />
                  Detailed Regional Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="qdaria-data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-cyan-400">Region</TableHead>
                      <TableHead className="text-cyan-400">Market Value</TableHead>
                      <TableHead className="text-cyan-400">QDaria Share</TableHead>
                      <TableHead className="text-cyan-400">Mgmt Events</TableHead>
                      <TableHead className="text-cyan-400">Quantum-Ready</TableHead>
                      <TableHead className="text-cyan-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {somRegionalData.map((region, index) => (
                      <TableRow key={index} className={`hover:bg-cyan-400/5 ${region.managementEvents > 0 ? 'border-l-4 border-l-cyan-400' : ''}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className={region.firstMover ? 'text-cyan-400 font-bold' : 'text-white'}>
                              {region.region}
                            </span>
                            {region.firstMover && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-400/50 text-xs">
                                First-Mover
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-cyan-400 font-semibold">€{region.value}B</TableCell>
                        <TableCell>
                          <Badge className={`${region.qdariaShare > 15 ? 'qdaria-badge' : 'border-gray-400/50 text-gray-300'}`}>
                            {region.qdariaShare}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {region.managementEvents > 0 ? (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50">
                              {region.managementEvents} meetings
                            </Badge>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">{region.quantumReady}</TableCell>
                        <TableCell>
                          {region.managementEvents > 0 ? (
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/50">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-gray-400/50 text-gray-400">
                              Future
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* SOM Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">€42B</div>
                  <div className="text-sm text-gray-300">Total SOM</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">10,600</div>
                  <div className="text-sm text-gray-300">Companies</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">14%</div>
                  <div className="text-sm text-gray-300">Avg Penetration</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">9.5%</div>
                  <div className="text-sm text-gray-300">QDaria Share</div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">€4B</div>
                  <div className="text-sm text-gray-300">QDaria TAM</div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* European Expansion Strategy Tab */}
        <TabsContent value="european" className="qdaria-chart-content">
          <div className="space-y-6">
            {/* Management Events Partnership Header */}
            <Card className="qdaria-chart-container border-cyan-400/50">
              <CardHeader>
                <CardTitle className="qdaria-chart-title text-center">
                  <Users className="text-cyan-400 mx-auto mb-2" />
                  European Quantum Market Penetration Strategy
                </CardTitle>
                <CardDescription className="qdaria-chart-description text-center">
                  QDaria's strategic partnership with Management Events delivers direct access to 60 prime-level executives across Nordic and German quantum-ready markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">€38,400</div>
                    <div className="text-sm text-gray-300">Partnership Investment</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">60</div>
                    <div className="text-sm text-gray-300">Executive Meetings</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">€15.6M</div>
                    <div className="text-sm text-gray-300">Projected Revenue</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">406x</div>
                    <div className="text-sm text-gray-300">ROI Multiple</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Nordic Quantum Computing Leadership */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Globe className="text-cyan-400" />
                    Nordic Quantum Computing Leadership
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    First-mover advantage in Nordic region with Novera QPU deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-cyan-400">Norway Market</span>
                        <Badge className="qdaria-badge">30 Meetings</Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-300">
                        <div>Market Size: €3.2B by 2028</div>
                        <div>QDaria Share: 22.5% (First-mover)</div>
                        <div>Quantum-Ready Companies: 420</div>
                        <div className="text-cyan-400 font-medium">Target: Energy, Maritime, Fintech</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Sweden + Denmark</span>
                        <Badge variant="outline" className="border-gray-400/50 text-gray-300">Expanding</Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-300">
                        <div>Combined Market: €4.0B by 2028</div>
                        <div>QDaria Share: 15.2%</div>
                        <div>Quantum-Ready Companies: 200</div>
                        <div className="text-gray-400">Target: Manufacturing, Pharma</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* German Market Penetration */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Target className="text-cyan-400" />
                    German Market Penetration
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Strategic entry into Europe's largest quantum computing market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-cyan-400">Germany Market</span>
                        <Badge className="qdaria-badge">30 Meetings</Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-300">
                        <div>Market Size: €12.8B by 2028</div>
                        <div>QDaria Share: 8.5% → Target 15%</div>
                        <div>Quantum-Ready Companies: 850</div>
                        <div className="text-cyan-400 font-medium">Target: Automotive, Industry 4.0</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">DACH Region</span>
                        <Badge variant="outline" className="border-gray-400/50 text-gray-300">Phase 2</Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-300">
                        <div>Austria + Switzerland: €2.4B</div>
                        <div>Combined DACH: €15.2B</div>
                        <div>Total Companies: 3,200+</div>
                        <div className="text-gray-400">Expansion Timeline: Q2 2025</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quantum-Ready Industries */}
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Building2 className="text-cyan-400" />
                  Quantum-Ready Industries Access
                </CardTitle>
                <CardDescription className="qdaria-chart-description">
                  Management Events partnership provides direct access to decision-makers in key quantum adoption sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {managementEventsData.targetIndustries.map((industry, index) => (
                    <div key={index} className="p-4 border border-cyan-400/20 rounded-lg">
                      <div className="font-semibold text-white mb-2">{industry}</div>
                      <div className="text-sm text-gray-300">
                        {industry === 'Financial Services' && 'Risk modeling, portfolio optimization'}
                        {industry === 'Manufacturing' && 'Supply chain, quality control'}
                        {industry === 'Healthcare & Pharma' && 'Drug discovery, molecular simulation'}
                        {industry === 'Energy & Utilities' && 'Grid optimization, resource planning'}
                        {industry === 'Technology' && 'AI acceleration, cryptography'}
                        {industry === 'Automotive' && 'Materials design, autonomous systems'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* European Expansion Timeline */}
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <TrendingUp className="text-cyan-400" />
                  Path to European Quantum Dominance
                </CardTitle>
                <CardDescription className="qdaria-chart-description">
                  QDaria's strategic timeline for establishing quantum computing leadership across Europe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expansionTimeline.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-cyan-400/20 rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-400' :
                        phase.status === 'in-progress' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="font-semibold text-white">{phase.phase}</div>
                        <div className="text-sm text-gray-300">{phase.milestone}</div>
                      </div>
                      <Badge className={
                        phase.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-400/50' :
                        phase.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50' :
                        'bg-gray-500/20 text-gray-400 border-gray-400/50'
                      }>
                        {phase.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Novera QPU Advantage Tab */}
        <TabsContent value="novera" className="qdaria-chart-content">
          <div className="space-y-6">
            {/* Novera QPU Overview */}
            <Card className="qdaria-chart-container border-cyan-400/50">
              <CardHeader>
                <CardTitle className="qdaria-chart-title text-center">
                  <Zap className="text-cyan-400 mx-auto mb-2" />
                  Novera QPU: First-Mover Quantum Hardware Advantage
                </CardTitle>
                <CardDescription className="qdaria-chart-description text-center">
                  QDaria's proprietary quantum processing unit delivering unprecedented performance for European enterprises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">{noveraAdvantage.qubits}</div>
                    <div className="text-sm text-gray-300">Qubits</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">{noveraAdvantage.coherenceTime}</div>
                    <div className="text-sm text-gray-300">Coherence Time</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">{noveraAdvantage.gateSpeed}</div>
                    <div className="text-sm text-gray-300">Gate Speed</div>
                  </div>
                  <div className="text-center p-4 border border-cyan-400/30 rounded-lg">
                    <div className="text-3xl font-bold text-cyan-400">{noveraAdvantage.errorRate}</div>
                    <div className="text-sm text-gray-300">Error Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Competitive Performance Comparison */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Shield className="text-cyan-400" />
                    Novera vs. Competition
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Technical superiority across key quantum computing metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table className="qdaria-data-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-cyan-400">Metric</TableHead>
                        <TableHead className="text-cyan-400">QDaria Novera</TableHead>
                        <TableHead className="text-cyan-400">Industry Avg</TableHead>
                        <TableHead className="text-cyan-400">Advantage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {noveraAdvantage.competitorComparison.map((comp, index) => (
                        <TableRow key={index} className="hover:bg-cyan-400/5">
                          <TableCell className="font-medium text-white">{comp.metric}</TableCell>
                          <TableCell className="text-cyan-400 font-semibold">{comp.qdaria}</TableCell>
                          <TableCell className="text-gray-300">{comp.competitor}</TableCell>
                          <TableCell>
                            <Badge className="qdaria-badge">{comp.advantage}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* First-Mover Market Impact */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Target className="text-cyan-400" />
                    Nordic First-Mover Impact
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Novera QPU deployment driving QDaria's market leadership in Nordics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                      <div className="font-semibold text-cyan-400 mb-2">Market Share Growth</div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Pre-Novera: 12.3%</div>
                        <div>Post-Novera: 18.7%</div>
                        <div className="text-cyan-400 font-medium">+6.4% market share increase</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                      <div className="font-semibold text-white mb-2">Customer Wins</div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Enterprise Deployments: 15+</div>
                        <div>Pilot Projects: 42</div>
                        <div>Pipeline: €8.2M</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="font-semibold text-green-400 mb-2">Technical Recognition</div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Nordic Quantum Award 2024</div>
                        <div>Best QPU Performance</div>
                        <div>Industry Leadership Status</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quantum Hardware Advantages */}
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Zap className="text-cyan-400" />
                  Enterprise Quantum Hardware Advantages
                </CardTitle>
                <CardDescription className="qdaria-chart-description">
                  Why Novera QPU delivers superior business outcomes for European enterprises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-cyan-400/30 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white text-center mb-3">Ultra-Low Latency</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>10ns gate operations</div>
                      <div>Real-time quantum processing</div>
                      <div>Ideal for financial trading applications</div>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-cyan-400/30 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                      <Shield className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white text-center mb-3">Enterprise Security</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>Hardware-level encryption</div>
                      <div>GDPR compliant by design</div>
                      <div>Air-gapped deployment options</div>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-cyan-400/30 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                      <Target className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white text-center mb-3">Proven Reliability</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>99.9% uptime SLA</div>
                      <div>Extended coherence times</div>
                      <div>Production-ready stability</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New Competitive Landscape Tab */}
        <TabsContent value="competitive" className="qdaria-chart-content">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Share Pie Chart */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Shield className="text-cyan-400" />
                    Market Share Distribution
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Quantum computing market share by key players
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={competitorData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="marketShare"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {competitorData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'QDaria' ? '#00d4ff' : 
                                  entry.name.includes('IBM') ? '#66b3ff' :
                                  entry.name.includes('Google') ? '#0099cc' :
                                  entry.name.includes('Rigetti') ? '#33ccff' :
                                  `rgba(0, 212, 255, ${0.3 + index * 0.1})`
                            } 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--qdaria-bg-primary)', 
                          border: '2px solid var(--qdaria-border-primary)', 
                          borderRadius: '12px',
                          boxShadow: 'var(--qdaria-glow-primary)',
                          color: 'var(--qdaria-text-primary)'
                        }}
                        formatter={(value: any, name: string) => [`${value}%`, 'Market Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Competitive Positioning Scatter */}
              <Card className="qdaria-chart-container">
                <CardHeader>
                  <CardTitle className="qdaria-chart-title">
                    <Target className="text-cyan-400" />
                    Competitive Positioning
                  </CardTitle>
                  <CardDescription className="qdaria-chart-description">
                    Market share vs. technical strength analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                      <XAxis 
                        type="number" 
                        dataKey="marketShare" 
                        name="Market Share %" 
                        domain={[0, 35]}
                        stroke="var(--qdaria-text-secondary)"
                        fontSize={12}
                        label={{ value: 'Market Share (%)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: 'var(--qdaria-text-secondary)' } }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="strength" 
                        name="Technical Strength" 
                        domain={[60, 100]}
                        stroke="var(--qdaria-text-secondary)"
                        fontSize={12}
                        label={{ value: 'Technical Strength', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'var(--qdaria-text-secondary)' } }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ 
                          backgroundColor: 'var(--qdaria-bg-primary)', 
                          border: '2px solid var(--qdaria-border-primary)', 
                          borderRadius: '12px',
                          boxShadow: 'var(--qdaria-glow-primary)',
                          color: 'var(--qdaria-text-primary)'
                        }}
                        formatter={(value: any, name: string, props: any) => [
                          name === 'marketShare' ? `${value}%` : 
                          name === 'strength' ? `${value}/100` :
                          `$${value}M`,
                          name === 'marketShare' ? 'Market Share' : 
                          name === 'strength' ? 'Technical Strength' :
                          'Funding'
                        ]}
                        labelFormatter={(label: any, payload: any) => {
                          if (payload && payload[0]) {
                            return `${payload[0].payload.name} - ${payload[0].payload.focus}`;
                          }
                          return label;
                        }}
                      />
                      <Scatter 
                        data={competitorData}
                        fill="transparent"
                      >
                        {competitorData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`}
                            fill={entry.name === 'QDaria' ? '#00d4ff' : 
                                  entry.name.includes('IBM') ? '#66b3ff' :
                                  entry.name.includes('Google') ? '#0099cc' :
                                  'rgba(0, 212, 255, 0.6)'
                            }
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Analysis Table */}
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Users className="text-cyan-400" />
                  Competitive Landscape Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="qdaria-data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-cyan-400">Company</TableHead>
                      <TableHead className="text-cyan-400">Market Share</TableHead>
                      <TableHead className="text-cyan-400">Funding ($M)</TableHead>
                      <TableHead className="text-cyan-400">Focus Area</TableHead>
                      <TableHead className="text-cyan-400">Strength Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorData.map((competitor, index) => (
                      <TableRow key={index} className={competitor.name === 'QDaria' ? 'bg-cyan-400/10' : 'hover:bg-cyan-400/5'}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              competitor.name === 'QDaria' ? 'bg-cyan-400' : 
                              competitor.name.includes('IBM') ? 'bg-blue-400' :
                              competitor.name.includes('Google') ? 'bg-green-400' :
                              'bg-gray-400'
                            }`} />
                            <span className={competitor.name === 'QDaria' ? 'text-cyan-400 font-bold' : 'text-white'}>
                              {competitor.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={competitor.name === 'QDaria' ? 'qdaria-badge' : 'border-gray-400/50 text-gray-300'}>
                            {competitor.marketShare}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">${competitor.funding}M</TableCell>
                        <TableCell className="text-gray-300 text-sm">{competitor.focus}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  competitor.name === 'QDaria' ? 'bg-cyan-400' : 'bg-blue-400'
                                }`}
                                style={{ width: `${competitor.strength}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-300">{competitor.strength}/100</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Competitive Advantage Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="qdaria-stat-card p-6 border-cyan-400/50">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-400">QDaria Advantage</div>
                  <div className="text-sm text-gray-300 mt-2">
                    Hardware-agnostic platform with native AI integration
                  </div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-6">
                <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-center">
                  <div className="text-xl font-bold text-white">Enterprise Focus</div>
                  <div className="text-sm text-gray-300 mt-2">
                    Built for enterprise security and compliance needs
                  </div>
                </div>
              </Card>
              <Card className="qdaria-stat-card p-6">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-center">
                  <div className="text-xl font-bold text-white">Market Position</div>
                  <div className="text-sm text-gray-300 mt-2">
                    Strong technical capabilities with focused market approach
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketSlide;