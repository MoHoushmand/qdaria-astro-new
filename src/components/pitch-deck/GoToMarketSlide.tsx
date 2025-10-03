import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { Target, Users, Globe, Zap, TrendingUp, Building, Briefcase, Award, ArrowRight, MapPin, Calendar, Cpu, Handshake, BookOpen, Shield } from 'lucide-react';

const GoToMarketSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('strategy');

  const quantumServices = [
    { service: 'Quantum Readiness Assessment', duration: '2-4 weeks', price: '€25-50K', description: 'Executive briefing + technical evaluation' },
    { service: 'Novera QPU Pilot Program', duration: '3-6 months', price: '€250-500K', description: 'Hands-on quantum computing project' },
    { service: 'Quantum Training & Education', duration: '1-3 months', price: '€50-150K', description: 'Workforce quantum readiness program' },
    { service: 'Strategic Quantum Consulting', duration: '6-12 months', price: '€500K-2M', description: 'Long-term quantum transformation' },
  ];

  const marketEntry = [
    { region: 'Norway (Phase 1)', timeline: 'Aug-Sep 2025', enterprises: 30, focus: 'Quantum Leadership Campaign', color: '#CCFF00', meetings: 30, strategy: 'Novera QPU Demos' },
    { region: 'Germany (Phase 2)', timeline: 'Sep-Oct 2025', enterprises: 30, focus: 'European Expansion', color: '#9AFF00', meetings: 30, strategy: 'Management Events Partnership' },
    { region: 'DACH Extended', timeline: 'Q4 2025', enterprises: 850, focus: 'Manufacturing & Automotive', color: '#66FF00', meetings: 0, strategy: 'Traditional GTM' },
    { region: 'Nordics Extended', timeline: 'Q1 2026', enterprises: 420, focus: 'Energy & FinTech', color: '#00d4ff', meetings: 0, strategy: 'Scale Success' },
    { region: 'Benelux', timeline: 'Q2 2026', enterprises: 380, focus: 'Logistics & Healthcare', color: '#0099cc', meetings: 0, strategy: 'Geographic Expansion' },
  ];

  const salesFunnel = [
    { stage: '60 Executive Meetings', volume: 60, conversion: 12, timeframe: 'Aug-Oct 2025' },
    { stage: 'Quantum Readiness Assessment', volume: 7, conversion: 85, timeframe: 'Nov 2025' },
    { stage: 'Proof of Concept', volume: 6, conversion: 67, timeframe: 'Dec 2025-Feb 2026' },
    { stage: 'Pilot Program', volume: 4, conversion: 75, timeframe: 'Mar-Jun 2026' },
    { stage: 'Commercial Contract', volume: 3, conversion: 100, timeframe: 'Jul+ 2026' },
  ];

  const channelStrategy = [
    { name: 'Management Events Partnership', percentage: 40, revenue: '€1.5M', color: '#CCFF00' },
    { name: 'Novera QPU Consulting', percentage: 25, revenue: '€937K', color: '#9AFF00' },
    { name: 'Quantum Training Programs', percentage: 20, revenue: '€750K', color: '#66FF00' },
    { name: 'Research Partnerships', percentage: 15, revenue: '€562K', color: '#00d4ff' },
  ];

  const competitivePositioning = [
    { 
      competitor: 'IBM Quantum', 
      advantage: 'Physical Novera QPU access vs cloud-only', 
      winRate: 45,
      strategy: 'Demonstrate tangible quantum hardware advantage'
    },
    { 
      competitor: 'Google Quantum', 
      advantage: 'Executive engagement vs academic focus', 
      winRate: 52,
      strategy: 'Management Events C-suite access strategy'
    },
    { 
      competitor: 'Microsoft Azure', 
      advantage: 'Quantum consulting vs platform commodity', 
      winRate: 48,
      strategy: 'Position as strategic quantum partner'
    },
    { 
      competitor: 'European Quantum Startups', 
      advantage: 'First-mover Novera advantage in Europe', 
      winRate: 75,
      strategy: 'Establish quantum hardware leadership early'
    },
  ];

  const keyMetrics = [
    { metric: 'Sales Cycle', current: '8 months', target: '6 months', improvement: '25%' },
    { metric: 'Lead Conversion', current: '5.1%', target: '7.5%', improvement: '47%' },
    { metric: 'CAC', current: '€15K', target: '€12K', improvement: '20%' },
    { metric: 'LTV/CAC Ratio', current: '8.2x', target: '10.5x', improvement: '28%' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">European Quantum Dominance Strategy</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">
          60 Executive Meetings → Novera QPU Advantage → European Market Leadership
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="strategy" className="qdaria-tab">60-Meeting Strategy</TabsTrigger>
          <TabsTrigger value="sales" className="qdaria-tab">Novera Advantage</TabsTrigger>
          <TabsTrigger value="channels" className="qdaria-tab">Service Portfolio</TabsTrigger>
          <TabsTrigger value="competitive" className="qdaria-tab">Competitive Play</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Handshake className="w-5 h-5 text-cyan-400" />
                  Management Events 60-Meeting Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketEntry.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <div>
                          <h4 className="text-white font-medium">{entry.region}</h4>
                          <p className="text-sm text-slate-400 font-light">{entry.focus}</p>
                          <p className="text-xs text-purple-300">{entry.strategy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="qdaria-badge mb-1">{entry.timeline}</Badge>
                        {entry.meetings > 0 ? (
                          <p className="text-sm text-green-400">{entry.meetings} meetings</p>
                        ) : (
                          <p className="text-sm text-slate-400 font-light">{entry.enterprises} enterprises</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  Novera QPU Commercial Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <div className="text-3xl font-bold text-cyan-400">10-15%</div>
                      <div className="text-sm text-slate-400 font-light">Meeting-to-Pilot Rate</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-green-400/20">
                      <div className="text-3xl font-bold text-green-400">€375K</div>
                      <div className="text-sm text-slate-400 font-light">Average Pilot Value</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span className="text-slate-400 font-light">"See It, Touch It, Use It" - Physical QPU Demos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <span className="text-slate-400 font-light">Quantum Training & Education Programs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <span className="text-slate-400 font-light">Quantum Readiness Assessment Service</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ArrowRight className="w-5 h-5 text-cyan-400" />
                European Quantum Dominance Roadmap
              </CardTitle>
              <CardDescription className="text-slate-400 font-light">
                Path from 60 Executive Meetings to Market Leadership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mb-3">
                      <Handshake className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Phase 1: Executive Access</h3>
                    <p className="text-sm text-slate-400 font-light mb-4">Aug-Oct 2025</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">30 Norway C-suite meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">30 Germany executive meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">Novera QPU demonstrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">Quantum readiness assessments</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-3">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Phase 2: Pilot Conversion</h3>
                    <p className="text-sm text-slate-400 font-light mb-4">Nov 2025-Jun 2026</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">6-9 pilot programs launched</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">€1.5-3M pilot revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">Quantum consulting services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">Training program rollouts</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Phase 3: Market Leadership</h3>
                    <p className="text-sm text-slate-400 font-light mb-4">2026+</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">3-4 commercial contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">€5-15M annual revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">European quantum leader</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-slate-400 font-light">Scale to 5+ countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-cyan-400" />
                Management Events Conversion Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesFunnel}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="stage" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                    <Area type="monotone" dataKey="volume" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-green-900/30 rounded-lg border border-cyan-400/20">
                    <h3 className="text-white font-bold mb-3">Target Industries</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-cyan-300">• Finance & Banking</div>
                      <div className="text-green-300">• Pharmaceuticals</div>
                      <div className="text-purple-300">• Manufacturing</div>
                      <div className="text-orange-300">• Government</div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-400/20">
                    <h3 className="text-white font-bold mb-2">Expected Outcomes</h3>
                    <div className="space-y-1 text-sm">
                      <div className="text-slate-400 font-light">60 meetings → 6-9 assessments</div>
                      <div className="text-slate-400 font-light">€250K-500K pilot values</div>
                      <div className="text-slate-400 font-light">Path to European quantum leadership</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Quantum Service Portfolio Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelStrategy}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="percentage"
                    >
                      {channelStrategy.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }}
                      formatter={(value: any, name: any, props: any) => [
                        `${props.payload.revenue} (${value}%)`, 
                        props.payload.name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Handshake className="w-5 h-5 text-cyan-400" />
                  European Partnership Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-900/50 to-green-900/50 rounded-lg border border-cyan-400/40">
                    <div>
                      <h4 className="text-white font-bold">Management Events</h4>
                      <p className="text-sm text-cyan-300">60 Executive Meetings Aug-Oct 2025</p>
                      <p className="text-xs text-slate-400 font-light">Norway + Germany C-Suite Access</p>
                    </div>
                    <Badge className="qdaria-badge">CORE STRATEGY</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-green-400/20">
                    <div>
                      <h4 className="text-white font-medium">Rigetti Computing</h4>
                      <p className="text-sm text-slate-400 font-light">Novera QPU Hardware Partner</p>
                      <p className="text-xs text-green-300">Physical quantum demos</p>
                    </div>
                    <Badge className="qdaria-badge">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-purple-400/20">
                    <div>
                      <h4 className="text-white font-medium">Norwegian Research Institutions</h4>
                      <p className="text-sm text-slate-400 font-light">NTNU, University of Oslo</p>
                      <p className="text-xs text-purple-300">Academic partnerships</p>
                    </div>
                    <Badge className="bg-orange-400/20 text-orange-300 border border-orange-400/50">Target</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-orange-400/20">
                    <div>
                      <h4 className="text-white font-medium">German Quantum Initiative</h4>
                      <p className="text-sm text-slate-400 font-light">BMW, SAP, Siemens Ecosystem</p>
                      <p className="text-xs text-orange-300">Industry collaboration</p>
                    </div>
                    <Badge className="bg-slate-500/20 text-slate-400 font-light border border-slate-500/50">Pipeline</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Quantum Service Offerings Detail
              </CardTitle>
              <CardDescription className="text-slate-400 font-light">
                Complete portfolio targeting Management Events contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quantumServices.map((service, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white font-bold text-lg">{service.service}</h4>
                      <Badge className="qdaria-badge ml-2">{service.price}</Badge>
                    </div>
                    <p className="text-slate-400 font-light text-sm mb-3">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-400">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-cyan-400" />
                First-Mover Advantage: European Quantum Leadership
              </CardTitle>
              <CardDescription className="text-slate-400 font-light">
                Competitive positioning with Novera QPU physical advantage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitivePositioning.map((comp, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-lg">{comp.competitor}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-cyan-400">{comp.winRate}%</span>
                        <span className="text-slate-400 font-light">win rate</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">Key Advantage:</span>
                        <span className="text-slate-400 font-light">{comp.advantage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-medium">Win Strategy:</span>
                        <span className="text-slate-400 font-light">{comp.strategy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoToMarketSlide;