import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import moment from 'moment'

import './DatePicker.scss'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      month: props.current.clone().startOf('month')
    }

    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
  }

  previousMonth () {
    this.setState(state => ({ month: state.month.subtract(1, 'month') }))
  }

  nextMonth () {
    this.setState(state => ({ month: state.month.add(1, 'month') }))
  }

  render () {
    var weeks = []
    var day = this.state.month.clone().date(1 - this.state.month.day())

    for (var i = 0; i < 5 || day.isSame(this.state.month, 'month'); i++) {
      var week = []

      for (var j = 0; j < 7; j++) {
        week.push(
          <div
            key={j}
            onClick={(() => {
              var save = day.clone()
              return () => {
                this.setState(() => ({ month: save.clone().startOf('month') }))
                this.props.setDate(save)
              }
            })()}
            className={[
              'day',
              day.isSame(this.props.today, 'day') ? 'today' : null,
              day.isSame(this.props.current, 'day') ? 'current' : null
            ].join(' ')}
          >
            <span className='date'>{day.format('D')}</span>
          </div>
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
      <div className='DatePicker'>
        <div className='top'>
          <div className='previous' onClick={this.previousMonth}>
            <FaAngleLeft />
          </div>
          <div className='date'>
            {this.state.month.format('MMMM Y')}
          </div>
          <div className='next' onClick={this.nextMonth}>
            <FaAngleRight />
          </div>
        </div>
        <div className='week-label'>
          {
            moment.weekdaysShort().map((name, idx) => (
              <div key={idx} className='day-label'>
                {name}
              </div>
            ))
          }
        </div>
        {weeks}
      </div>
    )
  }
}

export default DatePicker
