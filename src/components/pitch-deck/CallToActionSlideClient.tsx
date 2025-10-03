import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Euro, Calendar, Target, Mail, Phone, Handshake } from 'lucide-react';

interface CallToActionSlideClientProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const CallToActionSlideClient: React.FC<CallToActionSlideClientProps> = ({ scenario }) => {
  const fundingUse = [
    { name: 'R&D & Product', value: 40, amount: 4.8, color: '#3b82f6' },
    { name: 'Sales & Marketing', value: 30, amount: 3.6, color: '#10b981' },
    { name: 'Team Expansion', value: 20, amount: 2.4, color: '#8b5cf6' },
    { name: 'Operations', value: 10, amount: 1.2, color: '#f59e0b' },
  ];

  const timeline = [
    { phase: 'Due Diligence', duration: 4, start: 0 },
    { phase: 'Term Sheet', duration: 2, start: 4 },
    { phase: 'Legal & Closing', duration: 6, start: 6 },
  ];

  const nextSteps = [
    { action: 'Schedule follow-up meeting', timeline: 'Within 1 week', status: 'immediate' },
    { action: 'Technical deep dive session', timeline: '2-3 weeks', status: 'scheduled' },
    { action: 'Customer reference calls', timeline: '3-4 weeks', status: 'planned' },
    { action: 'Final investment decision', timeline: '6-8 weeks', status: 'target' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">
          Join the Crisis Solution: €12M to Lead Computing Revolution
        </h1>
        <p className="text-2xl text-gray-300 mt-4">
          Investment Opportunity in Enterprise Computing Transformation
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-cyan-400 to-orange-400 text-white">
            <Euro className="w-5 h-5 mr-2" />
            €12M Series A
          </Badge>
          <Badge className="text-lg px-4 py-2 border border-cyan-400/30 bg-slate-800/50 text-cyan-400">
            <Target className="w-5 h-5 mr-2" />
            18-month runway
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Euro className="w-6 h-6 text-cyan-400" />
              Use of Funds
            </CardTitle>
            <CardDescription className="text-gray-300">
              Strategic allocation for maximum growth impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fundingUse}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fundingUse.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#00d4ff', '#ff6b35', '#10b981', '#f59e0b'][index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0E1A',
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                  formatter={(value, name) => [`${value}% (€${fundingUse.find(f => f.name === name)?.amount}M)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {fundingUse.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#00d4ff', '#ff6b35', '#10b981', '#f59e0b'][index] }}></div>
                  <span>{item.name}: €{item.amount}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-6 h-6 text-green-400" />
              Investment Timeline
            </CardTitle>
            <CardDescription className="text-gray-300">
              Path to closing within 12 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timeline} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" domain={[0, 12]} stroke="#94a3b8" />
                <YAxis dataKey="phase" type="category" width={100} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0E1A',
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                  formatter={(value) => [`${value} weeks`, 'Duration']}
                />
                <Bar dataKey="duration" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm text-gray-300">
                  <span className="font-medium">{item.phase}</span>
                  <Badge className="border border-cyan-400/30 bg-slate-800/50 text-cyan-400">{item.duration} weeks</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="qdaria-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Handshake className="w-6 h-6 text-purple-400" />
            Next Steps & Engagement
          </CardTitle>
          <CardDescription className="text-gray-300">
            Clear path forward for partnership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-cyan-400/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{step.action}</div>
                    <div className="text-sm text-gray-400">{step.timeline}</div>
                  </div>
                  <Badge className={
                    step.status === 'immediate' ? 'bg-gradient-to-r from-cyan-400 to-orange-400 text-white' :
                    step.status === 'scheduled' ? 'bg-slate-700 text-gray-300' : 'border border-cyan-400/30 bg-slate-800/50 text-cyan-400'
                  }>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-center p-6 rounded-lg bg-slate-800/50 border border-cyan-400/20">
                <h3 className="font-bold text-lg mb-4 text-white">Contact Information</h3>
                <div className="space-y-3">
                  <Button className="w-full qdaria-button">
                    <Mail className="w-4 h-4 mr-2" />
                    founders@qdaria.com
                  </Button>
                  <Button className="w-full border border-cyan-400/30 bg-slate-800/50 text-cyan-400 hover:bg-cyan-400/10">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button className="w-full border border-cyan-400/30 bg-slate-800/50 text-cyan-400 hover:bg-cyan-400/10">
                    <Target className="w-4 h-4 mr-2" />
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center bg-gradient-to-r from-cyan-400/20 to-orange-400/20 border border-cyan-400/30 text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 qdaria-gradient-text">Transform Your Enterprise with Quantum+AI</h2>
        <p className="text-xl mb-6 text-gray-300">
          Join leading enterprises in Norway and Germany who are already exploring QDaria's platform
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="qdaria-button">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Deep Dive
          </Button>
          <Button
            size="lg"
            className="border-2 border-[#CCFF00] bg-slate-800/50 text-[#CCFF00] hover:bg-[#CCFF00]/10"
            onClick={() => window.print()}
          >
            <Mail className="w-5 h-5 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSlideClient;