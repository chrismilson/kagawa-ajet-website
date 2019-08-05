import React from 'react'
import moment from 'moment'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Page from './Page'

import DatePicker from '../components/calendar/DatePicker'
import MonthCalendar from '../components/calendar/MonthCalendar'

import './Calendar.scss'

class EventPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.getEvents = this.getEvents.bind(this)
  }

  getEvents () {
    axios.get('/api/calendar/event', {
      params: {
        id: this.props.match.params.id
      }
    })
      // .then(res => console.log(res.data))
      .then(res => this.setState({ event: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.getEvents()
  }

  render () {
    if (this.state.event !== undefined) {
      var start = moment(this.state.event.start)
    }

    return (
      <Page className='EventPage'>
        {
          this.state.event === undefined
            ? <div className='loading col'>Loading...</div>
            : (
              <div className='event text'>
                <h1>{this.state.event.summary}</h1>

                <h3>
                  Starting at { start.format('h:mm') } on the
                  { start.format(' do') } of { start.format('MMMM, YYYY') }
                </h3>
                {
                  this.state.event.description
                    ? this.state.event.description.split('\n\n').map((p, idx) => (
                      <p key={idx}>
                        {p}
                      </p>
                    ))
                    : null
                }
              </div>
            )
        }
      </Page>
    )
  }
}

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: moment(),
      today: moment().startOf('day'),
      current: moment().startOf('day'),
      type: 'month',
      events: []
    }

    var dateSet = moment(props.match.params.date, 'YYYY-M-D')
    if (dateSet.isValid()) {
      this.state.current = dateSet
    }

    this.getEvents = this.getEvents.bind(this)
    this.setDate = this.setDate.bind(this)
  }

  getEvents (date = this.state.current.clone()) {
    var start = date.clone().startOf(this.state.type)
    var end = date.clone().endOf(this.state.type)

    if (this.state.type === 'month') {
      start.subtract(start.day())
      end.add(7 - end.day())
    }

    axios.get('/api/calendar', {
      params: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString()
      }
    })
      .then(res => this.setState(() => ({ events: res.data })))
      .catch(err => console.log(err))
  }

  setDate (date) {
    if (!date.isSame(this.state.current, this.state.type)) {
      this.getEvents(date)
    }
    this.setState(() => {
      return {
        current: date
      }
    })
  }

  componentDidMount () {
    this.getEvents()
  }

  render () {
    return (
      <div className='Calendar'>
        <DatePicker
          current={this.state.current}
          today={this.state.today}
          setDate={this.setDate}
        />
        {
          (() => {
            switch (this.state.type) {
              // case 'day':
              //   return <DayCalendar {...this.state} />
              // case 'week':
              //   return <WeekCalendar {...this.state} />
              default:
              case 'month':
                return <MonthCalendar {...this.state} />
            }
          })()
        }
      </div>
    )
  }
}

function CalendarPage (props) {
  return (
    <div className='CalendarPage'>
      <Route exact path='/calendar/:date?' component={Calendar} />
      <Route exact path='/calendar/event/:id' component={EventPage} />
    </div>
  )
}

export default CalendarPage
