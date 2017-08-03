var CACHE_NAME = 'codeshare-cache-v1';
var urlsToCache = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});