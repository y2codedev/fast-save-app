self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch handler is required by some browsers to trigger the PWA install prompt.
  // We simply pass the request through to the network and catch errors.
  event.respondWith(
    fetch(event.request).catch((err) => {
      console.error('Fetch failed:', err);
      // Return a basic offline response or just let it fail gracefully
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});
