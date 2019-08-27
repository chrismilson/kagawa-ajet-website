/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('push', e => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon/UdonHenro-192.png',
    badge: '/icon/UdonHenro-192.png'
  })
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst()
)
workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache'
  })
)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
  })
)
