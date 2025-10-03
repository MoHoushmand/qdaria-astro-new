import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/pitch-deck/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { Zap, Shield, Cloud, Cpu, Brain, Rocket, Target, TrendingUp, Users, Globe } from 'lucide-react';

const EnhancedSolutionSlide: React.FC = () => {
  const performanceData = [
    { metric: 'Processing Speed', traditional: 100, qdaria: 850, improvement: '750%' },
    { metric: 'Accuracy', traditional: 78, qdaria: 96, improvement: '23%' },
    { metric: 'Cost Efficiency', traditional: 25, qdaria: 92, improvement: '268%' },
    { metric: 'Scalability', traditional: 35, qdaria: 95, improvement: '171%' },
    { metric: 'Integration Time', traditional: 180, qdaria: 15, improvement: '92% reduction' }
  ];

  const architectureData = [
    { component: 'Quantum Layer', utilization: 85, efficiency: 94, status: 'Optimized' },
    { component: 'AI Engine', utilization: 92, efficiency: 89, status: 'Active' },
    { component: 'Cloud Interface', utilization: 78, efficiency: 96, status: 'Scaling' },
    { component: 'Security Module', utilization: 88, efficiency: 98, status: 'Protected' },
    { component: 'Analytics Core', utilization: 95, efficiency: 91, status: 'Processing' }
  ];

  const adoptionData = [
    { phase: 'Q1 2024', enterprises: 5, satisfaction: 98, revenue: 0.8 },
    { phase: 'Q2 2024', enterprises: 15, satisfaction: 97, revenue: 2.4 },
    { phase: 'Q3 2024', enterprises: 35, satisfaction: 96, revenue: 5.8 },
    { phase: 'Q4 2024', enterprises: 65, satisfaction: 98, revenue: 12.5 },
    { phase: 'Q1 2025', enterprises: 120, satisfaction: 99, revenue: 24.8 }
  ];

  const solutionPillars = [
    { name: 'Quantum Core', value: 35, color: '#CCFF00' },
    { name: 'AI Engine', value: 30, color: '#9AFF00' },
    { name: 'Cloud Platform', value: 20, color: '#66FF00' },
    { name: 'Security Layer', value: 15, color: '#33FF00' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Breaking Through the Crisis: Quantum+AI Breakthrough</h1>
        <p className="text-2xl text-gray-300 mt-4">
          10x Performance Gains When Traditional Computing Fails
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Rocket className="w-5 h-5 mr-2" />
            Production Ready
          </Badge>
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Shield className="w-5 h-5 mr-2" />
            Enterprise Grade
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="architecture" className="qdaria-tab">Architecture</TabsTrigger>
          <TabsTrigger value="performance" className="qdaria-tab">Performance</TabsTrigger>
          <TabsTrigger value="adoption" className="qdaria-tab">Adoption</TabsTrigger>
          <TabsTrigger value="benefits" className="qdaria-tab">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <img src="/Zipminator.svg" alt="Zipminator" className="w-6 h-6 qdaria-icon-primary" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={solutionPillars}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {solutionPillars.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-6 h-6 text-[#CCFF00]" />
                  Component Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#CCFF00]">Component</TableHead>
                      <TableHead className="text-[#CCFF00]">Utilization</TableHead>
                      <TableHead className="text-[#CCFF00]">Efficiency</TableHead>
                      <TableHead className="text-[#CCFF00]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {architectureData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-gray-300 font-medium">{item.component}</TableCell>
                        <TableCell className="text-white">{item.utilization}%</TableCell>
                        <TableCell className="text-white">{item.efficiency}%</TableCell>
                        <TableCell>
                          <Badge className="qdaria-badge">{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-6 h-6 text-[#CCFF00]" />
                Performance Benchmarks vs Traditional Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="metric" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                  <Bar dataKey="traditional" fill="#FF6B6B" name="Traditional" />
                  <Bar dataKey="qdaria" fill="#CCFF00" name="QDaria" />
                  <Line type="monotone" dataKey="qdaria" stroke="#66FF00" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adoption" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-6 h-6 text-[#CCFF00]" />
                Enterprise Adoption & Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="phase" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                  <Area yAxisId="left" type="monotone" dataKey="enterprises" fill="url(#enterpriseGradient)" stroke="#CCFF00" strokeWidth={2} />
                  <Bar yAxisId="right" dataKey="satisfaction" fill="#9AFF00" opacity={0.7} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#66FF00" strokeWidth={3} />
                  <defs>
                    <linearGradient id="enterpriseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-6 h-6 text-[#CCFF00]" />
                  Quantum Advantage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">850%</div>
                  <p className="text-gray-300">Faster Processing</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">96%</div>
                  <p className="text-gray-300">Accuracy Rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Cloud className="w-6 h-6 text-[#CCFF00]" />
                  Cloud Native
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">15 min</div>
                  <p className="text-gray-300">Integration Time</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">99.9%</div>
                  <p className="text-gray-300">Uptime SLA</p>
                </div>
              </CardContent>
            </Card>

            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="w-6 h-6 text-[#CCFF00]" />
                  Global Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">120+</div>
                  <p className="text-gray-300">Enterprise Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CCFF00] mb-2">€24.8M</div>
                  <p className="text-gray-300">Q1 2025 Revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSolutionSlide;