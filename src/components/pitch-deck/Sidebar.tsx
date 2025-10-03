/**
 * Sidebar Component for QDaria Pitch Deck - WCAG 2.1 AA Compliant
 *
 * Astro-compatible React component that provides accessible navigation and metrics display.
 * This component is designed to be used as a React island with client:load directive.
 *
 * Accessibility Features:
 * - ARIA landmarks and labels
 * - Keyboard navigation support
 * - Screen reader announcements
 * - Focus management
 * - High contrast support
 *
 * @example
 * ```astro
 * <Sidebar
 *   client:load
 *   slides={slides}
 *   currentSlide={currentSlide}
 *   setCurrentSlide={setCurrentSlide}
 *   isOpen={sidebarOpen}
 *   onToggle={() => setSidebarOpen(!sidebarOpen)}
 * />
 * ```
 */

import React from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { Progress } from '@/components/pitch-deck/ui/progress';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/pitch-deck/ui/sheet';
import { X, Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * Props for Sidebar component
 * All props are compatible with Astro's prop passing system
 */
interface SidebarProps {
  /** Array of slide objects with id, title, and optional component reference */
  slides: Array<{ id: number; title: string; component?: React.ComponentType<any> | string }>;
  /** Current active slide index (0-based) */
  currentSlide: number;
  /** Callback to change the current slide */
  setCurrentSlide: (slide: number) => void;
  /** Optional: Current scenario selection for financial projections */
  scenario?: 'base' | 'upside' | 'conservative';
  /** Optional: Callback to change scenario */
  setScenario?: (scenario: 'base' | 'upside' | 'conservative') => void;
  /** Whether the sidebar is currently open/visible */
  isOpen: boolean;
  /** Callback to toggle sidebar visibility */
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  slides,
  currentSlide,
  setCurrentSlide,
  isOpen,
  onToggle,
  scenario,
  setScenario,
}) => {
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Sidebar content component to avoid duplication
  const SidebarContent = () => (
    <nav
      className="bg-gradient-to-b from-slate-900 to-slate-800 border-r border-cyan-400/20 shadow-2xl flex flex-col h-full"
      aria-label="Slide navigation"
      role="navigation"
    >
      {/* Header Section */}
      <div className="p-4 md:p-6 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-400/20 to-orange-400/20">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="/D64.png"
              alt="QDaria Logo - Quantum and AI Platform"
              className="h-10 md:h-12 mb-2"
              loading="eager"
            />
            <p className="text-cyan-300 text-xs md:text-sm" aria-label="Platform tagline">
              Quantum+AI Platform
            </p>
          </div>
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/10 focus:ring-2 focus:ring-cyan-400"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
        <div
          role="progressbar"
          aria-label={`Presentation progress: ${Math.round(progress)}% complete, slide ${currentSlide + 1} of ${slides.length}`}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <Progress value={progress} className="mt-3 bg-cyan-500/30" />
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4" role="list" aria-label="Slide list" style={{maxHeight: 'calc(100vh - 400px)'}}>
        <h3 className="text-xs md:text-sm font-semibold mb-3 text-white" id="slides-heading">
          Slides
        </h3>
        <div className="space-y-2" role="list" aria-labelledby="slides-heading">
          {slides.map((slide) => {
            const isActive = currentSlide === slide.id;
            return (
              <Button
                key={slide.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left h-auto p-2 md:p-3 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400/20 to-orange-400/20 text-white border border-cyan-400/30 shadow-lg'
                    : 'hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
                onClick={() => {
                  setCurrentSlide(slide.id);
                  if (isMobile) onToggle(); // Close sidebar on mobile after selection
                }}
                aria-label={`Go to slide ${slide.id + 1}: ${slide.title}`}
                aria-current={isActive ? 'page' : undefined}
                role="listitem"
              >
                <div>
                  <div className="font-medium text-xs md:text-sm">
                    {slide.title}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Key Metrics Section */}
      <div
        className="p-3 md:p-4 border-t border-cyan-400/20 bg-gradient-to-r from-slate-800 to-slate-900"
        role="region"
        aria-label="Key business metrics"
      >
        <h3 className="text-xs md:text-sm font-semibold mb-3 text-white" id="metrics-heading">
          Key Metrics
        </h3>
        <dl className="space-y-2" aria-labelledby="metrics-heading">
          <div className="flex justify-between text-xs" role="group">
            <dt className="text-gray-300">Target Companies</dt>
            <dd>
              <Badge
                variant="secondary"
                className="bg-cyan-400/20 text-cyan-300"
                aria-label="20 target companies"
              >
                20
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between text-xs" role="group">
            <dt className="text-gray-300">Meetings Planned</dt>
            <dd>
              <Badge
                variant="secondary"
                className="bg-cyan-400/20 text-cyan-300"
                aria-label="60 meetings planned"
              >
                60
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between text-xs" role="group">
            <dt className="text-gray-300">Funding Ask</dt>
            <dd>
              <Badge
                variant="default"
                className="bg-gradient-to-r from-cyan-400 to-orange-400 text-white"
                aria-label="12 million euros funding ask"
              >
                €12M
              </Badge>
            </dd>
          </div>
        </dl>
      </div>
    </nav>
  );

  // Mobile: Render as Sheet (drawer) with focus trap
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 bg-slate-900/90 text-white hover:bg-slate-800 md:hidden focus:ring-2 focus:ring-cyan-400"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-80 p-0 bg-transparent border-0"
          aria-label="Navigation drawer"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Render as fixed sidebar
  return (
    <div
      className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}
      aria-hidden={!isOpen}
    >
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
