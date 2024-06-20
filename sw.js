const BASE = location.protocol + "//" + location.host;
const PREFIX = 'V14';
const CACHED_FILES = [
    `${BASE}/tabs.js`,
    `${BASE}/reset.css`,
    `${BASE}/studim.css`,
    `${BASE}/offline.html`
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(PREFIX).then(cache => {
            return cache.addAll(CACHED_FILES);
        })
    );
});

self.addEventListener('activate', (event) => {
    clients.claim();
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== PREFIX) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    return response;
                })
                .catch(() => {
                    return caches.match('/offline.html');
                })
        );
    } else {
        const requestURL = new URL(event.request.url);
        if (CACHED_FILES.includes(requestURL.pathname)) {
            event.respondWith(
                caches.match(event.request).then(cachedResponse => {
                    return cachedResponse || fetch(event.request);
                })
            );
        } else {
            event.respondWith(
                fetch(event.request).catch(() => {
                    return caches.match('/offline.html');
                })
            );
        }
    }
});

self.addEventListener("message", event => {
    if (event.data.action === "sendNotification") {
      const { userId, body } = event.data;
  
      if (Notification.permission === "granted") {
        self.registration.showNotification(userId, { body });
      }
    }
  });