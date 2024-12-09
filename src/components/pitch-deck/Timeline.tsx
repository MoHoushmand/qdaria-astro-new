// components/Timeline.tsx
'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, description, index }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, x: 0 });
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center mb-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={controls}
    >
      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
        <h4 className="text-xl font-bold">{year}</h4>
        <p className="text-sm">{description}</p>
      </div>
      <motion.div
        className="absolute left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2"
        whileHover={{ scale: 1.5, backgroundColor: '#00FFFF' }}
        aria-label={`Timeline point for ${year}`}
      />
    </motion.div>
  );
};

export const Timeline: React.FC = () => {
  const milestones = useMemo(
    () => [
      { year: '2024 Oct', description: 'QDaria speaks at prestigious Q+AI IQT-konferansen in New York' },
      { year: '2024 Nov', description: 'Beta release of Zipminator (Q Cybersecurity) and Qm9 (QML for Trading)' },
      { year: '2024 Dec', description: 'Partnerships with top 500 European and top 100 Norwegian companies' },
      { year: '2025 Jan', description: 'Launch of Experimental Quantum Mechanics Lab & QAI Lab' },
      { year: '2025 Feb', description: 'Novera QPU: First commercial Quantum Computer in Norway' },
      { year: '2025 Mar', description: 'Establish Topological Quantum Computer with Fibonacci Anyons' },
      { year: '2025 Aug', description: 'Demonstrate Quantum Supremacy with 49 Topological Qubits' },
      { year: '2026 Q2', description: 'Launch QDaria Quantum Cloud, offering quantum computing as a service' },
      { year: '2026 Q4', description: 'Achieve 100-qubit Topological Quantum Computer' },
      { year: '2027 Q2', description: 'Demonstrate quantum advantage in drug discovery and financial modeling' },
      { year: '2027 Q4', description: 'Release QDaria Quantum Development Kit for widespread adoption' },
      { year: '2028 Q2', description: 'Establish Quantum-AI Research Centers in 10 countries' },
      { year: '2028 Q4', description: 'Achieve 500-qubit Topological Quantum Computer' },
      { year: '2029 Q2', description: 'Launch Quantum Internet prototype connecting major research institutions' },
      { year: '2029 Q4', description: 'Demonstrate first practical quantum error correction' },
      { year: '2030 Q2', description: 'Achieve 1000-qubit Topological Quantum Computer' },
      { year: '2030 Q4', description: 'QDaria becomes the global leader in Quantum-AI solutions' },
    ],
    []
  );

  return (
    <div className="relative mt-8">
      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white"></div>
      {milestones.map((milestone, index) => (
        <TimelineItem key={milestone.year + index} {...milestone} index={index} />
      ))}
    </div>
  );
};