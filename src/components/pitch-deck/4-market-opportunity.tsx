'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';
import MarketSizeCard from './MarketSizeCard';
import GrowthTrajectoryChart from './GrowthTrajectoryChart';

const MarketOpportunitySlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 4;

  const marketSegments = [
    {
      name: "Pharmaceutical R&D",
      value: "40%",
      description: "Drug discovery and molecular simulation"
    },
    {
      name: "Financial Services",
      value: "25%",
      description: "Portfolio optimization and risk analysis"
    },
    {
      name: "Cybersecurity",
      value: "20%",
      description: "Post-quantum cryptography and secure communications"
    },
    {
      name: "Industrial",
      value: "15%",
      description: "Supply chain and logistics optimization"
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
          Market Opportunity
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 w-full max-w-6xl mb-8">
          {/* Market Size Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MarketSizeCard />
          </motion.div>

          {/* Growth Trajectory Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GrowthTrajectoryChart />
          </motion.div>
        </div>

        {/* Market Segments */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Target Market Segments</h3>
          <div className="grid grid-cols-4 gap-6">
            {marketSegments.map((segment, index) => (
              <motion.div
                key={segment.name}
                className="bg-purple-900/50 p-4 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-2">{segment.name}</h4>
                <div className="text-3xl font-bold mb-2">{segment.value}</div>
                <p className="text-gray-300 text-sm">{segment.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Market Drivers */}
        <motion.div
          className="mt-8 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-xl text-gray-300">
            The quantum computing market is experiencing exponential growth driven by increasing demand for complex problem-solving capabilities in drug discovery, financial modeling, and artificial intelligence.
          </p>
        </motion.div>
      </div>
    </Card>
  );
};

export default MarketOpportunitySlide;
