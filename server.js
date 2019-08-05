const express = require('express')
const path = require('path')
const CalendarApi = require('node-google-calendar')

const calSettings = require('./calendar-settings')

const app = express()
const PORT = process.env.PORT || 5000

var calendar = new CalendarApi(calSettings)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/calendar', (req, res) => {
  calendar.Events.list('primary', {
    timeMin: req.query.timeMin,
    timeMax: req.query.timeMax,
    calendarId: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.get('/api/calendar/event', (req, res) => {
  calendar.Events.get('primary', req.query.id, {
    eventId: req.query.id,
    calendarId: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
