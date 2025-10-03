import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Target, Zap, Award, Activity, Cpu, Building2 } from 'lucide-react';

const FinancialsSlideClient: React.FC = () => {
  const [scenario, setScenario] = useState('base');

  // Enhanced revenue projections with Novera QPU and Management Events ROI
  const revenueProjections = {
    conservative: [
      { year: '2024', revenue: 2.8, costs: 2.2, profit: 0.6, customers: 25, arr: 112, noveraInvestment: 1.2, managementEventsROI: 0 },
      { year: '2025', revenue: 6.2, costs: 3.8, profit: 2.4, customers: 52, arr: 248, noveraInvestment: 0.8, managementEventsROI: 1.5 },
      { year: '2026', revenue: 14.8, costs: 7.2, profit: 7.6, customers: 118, arr: 592, noveraInvestment: 0.5, managementEventsROI: 3.2 },
      { year: '2027', revenue: 32.5, costs: 13.8, profit: 18.7, customers: 245, arr: 1300, noveraInvestment: 1.0, managementEventsROI: 5.8 },
      { year: '2028', revenue: 68.2, costs: 24.8, profit: 43.4, customers: 482, arr: 2728, noveraInvestment: 1.5, managementEventsROI: 8.5 }
    ],
    base: [
      { year: '2024', revenue: 3.6, costs: 2.5, profit: 1.1, customers: 32, arr: 144, noveraInvestment: 1.2, managementEventsROI: 0.4 },
      { year: '2025', revenue: 9.8, costs: 4.8, profit: 5.0, customers: 85, arr: 392, noveraInvestment: 0.8, managementEventsROI: 2.8 },
      { year: '2026', revenue: 26.1, costs: 11.2, profit: 14.9, customers: 221, arr: 1044, noveraInvestment: 0.5, managementEventsROI: 6.2 },
      { year: '2027', revenue: 65.8, costs: 24.8, profit: 41.0, customers: 528, arr: 2632, noveraInvestment: 1.0, managementEventsROI: 12.5 },
      { year: '2028', revenue: 148.5, costs: 52.2, profit: 96.3, customers: 1185, arr: 5940, noveraInvestment: 1.5, managementEventsROI: 22.8 }
    ],
    upside: [
      { year: '2024', revenue: 4.8, costs: 3.0, profit: 1.8, customers: 41, arr: 192, noveraInvestment: 1.2, managementEventsROI: 0.8 },
      { year: '2025', revenue: 15.8, costs: 6.8, profit: 9.0, customers: 128, arr: 632, noveraInvestment: 0.8, managementEventsROI: 4.5 },
      { year: '2026', revenue: 48.5, costs: 18.2, profit: 30.3, customers: 385, arr: 1940, noveraInvestment: 2.0, managementEventsROI: 12.8 },
      { year: '2027', revenue: 125.2, costs: 42.8, profit: 82.4, customers: 952, arr: 5008, noveraInvestment: 3.0, managementEventsROI: 28.5 },
      { year: '2028', revenue: 285.8, costs: 98.2, profit: 187.6, customers: 2258, arr: 11432, noveraInvestment: 4.5, managementEventsROI: 52.8 }
    ]
  };

  const unitEconomics = [
    { metric: 'Customer Acquisition Cost (CAC)', value: '€10,800', benchmark: '€15,000', status: 'excellent' },
    { metric: 'Customer Lifetime Value (LTV)', value: '€158,000', benchmark: '€90,000', status: 'excellent' },
    { metric: 'LTV/CAC Ratio', value: '14.6:1', benchmark: '6:1', status: 'excellent' },
    { metric: 'Payback Period', value: '6.2 months', benchmark: '12 months', status: 'excellent' },
    { metric: 'Gross Margin (w/ Novera Premium)', value: '92%', benchmark: '70%', status: 'excellent' },
    { metric: 'Net Revenue Retention', value: '165%', benchmark: '110%', status: 'excellent' }
  ];

  const cashFlowData = [
    { quarter: 'Q1 24', operating: -0.8, investing: -2.1, financing: 5.2, net: 2.3 },
    { quarter: 'Q2 24', operating: -0.5, investing: -0.8, financing: 0.0, net: -1.3 },
    { quarter: 'Q3 24', operating: 0.2, investing: -1.2, financing: 0.0, net: -1.0 },
    { quarter: 'Q4 24', operating: 0.8, investing: -0.5, financing: 0.0, net: 0.3 },
    { quarter: 'Q1 25', operating: 1.5, investing: -0.8, financing: 8.5, net: 9.2 },
    { quarter: 'Q2 25', operating: 2.2, investing: -1.2, financing: 0.0, net: 1.0 }
  ];

  const fundingRounds = [
    { round: 'Pre-Seed', amount: 1.2, valuation: 8, investors: 'Angel Investors', date: '2023' },
    { round: 'Seed', amount: 5.2, valuation: 25, investors: 'Tier 1 VCs', date: '2024' },
    { round: 'Series A', amount: 15.0, valuation: 85, investors: 'Growth VCs', date: '2025' },
    { round: 'Series B', amount: 35.0, valuation: 250, investors: 'Strategic + VCs', date: '2026' }
  ];

  const keyMetrics = [
    { name: 'TAM', value: '€850B', growth: '+12%', icon: Target },
    { name: 'SAM', value: '€120B', growth: '+18%', icon: TrendingUp },
    { name: 'SOM (w/ QPU)', value: '€15.2B', growth: '+35%', icon: DollarSign },
    { name: 'Break-even', value: '2025', growth: 'Q4', icon: Award },
    { name: 'Novera ROI', value: '890%', growth: '5-year', icon: Cpu },
    { name: 'Mgmt Events ROI', value: '20,208%', growth: 'Lifetime', icon: Building2 }
  ];

  const currentData = revenueProjections[scenario as keyof typeof revenueProjections];

  const revenueBreakdown = currentData.map(item => ({
    ...item,
    subscription: item.revenue * 0.75,
    professional: item.revenue * 0.20,
    enterprise: item.revenue * 0.05
  }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Financial Projections</h1>
        <p className="text-2xl text-gray-300 mt-4">€148M ARR by 2028 • Novera QPU Strategy • Management Events ROI</p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="bg-[#CCFF00] text-black border-2 border-[#CCFF00] text-lg px-4 py-2 font-bold shadow-lg">
            <TrendingUp className="w-5 h-5 mr-2" />185% YoY Growth
          </Badge>
          <Badge className="bg-[#66FF00] text-black border-2 border-[#66FF00] text-lg px-4 py-2 font-bold shadow-lg">
            <DollarSign className="w-5 h-5 mr-2" />10:1 LTV/CAC
          </Badge>
          <Badge className="bg-[#9AFF00] text-black border-2 border-[#9AFF00] text-lg px-4 py-2 font-bold shadow-lg">
            <Award className="w-5 h-5 mr-2" />€148M ARR
          </Badge>
        </div>
      </div>

      {/* Key Financial Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {keyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="qdaria-chart-container p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.name}</p>
                  <p className="text-2xl font-bold text-[#CCFF00]">{metric.value}</p>
                  <p className="text-sm text-[#9AFF00] font-semibold">{metric.growth}</p>
                </div>
                <IconComponent className="w-8 h-8 text-[#00d4ff]" />
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs value={scenario} onValueChange={setScenario} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-3">
          <TabsTrigger value="conservative" className="qdaria-tab">Conservative</TabsTrigger>
          <TabsTrigger value="base" className="qdaria-tab">Base Case</TabsTrigger>
          <TabsTrigger value="upside" className="qdaria-tab">Upside</TabsTrigger>
        </TabsList>

        <TabsContent value={scenario} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <TrendingUp className="w-6 h-6" />
                  Revenue & Profitability
                </CardTitle>
                <CardDescription className="qdaria-chart-description">{scenario.charAt(0).toUpperCase() + scenario.slice(1)} Scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="revenue" fill="url(#revenueGradient)" stroke="#CCFF00" strokeWidth={3} />
                    <Bar dataKey="costs" fill="#00d4ff" opacity={0.6} />
                    <Line type="monotone" dataKey="profit" stroke="#66FF00" strokeWidth={4} dot={{ fill: '#66FF00', strokeWidth: 3, r: 8 }} />
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.9}/>
                        <stop offset="50%" stopColor="#9AFF00" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="#66FF00" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <DollarSign className="w-6 h-6" />
                  Unit Economics
                </CardTitle>
                <CardDescription className="qdaria-chart-description">Key Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="qdaria-data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>QDaria</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unitEconomics.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.metric}</TableCell>
                        <TableCell className="font-semibold text-[#CCFF00]">{item.value}</TableCell>
                        <TableCell>{item.benchmark}</TableCell>
                        <TableCell>
                          <Badge className={item.status === 'excellent' ? 'bg-[#66FF00] text-black border-2 border-[#66FF00] shadow-lg' : 'bg-[#9AFF00] text-black border-2 border-[#9AFF00] shadow-lg'}>
                            {item.status === 'excellent' ? 'Excellent' : 'Good'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown Chart */}
          <div className="mb-6">
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Zap className="w-6 h-6" />
                  Revenue Composition by Product Tier
                </CardTitle>
                <CardDescription className="qdaria-chart-description">
                  Subscription (75%) • Professional Services (20%) • Enterprise (5%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={revenueBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="subscription" stackId="1" fill="#CCFF00" fillOpacity={0.8} stroke="#CCFF00" strokeWidth={2} />
                    <Area type="monotone" dataKey="professional" stackId="1" fill="#9AFF00" fillOpacity={0.7} stroke="#9AFF00" strokeWidth={2} />
                    <Area type="monotone" dataKey="enterprise" stackId="1" fill="#66FF00" fillOpacity={0.6} stroke="#66FF00" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={4} dot={{ fill: '#00d4ff', strokeWidth: 3, r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Activity className="w-6 h-6" />
                  Cash Flow Analysis
                </CardTitle>
                <CardDescription className="qdaria-chart-description">Quarterly Cash Flow Breakdown (€M)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="quarter" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                    <Bar dataKey="operating" fill="#CCFF00" opacity={0.8} />
                    <Bar dataKey="investing" fill="#00d4ff" opacity={0.8} />
                    <Bar dataKey="financing" fill="#66FF00" opacity={0.8} />
                    <Line type="monotone" dataKey="net" stroke="#9AFF00" strokeWidth={4} dot={{ fill: '#9AFF00', strokeWidth: 3, r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="qdaria-chart-container">
              <CardHeader>
                <CardTitle className="qdaria-chart-title">
                  <Target className="w-6 h-6" />
                  Funding Roadmap
                </CardTitle>
                <CardDescription className="qdaria-chart-description">Capital Raising Strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="qdaria-data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Round</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Valuation</TableHead>
                      <TableHead>Timeline</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fundingRounds.map((round, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{round.round}</TableCell>
                        <TableCell className="text-[#CCFF00] font-bold">€{round.amount}M</TableCell>
                        <TableCell className="text-[#66FF00] font-bold">€{round.valuation}M</TableCell>
                        <TableCell className="text-[#9AFF00] font-semibold">{round.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialsSlideClient;