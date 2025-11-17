import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import ChartTab from './ChartTab';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, RadialBarChart, RadialBar } from 'recharts';
import { DollarSign, Users, Zap, Target, TrendingUp, Building, Layers } from 'lucide-react';

const EnhancedBusinessModelSlide: React.FC = () => {
  const customerSegments = [
    { segment: 'Enterprise AI Labs', ltv: 2500000, cac: 125000, ratio: 20, count: 45, revenue: 112500000 },
    { segment: 'Financial Institutions', ltv: 1800000, cac: 90000, ratio: 20, count: 78, revenue: 140400000 },
    { segment: 'Healthcare Systems', ltv: 2200000, cac: 110000, ratio: 20, count: 32, revenue: 70400000 },
    { segment: 'Manufacturing Giants', ltv: 3200000, cac: 160000, ratio: 20, count: 28, revenue: 89600000 },
    { segment: 'Research Institutions', ltv: 1200000, cac: 60000, ratio: 20, count: 65, revenue: 78000000 }
  ];

  const revenueStreams = [
    { stream: 'SaaS Subscriptions', value: 45, revenue: 225000000, growth: 35 },
    { stream: 'Enterprise Licenses', value: 30, revenue: 150000000, growth: 28 },
    { stream: 'Professional Services', value: 15, revenue: 75000000, growth: 42 },
    { stream: 'Training & Certification', value: 10, revenue: 50000000, growth: 55 }
  ];

  const valueProposition = [
    { metric: 'Processing Speed', improvement: 1000, unit: '% faster' },
    { metric: 'Cost Reduction', improvement: 75, unit: '% savings' },
    { metric: 'Accuracy Gain', improvement: 40, unit: '% better' },
    { metric: 'Time to Market', improvement: 80, unit: '% faster' },
    { metric: 'Scalability', improvement: 500, unit: '% more' },
    { metric: 'Integration Time', improvement: 90, unit: '% reduction' }
  ];

  const marketSize = [
    { year: '2024', tam: 125, sam: 45, som: 12 },
    { year: '2025', tam: 165, sam: 62, som: 18 },
    { year: '2026', tam: 220, sam: 85, som: 28 },
    { year: '2027', tam: 295, sam: 118, som: 42 },
    { year: '2028', tam: 385, sam: 162, som: 65 },
    { year: '2029', tam: 495, sam: 220, som: 95 }
  ];

  const COLORS = ['#00d4ff', '#66b3ff', '#0099cc', '#33ccff', '#4dd0e1'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Crisis Monetization: €500M ARR from Computing Revolution</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">Business Model Built for Post-Classical Computing Era</p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <DollarSign className="w-5 h-5 mr-2" />€500M ARR Target
          </Badge>
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <TrendingUp className="w-5 h-5 mr-2" />45% Growth Rate
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="segments" className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="segments" className="qdaria-tab">Customer Segments</TabsTrigger>
          <TabsTrigger value="revenue" className="qdaria-tab">Revenue Streams</TabsTrigger>
          <TabsTrigger value="value" className="qdaria-tab">Value Proposition</TabsTrigger>
          <TabsTrigger value="market" className="qdaria-tab">Market Sizing</TabsTrigger>
        </TabsList>

        <TabsContent value="segments">
          <ChartTab 
            title="Customer Segments: LTV vs CAC Analysis" 
            icon={<Users className="w-6 h-6" />}
            data={customerSegments}
            dataColumns={[
              { key: 'segment', label: 'Customer Segment' },
              { key: 'ltv', label: 'Lifetime Value (€)' },
              { key: 'cac', label: 'Customer Acquisition Cost (€)' },
              { key: 'ratio', label: 'LTV:CAC Ratio' },
              { key: 'count', label: 'Current Customers' },
              { key: 'revenue', label: 'Annual Revenue (€)' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={customerSegments}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis dataKey="segment" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="ltv" fill="#00d4ff" name="Lifetime Value (€)" />
                <Bar yAxisId="left" dataKey="cac" fill="#66b3ff" name="Acquisition Cost (€)" />
                <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="#33ccff" strokeWidth={3} name="LTV:CAC Ratio" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="revenue">
          <ChartTab 
            title="Revenue Stream Distribution & Growth" 
            icon={<DollarSign className="w-6 h-6" />}
            data={revenueStreams}
            dataColumns={[
              { key: 'stream', label: 'Revenue Stream' },
              { key: 'value', label: 'Share %' },
              { key: 'revenue', label: 'Annual Revenue (€)' },
              { key: 'growth', label: 'Growth Rate %' }
            ]}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={revenueStreams}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ stream, value }) => `${stream}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#00d4ff"
                    strokeWidth={2}
                  >
                    {revenueStreams.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueStreams}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                  <XAxis dataKey="stream" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                  <Bar dataKey="growth" fill="url(#growthGradient)" />
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#66b3ff" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartTab>
        </TabsContent>

        <TabsContent value="value">
          <ChartTab 
            title="Value Proposition Metrics" 
            icon={<Zap className="w-6 h-6" />}
            data={valueProposition}
            dataColumns={[
              { key: 'metric', label: 'Performance Metric' },
              { key: 'improvement', label: 'Improvement Value' },
              { key: 'unit', label: 'Unit of Measure' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={valueProposition}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#e2e8f0' }}
                  background
                  clockWise
                  dataKey="improvement"
                  fill="url(#radialGradient)"
                />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <defs>
                  <linearGradient id="radialGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#66b3ff" />
                  </linearGradient>
                </defs>
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="market">
          <ChartTab 
            title="Total Addressable Market Evolution" 
            icon={<Target className="w-6 h-6" />}
            data={marketSize}
            dataColumns={[
              { key: 'year', label: 'Year' },
              { key: 'tam', label: 'TAM (€B)' },
              { key: 'sam', label: 'SAM (€B)' },
              { key: 'som', label: 'SOM (€B)' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={marketSize}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <Legend />
                <Area type="monotone" dataKey="tam" stackId="1" stroke="#0099cc" fill="#0099cc" fillOpacity={0.3} name="Total Addressable Market" />
                <Area type="monotone" dataKey="sam" stackId="2" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.5} name="Serviceable Addressable Market" />
                <Area type="monotone" dataKey="som" stackId="3" stroke="#66b3ff" fill="#66b3ff" fillOpacity={0.8} name="Serviceable Obtainable Market" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedBusinessModelSlide;