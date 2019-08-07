function handle (event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log('Test hook recieved: ' + JSON.stringify(event.message))
  }

  return {
    type: 'reply',
    reply: {
      type: 'set',
      set: 'help',
      token: event.replyToken
    }
  }
}

module.exports = handle
