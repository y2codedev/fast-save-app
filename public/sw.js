self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch handler is required by some browsers to trigger the PWA install prompt.
  // We simply pass the request through to the network.
  event.respondWith(fetch(event.request));
});
