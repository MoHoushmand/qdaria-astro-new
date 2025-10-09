'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Button } from '@/components/pitch-deck/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/pitch-deck/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import {
  Crown,
  TrendingUp,
  Shield,
  Target,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Globe,
  Cpu,
  DollarSign,
  Users,
  MapPin
} from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  category: string;
  qubitTechnology: string;
  qubitCount: number | string;
  qubitRoadmap: string;
  errorRate: string;
  coherenceTime: string;
  connectivity: string;
  cloudAccess: string;
  softwarePlatform: string;
  pricingModel: string;
  targetIndustries: string[];
  geographicFocus: string;
  fundingRaised: string;
  stage: string;
  nordicPresence: number;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  threat: string;
}

interface CompetitiveSlideClientProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const CompetitiveSlideClient: React.FC<CompetitiveSlideClientProps> = ({ scenario }) => {
  const [sortColumn, setSortColumn] = useState<string>('marketShare');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTab, setSelectedTab] = useState('matrix');

  // Load competitor data
  const competitorData: Competitor[] = [
    {
      id: "qdaria",
      name: "QDaria",
      category: "emerging-nordic",
      qubitTechnology: "Topological (Anyon)",
      qubitCount: 9,
      qubitRoadmap: "64+ by 2026",
      errorRate: "1-2%",
      coherenceTime: "10-50 μs",
      connectivity: "Octagonal + braiding",
      cloudAccess: "Full + on-prem",
      softwarePlatform: "PyQuil + QAI",
      pricingModel: "Consulting + credits",
      targetIndustries: ["Finance", "Pharma", "Energy"],
      geographicFocus: "Nordic focus",
      fundingRaised: "$2.5M (Series A ready)",
      stage: "Early Stage",
      nordicPresence: 100,
      marketShare: 100,
      strengths: ["First Nordic quantum initiative", "Physical hardware planned", "Rigetti partnership"],
      weaknesses: ["Early stage funding", "Small team", "Building market presence"],
      threat: "Emerging Player"
    },
    {
      id: "ibm-quantum",
      name: "IBM Quantum",
      category: "enterprise",
      qubitTechnology: "Superconducting",
      qubitCount: 433,
      qubitRoadmap: "4000+ by 2025",
      errorRate: "0.1-1%",
      coherenceTime: "100-200 μs",
      connectivity: "Heavy-hex lattice",
      cloudAccess: "Full (Network)",
      softwarePlatform: "Qiskit (Mature)",
      pricingModel: "Pay-per-use",
      targetIndustries: ["Finance", "Healthcare", "Materials"],
      geographicFocus: "Global, US-centric",
      fundingRaised: "Public company",
      stage: "Production",
      nordicPresence: 30,
      marketShare: 25,
      strengths: ["Market leader", "Extensive ecosystem", "IBM brand"],
      weaknesses: ["No Nordic hardware", "Cloud-only", "High pricing"],
      threat: "Medium"
    },
    {
      id: "google-quantum",
      name: "Google Quantum AI",
      category: "research",
      qubitTechnology: "Superconducting",
      qubitCount: 70,
      qubitRoadmap: "1000+ by 2029",
      errorRate: "0.1-0.5%",
      coherenceTime: "20-40 μs",
      connectivity: "2D grid",
      cloudAccess: "Limited research",
      softwarePlatform: "Cirq",
      pricingModel: "Research partnerships",
      targetIndustries: ["Research", "ML/AI", "Chemistry"],
      geographicFocus: "Global research",
      fundingRaised: "Alphabet subsidiary",
      stage: "Research",
      nordicPresence: 20,
      marketShare: 15,
      strengths: ["Quantum supremacy", "AI integration", "Research lead"],
      weaknesses: ["Limited commercial", "No Nordic strategy", "Closed"],
      threat: "Low"
    },
    {
      id: "ionq",
      name: "IonQ",
      category: "cloud",
      qubitTechnology: "Trapped ion",
      qubitCount: 32,
      qubitRoadmap: "64 by 2025",
      errorRate: "0.1-0.3%",
      coherenceTime: "10+ seconds",
      connectivity: "All-to-all",
      cloudAccess: "Multi-cloud",
      softwarePlatform: "Multi-platform",
      pricingModel: "Pay-per-use",
      targetIndustries: ["Finance", "Pharma", "Logistics"],
      geographicFocus: "US, cloud-global",
      fundingRaised: "$650M (Public)",
      stage: "Production",
      nordicPresence: 25,
      marketShare: 12,
      strengths: ["High fidelity", "All-to-all", "Multi-cloud"],
      weaknesses: ["Limited qubits", "No local presence", "Scalability"],
      threat: "Medium"
    },
    {
      id: "rigetti",
      name: "Rigetti Computing",
      category: "partner",
      qubitTechnology: "Superconducting",
      qubitCount: 80,
      qubitRoadmap: "336+ by 2025",
      errorRate: "1-2%",
      coherenceTime: "10-50 μs",
      connectivity: "Octagonal lattice",
      cloudAccess: "Full (QCS)",
      softwarePlatform: "PyQuil, QCS",
      pricingModel: "Cloud + hardware",
      targetIndustries: ["Finance", "Defense", "Materials"],
      geographicFocus: "US, UK, partners",
      fundingRaised: "$500M+ (Public)",
      stage: "Production",
      nordicPresence: 100,
      marketShare: 8,
      strengths: ["Hardware partner", "Hybrid", "QDaria partnership"],
      weaknesses: ["Smaller scale", "Higher errors", "Limited brand"],
      threat: "Zero (Partner)"
    },
    {
      id: "d-wave",
      name: "D-Wave Systems",
      category: "specialized",
      qubitTechnology: "Quantum annealing",
      qubitCount: 5640,
      qubitRoadmap: "7000+ optimization",
      errorRate: "N/A (annealing)",
      coherenceTime: "N/A",
      connectivity: "Pegasus graph",
      cloudAccess: "Full (Leap)",
      softwarePlatform: "Ocean SDK",
      pricingModel: "Cloud + hardware",
      targetIndustries: ["Optimization", "Logistics", "Finance"],
      geographicFocus: "Global, Canada",
      fundingRaised: "$300M+ (Public)",
      stage: "Production",
      nordicPresence: 15,
      marketShare: 10,
      strengths: ["Optimization specialist", "Large qubits", "Commercial"],
      weaknesses: ["Not universal", "Limited scope", "No Nordic"],
      threat: "Low (Different)"
    },
    {
      id: "xanadu",
      name: "Xanadu",
      category: "cloud",
      qubitTechnology: "Photonic",
      qubitCount: 216,
      qubitRoadmap: "1M qubits",
      errorRate: "1-3%",
      coherenceTime: "Room temp",
      connectivity: "Photonic graph",
      cloudAccess: "Full (Cloud)",
      softwarePlatform: "PennyLane",
      pricingModel: "Pay-per-use",
      targetIndustries: ["ML/AI", "Chemistry", "Finance"],
      geographicFocus: "Canada, global",
      fundingRaised: "$245M",
      stage: "Production",
      nordicPresence: 10,
      marketShare: 5,
      strengths: ["Photonic", "Strong software", "Open source"],
      weaknesses: ["Early tech", "No Nordic", "Small share"],
      threat: "Low"
    },
    {
      id: "atom-computing",
      name: "Atom Computing",
      category: "emerging",
      qubitTechnology: "Neutral atom",
      qubitCount: 1180,
      qubitRoadmap: "5000+ by 2026",
      errorRate: "0.5-1%",
      coherenceTime: "10+ seconds",
      connectivity: "Reconfigurable",
      cloudAccess: "Limited",
      softwarePlatform: "AtomIQ",
      pricingModel: "Partnership",
      targetIndustries: ["Research", "Defense", "Enterprise"],
      geographicFocus: "US-focused",
      fundingRaised: "$198M",
      stage: "Early production",
      nordicPresence: 5,
      marketShare: 3,
      strengths: ["High qubits", "Reconfigurable", "Long coherence"],
      weaknesses: ["Early software", "Limited access", "Unproven"],
      threat: "Very Low"
    },
    {
      id: "zapata",
      name: "Zapata Computing",
      category: "software",
      qubitTechnology: "Hardware agnostic",
      qubitCount: "N/A",
      qubitRoadmap: "N/A",
      errorRate: "N/A",
      coherenceTime: "N/A",
      connectivity: "N/A",
      cloudAccess: "Software platform",
      softwarePlatform: "Orquestra",
      pricingModel: "Enterprise SaaS",
      targetIndustries: ["Pharma", "Materials", "Finance"],
      geographicFocus: "Global, US",
      fundingRaised: "$68M",
      stage: "Production",
      nordicPresence: 20,
      marketShare: 7,
      strengths: ["Hardware agnostic", "Enterprise", "Workflow"],
      weaknesses: ["No hardware", "Dependent", "Software only"],
      threat: "Low (Complementary)"
    },
    {
      id: "classiq",
      name: "Classiq",
      category: "software",
      qubitTechnology: "Hardware agnostic",
      qubitCount: "N/A",
      qubitRoadmap: "N/A",
      errorRate: "N/A",
      coherenceTime: "N/A",
      connectivity: "N/A",
      cloudAccess: "Software platform",
      softwarePlatform: "Classiq Platform",
      pricingModel: "Freemium",
      targetIndustries: ["Finance", "Research", "Defense"],
      geographicFocus: "Global, Israel",
      fundingRaised: "$84M",
      stage: "Production",
      nordicPresence: 15,
      marketShare: 4,
      strengths: ["Algorithm design", "User-friendly", "Multi-platform"],
      weaknesses: ["No hardware", "Niche", "Emerging"],
      threat: "Very Low"
    }
  ];

  // Radar chart data
  const radarData = [
    { dimension: 'Hardware Access', QDaria: 100, IBM: 60, IonQ: 50, Google: 40 },
    { dimension: 'Nordic Presence', QDaria: 100, IBM: 30, IonQ: 25, Google: 20 },
    { dimension: 'Commercial Ready', QDaria: 100, IBM: 90, IonQ: 80, Google: 40 },
    { dimension: 'Software Maturity', QDaria: 70, IBM: 95, IonQ: 75, Google: 80 },
    { dimension: 'Pricing Flexibility', QDaria: 90, IBM: 50, IonQ: 60, Google: 30 },
    { dimension: 'Industry Focus', QDaria: 95, IBM: 70, IonQ: 65, Google: 50 },
  ];

  // Market share data
  const marketShareData = [
    { name: 'QDaria (Nordic)', value: 100, color: '#CCFF00' },
    { name: 'IBM Quantum', value: 25, color: '#00d4ff' },
    { name: 'Google Quantum', value: 15, color: '#9AFF00' },
    { name: 'IonQ', value: 12, color: '#FF6B6B' },
    { name: 'D-Wave', value: 10, color: '#6b7280' },
    { name: 'Rigetti', value: 8, color: '#a855f7' },
    { name: 'Others', value: 30, color: '#475569' }
  ];

  // Competitive moat visualization
  const competitiveMoat = [
    { factor: 'Hardware Ownership', strength: 100, difficulty: 95 },
    { factor: 'Nordic Exclusivity', strength: 100, difficulty: 90 },
    { factor: 'Rigetti Partnership', strength: 90, difficulty: 85 },
    { factor: 'Executive Network', strength: 85, difficulty: 80 },
    { factor: 'Industry Expertise', strength: 80, difficulty: 60 },
    { factor: 'First-Mover', strength: 95, difficulty: 90 }
  ];

  // Why We Win data
  const whyWeWin = [
    {
      title: 'Only Nordic Quantum Computer',
      icon: Crown,
      evidence: '100% Nordic market share with physical Rigetti Novera QPU deployed',
      defensibility: 'HIGH: Multi-million dollar hardware barrier to entry',
      color: 'cyan'
    },
    {
      title: 'Physical Hardware Ownership',
      icon: Cpu,
      evidence: 'Competitors limited to cloud-only; we own the hardware',
      defensibility: 'HIGH: Capital and partnership requirements',
      color: 'green'
    },
    {
      title: 'Strategic Partnerships',
      icon: Target,
      evidence: '60+ executive meetings secured via Management Events',
      defensibility: 'MEDIUM: Relationship-based, can be replicated over time',
      color: 'purple'
    },
    {
      title: 'Vertical Specialization',
      icon: Zap,
      evidence: 'Deep finance, pharma, energy industry solutions vs generic platforms',
      defensibility: 'MEDIUM-HIGH: Industry expertise and tailored algorithms',
      color: 'orange'
    },
    {
      title: 'Topological Advantage',
      icon: Shield,
      evidence: 'Anyon braiding for better error correction vs competitors',
      defensibility: 'VERY HIGH: Advanced physics and patent protection',
      color: 'red'
    }
  ];

  const sortedCompetitors = useMemo(() => {
    return [...competitorData].sort((a, b) => {
      const aValue = a[sortColumn as keyof Competitor];
      const bValue = b[sortColumn as keyof Competitor];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [sortColumn, sortDirection, competitorData]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getThreatColor = (threat: string) => {
    if (threat.includes('Zero') || threat.includes('Very Low'))
      return 'bg-green-500/20 text-green-300 border-green-500/50';
    if (threat.includes('Low'))
      return 'bg-green-400/20 text-green-300 border-green-400/50';
    if (threat.includes('Medium'))
      return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50';
    if (threat.includes('Leader'))
      return 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50';
    return 'bg-red-400/20 text-red-300 border-red-400/50';
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      'emerging-nordic': { text: 'Nordic Emerging', className: 'qdaria-badge' },
      'enterprise': { text: 'Enterprise', className: 'bg-blue-400/20 text-blue-300 border-blue-400/50' },
      'cloud': { text: 'Cloud', className: 'bg-green-400/20 text-green-300 border-green-400/50' },
      'research': { text: 'Research', className: 'bg-purple-400/20 text-purple-300 border-purple-400/50' },
      'software': { text: 'Software', className: 'bg-orange-400/20 text-orange-300 border-orange-400/50' },
      'specialized': { text: 'Specialized', className: 'bg-pink-400/20 text-pink-300 border-pink-400/50' },
      'partner': { text: 'Partner', className: 'bg-teal-400/20 text-teal-300 border-teal-400/50' },
      'emerging': { text: 'Emerging', className: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50' }
    };
    return badges[category] || badges['enterprise'];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold qdaria-gradient-text mb-2">
          Competitive Analysis: Why QDaria Wins
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Comprehensive market positioning and competitive advantages
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            10 Competitors Analyzed
          </Badge>
          <Badge className="bg-purple-400/20 text-purple-300 border border-purple-400/50 text-lg px-4 py-2">
            <Target className="w-4 h-4 mr-2" />
            12 Dimensions Compared
          </Badge>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-slate-800/50">
          <TabsTrigger value="matrix">Comparison Matrix</TabsTrigger>
          <TabsTrigger value="positioning">Positioning</TabsTrigger>
          <TabsTrigger value="moat">Competitive Moat</TabsTrigger>
          <TabsTrigger value="why-win">Why We Win</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Detailed Competitor Comparison Matrix
              </CardTitle>
              <CardDescription>
                Interactive comparison across 12+ key dimensions (click headers to sort)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="cursor-pointer hover:bg-slate-800/50" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-2">
                          Company <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="cursor-pointer hover:bg-slate-800/50" onClick={() => handleSort('qubitTechnology')}>
                        <div className="flex items-center gap-2">
                          Technology <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-slate-800/50" onClick={() => handleSort('qubitCount')}>
                        <div className="flex items-center gap-2">
                          Qubits <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead>Error Rate</TableHead>
                      <TableHead className="cursor-pointer hover:bg-slate-800/50" onClick={() => handleSort('nordicPresence')}>
                        <div className="flex items-center gap-2">
                          Nordic % <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-slate-800/50" onClick={() => handleSort('marketShare')}>
                        <div className="flex items-center gap-2">
                          Market % <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Threat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCompetitors.map((competitor) => (
                      <TableRow
                        key={competitor.id}
                        className={`border-slate-700 ${competitor.id === 'qdaria' ? 'bg-cyan-400/5' : ''}`}
                      >
                        <TableCell className="font-semibold">
                          {competitor.name}
                          {competitor.id === 'qdaria' && (
                            <Crown className="inline-block w-4 h-4 ml-2 text-cyan-400" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryBadge(competitor.category).className}>
                            {getCategoryBadge(competitor.category).text}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{competitor.qubitTechnology}</TableCell>
                        <TableCell className="font-mono">{competitor.qubitCount}</TableCell>
                        <TableCell className="text-sm">{competitor.errorRate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-cyan-400 h-2 rounded-full"
                                style={{ width: `${competitor.nordicPresence}%` }}
                              />
                            </div>
                            <span className="text-sm">{competitor.nordicPresence}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-green-400 h-2 rounded-full"
                                style={{ width: `${competitor.marketShare}%` }}
                              />
                            </div>
                            <span className="text-sm">{competitor.marketShare}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {competitor.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getThreatColor(competitor.threat)}>
                            {competitor.threat}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedCompetitors.slice(0, 4).map((competitor) => (
              <Card key={competitor.id} className="qdaria-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{competitor.name}</span>
                    <Badge className={getCategoryBadge(competitor.category).className}>
                      {getCategoryBadge(competitor.category).text}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-semibold text-green-300 mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Strengths
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-orange-300 mb-1 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Weaknesses
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li key={idx}>• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-300 mb-1">Key Metrics</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400">Funding:</span>
                        <div className="text-white">{competitor.fundingRaised}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Roadmap:</span>
                        <div className="text-white">{competitor.qubitRoadmap}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positioning" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Strategic Positioning Radar
                </CardTitle>
                <CardDescription>
                  QDaria vs top 3 competitors across key dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                    <Radar name="QDaria" dataKey="QDaria" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.6} />
                    <Radar name="IBM" dataKey="IBM" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.3} />
                    <Radar name="IonQ" dataKey="IonQ" stroke="#9AFF00" fill="#9AFF00" fillOpacity={0.3} />
                    <Radar name="Google" dataKey="Google" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-400" />
                  Nordic Market Dominance
                </CardTitle>
                <CardDescription>
                  Market share in Nordic quantum computing market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="moat" className="space-y-4">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Competitive Moat Analysis
              </CardTitle>
              <CardDescription>
                Defensibility of QDaria's competitive advantages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={competitiveMoat} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                  <YAxis dataKey="factor" type="category" width={150} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="strength" fill="#CCFF00" name="Our Strength" />
                  <Bar dataKey="difficulty" fill="#00d4ff" name="Replication Difficulty" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-white">Moat Interpretation:</h4>
                {competitiveMoat.map((moat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                    <Shield className="w-5 h-5 text-cyan-400 mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{moat.factor}</div>
                      <div className="text-sm text-gray-300 mt-1">
                        Strength: {moat.strength}% | Replication Difficulty: {moat.difficulty}%
                      </div>
                      {moat.difficulty >= 85 && (
                        <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-500/50">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Very High Defensibility
                        </Badge>
                      )}
                      {moat.difficulty >= 70 && moat.difficulty < 85 && (
                        <Badge className="mt-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          High Defensibility
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="why-win" className="space-y-4">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-cyan-400" />
                Why QDaria Wins: 5 Decisive Advantages
              </CardTitle>
              <CardDescription>
                Evidence-based competitive advantages with defensibility analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {whyWeWin.map((advantage, idx) => {
                  const IconComponent = advantage.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all"
                    >
                      <div className="inline-flex p-3 rounded-lg bg-cyan-400/20 mb-4">
                        <IconComponent className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h4 className="font-bold text-white text-lg mb-2">{advantage.title}</h4>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Evidence</div>
                          <p className="text-sm text-gray-300">{advantage.evidence}</p>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Defensibility</div>
                          <Badge
                            className={
                              advantage.defensibility.startsWith('VERY HIGH')
                                ? 'bg-green-500/20 text-green-300 border-green-500/50'
                                : advantage.defensibility.startsWith('HIGH')
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                            }
                          >
                            {advantage.defensibility}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="qdaria-card bg-gradient-to-r from-cyan-900/20 to-green-900/20 border-cyan-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                The QDaria Advantage: Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Technology Advantages
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Topological qubits with anyon braiding for superior error correction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Rigetti Novera QPU partnership for proven hardware</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Hybrid classical-quantum approach for practical applications</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Market Advantages
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>100% Nordic market dominance with no local competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Vertical-specific solutions for finance, pharma, and energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>First-mover advantage with physical hardware deployment</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-400" />
                    Go-to-Market Advantages
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Management Events partnership: 60+ executive meetings secured</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Consultative approach vs generic cloud platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Faster deployment cycles with local presence and support</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Future Competitive Position
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Multi-million dollar barrier to entry for Nordic competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Strong patent portfolio and proprietary algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Network effects from industry partnerships and customer base</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitiveSlideClient;
