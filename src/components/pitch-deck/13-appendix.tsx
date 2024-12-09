'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const AppendixSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 13;

  const technicalDetails = [
    {
      title: "Topological Protection",
      details: [
        "Non-Abelian anyonic statistics",
        "Braiding-based quantum gates",
        "Inherent error resistance",
        "Scalable qubit architecture"
      ]
    },
    {
      title: "Hardware Specifications",
      details: [
        "Operating temperature: 4K",
        "Coherence time: > 1ms",
        "Gate fidelity: > 99.99%",
        "Qubit connectivity: All-to-all"
      ]
    },
    {
      title: "Software Stack",
      details: [
        "High-level quantum programming language",
        "Automated error correction",
        "Cloud deployment infrastructure",
        "API integration capabilities"
      ]
    }
  ];

  const patents = [
    {
      title: "Topological Qubit Implementation",
      number: "US 2023/0123456",
      status: "Filed"
    },
    {
      title: "Anyon Braiding Control System",
      number: "US 2023/0234567",
      status: "Filed"
    },
    {
      title: "Quantum Error Correction Method",
      number: "US 2023/0345678",
      status: "Filed"
    }
  ];

  const publications = [
    {
      title: "Topological Quantum Computing with Fibonacci Anyons",
      journal: "Nature Physics",
      date: "2023"
    },
    {
      title: "Scalable Error Protection in Quantum Systems",
      journal: "Physical Review Letters",
      date: "2023"
    },
    {
      title: "Quantum Advantage through Topological Protection",
      journal: "Science",
      date: "2023"
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
          Technical Appendix
        </motion.h2>

        {/* Technical Details */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Technical Specifications</h3>
          <div className="grid grid-cols-3 gap-6">
            {technicalDetails.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Patents */}
        <motion.div
          className="w-full max-w-6xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Patent Portfolio</h3>
          <div className="grid grid-cols-3 gap-6">
            {patents.map((patent, index) => (
              <motion.div
                key={patent.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
              >
                <h4 className="text-lg font-semibold text-teal-400 mb-2">{patent.title}</h4>
                <div className="text-blue-300">{patent.number}</div>
                <div className="text-gray-400">Status: {patent.status}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Publications */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Key Publications</h3>
          <div className="grid grid-cols-3 gap-6">
            {publications.map((publication, index) => (
              <motion.div
                key={publication.title}
                className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.4 + (index * 0.1) }}
              >
                <h4 className="text-lg font-semibold text-teal-400 mb-2">{publication.title}</h4>
                <div className="text-blue-300">{publication.journal}</div>
                <div className="text-gray-400">{publication.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default AppendixSlide;
