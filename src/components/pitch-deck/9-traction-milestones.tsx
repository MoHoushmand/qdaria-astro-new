'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const TractionMilestonesSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 9;

  const achievements = [
    {
      title: "Technical Milestones",
      items: [
        "Successfully demonstrated topological qubit stability",
        "Achieved 99.99% error protection in lab tests",
        "Developed scalable anyon braiding control system",
        "Filed 12 patents for core technology"
      ]
    },
    {
      title: "Partnerships",
      items: [
        "Strategic partnership with BlueFors for hardware integration",
        "Research collaboration with ETH Zürich",
        "Joint development agreement with QM9",
        "Cloud infrastructure partnership with major tech company"
      ]
    }
  ];

  const timeline = [
    {
      date: "Q2 2023",
      milestone: "Proof of Concept",
      description: "Demonstrated first stable Fibonacci anyon qubit"
    },
    {
      date: "Q4 2023",
      milestone: "Seed Funding",
      description: "$5M raised from leading quantum investors"
    },
    {
      date: "Q1 2024",
      milestone: "Alpha Release",
      description: "First quantum development kit for partners"
    },
    {
      date: "Q3 2024",
      milestone: "Beta Platform",
      description: "Cloud access for select enterprise clients"
    },
    {
      date: "Q1 2025",
      milestone: "Commercial Launch",
      description: "Full platform availability and SDK release"
    }
  ];

  const metrics = [
    {
      label: "Patents Filed",
      value: "12",
      growth: "+4 this year"
    },
    {
      label: "Research Partners",
      value: "8",
      growth: "Global institutions"
    },
    {
      label: "Beta Users",
      value: "25+",
      growth: "Enterprise clients"
    },
    {
      label: "Team Size",
      value: "45",
      growth: "15 PhDs"
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
          Traction & Milestones
        </motion.h2>

        {/* Key Metrics */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <div className="text-3xl font-bold text-teal-400 mb-2">{metric.value}</div>
                <div className="text-blue-300 font-semibold mb-1">{metric.label}</div>
                <div className="text-gray-400 text-sm">{metric.growth}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index === 0 ? -20 : 20) }}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-4">{achievement.title}</h3>
                <ul className="space-y-2">
                  {achievement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Development Timeline</h3>
          <div className="grid grid-cols-5 gap-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.date}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.2 + (index * 0.1) }}
              >
                <div className="bg-purple-900/50 p-4 rounded-lg border border-purple-600">
                  <div className="text-teal-400 font-semibold mb-2">{item.date}</div>
                  <div className="text-blue-300 font-semibold mb-1">{item.milestone}</div>
                  <div className="text-gray-300 text-sm">{item.description}</div>
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute top-1/2 right-0 w-full h-0.5 bg-purple-600 transform translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default TractionMilestonesSlide;
