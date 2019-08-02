import React from 'react'
import Page from './Page'

import './Calendar.scss'

class MonthCalendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: null
    }
  }

  render () {

  }
}

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      display: MonthCalendar
    }
  }

  render () {
    return (
      <Page className='Calendar' />
    )
  }
}

export default Calendar
