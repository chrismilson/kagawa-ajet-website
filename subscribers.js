const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Subscriber = mongoose.model('Subscriber', new mongoose.Schema({
  subscription: {
    type: String,
    required: true
  }
}))

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  console.log('connected to database!')
})

const forAll = function (action) {
  Subscriber.find({}, action)
}

const add = function (subscription) {
  return new Promise((resolve, reject) => {
    Subscriber.create({
      subscription: JSON.stringify(subscription)
    }, (err, instance) => {
      if (err) reject(err)
    })
  })
}

module.exports = {
  forAll,
  add
}
