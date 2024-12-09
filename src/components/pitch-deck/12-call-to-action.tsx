'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const CallToActionSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 12;

  const investmentHighlights = [
    {
      title: "Market Opportunity",
      value: "$115B",
      description: "Projected market size by 2030"
    },
    {
      title: "Technology Edge",
      value: "99.99%",
      description: "Error protection through topological qubits"
    },
    {
      title: "Growth Potential",
      value: "100x",
      description: "Revenue growth over next 5 years"
    },
    {
      title: "IP Portfolio",
      value: "12",
      description: "Patents filed for core technology"
    }
  ];

  const nextSteps = [
    {
      title: "Schedule Deep Dive",
      description: "Technical demonstration and detailed roadmap discussion"
    },
    {
      title: "Due Diligence",
      description: "Access to data room and technical documentation"
    },
    {
      title: "Partnership Discussion",
      description: "Explore strategic collaboration opportunities"
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
          className="text-4xl font-bold text-teal-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          Join the Quantum Revolution
        </motion.h2>

        <motion.p
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Partner with QDaria to revolutionize quantum computing through topological protection and unlock unprecedented computational capabilities.
        </motion.p>

        {/* Investment Highlights */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Investment Highlights</h3>
          <div className="grid grid-cols-4 gap-6">
            {investmentHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
              >
                <div className="text-3xl font-bold text-teal-400 mb-2">{highlight.value}</div>
                <div className="text-blue-300 font-semibold mb-2">{highlight.title}</div>
                <p className="text-gray-300 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment Terms */}
        <motion.div
          className="w-full max-w-6xl mb-12 bg-purple-900/50 p-8 rounded-lg border border-purple-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Investment Terms</h3>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-teal-400 mb-2">$50M</div>
              <div className="text-blue-300">Series A Round</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-400 mb-2">15%</div>
              <div className="text-blue-300">Equity Offered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-400 mb-2">$333M</div>
              <div className="text-blue-300">Post-Money Valuation</div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Next Steps</h3>
          <div className="grid grid-cols-3 gap-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.2 + (index * 0.1) }}
              >
                <div className="text-xl font-semibold text-teal-400 mb-2">{step.title}</div>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-2xl font-bold text-teal-400 mb-2">Contact Us</div>
          <div className="text-blue-300">Daniel Mo Houshmand, CEO</div>
          <div className="text-gray-300">mo@qdaria.com</div>
        </motion.div>
      </div>
    </Card>
  );
};

export default CallToActionSlide;
