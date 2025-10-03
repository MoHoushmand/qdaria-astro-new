import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/pitch-deck/ui/accordion';
import { Input } from '@/components/pitch-deck/ui/input';
import {
  HelpCircle,
  Cpu,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  CheckCircle,
  ArrowRight,
  Target,
  Shield,
  Zap,
  Globe,
  Award,
  AlertCircle,
  Building2,
  Calendar,
  BarChart3
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'technical' | 'business' | 'team' | 'market' | 'risks';
  question: string;
  answer: string;
  supportingData?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  relatedSlides?: string[];
}

const InvestorFAQSlide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs: FAQItem[] = [
    // TECHNICAL QUESTIONS
    {
      id: 'tech-1',
      category: 'technical',
      question: 'What makes topological qubits better than superconducting qubits?',
      answer: 'While QDaria currently uses Rigetti\'s superconducting Novera QPU (256 qubits, 100μs coherence), our platform is hardware-agnostic and positioned to leverage topological qubits when commercially available. Topological qubits offer intrinsic error protection through quantum braiding, requiring fewer physical qubits for error correction (50x reduction). Our quantum-AI hybrid architecture allows seamless hardware upgrades without platform redevelopment.',
      supportingData: [
        { label: 'Current QPU', value: 'Rigetti Novera 256-qubit', icon: <Cpu className="w-4 h-4" /> },
        { label: 'Error Rate', value: '0.05% (99.5% fidelity)', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Hardware Strategy', value: 'Agnostic Platform', icon: <Zap className="w-4 h-4" /> }
      ],
      relatedSlides: ['Technology', 'Product']
    },
    {
      id: 'tech-2',
      category: 'technical',
      question: 'When will you have 1000+ qubit systems?',
      answer: 'Our Rigetti Novera QPU partnership provides a clear scaling roadmap: 256 qubits (2024), 512 qubits (2025), 1024+ qubits (2026-2027). Unlike competitors relying on cloud access, we own our quantum hardware, enabling rapid upgrades and custom configurations. Our €2.8M hardware investment includes upgrade pathways and Rigetti\'s multi-year technology roadmap.',
      supportingData: [
        { label: '2024 Deployment', value: '256 Qubits (Current)', icon: <CheckCircle className="w-4 h-4" /> },
        { label: '2025 Target', value: '512 Qubits', icon: <Calendar className="w-4 h-4" /> },
        { label: '2026-2027', value: '1024+ Qubits', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      relatedSlides: ['Technology', 'Traction']
    },
    {
      id: 'tech-3',
      category: 'technical',
      question: 'How do you handle quantum decoherence?',
      answer: 'Our Rigetti Novera QPU achieves 100μs coherence time with 99.5% gate fidelity—2.2x better than industry average (45μs). We employ three-layer error mitigation: (1) Hardware-level error correction via superconducting qubit design, (2) Software error mitigation through quantum error correction codes, (3) Quantum-AI hybrid algorithms that leverage classical computing for error-prone operations.',
      supportingData: [
        { label: 'Coherence Time', value: '100μs (2.2x industry)', icon: <Zap className="w-4 h-4" /> },
        { label: 'Gate Fidelity', value: '99.5% single-qubit', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Error Strategy', value: 'Three-layer mitigation', icon: <Shield className="w-4 h-4" /> }
      ],
      relatedSlides: ['Technology']
    },
    {
      id: 'tech-4',
      category: 'technical',
      question: 'What\'s your quantum advantage over classical systems?',
      answer: 'We demonstrate quantum advantage in three validated use cases: (1) Drug discovery molecular simulation: 10,000x speedup for molecules with 50+ atoms, (2) Portfolio optimization: 100x faster for 200+ asset portfolios, (3) Machine learning: 50x acceleration in pattern recognition tasks. Our advantage comes from hybrid quantum-classical algorithms that intelligently route problems to optimal compute resources.',
      supportingData: [
        { label: 'Chemistry Simulation', value: '10,000x speedup', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'Optimization', value: '100x faster', icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'Pattern Recognition', value: '50x acceleration', icon: <Cpu className="w-4 h-4" /> }
      ],
      relatedSlides: ['Technology', 'Product', 'Solution']
    },

    // BUSINESS QUESTIONS
    {
      id: 'business-1',
      category: 'business',
      question: 'Who are your main customers and why do they buy?',
      answer: 'Our customers are Fortune 500 enterprises facing computational crises: (1) Pharmaceutical companies spending $2.6B/drug on molecular simulations, (2) Financial institutions running billion-dollar portfolios requiring real-time risk analysis, (3) Energy companies optimizing trillion-dollar grids. They buy QDaria because we deliver enterprise-ready quantum solutions TODAY—not research projects or cloud experiments, but production-deployed systems with 99.9% uptime SLAs.',
      supportingData: [
        { label: 'Target Market', value: 'Fortune 500 Enterprises', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Pharma Savings', value: '$2.6B/drug reduction potential', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'Deployment Status', value: 'Production-ready (99.9% SLA)', icon: <CheckCircle className="w-4 h-4" /> }
      ],
      relatedSlides: ['Market', 'Solution', 'Customers']
    },
    {
      id: 'business-2',
      category: 'business',
      question: 'What\'s your actual revenue today vs projections?',
      answer: 'Current state (Q2 2024): €144K ARR, 32 customers, €38.4K invested in Management Events partnership delivering 60 executive meetings. Base case projections: €3.6M (2024), €9.8M (2025), €148M (2028). Our projections are grounded in: (1) €15.6M pipeline from Management Events (406x ROI), (2) 18.7% Nordic market share from Novera QPU first-mover advantage, (3) Validated unit economics: €10.8K CAC, €158K LTV (14.6:1 ratio).',
      supportingData: [
        { label: 'Current ARR', value: '€144K (32 customers)', icon: <DollarSign className="w-4 h-4" /> },
        { label: '2025 Projection', value: '€9.8M ARR', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'LTV/CAC Ratio', value: '14.6:1 (industry: 6:1)', icon: <BarChart3 className="w-4 h-4" /> }
      ],
      relatedSlides: ['Financials', 'Traction']
    },
    {
      id: 'business-3',
      category: 'business',
      question: 'How much are you raising and what\'s it for?',
      answer: 'Series A target: €15M at €85M valuation. Use of funds: (1) €5.2M: Engineering team expansion (4→17 headcount) for platform scale, (2) €4.8M: European market expansion (Germany, DACH, Benelux), (3) €2.8M: Novera QPU capacity scaling (256→512 qubits), (4) €1.2M: Sales & marketing infrastructure, (5) €1M: Working capital. This funding achieves: Break-even Q4 2025, €26M ARR 2026, 221 enterprise customers, 15% European market share.',
      supportingData: [
        { label: 'Series A Target', value: '€15M @ €85M valuation', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'Primary Use', value: '€5.2M Engineering (35%)', icon: <Users className="w-4 h-4" /> },
        { label: 'Break-even', value: 'Q4 2025', icon: <Calendar className="w-4 h-4" /> }
      ],
      relatedSlides: ['Financials', 'Use of Funds']
    },
    {
      id: 'business-4',
      category: 'business',
      question: 'What happens if IBM or Google targets your market?',
      answer: 'IBM/Google operate cloud quantum services—fundamentally different business model. QDaria\'s defensibility: (1) Hardware ownership: We own Novera QPU, enabling proprietary optimizations and guaranteed availability, (2) Vertical specialization: Deep pharmaceutical/finance integrations vs their horizontal platform, (3) European data sovereignty: GDPR-compliant on-premise deployment vs US cloud, (4) Management Events partnership: Exclusive 60-meeting access to Nordic/German C-suites that tech giants cannot replicate.',
      supportingData: [
        { label: 'Competitive Moat', value: 'Hardware ownership + vertical focus', icon: <Shield className="w-4 h-4" /> },
        { label: 'Data Sovereignty', value: 'EU GDPR on-premise', icon: <Globe className="w-4 h-4" /> },
        { label: 'Market Access', value: '60 exclusive C-suite meetings', icon: <Users className="w-4 h-4" /> }
      ],
      relatedSlides: ['Competitive', 'Market']
    },
    {
      id: 'business-5',
      category: 'business',
      question: 'What\'s your path to profitability?',
      answer: 'Break-even: Q4 2025 (18 months from Series A). Unit economics demonstrate capital-efficient growth: €10.8K CAC with 6.2-month payback, 92% gross margins (Novera QPU premium pricing), 165% net revenue retention. Path: (1) Q3 2024: €1.1M profit on €3.6M revenue (base case), (2) Q4 2024-Q3 2025: Scale operations while maintaining 70%+ gross margins, (3) Q4 2025: Achieve operational break-even at €2.4M quarterly revenue, (4) 2026+: EBITDA-positive with 57% EBITDA margins.',
      supportingData: [
        { label: 'Break-even', value: 'Q4 2025 (18 months)', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Gross Margin', value: '92% (Novera premium)', icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'CAC Payback', value: '6.2 months (industry: 12)', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      relatedSlides: ['Financials', 'Unit Economics']
    },

    // TEAM QUESTIONS
    {
      id: 'team-1',
      category: 'team',
      question: 'Why is this team uniquely qualified?',
      answer: 'CEO Daniel Mo Houshmand: Applied Mathematics + Physics background, Quantum ML expert, secured Norway\'s first commercial QPU, delivered 406x ROI Management Events partnership. COO Rajesh Chavan: 12+ years Novartis pharma operations, $80M+ deal experience, MBA IIM Bangalore. Team combines: Quantum computing R&D (45 publications), Enterprise SaaS scaling (Novartis, Capgemini), Media/communications (Emmy-nominated CCO), Norwegian market access. Top 5 European quantum startup (Startup Genome ranking).',
      supportingData: [
        { label: 'CEO Credentials', value: 'Applied Math + Physics + Quantum ML', icon: <Users className="w-4 h-4" /> },
        { label: 'COO Experience', value: '12yrs Novartis, $80M+ deals', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Team Ranking', value: 'Top 5 European quantum startup', icon: <Award className="w-4 h-4" /> }
      ],
      relatedSlides: ['Team', 'About Us']
    },
    {
      id: 'team-2',
      category: 'team',
      question: 'How will you attract quantum talent in Norway?',
      answer: 'Multi-pronged talent strategy: (1) University partnerships: University of Oslo (Physics/Math), NTNU (Engineering) co-op programs, (2) Compensation: Top-quartile salaries + equity (0.5-2% for senior engineers), (3) Unique opportunity: Only company with commercial quantum hardware in Nordics—researchers choose QDaria over academic roles, (4) Remote-first: Hire globally, Norwegian HQ for hardware access. Current success: 96% retention rate, 15 candidates for 3 open engineering positions.',
      supportingData: [
        { label: 'Talent Pool', value: 'U. Oslo + NTNU partnerships', icon: <Users className="w-4 h-4" /> },
        { label: 'Retention Rate', value: '96% (industry: 82%)', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Unique Draw', value: 'Only Nordic commercial QPU', icon: <Cpu className="w-4 h-4" /> }
      ],
      relatedSlides: ['Team', 'Culture']
    },

    // MARKET QUESTIONS
    {
      id: 'market-1',
      category: 'market',
      question: 'Is the market ready for quantum computing?',
      answer: 'YES. Evidence: (1) McKinsey: $850B quantum computing market by 2028, (2) Pharmaceutical companies already spending $2.6B/drug on classical simulations—desperate for quantum acceleration, (3) QDaria validation: 32 paying customers TODAY, €180K ARR Q2 2024, (4) Management Events: 60 C-suite meetings prove enterprise demand, (5) Gartner: Quantum computing entering "Slope of Enlightenment" phase (commercial adoption begins). Early adopters prioritize competitive advantage over waiting for "perfect" quantum systems.',
      supportingData: [
        { label: 'Market Size', value: '€850B by 2028 (McKinsey)', icon: <Globe className="w-4 h-4" /> },
        { label: 'Current Traction', value: '32 paying customers, €180K ARR', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Enterprise Validation', value: '60 C-suite meetings secured', icon: <Users className="w-4 h-4" /> }
      ],
      relatedSlides: ['Market', 'Traction']
    },
    {
      id: 'market-2',
      category: 'market',
      question: 'What\'s your realistic TAM?',
      answer: 'Bottom-up TAM calculation: (1) European quantum-ready enterprises: 10,600 companies (pharma, finance, energy), (2) Average deal size: €125K-€650K ARR (based on current customer contracts), (3) Addressable market: 10,600 × €285K avg = €3.02B European TAM, (4) QDaria SOM: €42B (capturing high-complexity use cases). Conservative capture: 5% European market share = €151M ARR (our 2028 base case: €148M). TAM validated by Management Events access to 2,500+ German enterprises alone.',
      supportingData: [
        { label: 'European Enterprises', value: '10,600 quantum-ready companies', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Addressable TAM', value: '€3.02B (bottom-up)', icon: <DollarSign className="w-4 h-4" /> },
        { label: '5% Market Share', value: '€151M ARR (2028 base case)', icon: <Target className="w-4 h-4" /> }
      ],
      relatedSlides: ['Market', 'TAM/SAM/SOM']
    },
    {
      id: 'market-3',
      category: 'market',
      question: 'What regulatory hurdles do you face?',
      answer: 'Three main areas: (1) Export controls: Quantum technology subject to EU dual-use regulations—mitigated by focusing on civilian applications (pharma, finance), (2) Data privacy: GDPR compliance ADVANTAGE—our on-premise Novera QPU deployment keeps sensitive data in EU (vs US cloud competitors), (3) Quantum-safe cryptography: We partner with Zipminator (Norway\'s post-quantum crypto leader) for NIST-approved encryption. Regulatory environment favors QDaria: EU Quantum Flagship funding, Norwegian innovation grants, GDPR protectionism against US tech.',
      supportingData: [
        { label: 'GDPR Compliance', value: 'On-premise EU data sovereignty', icon: <Shield className="w-4 h-4" /> },
        { label: 'Crypto Partner', value: 'Zipminator (NIST-approved PQC)', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'EU Support', value: 'Quantum Flagship funding eligible', icon: <Globe className="w-4 h-4" /> }
      ],
      relatedSlides: ['Technology', 'Market']
    },

    // RISKS & EXIT
    {
      id: 'risks-1',
      category: 'risks',
      question: 'What\'s the exit opportunity?',
      answer: 'Three viable exit paths: (1) Strategic acquisition: Prime targets are IBM, Google, AWS, Microsoft seeking European quantum foothold—comparable exits: Rigetti IPO ($1.5B valuation), IonQ IPO ($2B), Cambridge Quantum acquired by Quantinuum ($300M+), (2) IPO: Norwegian/European listing at €500M+ valuation (2027-2028), (3) Vertical consolidation: Pharmaceutical/finance giants acquiring quantum capabilities (precedent: Moderna acquiring computational biology startups). Our €85M Series A valuation targets 10-15x return at €850M-€1.3B exit (2027-2029).',
      supportingData: [
        { label: 'Comparable Exits', value: 'IonQ IPO $2B, Rigetti $1.5B', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'Target Valuation', value: '€850M-€1.3B (2027-2029)', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'Return Multiple', value: '10-15x on Series A', icon: <BarChart3 className="w-4 h-4" /> }
      ],
      relatedSlides: ['Financials', 'Exit Strategy']
    },
    {
      id: 'risks-2',
      category: 'risks',
      question: 'What are the biggest risks to this investment?',
      answer: 'Key risks & mitigations: (1) Technology risk: Quantum computing fails to deliver advantage → Mitigation: Already demonstrating 10,000x speedups in drug discovery, hybrid quantum-AI approach provides value regardless, (2) Competition: Tech giants enter market → Mitigation: Hardware ownership + vertical specialization + Management Events exclusivity create defensible moat, (3) Market timing: Enterprises delay adoption → Mitigation: 32 paying customers TODAY prove demand, Management Events pipeline validates urgency, (4) Talent: Cannot hire quantum engineers → Mitigation: 96% retention, U. Oslo partnership, only Nordic commercial QPU attracts top talent.',
      supportingData: [
        { label: 'Technology Validation', value: '10,000x drug discovery speedup', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Market Proof', value: '32 customers, €180K ARR', icon: <Users className="w-4 h-4" /> },
        { label: 'Talent Success', value: '96% retention, U. Oslo partnership', icon: <Award className="w-4 h-4" /> }
      ],
      relatedSlides: ['Risk Mitigation', 'Competitive']
    },
    {
      id: 'risks-3',
      category: 'risks',
      question: 'Why should I invest in QDaria vs other quantum startups?',
      answer: 'QDaria\'s unique advantages: (1) Hardware ownership: We OWN Novera QPU (€2.8M invested)—competitors rent cloud access, (2) First-mover: ONLY commercial quantum computer in Norway, 18-month head start, 18.7% Nordic market share, (3) Proven sales: Management Events 406x ROI (€38.4K → €15.6M pipeline), 60 C-suite meetings competitors cannot access, (4) Capital efficiency: 14.6:1 LTV/CAC (industry: 6:1), 6.2-month payback (industry: 12), (5) European advantage: GDPR data sovereignty moat vs US competitors. Top 5 European quantum startup (Startup Genome).',
      supportingData: [
        { label: 'Hardware Moat', value: '€2.8M Novera QPU ownership', icon: <Cpu className="w-4 h-4" /> },
        { label: 'Market Position', value: 'Only Nordic commercial QPU', icon: <Award className="w-4 h-4" /> },
        { label: 'Capital Efficiency', value: '14.6:1 LTV/CAC, 6.2mo payback', icon: <BarChart3 className="w-4 h-4" /> }
      ],
      relatedSlides: ['Competitive', 'Financials', 'Traction']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" />, count: faqs.length },
    { id: 'technical', label: 'Technical', icon: <Cpu className="w-4 h-4" />, count: faqs.filter(f => f.category === 'technical').length },
    { id: 'business', label: 'Business', icon: <DollarSign className="w-4 h-4" />, count: faqs.filter(f => f.category === 'business').length },
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" />, count: faqs.filter(f => f.category === 'team').length },
    { id: 'market', label: 'Market', icon: <TrendingUp className="w-4 h-4" />, count: faqs.filter(f => f.category === 'market').length },
    { id: 'risks', label: 'Risks & Exit', icon: <AlertCircle className="w-4 h-4" />, count: faqs.filter(f => f.category === 'risks').length }
  ];

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
      case 'business': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'team': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'market': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'risks': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-slate-400 font-light border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">Investor FAQ</h1>
        <p className="text-2xl text-slate-400 font-light mt-4">
          Comprehensive Answers to Common Investment Questions
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            {faqs.length} Questions Answered
          </Badge>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/50 text-lg px-4 py-2">
            <Target className="w-5 h-5 mr-2" />
            Data-Backed Insights
          </Badge>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="qdaria-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="qdaria-tab flex items-center gap-2"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
              <Badge className="ml-1 bg-cyan-500/20 text-cyan-300 border-cyan-500/50 text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {filteredFAQs.length === 0 ? (
            <Card className="qdaria-card p-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-slate-400 font-light">No questions found matching your search.</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or browse all categories.</p>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="qdaria-card border-2 border-cyan-400/20 hover:border-cyan-400/40 transition-all"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-start gap-4 text-left w-full">
                      <HelpCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getCategoryBadgeColor(faq.category)}>
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-white pr-8">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-10 space-y-4">
                      {/* Answer */}
                      <div className="prose prose-invert max-w-none">
                        <p className="text-slate-400 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>

                      {/* Supporting Data */}
                      {faq.supportingData && faq.supportingData.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          {faq.supportingData.map((data, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {data.icon && <div className="text-cyan-400">{data.icon}</div>}
                                <span className="text-sm text-gray-400">{data.label}</span>
                              </div>
                              <div className="text-lg font-semibold text-cyan-300">
                                {data.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related Slides */}
                      {faq.relatedSlides && faq.relatedSlides.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                            <ArrowRight className="w-4 h-4" />
                            <span>See also:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {faq.relatedSlides.map((slide, idx) => (
                              <Badge
                                key={idx}
                                className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 cursor-pointer"
                              >
                                {slide}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="qdaria-card p-6 text-center">
          <Cpu className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-sm text-slate-400 font-light">Technical FAQs</div>
        </Card>
        <Card className="qdaria-card p-6 text-center">
          <DollarSign className="w-8 h-8 mx-auto text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">5</div>
          <div className="text-sm text-slate-400 font-light">Business FAQs</div>
        </Card>
        <Card className="qdaria-card p-6 text-center">
          <Users className="w-8 h-8 mx-auto text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">2</div>
          <div className="text-sm text-slate-400 font-light">Team FAQs</div>
        </Card>
        <Card className="qdaria-card p-6 text-center">
          <TrendingUp className="w-8 h-8 mx-auto text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white">6</div>
          <div className="text-sm text-slate-400 font-light">Total Categories</div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="qdaria-card border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Have More Questions?
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Our team is ready to provide additional details on any aspect of QDaria's technology, business model, or market opportunity.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Badge className="qdaria-badge text-lg px-6 py-3 cursor-pointer hover:scale-105 transition-transform">
              <Users className="w-5 h-5 mr-2" />
              Schedule Due Diligence Call
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/50 text-lg px-6 py-3 cursor-pointer hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 mr-2" />
              Request Data Room Access
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorFAQSlide;
