'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const VisionMissionSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 1;

  return (
    <Card className={cn(
      'w-full h-full bg-gray-900 text-white absolute top-0 left-0',
      'transition-opacity duration-500',
      isActive ? 'opacity-100' : 'opacity-0'
    )}>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">
        {/* Vision Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-teal-400 mb-6">Our Vision</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To revolutionize quantum computing through topological protection, making large-scale quantum computation a practical reality.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-teal-400 mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To develop and deploy fault-tolerant quantum computers using Fibonacci anyons, enabling breakthrough applications in cryptography, drug discovery, and artificial intelligence.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl font-bold text-teal-400 mb-6">Core Values</h2>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Innovation</h3>
              <p>Pushing the boundaries of quantum computing through groundbreaking research</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Excellence</h3>
              <p>Maintaining the highest standards in engineering and scientific rigor</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Impact</h3>
              <p>Creating transformative solutions for humanity's greatest challenges</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default VisionMissionSlide;
