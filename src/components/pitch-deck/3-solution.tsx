'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const SolutionSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 3;

  const solutions = [
    {
      title: "Fibonacci Anyons",
      description: "Our revolutionary platform utilizes Fibonacci anyons as topological qubits, providing inherent quantum error protection.",
      benefit: "99.99% error protection without active correction"
    },
    {
      title: "Topological Protection",
      description: "Information is encoded in the topology of anyon braiding patterns, making it inherently resistant to local perturbations.",
      benefit: "1000x longer coherence times"
    },
    {
      title: "Scalable Architecture",
      description: "Our unique approach enables reliable scaling to hundreds of logical qubits through modular design.",
      benefit: "100+ logical qubits with maintained stability"
    },
    {
      title: "Advanced Materials",
      description: "Proprietary materials engineering enables operation at higher temperatures than traditional quantum computers.",
      benefit: "Reduced infrastructure requirements"
    }
  ];

  if (!isActive) return null;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-teal-400 mb-4">
          Our Solution: Topological Quantum Computing
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          QDaria's groundbreaking approach leverages the power of Fibonacci anyons to create inherently stable quantum computations.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {solutions.map((solution, index) => (
          <motion.div
            key={solution.title}
            className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-3">
              {solution.title}
            </h3>
            <p className="text-lg mb-4 text-gray-300">
              {solution.description}
            </p>
            <div className="flex items-center">
              <span className="text-teal-400 font-semibold">Key Benefit:</span>
              <span className="ml-2 text-gray-300">{solution.benefit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="text-xl text-gray-300">
          Our innovative approach represents a fundamental breakthrough in quantum computing, enabling practical applications that were previously impossible.
        </p>
      </motion.div>
    </div>
  );
};

export default SolutionSlide;
