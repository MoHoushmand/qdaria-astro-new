declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    consentGranted: () => void;
  }
}

export {};