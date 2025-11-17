/**
 * Chart Accessibility Utilities
 * Provides comprehensive accessibility features for all chart components
 * Implements WCAG 2.1 AA standards for data visualizations
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Accessibility configuration for charts
 */
export interface ChartA11yConfig {
  /** ARIA label describing the chart */
  ariaLabel: string;
  /** Detailed description for screen readers */
  ariaDescription?: string;
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  /** Enable screen reader announcements */
  enableAnnouncements?: boolean;
  /** Support for high contrast mode */
  enableHighContrast?: boolean;
  /** Respect prefers-reduced-motion */
  enableReducedMotion?: boolean;
  /** Tab index for focus management */
  tabIndex?: number;
}

/**
 * Keyboard navigation handler
 */
export interface KeyboardHandler {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
}

/**
 * Hook for chart accessibility features
 */
export function useChartAccessibility(config: ChartA11yConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);

  // Detect user preferences
  useEffect(() => {
    if (!config.enableReducedMotion && !config.enableHighContrast) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    if (config.enableReducedMotion) {
      setPrefersReducedMotion(reducedMotionQuery.matches);
      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    }

    if (config.enableHighContrast) {
      setHighContrastMode(highContrastQuery.matches);
      const handleHighContrastChange = (e: MediaQueryListEvent) => {
        setHighContrastMode(e.matches);
      };
      highContrastQuery.addEventListener('change', handleHighContrastChange);
    }

    return () => {
      if (config.enableReducedMotion) {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      }
      if (config.enableHighContrast) {
        highContrastQuery.removeEventListener('change', handleHighContrastChange);
      }
    };
  }, [config.enableReducedMotion, config.enableHighContrast]);

  // Focus management
  const handleFocus = () => {
    setIsFocused(true);
    if (config.enableAnnouncements) {
      announceToScreenReader(`Focused on ${config.ariaLabel}`);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return {
    containerRef,
    isFocused,
    prefersReducedMotion,
    highContrastMode,
    handleFocus,
    handleBlur,
  };
}

/**
 * Create keyboard event handler for charts
 */
export function createKeyboardHandler(handlers: KeyboardHandler) {
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        handlers.onEnter?.();
        break;
      case 'Escape':
        event.preventDefault();
        handlers.onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        handlers.onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        handlers.onArrowDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlers.onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handlers.onArrowRight?.();
        break;
      case 'Tab':
        handlers.onTab?.();
        break;
    }
  };
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Generate accessible data table from chart data
 */
export function generateDataTable(data: any[], columns: string[]): string {
  const headers = columns.map(col => `<th scope="col">${col}</th>`).join('');
  const rows = data.map(row => {
    const cells = columns.map(col => `<td>${row[col] ?? ''}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <table class="sr-only accessible-data-table">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

/**
 * Get ARIA properties for chart container
 */
export function getChartAriaProps(config: ChartA11yConfig) {
  return {
    role: 'img',
    'aria-label': config.ariaLabel,
    'aria-description': config.ariaDescription,
    tabIndex: config.tabIndex ?? 0,
  };
}

/**
 * High contrast color palette
 */
export const highContrastColors = {
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#FFFF00',
  success: '#00FF00',
  warning: '#FF9900',
  error: '#FF0000',
  info: '#0099FF',
  border: '#000000',
  background: '#FFFFFF',
};

/**
 * Apply high contrast mode to chart colors
 */
export function applyHighContrastColors(colors: string[]): string[] {
  const contrastPalette = [
    highContrastColors.primary,
    highContrastColors.accent,
    highContrastColors.info,
    highContrastColors.success,
    highContrastColors.warning,
    highContrastColors.error,
  ];

  return colors.map((_, index) => contrastPalette[index % contrastPalette.length]);
}

/**
 * Get animation config based on user preferences
 */
export function getAnimationConfig(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      duration: 0,
      easing: 'linear' as const,
      delay: 0,
    };
  }

  return {
    duration: 750,
    easing: 'easeInOut' as const,
    delay: 100,
  };
}

/**
 * Focus styles for interactive elements
 */
export const focusStyles = {
  outline: '3px solid #0066CC',
  outlineOffset: '2px',
  borderRadius: '4px',
};

/**
 * Screen reader only styles
 */
export const srOnlyStyles = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  borderWidth: '0',
};

/**
 * Generate comprehensive chart summary for screen readers
 */
export function generateChartSummary(config: {
  title: string;
  type: string;
  dataPoints: number;
  range?: { min: number; max: number };
  trends?: string[];
  keyInsights?: string[];
}): string {
  let summary = `${config.title}. This is a ${config.type} chart with ${config.dataPoints} data points.`;

  if (config.range) {
    summary += ` Values range from ${config.range.min} to ${config.range.max}.`;
  }

  if (config.trends && config.trends.length > 0) {
    summary += ` Key trends: ${config.trends.join(', ')}.`;
  }

  if (config.keyInsights && config.keyInsights.length > 0) {
    summary += ` Key insights: ${config.keyInsights.join(', ')}.`;
  }

  return summary;
}

/**
 * Create accessible tooltip
 */
export function createAccessibleTooltip(content: string, id: string) {
  return {
    id: `tooltip-${id}`,
    role: 'tooltip',
    'aria-hidden': 'false',
    content,
  };
}

/**
 * Hook for managing chart focus and keyboard navigation
 */
export function useChartKeyboardNavigation(
  dataLength: number,
  onDataPointSelect?: (index: number) => void
) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = createKeyboardHandler({
    onArrowLeft: () => {
      setSelectedIndex(prev => {
        const newIndex = prev === null ? 0 : Math.max(0, prev - 1);
        onDataPointSelect?.(newIndex);
        announceToScreenReader(`Selected data point ${newIndex + 1} of ${dataLength}`);
        return newIndex;
      });
    },
    onArrowRight: () => {
      setSelectedIndex(prev => {
        const newIndex = prev === null ? 0 : Math.min(dataLength - 1, prev + 1);
        onDataPointSelect?.(newIndex);
        announceToScreenReader(`Selected data point ${newIndex + 1} of ${dataLength}`);
        return newIndex;
      });
    },
    onEnter: () => {
      if (selectedIndex !== null) {
        announceToScreenReader(`Activated data point ${selectedIndex + 1}`);
      }
    },
    onEscape: () => {
      setSelectedIndex(null);
      announceToScreenReader('Selection cleared');
    },
  });

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
  };
}
