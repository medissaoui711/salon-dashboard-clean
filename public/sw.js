// ═══════════════════════════════════════════════════════════════
// Service Worker — Salon Manager PWA
// استراتيجية: Cache First للملفات الثابتة، Network First للـ API
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = 'salon-manager-v3';
const CACHE_VERSION = '3.0.0';

// الملفات الأساسية للتخزين المؤقت
const CORE_ASSETS = [
  '/login.html',
  '/index.html',
  '/admin.html',
  '/support.html',
  '/privacy.html',
  '/faq.html',
  '/manifest.json',
  // CDN libraries
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

// ── Install: تخزين الملفات الأساسية ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets...');
        // نخزن الملفات المحلية أولاً (مضمونة)
        const localAssets = CORE_ASSETS.filter(url => !url.startsWith('http'));
        return cache.addAll(localAssets)
          .then(() => {
            // نحاول تخزين CDN بشكل اختياري
            const cdnAssets = CORE_ASSETS.filter(url => url.startsWith('http'));
            return Promise.allSettled(
              cdnAssets.map(url => cache.add(url).catch(() => {}))
            );
          });
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate: حذف الكاشات القديمة ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Cache First ──
self.addEventListener('fetch', event => {
  // تجاهل طلبات POST و non-GET
  if (event.request.method !== 'GET') return;

  // تجاهل WhatsApp و wa.me
  if (event.request.url.includes('wa.me') || event.request.url.includes('whatsapp')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          // أعد الملف من الكاش + جدد في الخلفية
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {});
          return cached;
        }
        // لم يُجد في الكاش → اطلب من الشبكة
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) return response;
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => {
            // offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/login.html');
            }
          });
      })
  );
});

// ── Message: force update ──
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
