// components/CompanyQubitEvolutionChart.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const companyQubitData = [
  { year: 2015, Google: 9, IBM: 5, Rigetti: 3, Microsoft: 1, IonQ: 5 },
  { year: 2016, Google: 9, IBM: 5, Rigetti: 8, Microsoft: 1, IonQ: 5 },
  { year: 2017, Google: 22, IBM: 20, Rigetti: 19, Microsoft: 1, IonQ: 11 },
  { year: 2018, Google: 72, IBM: 50, Rigetti: 28, Microsoft: 1, IonQ: 11 },
  { year: 2019, Google: 72, IBM: 53, Rigetti: 32, Microsoft: 1, IonQ: 79 },
  { year: 2020, Google: 72, IBM: 65, Rigetti: 38, Microsoft: 1, IonQ: 160 },
  { year: 2021, Google: 72, IBM: 127, Rigetti: 80, Microsoft: 1, IonQ: 256 },
  { year: 2022, Google: 72, IBM: 433, Rigetti: 80, Microsoft: 1, IonQ: 256 },
  { year: 2023, Google: 100, IBM: 1121, Rigetti: 84, Microsoft: 10, IonQ: 400 },
  { year: 2024, Google: 200, IBM: 1121, Rigetti: 100, Microsoft: 20, IonQ: 640 },
]

const colors = {
  Google: '#4285F4',
  IBM: '#006699',
  Rigetti: '#5C2D91',
  Microsoft: '#7FBA00',
  IonQ: '#FF4B4B'
}

export default function CompanyQubitEvolutionChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: companyQubitData.map(d => d.year),
            datasets: Object.keys(colors).map(company => ({
              label: company,
              data: companyQubitData.map(d => d[company as keyof typeof companyQubitData[0]]),
              borderColor: colors[company as keyof typeof colors],
              backgroundColor: colors[company as keyof typeof colors],
              pointRadius: 4,
              pointHoverRadius: 6,
            }))
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                type: 'logarithmic',
                min: 1,
                ticks: {
                  color: 'white',
                  callback: (value) => {
                    if (value === 1 || value === 10 || value === 100 || value === 1000) {
                      return value.toString()
                    }
                    return ''
                  }
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
              x: {
                ticks: {
                  color: 'white',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'white',
                  usePointStyle: true,
                  pointStyle: 'circle',
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#63b3ed',
                bodyColor: 'white',
                borderColor: '#63b3ed',
                borderWidth: 1,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-gray-900 p-6 border-2 border-blue-400 mb-12">
      <h2 className="text-3xl font-bold text-blue-300 mb-4">Qubit Evolution by Major Companies</h2>
      <div className="h-[500px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}