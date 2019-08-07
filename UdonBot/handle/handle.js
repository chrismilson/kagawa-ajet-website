function handle (event) {
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
