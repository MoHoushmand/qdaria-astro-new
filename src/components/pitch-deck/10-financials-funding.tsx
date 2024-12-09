'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';
import FundingCard from './FundingCard';

const FinancialsFundingSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 10;

  const financialProjections = [
    {
      year: "2024",
      revenue: "$2M",
      customers: "15",
      burn: "$8M",
      milestone: "Alpha Release"
    },
    {
      year: "2025",
      revenue: "$12M",
      customers: "50",
      burn: "$15M",
      milestone: "Commercial Launch"
    },
    {
      year: "2026",
      revenue: "$45M",
      customers: "200",
      burn: "$20M",
      milestone: "International Expansion"
    },
    {
      year: "2027",
      revenue: "$120M",
      customers: "500",
      burn: "$25M",
      milestone: "Full Scale Production"
    }
  ];

  const fundingAllocation = [
    {
      category: "R&D",
      percentage: 40,
      description: "Hardware development and quantum research"
    },
    {
      category: "Engineering",
      percentage: 25,
      description: "Software platform and tools development"
    },
    {
      category: "Operations",
      percentage: 20,
      description: "Infrastructure and facilities"
    },
    {
      category: "Sales & Marketing",
      percentage: 15,
      description: "Market expansion and customer acquisition"
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
          Financials & Funding
        </motion.h2>

        {/* Financial Projections */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Financial Projections</h3>
          <div className="grid grid-cols-4 gap-6">
            {financialProjections.map((projection, index) => (
              <motion.div
                key={projection.year}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <div className="text-2xl font-bold text-teal-400 mb-4">{projection.year}</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-blue-300 font-semibold">{projection.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customers:</span>
                    <span className="text-blue-300 font-semibold">{projection.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Burn Rate:</span>
                    <span className="text-blue-300 font-semibold">{projection.burn}</span>
                  </div>
                  <div className="pt-2 border-t border-purple-600">
                    <span className="text-gray-300 text-sm">{projection.milestone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Funding Card */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <FundingCard 
            title="Series A Funding Round"
            amount={50}
            percentage={100}
            description="Seeking $50M in Series A funding to accelerate product development, expand our team, and scale our quantum computing platform."
          />
        </motion.div>

        {/* Funding Allocation */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Funding Allocation</h3>
          <div className="grid grid-cols-4 gap-6">
            {fundingAllocation.map((item, index) => (
              <motion.div
                key={item.category}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.2 + (index * 0.1) }}
              >
                <div className="text-3xl font-bold text-teal-400 mb-2">{item.percentage}%</div>
                <div className="text-blue-300 font-semibold mb-2">{item.category}</div>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default FinancialsFundingSlide;
