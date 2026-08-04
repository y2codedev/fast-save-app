self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch handler is required by some browsers to trigger the PWA install prompt.
  // We MUST ignore cross-origin requests (like unpkg/jsdelivr) because proxying them
  // through the SW can strip critical CORS and WASM compilation headers!
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Pass same-origin requests through to the network
  event.respondWith(
    fetch(event.request).catch((err) => {
      console.error('Fetch failed:', err);
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});
