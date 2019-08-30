const express = require('express')
const webpush = require('web-push')
const { OAuth2Client } = require('google-auth-library')

const subs = require('./subscribers')
const pushSettings = require('./push-settings')
const pushRouter = express.Router()

webpush.setVapidDetails(
  'mailto:truck@test.com',
  pushSettings.vapidPublicKey,
  pushSettings.vapidPrivateKey
)

pushRouter.post('/subscribe/dev', (req, res) => {
  const subscription = req.body

  subs.add(subscription, true)
    .catch(console.error)

  res.status(201).json({})

  const payload = JSON.stringify({
    title: 'Devin!',
    options: {
      body: 'You will get dev notifications!'
    }
  })

  webpush
    .sendNotification(subscription, payload)
    .catch(console.error)
})

pushRouter.post('/subscribe', (req, res) => {
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

pushRouter.post('/notify/dev', auth, (req, res) => {
  if (req.body.serverMessage) {
    console.log(req.body.serverMessage)
    console.log(JSON.parse(req.body.payload))
  }

  subs.forDev((subscription, id) => {
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

pushRouter.post('/notify', auth, (req, res) => {
  if (req.body.serverMessage) {
    console.log(req.body.serverMessage)
    console.log(JSON.parse(req.body.payload))
  }

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

function auth (req, res, next) {
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
}

module.exports = pushRouter
