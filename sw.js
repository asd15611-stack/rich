const CACHE_NAME = 'rich-north-air-v321-20261117';
const REQUIRED = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(REQUIRED)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n.startsWith('rich-north-air-')&&n!==CACHE_NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event => {
 const request=event.request;
 if(request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).then(response=>{if(response.ok){const clone=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',clone)));}return response;}).catch(()=>caches.match('./index.html')));
   return;
 }
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
