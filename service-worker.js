/*
const CACHE_NAME = 'web-apps-v2'; // Cache name
const ASSETS_TO_CACHE = [
  '/',                  // Root (index.html)
  '/index.html',        // Main HTML
  //'/style.css',         // CSS file
  //'/app.js',            // JavaScript file
  //'/icons/icon-192.png' // Example icon file
  '/ProjFiles/Apps/TaskPlanner/index.html',
  '/ProjFiles/Apps/TaskPlanner/script.js',
  '/ProjFiles/Apps/TaskPlanner/styles.css'
];




// Install Service Worker and Cache Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching app assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch Event to Serve Cached Files When Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
*/
const CACHE_NAME = 'web-apps-v01'; // Update the version to force new caching
const ASSETS_TO_CACHE = [ // Cache-busting query string
  '/',                  // Root (index.html)
  '/index.html',        // Main HTML
  //'/style.css',         // CSS file
  //'/app.js',            // JavaScript file
  //'/icons/icon-192.png' // Example icon file
  '/ProjFiles/Apps/TaskPlanner/index.html?v=1',
  '/ProjFiles/Apps/TaskPlanner/script.js?v=1',
  '/ProjFiles/Apps/TaskPlanner/styles.css?v=1'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting Service Worker to become active
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Remove old caches
          }
        })
      )
    )
  );
  self.clients.claim(); // Claim clients immediately
});

// Fetch Event to Serve Cached Files When Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
