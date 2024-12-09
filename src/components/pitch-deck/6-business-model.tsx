'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const BusinessModelSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 6;

  const revenueStreams = [
    {
      name: "Quantum Computing as a Service (QCaaS)",
      description: "Cloud-based access to our quantum computing platform",
      pricing: "Usage-based pricing with enterprise subscriptions",
      target: "Fortune 500 companies and research institutions"
    },
    {
      name: "Development Tools & SDK",
      description: "Professional quantum development toolkit and API access",
      pricing: "Annual licensing with tiered pricing",
      target: "Software developers and quantum researchers"
    },
    {
      name: "Consulting Services",
      description: "Expert guidance for quantum application development",
      pricing: "Project-based and retainer options",
      target: "Enterprise clients and government agencies"
    },
    {
      name: "Hardware Licensing",
      description: "Licensing of our topological quantum technology",
      pricing: "Long-term partnership agreements",
      target: "Quantum hardware manufacturers"
    }
  ];

  const goToMarket = [
    {
      phase: "Phase 1: Early Access",
      timeline: "2024",
      activities: [
        "Partner with key research institutions",
        "Beta testing with select enterprises",
        "Developer community building"
      ]
    },
    {
      phase: "Phase 2: Market Entry",
      timeline: "2025",
      activities: [
        "Launch QCaaS platform",
        "Release SDK and development tools",
        "Establish strategic partnerships"
      ]
    },
    {
      phase: "Phase 3: Expansion",
      timeline: "2026",
      activities: [
        "Global market expansion",
        "Industry-specific solutions",
        "Hardware licensing program"
      ]
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
          Business Model
        </motion.h2>

        {/* Revenue Streams */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Revenue Streams</h3>
          <div className="grid grid-cols-2 gap-6">
            {revenueStreams.map((stream, index) => (
              <motion.div
                key={stream.name}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index % 2 === 0 ? -20 : 20) }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-3">{stream.name}</h4>
                <p className="text-gray-300 mb-3">{stream.description}</p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-blue-300 font-semibold mr-2">Pricing:</span>
                    <span className="text-gray-300">{stream.pricing}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-300 font-semibold mr-2">Target:</span>
                    <span className="text-gray-300">{stream.target}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Go-to-Market Strategy */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Go-to-Market Strategy</h3>
          <div className="grid grid-cols-3 gap-6">
            {goToMarket.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-2">{phase.phase}</h4>
                <div className="text-blue-300 mb-3">{phase.timeline}</div>
                <ul className="space-y-2">
                  {phase.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span className="text-gray-300">{activity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default BusinessModelSlide;
