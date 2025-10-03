/**
 * Sidebar Component for QDaria Business Plan Deck - WCAG 2.1 AA Compliant
 *
 * Provides accessible navigation for business plan sections with progress tracking
 * and key business metrics display.
 *
 * Accessibility Features:
 * - ARIA landmarks and labels
 * - Keyboard navigation support
 * - Screen reader announcements
 * - Focus management
 * - High contrast support
 */

import React from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { Progress } from '@/components/pitch-deck/ui/progress';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/pitch-deck/ui/sheet';
import {
  X,
  Menu,
  FileText,
  Building2,
  TrendingUp,
  Users,
  Target,
  Package,
  Megaphone,
  ShoppingCart,
  Settings,
  Briefcase,
  DollarSign,
  CreditCard,
  AlertTriangle,
  Calendar,
  Paperclip
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface SlideConfig {
  id: number;
  title: string;
  component?: React.ComponentType<any>;
  section?: string;
}

interface SidebarProps {
  slides: SlideConfig[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  scenario?: 'conservative' | 'base' | 'optimistic';
  setScenario?: (scenario: 'conservative' | 'base' | 'optimistic') => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Icon component mapping for sections (using component references instead of JSX elements)
const sectionIconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  'Overview': FileText,
  'Market': TrendingUp,
  'Product': Package,
  'Strategy': Target,
  'Operations': Settings,
  'Financials': DollarSign,
  'Risk': AlertTriangle,
  'Execution': Calendar,
  'Appendix': Paperclip,
};

// Helper function to render icon
const getSectionIcon = (section: string) => {
  const IconComponent = sectionIconComponents[section];
  return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
};

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

  // Group slides by section
  const slidesBySection = slides.reduce((acc, slide) => {
    const section = slide.section || 'Other';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(slide);
    return acc;
  }, {} as Record<string, SlideConfig[]>);

  const SidebarContent = () => (
    <nav
      className="business-plan-sidebar shadow-lg flex flex-col h-full"
      aria-label="Business plan navigation"
      role="navigation"
    >
      {/* Header Section */}
      <div className="p-4 md:p-6 qdaria-card">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="/D64.png"
              alt="QDaria Logo - Quantum and AI Platform"
              className="h-10 md:h-12 mb-2"
              loading="eager"
            />
            <p className="qdaria-gradient-text text-xs md:text-sm font-medium" aria-label="Document type">
              Business Plan
            </p>
          </div>
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
        <div
          role="progressbar"
          aria-label={`Document progress: ${Math.round(progress)}% complete, section ${currentSlide + 1} of ${slides.length}`}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <Progress value={progress} className="mt-3 qdaria-progress" />
        </div>
      </div>

      {/* Scenario Selector (if provided) */}
      {setScenario && (
        <div className="p-4 qdaria-card">
          <h3 className="text-xs font-semibold mb-2 qdaria-gradient-text" id="scenario-heading">
            Financial Scenario
          </h3>
          <div className="flex gap-1" role="group" aria-labelledby="scenario-heading">
            {(['conservative', 'base', 'optimistic'] as const).map((s) => (
              <Button
                key={s}
                variant={scenario === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setScenario(s)}
                className={`flex-1 text-xs capitalize ${
                  scenario === s ? 'qdaria-button' : ''
                }`}
                aria-pressed={scenario === s}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="flex-1 overflow-auto p-3 md:p-4" role="list" aria-label="Business plan sections">
        {Object.entries(slidesBySection).map(([section, sectionSlides]) => (
          <div key={section} className="mb-4">
            <h3 className="text-xs font-semibold mb-2 flex items-center gap-2 qdaria-gradient-text" id={`section-${section}`}>
              {getSectionIcon(section) || <FileText className="w-4 h-4" />}
              {section}
            </h3>
            <div className="space-y-1" role="list" aria-labelledby={`section-${section}`}>
              {sectionSlides.map((slide) => {
                const isActive = currentSlide === slide.id;
                return (
                  <Button
                    key={slide.id}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start text-left h-auto p-2 md:p-3 transition-all duration-200 focus:ring-2 ${
                      isActive
                        ? 'qdaria-button shadow-md'
                        : 'hover:bg-slate-100'
                    }`}
                    style={!isActive ? { color: 'var(--qdaria-text-secondary)' } : {}}
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      if (isMobile) onToggle();
                    }}
                    aria-label={`Go to section ${slide.id + 1}: ${slide.title}`}
                    aria-current={isActive ? 'page' : undefined}
                    role="listitem"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-xs md:text-sm">
                        {slide.title}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white ml-2" aria-hidden="true" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Key Metrics Section */}
      <div
        className="p-3 md:p-4 qdaria-card"
        role="region"
        aria-label="Key business metrics"
      >
        <h3 className="text-xs md:text-sm font-semibold mb-3 qdaria-gradient-text" id="metrics-heading">
          Key Metrics
        </h3>
        <dl className="space-y-2" aria-labelledby="metrics-heading">
          <div className="flex justify-between text-xs" role="group">
            <dt style={{ color: 'var(--qdaria-text-secondary)' }}>Funding Ask</dt>
            <dd>
              <Badge
                variant="default"
                className="qdaria-badge"
                aria-label="12 million euros funding ask"
              >
                €12M
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between text-xs" role="group">
            <dt style={{ color: 'var(--qdaria-text-secondary)' }}>Market Size</dt>
            <dd>
              <Badge
                variant="secondary"
                className="qdaria-badge"
                aria-label="27.9 billion euros market"
              >
                €27.9B
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between text-xs" role="group">
            <dt style={{ color: 'var(--qdaria-text-secondary)' }}>Runway</dt>
            <dd>
              <Badge
                variant="secondary"
                className="qdaria-badge"
                aria-label="18 months runway"
              >
                18 months
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between text-xs" role="group">
            <dt style={{ color: 'var(--qdaria-text-secondary)' }}>Target Customers</dt>
            <dd>
              <Badge
                variant="secondary"
                className="qdaria-badge"
                aria-label="20 target enterprise customers"
              >
                20
              </Badge>
            </dd>
          </div>
        </dl>
      </div>
    </nav>
  );

  // Mobile: Render as Sheet (drawer)
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 qdaria-card shadow-lg md:hidden focus:ring-2"
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
      className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden h-full`}
      aria-hidden={!isOpen}
    >
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
