import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Button } from '@/components/pitch-deck/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import { Bot, Shield, Calculator, GraduationCap, Zap, TrendingUp } from 'lucide-react';

interface ProductPortfolioSlideProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const ProductPortfolioSlide: React.FC<ProductPortfolioSlideProps> = ({ scenario }) => {
  const [activeProduct, setActiveProduct] = useState('zipminator');

  const products = {
    zipminator: {
      name: 'Zipminator',
      icon: Shield,
      description: 'Post-Quantum Cryptography & Security',
      market: 'Cybersecurity',
      revenue: { base: 15, upside: 22, conservative: 12 },
      growth: { base: 45, upside: 65, conservative: 25 },
      customers: 150
    },
    qm9: {
      name: 'Qm9',
      icon: Calculator,
      description: 'Quantum FinTech & Trading',
      market: 'Financial Services',
      revenue: { base: 18, upside: 28, conservative: 14 },
      growth: { base: 55, upside: 75, conservative: 35 },
      customers: 85
    },
    qmike: {
      name: 'QMike',
      icon: Zap,
      description: 'HPC & Quantum Reservoir Computing',
      market: 'Engineering & Research',
      revenue: { base: 12, upside: 18, conservative: 9 },
      growth: { base: 40, upside: 60, conservative: 20 },
      customers: 200
    },
    qdiana: {
      name: 'QDiana',
      icon: GraduationCap,
      description: 'Quantum Education Platform',
      market: 'Education',
      revenue: { base: 8, upside: 12, conservative: 6 },
      growth: { base: 35, upside: 50, conservative: 20 },
      customers: 500
    }
  };

  const adoptionData = [
    { month: 'Jan', zipminator: 120, qm9: 65, qmike: 180, qdiana: 450 },
    { month: 'Mar', zipminator: 135, qm9: 75, qmike: 190, qdiana: 480 },
    { month: 'May', zipminator: 145, qm9: 82, qmike: 195, qdiana: 495 },
    { month: 'Jul', zipminator: 150, qm9: 85, qmike: 200, qdiana: 500 }
  ];

  const marketPositioning = Object.entries(products).map(([key, product]) => ({
    name: product.name,
    marketSize: product.revenue[scenario] * 10,
    growth: product.growth[scenario],
    customers: product.customers
  }));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold qdaria-gradient-text mb-4">
          Crisis-Tested Solutions: 1500+ AI Products
        </h1>
        <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto">
          Proven Performance When Legacy Systems Collapse - Quantum+AI Solutions at Scale
        </p>
      </div>

      <Tabs value={activeProduct} onValueChange={setActiveProduct} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          {Object.entries(products).map(([key, product]) => (
            <TabsTrigger key={key} value={key} className="qdaria-tab flex items-center gap-2">
              <product.icon className="w-4 h-4" />
              {product.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(products).map(([key, product]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="qdaria-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <product.icon className="w-5 h-5" />
                    {product.name} - {product.description}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <div className="text-2xl font-bold text-cyan-400">
                        €{product.revenue[scenario]}M
                      </div>
                      <div className="text-sm text-slate-400 font-light">Annual Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-green-400/20">
                      <div className="text-2xl font-bold text-green-400">
                        {product.growth[scenario]}%
                      </div>
                      <div className="text-sm text-slate-400 font-light">Growth Rate</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-purple-400">
                        {product.customers}
                      </div>
                      <div className="text-sm text-slate-400 font-light">Active Users</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Badge className="qdaria-badge mr-2">{product.market}</Badge>
                    <Badge className="qdaria-badge">SaaS Model</Badge>
                    <Badge className="qdaria-badge">API Access</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="qdaria-card">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {key === 'zipminator' && (
                    <>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">Post-Quantum Encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">Crypto-Agility Framework</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">AI-Powered Threat Detection</span>
                      </div>
                    </>
                  )}
                  {key === 'qm9' && (
                    <>
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Quantum Portfolio Optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Real-time Risk Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Algorithmic Trading</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle>User Adoption Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={adoptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="zipminator" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                <Area type="monotone" dataKey="qm9" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="qmike" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="qdiana" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="qdaria-card">
          <CardHeader>
            <CardTitle>Market Positioning ({scenario.charAt(0).toUpperCase() + scenario.slice(1)})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={marketPositioning}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="marketSize" name="Market Size" unit="M€" />
                <YAxis dataKey="growth" name="Growth Rate" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="customers" fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPortfolioSlide;