import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import {
  Cpu,
  Layers,
  Database,
  Shield,
  Zap,
  GitBranch,
  Server,
  Globe,
  Settings,
  Lock,
  Activity,
  Code,
  Network,
  Brain,
  Box
} from 'lucide-react';

const TechnologySlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  // Rigetti Novera QPU Specifications
  const noveraSpecs = [
    {
      component: 'Qubit Count',
      specification: '256 superconducting qubits',
      icon: Cpu,
      color: 'text-orange-400'
    },
    {
      component: 'Coherence Time',
      specification: '100 microseconds',
      icon: Activity,
      color: 'text-cyan-400'
    },
    {
      component: 'Gate Fidelity',
      specification: '99.5% single-qubit, 99% two-qubit',
      icon: Zap,
      color: 'text-green-400'
    },
    {
      component: 'Operating Temperature',
      specification: '15mK (Dilution Refrigerator)',
      icon: Settings,
      color: 'text-blue-400'
    },
    {
      component: 'Connectivity',
      specification: 'Tunable coupling architecture',
      icon: Network,
      color: 'text-purple-400'
    },
    {
      component: 'Control System',
      specification: 'Real-time quantum orchestration',
      icon: Server,
      color: 'text-pink-400'
    },
  ];

  // Quantum Algorithms
  const quantumAlgorithms = [
    {
      name: 'VQE',
      fullName: 'Variational Quantum Eigensolver',
      description: 'Molecular simulation and chemistry optimization',
      applications: ['Drug Discovery', 'Material Science', 'Chemical Engineering'],
      complexity: 'O(poly(n))',
      icon: Brain,
      color: 'cyan'
    },
    {
      name: 'QAOA',
      fullName: 'Quantum Approximate Optimization',
      description: 'Logistics and combinatorial optimization',
      applications: ['Supply Chain', 'Route Optimization', 'Portfolio Management'],
      complexity: 'O(2^n) → O(poly(n))',
      icon: GitBranch,
      color: 'green'
    },
    {
      name: 'QML',
      fullName: 'Quantum Machine Learning',
      description: 'Pattern recognition and AI enhancement',
      applications: ['Image Recognition', 'Predictive Analytics', 'Data Classification'],
      complexity: 'O(log(n))',
      icon: Zap,
      color: 'purple'
    },
  ];

  // Platform Stack Layers
  const platformStack = [
    {
      layer: 'User Interface',
      tech: 'React + Astro + TypeScript',
      description: 'Responsive web application with real-time updates',
      icon: Globe,
      color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30'
    },
    {
      layer: 'API Gateway',
      tech: 'REST + GraphQL + WebSocket',
      description: 'High-performance API with real-time capabilities',
      icon: Server,
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
    },
    {
      layer: 'Orchestration Layer',
      tech: 'Quantum Job Scheduler + AI Router',
      description: 'Intelligent routing between quantum and classical resources',
      icon: Network,
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
    },
    {
      layer: 'Quantum Processing',
      tech: 'Rigetti Novera QPU (256 qubits)',
      description: 'Superconducting quantum processor with 100μs coherence',
      icon: Cpu,
      color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      highlight: true
    },
    {
      layer: 'AI Enhancement',
      tech: '1500+ Quantum-Enhanced AI Products',
      description: 'Quantum-accelerated machine learning and optimization',
      icon: Brain,
      color: 'from-green-500/20 to-green-600/20 border-green-500/30'
    },
    {
      layer: 'Security Layer',
      tech: 'Post-Quantum Cryptography (Zipminator)',
      description: 'NIST-approved quantum-resistant encryption',
      icon: Lock,
      color: 'from-red-500/20 to-red-600/20 border-red-500/30'
    },
    {
      layer: 'Data Storage',
      tech: 'Distributed Database + Quantum State Store',
      description: 'Hybrid classical-quantum data management',
      icon: Database,
      color: 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
    },
  ];

  // Tech Stack Details
  const techStackDetails = {
    frontend: ['React 18', 'Astro 5', 'TypeScript', 'TailwindCSS', 'shadcn/ui'],
    backend: ['Node.js', 'Python', 'FastAPI', 'Express', 'WebSocket'],
    quantum: ['Rigetti Novera QPU', 'PyQuil', 'Quantum SDK', 'Forest API'],
    ai: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Quantum ML Libraries'],
    security: ['Post-Quantum Crypto', 'Lattice-based Algorithms', 'NIST Standards'],
    infrastructure: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD Pipeline']
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 qdaria-gradient-text">
          Technology Architecture: Quantum-AI Platform
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Enterprise-grade quantum computing platform powered by Rigetti Novera QPU with 1500+ AI products
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
            <Cpu className="w-4 h-4 mr-1" />
            256 Qubits
          </Badge>
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            <Activity className="w-4 h-4 mr-1" />
            100μs Coherence
          </Badge>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <Zap className="w-4 h-4 mr-1" />
            99.5% Fidelity
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="architecture" className="qdaria-tab">
            <Layers className="w-4 h-4 mr-2" />
            Platform Architecture
          </TabsTrigger>
          <TabsTrigger value="qpu" className="qdaria-tab">
            <Cpu className="w-4 h-4 mr-2" />
            Rigetti Novera QPU
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="qdaria-tab">
            <GitBranch className="w-4 h-4 mr-2" />
            Quantum Algorithms
          </TabsTrigger>
          <TabsTrigger value="stack" className="qdaria-tab">
            <Code className="w-4 h-4 mr-2" />
            Tech Stack
          </TabsTrigger>
        </TabsList>

        {/* Platform Architecture Tab */}
        <TabsContent value="architecture" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Quantum-AI Hybrid Architecture
            </h3>
            <div className="space-y-4">
              {platformStack.map((layer, index) => (
                <div
                  key={index}
                  className={`relative p-5 rounded-lg border-2 bg-gradient-to-br ${layer.color} transition-all duration-300 hover:scale-[1.02] ${
                    layer.highlight ? 'ring-2 ring-orange-400/50 shadow-lg shadow-orange-500/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${layer.highlight ? 'bg-orange-500/20' : 'bg-slate-800/50'}`}>
                        <layer.icon className={`w-8 h-8 ${layer.highlight ? 'text-orange-300' : 'text-gray-300'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className={`text-lg font-bold ${layer.highlight ? 'text-orange-300' : 'text-white'}`}>
                            {layer.layer}
                          </h4>
                          {layer.highlight && (
                            <Badge className="bg-orange-500/30 text-orange-200 border-orange-400">
                              Core Quantum Engine
                            </Badge>
                          )}
                        </div>
                        <p className="text-cyan-300 font-medium mt-1">{layer.tech}</p>
                        <p className="text-gray-400 text-sm mt-1">{layer.description}</p>
                      </div>
                    </div>
                    {index < platformStack.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-4 bg-gradient-to-b from-cyan-400/50 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Data Flow Visualization */}
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Classical ↔ Quantum ↔ AI Data Flow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/30">
                <Globe className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                <h4 className="text-lg font-bold text-blue-300 mb-2">Classical Input</h4>
                <p className="text-sm text-gray-300">User requests processed through REST/GraphQL API</p>
                <div className="mt-3 text-xs text-gray-400">→ Quantum Orchestrator →</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border-2 border-orange-500/40">
                <Cpu className="w-12 h-12 mx-auto text-orange-400 mb-3" />
                <h4 className="text-lg font-bold text-orange-300 mb-2">Quantum Processing</h4>
                <p className="text-sm text-gray-300">Rigetti Novera QPU executes quantum circuits</p>
                <div className="mt-3 text-xs text-gray-400">→ AI Enhancement →</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/30">
                <Brain className="w-12 h-12 mx-auto text-green-400 mb-3" />
                <h4 className="text-lg font-bold text-green-300 mb-2">AI Processing</h4>
                <p className="text-sm text-gray-300">ML models enhance quantum results</p>
                <div className="mt-3 text-xs text-gray-400">→ Output to User →</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Rigetti Novera QPU Tab */}
        <TabsContent value="qpu" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card p-6">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-orange-400" />
                Rigetti Novera QPU Specifications
              </h3>
              <div className="space-y-4">
                {noveraSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-orange-400/20 hover:border-orange-400/40 transition-all"
                  >
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <spec.icon className={`w-6 h-6 ${spec.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{spec.component}</div>
                      <div className="text-orange-300 text-sm">{spec.specification}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="qdaria-card p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Strategic Investment
              </h3>
              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border-2 border-orange-500/40">
                  <div className="text-5xl font-bold text-orange-400 mb-2">€2.8M</div>
                  <div className="text-lg text-gray-300">Hardware Investment</div>
                  <div className="text-sm text-gray-400 mt-2">Rigetti Novera QPU + Infrastructure</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                    <div className="text-2xl font-bold text-cyan-400">256</div>
                    <div className="text-sm text-gray-300">Qubits</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-green-400/20">
                    <div className="text-2xl font-bold text-green-400">100μs</div>
                    <div className="text-sm text-gray-300">Coherence</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-purple-400/20">
                    <div className="text-2xl font-bold text-purple-400">99.5%</div>
                    <div className="text-sm text-gray-300">Fidelity</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-blue-400/20">
                    <div className="text-2xl font-bold text-blue-400">15mK</div>
                    <div className="text-sm text-gray-300">Operating Temp</div>
                  </div>
                </div>

                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <div className="flex items-center gap-2 text-orange-300 font-semibold mb-2">
                    <Settings className="w-5 h-5" />
                    Norway's First Commercial QPU
                  </div>
                  <p className="text-sm text-gray-300">
                    Breaking the quantum computing barrier in Northern Europe with enterprise-grade hardware
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* QPU Architecture Diagram */}
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Superconducting Quantum Processor Architecture
            </h3>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <Server className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                  <div className="text-sm font-semibold text-blue-300">Control Electronics</div>
                  <div className="text-xs text-gray-400 mt-1">Room Temperature</div>
                </div>
                <div className="text-center">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400" />
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <Activity className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                  <div className="text-sm font-semibold text-purple-300">Dilution Refrigerator</div>
                  <div className="text-xs text-gray-400 mt-1">15mK</div>
                </div>
                <div className="text-center">
                  <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-orange-400" />
                </div>
                <div className="text-center p-4 bg-orange-500/20 rounded-lg border-2 border-orange-500/40">
                  <Cpu className="w-8 h-8 mx-auto text-orange-400 mb-2" />
                  <div className="text-sm font-semibold text-orange-300">256-Qubit Chip</div>
                  <div className="text-xs text-gray-400 mt-1">Superconducting</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Quantum Algorithms Tab */}
        <TabsContent value="algorithms" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Core Quantum Algorithms
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {quantumAlgorithms.map((algo, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 bg-gradient-to-br from-${algo.color}-500/10 to-${algo.color}-600/10 border-${algo.color}-500/30 hover:border-${algo.color}-500/50 transition-all`}
                >
                  <div className={`p-3 bg-${algo.color}-500/20 rounded-lg w-fit mb-4`}>
                    <algo.icon className={`w-8 h-8 text-${algo.color}-400`} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{algo.name}</h4>
                  <p className={`text-${algo.color}-300 text-sm font-medium mb-3`}>{algo.fullName}</p>
                  <p className="text-gray-300 text-sm mb-4">{algo.description}</p>

                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-2">Applications:</div>
                    <div className="flex flex-wrap gap-2">
                      {algo.applications.map((app, i) => (
                        <Badge key={i} className="bg-slate-800/50 text-gray-300 border-gray-600 text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-4 p-3 bg-${algo.color}-500/10 rounded border border-${algo.color}-500/30`}>
                    <div className="text-xs text-gray-400">Complexity:</div>
                    <div className={`text-${algo.color}-300 font-mono text-sm`}>{algo.complexity}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Algorithm Performance Benefits */}
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Quantum Advantage in Real-World Applications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10,000x</div>
                <div className="text-sm text-gray-300 font-semibold mb-2">Chemistry Simulation</div>
                <p className="text-xs text-gray-400">VQE accelerates molecular modeling for drug discovery</p>
              </div>
              <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-green-400/20">
                <div className="text-3xl font-bold text-green-400 mb-2">100x</div>
                <div className="text-sm text-gray-300 font-semibold mb-2">Optimization</div>
                <p className="text-xs text-gray-400">QAOA solves complex logistics and portfolio problems</p>
              </div>
              <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-purple-400/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">50x</div>
                <div className="text-sm text-gray-300 font-semibold mb-2">Pattern Recognition</div>
                <p className="text-xs text-gray-400">QML enhances AI training and inference speed</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tech Stack Tab */}
        <TabsContent value="stack" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStackDetails).map(([category, technologies]) => (
              <Card key={category} className="qdaria-card p-6">
                <CardHeader>
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    {category === 'frontend' && <Globe className="w-5 h-5 text-cyan-400" />}
                    {category === 'backend' && <Server className="w-5 h-5 text-blue-400" />}
                    {category === 'quantum' && <Cpu className="w-5 h-5 text-orange-400" />}
                    {category === 'ai' && <Brain className="w-5 h-5 text-green-400" />}
                    {category === 'security' && <Lock className="w-5 h-5 text-red-400" />}
                    {category === 'infrastructure' && <Box className="w-5 h-5 text-purple-400" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-slate-800/50 rounded border border-gray-700 hover:border-cyan-400/30 transition-all"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-sm text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Post-Quantum Cryptography Highlight */}
          <Card className="qdaria-card p-6 border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-red-500/20 rounded-lg">
                <Shield className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Post-Quantum Cryptography: Zipminator</h3>
                <p className="text-red-300">Norway's quantum-safe security infrastructure</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-red-400/20">
                <Lock className="w-6 h-6 text-red-400 mb-2" />
                <div className="text-sm font-semibold text-white mb-1">NIST-Approved Algorithms</div>
                <p className="text-xs text-gray-400">Lattice-based cryptography resistant to quantum attacks</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-red-400/20">
                <Zap className="w-6 h-6 text-red-400 mb-2" />
                <div className="text-sm font-semibold text-white mb-1">Crypto-Agility</div>
                <p className="text-xs text-gray-400">Seamless algorithm switching without system downtime</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-red-400/20">
                <Shield className="w-6 h-6 text-red-400 mb-2" />
                <div className="text-sm font-semibold text-white mb-1">Quantum-Safe Today</div>
                <p className="text-xs text-gray-400">Protecting against current and future quantum threats</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnologySlide;
