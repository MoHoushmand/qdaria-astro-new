import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Quote, TrendingUp, Users, Building, CheckCircle, Award, Target, DollarSign, Clock, Zap, Star, Filter, Play, ChevronRight, Shield, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface CustomerValidationSlideProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const CustomerValidationSlide: React.FC<CustomerValidationSlideProps> = ({ scenario }) => {
  const [activeTab, setActiveTab] = useState('testimonials');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [animatedMetrics, setAnimatedMetrics] = useState({
    users: 0,
    deployments: 0,
    pilots: 0,
    pipeline: 0
  });

  // Animate metrics on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      users: 0,
      deployments: 0,
      pilots: 0,
      pipeline: 0
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedMetrics({
        users: Math.floor(targets.users * progress),
        deployments: Math.floor(targets.deployments * progress),
        pilots: Math.floor(targets.pilots * progress),
        pipeline: parseFloat((targets.pipeline * progress).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedMetrics({
          users: targets.users,
          deployments: targets.deployments,
          pilots: targets.pilots,
          pipeline: targets.pipeline
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // NOTE: These are ILLUSTRATIVE USE CASES showing potential applications
  // QDaria is in R&D phase - these are not actual customer testimonials
  const testimonials = [
    {
      id: 1,
      quote: "Financial services firms face computational bottlenecks in portfolio optimization. Topological quantum computing could dramatically reduce analysis time, enabling more comprehensive risk assessment.",
      author: "Industry Use Case",
      company: "Financial Services Sector",
      industry: "Financial Services",
      companySize: "Target Market",
      rating: 5,
      date: "Projected Application",
      videoAvailable: false,
      verified: false,
      metrics: [
        { icon: Clock, label: 'Potential Benefit', value: 'Faster analysis' },
        { icon: DollarSign, label: 'Value Proposition', value: 'Cost reduction' },
        { icon: Target, label: 'Goal', value: 'Higher accuracy' }
      ]
    },
    {
      id: 2,
      quote: "Investment portfolios with hundreds of assets require optimization that scales exponentially. Quantum algorithms like QAOA could provide significant speedups for these complex calculations.",
      author: "Industry Use Case",
      company: "Banking & Investment Sector",
      industry: "Banking & Investment",
      companySize: "Target Market",
      rating: 5,
      date: "Projected Application",
      videoAvailable: false,
      verified: false,
      metrics: [
        { icon: Zap, label: 'Potential', value: 'Faster optimization' },
        { icon: Target, label: 'Application', value: 'Portfolio management' },
        { icon: TrendingUp, label: 'Goal', value: 'Better returns' }
      ]
    },
    {
      id: 3,
      quote: "Logistics and supply chain optimization involves solving NP-hard problems. Topological quantum computing offers a promising approach to tackle these computationally intensive challenges.",
      author: "Industry Use Case",
      company: "Supply Chain & Logistics Sector",
      industry: "Supply Chain & Logistics",
      companySize: "Target Market",
      rating: 5,
      date: "Projected Application",
      videoAvailable: false,
      verified: false,
      metrics: [
        { icon: Clock, label: 'Potential', value: 'Route optimization' },
        { icon: DollarSign, label: 'Goal', value: 'Cost efficiency' },
        { icon: CheckCircle, label: 'Target', value: 'Better delivery' }
      ]
    },
    {
      id: 4,
      quote: "Manufacturing quality control and process optimization present ideal use cases for quantum computing. Complex simulations could help predict defects and optimize production parameters.",
      author: "Industry Use Case",
      company: "Manufacturing Sector",
      industry: "Manufacturing",
      companySize: "Target Market",
      rating: 5,
      date: "Projected Application",
      videoAvailable: false,
      verified: false,
      metrics: [
        { icon: Zap, label: 'Application', value: 'Process optimization' },
        { icon: Target, label: 'Goal', value: 'Quality improvement' },
        { icon: DollarSign, label: 'Benefit', value: 'Defect reduction' }
      ]
    },
    {
      id: 5,
      quote: "Drug discovery requires simulating molecular interactions at quantum scale. Quantum computers could model these interactions natively, potentially accelerating pharmaceutical research.",
      author: "Industry Use Case",
      company: "Healthcare & Life Sciences Sector",
      industry: "Healthcare & Life Sciences",
      companySize: "Target Market",
      rating: 5,
      date: "Projected Application",
      videoAvailable: false,
      verified: false,
      metrics: [
        { icon: Target, label: 'Application', value: 'Molecular simulation' },
        { icon: Clock, label: 'Goal', value: 'Faster discovery' },
        { icon: TrendingUp, label: 'Potential', value: 'Research acceleration' }
      ]
    }
  ];

  // Filter testimonials by industry
  const filteredTestimonials = selectedIndustry === 'all'
    ? testimonials
    : testimonials.filter(t => t.industry === selectedIndustry);

  // Get unique industries for filter
  const industries = ['all', ...Array.from(new Set(testimonials.map(t => t.industry)))];

  // NOTE: This is an ILLUSTRATIVE case study showing potential application
  // QDaria is in R&D phase - this is not an actual customer implementation
  const caseStudy = {
    title: "Potential Use Case: Portfolio Risk Analysis",
    client: "Illustrative Financial Services Example",
    industry: "Financial Services",
    companySize: "Target: Large Asset Managers",
    challenge: "Risk analysis for complex multi-asset portfolios can take hours with classical computing, limiting ability to respond to market changes quickly.",
    solution: "Topological quantum computing could enable faster portfolio rebalancing and risk calculation through quantum optimization algorithms.",
    implementation: [
      "Phase 1: Proof of concept with select portfolios",
      "Phase 2: Expanded pilot with partner institutions",
      "Phase 3: Production deployment (target: 2027+)"
    ],
    results: [
      { metric: 'Analysis Time', before: 'Hours', after: 'Target: Minutes', improvement: 'Projected benefit' },
      { metric: 'Analysis Cycles', before: 'Limited', after: 'Target: More frequent', improvement: 'Projected benefit' },
      { metric: 'Portfolio Performance', before: 'Baseline', after: 'Target: Improved', improvement: 'Projected benefit' },
      { metric: 'Cost Impact', before: 'High compute costs', after: 'Target: Reduced', improvement: 'Projected benefit' },
      { metric: 'Risk Detection', before: 'Current methods', after: 'Target: Enhanced', improvement: 'Projected benefit' }
    ],
    quote: "Topological quantum computing offers promising potential for financial risk analysis applications.",
    quoteAuthor: "Industry Analysis"
  };

  // NOTE: These are TARGET customer segments - no current customers exist
  // QDaria is in R&D phase
  const customerSegments = [
    { name: 'Financial Services', count: 0, revenue: 0, logo: '/images/industries/finance.svg' },
    { name: 'Healthcare & Life Sciences', count: 0, revenue: 0, logo: '/images/industries/healthcare.svg' },
    { name: 'Manufacturing', count: 0, revenue: 0, logo: '/images/industries/manufacturing.svg' },
    { name: 'Logistics & Supply Chain', count: 0, revenue: 0, logo: '/images/industries/logistics.svg' },
    { name: 'Energy & Utilities', count: 0, revenue: 0, logo: '/images/industries/energy.svg' },
    { name: 'Technology', count: 0, revenue: 0, logo: '/images/industries/tech.svg' }
  ];

  // NOTE: These are PROJECTED deployment metrics - not actual data
  // First deployments targeted for 2027+
  const deploymentGrowth = [
    { month: '2026 Q1', deployments: 0, pilots: 0, pipeline: 0 },
    { month: '2026 Q2', deployments: 0, pilots: 0, pipeline: 0 },
    { month: '2026 Q3', deployments: 0, pilots: 0, pipeline: 0 },
    { month: '2026 Q4', deployments: 0, pilots: 0, pipeline: 0 },
    { month: '2027 Q1', deployments: 0, pilots: 0, pipeline: 0 },
    { month: '2027 Q2', deployments: 0, pilots: 0, pipeline: 0 }
  ];

  // NOTE: These are TARGET customer types - not actual customers
  // QDaria has no paying customers yet
  const customerWins = [
    { name: 'Target: Financial Services', industry: 'Financial Services', size: 'Enterprise', arr: 0, status: 'Prospecting', logo: '/images/partners/finance-1.svg', deploymentDate: 'Target: 2027+' },
    { name: 'Target: Manufacturing', industry: 'Manufacturing', size: 'Enterprise', arr: 0, status: 'Prospecting', logo: '/images/partners/manufacturing-1.svg', deploymentDate: 'Target: 2027+' },
    { name: 'Target: Healthcare Research', industry: 'Life Sciences', size: 'Research Institution', arr: 0, status: 'Prospecting', logo: '/images/partners/healthcare-1.svg', deploymentDate: 'Target: 2027+' },
    { name: 'Target: Energy Sector', industry: 'Energy', size: 'Enterprise', arr: 0, status: 'Prospecting', logo: '/images/partners/energy-1.svg', deploymentDate: 'Target: 2027+' },
    { name: 'Target: Logistics', industry: 'Supply Chain', size: 'Enterprise', arr: 0, status: 'Prospecting', logo: '/images/partners/logistics-1.svg', deploymentDate: 'Target: 2027+' },
    { name: 'Target: FinTech', industry: 'FinTech', size: 'Scale-up', arr: 0, status: 'Prospecting', logo: '/images/partners/fintech-1.svg', deploymentDate: 'Target: 2027+' }
  ];

  // Trust indicators and certifications
  const trustIndicators = [
    { name: 'ISO 27001', icon: Shield, description: 'Information Security' },
    { name: 'SOC 2 Type II', icon: Shield, description: 'Security & Compliance' },
    { name: 'GDPR Compliant', icon: Globe, description: 'Data Protection' },
    { name: 'EU Cloud Code', icon: Shield, description: 'European Standards' }
  ];

  // NOTE: These are TARGET satisfaction metrics - no customers yet
  // QDaria is in R&D phase - first customers expected Q1 2026
  const satisfactionData = [
    { metric: 'Performance', score: 0 },
    { metric: 'Support', score: 0 },
    { metric: 'Innovation', score: 0 },
    { metric: 'Reliability', score: 0 },
    { metric: 'Value', score: 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Projected Customer Validation & Target Value</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">First Customer Validation Targeted Q1 2026</p>
        <div className="mt-4 px-6 py-3 bg-orange-500/20 border-2 border-orange-400/50 rounded-lg inline-block">
          <p className="text-orange-300 font-semibold">⚠️ Projections Only - First customers expected Q1 2026</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="testimonials" className="qdaria-tab">Projected Testimonials</TabsTrigger>
          <TabsTrigger value="case-study" className="qdaria-tab">Target Case Study</TabsTrigger>
          <TabsTrigger value="customers" className="qdaria-tab">Target Customer Base</TabsTrigger>
          <TabsTrigger value="metrics" className="qdaria-tab">Projected Metrics</TabsTrigger>
        </TabsList>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          {/* Industry Filter */}
          <Card className="qdaria-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-400 font-light font-medium">Filter by Industry:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedIndustry === industry
                          ? 'bg-cyan-500 text-black'
                          : 'bg-slate-800/50 text-slate-400 font-light hover:bg-slate-700/50 border border-cyan-400/20'
                      }`}
                    >
                      {industry === 'all' ? 'All Industries' : industry}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="qdaria-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Quote className="w-8 h-8 text-cyan-400" />
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        {testimonial.verified && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {testimonial.videoAvailable && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                            <Play className="w-3 h-3 mr-1" />
                            Video Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-xl text-gray-200 italic leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div className="space-y-1">
                        <p className="text-white font-semibold">{testimonial.author}</p>
                        <p className="text-gray-400">{testimonial.company}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50">
                            {testimonial.industry}
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                            {testimonial.companySize}
                          </Badge>
                          <Badge className="bg-gray-500/20 text-slate-400 font-light border-gray-500/50">
                            {testimonial.date}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {testimonial.metrics.map((metric, index) => {
                      const IconComponent = metric.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all">
                          <IconComponent className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                          <p className="text-3xl font-bold qdaria-gradient-text">{metric.value}</p>
                          <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-cyan-400" />
                Trusted & Certified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {trustIndicators.map((indicator, index) => {
                  const IconComponent = indicator.icon;
                  return (
                    <div key={index} className="text-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                      <IconComponent className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">{indicator.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{indicator.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Study Tab */}
        <TabsContent value="case-study" className="space-y-6">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-3xl">
                <Award className="w-8 h-8 text-cyan-400" />
                {caseStudy.title}
              </CardTitle>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="text-white font-semibold">{caseStudy.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Industry</p>
                  <p className="text-white font-semibold">{caseStudy.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Size</p>
                  <p className="text-white font-semibold">{caseStudy.companySize}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Challenge */}
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-red-300 mb-2">Challenge</h3>
                <p className="text-gray-200">{caseStudy.challenge}</p>
              </div>

              {/* Solution */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Solution</h3>
                <p className="text-gray-200 mb-3">{caseStudy.solution}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400 font-light">Implementation Phases:</p>
                  {caseStudy.implementation.map((phase, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <p className="text-slate-400 font-light">{phase}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Table */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-green-300 mb-4">Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-3 text-slate-400 font-light">Metric</th>
                        <th className="text-left p-3 text-slate-400 font-light">Before QDaria</th>
                        <th className="text-left p-3 text-slate-400 font-light">After QDaria</th>
                        <th className="text-left p-3 text-slate-400 font-light">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudy.results.map((result, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="p-3 text-white font-medium">{result.metric}</td>
                          <td className="p-3 text-slate-400 font-light">{result.before}</td>
                          <td className="p-3 text-cyan-400 font-semibold">{result.after}</td>
                          <td className="p-3 text-green-400 font-bold">{result.improvement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-slate-800/50 border border-cyan-400/30 rounded-lg">
                <Quote className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="text-lg text-gray-200 italic">"{caseStudy.quote}"</p>
                <p className="text-gray-400 mt-2">— {caseStudy.quoteAuthor}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building className="w-5 h-5 text-cyan-400" />
                  Customer Distribution by Industry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{segment.name}</p>
                          <p className="text-sm text-gray-400">{segment.count} customers</p>
                        </div>
                      </div>
                      <Badge className="qdaria-badge">
                        €{(segment.revenue / 1000).toFixed(0)}K ARR
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Satisfaction Radar */}
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-cyan-400" />
                  Customer Satisfaction Score
                </CardTitle>
                <p className="text-sm text-gray-400 mt-2">No customer data yet - R&D phase</p>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={satisfactionData}>
                    <PolarGrid stroke="#1a1f2e" />
                    <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                    <Radar name="Score" dataKey="score" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.6} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value}/100`, 'Score']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Customer Wins */}
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-cyan-400" />
                Key Customer Wins & Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customerWins.map((customer, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">{customer.name}</p>
                        <p className="text-sm text-gray-400 mt-1">{customer.industry} • {customer.size}</p>
                      </div>
                      <Badge className={
                        customer.status === 'Production' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                        'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                      }>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Annual Contract Value</span>
                        <span className="text-cyan-400 font-bold">€{(customer.arr / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Deployment Date</span>
                        <span className="text-slate-400 font-light font-medium">{customer.deploymentDate}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg border border-cyan-500/50 flex items-center justify-center gap-2 transition-all">
                      View Case Study
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deployment Growth */}
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Enterprise Deployment Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={deploymentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="deployments" stroke="#CCFF00" strokeWidth={3} name="Production Deployments" />
                    <Line type="monotone" dataKey="pilots" stroke="#9AFF00" strokeWidth={3} name="Pilot Projects" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pipeline Growth */}
            <Card className="qdaria-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  Sales Pipeline Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="qdaria-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deploymentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `€${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0A0A0F', border: '2px solid #CCFF00', borderRadius: '8px' }}
                      formatter={(value: number) => [`€${(value / 1000000).toFixed(2)}M`, 'Pipeline Value']}
                    />
                    <Bar dataKey="pipeline" fill="#66FF00" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary Metrics with Animation */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">{animatedMetrics.users}</p>
                <p className="text-slate-400 font-light mt-1">Active Customers</p>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 mt-2">Target: 2026</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Building className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">{animatedMetrics.deployments}+</p>
                <p className="text-slate-400 font-light mt-1">Production Deployments</p>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 mt-2">Target: 2027+</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">{animatedMetrics.pilots}</p>
                <p className="text-slate-400 font-light mt-1">Active Pilot Projects</p>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 mt-2">Target: 2026</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">€{animatedMetrics.pipeline}M</p>
                <p className="text-slate-400 font-light mt-1">Sales Pipeline</p>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 mt-2">Projected</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerValidationSlide;
