/**
 * TypeScript type definitions for Business Plan Deck components
 */

// Scenario types for financial projections
export type Scenario = 'conservative' | 'base' | 'optimistic';

// Slide configuration interface
export interface SlideConfig {
  id: number;
  title: string;
  component: React.ComponentType<SlideProps>;
  section?: SectionType;
  description?: string;
}

// Section types for organization
export type SectionType =
  | 'Overview'
  | 'Market'
  | 'Product'
  | 'Strategy'
  | 'Operations'
  | 'Financials'
  | 'Risk'
  | 'Execution'
  | 'Appendix';

// Props for individual slide components
export interface SlideProps {
  scenario: Scenario;
  onNavigate?: (slideId: number) => void;
  isActive?: boolean;
}

// Sidebar component props
export interface SidebarProps {
  slides: SlideConfig[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  scenario?: Scenario;
  setScenario?: (scenario: Scenario) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Main deck component props
export interface BusinessPlanDeckProps {
  initialSlide?: number;
  defaultScenario?: Scenario;
  onSlideChange?: (slideId: number) => void;
  showSidebar?: boolean;
}

// Financial data structures
export interface FinancialProjection {
  year: number;
  revenue: number;
  costs: number;
  profit: number;
  growth?: number;
}

export interface FundingBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  quarter: string;
  year: number;
  status: 'completed' | 'in-progress' | 'planned';
  dependencies?: string[];
}

// Market data structures
export interface MarketSegment {
  name: string;
  size: number;
  growth: number;
  description: string;
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  position: 'leader' | 'challenger' | 'follower' | 'niche';
}

export interface CustomerSegment {
  name: string;
  size: number;
  painPoints: string[];
  value: number;
  priority: 'high' | 'medium' | 'low';
}

// Product/Service structures
export interface ProductFeature {
  name: string;
  description: string;
  status: 'available' | 'in-development' | 'planned';
  differentiator?: boolean;
}

export interface ServiceTier {
  name: string;
  price: number;
  features: string[];
  target: string;
  popular?: boolean;
}

// Team structures
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  expertise: string[];
}

export interface AdvisorInfo {
  name: string;
  title: string;
  company?: string;
  specialization: string;
  image?: string;
}

// Risk structures
export interface RiskItem {
  category: 'market' | 'technology' | 'financial' | 'operational' | 'regulatory';
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  owner?: string;
}

// Metrics and KPIs
export interface KeyMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  format?: 'currency' | 'number' | 'percent';
}

export interface PerformanceIndicator {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'on-track' | 'at-risk' | 'behind';
}

// Chart data structures
export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface TimeSeriesData {
  date: Date;
  value: number;
  metric: string;
}

// Export options
export interface ExportOptions {
  format: 'pdf' | 'pptx' | 'docx';
  includeNotes?: boolean;
  scenario?: Scenario;
  customFooter?: string;
}

// Navigation types
export interface NavigationState {
  currentSlide: number;
  totalSlides: number;
  history: number[];
  canGoBack: boolean;
  canGoForward: boolean;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Scenario multipliers for calculations
export const ScenarioMultipliers: Record<Scenario, number> = {
  conservative: 0.7,
  base: 1.0,
  optimistic: 1.4,
};

// Constants
export const SLIDES_PER_SECTION: Record<SectionType, number> = {
  Overview: 2,
  Market: 3,
  Product: 1,
  Strategy: 2,
  Operations: 2,
  Financials: 2,
  Risk: 1,
  Execution: 1,
  Appendix: 1,
};

// Type guards
export function isValidScenario(value: any): value is Scenario {
  return ['conservative', 'base', 'optimistic'].includes(value);
}

export function isValidSection(value: any): value is SectionType {
  return [
    'Overview',
    'Market',
    'Product',
    'Strategy',
    'Operations',
    'Financials',
    'Risk',
    'Execution',
    'Appendix',
  ].includes(value);
}

// Helper type for async data loading
export interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Animation types
export type AnimationDirection = 'left' | 'right' | 'up' | 'down';
export type AnimationTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

export interface AnimationConfig {
  direction?: AnimationDirection;
  duration?: number;
  timing?: AnimationTiming;
  delay?: number;
}

// Accessibility types
export interface AccessibilityConfig {
  announceSlideChanges: boolean;
  keyboardNavigation: boolean;
  touchGestures: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

// Print configuration
export interface PrintConfig {
  includeHeader: boolean;
  includeFooter: boolean;
  companyName: string;
  date: Date;
  confidential: boolean;
  pageNumbers: boolean;
}
