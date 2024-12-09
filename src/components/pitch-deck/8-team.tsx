'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const TeamSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 8;

  const teamMembers = [
    {
      name: "Daniel Mo Houshmand",
      title: "CEO & Founder",
      expertise: "Applied Mathematics, Physics, Engineering",
      description: "Leading QDaria with expertise in Applied Mathematics, Physics, and Engineering. Spearheading advancements in Topological Quantum Hardware R&D and Q-AI integration."
    },
    {
      name: "Milen Kouylekov",
      title: "Chief AI Research Officer",
      expertise: "Natural Language Processing, Machine Learning",
      description: "Expert in Natural Language Processing and Machine Learning, leading QDaria's AI research initiatives and quantum computing applications."
    },
    {
      name: "Emanuele Lapponi",
      title: "Chief Technology Officer",
      expertise: "Natural Language Processing, Software Architecture",
      description: "PhD in Natural Language Processing, leading QDaria's technological development and quantum computing innovations."
    },
    {
      name: "Caroline Woie",
      title: "Chief Communication Officer",
      expertise: "Media & Communications",
      description: "Award-winning media professional with over 20 years of experience, leading QDaria's communication strategy and media presence."
    },
    {
      name: "Nick Saaf",
      title: "Chief Sales Officer",
      expertise: "Enterprise Sales, Business Development",
      description: "Expert in customer relations and entrepreneurship, driving QDaria's market growth and strategic partnerships in quantum computing."
    },
    {
      name: "John Kristiansen",
      title: "Chief Operating Officer",
      expertise: "Operations Management, Strategy",
      description: "Experienced operations executive with over two decades of leadership, optimizing QDaria's operations and strategic growth."
    }
  ];

  const advisors = [
    {
      name: "Dr. Sarah Chen",
      title: "Scientific Advisor",
      affiliation: "Quantum Research Director, BlueFors",
      expertise: "Quantum Hardware, Cryogenics"
    },
    {
      name: "Prof. Michael Schmidt",
      title: "Technical Advisor",
      affiliation: "Head of Quantum Computing, ETH Zürich",
      expertise: "Quantum Algorithms, Error Correction"
    }
  ];

  return (
    <Card className={cn(
      'w-full h-full bg-gray-900 text-white absolute top-0 left-0',
      'transition-opacity duration-500',
      isActive ? 'opacity-100' : 'opacity-0'
    )}>
      <div className="flex flex-col items-center justify-start min-h-screen p-8 relative">
        <motion.h2
          className="text-4xl font-bold text-teal-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          Our Team
        </motion.h2>

        {/* Leadership Team */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Leadership Team</h3>
          <div className="grid grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-2">{member.name}</h4>
                <div className="text-blue-300 font-semibold mb-2">{member.title}</div>
                <div className="text-gray-400 text-sm mb-3">{member.expertise}</div>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advisory Board */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Advisory Board</h3>
          <div className="grid grid-cols-2 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index === 0 ? -20 : 20) }}
                transition={{ duration: 0.8, delay: 1.2 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-2">{advisor.name}</h4>
                <div className="text-blue-300 font-semibold mb-2">{advisor.title}</div>
                <div className="text-gray-400 mb-2">{advisor.affiliation}</div>
                <div className="text-gray-300 text-sm">{advisor.expertise}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default TeamSlide;
