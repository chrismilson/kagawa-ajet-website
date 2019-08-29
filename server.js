const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const CalendarApi = require('node-google-calendar')

const calSettings = require('./calendar-settings')
const UdonBot = require('./UdonBot')
const pushRouter = require('./pushRouter')

const app = express()
const PORT = process.env.PORT || 5000
var calendar = new CalendarApi(calSettings)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/UdonBot', UdonBot)
app.use('/push', pushRouter)

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
