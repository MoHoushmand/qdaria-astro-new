import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Badge } from '../../pitch-deck/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../pitch-deck/ui/avatar';
import { Users, Award, Briefcase, Globe } from 'lucide-react';
import { MetricCard } from '../cards/MetricCard';
import '../styles/index.css';

export const TeamSlide: React.FC = () => {
  const team = [
    {
      name: 'Daniel Mo Houshmand',
      role: 'CEO & Founder',
      avatar: '/images/mo.jpg',
      initials: 'DH',
      bio: 'Quantum+AI Pioneer with interdisciplinary expertise in Applied Mathematics, Physics, Engineering, and Q-AI integration. Keynote speaker at Davos Innovation Week 2025.',
      achievements: [
        'Top 5 in Europe, Top 25 Globally',
        'Davos Innovation Week 2025 Speaker',
        'IQT New York Speaker'
      ]
    },
    {
      name: 'Caroline Woie',
      role: 'Chief Content Officer',
      avatar: '/images/caroline.jpg',
      initials: 'CW',
      bio: '20+ years in media production and journalism. Emmy-nominated productions and Gullruten award winner.',
      achievements: [
        'Emmy-nominated NRK productions',
        'Gullruten award winner',
        'Quantum tech storytelling pioneer'
      ]
    },
    {
      name: 'Rajesh (Raj) Chavan',
      role: 'Chief Operating Officer',
      avatar: '/images/rajesh.jpg',
      initials: 'RC',
      bio: '20+ years in global pharma and consulting. 12+ years at Novartis with $12M+ pipeline management expertise.',
      achievements: [
        '$12M+ pipeline management',
        '12+ years Novartis leadership',
        'MBA IIM Bangalore'
      ]
    }
  ];

  const achievements = [
    { title: 'Top 5 Startup in Europe', year: '2024-2025', icon: <Award /> },
    { title: 'Top 25 Startup Globally', year: '2024-2025', icon: <Globe /> },
    { title: 'Davos Innovation Week 2025', description: 'Keynote Speaker', icon: <Users /> },
    { title: 'IQT Nordics 2026', description: 'Host Candidate Oslo', icon: <Briefcase /> }
  ];

  return (
    <section className="business-plan-section-professional">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="business-plan-section-header">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="business-plan-h1 business-plan-section-title"
          >
            Leadership Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="business-plan-section-subtitle business-plan-lead"
          >
            World-Class Expertise in Quantum Computing, AI, and Business Scaling
          </motion.p>
        </div>

        {/* Company Achievements */}
        <div className="card-grid-4 mb-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="card-professional text-center h-full">
                <CardContent className="p-6">
                  <div className="text-cyan-400 mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <h3 className="business-plan-h5 mb-2">{achievement.title}</h3>
                  <p className="business-plan-body-sm text-secondary-contrast">
                    {achievement.year || achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          <h2 className="business-plan-h2 text-center mb-8">Executive Leadership</h2>
          <div className="card-grid-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card-professional h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-20 h-20 border-2 border-cyan-400">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-lg">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="business-plan-h4 mb-1">{member.name}</CardTitle>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="business-plan-body text-secondary-contrast leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="space-y-2">
                      <h5 className="business-plan-h6">Key Achievements</h5>
                      <ul className="business-plan-list-sm space-y-2">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">✓</span>
                            <span className="business-plan-body-sm text-secondary-contrast">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-12 card-grid-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <MetricCard
              value="3"
              label="Executive Team"
              description="Deep tech and business expertise"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <MetricCard
              value="50+"
              label="Years Combined Experience"
              description="Quantum, AI, Media, Pharma"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <MetricCard
              value="4"
              label="Strategic Partnerships"
              description="Rigetti, NTNU, UiO, Bluefors"
            />
          </motion.div>
        </div>

        {/* Governance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12"
        >
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="business-plan-h3">Governance & Advisory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="business-plan-h5">Board of Directors</h4>
                  <p className="business-plan-body text-secondary-contrast">
                    Established with strategic oversight
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="business-plan-h5">Advisory Board</h4>
                  <p className="business-plan-body text-secondary-contrast">
                    In formation (Q2 2025)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="business-plan-h5">Strategic Partners</h4>
                  <p className="business-plan-body text-secondary-contrast">
                    Active network of industry leaders
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TeamSlide;
