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
    { month: 'Jan', users: 120, revenue: 15000, partnerships: 2 },
    { month: 'Feb', users: 280, revenue: 32000, partnerships: 4 },
    { month: 'Mar', users: 450, revenue: 58000, partnerships: 6 },
    { month: 'Apr', users: 720, revenue: 89000, partnerships: 8 },
    { month: 'May', users: 1100, revenue: 125000, partnerships: 12 },
    { month: 'Jun', users: 1650, revenue: 180000, partnerships: 15 }
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
    { quarter: 'Q1 2024', achievements: ['Beta Launch', 'First Enterprise Client', '€50K ARR'], status: 'completed' },
    { quarter: 'Q2 2024', achievements: ['Series A Funding', '15 Partnerships', '€180K ARR'], status: 'current' },
    { quarter: 'Q3 2024', achievements: ['EU Expansion', '50 Enterprise Clients', '€500K ARR'], status: 'planned' },
    { quarter: 'Q4 2024', achievements: ['US Market Entry', '100 Clients', '€1M ARR'], status: 'planned' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Crisis Validation: Real Enterprise Adoption</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">Proven Market Traction Solving Actual Computing Crises</p>
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
                  Key Customer Wins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Enterprise A (€50K ARR)', 'Tech Corp B (€35K ARR)', 'Manufacturing C (€28K ARR)', 'Financial D (€22K ARR)'].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <span className="text-white font-medium">{customer}</span>
                      <Badge className="qdaria-badge">Active</Badge>
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