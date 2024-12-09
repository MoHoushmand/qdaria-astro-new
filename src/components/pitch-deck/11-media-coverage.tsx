'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';
import MediaCard from './MediaCard';

const MediaCoverageSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 11;

  const mediaHighlights = [
    {
      source: "Quantum Computing Today",
      title: "QDaria's Breakthrough in Topological Quantum Computing",
      quote: "A revolutionary approach that could redefine the future of quantum computation.",
      date: "December 2023"
    },
    {
      source: "Tech Innovators",
      title: "The Rise of Fault-Tolerant Quantum Computing",
      quote: "QDaria's Fibonacci anyon technology represents a quantum leap in stability and scalability.",
      date: "November 2023"
    },
    {
      source: "Scientific American",
      title: "Topological Protection: The Future of Quantum Computing",
      quote: "QDaria's innovative approach could solve the quantum decoherence challenge.",
      date: "October 2023"
    },
    {
      source: "Nature Quantum",
      title: "Breakthrough in Quantum Error Correction",
      quote: "Demonstrating unprecedented 99.99% error protection through topological methods.",
      date: "September 2023"
    }
  ];

  const awards = [
    {
      title: "Quantum Innovation Award",
      organization: "International Quantum Computing Society",
      year: "2023"
    },
    {
      title: "Technology Pioneer",
      organization: "World Economic Forum",
      year: "2023"
    },
    {
      title: "Best Quantum Computing Startup",
      organization: "Quantum Tech Awards",
      year: "2023"
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
          Media Coverage & Recognition
        </motion.h2>

        {/* Media Coverage */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Featured In</h3>
          <div className="grid grid-cols-2 gap-6">
            {mediaHighlights.map((media, index) => (
              <motion.div
                key={media.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index % 2 === 0 ? -20 : 20) }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <MediaCard
                  source={media.source}
                  title={media.title}
                  quote={media.quote}
                  date={media.date}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Awards & Recognition</h3>
          <div className="grid grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
              >
                <div className="text-xl font-semibold text-teal-400 mb-2">{award.title}</div>
                <div className="text-blue-300 mb-1">{award.organization}</div>
                <div className="text-gray-400">{award.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Impact */}
        <motion.div
          className="mt-12 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-xl text-gray-300">
            QDaria's groundbreaking approach to quantum computing has garnered significant attention from leading scientific publications and industry experts, validating our position as a pioneer in topological quantum computing.
          </p>
        </motion.div>
      </div>
    </Card>
  );
};

export default MediaCoverageSlide;
