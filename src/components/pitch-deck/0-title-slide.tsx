'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import AnyonBraiding0 from './AnyonBraiding-0';

const TitleSlide: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 0;

  if (!isActive) return null;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black text-white overflow-hidden relative font-serif">
        {/* Anyon Braiding animation */}
        <AnyonBraiding0 />

        {/* First Tagline */}
        <motion.p
          className="text-2xl text-center mb-8 font-bold text-white z-10 shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Harnessing Power from the Fabric of Space with Topological Quantum Computation
        </motion.p>

        {/* Logo */}
        <motion.div
          className="z-10 w-full max-w-2xl mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          {!imageLoaded && (
            <div className="w-full h-32 bg-gray-800 animate-pulse rounded-lg"></div>
          )}
          <img
            src="/D9.png"
            alt="QDaria Logo"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto ${!imageLoaded ? 'hidden' : ''}`}
          />
        </motion.div>

        {/* Second Tagline */}
        <motion.p
          className="text-xl text-center mt-2 font-semibold text-blue-300 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Pioneering
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            Quantum
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            in the Heart of Norway
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
};

export default TitleSlide;
