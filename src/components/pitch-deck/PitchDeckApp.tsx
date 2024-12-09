'use client';

import React from 'react';
import { SlideProvider, useSlide } from './SlideContext';
import TitleSlide from './0-title-slide';
import VisionMissionSlide from './1-vision-mission-slide';
import ProblemSlide from './2-problem';
import SolutionSlide from './3-solution';
import MarketOpportunitySlide from './4-market-opportunity';
import ProductSlide from './5-product';
import BusinessModelSlide from './6-business-model';
import CompetitionSlide from './7-competition';
import TeamSlide from './8-team';
import TractionMilestonesSlide from './9-traction-milestones';
import FinancialsFundingSlide from './10-financials-funding';
import MediaCoverageSlide from './11-media-coverage';
import CallToActionSlide from './12-call-to-action';
import AppendixSlide from './13-appendix';
import Sidebar from './Sidebar';

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
      {slides.map(({ id, Component }) => (
        <div key={id} className={id === activeSlide ? 'block' : 'hidden'}>
          <Component />
        </div>
      ))}
    </div>
  );
};

const PitchDeckApp: React.FC = () => {
  return (
    <SlideProvider>
      <div className="flex h-screen w-screen bg-gray-900">
        {/* Fixed sidebar */}
        <div className="w-64 flex-shrink-0 fixed left-0 top-0 h-screen overflow-y-auto border-r border-purple-600 bg-gray-900 z-50">
          <Sidebar />
        </div>
        
        {/* Main content area with offset for sidebar */}
        <div className="ml-64 flex-grow overflow-y-auto">
          <SlideContainer />
        </div>
      </div>
    </SlideProvider>
  );
};

export default PitchDeckApp;
