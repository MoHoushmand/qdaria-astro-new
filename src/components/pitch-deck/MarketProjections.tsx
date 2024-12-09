// components/MarketProjections.tsx
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const marketData = [
  { year: 2025, TAM: 2200, SAM: 600, SOM: 100 },
  { year: 2026, TAM: 3000, SAM: 900, SOM: 200 },
  { year: 2027, TAM: 4000, SAM: 1300, SOM: 350 },
  { year: 2028, TAM: 5500, SAM: 2000, SOM: 600 },
  { year: 2029, TAM: 7500, SAM: 3000, SOM: 1000 },
  { year: 2030, TAM: 10000, SAM: 4500, SOM: 1500 },
]

const formatYAxis = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(0)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`
  return value.toFixed(0)
}

export function MarketProjectionsComponent() {
  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-300">Quantum Finance Market Projections</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData}>
            <defs>
              <linearGradient id="colorTAM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSAM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSOM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={(value) => `$${formatYAxis(value as number)}`} />
            <Legend />
            <Area type="monotone" dataKey="TAM" stroke="#8884d8" fillOpacity={1} fill="url(#colorTAM)" />
            <Area type="monotone" dataKey="SAM" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSAM)" />
            <Area type="monotone" dataKey="SOM" stroke="#ffc658" fillOpacity={1} fill="url(#colorSOM)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
