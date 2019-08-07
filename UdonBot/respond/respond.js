const template = require('./template')
const set = require('./set')

function respond (client, handled) {
  switch (handled.type) {
    case 'reply':
      var reply = handled.reply
      switch (reply.type) {
        case 'set':
          return set(client, reply.set, reply.token)
      }
  }
}

module.exports = respond
