import React from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { Progress } from '@/components/pitch-deck/ui/progress';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { X } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  component: string;
}

interface PitchDeckSidebarProps {
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  scenario: 'base' | 'upside' | 'conservative';
  setScenario: (scenario: 'base' | 'upside' | 'conservative') => void;
  isOpen: boolean;
  onToggle: () => void;
}

const PitchDeckSidebar: React.FC<PitchDeckSidebarProps> = ({
  slides,
  currentSlide,
  setCurrentSlide,
  isOpen,
  onToggle,
}) => {
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className={'transition-all duration-300 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border-r border-cyan-400/20 shadow-2xl flex flex-col h-full ' + (isOpen ? 'w-80' : 'w-0')}>
      <div className="p-6 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-400/20 to-orange-400/20">
        <div className="flex items-center justify-between">
          <div>
            <img src="/D64.png" alt="QDaria Logo" className="h-12 mb-2" />
            <p className="text-cyan-300 text-sm">Quantum+AI Platform</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <Progress value={progress} className="mt-3 bg-cyan-500/30" />
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-sm font-semibold mb-3 text-white">Slides</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {slides.map((slide) => (
            <Button
              key={slide.id}
              variant={currentSlide === slide.id ? "default" : "ghost"}
              className={'w-full justify-start text-left h-auto p-3 transition-all duration-200 ' + 
                (currentSlide === slide.id 
                  ? 'bg-gradient-to-r from-cyan-400/20 to-orange-400/20 text-white border border-cyan-400/30 shadow-lg' 
                  : 'hover:bg-white/10 text-gray-300 hover:text-white')
              }
              onClick={() => setCurrentSlide(slide.id)}
            >
              <div>
                <div className="font-medium text-sm">
                  {slide.title}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-cyan-400/20 bg-gradient-to-r from-slate-800 to-slate-900">
        <h3 className="text-sm font-semibold mb-3 text-white">Key Metrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Target Companies</span>
            <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300">20</Badge>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Meetings Planned</span>
            <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300">60</Badge>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Funding Ask</span>
            <Badge variant="default" className="bg-gradient-to-r from-cyan-400 to-orange-400 text-white">€12M</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckSidebar;
