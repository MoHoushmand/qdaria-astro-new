import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import ChartTab from '../ChartTab';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Award, Brain, Rocket, Globe, Star, MapPin, Calendar } from 'lucide-react';

const EnhancedTeamSlideClient: React.FC = () => {
  // QDaria Team Members with Correct Bios
  const founderAndTeam = [
    {
      name: 'Daniel Mo Houshmand',
      role: 'CEO & Founder',
      avatar: '/images/team/mo.jpg',
      initials: 'DH',
      location: 'Norway',
      experience: 'Quantum+AI Pioneer with interdisciplinary expertise',
      bio: 'Daniel Mo Houshmand leads QDaria with a distinctive fusion of scientific expertise and visionary leadership. His strong background in Applied Mathematics, Physics, Engineering, Fine Art, and Design underpins his ability to navigate the complexities of quantum computing through an interdisciplinary lens. Specializing in Quantum Machine Learning and "AI Whispering," Daniel aims to steer QDaria\'s research in Topological Quantum Hardware, Q-AI integration, and Experimental Quantum Mechanics.',
      specialties: ['Quantum Machine Learning', 'AI Whispering', 'Topological Quantum Hardware', 'Q-AI Integration', 'Experimental Quantum Mechanics'],
      achievements: ['QDaria among top 25 startups worldwide (top 5 in Europe)', 'Global Impact Award Nominee', 'IQT New York Speaker', 'Davos Innovation Week 2025 Speaker'],
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
      avatar: '/images/team/caroline.jpg',
      initials: 'CW',
      location: 'Norway',
      experience: '20+ years in media production and journalism',
      bio: 'Caroline Woie, QDaria\'s Chief Content Officer, is a seasoned director, photographer, editor, and journalist with over two decades of experience in film, television, and documentary sectors. Her storied career includes notable collaborations with Norwegian broadcasters like NRK, where she contributed to productions that garnered Emmy nominations and Gullruten awards. At QDaria, Caroline applies her extensive media expertise to translate the often complex world of quantum computing into captivating, easily digestible stories.',
      specialties: ['Media Production', 'Documentary Filmmaking', 'Content Strategy', 'Quantum Communications', 'Cross-Platform Storytelling'],
      achievements: ['Emmy-nominated NRK productions', 'Gullruten award winner', '20+ years media industry leadership', 'Quantum technology communication pioneer'],
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
      avatar: '/images/team/rajesh.jpg',
      initials: 'RC',
      location: 'Baden, Aargau, Switzerland',
      experience: '20+ years in global pharma and consulting',
      bio: 'Rajesh (Raj) Chavan brings over two decades of transformative leadership experience to QDaria as Chief Operating Officer. With an exceptional track record spanning global pharmaceutical giants like Novartis (12+ years), cutting-edge consulting at Capgemini Invent, and technology ventures at Unit8, Raj combines deep life sciences expertise with advanced AI/GenAI knowledge to drive scalable business solutions and operational excellence.',
      specialties: ['Pharmaceutical Operations', 'AI for Life Sciences', 'Business Scaling', 'Commercial Transformation', 'C-Suite Advisory'],
      achievements: ['$12M+ pipeline management at Unit8', '$80M+ HR deals at Conduent', '$9M+ revenue generation', '12+ years Novartis leadership', 'MBA IIM Bangalore'],
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
      avatar: '/images/team/nils.jpg',
      initials: 'NBG',
      location: 'Oslo, Norway',
      experience: 'Renowned performer and cultural leader "Nils m/Skils"',
      bio: 'Nils Bjelland Grønvold, widely recognized as "Nils m/Skils," serves as QDaria\'s Chief Culture Officer. A renowned improvisational rapper and performer, Nils built a dynamic career leading groups like RatPack, RIP Crew, and Stor Overraskelse, gracing stages such as the Roskilde Festival and Norway\'s Fritt Ords Ærespris events. At QDaria, he leverages his creative energy and deep understanding of audience engagement to cultivate a vibrant internal culture.',
      specialties: ['Cultural Leadership', 'Creative Collaboration', 'Performance Arts', 'Team Engagement', 'Organizational Development'],
      achievements: ['Roskilde Festival performer', 'RatPack, RIP Crew, Stor Overraskelse leader', 'Fritt Ords Ærespris events', 'QDaria culture architect'],
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
      avatar: '/images/team/sharareh.jpg',
      initials: 'SMS',
      location: 'Norway',
      experience: 'Legal and strategic leadership expert',
      bio: 'Sharareh Movahed Shariat Panahi serves as QDaria\'s Assistant Chief Executive Officer (ACEO), bridging the realms of legal acumen and project management to drive forward the company\'s quantum ambitions. With a background that spans law, corporate strategy, and operational leadership, she plays a pivotal role in ensuring that QDaria\'s cutting-edge research aligns seamlessly with regulatory compliance and long-term business objectives.',
      specialties: ['Legal & Regulatory Affairs', 'Corporate Strategy', 'Project Management', 'Compliance Management', 'Strategic Planning'],
      achievements: ['QDaria regulatory framework architect', 'Legal compliance strategist', 'Cross-functional team coordinator', 'Strategic governance leader'],
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
      avatar: '/images/team/fredrik.jpg',
      initials: 'FKS',
      location: 'Oslo, Norway',
      experience: 'IT professional with University of Oslo IT degree',
      bio: 'Fredrik Krey Stubberud, Chief Information Officer at QDaria, is an accomplished IT professional with a strong grounding in service management, systems integration, and operational excellence. He holds a Bachelor\'s degree in Information Technology from the University of Oslo and has contributed to forward-thinking IT solutions at prominent companies such as Squarehead Technology and Olav Thon Gruppen.',
      specialties: ['IT Service Management', 'Systems Integration', 'Cloud Architecture', 'Enterprise Security', 'Data Pipeline Engineering'],
      achievements: ['University of Oslo IT degree', 'Squarehead Technology experience', 'Olav Thon Gruppen leadership', 'QDaria infrastructure architect'],
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
      avatar: '/images/team/daria.jpg',
      initials: 'DSH',
      location: 'Norway',
      experience: 'Early AI adopter with mathematics and physics background',
      bio: 'Daria (Søreide) Houshmand stands at the intersection of art, technology, and quantum innovation as a Developer Intern and Board Member at QDaria. With a strong affinity for mathematics, physics, and programming, she dove into the realm of generative AI at an early stage, embracing GPT-2 in 2019 to create novel AI-powered applications. Her portfolio spans autocoding, app development, and e-commerce solutions.',
      specialties: ['Generative AI', 'App Development', 'Mathematics & Physics', 'Quantum-AI Integration', 'E-commerce Solutions'],
      achievements: ['Early GPT-2 adopter (2019)', 'AI-powered application creator', 'Autocoding systems developer', 'QDaria board member'],
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

  // Advisory Board removed - only verified team members are displayed
  // QDaria is building its advisory board with quantum computing experts by Q2 2025

  const teamGrowthPlan = [
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
        </div>
      </div>

      <Tabs defaultValue="team-profiles" className="w-full">
        <TabsList className="qdaria-tabs-list grid w-full grid-cols-4">
          <TabsTrigger value="team-profiles" className="qdaria-tab">Team Profiles</TabsTrigger>
          <TabsTrigger value="expertise" className="qdaria-tab">Expertise</TabsTrigger>
          <TabsTrigger value="growth" className="qdaria-tab">Growth</TabsTrigger>
          <TabsTrigger value="culture" className="qdaria-tab">Culture</TabsTrigger>
        </TabsList>

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
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                Team Expertise Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={teamExpertise}>
                  <PolarGrid stroke="rgba(0, 212, 255, 0.3)" />
                  <PolarAngleAxis dataKey="area" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="Skill Level" dataKey="level" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.3} strokeWidth={3} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px', color: '#e2e8f0' }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="growth">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-cyan-400" />
                Team Growth Trajectory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={teamGrowthPlan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                  <XAxis dataKey="quarter" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="total" stroke="#00d4ff" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture">
          <Card className="qdaria-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-cyan-400" />
                QDaria Culture & Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={culturalMetrics} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="metric" type="category" stroke="#94a3b8" width={150} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0f1c', border: '2px solid #00d4ff', borderRadius: '8px' }} />
                  <Bar dataKey="score" fill="#00d4ff" name="QDaria Score" />
                  <Bar dataKey="benchmark" fill="#66b3ff" opacity={0.6} name="Industry Benchmark" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTeamSlideClient;