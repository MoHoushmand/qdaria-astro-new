'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, Heart, Shield, Truck, Zap } from 'lucide-react'

const industries = [
  {
    name: "Financial Services",
    icon: DollarSign,
    applications: [
      "Portfolio optimization",
      "Risk analysis and management",
      "High-frequency trading algorithms",
      "Fraud detection and prevention",
    ],
    description: "Quantum computing can revolutionize financial modeling, risk assessment, and trading strategies, potentially saving billions and creating new opportunities."
  },
  {
    name: "Healthcare",
    icon: Heart,
    applications: [
      "Drug discovery and development",
      "Protein folding simulations",
      "Personalized medicine",
      "Medical imaging enhancement",
    ],
    description: "In healthcare, quantum computing could dramatically accelerate drug discovery, optimize treatment plans, and enhance medical imaging, leading to better patient outcomes."
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    applications: [
      "Quantum-resistant cryptography",
      "Secure communications",
      "Threat detection and analysis",
      "Quantum key distribution",
    ],
    description: "As quantum computers threaten current encryption methods, they also offer solutions for unbreakable encryption and advanced threat detection."
  },
  {
    name: "Logistics",
    icon: Truck,
    applications: [
      "Supply chain optimization",
      "Route planning and optimization",
      "Inventory management",
      "Demand forecasting",
    ],
    description: "Quantum algorithms can solve complex optimization problems in logistics, potentially reducing costs and improving efficiency across global supply chains."
  },
  {
    name: "Energy",
    icon: Zap,
    applications: [
      "Grid optimization",
      "Battery technology research",
      "Climate modeling",
      "Energy trading strategies",
    ],
    description: "In the energy sector, quantum computing could optimize power grids, accelerate the development of new energy technologies, and improve climate modeling accuracy."
  },
]

export function KeyIndustryApplicationsComponent() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].name);

  return (
    <Card className="w-full bg-gray-800 text-white border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-300">Key Industry Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-700 mb-4">
            {industries.map((industry) => (
              <TabsTrigger key={industry.name} value={industry.name} className="data-[state=active]:bg-blue-600">
                <industry.icon className="w-5 h-5 mr-2" />
                {industry.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            {industries.map((industry) => (
              <TabsContent key={industry.name} value={industry.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-300">{industry.name} Applications</h3>
                  <p className="text-gray-300 mb-4">{industry.description}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {industry.applications.map((app, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-200"
                      >
                        {app}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  )
}
