'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';
import ComparisonTable from './ComparisonTable';

const CompetitionSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 7;

  const advantages = [
    {
      title: "Topological Protection",
      description: "Our unique approach provides inherent error protection through topology, eliminating the need for complex error correction schemes.",
      impact: "99.99% error protection"
    },
    {
      title: "Scalability",
      description: "Fibonacci anyons enable reliable scaling to hundreds of logical qubits through modular architecture.",
      impact: "100+ logical qubits"
    },
    {
      title: "Operating Conditions",
      description: "Advanced materials engineering allows operation at higher temperatures than competitors.",
      impact: "4K vs 15mK operation"
    },
    {
      title: "Universal Computation",
      description: "Native support for both quantum and classical operations through braiding operations.",
      impact: "Complete quantum toolkit"
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
          Competitive Landscape
        </motion.h2>

        {/* Comparison Table */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ComparisonTable />
        </motion.div>

        {/* Competitive Advantages */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Our Competitive Advantages</h3>
          <div className="grid grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index % 2 === 0 ? -20 : 20) }}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-3">{advantage.title}</h4>
                <p className="text-gray-300 mb-3">{advantage.description}</p>
                <div className="flex items-center">
                  <span className="text-blue-300 font-semibold">Impact:</span>
                  <span className="ml-2 text-gray-300">{advantage.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Position */}
        <motion.div
          className="mt-8 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-xl text-gray-300">
            QDaria's unique approach to quantum computing through topological protection positions us as the leader in stable, scalable quantum computation, addressing the fundamental challenges that limit our competitors.
          </p>
        </motion.div>
      </div>
    </Card>
  );
};

export default CompetitionSlide;
