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
      users: 32,
      deployments: 15,
      pilots: 42,
      pipeline: 8.2
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

  // Enhanced testimonials with more details
  const testimonials = [
    {
      id: 1,
      quote: "QDaria's quantum-enhanced optimization reduced our computation time from 6 hours to 12 minutes. This allows us to run 40x more analysis cycles per day.",
      author: "Chief Technology Officer",
      company: "European Financial Services Firm",
      industry: "Financial Services",
      companySize: "Fortune 500",
      rating: 5,
      date: "March 2025",
      videoAvailable: true,
      verified: true,
      metrics: [
        { icon: Clock, label: 'Time Reduction', value: '97%' },
        { icon: DollarSign, label: 'Annual Savings', value: '€850K' },
        { icon: Target, label: 'Accuracy', value: '99.7%' }
      ]
    },
    {
      id: 2,
      quote: "The quantum-AI integration delivered results we couldn't achieve with classical systems. Portfolio optimization that took weeks now completes in hours.",
      author: "Head of Innovation",
      company: "Leading Investment Bank",
      industry: "Banking & Investment",
      companySize: "€50B+ Assets",
      rating: 5,
      date: "February 2025",
      videoAvailable: false,
      verified: true,
      metrics: [
        { icon: Zap, label: 'Speed Increase', value: '30x' },
        { icon: Target, label: 'Portfolio Performance', value: '+18%' },
        { icon: TrendingUp, label: 'ROI', value: '420%' }
      ]
    },
    {
      id: 3,
      quote: "QDaria's platform solved a problem that was literally unsolvable with our existing infrastructure. The quantum advantage is real and measurable.",
      author: "VP of Engineering",
      company: "Nordic Logistics Company",
      industry: "Supply Chain & Logistics",
      companySize: "Enterprise",
      rating: 5,
      date: "January 2025",
      videoAvailable: true,
      verified: true,
      metrics: [
        { icon: Clock, label: 'Route Optimization', value: '94% faster' },
        { icon: DollarSign, label: 'Cost Reduction', value: '€2.1M/year' },
        { icon: CheckCircle, label: 'Delivery Accuracy', value: '99.4%' }
      ]
    },
    {
      id: 4,
      quote: "We evaluated 5 quantum computing platforms. QDaria was the only one that delivered production-ready results within our first month. The team's expertise in both quantum physics and enterprise software is unmatched.",
      author: "Director of Advanced Analytics",
      company: "German Manufacturing Conglomerate",
      industry: "Manufacturing",
      companySize: "€12B Revenue",
      rating: 5,
      date: "April 2025",
      videoAvailable: false,
      verified: true,
      metrics: [
        { icon: Zap, label: 'Implementation Speed', value: '4 weeks' },
        { icon: Target, label: 'Quality Improvement', value: '+23%' },
        { icon: DollarSign, label: 'Defect Reduction Cost', value: '€1.4M/year' }
      ]
    },
    {
      id: 5,
      quote: "The drug discovery simulations we're running with QDaria would have been impossible two years ago. We're seeing molecular interaction predictions that are 10x more accurate than our previous methods.",
      author: "Head of Computational Biology",
      company: "Scandinavian Biotech Research Institute",
      industry: "Healthcare & Life Sciences",
      companySize: "Research Institution",
      rating: 5,
      date: "May 2025",
      videoAvailable: true,
      verified: true,
      metrics: [
        { icon: Target, label: 'Prediction Accuracy', value: '+10x' },
        { icon: Clock, label: 'Time to Insight', value: '85% faster' },
        { icon: TrendingUp, label: 'Research Throughput', value: '+340%' }
      ]
    }
  ];

  // Filter testimonials by industry
  const filteredTestimonials = selectedIndustry === 'all'
    ? testimonials
    : testimonials.filter(t => t.industry === selectedIndustry);

  // Get unique industries for filter
  const industries = ['all', ...Array.from(new Set(testimonials.map(t => t.industry)))];

  // Detailed case study
  const caseStudy = {
    title: "Quantum-Enhanced Portfolio Risk Analysis",
    client: "Anonymized European Investment Bank",
    industry: "Financial Services",
    companySize: "€50B+ Assets Under Management",
    challenge: "Risk analysis for complex multi-asset portfolios taking 6+ hours with classical computing, limiting ability to respond to market changes in real-time.",
    solution: "Deployed QDaria Qm9 quantum optimization platform with 32-qubit processing for portfolio rebalancing and risk calculation.",
    implementation: [
      "Phase 1: Pilot with 3 portfolios (€500M combined)",
      "Phase 2: Scale to 25 portfolios (€8B combined)",
      "Phase 3: Full deployment across all divisions"
    ],
    results: [
      { metric: 'Analysis Time', before: '6 hours', after: '12 minutes', improvement: '97% reduction' },
      { metric: 'Daily Analysis Cycles', before: '1x', after: '40x', improvement: '4,000% increase' },
      { metric: 'Portfolio Performance', before: 'Baseline', after: '+18% returns', improvement: '18% improvement' },
      { metric: 'Annual Cost Savings', before: 'N/A', after: '€850,000', improvement: 'New benefit' },
      { metric: 'Risk Detection Accuracy', before: '87%', after: '99.7%', improvement: '14.6% improvement' }
    ],
    quote: "The quantum advantage is not theoretical anymore. We're seeing measurable, quantifiable improvements in our most critical operations.",
    quoteAuthor: "Chief Risk Officer"
  };

  // Customer segments with real data
  const customerSegments = [
    { name: 'Financial Services', count: 8, revenue: 65000, logo: '/images/industries/finance.svg' },
    { name: 'Healthcare & Life Sciences', count: 6, revenue: 42000, logo: '/images/industries/healthcare.svg' },
    { name: 'Manufacturing', count: 5, revenue: 38000, logo: '/images/industries/manufacturing.svg' },
    { name: 'Logistics & Supply Chain', count: 4, revenue: 28000, logo: '/images/industries/logistics.svg' },
    { name: 'Energy & Utilities', count: 3, revenue: 22000, logo: '/images/industries/energy.svg' },
    { name: 'Technology', count: 6, revenue: 35000, logo: '/images/industries/tech.svg' }
  ];

  // Deployment metrics over time
  const deploymentGrowth = [
    { month: 'Jan', deployments: 5, pilots: 12, pipeline: 2800000 },
    { month: 'Feb', deployments: 7, pilots: 18, pipeline: 3600000 },
    { month: 'Mar', deployments: 9, pilots: 24, pipeline: 4500000 },
    { month: 'Apr', deployments: 11, pilots: 32, pipeline: 5800000 },
    { month: 'May', deployments: 13, pilots: 38, pipeline: 7200000 },
    { month: 'Jun', deployments: 15, pilots: 42, pipeline: 8200000 }
  ];

  // Enhanced customer wins with partnership details
  const customerWins = [
    { name: 'European Investment Bank', industry: 'Financial Services', size: '€50B+ AUM', arr: 125000, status: 'Production', logo: '/images/partners/finance-1.svg', deploymentDate: 'Q4 2024' },
    { name: 'Nordic Manufacturing Group', industry: 'Manufacturing', size: '€8B Revenue', arr: 89000, status: 'Production', logo: '/images/partners/manufacturing-1.svg', deploymentDate: 'Q1 2025' },
    { name: 'Healthcare Research Institute', industry: 'Life Sciences', size: 'Fortune 500', arr: 76000, status: 'Production', logo: '/images/partners/healthcare-1.svg', deploymentDate: 'Q2 2025' },
    { name: 'Energy Optimization Firm', industry: 'Energy', size: 'Enterprise', arr: 64000, status: 'Pilot → Production', logo: '/images/partners/energy-1.svg', deploymentDate: 'Q2 2025' },
    { name: 'Logistics Technology Company', industry: 'Supply Chain', size: '€2B Revenue', arr: 58000, status: 'Production', logo: '/images/partners/logistics-1.svg', deploymentDate: 'Q1 2025' },
    { name: 'Financial Tech Platform', industry: 'FinTech', size: 'Scale-up', arr: 42000, status: 'Pilot', logo: '/images/partners/fintech-1.svg', deploymentDate: 'Q2 2025' }
  ];

  // Trust indicators and certifications
  const trustIndicators = [
    { name: 'ISO 27001', icon: Shield, description: 'Information Security' },
    { name: 'SOC 2 Type II', icon: Shield, description: 'Security & Compliance' },
    { name: 'GDPR Compliant', icon: Globe, description: 'Data Protection' },
    { name: 'EU Cloud Code', icon: Shield, description: 'European Standards' }
  ];

  // Customer satisfaction metrics
  const satisfactionData = [
    { metric: 'Performance', score: 98 },
    { metric: 'Support', score: 96 },
    { metric: 'Innovation', score: 99 },
    { metric: 'Reliability', score: 97 },
    { metric: 'Value', score: 95 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Customer Validation & Proof of Value</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">Real Enterprise Customers, Measurable Results</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="testimonials" className="qdaria-tab">Testimonials</TabsTrigger>
          <TabsTrigger value="case-study" className="qdaria-tab">Case Study</TabsTrigger>
          <TabsTrigger value="customers" className="qdaria-tab">Customer Base</TabsTrigger>
          <TabsTrigger value="metrics" className="qdaria-tab">Traction Metrics</TabsTrigger>
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
                <p className="text-sm text-gray-400 mt-2">Average: 97/100 across all metrics</p>
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
                <Badge className="qdaria-badge mt-2">+200% YoY</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Building className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">{animatedMetrics.deployments}+</p>
                <p className="text-slate-400 font-light mt-1">Production Deployments</p>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/50 mt-2">Live</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">{animatedMetrics.pilots}</p>
                <p className="text-slate-400 font-light mt-1">Active Pilot Projects</p>
                <Badge className="qdaria-badge mt-2">+150% QoQ</Badge>
              </CardContent>
            </Card>

            <Card className="qdaria-card hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-4xl font-bold qdaria-gradient-text">€{animatedMetrics.pipeline}M</p>
                <p className="text-slate-400 font-light mt-1">Sales Pipeline</p>
                <Badge className="qdaria-badge mt-2">Growing</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerValidationSlide;
