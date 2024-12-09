'use client';

import React from 'react';
import { useSlide } from './SlideContext';
import { cn } from '../../lib/utils';

const slides = [
  { id: 0, title: "Title Slide" },
  { id: 1, title: "Vision & Mission" },
  { id: 2, title: "Problem" },
  { id: 3, title: "Solution" },
  { id: 4, title: "Market Opportunity" },
  { id: 5, title: "Product" },
  { id: 6, title: "Business Model" },
  { id: 7, title: "Competition" },
  { id: 8, title: "Team" },
  { id: 9, title: "Traction & Milestones" },
  { id: 10, title: "Financials & Funding" },
  { id: 11, title: "Media Coverage" },
  { id: 12, title: "Call to Action" },
  { id: 13, title: "Appendix" }
];

const Sidebar: React.FC = () => {
  const { activeSlide, setActiveSlide } = useSlide();

  return (
    <div className="h-full bg-gray-900/50 backdrop-blur-sm border-r border-purple-600 p-4">
      <div className="text-2xl font-bold text-blue-300 mb-2">QDaria Pitch</div>
      <div className="text-sm text-gray-400 mb-6">Quantum Computing Solutions</div>
      
      <div className="space-y-2">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(slide.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              "hover:bg-purple-900/50",
              activeSlide === slide.id
                ? "bg-purple-900/50 text-teal-400 font-medium"
                : "text-gray-300"
            )}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
