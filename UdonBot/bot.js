const line = require('@line/bot-sdk')
const express = require('express')

const handle = require('./handle')
const respond = require('./respond')

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

const bot = express.Router()
const client = new line.Client(config)

bot.use(express.static('static'))

bot.post('/', line.middleare(config), (req, res) => {
  Promise
    .all(req.body.events.map(event => handle(event)))
    .then(handled => respond(handled))
    .then(response => res.json(client, response))
    .catch(err => {
      console.err(err)
      res.status(500).end()
    })
})

module.exports = bot
