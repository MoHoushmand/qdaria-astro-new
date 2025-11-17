/**
 * Accessible Chart Wrapper Component
 * Wraps any chart with comprehensive accessibility features
 */

import React, { type ReactNode } from 'react';
import {
  useChartAccessibility,
  useChartKeyboardNavigation,
  getChartAriaProps,
  generateChartSummary,
  generateDataTable,
  applyHighContrastColors,
  getAnimationConfig,
  focusStyles,
  srOnlyStyles,
  type ChartA11yConfig,
} from '@/utils/chart-accessibility';

interface AccessibleChartWrapperProps {
  /** Chart component to wrap */
  children: ReactNode;
  /** Accessibility configuration */
  config: ChartA11yConfig;
  /** Chart data for generating accessible data table */
  data?: any[];
  /** Column names for data table */
  dataColumns?: string[];
  /** Chart type (e.g., 'line', 'bar', 'pie') */
  chartType?: string;
  /** Number of data points */
  dataPointCount?: number;
  /** Data range */
  dataRange?: { min: number; max: number };
  /** Key trends */
  trends?: string[];
  /** Key insights */
  keyInsights?: string[];
  /** Callback when data point is selected via keyboard */
  onDataPointSelect?: (index: number) => void;
  /** Custom className */
  className?: string;
}

export function AccessibleChartWrapper({
  children,
  config,
  data,
  dataColumns,
  chartType = 'chart',
  dataPointCount,
  dataRange,
  trends,
  keyInsights,
  onDataPointSelect,
  className = '',
}: AccessibleChartWrapperProps) {
  const {
    containerRef,
    isFocused,
    prefersReducedMotion,
    highContrastMode,
    handleFocus,
    handleBlur,
  } = useChartAccessibility({
    ...config,
    enableKeyboard: config.enableKeyboard ?? true,
    enableAnnouncements: config.enableAnnouncements ?? true,
    enableHighContrast: config.enableHighContrast ?? true,
    enableReducedMotion: config.enableReducedMotion ?? true,
  });

  const { selectedIndex, handleKeyDown } = useChartKeyboardNavigation(
    dataPointCount ?? 0,
    onDataPointSelect
  );

  // Generate comprehensive summary for screen readers
  const chartSummary = generateChartSummary({
    title: config.ariaLabel,
    type: chartType,
    dataPoints: dataPointCount ?? 0,
    range: dataRange,
    trends,
    keyInsights,
  });

  // Generate accessible data table
  const dataTable = data && dataColumns ? generateDataTable(data, dataColumns) : null;

  return (
    <div
      ref={containerRef}
      className={`accessible-chart-container ${className}`}
      {...getChartAriaProps(config)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={config.enableKeyboard ? handleKeyDown : undefined}
      style={{
        position: 'relative',
        ...(isFocused ? focusStyles : {}),
      }}
      data-reduced-motion={prefersReducedMotion}
      data-high-contrast={highContrastMode}
    >
      {/* Screen reader only summary */}
      <div style={srOnlyStyles} aria-live="polite">
        {chartSummary}
      </div>

      {/* Main chart content */}
      <div className="chart-content" aria-hidden="false">
        {React.cloneElement(children as React.ReactElement, {
          prefersReducedMotion,
          highContrastMode,
          selectedIndex,
        })}
      </div>

      {/* Accessible data table (hidden visually, available to screen readers) */}
      {dataTable && (
        <div
          style={srOnlyStyles}
          dangerouslySetInnerHTML={{ __html: dataTable }}
        />
      )}

      {/* Keyboard navigation hints */}
      {isFocused && config.enableKeyboard && (
        <div
          style={{
            ...srOnlyStyles,
            position: 'absolute',
            top: '100%',
            left: 0,
          }}
          role="status"
          aria-live="polite"
        >
          Use arrow keys to navigate data points. Press Enter to select, Escape to
          clear selection.
        </div>
      )}

      {/* Focus indicator */}
      {isFocused && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            ...focusStyles,
          }}
        />
      )}
    </div>
  );
}

/**
 * Higher-order component to add accessibility to existing charts
 */
export function withAccessibility<P extends object>(
  ChartComponent: React.ComponentType<P>,
  defaultConfig: ChartA11yConfig
) {
  return function AccessibleChart(props: P & { a11yConfig?: Partial<ChartA11yConfig> }) {
    const { a11yConfig, ...chartProps } = props;

    const config: ChartA11yConfig = {
      ...defaultConfig,
      ...a11yConfig,
    };

    return (
      <AccessibleChartWrapper config={config}>
        <ChartComponent {...(chartProps as P)} />
      </AccessibleChartWrapper>
    );
  };
}
