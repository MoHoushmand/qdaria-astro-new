'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const ProblemSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 2;

  const problems = [
    {
      title: "Quantum Decoherence",
      description: "Traditional quantum computers suffer from rapid loss of quantum information due to environmental interactions.",
      impact: "Limits computation time and accuracy"
    },
    {
      title: "Error Rates",
      description: "Current quantum systems have high error rates requiring complex error correction schemes.",
      impact: "Reduces computational reliability"
    },
    {
      title: "Scalability Barriers",
      description: "Existing architectures face significant challenges in scaling beyond 100 qubits.",
      impact: "Constrains problem-solving capacity"
    },
    {
      title: "Operating Conditions",
      description: "Most quantum computers require extreme cooling to near absolute zero.",
      impact: "Increases operational complexity and cost"
    }
  ];

  if (!isActive) return null;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold text-teal-400 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Current Challenges in Quantum Computing
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.title}
            className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-3">
              {problem.title}
            </h3>
            <p className="text-lg mb-4 text-gray-300">
              {problem.description}
            </p>
            <div className="flex items-center">
              <span className="text-red-400 font-semibold">Impact:</span>
              <span className="ml-2 text-gray-300">{problem.impact}</span>
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
          These challenges have prevented quantum computing from reaching its full potential in solving complex problems in cryptography, drug discovery, and artificial intelligence.
        </p>
      </motion.div>
    </div>
  );
};

export default ProblemSlide;
