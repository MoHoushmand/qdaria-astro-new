'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import D3Visualization from './D3Visualization';

interface MarketStat {
  label: string;
  value: string;
  growth: string;
}

const marketStats: MarketStat[] = [
  {
    label: "Global Quantum Computing Market",
    value: "$850B",
    growth: "+45% CAGR"
  },
  {
    label: "Quantum Software Market",
    value: "$350B",
    growth: "+52% CAGR"
  },
  {
    label: "Quantum Hardware Market",
    value: "$500B",
    growth: "+38% CAGR"
  }
];

export const MarketSizeCard: React.FC = () => {
  return (
    <Card className={cn(
      "p-6 bg-gray-800/50 backdrop-blur-sm",
      "border-2 border-blue-400"
    )}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-blue-300 mb-4">
            Market Size & Growth
          </h3>
          
          <div className="space-y-6">
            {marketStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-700/50 p-4 rounded-lg"
              >
                <div className="text-sm text-gray-300 mb-1">{stat.label}</div>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-green-400 font-semibold">{stat.growth}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-gray-300">
            <p className="mb-2">
              The quantum computing market is experiencing exponential growth, driven by:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Increasing demand for high-performance computing</li>
              <li>Growing investments in quantum research</li>
              <li>Rising adoption across industries</li>
              <li>Advancements in quantum hardware</li>
            </ul>
          </div>
        </div>

        <div className="relative h-[400px]">
          <D3Visualization className="absolute inset-0" />
        </div>
      </div>
    </Card>
  );
};

export default MarketSizeCard;
