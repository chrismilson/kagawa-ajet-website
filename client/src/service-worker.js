/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('push', event => {
  const data = event.data.json()

  // set defaults
  var options = data.options
  options.icon = options.icon || '/icon/UdonHenro-512.png'
  options.badge = options.badge || '/icon/badge-512.png'
  options.vibrate = options.silent
    ? undefined
    : options.vibrate || [
      50, 150, 50, 50, 50, 50, 50, 150, 50
    ]
  options.data = options.data || {
    url: '/'
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  const urlToOpen = new URL(
    event.notification.url,
    self.location.origin
  ).href

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let matchingClient = null

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i]
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient
        break
      }
    }

    if (matchingClient) {
      return matchingClient.focus()
    } else {
      return clients.openWindow(urlToOpen)
    }
  })

  event.waitUntil(promiseChain)
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

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
)
