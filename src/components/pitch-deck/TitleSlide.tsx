import React from 'react';
import { Card } from '@/components/pitch-deck/ui/card';
import { Badge } from '@/components/pitch-deck/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';

const TitleSlide: React.FC = () => {
  const companies = [
    'Volkswagen', 'Mercedes-Benz', 'BMW', 'Equinor', 'DNB', 
    'Telenor', 'Siemens', 'Bosch', 'BASF'
  ];

  return (
    <div className="space-y-6 md:space-y-8 font-['Inter',sans-serif] px-4 md:px-0">
      {/* Hero Section */}
      <div className="text-center space-y-4 md:space-y-6">
        <div className="space-y-3 md:space-y-4">
          <img
            src="/icons/qdaria/QDaria_logo_teal Large.png"
            alt="QDaria Logo"
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mx-auto"
            loading="eager"
          />
          <Badge className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border border-cyan-400/50 mb-3 md:mb-4">
            Norway's First Commercial Quantum Computer Company
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 mb-3 md:mb-4 px-2">
            Norway's Quantum Computing Gap Crisis
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light tracking-normal mb-3 md:mb-4 px-2">
            <span className="font-semibold text-slate-200">QDaria</span>: Acquiring <span className="font-semibold text-slate-200">Rigetti Novera QPU</span> to Make Norway Quantum-Ready
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-base md:text-lg text-orange-400 px-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-center">First-Mover Advantage in Nordic Quantum Computing</span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 hidden sm:inline" />
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <Card className="qdaria-card p-4 md:p-8 border-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center qdaria-gradient-text">Platform Suite</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="text-center space-y-3 md:space-y-4 group">
            <img src="/Zipminator.svg" alt="Zipminator" className="w-30 h-30 md:w-42 md:h-42 mx-auto transition-transform group-hover:scale-105" style={{filter: 'brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(1000%) hue-rotate(10deg) brightness(110%) contrast(105%)', width: '7.5rem', height: '7.5rem'}} loading="lazy" />
            <p className="text-sm md:text-base text-slate-400 font-light"><span className="font-semibold text-slate-200">Zipminator</span> - Post-Quantum Cryptography</p>
          </div>
          <div className="text-center space-y-3 md:space-y-4 group">
            <img src="/Qm9.svg" alt="Qm9" className="w-20 h-20 md:w-28 md:h-28 mx-auto transition-transform group-hover:scale-105" style={{filter: 'brightness(0) saturate(100%) invert(60%) sepia(95%) saturate(2000%) hue-rotate(170deg) brightness(105%) contrast(105%)'}} loading="lazy" />
            <p className="text-sm md:text-base text-slate-400 font-light"><span className="font-semibold text-slate-200">Qm9</span> - FinTech Solutions</p>
          </div>
          <div className="text-center space-y-3 md:space-y-4 group">
            <img src="/QMike.svg" alt="QMike" className="w-20 h-20 md:w-28 md:h-28 mx-auto transition-transform group-hover:scale-105" style={{filter: 'brightness(0) saturate(100%) invert(65%) sepia(80%) saturate(1500%) hue-rotate(90deg) brightness(100%) contrast(105%)'}} loading="lazy" />
            <p className="text-sm md:text-base text-slate-400 font-light"><span className="font-semibold text-slate-200">QMike</span> - HPC & Engineering</p>
          </div>
          <div className="text-center space-y-3 md:space-y-4 group">
            <img src="/QDiana.svg" alt="QDiana" className="w-20 h-20 md:w-28 md:h-28 mx-auto transition-transform group-hover:scale-105" style={{filter: 'brightness(0) saturate(100%) invert(50%) sepia(90%) saturate(2500%) hue-rotate(260deg) brightness(100%) contrast(110%)'}} loading="lazy" />
            <p className="text-sm md:text-base text-slate-400 font-light"><span className="font-semibold text-slate-200">QDiana</span> - Education Platform</p>
          </div>
        </div>
      </Card>

      {/* Target Companies */}
      <Card className="qdaria-card p-4 md:p-8 border-2">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-red-400 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold qdaria-gradient-text">Norway & Northern Europe: Quantum Computing Gap</h2>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {companies.map((company) => (
            <Badge
              key={company}
              className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-lg"
            >
              {company}
            </Badge>
          ))}
        </div>
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-400/20">
          <p className="text-sm md:text-base text-slate-400 font-light">
            <span className="text-red-400 font-bold">Zero</span> commercial quantum computers in <span className="font-semibold text-slate-200">Norway</span> •
            <span className="text-orange-400 font-bold">€441B</span> Nordic digital transformation at risk •
            <span className="text-yellow-400 font-bold">Rigetti Novera QPU</span> is the solution
          </p>
        </div>
      </Card>

      {/* Strategic Partners */}
      <Card className="qdaria-card p-4 md:p-8 border-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center qdaria-gradient-text">Strategic Partnership Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="text-center space-y-3 md:space-y-4 flex flex-col">
            <div className="h-16 md:h-24 flex items-center justify-center">
              <img src="/Rigetti.svg" alt="Rigetti" className="h-16 md:h-24 mx-auto" loading="lazy" />
            </div>
            <h3 className="text-lg md:text-xl font-bold qdaria-gradient-text">Quantum Hardware Partner</h3>
            <p className="text-sm md:text-base text-slate-400 font-light px-2"><span className="font-semibold text-slate-200">Rigetti Novera QPU</span> - Making <span className="font-semibold text-slate-200">Norway</span> Quantum-Ready</p>
            <div className="flex justify-center">
              <Badge className="px-3 py-1 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-400/50">
                Hardware Acquisition Target
              </Badge>
            </div>
          </div>
          <div className="text-center space-y-3 md:space-y-4 flex flex-col">
            <div className="h-16 md:h-24 flex items-center justify-center">
              <img src="/icons/qdaria/Managementevents-logo-white.png.webp" alt="Management Events" className="h-12 md:h-18 mx-auto" loading="lazy" />
            </div>
            <h3 className="text-lg md:text-xl font-bold qdaria-gradient-text">European Expansion Partner</h3>
            <p className="text-sm md:text-base text-slate-400 font-light px-2"><span className="font-semibold text-slate-200">Strategic Partnership</span>: 60 Prime European Executive Meetings</p>
            <div className="flex justify-center">
              <Badge className="px-3 py-1 text-xs md:text-sm bg-gradient-to-r from-green-600 to-emerald-600 border border-green-400/50">
                Market Access Partnership
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Presenter Info */}
      <div className="text-center px-2">
        <p className="text-slate-400 text-sm md:text-lg">
          Presented by <span className="qdaria-gradient-text font-semibold">QDaria Team</span> • 2024 Investor Series
        </p>
      </div>
    </div>
  );
};

export default TitleSlide;
