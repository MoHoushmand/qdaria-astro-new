// components/MarketSizeChart.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import dynamic from 'next/dynamic'

interface MarketSizeDataPoint {
  year: number;
  size: number;
}

const marketSizeData: MarketSizeDataPoint[] = [
  { year: 2023, size: 0.9 },
  { year: 2024, size: 1.8 },
  { year: 2025, size: 3.6 },
  { year: 2026, size: 7.2 },
  { year: 2027, size: 14.4 },
  { year: 2028, size: 28.8 },
  { year: 2029, size: 57.6 },
  { year: 2030, size: 115.2 },
]

const formatYAxis = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(0)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`
  return `${value.toFixed(0)}K`
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-800 p-4 border border-blue-400 rounded-md">
        <p className="label text-blue-300">{`Year: ${label}`}</p>
        <p className="value text-green-400">{`Market Size: $${payload[0].value.toFixed(1)}B`}</p>
      </div>
    )
  }
  return null
}

interface ChartComponentProps {
  isMobile: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ isMobile }) => {
  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
      <AreaChart data={marketSizeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="year" stroke="#888" />
        <YAxis tickFormatter={formatYAxis} stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="size" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const LazyChartComponent = dynamic(() => Promise.resolve(ChartComponent), { ssr: false })

export function MarketSizeChartComponent() {
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
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold text-blue-300">Quantum Computing Market Size (USD Billions)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[500px]">
        <LazyChartComponent isMobile={isMobile} />
        <p className="text-sm text-gray-400 mt-4">
          The quantum computing market is projected to grow exponentially, reaching $115.2 billion by 2030.
          This rapid growth reflects increasing adoption across various industries and significant technological advancements.
        </p>
      </CardContent>
    </Card>
  )
}