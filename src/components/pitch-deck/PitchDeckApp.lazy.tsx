'use client';

import React, { lazy, Suspense } from 'react';
import { SlideProvider, useSlide } from './SlideContext';

// Lazy load all slide components
const TitleSlide = lazy(() => import('./0-title-slide'));
const VisionMissionSlide = lazy(() => import('./1-vision-mission-slide'));
const ProblemSlide = lazy(() => import('./2-problem'));
const SolutionSlide = lazy(() => import('./3-solution'));
const MarketOpportunitySlide = lazy(() => import('./4-market-opportunity'));
const ProductSlide = lazy(() => import('./5-product'));
const BusinessModelSlide = lazy(() => import('./6-business-model'));
const CompetitionSlide = lazy(() => import('./7-competition'));
const TeamSlide = lazy(() => import('./8-team'));
const TractionMilestonesSlide = lazy(() => import('./9-traction-milestones'));
const FinancialsFundingSlide = lazy(() => import('./10-financials-funding'));
const MediaCoverageSlide = lazy(() => import('./11-media-coverage'));
const CallToActionSlide = lazy(() => import('./12-call-to-action'));
const AppendixSlide = lazy(() => import('./13-appendix'));
const Sidebar = lazy(() => import('./Sidebar'));

// Loading component for suspense
const LoadingSlide = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-pulse text-blue-400">Loading slide...</div>
  </div>
);

const SlideContainer: React.FC = () => {
  const { activeSlide } = useSlide();

  const slides = [
    { id: 0, Component: TitleSlide },
    { id: 1, Component: VisionMissionSlide },
    { id: 2, Component: ProblemSlide },
    { id: 3, Component: SolutionSlide },
    { id: 4, Component: MarketOpportunitySlide },
    { id: 5, Component: ProductSlide },
    { id: 6, Component: BusinessModelSlide },
    { id: 7, Component: CompetitionSlide },
    { id: 8, Component: TeamSlide },
    { id: 9, Component: TractionMilestonesSlide },
    { id: 10, Component: FinancialsFundingSlide },
    { id: 11, Component: MediaCoverageSlide },
    { id: 12, Component: CallToActionSlide },
    { id: 13, Component: AppendixSlide }
  ];

  return (
    <div className="flex-grow overflow-y-auto">
      <Suspense fallback={<LoadingSlide />}>
        {slides.map(({ id, Component }) => (
          <div key={id} className={id === activeSlide ? 'block' : 'hidden'}>
            <Component />
          </div>
        ))}
      </Suspense>
    </div>
  );
};

const PitchDeckApp: React.FC = () => {
  return (
    <SlideProvider>
      <div className="h-screen flex bg-gray-900 text-white overflow-hidden">
        <Suspense fallback={<div className="w-64 bg-gray-800 animate-pulse" />}>
          <Sidebar />
        </Suspense>
        <SlideContainer />
      </div>
    </SlideProvider>
  );
};

export default PitchDeckApp;