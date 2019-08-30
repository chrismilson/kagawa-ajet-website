/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

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

  var promiseChain = self.registration.showNotification(data.title, options)

  event.waitUntil(promiseChain)
})

self.addEventListener('notificationclick', event => {
  if (!event.notification.data.url) return

  const urlToOpen = new URL(
    event.notification.data.url,
    self.location.origin
  ).href

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      if (windowClients.length > 0) {
        return windowClients[0].focus().then(client => {
          if ('navigate' in client) {
            return client.navigate(urlToOpen)
          }
        })
      } else {
        return clients.openWindow(urlToOpen)
      }
    })

  event.notification.close()
  event.waitUntil(promiseChain)
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute(
  'https://qr-official.line.me/sid/M/876fxbyc.png',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'external-cache'
  })
)

workbox.routing.registerRoute(
  /\/api\/calendar/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'calendar-cache'
  })
)

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
)
