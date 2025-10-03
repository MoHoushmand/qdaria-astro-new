import React from 'react';
import CompetitiveSlideClient from './CompetitiveSlideClient';

interface CompetitiveSlideProps {
  scenario: 'base' | 'upside' | 'conservative';
}

const CompetitiveSlide: React.FC<CompetitiveSlideProps> = ({ scenario }) => {
  return <CompetitiveSlideClient scenario={scenario} />;
};

export default CompetitiveSlide;