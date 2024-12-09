// components/GrowthMetrics.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

interface Metric {
  title: string;
  value: string;
  description: string;
  details: string;
}

const metrics: Metric[] = [
  {
    title: "CAGR",
    value: "83.4%",
    description: "Compound Annual Growth Rate (2023-2030)",
    details: "The quantum computing market is expected to grow at an unprecedented rate, outpacing many other emerging technologies."
  },
  {
    title: "Market Size 2030",
    value: "185B",
    description: "Projected market size by 2030",
    details: "From a relatively small market today, quantum computing is set to become a major industry by the end of the decade."
  },
  {
    title: "Job Creation",
    value: "1M+",
    description: "New jobs in quantum tech by 2030",
    details: "The growth of quantum computing will create numerous job opportunities across various sectors, from research to application development."
  },
  {
    title: "Patents Filed",
    value: "35,000+",
    description: "Quantum-related patents filed globally",
    details: "The high number of patents indicates significant innovation and intellectual property development in the quantum computing field."
  },
]

interface MetricCardProps {
  metric: Metric;
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isMobile: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index, expandedIndex, setExpandedIndex, isMobile }) => (
  <motion.div
    className={`bg-gray-700 p-4 rounded-lg cursor-pointer ${isMobile ? 'text-sm' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
  >
    <h3 className={`font-bold text-blue-300 ${isMobile ? 'text-lg' : 'text-xl'}`}>{metric.title}</h3>
    <p className={`font-bold text-white my-2 ${isMobile ? 'text-xl' : 'text-3xl'}`}>{metric.value}</p>
    <p className="text-gray-400">{metric.description}</p>
    <AnimatePresence>
      {expandedIndex === index && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-300"
        >
          {metric.details}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const MetricsGrid: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          metric={metric}
          index={index}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

const LazyMetricsGrid = dynamic(() => Promise.resolve(MetricsGrid), { ssr: false })

export function GrowthMetricsComponent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Card className="w-full mb-8 bg-gray-800 text-white border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold text-blue-300">Key Growth Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <LazyMetricsGrid isMobile={isMobile} />
      </CardContent>
    </Card>
  )
}