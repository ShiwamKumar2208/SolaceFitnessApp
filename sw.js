const CACHE_NAME = "solace-v3";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/workouts.js",
  "/manifest.json",

  "/images/pushups.png",
  "/images/squats.png",
  "/images/plank.png",
  "/images/lunges.png",
  "/images/jumping_jacks.png",
  "/images/arm_circles.png",
  "/images/burpees.png",
  "/images/hamstring.png",
  "/images/high_knees.png",
  "/images/mountain.png",
  "/images/wall_pushups.png"
];

// INSTALL
self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn("Failed to cache:", asset);
        }
      }
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );

  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) return res;

      return fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clone);
          });
          return response;
        })
        .catch(() => new Response("Offline", { status: 503 }));
    })
  );
});