const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const CalendarApi = require('node-google-calendar')
const webpush = require('web-push')
const { OAuth2Client } = require('google-auth-library')

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
    .catch(console.error)
})

app.get('/api/calendar/event', (req, res) => {
  calendar.Events.get('primary', req.query.id, {
    eventId: req.query.id,
    calendarId: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
  })
    .then(data => res.send(data))
    .catch(console.error)
})

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body

  subs.add(subscription)
    .catch(console.error)

  res.status(201).json({})

  const payload = JSON.stringify({
    title: 'Thanks!',
    options: {
      body: 'You subscribed to Kagawa AJET!'
    }
  })

  webpush
    .sendNotification(subscription, payload)
    .catch(console.error)
})

app.post('/push', (req, res, next) => {
  // Make sure the token is coming from the correct app
  if (req.body.auth === null) {
    res.status(500).json({
      message: 'Failed',
      error: 'No Auth'
    })
  } else {
    const clientId = '1041590858311-m20k80j8364bsta2gbiohhdqjc6hj7u5.apps.googleusercontent.com'
    const client = new OAuth2Client(clientId)

    client.verifyIdToken({
      idToken: req.body.auth,
      audience: clientId
    })
      .then(ticket => {
        // Only allow the Kagawa AJET google account to send messages
        if (ticket.payload.sub === '109435964458075825398') {
          next()
        } else {
          res.status(401).json({
            message: 'Failed',
            error: 'Unauthorised'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({
          message: 'Failed',
          error: 'Could not verify'
        })
      })
  }
}, (req, res) => {
  if (req.body.serverMessage) console.log(req.body.serverMessage)
  subs.forAll((subscription, id) => {
    webpush
      .sendNotification(subscription, req.body.payload)
      .catch((err) => {
        if (err.statusCode === 404 || err.statusCode === 410) {
          subs.remove(id)
        } else {
          console.error(err)
        }
      })
  })
    .then(() => res.status(200).json({
      message: 'Success'
    }))
    .catch(err => {
      console.error(err)
      res.status(500).json({
        message: 'Failed',
        error: 'Could not send'
      })
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
