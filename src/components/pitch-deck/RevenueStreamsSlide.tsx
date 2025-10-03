import React, { useState } from 'react';
import { Card } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Cpu, Wrench, Brain, BookOpen } from 'lucide-react';

const RevenueStreamsSlide: React.FC<{ scenario?: string }> = ({ scenario = 'base' }) => {
  const [activeTab, setActiveTab] = useState('ai-products');

  const aiProducts = [
    { name: 'Zipminator', revenue: 4.2, growth: 85, customers: 245 },
    { name: 'Qm9', revenue: 3.8, growth: 72, customers: 189 },
    { name: 'QMike', revenue: 5.1, growth: 95, customers: 312 },
    { name: 'QDiana', revenue: 2.9, growth: 68, customers: 156 },
  ];

  const quantumKits = [
    { name: 'Quantum Optics Kit', price: 33757, units: 12, revenue: 405 },
    { name: 'Quantum Cryptography', price: 3894, units: 45, revenue: 175 },
    { name: 'Optical Microscopy', price: 11222, units: 28, revenue: 314 },
    { name: 'AFM Kit', price: 14864, units: 18, revenue: 268 },
  ];

  const services = [
    { service: 'AI Consulting', revenue: 8.5, margin: 65 },
    { service: 'Data Engineering', revenue: 6.2, margin: 72 },
    { service: 'Quantum R&D', revenue: 4.8, margin: 58 },
    { service: 'Training Programs', revenue: 2.1, margin: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 qdaria-gradient-text">
          Revenue Streams: €47M Portfolio
        </h1>
        <p className="text-xl text-slate-400 font-light">
          Diversified revenue across AI products, quantum equipment, and premium services
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-3">
          <TabsTrigger value="ai-products" className="qdaria-tab">
            <Brain className="w-4 h-4 mr-2" />
            AI Products
          </TabsTrigger>
          <TabsTrigger value="quantum-kits" className="qdaria-tab">
            <Cpu className="w-4 h-4 mr-2" />
            Quantum Kits
          </TabsTrigger>
          <TabsTrigger value="services" className="qdaria-tab">
            <Wrench className="w-4 h-4 mr-2" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-products" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">AI Product Performance</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={aiProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                <Bar dataKey="revenue" fill="#CCFF00" name="Revenue (€M)" />
                <Bar dataKey="growth" fill="#FF6B6B" name="Growth %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="quantum-kits" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quantum Equipment Rental Revenue</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={quantumKits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                <Bar dataKey="revenue" fill="#66FF00" name="Revenue (€K)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="qdaria-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Service Revenue & Margins</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={services}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="service" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00' }} />
                <Bar dataKey="revenue" fill="#9AFF00" name="Revenue (€M)" />
                <Bar dataKey="margin" fill="#FFFF33" name="Margin %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueStreamsSlide;