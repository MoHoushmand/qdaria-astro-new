/** @jsxImportSource react */
import React, { useState, lazy, Suspense, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/pitch-deck/ui/button';
import { ChevronLeft, ChevronRight, Download, Menu, X, Printer, FileText } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import Sidebar from './Sidebar';

// Lazy load all business plan slides for optimal bundle splitting
const ExecutiveSummarySlide = lazy(() => import('./slides/ExecutiveSummarySlide'));
const MarketAnalysisSlide = lazy(() => import('./slides/MarketAnalysisSlide'));
const ProductServicesSlide = lazy(() => import('./slides/ProductsServicesSlide'));
const StrategicRoadmapSlide = lazy(() => import('./slides/StrategicRoadmapSlide'));
const RiskAnalysisSlide = lazy(() => import('./slides/RiskAnalysisSlide'));
const FinancialProjectionsSlide = lazy(() => import('./slides/FinancialProjectionsSlide'));

// Loading component for slides with accessibility
const SlideLoader = () => (
  <div className="flex items-center justify-center h-96" role="status" aria-label="Loading slide content">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true"></div>
      <p className="text-slate-600">Loading content...</p>
    </div>
  </div>
);

// Slide interface for type safety
interface SlideConfig {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  section?: string;
}

// Business Plan Deck Component
const BusinessPlanDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');
  const [isExporting, setIsExporting] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Announce slide changes to screen readers (WCAG 2.1 - 4.1.3)
  const [announcement, setAnnouncement] = useState('');

  // Define all business plan slides
  const slides: SlideConfig[] = [
    { id: 0, title: 'Executive Summary', component: ExecutiveSummarySlide, section: 'Overview' },
    { id: 1, title: 'Market Analysis', component: MarketAnalysisSlide, section: 'Market' },
    { id: 2, title: 'Products & Services', component: ProductServicesSlide, section: 'Product' },
    { id: 3, title: 'Strategic Roadmap', component: StrategicRoadmapSlide, section: 'Strategy' },
    { id: 4, title: 'Financial Projections', component: FinancialProjectionsSlide, section: 'Financials' },
    { id: 5, title: 'Risk Analysis', component: RiskAnalysisSlide, section: 'Risk' },
  ];

  // Navigate to next slide with announcement
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, slides.length - 1);
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  }, [slides.length]);

  // Navigate to previous slide with announcement
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      setAnnouncement(`Navigated to slide ${next + 1} of ${slides.length}: ${slides[next].title}`);
      return next;
    });
  }, [slides.length]);

  // Jump to specific slide
  const goToSlide = useCallback((slideId: number) => {
    if (slideId >= 0 && slideId < slides.length) {
      setCurrentSlide(slideId);
      setAnnouncement(`Jumped to slide ${slideId + 1} of ${slides.length}: ${slides[slideId].title}`);
    }
  }, [slides.length]);

  // Keyboard navigation (WCAG 2.1 - 2.1.1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
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
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length, nextSlide, prevSlide, goToSlide]);

  // Touch gesture support for mobile
  useEffect(() => {
    if (!slideContainerRef.current || !isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
      }
    };

    const container = slideContainerRef.current;
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, nextSlide, prevSlide]);

  // Export to PDF functionality
  const exportToPDF = useCallback(() => {
    setIsExporting(true);
    setAnnouncement('Preparing business plan for export');

    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>QDaria Business Plan - ${new Date().getFullYear()}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #1e293b;
                  background: white;
                  padding: 40px;
                }
                .cover-page {
                  page-break-after: always;
                  text-align: center;
                  padding: 100px 40px;
                  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
                  color: white;
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                .cover-page h1 {
                  font-size: 48px;
                  margin-bottom: 20px;
                  font-weight: 700;
                }
                .cover-page p {
                  font-size: 20px;
                  margin: 10px 0;
                }
                .section {
                  page-break-after: always;
                  padding: 40px 0;
                  min-height: 80vh;
                }
                .section:last-child { page-break-after: avoid; }
                h1 {
                  color: #0ea5e9;
                  font-size: 36px;
                  margin-bottom: 20px;
                  padding-bottom: 10px;
                  border-bottom: 3px solid #0ea5e9;
                }
                h2 {
                  color: #334155;
                  font-size: 24px;
                  margin: 30px 0 15px 0;
                }
                h3 {
                  color: #475569;
                  font-size: 18px;
                  margin: 20px 0 10px 0;
                }
                p {
                  margin: 15px 0;
                  text-align: justify;
                }
                ul, ol {
                  margin: 15px 0 15px 30px;
                }
                li {
                  margin: 8px 0;
                }
                .highlight-box {
                  background: #f1f5f9;
                  border-left: 4px solid #0ea5e9;
                  padding: 20px;
                  margin: 20px 0;
                  border-radius: 4px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                th, td {
                  padding: 12px;
                  text-align: left;
                  border-bottom: 1px solid #e2e8f0;
                }
                th {
                  background: #0ea5e9;
                  color: white;
                  font-weight: 600;
                }
                .footer {
                  text-align: center;
                  color: #64748b;
                  font-size: 12px;
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #e2e8f0;
                }
                @media print {
                  body { padding: 20px; }
                  .section { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="cover-page">
                <h1>QDaria Business Plan</h1>
                <p>Quantum+AI Platform for Enterprise</p>
                <p style="margin-top: 40px;">€12M Series A Funding Round</p>
                <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style="margin-top: 60px; font-size: 16px;">Confidential & Proprietary</p>
              </div>

              <div class="section">
                <h1>Executive Summary</h1>
                <div class="highlight-box">
                  <p><strong>Company:</strong> QDaria AS - Quantum+AI Platform Provider</p>
                  <p><strong>Market:</strong> €27.9B obtainable market in target regions</p>
                  <p><strong>Funding Ask:</strong> €12M Series A for 18-month runway to profitability</p>
                  <p><strong>Vision:</strong> Making quantum+AI accessible to enterprise through cloud-native platform</p>
                </div>
                <p>QDaria is revolutionizing enterprise computing by democratizing access to quantum+AI technologies. Our cloud-native platform enables businesses to harness the power of quantum computing and artificial intelligence without requiring specialized expertise or infrastructure investment.</p>
              </div>

              <div class="section">
                <h1>Company Overview</h1>
                <h2>Mission</h2>
                <p>To democratize quantum+AI computing and accelerate innovation across industries by providing accessible, scalable, and practical quantum-enhanced solutions.</p>
                <h2>Legal Structure</h2>
                <p>QDaria AS - Norwegian Corporation</p>
                <p>Founded: 2024 | Headquarters: Oslo, Norway</p>
              </div>

              <div class="section">
                <h1>Market Opportunity</h1>
                <h2>Total Addressable Market (TAM)</h2>
                <ul>
                  <li>Global Quantum Computing Market: $65B (2030 projection)</li>
                  <li>Enterprise AI Market: $407B (2027 projection)</li>
                  <li>Combined Quantum+AI TAM: $125B+</li>
                </ul>
                <h2>Target Market</h2>
                <p>Initially focusing on Nordic and European markets with expansion to North America by Year 3.</p>
                <ul>
                  <li>Fortune 500 enterprises</li>
                  <li>Research institutions</li>
                  <li>Government agencies</li>
                  <li>Financial services</li>
                </ul>
              </div>

              <div class="footer">
                <p>QDaria AS - Confidential Business Plan - Page generated ${new Date().toLocaleDateString()}</p>
                <p>© ${new Date().getFullYear()} QDaria. All rights reserved.</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();

        // Wait for content to load before printing
        setTimeout(() => {
          printWindow.print();
          setAnnouncement('Business plan export complete');
        }, 500);
      }
    } catch (error) {
      console.error('Export failed:', error);
      setAnnouncement('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="flex flex-col md:flex-row min-h-screen business-plan-container">
      {/* Screen reader announcements (WCAG 2.1 - 4.1.3) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Sidebar Navigation */}
      {!isMobile && (
        <div
          className={`transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}
          id="sidebar-navigation"
        >
          <Sidebar
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={goToSlide}
            scenario={scenario}
            setScenario={setScenario}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      )}

      {/* Mobile Sidebar as Drawer */}
      {isMobile && (
        <Sidebar
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={goToSlide}
          scenario={scenario}
          setScenario={setScenario}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden" role="main">
        {/* Header */}
        <header className="business-plan-header px-4 md:px-6 py-3 md:py-4 shadow-sm" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500"
                  aria-label={sidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
                  aria-expanded={sidebarOpen}
                  aria-controls="sidebar-navigation"
                >
                  {sidebarOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
                </Button>
              )}
              <picture>
                <source srcSet="/logomark.webp" type="image/webp" />
                <img
                  src="/logomark.png"
                  alt="QDaria company logo"
                  className="h-8 md:h-10"
                  width="40"
                  height="40"
                  loading="eager"
                />
              </picture>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold qdaria-gradient-text">Business Plan</h1>
                <p className="text-xs" style={{ color: 'var(--qdaria-text-secondary)' }}>Series A Funding Round</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500"
                onClick={exportToPDF}
                disabled={isExporting}
                aria-label="Export business plan to PDF"
              >
                {isExporting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2" />
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" aria-hidden="true" />
                    <span className="hidden sm:inline">Export PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Presentation progress: ${Math.round(progress)}%`}
              />
            </div>
          </div>
        </header>

        {/* Slide Content */}
        <div
          ref={slideContainerRef}
          className="flex-1 p-4 md:p-6 overflow-y-auto"
          role="region"
          aria-label="Business plan slide content"
        >
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<SlideLoader />}>
              <CurrentSlideComponent scenario={scenario} />
            </Suspense>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="qdaria-footer px-4 md:px-6 py-3 md:py-4 shadow-lg" role="navigation" aria-label="Slide navigation controls">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              size={isMobile ? 'sm' : 'default'}
              aria-label={`Previous slide. Currently on slide ${currentSlide + 1} of ${slides.length}`}
              className="focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <div className="text-xs md:text-sm font-medium px-2 text-center" aria-live="off">
              <div className="hidden md:block font-semibold text-slate-900">
                {slides[currentSlide].title}
              </div>
              <div className="text-slate-600">
                Section {currentSlide + 1} of {slides.length}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              size={isMobile ? 'sm' : 'default'}
              aria-label={`Next slide. Currently on slide ${currentSlide + 1} of ${slides.length}`}
              className="focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" aria-hidden="true" />
            </Button>
          </div>

          {/* Keyboard Navigation Hint */}
          <div className="text-center mt-2 text-xs text-slate-500" role="note" aria-label="Keyboard navigation instructions">
            <span className="sr-only">Keyboard shortcuts:</span>
            <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300" aria-label="Left arrow key">←</kbd>
            {' / '}
            <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300" aria-label="Right arrow key">→</kbd>
            {' or '}
            <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300" aria-label="Page up key">PageUp</kbd>
            {' / '}
            <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300" aria-label="Page down key">PageDown</kbd>
            {' to navigate • Swipe on mobile'}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BusinessPlanDeck;
