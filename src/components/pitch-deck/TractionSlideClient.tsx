import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, Rocket, Building, CheckCircle } from 'lucide-react';

interface TractionSlideClientProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const TractionSlideClient: React.FC<TractionSlideClientProps> = ({ scenario }) => {
  const [activeTab, setActiveTab] = useState('growth');

  // NOTE: QDaria is in R&D phase - these are PROJECTED milestones, not actual data
  // No customers, revenue, or deployments exist yet
  const growthData = [
    { month: '2025 Q1', users: 0, revenue: 0, partnerships: 0 },
    { month: '2025 Q2', users: 0, revenue: 0, partnerships: 0 },
    { month: '2025 Q3', users: 0, revenue: 0, partnerships: 0 },
    { month: '2025 Q4', users: 0, revenue: 0, partnerships: 0 },
    { month: '2026 Q1', users: 0, revenue: 0, partnerships: 0 },
    { month: '2026 Q2', users: 0, revenue: 0, partnerships: 0 }
  ];

  // NOTE: These are R&D milestones - not product/revenue milestones
  const milestoneData = [
    { category: 'Research', completed: 35, total: 100, color: '#CCFF00' },
    { category: 'Partnerships', completed: 2, total: 15, color: '#9AFF00' },
    { category: 'Funding', completed: 0, total: 100, color: '#66FF00' },
    { category: 'Team', completed: 5, total: 25, color: '#00d4ff' }
  ];

  // NOTE: These are TARGET customer segments - no customers exist yet
  const customerSegments = [
    { name: 'Target: Enterprise', value: 60, color: '#CCFF00' },
    { name: 'Target: Research', value: 30, color: '#9AFF00' },
    { name: 'Target: Government', value: 10, color: '#66FF00' }
  ];

  // NOTE: These are PLANNED milestones - nothing completed yet
  const roadmapData = [
    { quarter: 'Q4 2024', achievements: ['Research phase', 'Team building', 'Initial funding'], status: 'current' },
    { quarter: 'Q1 2025', achievements: ['Prototype development', 'Academic partnerships', 'Seed funding target'], status: 'planned' },
    { quarter: 'Q2-Q4 2025', achievements: ['Lab validation', 'Patent filings', 'Series A preparation'], status: 'planned' },
    { quarter: '2026+', achievements: ['First pilots (target)', 'Initial customers (target)', 'Revenue generation (target)'], status: 'planned' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">R&D Progress & Development Roadmap</h1>
        <p className="text-2xl text-gray-300 mt-4">Building Toward Topological Quantum Computing</p>
        <div className="mt-4 px-6 py-3 bg-orange-500/20 border-2 border-orange-400/50 rounded-lg inline-block">
          <p className="text-orange-300 font-semibold">R&D Phase - No customers or revenue yet</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="growth" className="qdaria-tab">Growth Metrics</TabsTrigger>
          <TabsTrigger value="milestones" className="qdaria-tab">Milestones</TabsTrigger>
          <TabsTrigger value="customers" className="qdaria-tab">Customer Base</TabsTrigger>
          <TabsTrigger value="roadmap" className="qdaria-tab">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Projected Growth (Target)
                </CardTitle>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="users" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.3} strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Projected Revenue & Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#94a3b8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                    <Bar yAxisId="left" dataKey="revenue" fill="#9AFF00" />
                    <Line yAxisId="right" type="monotone" dataKey="partnerships" stroke="#66FF00" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {milestoneData.map((milestone, index) => (
              <Card key={index} className="qdaria-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: milestone.color }} />
                      {milestone.category}
                    </span>
                    <Badge className="qdaria-badge">
                      {Math.round((milestone.completed / milestone.total) * 100)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress
                      value={(milestone.completed / milestone.total) * 100}
                      className="qdaria-progress h-3"
                    />
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{milestone.completed.toLocaleString()}</span>
                      <span>{milestone.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-cyan-400" />
                  Target Customer Segmentation
                </CardTitle>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building className="w-5 h-5 text-cyan-400" />
                  Target Customer Sectors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Target: Financial Services', 'Target: Manufacturing', 'Target: Healthcare Research', 'Target: Energy Sector'].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <span className="text-white font-medium">{customer}</span>
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50">Prospecting</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Rocket className="w-5 h-5 text-cyan-400" />
                Development Roadmap & Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="qdaria-timeline">
                {roadmapData.map((quarter, index) => (
                  <div key={index} className="qdaria-timeline-item">
                    <div className="qdaria-timeline-marker"></div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">{quarter.quarter}</h3>
                        <Badge className={
                          quarter.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                          quarter.status === 'current' ? 'qdaria-badge' :
                          'bg-slate-500/20 text-slate-300 border-slate-500/50'
                        }>
                          {quarter.status.charAt(0).toUpperCase() + quarter.status.slice(1)}
                        </Badge>
                      </div>
                      <ul className="space-y-1">
                        {quarter.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-cyan-400" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
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

export default TractionSlideClient;