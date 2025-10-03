import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/pitch-deck/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, FunnelChart, Funnel, LabelList } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';

const AdvancedChartsSlide: React.FC = () => {
  const violinData = [
    { category: 'Performance', q1: 45, median: 78, q3: 92, outliers: [25, 98] },
    { category: 'Efficiency', q1: 52, median: 85, q3: 94, outliers: [30, 99] },
    { category: 'Scalability', q1: 38, median: 72, q3: 89, outliers: [20, 95] },
    { category: 'Cost', q1: 15, median: 35, q3: 65, outliers: [5, 85] }
  ];

  const ridgeData = [
    { x: 0, y1: 0, y2: 0.1, y3: 0.05, y4: 0.02 },
    { x: 10, y1: 0.2, y2: 0.3, y3: 0.15, y4: 0.08 },
    { x: 20, y1: 0.5, y2: 0.6, y3: 0.4, y4: 0.2 },
    { x: 30, y1: 0.8, y2: 0.9, y3: 0.7, y4: 0.5 },
    { x: 40, y1: 1.0, y2: 0.8, y3: 0.9, y4: 0.8 },
    { x: 50, y1: 0.9, y2: 0.6, y3: 0.8, y4: 0.9 },
    { x: 60, y1: 0.7, y2: 0.4, y3: 0.6, y4: 0.7 },
    { x: 70, y1: 0.4, y2: 0.2, y3: 0.3, y4: 0.4 },
    { x: 80, y1: 0.2, y2: 0.1, y3: 0.1, y4: 0.2 },
    { x: 90, y1: 0.05, y2: 0.02, y3: 0.03, y4: 0.05 },
    { x: 100, y1: 0, y2: 0, y3: 0, y4: 0 }
  ];

  const heatmapData = [
    { sector: 'Finance', q1: 85, q2: 92, q3: 88, q4: 95 },
    { sector: 'Healthcare', q1: 78, q2: 85, q3: 90, q4: 93 },
    { sector: 'Manufacturing', q1: 82, q2: 88, q3: 85, q4: 91 },
    { sector: 'Energy', q1: 75, q2: 82, q3: 87, q4: 89 },
    { sector: 'Logistics', q1: 70, q2: 78, q3: 83, q4: 86 }
  ];

  const funnelData = [
    { stage: 'Market Awareness', value: 10000, fill: '#CCFF00' },
    { stage: 'Interest Generated', value: 7500, fill: '#9AFF00' },
    { stage: 'Consideration', value: 5000, fill: '#66FF00' },
    { stage: 'Intent to Purchase', value: 2500, fill: '#33FF00' },
    { stage: 'Purchase Decision', value: 1200, fill: '#00FF33' }
  ];

  const advancedMetrics = [
    { metric: 'Quantum Coherence', current: 94.5, target: 98.0, variance: 3.2 },
    { metric: 'AI Model Accuracy', current: 96.8, target: 97.5, variance: 1.8 },
    { metric: 'Processing Throughput', current: 850, target: 1000, variance: 12.5 },
    { metric: 'Energy Efficiency', current: 89.2, target: 92.0, variance: 4.1 },
    { metric: 'Error Rate', current: 0.02, target: 0.01, variance: 0.005 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Advanced Analytics Dashboard</h1>
        <p className="text-2xl text-gray-300 mt-4">Sophisticated Data Visualization & Performance Metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-6 h-6 text-[#CCFF00]" />
              Ridge Plot - Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ridgeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="x" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                <Area type="monotone" dataKey="y1" stackId="1" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.3} />
                <Area type="monotone" dataKey="y2" stackId="2" stroke="#9AFF00" fill="#9AFF00" fillOpacity={0.3} />
                <Area type="monotone" dataKey="y3" stackId="3" stroke="#66FF00" fill="#66FF00" fillOpacity={0.3} />
                <Area type="monotone" dataKey="y4" stackId="4" stroke="#33FF00" fill="#33FF00" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieIcon className="w-6 h-6 text-[#CCFF00]" />
              Conversion Funnel Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="center" fill="#0A0A0F" stroke="none" fontSize={12} />
                </Funnel>
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="qdaria-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-6 h-6 text-[#CCFF00]" />
            Advanced Performance Metrics Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="qdaria-table">
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#CCFF00]">Performance Metric</TableHead>
                <TableHead className="text-[#CCFF00]">Current Value</TableHead>
                <TableHead className="text-[#CCFF00]">Target</TableHead>
                <TableHead className="text-[#CCFF00]">Variance</TableHead>
                <TableHead className="text-[#CCFF00]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advancedMetrics.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-300 font-medium">{metric.metric}</TableCell>
                  <TableCell className="text-white font-semibold">{metric.current}</TableCell>
                  <TableCell className="text-white">{metric.target}</TableCell>
                  <TableCell className="text-white">±{metric.variance}</TableCell>
                  <TableCell>
                    <Badge className={metric.current >= metric.target * 0.95 ? "qdaria-badge" : "bg-orange-500/20 text-orange-300 border-orange-500/50"}>
                      {metric.current >= metric.target * 0.95 ? "Optimal" : "Improving"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="qdaria-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-6 h-6 text-[#CCFF00]" />
            Sector Performance Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="sector" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
              <Bar dataKey="q1" fill="#FF6B6B" name="Q1" />
              <Bar dataKey="q2" fill="#FFA500" name="Q2" />
              <Bar dataKey="q3" fill="#9AFF00" name="Q3" />
              <Bar dataKey="q4" fill="#CCFF00" name="Q4" />
              <Line type="monotone" dataKey="q4" stroke="#66FF00" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedChartsSlide;