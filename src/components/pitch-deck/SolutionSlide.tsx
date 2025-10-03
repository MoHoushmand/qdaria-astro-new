import React, { useState } from 'react';
import { Card } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Brain, Shield, Rocket, Target, Layers, Database, Cpu, Globe, Settings } from 'lucide-react';

const SolutionSlide: React.FC<{ scenario?: string }> = ({ scenario = 'base' }) => {
  const [activeTab, setActiveTab] = useState('platform');

  const platformCapabilities = [
    { subject: 'AI/ML', A: 95, B: 60, fullMark: 100 },
    { subject: 'Quantum Computing', A: 90, B: 20, fullMark: 100 },
    { subject: 'Data Processing', A: 88, B: 70, fullMark: 100 },
    { subject: 'Scalability', A: 92, B: 45, fullMark: 100 },
    { subject: 'Security', A: 94, B: 55, fullMark: 100 },
    { subject: 'Integration', A: 89, B: 40, fullMark: 100 },
  ];

  const norwayQuantumGap = [
    { category: 'Current Quantum Access', norway: 0, european_avg: 15, global_leaders: 45 },
    { category: 'R&D Investment', norway: 35, european_avg: 55, global_leaders: 95 },
    { category: 'Commercial Readiness', norway: 10, european_avg: 30, global_leaders: 80 },
    { category: 'Talent Pipeline', norway: 25, european_avg: 40, global_leaders: 75 },
    { category: 'Infrastructure', norway: 5, european_avg: 25, global_leaders: 90 },
  ];

  const noveraSpecs = [
    { component: 'Qubits', specification: '9 Superconducting Qubits' },
    { component: 'Gate Fidelity', specification: '99.5% Single-qubit, 99% Two-qubit' },
    { component: 'Coherence Time', specification: 'T1: 100μs, T2*: 50μs' },
    { component: 'Operating Temperature', specification: '15mK (Dilution Refrigerator)' },
    { component: 'Control System', specification: 'Real-time quantum control' },
    { component: 'Connectivity', specification: 'All-to-all qubit connectivity' },
  ];

  const performanceData = [
    { metric: 'Processing Speed', qdaria: 100, traditional: 15 },
    { metric: 'Accuracy', qdaria: 98, traditional: 78 },
    { metric: 'Cost Efficiency', qdaria: 85, traditional: 35 },
    { metric: 'Scalability', qdaria: 95, traditional: 42 },
    { metric: 'Time to Deploy', qdaria: 90, traditional: 25 },
  ];

  const aiProductsData = [
    { category: 'Agentic AI', products: 450, revenue: 12.5 },
    { category: 'Data Analytics', products: 380, revenue: 8.7 },
    { category: 'ML Platforms', products: 290, revenue: 15.2 },
    { category: 'Computer Vision', products: 220, revenue: 9.8 },
    { category: 'NLP Solutions', products: 340, revenue: 11.3 },
    { category: 'Quantum AI', products: 120, revenue: 18.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 qdaria-gradient-text">
          Making Norway Quantum-Ready: Rigetti Novera QPU Integration
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          First Commercial Quantum Computer in Norway • European Quantum Leadership • Bridge to Commercial Quantum Reality
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            <Globe className="w-4 h-4 mr-1" />
            Northern Europe Quantum Hub
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
            <Settings className="w-4 h-4 mr-1" />
            Rigetti Novera QPU
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="platform" className="qdaria-tab">
            <Layers className="w-4 h-4 mr-2" />
            Platform Overview
          </TabsTrigger>
          <TabsTrigger value="quantum" className="qdaria-tab">
            <Settings className="w-4 h-4 mr-2" />
            Quantum Infrastructure
          </TabsTrigger>
          <TabsTrigger value="performance" className="qdaria-tab">
            <Rocket className="w-4 h-4 mr-2" />
            Performance Edge
          </TabsTrigger>
          <TabsTrigger value="products" className="qdaria-tab">
            <Database className="w-4 h-4 mr-2" />
            AI Product Suite
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-cyan-400" />
                QDaria vs Traditional Solutions
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={platformCapabilities}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="QDaria" dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Traditional" dataKey="B" stroke="#ff6b35" fill="#ff6b35" fillOpacity={0.2} strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Core Breakthrough Technologies</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-orange-400/20">
                  <Settings className="w-6 h-6 text-orange-400 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">Rigetti Novera QPU Integration</h4>
                    <p className="text-gray-400 text-sm">First commercial quantum computer in Norway</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                  <Brain className="w-6 h-6 text-cyan-400 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">1500+ AI Products</h4>
                    <p className="text-gray-400 text-sm">Quantum-enhanced AI solution library</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-green-400/20">
                  <Shield className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">Post-Quantum Cryptography</h4>
                    <p className="text-gray-400 text-sm">Norway's quantum-safe security infrastructure</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-purple-400/20">
                  <Globe className="w-6 h-6 text-purple-400 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">European Quantum Leadership</h4>
                    <p className="text-gray-400 text-sm">Northern Europe quantum computing hub</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-orange-400" />
                Rigetti Novera QPU Specifications
              </h3>
              <div className="space-y-3">
                {noveraSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-orange-400/20">
                    <span className="text-gray-300 font-medium">{spec.component}</span>
                    <span className="text-orange-300 text-sm">{spec.specification}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">€2.8M</div>
                  <div className="text-sm text-gray-300">Strategic Investment</div>
                </div>
              </div>
            </Card>

            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-400" />
                Norway's Quantum Computing Gap
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={norwayQuantumGap}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} fontSize={10} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="norway" fill="#ef4444" name="Norway Current" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="european_avg" fill="#f59e0b" name="European Average" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="global_leaders" fill="#10b981" name="Global Leaders" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">QDaria's Strategic Quantum Advantage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/30">
                <div className="mb-4">
                  <Settings className="w-12 h-12 mx-auto text-orange-400" />
                </div>
                <h4 className="text-xl font-bold text-orange-300 mb-2">First Commercial QPU</h4>
                <p className="text-sm text-gray-300">Breaking Norway's quantum computing barrier with Rigetti Novera</p>
                <div className="mt-3 text-orange-400 font-semibold">Q1 2025 Deployment</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/30">
                <div className="mb-4">
                  <Globe className="w-12 h-12 mx-auto text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-purple-300 mb-2">European Leadership</h4>
                <p className="text-sm text-gray-300">Positioning Northern Europe as quantum computing hub</p>
                <div className="mt-3 text-purple-400 font-semibold">Regional Dominance</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/30">
                <div className="mb-4">
                  <Rocket className="w-12 h-12 mx-auto text-cyan-400" />
                </div>
                <h4 className="text-xl font-bold text-cyan-300 mb-2">Commercial Bridge</h4>
                <p className="text-sm text-gray-300">Connecting quantum research to real-world applications</p>
                <div className="mt-3 text-cyan-400 font-semibold">Market Ready</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-orange-400" />
              Performance Comparison: QDaria vs Traditional Solutions
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="metric" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #00d4ff',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="qdaria" fill="#00d4ff" name="QDaria Platform" radius={[4, 4, 0, 0]} />
                <Bar dataKey="traditional" fill="#ff6b35" name="Traditional Solutions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                <div className="text-2xl font-bold text-cyan-400">10x</div>
                <div className="text-sm text-gray-300">Faster Processing</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-orange-400/20">
                <div className="text-2xl font-bold text-orange-400">60%</div>
                <div className="text-sm text-gray-300">Cost Reduction</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-green-400/20">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-sm text-gray-300">Accuracy Rate</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-purple-400" />
                AI Product Portfolio Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={aiProductsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} fontSize={10} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="products" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.3} name="Products Count" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="qdaria-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Revenue per Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiProductsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} fontSize={10} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="#ff6b35" name="Avg Revenue (€M)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Novera QPU-Powered Platform Architecture</h3>
            <p className="text-gray-300 text-sm mb-6 text-center">
              All QDaria products powered by the central Rigetti Novera Quantum Processing Unit
            </p>
            
            {/* Central Novera QPU */}
            <div className="flex justify-center mb-6">
              <div className="text-center p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border-2 border-orange-500/40 shadow-lg">
                <div className="mb-4 p-3 bg-orange-500/30 rounded-full mx-auto w-fit">
                  <Settings className="w-16 h-16 text-orange-300" />
                </div>
                <h4 className="text-xl font-bold text-orange-300 mb-2">Rigetti Novera QPU</h4>
                <p className="text-sm text-gray-300">9-Qubit Superconducting Processor</p>
                <div className="mt-2 text-orange-400 font-semibold">Central Quantum Engine</div>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-2xl">
                <svg className="w-full h-16" viewBox="0 0 400 60">
                  <line x1="200" y1="10" x2="50" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="200" y1="10" x2="133" y2="50" stroke="#00d4ff" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="200" y1="10" x2="267" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="200" y1="10" x2="350" y2="50" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>

            {/* Product Suite */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-6 qdaria-product-container zipminator group">
                <div className="mb-4 p-2">
                  <img src="/Zipminator.svg" alt="Zipminator" className="w-12 h-12 mx-auto transition-transform group-hover:scale-110 qdaria-icon-red" />
                </div>
                <h4 className="font-bold qdaria-gradient-text mb-2">Zipminator</h4>
                <p className="text-sm text-slate-300">Quantum-Safe Cryptography</p>
                <div className="mt-3 text-red-400 font-semibold">450+ Products</div>
                <div className="mt-2 text-xs text-gray-400">Novera-Powered</div>
              </div>
              <div className="text-center p-6 qdaria-product-container qm9 group">
                <div className="mb-4 p-2">
                  <img src="/Qm9.svg" alt="Qm9" className="w-12 h-12 mx-auto transition-transform group-hover:scale-110 qdaria-icon-primary" />
                </div>
                <h4 className="font-bold qdaria-gradient-text mb-2">Qm9</h4>
                <p className="text-sm text-slate-300">Quantum FinTech</p>
                <div className="mt-3 text-cyan-400 font-semibold">380+ Products</div>
                <div className="mt-2 text-xs text-gray-400">Novera-Powered</div>
              </div>
              <div className="text-center p-6 qdaria-product-container qmike group">
                <div className="mb-4 p-2">
                  <img src="/QMike.svg" alt="QMike" className="w-12 h-12 mx-auto transition-transform group-hover:scale-110 qdaria-icon-green" />
                </div>
                <h4 className="font-bold qdaria-gradient-text mb-2">QMike</h4>
                <p className="text-sm text-slate-300">Quantum HPC & Engineering</p>
                <div className="mt-3 text-green-400 font-semibold">290+ Products</div>
                <div className="mt-2 text-xs text-gray-400">Novera-Powered</div>
              </div>
              <div className="text-center p-6 qdaria-product-container qdiana group">
                <div className="mb-4 p-2">
                  <img src="/QDiana.svg" alt="QDiana" className="w-12 h-12 mx-auto transition-transform group-hover:scale-110 qdaria-icon-purple" />
                </div>
                <h4 className="font-bold qdaria-gradient-text mb-2">QDiana</h4>
                <p className="text-sm text-slate-300">Quantum Education</p>
                <div className="mt-3 text-purple-400 font-semibold">220+ Products</div>
                <div className="mt-2 text-xs text-gray-400">Novera-Powered</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolutionSlide;