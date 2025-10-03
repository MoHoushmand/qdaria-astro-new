/** @jsxImportSource react */
import React from 'react';
import { SlideProps } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../lib/utils';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

/**
 * Example Slide Component Template
 *
 * This serves as a reference implementation for creating business plan slides.
 * Copy this template and modify it for your specific slide content.
 *
 * Key Features Demonstrated:
 * - Responsive grid layouts
 * - Card components with hover effects
 * - Statistics display
 * - Icon integration
 * - Accessibility features
 * - Scenario-based data rendering
 */

const ExampleSlide: React.FC<SlideProps> = ({ scenario }) => {
  // Example: Scenario-based data
  const getRevenueProjection = () => {
    const baseRevenue = 10000000;
    const multipliers = {
      conservative: 0.7,
      base: 1.0,
      optimistic: 1.4,
    };
    return baseRevenue * multipliers[scenario];
  };

  const revenue = getRevenueProjection();

  return (
    <div className="business-plan-slide">
      {/* Main Heading with gradient effect */}
      <h1 className="bp-heading-1">Example Slide Title</h1>

      {/* Subheading */}
      <p className="text-lg text-slate-600 mb-8">
        This is a subtitle or introduction paragraph that provides context for the slide content.
      </p>

      {/* Key Statistics Grid */}
      <div className="bp-grid-4 mb-8">
        <div className="bp-stat-box">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" aria-hidden="true" />
          </div>
          <div className="bp-stat-value">{formatCurrency(revenue)}</div>
          <div className="bp-stat-label">Projected Revenue</div>
          <div className="text-xs text-slate-500 mt-1">{scenario} scenario</div>
        </div>

        <div className="bp-stat-box">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-8 h-8 text-purple-600" aria-hidden="true" />
          </div>
          <div className="bp-stat-value">{formatNumber(50000)}</div>
          <div className="bp-stat-label">Target Customers</div>
        </div>

        <div className="bp-stat-box">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-8 h-8 text-green-600" aria-hidden="true" />
          </div>
          <div className="bp-stat-value">{formatPercent(45)}</div>
          <div className="bp-stat-label">Market Growth</div>
        </div>

        <div className="bp-stat-box">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-orange-600" aria-hidden="true" />
          </div>
          <div className="bp-stat-value">3</div>
          <div className="bp-stat-label">Industry Awards</div>
        </div>
      </div>

      {/* Two-column content grid */}
      <div className="bp-grid-2 mb-8">
        {/* Left card */}
        <div className="bp-card">
          <h2 className="bp-heading-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" aria-hidden="true" />
            Key Insights
          </h2>
          <ul className="space-y-2 mt-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span className="text-slate-700">
                First insight or key point about the business
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span className="text-slate-700">
                Second important observation or metric
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span className="text-slate-700">
                Third critical point for investors to understand
              </span>
            </li>
          </ul>
        </div>

        {/* Right card - highlighted */}
        <div className="bp-card-highlight">
          <h2 className="bp-heading-3">Strategic Advantages</h2>
          <p className="text-slate-700 mt-2 mb-4">
            Our unique positioning in the market provides several competitive advantages:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-slate-700">
                Proprietary technology with patent protection
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-slate-700">
                Strong partnerships with industry leaders
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-slate-700">
                First-mover advantage in emerging markets
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Data table example */}
      <div className="mb-8">
        <h2 className="bp-heading-2 mb-4">Financial Overview</h2>
        <div className="overflow-x-auto">
          <table className="bp-table">
            <caption className="sr-only">
              Financial projections for the next three years
            </caption>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Year 1</th>
                <th scope="col">Year 2</th>
                <th scope="col">Year 3</th>
                <th scope="col">CAGR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Revenue</th>
                <td>{formatCurrency(5000000)}</td>
                <td>{formatCurrency(12000000)}</td>
                <td>{formatCurrency(25000000)}</td>
                <td className="font-semibold text-green-600">{formatPercent(124)}</td>
              </tr>
              <tr>
                <th scope="row">Gross Margin</th>
                <td>{formatPercent(65)}</td>
                <td>{formatPercent(70)}</td>
                <td>{formatPercent(75)}</td>
                <td className="font-semibold text-green-600">{formatPercent(7.4)}</td>
              </tr>
              <tr>
                <th scope="row">EBITDA</th>
                <td className="text-red-600">{formatCurrency(-2000000)}</td>
                <td>{formatCurrency(1000000)}</td>
                <td>{formatCurrency(6000000)}</td>
                <td>—</td>
              </tr>
              <tr>
                <th scope="row">Cash Position</th>
                <td>{formatCurrency(8000000)}</td>
                <td>{formatCurrency(7000000)}</td>
                <td>{formatCurrency(11000000)}</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Three-column grid with badges */}
      <div className="bp-grid-3">
        <div className="bp-card text-center">
          <div className="bp-badge bp-badge-primary mb-3 mx-auto">Phase 1</div>
          <h3 className="bp-heading-3 text-lg mb-2">Foundation</h3>
          <p className="text-sm text-slate-600">
            Build core platform and secure initial customers
          </p>
        </div>

        <div className="bp-card text-center">
          <div className="bp-badge bp-badge-success mb-3 mx-auto">Phase 2</div>
          <h3 className="bp-heading-3 text-lg mb-2">Growth</h3>
          <p className="text-sm text-slate-600">
            Scale operations and expand market presence
          </p>
        </div>

        <div className="bp-card text-center">
          <div className="bp-badge bp-badge-warning mb-3 mx-auto">Phase 3</div>
          <h3 className="bp-heading-3 text-lg mb-2">Expansion</h3>
          <p className="text-sm text-slate-600">
            Enter new markets and diversify offerings
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          * All projections based on {scenario} scenario assumptions.
          Actual results may vary based on market conditions.
        </p>
      </div>
    </div>
  );
};

export default ExampleSlide;
