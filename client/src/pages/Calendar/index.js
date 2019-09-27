import React from 'react'
import moment from 'moment'
import { Route } from 'react-router-dom'
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown/with-html'
import axios from 'axios'

import Page from '../Page'

import EventCalendar from './EventCalendar'
import MonthCalendar from './MonthCalendar'

import './Calendar.scss'

class EventPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.getEvent = this.getEvent.bind(this)
  }

  getEvent () {
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
    this.getEvent()
  }

  render () {
    var start = null
    var fullDay = false
    if (this.state.event !== undefined) {
      if (this.state.event.start.dateTime === undefined) {
        fullDay = true
        start = moment(this.state.event.start.date)
      } else {
        start = moment(this.state.event.start.dateTime)
      }
    }

    return (
      <Page className='EventPage'>
        {
          this.state.event === undefined
            ? <div className='loading col'>Loading...</div>
            : (
              <div className='event text'>
                <div className='summary'>
                  <h1>{this.state.event.summary}</h1>
                  <h1
                    className='exit'
                    onClick={this.props.history.goBack}
                  >
                    <FaTimes />
                  </h1>
                </div>
                {
                  this.state.event.location
                    ? (
                      <a
                        href={
                          'https://www.google.com/maps/search/?api=1&query=' +
                          this.state.event.location.replace(/ /g, '+')
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <h3>
                          <FaMapMarkerAlt />
                          {
                            ' ' + this.state.event.location.split(',')[0]
                          }
                        </h3>
                      </a>
                    )
                    : null
                }
                <h4>
                  {
                    fullDay
                      ? null
                      : start.format('h:mma') +
                        ' to ' +
                        moment(this.state.event.end.dateTime).format('h:mma') +
                        ' on the '
                  }
                  { start.format('Do') } of { start.format('MMMM, YYYY') }
                </h4>
                <ReactMarkdown
                  className='description'
                  source={this.state.event.description}
                  escapeHtml={false}
                />
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
      fetched: false,
      events: []
    }

    this.getEvents = this.getEvents.bind(this)
    this.setDate = this.setDate.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  getEvents (date = this.state.current.clone()) {
    var start = date.clone().startOf(this.state.type)
    var end = date.clone().endOf(this.state.type)
    this.setState(() => ({ fetched: false }))

    if (this.state.type === 'month') {
      start.subtract(start.day(), 'days')
      end.add(7 - end.day(), 'days')
    }

    axios.get('/api/calendar/events', {
      params: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString()
      }
    })
      .then(res => {
        this.setState(() => ({ events: res.data, fetched: true }))
      })
      .catch(err => console.log(err))
  }

  setDate (date) {
    date.startOf(this.state.type)
    if (!date.isSame(this.state.current, this.state.type)) {
      this.getEvents(date)
    }
    this.setState(() => {
      return {
        current: date
      }
    })
    if (date.isSame(this.state.now, this.state.type)) {
      this.props.history.replace('/calendar')
    } else {
      this.props.history.replace('/calendar/' + date.format('YYYY-MM-DD'))
    }
  }

  previous () {
    this.setDate(this.state.current.clone().add(-1, this.state.type))
  }

  next () {
    this.setDate(this.state.current.clone().add(1, this.state.type))
  }

  handleKeyPress (event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.previous()
        break
      case 'ArrowRight':
        this.next()
        break
      default:
    }
  }

  componentDidMount () {
    var dateSet = moment(this.props.match.params.date, 'YYYY-M-D')
    if (dateSet.isValid()) {
      this.setDate(dateSet)
    } else {
      this.getEvents()
    }
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  render () {
    if (this.props.match.params.date === 'event') return null

    return (
      <div className='Calendar'>
        {/* <div className='sidebar'>
          <DatePicker
            current={this.state.current}
            today={this.state.today}
            setDate={this.setDate}
          />
        </div> */}
        {
          (() => {
            switch (this.state.type) {
              // case 'day':
              //   return <DayCalendar {...this.state} />
              // case 'week':
              //   return <WeekCalendar {...this.state} />
              default:
              case 'month':
                return (
                  <MonthCalendar
                    {...this.state}
                    previous={this.previous}
                    next={this.next}
                  />
                )
            }
          })()
        }
        <EventCalendar
          {...this.state}
          previous={this.previous}
          next={this.next}
        />
      </div>
    )
  }
}

function CalendarPage (props) {
  return (
    <div className='CalendarPage'>
      <Route path='/calendar/event/:id' component={EventPage} />
      <Route exact path='/calendar/:date?/:type?' component={Calendar} />
    </div>
  )
}

export default CalendarPage
