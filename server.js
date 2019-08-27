const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const CalendarApi = require('node-google-calendar')
const webpush = require('web-push')

const calSettings = require('./calendar-settings')
const pushSettings = require('./push-settings')
const UdonBot = require('./UdonBot')
const subs = require('./subscribers')

const app = express()
const PORT = process.env.PORT || 5000
var calendar = new CalendarApi(calSettings)

webpush.setVapidDetails(
  'mailto:truck@test.com',
  pushSettings.vapidPublicKey,
  pushSettings.vapidPrivateKey
)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/UdonBot', UdonBot)

app.get('/api/calendar/events', (req, res) => {
  calendar.Events.list('primary', {
    timeMin: req.query.timeMin,
    timeMax: req.query.timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    calendarId: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

app.get('/api/calendar/event', (req, res) => {
  calendar.Events.get('primary', req.query.id, {
    eventId: req.query.id,
    calendarId: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body

  subs.add(subscription)
    .catch(err => console.error(err))

  res.status(201).json({})

  const payload = JSON.stringify({
    title: 'Thanks!',
    body: 'You subscribed to Kagawa AJET!'
  })

  console.log(subscription.endpoint, 'subscribed')

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
