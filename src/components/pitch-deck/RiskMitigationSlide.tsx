import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Progress } from '@/components/pitch-deck/ui/progress';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Shield, AlertTriangle, Zap, Users, TrendingDown, CheckCircle, Brain, Globe, Lock, Cpu } from 'lucide-react';

const RiskMitigationSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const riskCategories = [
    { category: 'Technical Risk', current: 25, mitigated: 15, color: '#CCFF00' },
    { category: 'Market Risk', current: 35, mitigated: 20, color: '#9AFF00' },
    { category: 'Competitive Risk', current: 40, mitigated: 25, color: '#66FF00' },
    { category: 'Talent Risk', current: 30, mitigated: 18, color: '#00d4ff' },
    { category: 'Regulatory Risk', current: 20, mitigated: 10, color: '#0099cc' },
  ];

  const technicalRisks = [
    {
      risk: 'Quantum Hardware Reliability',
      impact: 'High',
      probability: 'Medium',
      mitigation: 'Hardware-agnostic platform across 15+ QPU vendors',
      status: 'Implemented',
      effectiveness: 85,
      icon: Cpu
    },
    {
      risk: 'Algorithm Scalability',
      impact: 'High', 
      probability: 'Medium',
      mitigation: 'Hybrid classical-quantum algorithms with proven scalability',
      status: 'Active',
      effectiveness: 78,
      icon: Brain
    },
    {
      risk: 'Quantum Error Rates',
      impact: 'Medium',
      probability: 'High',
      mitigation: 'Error-aware algorithm design and fallback mechanisms',
      status: 'Implemented',
      effectiveness: 72,
      icon: AlertTriangle
    },
  ];

  const marketRisks = [
    {
      risk: 'Slower Enterprise Adoption',
      impact: 'High',
      probability: 'Medium',
      mitigation: 'Strong AI capabilities delivering immediate ROI',
      status: 'Active',
      effectiveness: 82,
      icon: TrendingDown
    },
    {
      risk: 'Quantum Winter Scenario',
      impact: 'High',
      probability: 'Low',
      mitigation: '1500+ AI products providing revenue diversification',
      status: 'Implemented',
      effectiveness: 90,
      icon: Shield
    },
    {
      risk: 'Market Education Burden',
      impact: 'Medium',
      probability: 'High',
      mitigation: 'Strategic partnerships and thought leadership program',
      status: 'Active',
      effectiveness: 75,
      icon: Users
    },
  ];

  const competitiveRisks = [
    {
      risk: 'Big Tech Competition',
      impact: 'High',
      probability: 'High',
      mitigation: 'Enterprise-first focus and 6-month deployment advantage',
      status: 'Active',
      effectiveness: 68,
      icon: Globe
    },
    {
      risk: 'Patent Litigation',
      impact: 'Medium',
      probability: 'Low',
      mitigation: 'Strong IP portfolio and freedom-to-operate analysis',
      status: 'Implemented',
      effectiveness: 88,
      icon: Lock
    },
    {
      risk: 'Pricing Pressure',
      impact: 'Medium',
      probability: 'High',
      mitigation: 'Unique value proposition and enterprise premium positioning',
      status: 'Active',
      effectiveness: 73,
      icon: TrendingDown
    },
  ];

  const mitigationTimeline = [
    { quarter: 'Q3 2024', technical: 85, market: 75, competitive: 70, talent: 80, regulatory: 90 },
    { quarter: 'Q4 2024', technical: 88, market: 80, competitive: 75, talent: 85, regulatory: 92 },
    { quarter: 'Q1 2025', technical: 90, market: 85, competitive: 78, talent: 88, regulatory: 94 },
    { quarter: 'Q2 2025', technical: 92, market: 88, competitive: 82, talent: 90, regulatory: 96 },
  ];

  const contingencyPlans = [
    {
      scenario: 'Quantum Hardware Delays',
      probability: '30%',
      response: 'Accelerate AI product development, expand classical optimization',
      timeline: '3 months',
      impact: 'Revenue delayed by 6 months'
    },
    {
      scenario: 'Major Competitor Launch',
      probability: '60%',
      response: 'Accelerate enterprise partnerships, emphasize deployment speed',
      timeline: '1 month',
      impact: 'Market share pressure'
    },
    {
      scenario: 'Regulatory Changes',
      probability: '25%',
      response: 'Leverage post-quantum cryptography leadership position',
      timeline: '2 months',
      impact: 'Competitive advantage increase'
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return '#FF6B6B';
      case 'Medium': return '#FFD93D';
      case 'Low': return '#6BCF7F';
      default: return '#94a3b8';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return '#66FF00';
      case 'Active': return '#CCFF00';
      case 'Planned': return '#9AFF00';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Risk & Mitigation Strategy</h1>
        <p className="text-2xl text-gray-300 mt-4">
          Proactive Risk Management for Quantum Computing Leadership
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {riskCategories.map((risk, index) => (
          <Card key={index} className="text-center p-4 bg-slate-800/50 border border-cyan-400/20">
            <div className="text-lg font-bold text-white mb-2">{risk.category}</div>
            <div className="space-y-2">
              <Progress value={risk.current} className="h-2 bg-slate-700">
                <div 
                  className="h-full transition-all rounded-full"
                  style={{ width: `${risk.current}%`, backgroundColor: '#FF6B6B' }}
                />
              </Progress>
              <div className="text-xs text-red-400">Current: {risk.current}%</div>
              <Progress value={risk.mitigated} className="h-2 bg-slate-700">
                <div 
                  className="h-full transition-all rounded-full"
                  style={{ width: `${risk.mitigated}%`, backgroundColor: risk.color }}
                />
              </Progress>
              <div className="text-xs text-gray-300">Mitigated: {risk.mitigated}%</div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="technical" className="qdaria-tab">Technical Risks</TabsTrigger>
          <TabsTrigger value="market" className="qdaria-tab">Market Risks</TabsTrigger>
          <TabsTrigger value="competitive" className="qdaria-tab">Competitive Risks</TabsTrigger>
          <TabsTrigger value="contingency" className="qdaria-tab">Contingency Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  Technical Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalRisks.map((risk, index) => {
                    const IconComponent = risk.icon;
                    return (
                      <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-cyan-400" />
                            <h4 className="text-white font-bold">{risk.risk}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              className="border" 
                              style={{ 
                                backgroundColor: `${getRiskColor(risk.impact)}20`,
                                color: getRiskColor(risk.impact),
                                borderColor: `${getRiskColor(risk.impact)}50`
                              }}
                            >
                              {risk.impact}
                            </Badge>
                            <Badge 
                              className="border"
                              style={{ 
                                backgroundColor: `${getStatusColor(risk.status)}20`,
                                color: getStatusColor(risk.status),
                                borderColor: `${getStatusColor(risk.status)}50`
                              }}
                            >
                              {risk.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{risk.mitigation}</p>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">Effectiveness:</span>
                          <Progress value={risk.effectiveness} className="flex-1 h-2" />
                          <span className="text-sm font-bold text-cyan-400">{risk.effectiveness}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  Technical Risk Mitigation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mitigationTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="quarter" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[60, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                    <Line type="monotone" dataKey="technical" stroke="#CCFF00" strokeWidth={3} />
                    <Line type="monotone" dataKey="market" stroke="#9AFF00" strokeWidth={2} />
                    <Line type="monotone" dataKey="competitive" stroke="#66FF00" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingDown className="w-5 h-5 text-cyan-400" />
                Market Risk Mitigation Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketRisks.map((risk, index) => {
                  const IconComponent = risk.icon;
                  return (
                    <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-green-400/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-green-400" />
                          <h4 className="text-white font-bold">{risk.risk}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className="border" 
                            style={{ 
                              backgroundColor: `${getRiskColor(risk.impact)}20`,
                              color: getRiskColor(risk.impact),
                              borderColor: `${getRiskColor(risk.impact)}50`
                            }}
                          >
                            {risk.impact}
                          </Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">{risk.effectiveness}%</div>
                            <div className="text-xs text-gray-300">effective</div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300">{risk.mitigation}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-cyan-400" />
                Competitive Risk Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitiveRisks.map((risk, index) => {
                  const IconComponent = risk.icon;
                  return (
                    <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-purple-400/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                          <h4 className="text-white font-bold">{risk.risk}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className="border" 
                            style={{ 
                              backgroundColor: `${getRiskColor(risk.impact)}20`,
                              color: getRiskColor(risk.impact),
                              borderColor: `${getRiskColor(risk.impact)}50`
                            }}
                          >
                            {risk.impact}
                          </Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-400">{risk.effectiveness}%</div>
                            <div className="text-xs text-gray-300">mitigated</div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300">{risk.mitigation}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contingency" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Contingency & Response Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contingencyPlans.map((plan, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-orange-400/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-lg">{plan.scenario}</h4>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-400/20 text-orange-300 border border-orange-400/50">
                          {plan.probability} probability
                        </Badge>
                        <Badge className="qdaria-badge">
                          {plan.timeline} response
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">Response:</span>
                        <span className="text-gray-300">{plan.response}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-medium">Impact:</span>
                        <span className="text-gray-300">{plan.impact}</span>
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

export default RiskMitigationSlide;