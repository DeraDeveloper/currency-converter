let staticCacheName = 'dera-static';
let contentImgsCache = 'dera-content-imgs';
let allCaches = [
  staticCacheName,
  contentImgsCache
];

self.addEventListener('install', (event) => {
	console.log("installing...");
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'index.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
	console.log("activating.........");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('dera-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
	console.log("fetching;;;;");
	console.log(event.request.url);
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
    if (requestUrl.pathname.startsWith('/photos/')) {
      event.respondWith(servePhoto(event.request));
      return;
    }
    // TODO: respond to avatar urls by responding with
    // the return value of serveAvatar(event.request)
    if (requestUrl.pathname.startsWith('/avatar/')){
      event.respondWith(serveAvatar(event.request));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});