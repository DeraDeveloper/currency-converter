self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  console.log("fetch");
  
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