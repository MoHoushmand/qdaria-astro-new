/**
 * Focus Management & Keyboard Navigation
 * Ensures accessible keyboard interaction
 */

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = getFocusableElements(element);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    element => {
      // Check if element is visible
      return element.offsetParent !== null &&
             !element.hasAttribute('hidden') &&
             window.getComputedStyle(element).display !== 'none';
    }
  );
}

/**
 * Manage focus restore when closing modals
 */
export class FocusManager {
  private previousFocus: HTMLElement | null = null;
  private focusTrap: (() => void) | null = null;

  /**
   * Save current focus and trap focus in element
   */
  capture(element: HTMLElement): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.focusTrap = trapFocus(element);
  }

  /**
   * Restore previous focus and remove trap
   */
  restore(): void {
    if (this.focusTrap) {
      this.focusTrap();
      this.focusTrap = null;
    }

    if (this.previousFocus && typeof this.previousFocus.focus === 'function') {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }
}

/**
 * Create a roving tabindex for a group of elements
 * Useful for toolbars, tab lists, etc.
 */
export class RovingTabIndex {
  private elements: HTMLElement[];
  private currentIndex: number = 0;

  constructor(
    container: HTMLElement,
    selector: string = '[role="tab"], [role="menuitem"]'
  ) {
    this.elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    this.init();
  }

  private init(): void {
    this.elements.forEach((element, index) => {
      element.setAttribute('tabindex', index === 0 ? '0' : '-1');

      element.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
      element.addEventListener('click', () => this.setFocus(index));
    });
  }

  private handleKeyDown(e: KeyboardEvent, index: number): void {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (index + 1) % this.elements.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (index - 1 + this.elements.length) % this.elements.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = this.elements.length - 1;
        break;
      default:
        return;
    }

    this.setFocus(newIndex);
  }

  setFocus(index: number): void {
    if (index < 0 || index >= this.elements.length) return;

    // Update tabindex
    this.elements[this.currentIndex].setAttribute('tabindex', '-1');
    this.elements[index].setAttribute('tabindex', '0');

    // Move focus
    this.elements[index].focus();
    this.currentIndex = index;
  }

  destroy(): void {
    this.elements.forEach(element => {
      element.removeAttribute('tabindex');
    });
  }
}

/**
 * Skip to main content functionality
 */
export function initSkipToContent(): void {
  const skipLink = document.querySelector<HTMLAnchorElement>('.skip-to-content');
  if (!skipLink) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.querySelector<HTMLElement>('#main-content, main');

    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    }
  });
}

/**
 * Announce changes to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = getOrCreateAnnouncer(priority);
  announcer.textContent = message;

  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

function getOrCreateAnnouncer(priority: 'polite' | 'assertive'): HTMLElement {
  const id = `announcer-${priority}`;
  let announcer = document.getElementById(id);

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = id;
    announcer.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);
  }

  return announcer;
}

/**
 * Detect when keyboard is being used for navigation
 */
export class KeyboardDetector {
  private isUsingKeyboard: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    // Detect keyboard usage
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.setKeyboardMode(true);
      }
    });

    // Detect mouse usage
    document.addEventListener('mousedown', () => {
      this.setKeyboardMode(false);
    });

    // Detect touch usage
    document.addEventListener('touchstart', () => {
      this.setKeyboardMode(false);
    });
  }

  private setKeyboardMode(isKeyboard: boolean): void {
    if (this.isUsingKeyboard === isKeyboard) return;

    this.isUsingKeyboard = isKeyboard;
    document.body.classList.toggle('using-keyboard', isKeyboard);
    document.body.classList.toggle('using-mouse', !isKeyboard);
  }

  isKeyboardNavigation(): boolean {
    return this.isUsingKeyboard;
  }
}

/**
 * Initialize all focus management features
 */
export function initAccessibility(): void {
  initSkipToContent();
  new KeyboardDetector();

  // Add focus-visible polyfill behavior
  if (typeof window !== 'undefined') {
    document.body.classList.add('js-focus-visible');
  }
}
