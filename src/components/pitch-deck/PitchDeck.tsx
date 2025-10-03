/** @jsxImportSource react */
import React, { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { ChevronLeft, ChevronRight, Download, Menu, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import Sidebar from './Sidebar';
import ErrorBoundary from './ErrorBoundary';

// Lazy load all slides for optimal bundle splitting
// NOTE: Fixed re-export pattern - importing Enhanced versions directly
const TitleSlide = lazy(() => import('./TitleSlide'));
const ProblemSlide = lazy(() => import('./EnhancedProblemSlide'));
const EnhancedSolutionSlide = lazy(() => import('./EnhancedSolutionSlide'));
const MarketSlide = lazy(() => import('./MarketSlide'));
const BusinessModelSlide = lazy(() => import('./EnhancedBusinessModelSlide'));
const RevenueStreamsSlide = lazy(() => import('./RevenueStreamsSlide'));
const ProductPortfolioSlide = lazy(() => import('./ProductPortfolioSlide'));
const TechnologySlide = lazy(() => import('./TechnologySlide'));
const TractionSlide = lazy(() => import('./TractionSlide'));
const CustomerValidationSlide = lazy(() => import('./CustomerValidationSlide'));
const GoToMarketSlide = lazy(() => import('./GoToMarketSlide'));
const IPPatentsSlide = lazy(() => import('./IPPatentsSlide'));
const TeamSlide = lazy(() => import('./EnhancedTeamSlide'));
const FinancialsSlide = lazy(() => import('./FinancialsSlide'));
const CompetitiveSlide = lazy(() => import('./CompetitiveSlide'));
const RiskMitigationSlide = lazy(() => import('./RiskMitigationSlide'));
const InvestorFAQSlide = lazy(() => import('./InvestorFAQSlide'));
const CallToActionSlide = lazy(() => import('./CallToActionSlide'));

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
  const [isHydrated, setIsHydrated] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Announce slide changes to screen readers
  const [announcement, setAnnouncement] = React.useState('');

  // Handle hydration
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const slides = [
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
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev - 1 + slides.length) % slides.length;
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  };

  // Keyboard navigation for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          if (currentSlide < slides.length - 1) nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          if (currentSlide > 0) prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          setAnnouncement(`Jumped to first slide: ${slides[0].title}`);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(slides.length - 1);
          setAnnouncement(`Jumped to last slide: ${slides[slides.length - 1].title}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

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

  const CurrentSlideComponent = slides[currentSlide]?.component;

  // Don't render until hydrated to prevent SSR mismatch
  if (!isHydrated || !CurrentSlideComponent) {
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
          className={`transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}
          id="sidebar-navigation"
        >
          <Sidebar
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
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
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
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
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-white hover:bg-white/10 focus:ring-2 focus:ring-cyan-400"
                  aria-label={sidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
                  aria-expanded={sidebarOpen}
                  aria-controls="sidebar-navigation"
                >
                  {sidebarOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
                  <span className="sr-only">{sidebarOpen ? "Close" : "Open"} sidebar</span>
                </Button>
              )}
              <img
                src="/icons/qdaria/QDlogomark.svg"
                alt="QDaria company logo"
                className="h-8 md:h-10"
                width="40"
                height="40"
                loading="eager"
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
          <div className="max-w-6xl mx-auto">
            <ErrorBoundary>
              <Suspense fallback={<SlideLoader />}>
                <CurrentSlideComponent scenario={scenario} />
              </Suspense>
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
              aria-label={`Previous slide. Currently on slide ${currentSlide + 1} of ${slides.length}`}
              className="focus:ring-2 focus:ring-cyan-600"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <div className="text-xs md:text-sm font-medium px-2 text-center" aria-live="off">
              <div className="hidden md:block font-semibold text-slate-700">
                {slides[currentSlide].title}
              </div>
              <div className="text-slate-600">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              size={isMobile ? "sm" : "default"}
              aria-label={`Next slide. Currently on slide ${currentSlide + 1} of ${slides.length}`}
              className="focus:ring-2 focus:ring-cyan-600"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" aria-hidden="true" />
            </Button>
          </div>
          <div className="text-center mt-2 text-xs text-slate-600" role="note" aria-label="Keyboard navigation instructions">
            <span className="sr-only">Keyboard shortcuts:</span>
            <kbd className="px-2 py-1 bg-slate-200 rounded border border-slate-300" aria-label="Left arrow key">←</kbd>
            {" / "}
            <kbd className="px-2 py-1 bg-slate-200 rounded border border-slate-300" aria-label="Right arrow key">→</kbd>
            {" or "}
            <kbd className="px-2 py-1 bg-slate-200 rounded border border-slate-300" aria-label="Page up key">PageUp</kbd>
            {" / "}
            <kbd className="px-2 py-1 bg-slate-200 rounded border border-slate-300" aria-label="Page down key">PageDown</kbd>
            {" to navigate"}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PitchDeck;
