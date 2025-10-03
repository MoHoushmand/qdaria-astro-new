import React from 'react';
import { MetricCard } from './MetricCard';
import { FeatureCard } from './FeatureCard';
import { InfoCard } from './InfoCard';
import { StatCard } from './StatCard';
import '../styles/cards-professional.css';

/**
 * Professional Card Examples
 * Demonstrates industry-standard card designs for business plan metrics
 */
export const CardExamples: React.FC = () => {
  return (
    <div className="cards-container">
      {/* Metric Cards Section */}
      <section className="cards-section">
        <h2 className="cards-section-title">Key Metrics</h2>
        <div className="card-grid-3">
          <MetricCard
            value="$8.2M"
            label="Revenue Target"
            description="Year 1 projected revenue"
            trend="up"
            trendValue="127%"
          />
          <MetricCard
            value="15K+"
            label="Active Users"
            description="By Q4 2025"
            trend="up"
            trendValue="340%"
          />
          <MetricCard
            value="42%"
            label="Profit Margin"
            description="Industry-leading margins"
            trend="up"
            trendValue="18%"
          />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="cards-section">
        <h2 className="cards-section-title">Core Features</h2>
        <div className="card-grid-2">
          <FeatureCard
            icon="🚀"
            subtitle="Innovation"
            title="Quantum-Accelerated Processing"
            text="Leverage cutting-edge quantum algorithms to deliver 10,000x faster processing than classical methods, enabling real-time analysis of complex datasets."
          />
          <FeatureCard
            icon="🔒"
            subtitle="Security"
            title="Military-Grade Encryption"
            text="Built on quantum-resistant cryptography with zero-knowledge proofs, ensuring your data remains secure even against future quantum attacks."
          />
          <FeatureCard
            icon="🌐"
            subtitle="Scalability"
            title="Global Infrastructure"
            text="Distributed architecture across 15 data centers worldwide, providing 99.99% uptime and sub-50ms latency for all users globally."
          />
          <FeatureCard
            icon="⚡"
            subtitle="Performance"
            title="Real-Time Analytics"
            text="Process millions of transactions per second with our proprietary in-memory computing engine, delivering insights in milliseconds."
          />
        </div>
      </section>

      {/* Stat Cards Section */}
      <section className="cards-section">
        <h2 className="cards-section-title">Market Traction</h2>
        <div className="card-grid-4">
          <StatCard value="500+" label="Enterprise Clients" />
          <StatCard value="99.9%" label="Uptime SLA" />
          <StatCard value="24/7" label="Global Support" />
          <StatCard value="50ms" label="Avg. Latency" />
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="cards-section">
        <h2 className="cards-section-title">Strategic Advantages</h2>
        <div className="card-grid-2">
          <InfoCard
            type="success"
            title="Competitive Moat"
            text="Our patented quantum annealing algorithms create a 3-5 year technology lead, with 12 additional patents pending in key markets across US, EU, and Asia."
          />
          <InfoCard
            type="info"
            title="Market Opportunity"
            text="Targeting $127B quantum computing market by 2030, with TAM growing at 34.8% CAGR. Early mover advantage in enterprise and government sectors."
          />
          <InfoCard
            type="warning"
            title="Go-to-Market Strategy"
            text="Dual-pronged approach: direct enterprise sales for Fortune 500 companies and strategic partnerships with cloud providers for SMB market penetration."
          />
          <InfoCard
            type="success"
            title="Revenue Diversification"
            text="Multiple revenue streams including SaaS subscriptions (65%), professional services (25%), and licensing (10%), ensuring stable cash flow and growth."
          />
        </div>
      </section>
    </div>
  );
};

export default CardExamples;
