// components/IndustryItem.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface IndustryItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function IndustryItemComponent({ icon, title, description }: IndustryItemProps) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}