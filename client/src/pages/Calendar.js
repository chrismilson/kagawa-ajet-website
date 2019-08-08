import React from 'react'
import moment from 'moment'
import { Route } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown/with-html'
import { Swipeable } from 'react-swipeable'
import axios from 'axios'

import Page from './Page'

import {
  DatePicker,
  MonthCalendar,
  WeekCalendar
} from '../components/calendar'

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
    var start = null
    if (this.state.event !== undefined) {
      if (this.state.event.start.dateTime === undefined) {
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
                <h1>{this.state.event.summary}</h1>
                {
                  this.state.event.location
                    ? (
                      <a
                        href={
                          'https://www.google.com/maps/place/' +
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
                  Starting at { start.format('h:mma') } on the
                  { start.format(' Do') } of { start.format('MMMM, YYYY') }
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
      events: []
    }

    var dateSet = moment(props.match.params.date, 'YYYY-M-D')
    if (dateSet.isValid()) {
      this.state.current = dateSet
    }

    switch (props.match.params.type) {
      case 'day':
        this.state.type = 'day'
        break
      case 'week':
        this.state.type = 'week'
        break
      default:
      case 'month':
        this.state.type = 'month'
    }

    this.getEvents = this.getEvents.bind(this)
    this.setDate = this.setDate.bind(this)

    this.getEvents()
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

  render () {
    if (this.props.match.params.type === 'event') return null
    return (
      <div className='Calendar'>
        <DatePicker
          current={this.state.current}
          today={this.state.today}
          setDate={this.setDate}
        />
        <Swipeable
          className='Swipeable'
          onSwipedRight={() => {
            this.setDate(this.state.current.clone().subtract(
              1,
              this.state.type
            ))
          }}
          onSwipedLeft={() => {
            this.setDate(this.state.current.clone().add(
              1,
              this.state.type
            ))
          }}
        >
          {
            (() => {
              switch (this.state.type) {
              // case 'day':
              //   return <DayCalendar {...this.state} />
                case 'week':
                  return <WeekCalendar {...this.state} />
                default:
                case 'month':
                  return <MonthCalendar {...this.state} />
              }
            })()
          }
        </Swipeable>
      </div>
    )
  }
}

function CalendarPage (props) {
  return (
    <div className='CalendarPage'>
      <Route path='/calendar/event/:id' component={EventPage} />
      <Route exact path='/calendar/:type?/:date?' component={Calendar} />
    </div>
  )
}

export default CalendarPage
