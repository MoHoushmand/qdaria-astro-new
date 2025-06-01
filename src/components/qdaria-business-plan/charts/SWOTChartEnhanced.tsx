import React, { useEffect, useRef, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Ensure Chart.js modules are registered
import EnhancedBaseChart from './EnhancedBaseChart';
import type { SWOTChartProps } from '../../../types/chart';

export default function SWOTChartEnhanced({
  id,
  title,
  description,
  strengths,
  weaknesses,
  opportunities,
  threats,
  darkMode = false,
  className = '',
}: SWOTChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  // Initialize web worker for calculation
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../charts/workers/swotWorker.js', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (event) => {
      if (event.data.error) {
        console.error('Worker error:', event.data.error);
        return;
      }

      setChartData(event.data.chartData);
      setActiveQuadrant(null); // Reset active quadrant when data changes
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Process data with worker when props change
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      strengths,
      weaknesses,
      opportunities,
      threats,
      darkMode
    });
  }, [strengths, weaknesses, opportunities, threats, darkMode]);

  // Chart configuration
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            family: 'Inter, sans-serif',
          },
          color: darkMode ? '#9ca3af' : '#4b5563',
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: {
            family: 'Poppins, sans-serif',
            size: 16,
            weight: 700,
          },
          padding: 20,
          color: darkMode ? '#e5e7eb' : '#1f2937',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend as we'll use custom UI
      },
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            const title = tooltipItems[0].label || '';
            return title;
          },
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `Score: ${value}/100`;
          },
          afterLabel: function(context) {
            const category = context.label;
            let items: string[] = [];

            // Add items list based on category
            if (category === 'Strengths' && strengths.items) {
              items = strengths.items;
            } else if (category === 'Weaknesses' && weaknesses.items) {
              items = weaknesses.items;
            } else if (category === 'Opportunities' && opportunities.items) {
              items = opportunities.items;
            } else if (category === 'Threats' && threats.items) {
              items = threats.items;
            }

            return items.map((item) => `• ${item}`);
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.2,
        borderWidth: 2
      },
      point: {
        radius: 4,
        hoverRadius: 8,
        borderWidth: 2,
        hitRadius: 20, // Larger hit radius for easier interaction
      },
    },
    animation: {
      duration: 800, // Faster animations
      easing: 'easeOutQuart',
    }
  };

  // Handle click events
  const handleChartClick = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const { index } = elements[0];
      const categories = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
      const category = categories[index];
      
      setSelectedCategory(category);
      setDetailsVisible(true);
      setActiveQuadrant(index);
      // Announce for screen readers
      const announcement = document.getElementById('swot-announcement');
      if (announcement) {
        const items = getCategoryItems(category);
        announcement.textContent = `${category} details: ${items.join(', ')}`;
      }
    }
  };

  // Helper to get items for a category
  const getCategoryItems = (category: string): string[] => {
    switch (category) {
      case 'Strengths': return strengths.items || [];
      case 'Weaknesses': return weaknesses.items || [];
      case 'Opportunities': return opportunities.items || [];
      case 'Threats': return threats.items || [];
      default: return [];
    }
  };

  // Accessibility configuration
  const accessibility = {
    ariaLabel: "SWOT Analysis Chart showing strengths, weaknesses, opportunities, and threats",
    keyboardNavigation: true,
    announceDataPoint: (index: number) => {
      const categories = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
      const category = categories[index % categories.length];
      const items = getCategoryItems(category);
      
      const announcement = document.getElementById('swot-announcement');
      if (announcement && chartData) {
        const value = chartData.datasets[0].data[index] as number;
        announcement.textContent = `${category}: ${value}/100. Key points: ${items.join(', ')}`;
      }
    }
  };

  // Render details modal
  const renderDetailsModal = () => {
    if (!detailsVisible || !selectedCategory) return null;
    
    const items = getCategoryItems(selectedCategory);
    const score = getScoreForCategory(selectedCategory);
    const categoryColor = getCategoryColor(selectedCategory);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="max-w-2xl w-full rounded-xl bg-white/95 dark:bg-gray-800/95 p-8 shadow-2xl border border-primary-500/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center">
              <span 
                className="inline-block w-4 h-4 rounded-full mr-3" 
                style={{ backgroundColor: categoryColor }}
              />
              {selectedCategory}
              <span className="ml-3 text-xl font-normal text-gray-500 dark:text-gray-400">
                ({score}/100)
              </span>
            </h3>
            <button 
              onClick={() => setDetailsVisible(false)}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Close SWOT details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 border-l-4 pl-4" style={{ borderColor: categoryColor }}>
            <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
              Key Points:
            </h4>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-500 inline-flex mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
              Description
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {getCategoryDescription(selectedCategory)} 
            </p>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setDetailsVisible(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to get category score
  const getScoreForCategory = (category: string): number => {
    switch (category) {
      case 'Strengths': return strengths.score;
      case 'Weaknesses': return weaknesses.score;
      case 'Opportunities': return opportunities.score;
      case 'Threats': return threats.score;
      default: return 0;
    }
  };

  // Helper to get category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Strengths': return '#10b981'; // Green
      case 'Weaknesses': return '#f43f5e'; // Rose red
      case 'Opportunities': return '#3b82f6'; // Blue
      case 'Threats': return '#eab308'; // Yellow
      default: return '#6b7280'; // Gray
    }
  };

  // Helper to get category description
  const getCategoryDescription = (category: string): string => {
    switch (category) {
      case 'Strengths':
        return 'Strengths represent internal capabilities and advantages that position QDaria favorably in the quantum computing market.';
      case 'Weaknesses':
        return 'Weaknesses identify internal limitations and disadvantages that may hinder QDaria\'s ability to achieve its full potential.';
      case 'Opportunities':
        return 'Opportunities highlight external factors and market conditions that QDaria can leverage for growth and success.';
      case 'Threats':
        return 'Threats represent external challenges and risks that could negatively impact QDaria\'s business and market position.';
      default:
        return '';
    }
  };

  // Render chart with accessibility features
  return (
    <React.Fragment>
      <div className="flex flex-col space-y-4">
        {chartData && (
          <React.Fragment>
            <div className="grid grid-cols-2 gap-4 mb-6" role="group" aria-label="SWOT Analysis Categories">
              <QuadrantCard
                title="Strengths"
                score={strengths.score}
                items={strengths.items.slice(0, 2)}
                color="#10b981"
                isActive={activeQuadrant === 0}
                onClick={() => {
                  setSelectedCategory('Strengths');
                  setDetailsVisible(true);
                  setActiveQuadrant(0);
                }}
                className="border-t-4 border-emerald-500"
              />
              <QuadrantCard
                title="Weaknesses"
                score={weaknesses.score}
                items={weaknesses.items.slice(0, 2)}
                color="#f43f5e"
                isActive={activeQuadrant === 1}
                onClick={() => {
                  setSelectedCategory('Weaknesses');
                  setDetailsVisible(true);
                  setActiveQuadrant(1);
                }}
                className="border-t-4 border-rose-500"
              />
              <QuadrantCard
                title="Opportunities"
                score={opportunities.score}
                items={opportunities.items.slice(0, 2)}
                color="#3b82f6"
                isActive={activeQuadrant === 2}
                onClick={() => {
                  setSelectedCategory('Opportunities');
                  setDetailsVisible(true);
                  setActiveQuadrant(2);
                }}
                className="border-t-4 border-blue-500"
              />
              <QuadrantCard
                title="Threats"
                score={threats.score}
                items={threats.items.slice(0, 2)}
                color="#eab308"
                isActive={activeQuadrant === 3}
                onClick={() => {
                  setSelectedCategory('Threats');
                  setDetailsVisible(true);
                  setActiveQuadrant(3);
                }}
                className="border-t-4 border-yellow-500"
              />
            </div>
            
            <EnhancedBaseChart
              id={id}
              title={title}
              description={description}
              type="radar"
              data={chartData}
              options={options}
              darkMode={darkMode}
              className={className}
              accessibility={accessibility}
              onChartClick={(event, elements) => handleChartClick(event, elements || [])}
            />
            
            <div className="flex items-center justify-end space-x-4 px-8 mt-6">
              <button
                onClick={() => setDetailsVisible(!detailsVisible)}
                className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600"
                aria-label="Show complete SWOT table"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Show Complete SWOT Table
              </button>
            </div>
          </React.Fragment>
        )}
        
        {/* Hidden element for screen reader announcements */}
        <div id="swot-announcement" className="sr-only" aria-live="polite"></div>
      </div>
      
      {/* SWOT details modal */}
      {renderDetailsModal()}
    </React.Fragment>
  );
}

// QuadrantCard component for displaying SWOT quadrants
interface QuadrantCardProps {
  title: string;
  score: number;
  items: string[];
  color: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function QuadrantCard({ title, score, items, color, isActive, onClick, className = '' }: QuadrantCardProps) {
  return (
    <div 
      className={`rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-lg cursor-pointer ${className} ${isActive ? 'ring-2 ring-offset-2 ring-primary-500 transform scale-[1.02]' : ''}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: color }}
          >
            {score}
          </div>
        </div>
      </div>
      <ul className="text-sm space-y-1 mt-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="inline-block w-3 h-3 mt-1 mr-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
            <span className="text-gray-600 dark:text-gray-300">{item}</span>
          </li>
        ))}
        <li className="text-primary-600 dark:text-primary-400 mt-1 text-xs">+ more</li>
      </ul>
    </div>
  );
}