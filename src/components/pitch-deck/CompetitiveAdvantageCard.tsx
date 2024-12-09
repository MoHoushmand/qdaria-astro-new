'use client'

import React from 'react'
import { Card } from './ui/card'
import { ShieldCheck, TrendingUp, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CompetitiveAdvantageCard: React.FC = () => {
  return (
    <Card className={cn(
      "bg-purple-800/80 backdrop-blur-sm text-white",
      "border-2 border-purple-600"
    )}>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">
          QDaria&apos;s Competitive Advantage
        </h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            hidden: { opacity: 0 },
          }}
        >
          <motion.div
            className={cn(
              "flex flex-col items-center text-center p-4",
              "bg-purple-700/50 rounded-lg",
              "hover:bg-purple-600/50 transition-colors"
            )}
            variants={{ 
              visible: { opacity: 1, y: 0 }, 
              hidden: { opacity: 0, y: 20 } 
            }}
          >
            <ShieldCheck className="w-12 h-12 text-teal-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Superior Error Rates</h3>
            <p className="text-gray-300">
              Topological qubits are inherently protected from environmental disturbances, reducing error rates significantly.
            </p>
          </motion.div>

          <motion.div
            className={cn(
              "flex flex-col items-center text-center p-4",
              "bg-purple-700/50 rounded-lg",
              "hover:bg-purple-600/50 transition-colors"
            )}
            variants={{ 
              visible: { opacity: 1, y: 0 }, 
              hidden: { opacity: 0, y: 20 } 
            }}
          >
            <TrendingUp className="w-12 h-12 text-pink-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Scalability</h3>
            <p className="text-gray-300">
              Our approach allows for scalable quantum processors, paving the way for practical quantum computing applications.
            </p>
          </motion.div>

          <motion.div
            className={cn(
              "flex flex-col items-center text-center p-4",
              "bg-purple-700/50 rounded-lg",
              "hover:bg-purple-600/50 transition-colors"
            )}
            variants={{ 
              visible: { opacity: 1, y: 0 }, 
              hidden: { opacity: 0, y: 20 } 
            }}
          >
            <Cpu className="w-12 h-12 text-yellow-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Stability</h3>
            <p className="text-gray-300">
              Fibonacci Anyons provide greater stability, making our quantum computers more reliable and efficient.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-8 text-center text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg">
            Our unique approach to quantum computing sets us apart from traditional methods, 
            offering unprecedented stability, scalability, and error protection.
          </p>
        </motion.div>
      </div>
    </Card>
  )
}

export { CompetitiveAdvantageCard }
export default CompetitiveAdvantageCard
