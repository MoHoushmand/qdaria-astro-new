/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import {
  BusinessPlanSection,
  GridLayout,
  FlexLayout,
  CardContainer,
  Stack,
  Divider,
  ContentBlock
} from '../BusinessPlanLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Badge } from '../../pitch-deck/ui/badge';

/**
 * Example Slide Demonstrating Professional Layout System
 * Uses 8px grid, optimal reading width, and generous white space
 */
export const ExampleOptimizedSlide: React.FC = () => {
  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '$125B+',
      label: 'Total Addressable Market',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: '47% CAGR',
      label: 'Market Growth Rate',
      color: 'from-blue-400 to-purple-400'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '3.2x',
      label: 'Efficiency Improvement',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '#1',
      label: 'Market Position Goal',
      color: 'from-pink-400 to-cyan-400'
    }
  ];

  const features = [
    {
      title: 'Quantum Hardware Access',
      description: 'Physical quantum computing kits available for rent, providing hands-on experience for researchers and enterprises.',
      badge: 'Hardware'
    },
    {
      title: 'AI-Enhanced Software',
      description: 'Quantum-enhanced applications that deliver measurable advantages without requiring quantum expertise.',
      badge: 'Software'
    },
    {
      title: 'Intelligent Interfaces',
      description: 'Natural language AI agents that make quantum computing accessible to non-technical users.',
      badge: 'AI Agents'
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12" style={{ background: '#000212' }}>
      {/* Professional Layout with Optimal Content Width */}
      <div className="container-professional">
        {/* Header Section with Generous Spacing */}
        <BusinessPlanSection
          title="Professional Layout Example"
          subtitle="Demonstrating 8px grid system, optimal reading width, and generous white space for maximum readability"
          contentWidth="wide"
          spacing="professional"
          showDivider={true}
        >
          {/* Content Block with Optimal Reading Width (65ch) */}
          <ContentBlock width="normal">
            <Stack spacing="relaxed">
              <p className="text-lg text-gray-300 leading-relaxed">
                This slide demonstrates the professional layout system built on an 8px grid foundation.
                Notice how the text width is constrained to approximately 65 characters per line,
                which is optimal for reading comprehension and eye tracking.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The spacing between elements follows a consistent rhythm using multiples of 8px,
                creating visual harmony and making the design feel balanced and professional.
              </p>
            </Stack>
          </ContentBlock>
        </BusinessPlanSection>

        {/* Metrics Grid with Consistent Gaps (48px = var(--space-6)) */}
        <BusinessPlanSection
          title="Key Metrics"
          subtitle="Important numbers with optimal spacing and visual hierarchy"
          contentWidth="full"
          spacing="relaxed"
        >
          <GridLayout columns={4} gap={6}>
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 h-full">
                  <CardContainer spacing="comfortable">
                    <FlexLayout direction="column" align="center" gap={3}>
                      <div className={`text-transparent bg-gradient-to-r ${metric.color} bg-clip-text`}>
                        {metric.icon}
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-400 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    </FlexLayout>
                  </CardContainer>
                </Card>
              </motion.div>
            ))}
          </GridLayout>
        </BusinessPlanSection>

        <Divider type="section" />

        {/* Feature Cards with Spacious Padding (64px = var(--space-8)) */}
        <BusinessPlanSection
          title="Core Features"
          subtitle="Three-pillar strategy with generous card spacing"
          contentWidth="full"
          spacing="comfortable"
        >
          <GridLayout columns={3} gap={6}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 h-full">
                  <CardHeader>
                    <FlexLayout justify="between" align="start" gap={3}>
                      <CardTitle className="text-xl text-white flex-1">
                        {feature.title}
                      </CardTitle>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shrink-0">
                        {feature.badge}
                      </Badge>
                    </FlexLayout>
                  </CardHeader>
                  <CardContent>
                    <CardContainer spacing="compact">
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContainer>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </GridLayout>
        </BusinessPlanSection>

        <Divider type="professional" />

        {/* Golden Ratio Layout Example */}
        <BusinessPlanSection
          title="Golden Ratio Layout"
          subtitle="Visually balanced asymmetric grid using 1.618:1 proportion"
          contentWidth="full"
          spacing="comfortable"
          showDivider={false}
        >
          <GridLayout columns="golden" gap={6}>
            {/* Larger column (Golden ratio side) */}
            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardContainer spacing="spacious">
                <Stack spacing="relaxed">
                  <h3 className="text-2xl font-bold text-white">Primary Content</h3>
                  <p className="text-gray-300 leading-relaxed">
                    This column uses the golden ratio (1.618) for its width, creating a visually
                    pleasing asymmetric layout. The golden ratio appears frequently in nature and
                    design, providing natural visual balance.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Notice the generous padding (64px) and comfortable line spacing (1.75) that
                    makes this content easy to read and visually appealing.
                  </p>
                </Stack>
              </CardContainer>
            </Card>

            {/* Smaller column */}
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardContainer spacing="comfortable">
                <Stack spacing="normal">
                  <h3 className="text-xl font-bold text-white">Supporting Info</h3>
                  <Stack spacing="compact">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span className="text-gray-300">Optimal spacing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-gray-300">8px grid system</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span className="text-gray-300">Golden ratio</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      <span className="text-gray-300">Generous white space</span>
                    </div>
                  </Stack>
                </Stack>
              </CardContainer>
            </Card>
          </GridLayout>
        </BusinessPlanSection>

        {/* Footer with System Benefits */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg">
          <Stack spacing="relaxed">
            <h3 className="text-2xl font-bold text-white text-center">
              Layout System Benefits
            </h3>
            <FlexLayout justify="around" wrap={true} gap={6}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50-60%</div>
                <div className="text-sm text-gray-400">White Space Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">65ch</div>
                <div className="text-sm text-gray-400">Optimal Line Length</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">8px</div>
                <div className="text-sm text-gray-400">Grid Foundation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">1.618</div>
                <div className="text-sm text-gray-400">Golden Ratio</div>
              </div>
            </FlexLayout>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default ExampleOptimizedSlide;
