const express = require('express')
const path = require('path')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/calendar', (req, res) => {
  axios.get('https://calendar.google.com/calendar/ical/gprr6e1so5bm32gjig3vf5ehk8%40group.calendar.google.com/public/basic.ics')
    .then(calRes => {
      res.json(calRes.data)
    })
    .catch(err => console.log(err))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
