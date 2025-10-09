/** @jsxImportSource react */
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { ChevronLeft, ChevronRight, Download, Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import Sidebar from './Sidebar';
import ErrorBoundary from './ErrorBoundary';

// Import slides directly to avoid hydration failures from dynamic chunk loading
import TitleSlide from './TitleSlide';
import ProblemSlide from './EnhancedProblemSlide';
import EnhancedSolutionSlide from './EnhancedSolutionSlide';
import MarketSlide from './MarketSlide';
import BusinessModelSlide from './EnhancedBusinessModelSlide';
import RevenueStreamsSlide from './RevenueStreamsSlide';
import ProductPortfolioSlide from './ProductPortfolioSlide';
import TechnologySlide from './TechnologySlide';
import TractionSlide from './TractionSlide';
import CustomerValidationSlide from './CustomerValidationSlide';
import GoToMarketSlide from './GoToMarketSlide';
import IPPatentsSlide from './IPPatentsSlide';
import TeamSlide from './EnhancedTeamSlide';
import FinancialsSlide from './FinancialsSlide';
import CompetitiveSlide from './CompetitiveSlide';
import RiskMitigationSlide from './RiskMitigationSlide';
import InvestorFAQSlide from './InvestorFAQSlide';
import CallToActionSlide from './CallToActionSlide';

const SLIDES = [
  { id: 0, title: '01. QDaria - Quantum+AI', component: TitleSlide },
  { id: 1, title: '02. Problem', component: ProblemSlide },
  { id: 2, title: '03. Solution', component: EnhancedSolutionSlide },
  { id: 3, title: '04. Market Opportunity', component: MarketSlide },
  { id: 4, title: '05. Business Model', component: BusinessModelSlide },
  { id: 5, title: '06. Revenue Streams', component: RevenueStreamsSlide },
  { id: 6, title: '07. Product Portfolio', component: ProductPortfolioSlide },
  { id: 7, title: '08. Technology Advantage', component: TechnologySlide },
  { id: 8, title: '09. Traction & Milestones', component: TractionSlide },
  { id: 9, title: '10. Customer Validation', component: CustomerValidationSlide },
  { id: 10, title: '11. Go-to-Market Strategy', component: GoToMarketSlide },
  { id: 11, title: '12. IP & Patents', component: IPPatentsSlide },
  { id: 12, title: '13. Team', component: TeamSlide },
  { id: 13, title: '14. Financial Projections', component: FinancialsSlide },
  { id: 14, title: '15. Competitive Analysis', component: CompetitiveSlide },
  { id: 15, title: '16. Risk & Mitigation', component: RiskMitigationSlide },
  { id: 16, title: '17. Investor FAQ', component: InvestorFAQSlide },
  { id: 17, title: '18. Call to Action', component: CallToActionSlide },
] as const;

// Loading component for slides with accessibility
const SlideLoader = () => (
  <div className="flex items-center justify-center h-96" role="status" aria-label="Loading slide content">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#04a3ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true" style={{boxShadow: '0 0 25px rgba(4, 163, 255, 0.3)'}}></div>
      <p className="text-white/60">Loading slide...</p>
    </div>
  </div>
);

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scenario, setScenario] = useState<'base' | 'upside' | 'conservative'>('base');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start open by default
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Announce slide changes to screen readers
  const [announcement, setAnnouncement] = useState('');
  const slides = SLIDES;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.add('pitch-deck-active');

    // Disable the development warning modal on pitch deck
    const modal = document.getElementById('dev-warning-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.style.pointerEvents = 'none';
    }

    return () => {
      document.body.classList.remove('pitch-deck-active');
      if (modal) {
        modal.style.display = '';
        modal.style.pointerEvents = '';
      }
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= slides.length - 1) {
        return prev;
      }
      const next = prev + 1;
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  }, [slides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return prev;
      }
      const next = prev - 1;
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  }, [slides]);

  const handleSlideSelect = useCallback((slide: number) => {
    setCurrentSlide((prev) => {
      const bounded = Math.min(Math.max(slide, 0), slides.length - 1);
      if (bounded !== prev) {
        setAnnouncement(`Navigated to slide ${bounded + 1} of ${slides.length}: ${slides[bounded].title}`);
      }
      return bounded;
    });
  }, [slides]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide((prev) => {
            if (prev === 0) return prev;
            setAnnouncement(`Jumped to first slide: ${SLIDES[0].title}`);
            return 0;
          });
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide((prev) => {
            if (prev === SLIDES.length - 1) return prev;
            setAnnouncement(`Jumped to last slide: ${SLIDES[SLIDES.length - 1].title}`);
            return SLIDES.length - 1;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const exportToPDF = () => {
    setAnnouncement('Exporting pitch deck to PDF');
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html lang="en">
          <head>
            <meta charset="UTF-8">
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

  const CurrentSlideComponent = SLIDES[currentSlide]?.component;

  // Fallback if no component found
  if (!CurrentSlideComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{background: '#000212'}}>
        <SlideLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen" style={{background: '#000212'}}>
      {/* Screen reader announcements for slide changes (WCAG 4.1.3) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Sidebar - hidden on mobile (rendered as Sheet drawer instead) */}
      {!isMobile && (
        <div
          className={`transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden relative z-30`}
          id="sidebar-navigation"
        >
          <Sidebar
            slides={SLIDES}
            currentSlide={currentSlide}
            setCurrentSlide={handleSlideSelect}
            scenario={scenario}
            setScenario={setScenario}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      )}

      {/* Mobile sidebar as Sheet drawer */}
      {isMobile && (
        <Sidebar
          slides={SLIDES}
          currentSlide={currentSlide}
          setCurrentSlide={handleSlideSelect}
          scenario={scenario}
          setScenario={setScenario}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      <main className="flex-1 flex flex-col overflow-y-auto md:overflow-hidden" role="main">
        <header className="backdrop-blur-sm border-b px-3 md:px-6 py-3 md:py-4 sticky top-0 z-40" style={{background: 'rgba(0, 2, 18, 0.95)', borderColor: 'rgba(4, 163, 255, 0.2)'}} role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {!isMobile && !sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="text-white hover:bg-white/10 focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                  aria-label="Open navigation sidebar"
                  aria-expanded={false}
                  aria-controls="sidebar-navigation"
                >
                  <Menu className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              )}
              <img
                src="/icons/qdaria/QDwordmark2.svg"
                alt="QDaria wordmark"
                className="h-8 sm:h-10 lg:h-12 w-auto drop-shadow-[0_0_10px_rgba(4,163,255,0.35)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="qdaria-button text-white hover:scale-105 transition-transform text-xs md:text-sm focus:ring-2 focus:ring-cyan-400"
                onClick={exportToPDF}
                aria-label="Export pitch deck to PDF format"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
        </header>

        <div id="main-content" className="flex-1 p-3 md:p-6 overflow-y-auto" role="region" aria-label="Pitch deck slide content">
          <div className="max-w-6xl mx-auto w-full">
            <ErrorBoundary>
              <CurrentSlideComponent scenario={scenario} />
            </ErrorBoundary>
          </div>
        </div>

        <footer className="backdrop-blur-sm border-t px-3 md:px-6 py-3 md:py-4 sticky bottom-0 z-40" style={{background: 'rgba(0, 2, 18, 0.95)', borderColor: 'rgba(4, 163, 255, 0.2)'}} role="navigation" aria-label="Slide navigation controls">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              size={isMobile ? "sm" : "default"}
              aria-label={`Previous slide. Currently on slide ${currentSlide + 1} of ${SLIDES.length}`}
              className="focus:ring-2 focus:ring-cyan-600 cursor-pointer"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <div className="text-xs md:text-sm font-medium px-2 text-center" aria-live="off">
              <div className="hidden md:block font-semibold text-white/90">
                {SLIDES[currentSlide].title}
              </div>
              <div className="text-white/70">
                Slide {currentSlide + 1} of {SLIDES.length}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === SLIDES.length - 1}
              size={isMobile ? "sm" : "default"}
              aria-label={`Next slide. Currently on slide ${currentSlide + 1} of ${SLIDES.length}`}
              className="focus:ring-2 focus:ring-cyan-600 cursor-pointer"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" aria-hidden="true" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PitchDeck;
