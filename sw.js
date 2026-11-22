const CACHE='entrena-montana-v4';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data/plan.json','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/legs.svg','./assets/step.svg','./assets/pull.svg','./assets/push.svg','./assets/cardio.svg','./assets/balance.svg','./assets/move.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
const isAppShell=(u)=>u.pathname.endsWith('/')||/\.(html|js|css|json|webmanifest)$/.test(u.pathname);
const updateCache=(request,response)=>{if(response.ok)caches.open(CACHE).then(c=>c.put(request,response.clone()));return response};
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const u=new URL(e.request.url);if(isAppShell(u)){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>updateCache(e.request,r)).catch(()=>caches.match(e.request)));return}e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>updateCache(e.request,r))))});
