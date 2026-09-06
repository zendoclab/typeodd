// Retire only this legacy Flutter registration. Do not clear shared-origin caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(self.registration.unregister());
});
