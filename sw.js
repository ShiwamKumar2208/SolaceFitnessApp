const CACHE_NAME = "solace-v5";

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
  "/images/wall_pushups.png",
];

// ---------------- INSTALL ----------------
self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ---------------- ACTIVATE ----------------
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

// ---------------- FETCH ----------------
self.addEventListener("fetch", (e) => {
  const req = e.request;

  // only GET
  if (req.method !== "GET") return;

  // only same-origin
  if (!req.url.startsWith(self.location.origin)) return;

  // 🔥 HTML → network first (for updates)
  if (req.headers.get("accept")?.includes("text/html")) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // 🔥 static → cache first
  e.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req).then((res) => {
          if (!res || res.status !== 200) return res;

          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));

          return res;
        })
      );
    })
  );
});


// =======================================================
// 🔥 BACKGROUND SYNC (OFFLINE WORKOUT LOGGING)
// =======================================================

// store failed requests in IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("solace-db", 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore("workouts", { autoIncrement: true });
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// save workout when offline
async function saveWorkout(data) {
  const db = await openDB();
  const tx = db.transaction("workouts", "readwrite");
  tx.objectStore("workouts").add(data);
  return tx.complete;
}

// get all pending workouts
async function getWorkouts() {
  const db = await openDB();
  const tx = db.transaction("workouts", "readonly");
  const store = tx.objectStore("workouts");

  return new Promise((resolve) => {
    const items = [];
    const req = store.openCursor();

    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        items.push({ id: cursor.key, data: cursor.value });
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
}

// delete synced workout
async function deleteWorkout(id) {
  const db = await openDB();
  const tx = db.transaction("workouts", "readwrite");
  tx.objectStore("workouts").delete(id);
}


// 🔥 listen for messages from app
self.addEventListener("message", (e) => {
  if (e.data?.type === "SAVE_WORKOUT") {
    saveWorkout(e.data.payload).then(() => {
      self.registration.sync.register("sync-workouts");
    });
  }
});


// 🔥 background sync trigger
self.addEventListener("sync", (e) => {
  if (e.tag === "sync-workouts") {
    e.waitUntil(syncWorkouts());
  }
});


// 🔥 send data to server (you'll plug API later)
async function syncWorkouts() {
  const items = await getWorkouts();

  for (const item of items) {
    try {
      // ⚠️ replace with your backend later
      await fakeAPICall(item.data);

      await deleteWorkout(item.id);
    } catch (err) {
      // stop if one fails → retry later
      return;
    }
  }
}


// 🔥 TEMP fake API (replace later)
function fakeAPICall(data) {
  return new Promise((resolve) => {
    console.log("Syncing workout:", data);
    setTimeout(resolve, 500);
  });
}