/**
 * QDaria Brand Design System - Complete Design Tokens
 * Extracted from qdaria.com for 100% brand coherence
 * Source: /src/styles/globals.css + /src/styles/global.scss + tailwind.config.cjs
 */

export const qdariaBrand = {
  /**
   * Primary Color Palette
   * Based on HSL(201, 100%, 50%) - #04a3ff
   */
  colors: {
    // Primary Brand Colors
    primary: {
      DEFAULT: '#04a3ff',        // hsl(201 100% 50%)
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',            // Tailwind primary-500
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },

    // Accent Colors
    cyan: '#00ffd3',
    green: '#65ff00',

    // Background & Base Colors
    darkBg: '#000212',           // Main dark background

    // Base Gray Scale
    base: {
      50: '#ffffff',
      100: '#f8f9fa',
      200: '#e9ecef',            // Primary text color
      300: '#dee2e6',            // Secondary text
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
      950: '#000212',
    },

    // Semantic Colors (HSL format from globals.css)
    hsl: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '201 100% 50%',
      primaryForeground: '210 40% 98%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '201 100% 50%',
    },
  },

  /**
   * Shadow System
   * Progressive glow effects using primary blue
   */
  shadows: {
    small: '0 0 15px rgba(4, 163, 255, 0.2)',
    medium: '0 0 25px rgba(4, 163, 255, 0.15)',
    large: '0 0 35px rgba(4, 163, 255, 0.3)',

    // Hover states
    hover: {
      small: '0 0 25px rgba(4, 163, 255, 0.4)',
      medium: '0 0 35px rgba(4, 163, 255, 0.3)',
      large: '0 0 45px rgba(4, 163, 255, 0.5)',
    },

    // Form input shadows
    input: {
      base: '0 0 15px rgba(0, 0, 255, 0.1)',
      focus: '0 0 25px rgba(0, 0, 255, 0.2)',
    },
  },

  /**
   * Border System
   * Tailwind utility classes and raw values
   */
  borders: {
    base: 'border-primary-500/30',
    hover: 'border-primary-500/50',

    // Raw border styles
    raw: {
      base: '1px solid rgba(4, 163, 255, 0.3)',
      hover: '1px solid rgba(4, 163, 255, 0.5)',
    },

    // Border radius
    radius: {
      DEFAULT: '0.5rem',         // --radius
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },

  /**
   * Typography System
   * Responsive fluid typography with gradient text
   */
  typography: {
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      gradient: 'linear-gradient(135deg, #04a3ff 0%, #00ffd3 100%)',
      classes: 'text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '700',
      gradient: 'linear-gradient(135deg, #04a3ff 0%, #00ffd3 100%)',
      classes: 'text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight',
    },
    h3: {
      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
      fontWeight: '600',
      classes: 'text-2xl md:text-3xl font-medium tracking-tight',
    },
    h4: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
      fontWeight: '600',
      classes: 'text-xl md:text-2xl font-medium tracking-tight',
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.75',
      color: 'rgba(209, 213, 219, 0.8)',
      classes: 'text-base-300 leading-relaxed',
    },
    code: {
      fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
      classes: 'rounded-md bg-gray-900 px-2 py-1 text-gray-100',
    },
  },

  /**
   * Gradient Definitions
   * Used for text, backgrounds, and effects
   */
  gradients: {
    primary: 'linear-gradient(135deg, #04a3ff 0%, #00ffd3 100%)',
    secondary: 'linear-gradient(135deg, #04a3ff 0%, #65ff00 100%)',
    radial: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(4, 163, 255, 0.1), transparent 40%)',
    background: 'linear-gradient(to bottom, rgba(4, 163, 255, 0.05), transparent)',
    cardOverlay: 'linear-gradient(to bottom, rgba(4, 163, 255, 0.05), transparent)',
  },

  /**
   * Component Patterns
   * Reusable component styling patterns
   */
  components: {
    /**
     * Interactive Card Pattern
     * .interactive-card from global.scss
     */
    interactiveCard: {
      base: 'relative rounded-lg border border-primary-500/30 bg-dark-bg p-6 transition-all',
      shadow: 'shadow-[0_0_25px_rgba(0,0,255,0.15)]',
      hover: 'hover:border-primary-500/50 hover:shadow-[0_0_35px_rgba(0,0,255,0.3)]',
      before: 'before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-b before:from-primary-500/5 before:to-transparent before:opacity-50',
      full: 'relative rounded-lg border border-primary-500/30 bg-dark-bg p-6 transition-all shadow-[0_0_25px_rgba(0,0,255,0.15)] hover:border-primary-500/50 hover:shadow-[0_0_35px_rgba(0,0,255,0.3)] before:content-[""] before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-b before:from-primary-500/5 before:to-transparent before:opacity-50',
    },

    /**
     * Button Pattern
     * .btn from global.scss
     */
    button: {
      base: 'relative rounded-lg border border-primary-500/30 bg-dark-bg px-6 py-3 text-base-200 transition-all',
      shadow: 'shadow-[0_0_25px_rgba(0,0,255,0.15)]',
      hover: 'hover:border-primary-500/50 hover:shadow-[0_0_35px_rgba(0,0,255,0.3)]',
      before: 'before:content-[""] before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-b before:from-primary-500/5 before:to-transparent before:opacity-50',
      full: 'relative rounded-lg border border-primary-500/30 bg-dark-bg px-6 py-3 text-base-200 shadow-[0_0_25px_rgba(0,0,255,0.15)] transition-all hover:border-primary-500/50 hover:shadow-[0_0_35px_rgba(0,0,255,0.3)]',
    },

    /**
     * Navigation Button Pattern
     * .nav-button from globals.css with mouse tracking
     */
    navButton: {
      base: 'relative',
      shadow: 'shadow-[0_0_15px_rgba(4,163,255,0.2)]',
      hover: 'hover:shadow-[0_0_25px_rgba(4,163,255,0.4)]',
      before: 'before:content-[""] before:absolute before:inset-0 before:rounded-lg before:bg-[radial-gradient(600px_circle_at_var(--mouse-x,0)_var(--mouse-y,0),rgba(4,163,255,0.1),transparent_40%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    },

    /**
     * Form Input Pattern
     * .form__input from global.scss
     */
    input: {
      base: 'w-full rounded-lg border border-primary-500/30 bg-dark-bg/80 px-4 py-3 text-base-200 backdrop-blur-sm transition-all',
      shadow: 'shadow-[0_0_15px_rgba(0,0,255,0.1)]',
      placeholder: 'placeholder:text-gray-500',
      focus: 'focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:shadow-[0_0_25px_rgba(0,0,255,0.2)]',
      full: 'w-full rounded-lg border border-primary-500/30 bg-dark-bg/80 px-4 py-3 text-base-200 shadow-[0_0_15px_rgba(0,0,255,0.1)] backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:shadow-[0_0_25px_rgba(0,0,255,0.2)]',
    },

    /**
     * Navigation Link Pattern
     * .nav-link from global.scss
     */
    navLink: {
      base: 'text-base-200 transition-colors',
      hover: 'hover:text-primary-400',
      full: 'text-base-200 transition-colors hover:text-primary-400',
    },
  },

  /**
   * Layout & Spacing
   */
  layout: {
    section: {
      padding: 'py-16 md:py-24',
    },
    container: {
      base: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      screens: {
        '2xl': '1400px',
      },
    },
  },

  /**
   * Animation & Transitions
   */
  animations: {
    // Accordion animations
    accordionDown: {
      keyframes: {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      duration: '0.2s',
      easing: 'ease-out',
    },
    accordionUp: {
      keyframes: {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      duration: '0.2s',
      easing: 'ease-out',
    },

    // Flowing border animation (from FlowingBorder.astro)
    flowingBorder: {
      borderWidth: '2px',
      borderColor: '#3b82f6',
      shadowColor: 'rgba(59, 130, 246, 0.5)',
      animationDuration: '3s',
      shadowIntensity: '20px',
    },

    // 3D hover effect (from Hover3DCard.astro)
    hover3D: {
      gradient: 'linear-gradient(135deg, rgba(4, 163, 255, 0.1) 0%, rgba(0, 255, 211, 0.1) 100%)',
      transformPerspective: '1000px',
    },
  },

  /**
   * Interactive Effects
   */
  effects: {
    // Mouse position tracking for radial gradients
    mouseTracking: {
      radialGradient: (mouseX: number, mouseY: number) =>
        `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(4, 163, 255, 0.1), transparent 40%)`,
    },

    // Backdrop blur
    backdropBlur: 'backdrop-blur-sm',

    // Glass morphism
    glassMorphism: 'bg-dark-bg/80 backdrop-blur-sm border border-primary-500/30',
  },
} as const;

/**
 * Utility Functions for Design Tokens
 */
export const utils = {
  /**
   * Get HSL color string
   */
  hsl: (h: number, s: number, l: number, a?: number) =>
    a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`,

  /**
   * Get shadow with custom intensity
   */
  shadow: (intensity: 'small' | 'medium' | 'large' | 'hover.small' | 'hover.medium' | 'hover.large') => {
    const parts = intensity.split('.');
    if (parts.length === 2) {
      return qdariaBrand.shadows[parts[0] as 'hover'][parts[1] as 'small'];
    }
    return qdariaBrand.shadows[intensity as 'small'];
  },

  /**
   * Generate gradient text styles
   */
  gradientText: (gradient: string = qdariaBrand.gradients.primary) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
};

/**
 * Type exports for TypeScript support
 */
export type QDariaBrand = typeof qdariaBrand;
export type ColorToken = keyof typeof qdariaBrand.colors;
export type ShadowToken = keyof typeof qdariaBrand.shadows;
export type GradientToken = keyof typeof qdariaBrand.gradients;
export type ComponentToken = keyof typeof qdariaBrand.components;
