/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('push', e => {
  const data = e.data.json()

  // set defaults
  var options = data.options
  options.icon = options.icon || '/icon/UdonHenro-512.png'
  options.badge = options.badge || '/icon/badge-512.png'
  options.vibrate = options.silent
    ? undefined
    : options.vibrate || [
      50, 150, 50, 50, 50, 50, 50, 150, 50
    ]

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

self.addEventListener('notificationclick', e => {
  var notification = e.notification
  var action = e.action

  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow('https://kagawa-ajet.herokuapp.com')
    notification.close()
  }
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
