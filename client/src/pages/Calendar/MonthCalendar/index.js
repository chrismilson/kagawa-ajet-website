import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import './MonthCalendar.scss'

function Event (props) {
  return (
    <Link
      to={'/calendar/event/' + props.event.id}
      className='Event'
    >
      <div className='main'>
        <div className='summary'>
          <strong>
            {props.event.summary}
          </strong>
          <br />
          {
            props.event.start.dateTime !== undefined
              ? moment(props.event.start.dateTime).format('h:mma')
              : null
          }
        </div>
      </div>
      <div className='tooltip'>
        <strong>
          {props.event.summary}
        </strong>
        -
        {
          props.event.start.dateTime !== undefined
            ? moment(props.event.start.dateTime).format('h:mma')
            : null
        }
      </div>
    </Link>
  )
}

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
          : props.events.map((event, idx) => <Event key={idx} event={event} />)
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
      <div className='previous' onClick={props.previous}>
        <FaAngleLeft />
      </div>
      <div className='main'>
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
      <div className='next' onClick={props.next}>
        <FaAngleRight />
      </div>
    </div>
  )
}

export default MonthCalendar
