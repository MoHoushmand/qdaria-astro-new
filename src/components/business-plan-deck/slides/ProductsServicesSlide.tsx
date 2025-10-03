import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Zap, Cpu, Bot, Code, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { MetricCard } from '../cards/MetricCard';
import '../styles/index.css';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  targetMarket: string[];
  pricing: string;
  status: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

export const ProductsServicesSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: 'kits',
      name: 'Quantum Experimental Kits',
      tagline: 'Hands-On Quantum Hardware Access',
      description: 'Rent small-scale quantum computing devices for research, education, and enterprise R&D. Desktop devices operating at room temperature with 2-3 qubits.',
      features: [
        'Real quantum hardware experience',
        'Educational and research focused',
        'Flexible rental periods',
        'Full technical support',
        'Integration with QDaria software stack'
      ],
      targetMarket: ['Universities', 'Research Labs', 'Enterprise R&D', 'Educational Institutions'],
      pricing: '$9,000 - $50,000+ per rental period',
      status: 'Pilot Program Active',
      icon: <Box className="w-8 h-8" />,
      gradient: 'from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      id: 'zipminator',
      name: 'Zipminator',
      tagline: 'Quantum-Accelerated Compression',
      description: 'Proprietary quantum software for data compression and optimization. Achieves compression ratios beyond classical methods using quantum annealing and variational algorithms.',
      features: [
        'Superior compression ratios',
        'Quantum algorithm optimization',
        'Large dataset handling',
        'Integration with existing workflows',
        'Real-time performance analytics'
      ],
      targetMarket: ['Data Centers', 'Cloud Providers', 'Enterprise Storage', 'Scientific Computing'],
      pricing: 'Subscription & Usage-Based',
      status: 'Beta Development',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-blue-500/10 to-purple-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'qm9',
      name: 'Qm9 Platform',
      tagline: 'Quantum Development Middleware',
      description: 'Agnostic quantum software platform with tools and libraries for writing and optimizing quantum algorithms across different hardware platforms.',
      features: [
        'Hardware-agnostic architecture',
        'Cross-platform compatibility',
        'Task scheduling and optimization',
        'Error mitigation techniques',
        'Developer-friendly APIs'
      ],
      targetMarket: ['Quantum Developers', 'Research Institutions', 'Enterprise Tech Teams', 'Startups'],
      pricing: 'Freemium + Enterprise Licenses',
      status: 'Alpha Release',
      icon: <Code className="w-8 h-8" />,
      gradient: 'from-green-500/10 to-cyan-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'qdiana',
      name: 'QDiana',
      tagline: 'Enterprise AI Quantum Consultant',
      description: 'Agentic AI system that acts as an AI consultant for businesses. Understands problems in natural language, maps to quantum algorithms, and interprets results.',
      features: [
        'Natural language interface',
        'Problem-to-algorithm mapping',
        'Automated quantum execution',
        'Result interpretation',
        'Decision support system'
      ],
      targetMarket: ['Business Executives', 'Financial Analysts', 'Strategy Teams', 'Enterprise Decision Makers'],
      pricing: 'Enterprise Subscription',
      status: 'Development Phase',
      icon: <Sparkles className="w-8 h-8" />,
      gradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'qmikeai',
      name: 'QMikeAI',
      tagline: 'Developer & Researcher Assistant',
      description: 'AI agent designed for developers and researchers working with quantum technology. Smart assistant for quantum programmers and experimenters.',
      features: [
        'Code generation and optimization',
        'Debugging assistance',
        'Algorithm recommendations',
        'Experimental design support',
        'Documentation generation'
      ],
      targetMarket: ['Quantum Developers', 'Research Scientists', 'PhD Students', 'Quantum Engineers'],
      pricing: 'Individual & Team Licenses',
      status: 'Alpha Testing',
      icon: <Bot className="w-8 h-8" />,
      gradient: 'from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  const productOverview = {
    hardware: {
      title: 'Hardware Access',
      value: '2-3 Qubit Systems',
      description: 'Physical quantum computing kits for hands-on experimentation'
    },
    software: {
      title: 'Software Platforms',
      value: '2 Core Products',
      description: 'Zipminator and Qm9 quantum software solutions'
    },
    ai: {
      title: 'AI Agents',
      value: '2 Agentic Systems',
      description: 'QDiana and QMikeAI intelligent assistants'
    },
    integration: {
      title: 'Full Stack',
      value: '100% Integrated',
      description: 'Complete quantum-AI ecosystem'
    }
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
            Products & Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="business-plan-section-subtitle business-plan-lead"
          >
            Complete Quantum-AI Ecosystem: Hardware, Software, and Intelligent Agents
          </motion.p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="products">Product Details</TabsTrigger>
            <TabsTrigger value="integration">Integration Strategy</TabsTrigger>
          </TabsList>

          {/* Portfolio Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {Object.entries(productOverview).map(([key, item], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <MetricCard
                    value={item.value}
                    label={item.title}
                    description={item.description}
                  />
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <Card className="feature-card-professional h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-cyan-400">{product.icon}</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {product.status}
                        </Badge>
                      </div>
                      <CardTitle className="business-plan-h3">{product.name}</CardTitle>
                      <CardDescription className="business-plan-body text-secondary-contrast">
                        {product.tagline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="business-plan-body text-secondary-contrast mb-4 line-clamp-3">{product.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {product.targetMarket.slice(0, 2).map((market, idx) => (
                          <Badge key={idx} className="bg-slate-800/50 text-gray-300 text-xs">
                            {market}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Product Details Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {products.map((product) => (
                <motion.button
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    selectedProduct === product.id
                      ? `bg-gradient-to-r ${product.gradient} ${product.borderColor} border-2`
                      : 'bg-slate-900/30 border-slate-700/30 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400">{product.icon}</div>
                    <div className="text-sm font-semibold text-white">{product.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedProduct && (
                <motion.div
                  key={selectedProduct}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const product = products.find(p => p.id === selectedProduct);
                    if (!product) return null;

                    return (
                      <Card className={`bg-gradient-to-br ${product.gradient} border ${product.borderColor}`}>
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-cyan-400">{product.icon}</div>
                            <div>
                              <CardTitle className="text-3xl text-white">{product.name}</CardTitle>
                              <CardDescription className="text-gray-300 text-lg font-medium mt-1">
                                {product.tagline}
                              </CardDescription>
                            </div>
                            <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
                              {product.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                            <p className="text-gray-300 leading-relaxed">{product.description}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {product.features.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2"
                                >
                                  <Cpu className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Target Markets</h4>
                              <div className="flex flex-wrap gap-2">
                                {product.targetMarket.map((market, idx) => (
                                  <Badge key={idx} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                                    {market}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Pricing Model</h4>
                              <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20">
                                <div className="text-xl font-bold text-cyan-400">{product.pricing}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedProduct && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Select a product above to view detailed information</p>
              </div>
            )}
          </TabsContent>

          {/* Integration Strategy Tab */}
          <TabsContent value="integration" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Integrated Ecosystem Approach
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    All products work together to provide a seamless quantum-AI experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                      <Box className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                      <h4 className="font-semibold text-white mb-2">Hardware Layer</h4>
                      <p className="text-sm text-gray-400">Physical quantum kits provide real hardware experience</p>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                      <Code className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                      <h4 className="font-semibold text-white mb-2">Software Layer</h4>
                      <p className="text-sm text-gray-400">Zipminator and Qm9 enable quantum applications</p>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-lg border border-green-500/20">
                      <Bot className="w-12 h-12 mx-auto mb-3 text-green-400" />
                      <h4 className="font-semibold text-white mb-2">AI Layer</h4>
                      <p className="text-sm text-gray-400">QDiana and QMikeAI make quantum accessible</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Integration Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-cyan-400 mt-1" />
                        <div>
                          <div className="font-semibold text-white">Unified Experience</div>
                          <div className="text-sm text-gray-400">Single platform for all quantum computing needs</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <div className="font-semibold text-white">AI-Enhanced Workflows</div>
                          <div className="text-sm text-gray-400">Intelligent automation across all products</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cpu className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <div className="font-semibold text-white">Hardware-Software Synergy</div>
                          <div className="text-sm text-gray-400">Optimized performance through integration</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Future Subsidiary Structure</CardTitle>
                  <CardDescription className="text-gray-300">
                    Each product positioned for independent growth and potential IPO
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-center p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10"
                      >
                        <div className="text-cyan-400 mb-2 flex justify-center">{product.icon}</div>
                        <div className="text-sm font-semibold text-white">{product.name}</div>
                        <div className="text-xs text-gray-400 mt-1">Inc.</div>
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
export default ProductsServicesSlide;
