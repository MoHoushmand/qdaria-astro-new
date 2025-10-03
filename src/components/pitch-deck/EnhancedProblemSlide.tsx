import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import ChartTab from './ChartTab';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart, FunnelChart, Funnel, Cell, ScatterChart, Scatter } from 'recharts';
import { AlertTriangle, Clock, DollarSign, TrendingDown, Zap, Users, Target, Building } from 'lucide-react';

const EnhancedProblemSlide: React.FC = () => {
  const performanceData = [
    { system: 'Classical Computing', processing: 45, accuracy: 78, cost: 85, scalability: 35 },
    { system: 'Current AI Solutions', processing: 65, accuracy: 82, scalability: 55, cost: 70 },
    { system: 'Quantum-Classical Hybrid', processing: 85, accuracy: 88, scalability: 45, cost: 90 },
    { system: 'QDaria Solution', processing: 95, accuracy: 96, scalability: 90, cost: 25 }
  ];

  const costTrendsData = [
    { year: '2020', traditional: 100, maintenance: 120, inefficiency: 85, quantum: 200 },
    { year: '2022', traditional: 135, maintenance: 175, inefficiency: 130, quantum: 180 },
    { year: '2024', traditional: 185, maintenance: 250, inefficiency: 195, quantum: 160 },
    { year: '2026', traditional: 245, maintenance: 320, inefficiency: 260, quantum: 140 },
    { year: '2028', traditional: 315, maintenance: 410, inefficiency: 340, quantum: 120 },
    { year: '2030', traditional: 400, maintenance: 520, inefficiency: 440, quantum: 100 },
    { year: '2032', traditional: 510, maintenance: 660, inefficiency: 570, quantum: 85 },
    { year: '2034', traditional: 650, maintenance: 840, inefficiency: 730, quantum: 70 },
    { year: '2035', traditional: 740, maintenance: 960, inefficiency: 840, quantum: 60 }
  ];

  const painPointsData = [
    { issue: 'Processing Bottlenecks', severity: 92, impact: 2.5, companies: 78, urgency: 'Critical' },
    { issue: 'Scalability Limits', severity: 88, impact: 1.8, companies: 65, urgency: 'High' },
    { issue: 'Integration Complexity', severity: 85, impact: 3.2, companies: 82, urgency: 'Critical' },
    { issue: 'Maintenance Overhead', severity: 79, impact: 1.5, companies: 71, urgency: 'Medium' },
    { issue: 'Talent Shortage', severity: 94, impact: 4.1, companies: 89, urgency: 'Critical' }
  ];

  const industryImpactData = [
    { sector: 'Financial Services', affected: 95, losses: 12.5, urgency: 'Critical', employees: 2.5, growth: -15 },
    { sector: 'Healthcare', affected: 88, losses: 8.3, urgency: 'High', employees: 1.8, growth: -8 },
    { sector: 'Manufacturing', affected: 82, losses: 15.2, urgency: 'Critical', employees: 3.2, growth: -22 },
    { sector: 'Logistics', affected: 76, losses: 6.8, urgency: 'Medium', employees: 1.4, growth: -5 },
    { sector: 'Energy', affected: 91, losses: 18.7, urgency: 'Critical', employees: 2.8, growth: -18 }
  ];

  const radarData = [
    { subject: 'Speed', classical: 45, current: 65, qdaria: 95 },
    { subject: 'Accuracy', classical: 78, current: 82, qdaria: 96 },
    { subject: 'Scalability', classical: 35, current: 55, qdaria: 90 },
    { subject: 'Cost Efficiency', classical: 15, current: 30, qdaria: 75 },
    { subject: 'Integration', classical: 40, current: 60, qdaria: 88 },
    { subject: 'Reliability', classical: 70, current: 75, qdaria: 92 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">The Enterprise Computing Crisis</h1>
        <p className="text-2xl text-gray-300 mt-4">€47B+ Annual Losses from Computational Inefficiencies</p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <AlertTriangle className="w-5 h-5 mr-2" />Critical Impact
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="performance" className="qdaria-tab">Performance Gap</TabsTrigger>
          <TabsTrigger value="costs" className="qdaria-tab">Cost Escalation</TabsTrigger>
          <TabsTrigger value="painpoints" className="qdaria-tab">Pain Points</TabsTrigger>
          <TabsTrigger value="impact" className="qdaria-tab">Industry Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <ChartTab 
            title="Performance Comparison Analysis" 
            icon={<Target className="w-6 h-6" />}
            data={performanceData}
            dataColumns={[
              { key: 'system', label: 'System Type' },
              { key: 'processing', label: 'Processing Score' },
              { key: 'accuracy', label: 'Accuracy %' },
              { key: 'scalability', label: 'Scalability Score' },
              { key: 'cost', label: 'Cost Efficiency' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0, 212, 255, 0.3)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 14 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar name="Classical" dataKey="classical" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Current AI" dataKey="current" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="QDaria" dataKey="qdaria" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.2} strokeWidth={3} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="costs">
          <ChartTab 
            title="Cost Escalation Trends (2020-2035)" 
            icon={<DollarSign className="w-6 h-6" />}
            data={costTrendsData}
            dataColumns={[
              { key: 'year', label: 'Year' },
              { key: 'traditional', label: 'Traditional Systems' },
              { key: 'maintenance', label: 'Maintenance Costs' },
              { key: 'inefficiency', label: 'Inefficiency Losses' },
              { key: 'quantum', label: 'Quantum Solutions' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={costTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="inefficiency" fill="url(#inefficiencyGradient)" stroke="#ef4444" strokeWidth={2} />
                <Bar dataKey="maintenance" fill="#f59e0b" opacity={0.7} />
                <Line type="monotone" dataKey="traditional" stroke="#fbbf24" strokeWidth={3} dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="quantum" stroke="#00d4ff" strokeWidth={4} dot={{ fill: '#00d4ff', strokeWidth: 2, r: 6 }} />
                <defs>
                  <linearGradient id="inefficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="painpoints">
          <ChartTab 
            title="Critical Pain Points Analysis" 
            icon={<AlertTriangle className="w-6 h-6" />}
            data={painPointsData}
            dataColumns={[
              { key: 'issue', label: 'Issue' },
              { key: 'severity', label: 'Severity %' },
              { key: 'impact', label: 'Annual Impact (€M)' },
              { key: 'companies', label: 'Companies Affected %' },
              { key: 'urgency', label: 'Urgency Level' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={painPointsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="issue" type="category" stroke="#94a3b8" width={150} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="severity" fill="url(#severityGradient)" radius={[0, 4, 4, 0]} />
                <defs>
                  <linearGradient id="severityGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="impact">
          <ChartTab 
            title="Industry Impact Analysis" 
            icon={<Building className="w-6 h-6" />}
            data={industryImpactData}
            dataColumns={[
              { key: 'sector', label: 'Industry Sector' },
              { key: 'affected', label: 'Companies Affected %' },
              { key: 'losses', label: 'Annual Losses (€B)' },
              { key: 'employees', label: 'Employees Impacted (M)' },
              { key: 'growth', label: 'Growth Impact %' },
              { key: 'urgency', label: 'Urgency Level' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={industryImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis dataKey="affected" stroke="#94a3b8" name="Affected %" />
                <YAxis dataKey="losses" stroke="#94a3b8" name="Losses (€B)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }}
                  formatter={(value, name) => [value, name === 'affected' ? 'Companies Affected %' : 'Annual Losses €B']}
                />
                <Scatter name="Industry Impact" dataKey="losses" fill="#00d4ff">
                  {industryImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.urgency === 'Critical' ? '#ef4444' :
                      entry.urgency === 'High' ? '#f59e0b' : '#10b981'
                    } />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedProblemSlide;