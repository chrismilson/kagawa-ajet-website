const template = require('../template')

function set (client, set, token) {
  switch (set) {
    case 'help':
      return template.quietAnnounce(client, token, {
        message: 'Let me help you!\nWhat do you need help with?',
        alt: 'Let me help you!',
        buttons: [
          {
            text: 'Website',
            data: 'website',
            response: 'Tell me about the website'
          },
          {
            text: 'Events',
            data: 'events',
            response: 'What\'s happening?'
          }
        ]
      })
  }
}

module.exports = set
