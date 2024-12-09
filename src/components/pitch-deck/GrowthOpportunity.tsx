// components/GrowthOpportunity.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface GrowthOpportunityProps {
  title: string
  value: string
  description: string
}

export function GrowthOpportunityComponent({ title, value, description }: GrowthOpportunityProps) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-blue-400"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2 text-blue-300">{title}</h3>
      <p className="text-3xl font-bold text-purple-400 mb-2">{value}</p>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  )
}
