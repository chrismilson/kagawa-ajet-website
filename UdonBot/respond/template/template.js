const color = require('../../color.js')

function quietAnnounce (client, token, data) {
  return client.replyMessage(token, {
    type: 'flex',
    altText: data.alt,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: {
          type: 'text',
          align: 'center',
          color: color.primary,
          size: 'lg',
          weight: 'bold',
          text: data.title === undefined ? 'UdonBot Help' : data.title
        }
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'image',
                url: 'https://kagawa-ajet.herokuapp.com/UdonBot/images/mascot.png'
              },
              {
                type: 'text',
                wrap: true,
                text: data.message
              }
            ]
          }
        ].concat(data.buttons.map(button => ({
          type: 'button',
          style: 'primary',
          color: color.primary,
          action: {
            type: 'postback',
            label: button.text,
            data: button.data,
            displayText: button.response
          }
        })))
      }
    }
  }, true)
}

module.exports = {
  quietAnnounce
}
