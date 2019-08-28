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
  console.log('Connected to subscriber database')
})

const forAll = function (action) {
  return new Promise((resolve, reject) => {
    Subscriber.find({}, (err, docs) => {
      if (err) reject(err)

      docs.map(doc => action(JSON.parse(doc.subscription), doc._id))
    })
    resolve()
  })
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

const remove = function (id) {
  return new Promise((resolve, reject) => {
    Subscriber.findByIdAndDelete(id)
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  forAll,
  add,
  remove
}
