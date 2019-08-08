import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'

import './MonthCalendar.scss'

function Day (props) {
  return (
    <div
      className={
        [
          'day',
          props.className
        ].join(' ')
      }
    >
      <div className='date'>
        {props.date.format(props.date.date() === 1 ? 'MMM D' : 'D')}
      </div>
      {
        props.events === undefined
          ? null
          : props.events.map((event, idx) => (
            <Link
              key={idx}
              to={'/calendar/event/' + event.id}
              className='event'
            >
              <div className='summary'>

                <strong>
                  {event.summary}
                </strong>
                <br />
                {
                  event.start.dateTime !== undefined
                    ? moment(event.start.dateTime).format('h:mma')
                    : null
                }
              </div>
              <FaBell className='icon' />
            </Link>
          ))
      }
    </div>
  )
}

function MonthCalendar (props) {
  var weeks = []
  var day = props.current.clone().startOf('month')
  day.subtract(day.day(), 'days')

  for (var i = 0; i < 5 || day.isSame(props.current, 'month'); i++) {
    var week = []
    for (var j = 0; j < 7; j++) {
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
          className={
            [
              day.isSame(props.current, 'day') ? 'current' : '',
              day.isSame(props.today, 'day') ? 'today' : '',
              day.isSame(props.current, 'month') ? '' : 'not-in-month'
            ].join(' ')
          }
          key={j}
          date={day.clone()}
          events={events}
        />
      )
      day.add(1, 'day')
    }
    weeks.push(
      <div key={i} className='week'>
        {week}
      </div>
    )
  }

  return (
    <div className='MainCalendar MonthCalendar'>
      <div className='labels'>
        {
          moment.weekdays().map((day, idx) => (
            <div key={idx} className='day'>
              <span className='long'>{day}</span>
              <span className='short'>{day.substr(0, 3)}</span>
            </div>
          ))
        }
      </div>
      {weeks}
    </div>
  )
}

export default MonthCalendar
