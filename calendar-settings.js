const dotenv = require('dotenv')
dotenv.config()

const KEY = process.env.CALENDAR_PRIVATE_KEY
const SERVICE_ACCT_ID = 'calendargetter@kagawa-ajet-website.iam.gserviceaccount.com'
const CALENDAR_ID = {
  primary: 'gprr6e1so5bm32gjig3vf5ehk8@group.calendar.google.com'
}
const TIMEZONE = 'UTC+09:00'
const SCOPES = [
  'https://www.googleapis.com/auth/calendar'
]

module.exports.key = KEY
module.exports.serviceAcctId = SERVICE_ACCT_ID
module.exports.calendarId = CALENDAR_ID
module.exports.timezone = TIMEZONE
module.exports.scopes = SCOPES
