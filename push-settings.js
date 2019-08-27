const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  vapidPublicKey: 'BCDbDny7iDbCpZQ6llBtl9ANwZBTVXD8EgofXbuGAXzp0Ku7NbYbMlR9BJvhj7oOQEUs-uofTQNpnUGDpyWl2FI',
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY
}
