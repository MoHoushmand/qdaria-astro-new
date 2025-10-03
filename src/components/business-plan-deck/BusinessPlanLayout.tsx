/** @jsxImportSource react */
import React from 'react';

/**
 * Professional Layout Components for Business Plan Deck
 * Implements 8px grid system with optimal white space
 */

interface BusinessPlanLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

/**
 * Main container for business plan content
 * Provides consistent padding and max-width constraints
 */
export const BusinessPlanLayout: React.FC<BusinessPlanLayoutProps> = ({
  children,
  className = '',
  maxWidth = '2xl'
}) => {
  const maxWidthClass = maxWidth === '3xl' ? 'container-xl-wide' :
                       maxWidth === 'xl' ? 'max-w-xl' :
                       maxWidth === 'lg' ? 'container-lg' :
                       maxWidth === 'md' ? 'container-md' :
                       maxWidth === 'sm' ? 'container-sm' :
                       'container-professional';

  return (
    <div className={`${maxWidthClass} ${className}`}>
      <div className="section-spacing-professional">
        <div className="vertical-rhythm-spacious">
          {children}
        </div>
      </div>
    </div>
  );
};

interface BusinessPlanSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentWidth?: 'narrow' | 'normal' | 'wide' | 'full';
  spacing?: 'compact' | 'comfortable' | 'relaxed' | 'professional';
  showDivider?: boolean;
}

/**
 * Section component with consistent header and content spacing
 * Automatically applies optimal reading width
 */
export const BusinessPlanSection: React.FC<BusinessPlanSectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  titleClassName = '',
  contentWidth = 'wide',
  spacing = 'professional',
  showDivider = true
}) => {
  const widthClass = contentWidth === 'narrow' ? 'content-block-narrow' :
                    contentWidth === 'normal' ? 'content-block-professional' :
                    contentWidth === 'wide' ? 'content-block-wide' :
                    'max-w-full';

  const spacingClass = spacing === 'compact' ? 'section-spacing-compact' :
                      spacing === 'comfortable' ? 'section-spacing-comfortable' :
                      spacing === 'relaxed' ? 'section-spacing-relaxed' :
                      'section-spacing-professional';

  return (
    <section className={`${spacingClass} ${className}`}>
      <div className="business-plan-section-header mb-8">
        <h2 className={`business-plan-section-title text-4xl font-bold mb-3 bg-gradient-to-r from-[#04a3ff] via-[#00ffd3] to-[#65ff00] bg-clip-text text-transparent ${titleClassName}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="business-plan-section-subtitle text-xl text-gray-300 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className={widthClass}>
        <div className="vertical-rhythm-relaxed">
          {children}
        </div>
      </div>
      {showDivider && <div className="divider-section" />}
    </section>
  );
};

interface ContentBlockProps {
  children: React.ReactNode;
  width?: 'narrow' | 'normal' | 'wide' | 'full';
  className?: string;
}

/**
 * Content block with optimal reading width
 * Ensures text doesn't become too wide (65-85 characters per line)
 */
export const ContentBlock: React.FC<ContentBlockProps> = ({
  children,
  width = 'normal',
  className = ''
}) => {
  const widthClass = width === 'narrow' ? 'content-block-narrow' :
                    width === 'normal' ? 'content-block-professional' :
                    width === 'wide' ? 'content-block-wide' :
                    'max-w-full';

  return (
    <div className={`${widthClass} ${className}`}>
      {children}
    </div>
  );
};

interface CardContainerProps {
  children: React.ReactNode;
  spacing?: 'minimal' | 'compact' | 'comfortable' | 'spacious';
  className?: string;
}

/**
 * Card container with professional spacing
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  spacing = 'comfortable',
  className = ''
}) => {
  const spacingClass = spacing === 'minimal' ? 'card-spacing-minimal' :
                      spacing === 'compact' ? 'card-spacing-compact' :
                      spacing === 'comfortable' ? 'card-spacing-comfortable' :
                      'card-spacing-spacious';

  return (
    <div className={`${spacingClass} ${className}`}>
      {children}
    </div>
  );
};

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 'auto-fit' | 'auto-fill' | 'golden' | 'golden-reverse';
  gap?: 2 | 3 | 4 | 5 | 6 | 8 | 10;
  className?: string;
}

/**
 * Responsive grid layout with consistent gaps
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 'auto-fit',
  gap = 6,
  className = ''
}) => {
  const columnsClass = columns === 'auto-fit' ? 'grid-auto-fit' :
                      columns === 'auto-fill' ? 'grid-auto-fill' :
                      columns === 'golden' ? 'grid-golden-2' :
                      columns === 'golden-reverse' ? 'grid-golden-2-reverse' :
                      columns === 2 ? 'grid-2-col' :
                      columns === 3 ? 'grid-3-col' :
                      'grid-4-col';

  const gapClass = `gap-${gap}`;

  return (
    <div className={`${columnsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

interface FlexLayoutProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 2 | 3 | 4 | 5 | 6 | 8 | 10;
  wrap?: boolean;
  className?: string;
}

/**
 * Flexible layout with modern flex properties
 */
export const FlexLayout: React.FC<FlexLayoutProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'center',
  gap = 4,
  wrap = true,
  className = ''
}) => {
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';
  const justifyClass = justify === 'center' ? 'justify-center' :
                      justify === 'end' ? 'justify-end' :
                      justify === 'between' ? 'justify-between' :
                      justify === 'around' ? 'justify-around' :
                      'justify-start';
  const alignClass = align === 'start' ? 'items-start' :
                    align === 'end' ? 'items-end' :
                    align === 'stretch' ? 'items-stretch' :
                    'items-center';
  const gapClass = `gap-${gap}`;
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div className={`flex ${directionClass} ${justifyClass} ${alignClass} ${gapClass} ${wrapClass} ${className}`}>
      {children}
    </div>
  );
};

interface DividerProps {
  type?: 'professional' | 'section' | 'subtle';
  className?: string;
}

/**
 * Divider with appropriate spacing
 */
export const Divider: React.FC<DividerProps> = ({
  type = 'professional',
  className = ''
}) => {
  const typeClass = type === 'section' ? 'divider-section' :
                   type === 'subtle' ? 'divider-subtle' :
                   'divider-professional';

  return <hr className={`${typeClass} ${className}`} />;
};

interface StackProps {
  children: React.ReactNode;
  spacing?: 'tight' | 'compact' | 'normal' | 'relaxed' | 'spacious';
  className?: string;
}

/**
 * Vertical stack with consistent spacing between items
 */
export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'normal',
  className = ''
}) => {
  const spacingClass = spacing === 'tight' ? 'vertical-rhythm-tight' :
                      spacing === 'compact' ? 'vertical-rhythm-compact' :
                      spacing === 'normal' ? 'vertical-rhythm-professional' :
                      spacing === 'relaxed' ? 'vertical-rhythm-relaxed' :
                      'vertical-rhythm-spacious';

  return (
    <div className={`${spacingClass} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive container that adjusts padding based on screen size
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`container-professional ${className}`}>
      {children}
    </div>
  );
};

// Export all components
export default {
  BusinessPlanLayout,
  BusinessPlanSection,
  ContentBlock,
  CardContainer,
  GridLayout,
  FlexLayout,
  Divider,
  Stack,
  ResponsiveContainer
};
