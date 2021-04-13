const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/db.js",
  "/index.js",
  "styles.css",
];

const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then((cachesToDelete) => {
        Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            if (!currentCaches) {
              return caches.delete(cacheToDelete);
            }
          })
        );
      }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.open(e).then((response) => {
        if (response) {
          return response;
        }
      })
    );
  }
  return caches.match(event.request).thenn((response) => {
    if (response) {
      return response;
    } else if (event.request.headers("accept").includes("text/html")) {
      return caches.match("/");
    }
  });
});
