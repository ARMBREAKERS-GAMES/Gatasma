// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './manifest.json',
  './sw.js',
  './assets/Arte/cena1.json',
  './assets/Arte/cena1.png',
  './assets/cutscene/frasco.png',
  './assets/cutscene/logo.png',
  './assets/cutscene/olhando.png',
  './assets/cutscene/submundo.png',
  './assets/cutscene/textosub.png',
  './assets/fase2/alavanca2.png',
  './assets/fase2/botaoa.png',
  './assets/fase2/botaoc2.png',
  './assets/fase2/cena2.json',
  './assets/fase2/imagemcena2.png',
  './assets/fase2/musica2.mp3',
  './assets/fase2/porta2.png',
  './assets/fase2/portasobe2.png',
  './assets/fase2/sombra.png',
  './assets/fase2/tocha.png',
  './assets/fase2/transparente.png',
  './assets/fase2/vapo.png',
  './assets/fase3/cena3.json',
  './assets/fase3/fundocena3.png',
  './assets/fase3/gugu.png',
  './assets/fase3/imagemcena3.png',
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
