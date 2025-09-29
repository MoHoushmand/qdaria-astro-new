// Service Worker for offline support and performance
const CACHE_NAME = 'qdaria-v1';
const STATIC_CACHE = 'qdaria-static-v1';
const DYNAMIC_CACHE = 'qdaria-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/_astro/globals.css',
  '/favicon.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // HTML pages - network first
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, clonedResponse));
          return response;
        })
        .catch(() => caches.match(request)
          .then(response => response || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Static assets - cache first
  if (url.pathname.includes('/_astro/') ||
      url.pathname.includes('/images/') ||
      url.pathname.includes('/fonts/')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) return response;
          return fetch(request).then(response => {
            const clonedResponse = response.clone();
            caches.open(STATIC_CACHE)
              .then(cache => cache.put(request, clonedResponse));
            return response;
          });
        })
    );
    return;
  }

  // Default - network first with cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        const clonedResponse = response.clone();
        caches.open(DYNAMIC_CACHE)
          .then(cache => cache.put(request, clonedResponse));
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Background sync for resilient form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Sync any pending form data
  const cache = await caches.open('form-data');
  const requests = await cache.keys();

  return Promise.all(
    requests.map(request =>
      fetch(request).then(() => cache.delete(request))
    )
  );
}