import React, { useState, useEffect, type ReactNode } from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { ChevronLeft, ChevronRight, Download, Menu, X } from 'lucide-react';
import PitchDeckSidebar from './PitchDeckSidebar';

interface Slide {
  id: number;
  title: string;
  component: string;
}

interface PitchDeckContainerProps {
  slides: Slide[];
  initialSlide: number;
  children: ReactNode;
}

const PitchDeckContainer: React.FC<PitchDeckContainerProps> = ({
  slides,
  initialSlide = 0,
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [scenario, setScenario] = useState<'base' | 'upside' | 'conservative'>('base');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Update URL when slide changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', currentSlide.toString());
    window.history.pushState({}, '', url.toString());
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        nextSlide();
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QDaria Investor Pitch Deck</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; background: #0a0f1c; color: #e2e8f0; }
              .slide { page-break-after: always; padding: 20px; }
              .slide:last-child { page-break-after: avoid; }
              h1 { color: #00d4ff; font-size: 24px; margin-bottom: 10px; }
              p { margin: 10px 0; }
              .header { text-align: center; margin-bottom: 30px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>QDaria - Quantum+AI Platform</h1>
              <p>Investor Pitch Deck - Series A Funding Round</p>
              <p>€12M Investment Opportunity</p>
            </div>
            <div class="slide">
              <h2>Executive Summary</h2>
              <p>QDaria is revolutionizing enterprise computing by making quantum+AI accessible through our cloud-native platform.</p>
              <p>Market Opportunity: €27.9B obtainable market in target regions</p>
              <p>Funding Ask: €12M Series A for 18-month runway to profitability</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Get the current slide content from children slots
  const getCurrentSlideContent = () => {
    if (!children || typeof children !== 'object') return null;
    
    const childrenArray = React.Children.toArray(children);
    const currentSlideElement = childrenArray.find((child: any) => {
      return child?.props?.slot === `slide-${currentSlide}`;
    });
    
    return currentSlideElement || null;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
        <PitchDeckSidebar
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          scenario={scenario}
          setScenario={setScenario}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-white/10"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
              <img src="/logomark.png" alt="QDaria Logomark" className="h-10" />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="qdaria-button text-white hover:scale-105 transition-transform"
                onClick={exportToPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {getCurrentSlideContent()}
          </div>
        </div>

        <footer className="bg-white/80 backdrop-blur-sm border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm font-medium">
              {slides[currentSlide].title} ({currentSlide + 1}/{slides.length})
            </div>
            
            <Button 
              variant="outline" 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PitchDeckContainer;
