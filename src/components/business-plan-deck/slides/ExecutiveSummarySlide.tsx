import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Eye, Heart, Award, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../pitch-deck/ui/tabs';
import { Badge } from '../../pitch-deck/ui/badge';
import { MetricCard } from '../cards/MetricCard';
import '../styles/index.css';

interface ValueProp {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight: string;
}

interface CoreValue {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ExecutiveSummarySlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const businessUnits = [
    {
      title: 'Quantum Hardware Division',
      description: 'Developing and renting experimental quantum computing kits',
      icon: <Building2 className="w-6 h-6" />,
      status: 'Active'
    },
    {
      title: 'Quantum Software Group',
      description: 'Quantum-enhanced applications and middleware platforms',
      icon: <Target className="w-6 h-6" />,
      status: 'Active'
    },
    {
      title: 'AI Systems Team',
      description: 'Intelligent agents making quantum computing accessible',
      icon: <Users className="w-6 h-6" />,
      status: 'Active'
    }
  ];

  const valuePropositions: ValueProp[] = [
    {
      title: 'Democratized Hardware Access',
      description: 'Physical access to experimental quantum devices through our rental program. Invaluable hands-on experience for researchers, educators, and enterprise R&D teams.',
      icon: <Building2 className="w-8 h-8" />,
      highlight: 'Hands-on quantum experience'
    },
    {
      title: 'Quantum-Enhanced Software',
      description: 'Zipminator and Qm9 platforms deliver quantum advantages for specific high-value problems without requiring quantum programming expertise.',
      icon: <Target className="w-8 h-8" />,
      highlight: 'No quantum expertise required'
    },
    {
      title: 'AI-Powered Interfaces',
      description: 'QDiana and QMikeAI serve as intelligent intermediaries, dramatically lowering expertise barriers through natural language interaction.',
      icon: <Award className="w-8 h-8" />,
      highlight: 'Natural language to quantum'
    }
  ];

  const coreValues: CoreValue[] = [
    {
      title: 'Innovation Excellence',
      description: 'Pushing the boundaries of quantum computing',
      icon: <Award className="w-5 h-5" />
    },
    {
      title: 'Accessibility',
      description: 'Making quantum technology understandable and available',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Collaborative Growth',
      description: 'Building partnerships that accelerate the ecosystem',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Ethical Development',
      description: 'Ensuring responsible advancement of quantum technology',
      icon: <Heart className="w-5 h-5" />
    }
  ];

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
            Executive Summary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="business-plan-section-subtitle business-plan-lead"
          >
            Bridging Quantum Computing and AI to Democratize Access to Next-Generation Technology
          </motion.p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="mission" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20">
              Mission & Vision
            </TabsTrigger>
            <TabsTrigger value="value" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20">
              Value Proposition
            </TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20">
              Market Position
            </TabsTrigger>
          </TabsList>

          {/* Company Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="business-plan-h2">
                    Company Overview
                  </CardTitle>
                  <CardDescription className="business-plan-body text-secondary-contrast">
                    Founded in early 2025 by quantum computing PhDs and AI experts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Building2 className="w-5 h-5" />
                        <span className="business-plan-h5">Headquarters</span>
                      </div>
                      <p className="business-plan-body text-secondary-contrast pl-7">Oslo, Norway with satellite office in Silicon Valley</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Target className="w-5 h-5" />
                        <span className="business-plan-h5">Stage</span>
                      </div>
                      <p className="business-plan-body text-secondary-contrast pl-7">Pre-seed with strategic partnerships</p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h4 className="business-plan-h4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-400" />
                      Core Business Units
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {businessUnits.map((unit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <Card className="card-professional h-full hover:scale-105 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="text-cyan-400">{unit.icon}</div>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {unit.status}
                                </Badge>
                              </div>
                              <CardTitle className="business-plan-h4">
                                {unit.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="business-plan-body text-secondary-contrast">{unit.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">Strategic Partnerships</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                        Norwegian University of Science and Technology (NTNU)
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                        Quantum Technology Centre, University of Oslo
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                        2 Enterprise Pilot Clients
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Mission & Vision Tab */}
          <TabsContent value="mission" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-8 h-8 text-cyan-400" />
                      <CardTitle className="text-2xl text-white">Mission Statement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      To democratize access to quantum computing technology and accelerate the development of practical quantum applications through the integration of artificial intelligence.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 border-green-500/30 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-8 h-8 text-green-400" />
                      <CardTitle className="text-2xl text-white">Vision Statement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      To become the world's leading provider of quantum-AI integrated solutions by 2030, enabling organizations to harness quantum advantages and solve previously intractable problems.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Core Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                      >
                        <div className="text-cyan-400 mt-1">{value.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                          <p className="text-sm text-gray-400">{value.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Value Proposition Tab */}
          <TabsContent value="value" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {valuePropositions.map((prop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="text-cyan-400 mt-1">{prop.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-2xl font-bold text-white">{prop.title}</h3>
                            <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30">
                              {prop.highlight}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-lg leading-relaxed">{prop.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Market Position Tab */}
          <TabsContent value="market" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent">
                    Market Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="card-grid-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MetricCard
                        value="$1T"
                        label="Economic Value by 2035"
                        description="Projected quantum computing market impact"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MetricCard
                        value="$5-7B"
                        label="Market Size by 2029"
                        description="Conservative near-term estimate"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <MetricCard
                        value="$30B+"
                        label="Government Funding Committed"
                        description="Worldwide quantum investment"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Strategic Positioning</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      QDaria occupies a unique niche by combining hardware access through kit rentals, quantum software solutions, and agentic AI interfaces—a holistic value proposition unmatched by competitors.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-cyan-500/20 text-cyan-300">Hardware Access</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300">Quantum Software</Badge>
                      <Badge className="bg-green-500/20 text-green-300">AI Integration</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300">Full Stack</Badge>
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

export default ExecutiveSummarySlide;
