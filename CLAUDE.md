# QDaria Astro Site Development Guide

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build production site
- `npm run preview` - Preview built site
- `npm run astro` - Run Astro CLI commands

## Code Style Guidelines
- **TypeScript**: Use strict mode. Create proper type definitions in `/src/types/`.
- **Components**: Create modular, reusable components with consistent naming.
- **Formatting**: Follow Prettier conventions for Astro and Tailwind files.
- **Imports**: Use path aliases (@components, @layouts, @config, @js, @images).
- **CSS**: Prefer Tailwind utility classes. Use SCSS for complex animations.
- **Naming**: Use PascalCase for components, camelCase for variables/functions.
- **i18n**: Support English (default) and French locales using Astro i18n routing.

## Design System
- Primary color: #04a3ff, Secondary: #00ffd3, Accent: #65ff00
- Use quantum-inspired gradients and animations
- Maintain accessibility with proper ARIA labels and text alternatives

## Performance
- Optimize images and lazy-load non-critical content
- Minimize JavaScript bundle size
- Follow Astro's recommended patterns for SSG optimization