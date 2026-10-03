const PREFIX = 'cho-ve-an-cache-';
const CACHE_NAME = PREFIX + 'v1';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n.startsWith(PREFIX) && n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Chỉ xử lý tài nguyên tĩnh cùng origin; mọi request khác (vd. zalo.me) để trình duyệt tự xử lý.
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE_NAME).then((c) => c.match(req)).then((cached) => {
      if (cached) return cached;
      return fetch(req).catch(() => {
        if (req.mode === 'navigate') return caches.open(CACHE_NAME).then((c) => c.match('./index.html'));
        return Response.error();
      });
    })
  );
});
