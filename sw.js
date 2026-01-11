// TODO: Implement a real caching strategy, because service workers can easily create “why won’t it update?” hell

self.addEventListener("install", (event) => {
  // TODO: Precache assets when ready, because offline mode needs explicit files
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // TODO: Clean old caches, because stale caches waste storage and cause bugs
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // TODO: Add cache-first or network-first logic, because default passthrough provides no offline benefit
  // For now: passthrough
});
