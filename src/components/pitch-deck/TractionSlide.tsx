import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Progress } from '@/components/pitch-deck/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';
import { TrendingUp, Users, Calendar, Award, Target, Rocket, Building, Globe, Star, CheckCircle } from 'lucide-react';

interface TractionSlideProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const TractionSlide: React.FC<TractionSlideProps> = ({ scenario }) => {
  const [activeTab, setActiveTab] = useState('growth');

  const growthData = [
    { month: 'Q4 2025', users: 0, revenue: 0, partnerships: 2 },
    { month: 'Q1 2026', users: 50, revenue: 15000, partnerships: 2 },
    { month: 'Q2 2026', users: 150, revenue: 45000, partnerships: 3 },
    { month: 'Q3 2026', users: 300, revenue: 95000, partnerships: 4 },
    { month: 'Q4 2026', users: 500, revenue: 180000, partnerships: 5 },
    { month: 'Q1 2027', users: 800, revenue: 320000, partnerships: 6 }
  ];

  const milestoneData = [
    { category: 'Product', completed: 85, total: 100, color: '#CCFF00' },
    { category: 'Partnerships', completed: 12, total: 15, color: '#9AFF00' },
    { category: 'Revenue', completed: 180000, total: 250000, color: '#66FF00' },
    { category: 'Team', completed: 18, total: 25, color: '#00d4ff' }
  ];

  const customerSegments = [
    { name: 'Enterprise', value: 65, color: '#CCFF00' },
    { name: 'Mid-Market', value: 25, color: '#9AFF00' },
    { name: 'Startups', value: 10, color: '#66FF00' }
  ];

  const roadmapData = [
    { quarter: 'Q4 2025', achievements: ['Company Launch', 'Rigetti Partnership Secured', 'Management Events Partnership'], status: 'current' },
    { quarter: 'Q1 2026', achievements: ['Series A Funding', 'First Customer Validation', 'Platform Beta'], status: 'planned' },
    { quarter: 'Q2 2026', achievements: ['QPU Deployment', 'Initial Customer Pilots', '€100K ARR Target'], status: 'planned' },
    { quarter: 'Q4 2026', achievements: ['Nordic Market Entry', '10+ Enterprise Clients Target', '€500K ARR Target'], status: 'planned' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Traction & Milestones</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">Strategic Partnerships & Projected Growth Trajectory</p>
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
                  User Growth Trajectory
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
                  Revenue & Partnerships
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
                    <div className="flex justify-between text-sm text-slate-400 font-light">
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
                  Customer Segmentation
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
                  Strategic Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Rigetti Computing', desc: 'Quantum Hardware (Novera QPU)', status: 'Active' },
                    { name: 'Management Events', desc: 'Executive Access & Network (€15.6M partnership)', status: 'Active' }
                  ].map((partner, index) => (
                    <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{partner.name}</span>
                        <Badge className="qdaria-badge">{partner.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-400 font-light">{partner.desc}</p>
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
                Quarterly Roadmap & Achievements
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
                          'bg-slate-500/20 text-slate-400 font-light border-slate-500/50'
                        }>
                          {quarter.status.charAt(0).toUpperCase() + quarter.status.slice(1)}
                        </Badge>
                      </div>
                      <ul className="space-y-1">
                        {quarter.achievements.map((achievement, i) => (
                          <li key={i} className="text-slate-400 font-light flex items-center gap-2">
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

export default TractionSlide;