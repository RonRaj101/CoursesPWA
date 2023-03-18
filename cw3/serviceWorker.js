var cacheName = "Course App";
var cacheFiles = [
    "index.html",
    "src/assets/json/courses.json",
    'src/assets/images/icons/icon-72x72.png',
    'src/assets/images/icons/icon-96x96.png',
    'src/assets/images/icons/icon-128x128.png',
    'src/assets/images/icons/icon-144x144.png',
    'src/assets/images/icons/icon-152x152.png',
    'src/assets/images/icons/icon-192x192.png',
    'src/assets/images/icons/icon-384x384.png',
    'src/assets/images/icons/icon-512x512.png',
    'src/assets/images/undraw_art_lover_re_fn8g.svg',
    'src/assets/images/undraw_artificial_intelligence_re_enpp.svg',
    'src/assets/images/undraw_design_process_re_0dhf.svg',
    'src/assets/images/undraw_discount_d-4-bd.svg',
    'src/assets/images/undraw_fashion_photoshoot_mtq8.svg',
    'src/assets/images/undraw_mathematics_-4-otb.svg',
    'src/assets/images/undraw_nakamoto_-2-iv6.svg',
    'src/assets/images/undraw_things_to_say_re_jpcg.svg',
    'src/assets/images/undraw_treasure_of-9-i.svg',
    'src/assets/images/undraw_woman_re_afr8.svg'
];
self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if the cache has the file        
        caches.match(e.request).then(function (r) {
            // download file if not in the cache
            return r || fetch(e.request).then(function(response){
                // add the new file to cache
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
)});