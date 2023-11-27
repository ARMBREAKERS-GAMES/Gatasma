// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './main.css',
  './assets/1.png',
  './assets/2.png',
  './assets/ABERTURALULLABY.mp3',
  './assets/betavivi.png',
  './assets/botao.png',
  './assets/botãobaixo.png',
  './assets/botãocima.png',
  './assets/botaopb.png',
  './assets/capa.png',
  './assets/clique.mp3',
  './assets/credito.mp3',
  './assets/erro.mp3',
  './assets/fs.png',
  './assets/fsb.png',
  './assets/gugu.png',
  './assets/logo.mp3',
  './assets/passo.mp3',
  './assets/pilarsu.png',
  './assets/pilartrans.png',
  './assets/pular.png',
  './assets/vivi.png',
  './js/abertura.js',
  './js/axios.min.js',
  './js/cena1.js',
  './js/cena2.js',
  './js/cena3.js',
  './js/config.js',
  './js/cutscene.js',
  './js/efeitos',
  './js/finalfeliz.js',
  './js/index.js',
  './js/phaser.min.js',
  './js/sala.js'

]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
