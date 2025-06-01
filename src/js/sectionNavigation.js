/**
 * Section Navigation Enhancement
 * 
 * This utility enhances the business plan's section navigation by:
 * 1. Making all headings clickable with proper focus states
 * 2. Ensuring section navigation works properly
 * 3. Fixing any z-index or pointer-events issues
 */

// Initialize section navigation enhancements
export function initSectionNavigation() {
  document.addEventListener('DOMContentLoaded', () => {
    enhanceHeadings();
    setupHashChangeHandler();
    fixZIndexIssues();
    
    // If URL has a hash, navigate to it after a short delay to ensure all content is loaded
    if (window.location.hash) {
      setTimeout(() => {
        navigateToSection(window.location.hash);
      }, 500);
    }
  });
}

// Make headings interactive and properly focusable
function enhanceHeadings() {
  // Find all section headings
  const headings = document.querySelectorAll('h2, h3, h4');
  
  headings.forEach(heading => {
    // Skip if heading is already enhanced
    if (heading.classList.contains('enhanced-heading')) return;
    
    // Get heading ID or create one based on text content
    const headingId = heading.id || createIdFromText(heading.textContent);
    heading.id = headingId;
    
    // Make heading interactive
    heading.classList.add('enhanced-heading');
    heading.tabIndex = 0;
    heading.style.cursor = 'pointer';
    heading.style.position = 'relative';
    heading.style.zIndex = '10'; // Ensure heading is above other content
    
    // Create a higher stacking context for the heading
    heading.style.isolation = 'isolate';
    
    // Add click handler
    heading.addEventListener('click', () => {
      navigateToSection(`#${headingId}`);
    });
    
    // Add keyboard handler
    heading.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateToSection(`#${headingId}`);
      }
    });
    
    // Add focus styles
    heading.addEventListener('focus', () => {
      heading.style.outline = '2px solid #04a3ff';
      heading.style.outlineOffset = '4px';
    });
    
    heading.addEventListener('blur', () => {
      heading.style.outline = 'none';
    });
    
    // Add hover effect
    heading.addEventListener('mouseenter', () => {
      heading.style.textDecoration = 'underline';
      heading.style.textDecorationColor = '#04a3ff';
    });
    
    heading.addEventListener('mouseleave', () => {
      heading.style.textDecoration = 'none';
    });
    
    // Add aria attributes
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-label', `Navigate to section: ${heading.textContent}`);
  });
}

// Handle hash changes for section navigation
function setupHashChangeHandler() {
  window.addEventListener('hashchange', () => {
    navigateToSection(window.location.hash);
  });
}

// Navigate to a specific section
function navigateToSection(hash) {
  if (!hash) return;
  
  const targetId = hash.replace('#', '');
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    // Scroll to element with smooth behavior
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Focus on the element
    targetElement.focus({ preventScroll: true });
    
    // Highlight the element temporarily
    const originalBackground = targetElement.style.background;
    targetElement.style.background = 'rgba(4, 163, 255, 0.1)';
    setTimeout(() => {
      targetElement.style.background = originalBackground;
    }, 1500);
  }
}

// Fix z-index and pointer-events issues
function fixZIndexIssues() {
  // Fix specific issue with section 2.6
  const strategicTimeline = document.querySelector('h2:contains("Strategic Execution Timeline")');
  if (strategicTimeline) {
    strategicTimeline.style.pointerEvents = 'auto';
    strategicTimeline.style.zIndex = '50';
    
    // Create a clickable region
    const clickableRegion = document.createElement('div');
    clickableRegion.style.position = 'absolute';
    clickableRegion.style.top = '0';
    clickableRegion.style.left = '0';
    clickableRegion.style.width = '100%';
    clickableRegion.style.height = '100%';
    clickableRegion.style.zIndex = '5';
    clickableRegion.style.cursor = 'pointer';
    
    strategicTimeline.parentNode.insertBefore(clickableRegion, strategicTimeline);
    clickableRegion.appendChild(strategicTimeline);
    
    // Create ID if needed
    if (!strategicTimeline.id) {
      strategicTimeline.id = 'strategic-execution-timeline';
    }
    
    // Add click handler to the region
    clickableRegion.addEventListener('click', () => {
      navigateToSection(`#${strategicTimeline.id}`);
    });
  }
  
  // Ensure all chart containers have proper z-index
  document.querySelectorAll('.feature-card').forEach(card => {
    card.style.position = 'relative';
    card.style.zIndex = '1';
  });
}

// Create an ID from text content
function createIdFromText(text) {
  if (!text) return 'section-' + Math.random().toString(36).substr(2, 9);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}

// Initialize on load
initSectionNavigation();

// Add support for dynamic content loading
document.addEventListener('astro:after-swap', initSectionNavigation);