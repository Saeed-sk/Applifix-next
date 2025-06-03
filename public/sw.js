self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('applifix-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/offline',
                '/manifest.json',
                '/icons/android-chrome-192x192.png',
                '/icons/android-chrome-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
                    .catch(() => {
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline');
                        }
                    });
            })
    );
});
