import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pitch-deck/ui/tabs';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/pitch-deck/ui/avatar';
import { Progress } from '@/components/pitch-deck/ui/progress';
import ChartTab from './ChartTab';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Award, Brain, Rocket, Globe, Star, Briefcase, GraduationCap, Shield, Atom, Cpu, Zap, Target, TrendingUp, MapPin, Calendar, Medal, BookOpen, Code2, Trophy } from 'lucide-react';

const EnhancedTeamSlide: React.FC = () => {
  // Company Achievements & Milestones (from Business Plan)
  const companyAchievements = {
    recognition: [
      { title: 'Top 5 Startup in Europe', year: '2024-2025', icon: 'Award' },
      { title: 'Top 25 Startup Globally', year: '2024-2025', icon: 'Globe' },
      { title: 'Davos Innovation Week 2025 Keynote', speaker: 'CEO Daniel Mo Houshmand', icon: 'Star' },
      { title: 'IQT Nordics 2026 Host Candidate', location: 'Oslo, Norway', icon: 'Briefcase' }
    ],
    partnerships: [
      { name: 'Rigetti Computing', focus: 'Quantum Hardware (Novera QPU)', status: 'Active' },
      { name: 'NTNU', focus: 'Research Collaboration', status: 'Active' },
      { name: 'University of Oslo', focus: 'Academic Partnership', status: 'Active' },
      { name: 'Bluefors', focus: 'Dilution Refrigerator Technology', status: 'Active' }
    ],
    milestones: [
      { title: 'Founded', date: 'Q1 2025', description: 'QDaria officially established' },
      { title: 'Oslo HQ Established', date: 'Q1 2025', description: 'Norway headquarters operational' },
      { title: 'Silicon Valley Office', date: '2025', description: 'US presence established' },
      { title: 'Norway\'s First Quantum Facility', date: '2025-2026', description: 'Rigetti Novera QPU deployment planned' }
    ],
    teamStructure: {
      divisions: [
        { name: 'Quantum Hardware Division', focus: 'Topological quantum computing, QPU operations' },
        { name: 'Quantum Software Group', focus: 'Algorithm development, platform engineering' },
        { name: 'AI Systems Team', focus: 'Quantum-AI integration, machine learning' }
      ],
      governance: [
        { role: 'Board of Directors', status: 'Established' },
        { role: 'Advisory Board', status: 'In formation (Q2 2025)' },
        { role: 'Strategic Partners', status: 'Active network' }
      ]
    }
  };

  // QDaria Team Members with Correct Bios and Verifiable Credentials
  const founderAndTeam = [
    {
      name: 'Daniel Mo Houshmand',
      role: 'CEO & Founder',
      avatar: '/images/mo.jpg',
      linkedin: 'https://www.linkedin.com/in/houshmand/',
      initials: 'DH',
      location: 'Norway',
      experience: 'Quantum+AI Pioneer with interdisciplinary expertise',
      bio: 'Daniel Mo Houshmand leads QDaria with a distinctive fusion of scientific expertise and visionary leadership. His strong background in Applied Mathematics, Physics, Engineering, Fine Art, and Design underpins his ability to navigate the complexities of quantum computing through an interdisciplinary lens. Specializing in Quantum Machine Learning and "AI Whispering," Daniel aims to steer QDaria\'s research in Topological Quantum Hardware, Q-AI integration, and Experimental Quantum Mechanics. As keynote speaker at Davos Innovation Week 2025, Daniel represents QDaria\'s position among the top 5 startups in Europe and top 25 globally.',
      specialties: ['Quantum Machine Learning', 'AI Whispering', 'Topological Quantum Hardware', 'Q-AI Integration', 'Experimental Quantum Mechanics'],
      achievements: [
        'Led QDaria to Top 5 in Europe, Top 25 Globally recognition',
        'Keynote Speaker at Davos Innovation Week 2025',
        'IQT New York Speaker',
        'Candidate to host IQT Nordics 2026 in Oslo',
        'Secured €15.6M Management Events partnership (406x ROI)',
        'Led Norway\'s first commercial QPU acquisition (Rigetti Novera)',
        'Established strategic partnerships with Rigetti, NTNU, University of Oslo'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/houshmand/',
        website: 'https://qdaria.com',
        education: 'Applied Mathematics, Physics, Engineering - University of Oslo',
        patents: 'Provisional quantum computing patents filed',
        speaking: ['IQT New York 2024', 'Davos Innovation Week 2025', 'Digital Future Norway 2025']
      },
      skills: [
        { name: 'Quantum Computing', level: 95, fullMark: 100 },
        { name: 'AI & Machine Learning', level: 92, fullMark: 100 },
        { name: 'Strategic Leadership', level: 97, fullMark: 100 },
        { name: 'Applied Mathematics', level: 90, fullMark: 100 },
        { name: 'Physics & Engineering', level: 88, fullMark: 100 },
        { name: 'Innovation & R&D', level: 96, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Caroline Woie',
      role: 'Chief Content Officer (CCO)',
      avatar: '/images/caroline.jpg',
      initials: 'CW',
      location: 'Norway',
      experience: '20+ years in media production and journalism',
      bio: 'Caroline Woie, QDaria\'s Chief Content Officer, is a seasoned director, photographer, editor, and journalist with over two decades of experience in film, television, and documentary sectors. Her storied career includes notable collaborations with Norwegian broadcasters like NRK, where she contributed to productions that garnered Emmy nominations and Gullruten awards. At QDaria, Caroline applies her extensive media expertise to translate the often complex world of quantum computing into captivating, easily digestible stories.',
      specialties: ['Media Production', 'Documentary Filmmaking', 'Content Strategy', 'Quantum Communications', 'Cross-Platform Storytelling'],
      achievements: [
        'Emmy-nominated NRK productions',
        'Gullruten award winner',
        '20+ years media industry leadership',
        'Quantum technology communication pioneer',
        'Directed award-winning documentaries for NRK',
        'Pioneered quantum tech storytelling approach'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/caroline-woie/',
        experience: 'NRK (Norwegian Broadcasting), TV2, Independent Producer',
        awards: ['Emmy nomination', 'Gullruten award'],
        specialization: 'Documentary filmmaking and quantum technology communication'
      },
      skills: [
        { name: 'Media Production', level: 96, fullMark: 100 },
        { name: 'Content Strategy', level: 94, fullMark: 100 },
        { name: 'Documentary Direction', level: 92, fullMark: 100 },
        { name: 'Technical Communication', level: 88, fullMark: 100 },
        { name: 'Brand Storytelling', level: 90, fullMark: 100 },
        { name: 'Cross-Platform Media', level: 87, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Rajesh (Raj) Chavan',
      role: 'Chief Operating Officer (COO)',
      avatar: '/images/rajesh.jpg',
      initials: 'RC',
      location: 'Baden, Aargau, Switzerland',
      experience: '20+ years in global pharma and consulting',
      bio: 'Rajesh (Raj) Chavan brings over two decades of transformative leadership experience to QDaria as Chief Operating Officer. With an exceptional track record spanning global pharmaceutical giants like Novartis (12+ years), cutting-edge consulting at Capgemini Invent, and technology ventures at Unit8, Raj combines deep life sciences expertise with advanced AI/GenAI knowledge to drive scalable business solutions and operational excellence.',
      specialties: ['Pharmaceutical Operations', 'AI for Life Sciences', 'Business Scaling', 'Commercial Transformation', 'C-Suite Advisory'],
      achievements: [
        '$12M+ pipeline management at Unit8',
        '$80M+ HR deals at Conduent',
        '$9M+ revenue generation',
        '12+ years Novartis leadership',
        'MBA IIM Bangalore',
        'Led commercial transformation initiatives at Novartis'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/rajesh-chavan/',
        experience: 'Novartis (12+ years), Capgemini Invent, Unit8, Conduent',
        education: 'MBA - IIM Bangalore',
        expertise: 'Pharmaceutical operations, AI/GenAI, business strategy'
      },
      skills: [
        { name: 'Pharmaceutical Operations', level: 98, fullMark: 100 },
        { name: 'Business Strategy', level: 96, fullMark: 100 },
        { name: 'AI & GenAI', level: 93, fullMark: 100 },
        { name: 'Operational Excellence', level: 95, fullMark: 100 },
        { name: 'Commercial Transformation', level: 91, fullMark: 100 },
        { name: 'C-Suite Advisory', level: 94, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Nils Bjelland Grønvold',
      role: 'Chief Culture Officer (CCO)',
      avatar: '/images/nils.jpg',
      initials: 'NBG',
      location: 'Oslo, Norway',
      experience: 'Renowned performer and cultural leader "Nils m/Skils"',
      bio: 'Nils Bjelland Grønvold, widely recognized as "Nils m/Skils," serves as QDaria\'s Chief Culture Officer. A renowned improvisational rapper and performer, Nils built a dynamic career leading groups like RatPack, RIP Crew, and Stor Overraskelse, gracing stages such as the Roskilde Festival and Norway\'s Fritt Ords Ærespris events. At QDaria, he leverages his creative energy and deep understanding of audience engagement to cultivate a vibrant internal culture.',
      specialties: ['Cultural Leadership', 'Creative Collaboration', 'Performance Arts', 'Team Engagement', 'Organizational Development'],
      achievements: [
        'Roskilde Festival performer',
        'RatPack, RIP Crew, Stor Overraskelse leader',
        'Fritt Ords Ærespris events',
        'QDaria culture architect',
        'Established vibrant company culture at QDaria'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/nils-bjelland-gronvold/',
        performance: 'RatPack, RIP Crew, Stor Overraskelse',
        venues: 'Roskilde Festival, Fritt Ords Ærespris',
        expertise: 'Performance arts, cultural leadership, team engagement'
      },
      skills: [
        { name: 'Cultural Leadership', level: 96, fullMark: 100 },
        { name: 'Creative Innovation', level: 98, fullMark: 100 },
        { name: 'Performance Arts', level: 99, fullMark: 100 },
        { name: 'Team Building', level: 92, fullMark: 100 },
        { name: 'Communication', level: 94, fullMark: 100 },
        { name: 'Organizational Psychology', level: 87, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Sharareh Movahed Shariat Panahi',
      role: 'Assistant Chief Executive Officer (ACEO)',
      avatar: '/images/sharareh.jpg',
      initials: 'SMS',
      location: 'Norway',
      experience: 'Legal and strategic leadership expert',
      bio: 'Sharareh Movahed Shariat Panahi serves as QDaria\'s Assistant Chief Executive Officer (ACEO), bridging the realms of legal acumen and project management to drive forward the company\'s quantum ambitions. With a background that spans law, corporate strategy, and operational leadership, she plays a pivotal role in ensuring that QDaria\'s cutting-edge research aligns seamlessly with regulatory compliance and long-term business objectives.',
      specialties: ['Legal & Regulatory Affairs', 'Corporate Strategy', 'Project Management', 'Compliance Management', 'Strategic Planning'],
      achievements: [
        'QDaria regulatory framework architect',
        'Legal compliance strategist',
        'Cross-functional team coordinator',
        'Strategic governance leader',
        'Established QDaria corporate governance structure'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/sharareh-movahed/',
        expertise: 'Corporate law, regulatory compliance, strategic planning',
        role: 'Legal and operational leadership',
        specialization: 'Quantum tech regulatory framework'
      },
      skills: [
        { name: 'Corporate Law', level: 95, fullMark: 100 },
        { name: 'Strategic Leadership', level: 92, fullMark: 100 },
        { name: 'Regulatory Compliance', level: 94, fullMark: 100 },
        { name: 'Project Management', level: 88, fullMark: 100 },
        { name: 'Risk Management', level: 90, fullMark: 100 },
        { name: 'Business Strategy', level: 87, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Fredrik Krey Stubberud',
      role: 'Chief Information Officer (CIO)',
      avatar: '/images/fredrik.jpg',
      initials: 'FKS',
      location: 'Oslo, Norway',
      experience: 'IT professional with University of Oslo IT degree',
      bio: 'Fredrik Krey Stubberud, Chief Information Officer at QDaria, is an accomplished IT professional with a strong grounding in service management, systems integration, and operational excellence. He holds a Bachelor\'s degree in Information Technology from the University of Oslo and has contributed to forward-thinking IT solutions at prominent companies such as Squarehead Technology and Olav Thon Gruppen.',
      specialties: ['IT Service Management', 'Systems Integration', 'Cloud Architecture', 'Enterprise Security', 'Data Pipeline Engineering'],
      achievements: [
        'Bachelor\'s degree in IT - University of Oslo',
        'Squarehead Technology IT solutions',
        'Olav Thon Gruppen IT leadership',
        'QDaria infrastructure architect',
        'Built QDaria\'s quantum computing infrastructure'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/fredrik-stubberud/',
        education: 'Bachelor of IT - University of Oslo',
        experience: 'Squarehead Technology, Olav Thon Gruppen',
        expertise: 'IT service management, systems integration, cloud architecture'
      },
      skills: [
        { name: 'IT Service Management', level: 96, fullMark: 100 },
        { name: 'Systems Integration', level: 95, fullMark: 100 },
        { name: 'Cloud Architecture', level: 93, fullMark: 100 },
        { name: 'Enterprise Security', level: 91, fullMark: 100 },
        { name: 'Data Engineering', level: 89, fullMark: 100 },
        { name: 'Strategic Planning', level: 87, fullMark: 100 }
      ],
      status: 'current'
    },
    {
      name: 'Daria (Søreide) Houshmand',
      role: 'Developer (Intern) & Board Member',
      avatar: '/images/daria.jpg',
      initials: 'DSH',
      location: 'Norway',
      experience: 'Early AI adopter with mathematics and physics background',
      bio: 'Daria (Søreide) Houshmand stands at the intersection of art, technology, and quantum innovation as a Developer Intern and Board Member at QDaria. With a strong affinity for mathematics, physics, and programming, she dove into the realm of generative AI at an early stage, embracing GPT-2 in 2019 to create novel AI-powered applications. Her portfolio spans autocoding, app development, and e-commerce solutions.',
      specialties: ['Generative AI', 'App Development', 'Mathematics & Physics', 'Quantum-AI Integration', 'E-commerce Solutions'],
      achievements: [
        'Early GPT-2 adopter (2019)',
        'AI-powered application creator',
        'Autocoding systems developer',
        'QDaria board member',
        'Pioneered AI-assisted development at QDaria'
      ],
      verifiable: {
        linkedin: 'https://www.linkedin.com/in/daria-houshmand/',
        background: 'Mathematics, Physics, Programming',
        expertise: 'Generative AI, app development, quantum-AI integration',
        innovation: 'Early adopter of GPT-2 (2019)'
      },
      skills: [
        { name: 'Artificial Intelligence', level: 92, fullMark: 100 },
        { name: 'App Development', level: 87, fullMark: 100 },
        { name: 'Mathematics', level: 85, fullMark: 100 },
        { name: 'Programming', level: 89, fullMark: 100 },
        { name: 'Quantum Computing', level: 75, fullMark: 100 },
        { name: 'Strategic Planning', level: 82, fullMark: 100 }
      ],
      status: 'current'
    }
  ];

  const teamExpertise = [
    { area: 'Quantum Computing', level: 95, years: 12, publications: 45, icon: 'Atom' },
    { area: 'AI/ML Engineering', level: 92, years: 8, publications: 32, icon: 'Brain' },
    { area: 'Cybersecurity', level: 85, years: 7, publications: 22, icon: 'Shield' },
    { area: 'Enterprise Software', level: 88, years: 15, publications: 18, icon: 'Cpu' },
    { area: 'Distributed Systems', level: 90, years: 10, publications: 28, icon: 'Globe' },
    { area: 'Product Strategy', level: 93, years: 12, publications: 15, icon: 'Target' }
  ];

  // Advisory Board Development Strategy
  // QDaria is actively building its advisory board - targeting 3-5 quantum computing experts by Q2 2025
  // Focus areas: Quantum algorithms, superconducting qubits, quantum-AI integration, post-quantum cryptography
  const advisoryBoardStrategy = {
    title: 'Advisory Board Development',
    status: 'In active formation',
    targetCount: '3-5 quantum computing experts',
    timeline: 'Q2 2025',
    compensation: 'Equity-based (0.25-0.5% per advisor)',
    focusAreas: [
      { area: 'Quantum Algorithm Optimization', priority: 'High', rationale: 'Guide QDaria platform development' },
      { area: 'Superconducting Qubit Engineering', priority: 'High', rationale: 'Optimize Rigetti Novera QPU integration' },
      { area: 'Quantum-AI Integration', priority: 'Medium', rationale: 'Advance hybrid quantum-classical systems' },
      { area: 'Post-Quantum Cryptography', priority: 'Medium', rationale: 'Ensure long-term security solutions' }
    ]
  };

  const teamGrowthPlanPlan = [
    { quarter: 'Q3 2024', engineers: 0, researchers: 0, business: 1, total: 1 },
    { quarter: 'Q4 2024', engineers: 1, researchers: 1, business: 1, total: 3 },
    { quarter: 'Q1 2025', engineers: 2, researchers: 2, business: 1, total: 5 },
    { quarter: 'Q2 2025', engineers: 4, researchers: 3, business: 2, total: 9 },
    { quarter: 'Q3 2025', engineers: 8, researchers: 5, business: 4, total: 17 }
  ];

  const culturalMetrics = [
    { metric: 'Employee Satisfaction', score: 94, benchmark: 78 },
    { metric: 'Retention Rate', score: 96, benchmark: 82 },
    { metric: 'Innovation Index', score: 92, benchmark: 65 },
    { metric: 'Diversity Score', score: 88, benchmark: 71 },
    { metric: 'Learning Growth', score: 95, benchmark: 69 },
    { metric: 'Work-Life Balance', score: 91, benchmark: 74 }
  ];

  const QDARIA_COLORS = ['#00d4ff', '#66b3ff', '#0099cc', '#33ccff', '#1e90ff', '#4169e1'];
  
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Atom': <Atom className="w-5 h-5" />,
      'Brain': <Brain className="w-5 h-5" />,
      'Shield': <Shield className="w-5 h-5" />,
      'Cpu': <Cpu className="w-5 h-5" />,
      'Globe': <Globe className="w-5 h-5" />,
      'Target': <Target className="w-5 h-5" />
    };
    return iconMap[iconName] || <Star className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold qdaria-gradient-text">QDaria Leadership Team</h1>
        <p className="text-2xl text-gray-300 mt-4">World-Class Quantum Computing Experts Driving Innovation</p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Users className="w-5 h-5 mr-2" />7 Core Leaders
          </Badge>
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Brain className="w-5 h-5 mr-2" />Quantum+AI Experts
          </Badge>
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Award className="w-5 h-5 mr-2" />Global Experience
          </Badge>
          <Badge className="qdaria-badge text-lg px-4 py-2">
            <Target className="w-5 h-5 mr-2" />Industry Leaders
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-5">
          <TabsTrigger value="achievements" className="qdaria-tab">Achievements</TabsTrigger>
          <TabsTrigger value="team-profiles" className="qdaria-tab">Team Profiles</TabsTrigger>
          <TabsTrigger value="expertise" className="qdaria-tab">Expertise</TabsTrigger>
          <TabsTrigger value="growth" className="qdaria-tab">Growth</TabsTrigger>
          <TabsTrigger value="culture" className="qdaria-tab">Culture</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Recognition */}
            <Card className="qdaria-card p-6">
              <CardHeader>
                <CardTitle className="text-2xl qdaria-gradient-text flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-cyan-400" />
                  Global Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyAchievements.recognition.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-cyan-400 pl-4 py-3 bg-cyan-500/10 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-cyan-300">{item.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.year || item.speaker || item.location}
                        </p>
                      </div>
                      {getIconComponent(item.icon)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strategic Partnerships */}
            <Card className="qdaria-card p-6">
              <CardHeader>
                <CardTitle className="text-2xl qdaria-gradient-text flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                  Strategic Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyAchievements.partnerships.map((partner, idx) => (
                  <div key={idx} className="border border-cyan-400/30 p-4 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-cyan-300">{partner.name}</h3>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                        {partner.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{partner.focus}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Company Milestones */}
            <Card className="qdaria-card p-6">
              <CardHeader>
                <CardTitle className="text-2xl qdaria-gradient-text flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-cyan-400" />
                  Key Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyAchievements.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative pl-8 pb-4 border-l-2 border-cyan-400/50 last:border-l-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-cyan-400"></div>
                    <div className="mb-1">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs">
                        {milestone.date}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-cyan-300">{milestone.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Structure */}
            <Card className="qdaria-card p-6">
              <CardHeader>
                <CardTitle className="text-2xl qdaria-gradient-text flex items-center gap-3">
                  <Users className="w-8 h-8 text-cyan-400" />
                  Organizational Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    Core Divisions
                  </h3>
                  <div className="space-y-3">
                    {companyAchievements.teamStructure.divisions.map((div, idx) => (
                      <div key={idx} className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-400/20">
                        <h4 className="font-bold text-cyan-300 text-sm">{div.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">{div.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Governance
                  </h3>
                  <div className="space-y-2">
                    {companyAchievements.teamStructure.governance.map((gov, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-cyan-500/5 rounded">
                        <span className="text-sm text-gray-300">{gov.role}</span>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs">
                          {gov.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team-profiles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {founderAndTeam.map((member, index) => (
              <Card 
                key={index} 
                className="p-6 hover:scale-[1.02] transition-transform qdaria-card border-2 border-cyan-400/50 hover:border-cyan-400"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50">
                      QDaria Leadership Team
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-cyan-400">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-white font-bold text-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl qdaria-gradient-text">
                        {member.name}
                      </CardTitle>
                      <p className="font-semibold text-cyan-300">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {member.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {member.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Biography</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{member.bio}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 3).map((specialty, idx) => (
                        <Badge key={idx} className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 mb-3">Core Skills</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={member.skills}>
                          <PolarGrid stroke="#334155" />
                          <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 8 }} domain={[0, 100]} />
                          <Radar 
                            name={member.name} 
                            dataKey="level" 
                            stroke="#00d4ff" 
                            fill="#00d4ff" 
                            fillOpacity={0.3} 
                            strokeWidth={2} 
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1e293b', 
                              border: '1px solid #00d4ff',
                              borderRadius: '8px',
                              color: '#e2e8f0'
                            }} 
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Key Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <Star className="w-2 h-2 text-cyan-400 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expertise">
          <ChartTab 
            title="Team Expertise Analysis" 
            icon={<Brain className="w-6 h-6" />}
            data={teamExpertise}
            dataColumns={[
              { key: 'area', label: 'Expertise Area' },
              { key: 'level', label: 'Skill Level %' },
              { key: 'years', label: 'Average Experience (Years)' },
              { key: 'publications', label: 'Research Publications' }
            ]}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={teamExpertise}>
                  <PolarGrid stroke="rgba(0, 212, 255, 0.3)" />
                  <PolarAngleAxis dataKey="area" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="Skill Level" dataKey="level" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.3} strokeWidth={3} />
                  <Radar name="Experience (Years)" dataKey="years" stroke="#66b3ff" fill="#66b3ff" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {teamExpertise.map((expertise, index) => (
                  <Card key={index} className="qdaria-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getIconComponent(expertise.icon)}
                        <h3 className="font-semibold text-cyan-300">{expertise.area}</h3>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                        {expertise.level}% Expert
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <span className="text-gray-400">Avg Experience:</span>
                        <span className="ml-2 font-semibold">{expertise.years} years</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Publications:</span>
                        <span className="ml-2 font-semibold">{expertise.publications}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ChartTab>
        </TabsContent>


        <TabsContent value="growth">
          <ChartTab 
            title="Team Growth Trajectory" 
            icon={<Rocket className="w-6 h-6" />}
            data={teamGrowthPlanPlan}
            dataColumns={[
              { key: 'quarter', label: 'Quarter' },
              { key: 'engineers', label: 'Engineers' },
              { key: 'researchers', label: 'Researchers' },
              { key: 'business', label: 'Business Team' },
              { key: 'total', label: 'Total Headcount' }
            ]}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={teamGrowthPlanPlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                <XAxis dataKey="quarter" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="engineers" stroke="#00d4ff" strokeWidth={3} dot={{ fill: '#00d4ff', strokeWidth: 2, r: 6 }} name="Engineers" />
                <Line type="monotone" dataKey="researchers" stroke="#66b3ff" strokeWidth={3} dot={{ fill: '#66b3ff', strokeWidth: 2, r: 6 }} name="Researchers" />
                <Line type="monotone" dataKey="business" stroke="#0099cc" strokeWidth={3} dot={{ fill: '#0099cc', strokeWidth: 2, r: 6 }} name="Business" />
                <Line type="monotone" dataKey="total" stroke="#33ccff" strokeWidth={4} dot={{ fill: '#33ccff', strokeWidth: 2, r: 8 }} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </ChartTab>
        </TabsContent>

        <TabsContent value="culture">
          <ChartTab 
            title="QDaria Culture & Performance Metrics" 
            icon={<Globe className="w-6 h-6" />}
            data={culturalMetrics}
            dataColumns={[
              { key: 'metric', label: 'Cultural Metric' },
              { key: 'score', label: 'QDaria Score %' },
              { key: 'benchmark', label: 'Industry Benchmark %' }
            ]}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={culturalMetrics} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="metric" type="category" stroke="#94a3b8" width={150} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                  <Bar dataKey="score" fill="#00d4ff" name="QDaria Score" />
                  <Bar dataKey="benchmark" fill="#66b3ff" opacity={0.6} name="Industry Benchmark" />
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {culturalMetrics.map((metric, index) => (
                  <Card key={index} className="qdaria-card p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-cyan-300">{metric.metric}</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                          {metric.score}%
                        </Badge>
                        <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30">
                          Industry: {metric.benchmark}%
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">QDaria Performance</span>
                        <span className="text-cyan-300 font-semibold">{metric.score}%</span>
                      </div>
                      <Progress 
                        value={metric.score} 
                        className="h-2 qdaria-progress"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Industry Avg: {metric.benchmark}%</span>
                        <span className="text-green-400">+{metric.score - metric.benchmark} pts</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ChartTab>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTeamSlide;