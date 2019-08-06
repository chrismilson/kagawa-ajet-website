import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import './WeekCalendar.scss'

function Day (props) {
  return (
    <div className='Day'>
      <h4 className='label long'>{props.date.format('dddd')}</h4>
      <h4 className='label short'>{props.date.format('ddd')}</h4>
      <h4 className='label date'>{props.date.format('Do')}</h4>
      {
        props.events.map((event, idx) => (
          <Link
            key={idx}
            to={'/calendar/event/' + event.id}
            className='event'
          >
            <strong>{event.summary}</strong>
            {
              event.start.dateTime !== undefined
                ? moment(event.start.dateTime).format('h:mma')
                : null
            }
          </Link>
        ))
      }
    </div>
  )
}

function WeekCalendar (props) {
  var week = []
  var day = props.current.clone()
  day.subtract(day.day(), 'days')

  for (var i = 0; i < 7; i++) {
    var events = props.events.filter(event => {
      var start = null
      var end = null
      if (event.start.dateTime === undefined) {
        start = moment(event.start.date)
        end = moment(event.end.date)
      } else {
        start = moment(event.start.dateTime)
        end = moment(event.end.dateTime)
      }
      var dayStart = day.clone().startOf('day')
      var dayEnd = day.clone().endOf('day')

      return dayStart.isBefore(start)
        ? start.isBefore(dayEnd)
        : dayStart.isBefore(end)
    })
    week.push(
      <Day
        key={i}
        date={day.clone()}
        events={events}
      />
    )
    day.add(1, 'day')
  }

  return (
    <div className='MainCalendar WeekCalendar'>
      <div className='title'>
        <h1>Week of {props.current.format('LL')}</h1>
      </div>
      <div className='week'>
        {week}
      </div>
    </div>
  )
}

export default WeekCalendar
