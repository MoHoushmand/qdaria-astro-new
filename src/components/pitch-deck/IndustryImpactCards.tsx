'use client'

import React from 'react'
import { DollarSign, Heart, Shield, Truck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const industries = [
  {
    name: 'Financial Services',
    icon: <DollarSign className="w-8 h-8 text-pink-400" />,
    description: 'Portfolio optimization, risk analysis, fraud detection.',
  },
  {
    name: 'Healthcare',
    icon: <Heart className="w-8 h-8 text-green-400" />,
    description: 'Drug discovery, protein folding, personalized medicine.',
  },
  {
    name: 'Cybersecurity',
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    description: 'Quantum-resistant cryptography, secure communications.',
  },
  {
    name: 'Logistics',
    icon: <Truck className="w-8 h-8 text-yellow-400" />,
    description: 'Route optimization, supply chain management.',
  },
  {
    name: 'Energy',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    description: 'Grid optimization, climate modeling, battery research.',
  },
]

const IndustryImpactCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {industries.map((industry, index) => (
        <motion.div
          key={industry.name}
          className={cn(
            "bg-purple-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg",
            "transition-all duration-300",
            "hover:bg-purple-700/90 hover:shadow-xl hover:scale-105",
            "cursor-pointer"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center mb-4">
            {industry.icon}
            <h3 className="text-xl font-semibold text-white ml-3">
              {industry.name}
            </h3>
          </div>
          <p className="text-gray-300">{industry.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export { IndustryImpactCards }
export default IndustryImpactCards
