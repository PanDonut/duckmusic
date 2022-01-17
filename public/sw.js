self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response && navigator.onLine == false) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open('duckmusic-offline-version-storage').then(function(cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
           
        }
      })
    );
    
  });