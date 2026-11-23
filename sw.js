const CACHE='entrena-montana-v10';
const ASSETS=['./','./index.html','./styles.css?v=10','./app.js?v=10','./data/plan.json','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/legs.svg','./assets/step.svg','./assets/pull.svg','./assets/push.svg','./assets/cardio.svg','./assets/balance.svg','./assets/move.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
const isAppShell=(u)=>u.pathname.endsWith('/')||/\.(html|js|css|json|webmanifest)$/.test(u.pathname);
const updateCache=(request,response)=>{if(response.ok)caches.open(CACHE).then(c=>c.put(request,response.clone()));return response};
const networkFirst=(request)=>{const timeout=new Promise((_,reject)=>setTimeout(()=>reject(Error('network timeout')),5000));return Promise.race([fetch(request,{cache:'no-cache'}),timeout]).then(r=>updateCache(request,r)).catch(()=>caches.match(request))};
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const u=new URL(e.request.url);if(isAppShell(u)){e.respondWith(networkFirst(e.request));return}e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>updateCache(e.request,r))))});
