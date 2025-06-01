import React, { useEffect, useRef, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Ensure Chart.js modules are registered
import EnhancedBaseChart from './EnhancedBaseChart';
import type { RoadmapChartProps } from '../../../types/chart';

export default function RoadmapChartEnhanced({
  id,
  title,
  description,
  phases,
  darkMode = false,
  className = '',
}: RoadmapChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [phaseDetailsVisible, setPhaseDetailsVisible] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  // Initialize web worker for data processing
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../charts/workers/roadmapWorker.js', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (event) => {
      if (event.data.error) {
        console.error('Worker error:', event.data.error);
        return;
      }

      setChartData(event.data.chartData);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Process data with worker when props change
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      phases,
      darkMode
    });
  }, [phases, darkMode]);

  // Chart options
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          callback: function(value) {
            return `${value}%`;
          },
          color: darkMode ? '#9ca3af' : '#4b5563',
          font: {
            family: 'Inter, sans-serif',
          }
        },
        title: {
          display: true,
          text: 'Execution Progress',
          color: darkMode ? '#e5e7eb' : '#1f2937',
          font: {
            family: 'Inter, sans-serif',
            weight: 500,
            size: 14
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        border: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          color: darkMode ? '#e5e7eb' : '#1f2937',
          font: {
            family: 'Inter, sans-serif',
            size: 13,
            weight: 500
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(2, 6, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: darkMode ? 'rgba(4, 163, 255, 0.3)' : 'rgba(4, 163, 255, 0.5)',
        borderWidth: 1,
        titleColor: darkMode ? '#e5e7eb' : '#1f2937',
        bodyColor: darkMode ? '#9ca3af' : '#4b5563',
        cornerRadius: 8,
        boxPadding: 6,
        callbacks: {
          title: function(tooltipItems) {
            const phaseIndex = tooltipItems[0].dataIndex;
            return phases[phaseIndex].name + ' (' + phases[phaseIndex].period + ')';
          },
          label: function(context) {
            const phaseIndex = context.dataIndex;
            return [
              `Progress: ${context.parsed.x}%`,
              `Details: ${phases[phaseIndex].description}`
            ];
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setActivePhase(index);
        setPhaseDetailsVisible(true);
      }
    }
  };

  // Handle chart click
  const handleChartClick = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const { index } = elements[0];
      setActivePhase(index);
      setPhaseDetailsVisible(true);

      // Announce for screen readers
      const announcement = document.getElementById('roadmap-announcement');
      if (announcement) {
        const phase = phases[index];
        announcement.textContent = `Selected phase: ${phase.name}. Period: ${phase.period}. Progress: ${phase.progress}%. Description: ${phase.description}`;
      }
    }
  };

  // Accessibility configuration
  const accessibility = {
    ariaLabel: "Strategic Execution Timeline showing progress of different phases",
    keyboardNavigation: true,
    announceDataPoint: (index: number) => {
      const announcement = document.getElementById('roadmap-announcement');
      if (announcement && phases.length > 0) {
        const phase = phases[index % phases.length];
        announcement.textContent = `Phase: ${phase.name}. Period: ${phase.period}. Progress: ${phase.progress}%. Description: ${phase.description}`;
      }
    }
  };

  // Render phase details modal
  const renderPhaseDetailsModal = () => {
    if (!phaseDetailsVisible || activePhase === null || activePhase >= phases.length) return null;
    
    const phase = phases[activePhase];
    const progressColor = phase.color || '#04a3ff';
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="max-w-2xl w-full rounded-xl bg-white/95 dark:bg-gray-800/95 p-8 shadow-2xl border border-primary-500/30">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="inline-block w-4 h-4 rounded-full mr-3" style={{ backgroundColor: progressColor }}></span>
                {phase.name}
                <span className="ml-3 text-lg font-normal text-gray-500 dark:text-gray-400">
                  ({phase.period})
                </span>
              </h3>
              <button 
                onClick={() => setPhaseDetailsVisible(false)}
                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Close phase details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 mr-3">Progress:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${phase.progress}%`, 
                      backgroundColor: progressColor 
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">{phase.progress}%</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
              Description
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {phase.description}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
              Key Milestones
            </h4>
            <ul className="space-y-2">
              {phase.milestones.map((milestone, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: progressColor }}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => setPhaseDetailsVisible(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render phase cards
  const renderPhaseCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {phases.map((phase, index) => (
          <div 
            key={index}
            className={`rounded-lg p-4 border transition-all duration-300 cursor-pointer hover:shadow-md ${
              activePhase === index 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
            onClick={() => {
              setActivePhase(index);
              setPhaseDetailsVisible(true);
            }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${phase.name} phase`}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActivePhase(index);
                setPhaseDetailsVisible(true);
              }
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{phase.name}</h3>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-600 dark:text-gray-300">
                {phase.period}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Progress:</span>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{phase.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-primary-600 dark:bg-primary-500" 
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{phase.description}</p>
            
            <button className="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:underline">
              View Details →
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-6">
        {phases.length > 0 && (
          <React.Fragment>
            {/* Interactive phase cards */}
            {renderPhaseCards()}
            
            {/* Chart visualization */}
            {chartData && (
              <EnhancedBaseChart
                id={id}
                title={title}
                description={description}
                type="bar"
                data={chartData}
                options={options}
                darkMode={darkMode}
                className={className}
                accessibility={accessibility}
                onChartClick={(event, elements) => handleChartClick(event, elements || [])}
              />
            )}
          </React.Fragment>
        )}
        
        {/* Hidden element for screen reader announcements */}
        <div id="roadmap-announcement" className="sr-only" aria-live="polite"></div>
      </div>
      
      {/* Phase details modal */}
      {renderPhaseDetailsModal()}
    </React.Fragment>
  );
}