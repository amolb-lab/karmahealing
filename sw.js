// Offline cache for Karma Healing Meditation. Bump VERSION when you change any file.
const VERSION = "v4";
const CACHE = "karma-healing-" + VERSION;
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  "maskable-512.png", "apple-touch-icon.png", "favicon-48.png", "session.mp3"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Safari and some Android browsers ask for audio in byte ranges, so answer those from the cached file.
async function rangeFrom(req, res) {
  const buf = await res.arrayBuffer(), size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get("range") || "");
  let start = m && m[1] ? parseInt(m[1], 10) : 0;
  let end = m && m[2] ? parseInt(m[2], 10) : size - 1;
  if (m && !m[1] && m[2]) { start = Math.max(0, size - parseInt(m[2], 10)); end = size - 1; }
  end = Math.min(end, size - 1);
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
    "Content-Range": "bytes " + start + "-" + end + "/" + size,
    "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes" } });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      let hit = await cache.match(req, { ignoreSearch: true, ignoreVary: true });
      if (!hit && req.mode === "navigate") hit = await cache.match("index.html");
      if (hit) return req.headers.get("range") ? rangeFrom(req, hit) : hit;
      try { return await fetch(req); } catch (err) { return new Response("Offline", { status: 503 }); }
    })());
    return;
  }
  // Google Fonts: cache after first visit so the design also works offline.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE + "-fonts");
      const hit = await cache.match(req);
      const net = fetch(req).then((r) => { cache.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })());
  }
});
