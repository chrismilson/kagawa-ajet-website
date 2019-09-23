import React from 'react'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { FaMapMarkerAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import { RouterLink } from '../../../components/MDPage'
import Loading from '../../../components/Loading'
import ToggleView from '../../../components/ToggleView'

import './EventCalendar.scss'

const Event = React.forwardRef((props, ref) => {
  var start = moment(props.event.start.dateTime
    ? props.event.start.dateTime
    : props.event.start.date
  )
  var end = moment(props.event.end.dateTime
    ? props.event.end.dateTime
    : props.event.end.date
  )

  return (
    <div ref={ref} className={'Event'}>
      <div className='title'><h2>{props.event.summary}</h2></div>
      <div className='date time'>
        <h3>
          {
            start.format('dddd, MMMM Do, YYYY')
          }
        </h3>
        <h3>
          {
            start.format('h:mma - ')
          }
          {
            end.format('h:mma')
          }
        </h3>
      </div>
      <div className='location'>
        {
          props.event.location
            ? (
              <a
                href={
                  'https://www.google.com/maps/search/?api=1&query=' +
                          props.event.location.replace(/ /g, '+')
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <h3>
                  <FaMapMarkerAlt />
                  {
                    ' ' + props.event.location.split(',')[0]
                  }
                </h3>
              </a>
            )
            : null
        }
      </div>
      <ToggleView>
        <ReactMarkdown
          className='description'
          renderers={{ link: RouterLink }}
          source={props.event.description}
          escapeHtml={false}
        />
      </ToggleView>
    </div>
  )
})

class EventCalendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      target: React.createRef()
    }
  }

  componentDidUpdate () {
    if (this.state.target.current) {
      window.scroll(0, this.state.target.current.offsetTop - 160)
    } else {
      window.scroll(0, 0)
    }
  }

  render () {
    var found = false

    return (
      <div className='EventCalendar'>
        <div className='picker'>
          <div
            className='previous'
            onClick={this.props.previous}
          >
            <FaAngleLeft />
          </div>
          <div className='date'>
            {this.props.current.format('MMMM YYYY')}
          </div>
          <div
            className='next'
            onClick={this.props.next}
          >
            <FaAngleRight />
          </div>
        </div>
        {
          this.props.fetched
            ? (
              this.props.events.length === 0
                ? (
                  <div className='message empty'>
                    No Scheduled Events
                    {
                      this.props.current.isBefore(this.props.today)
                        ? null
                        : '.. Yet'
                    }
                  </div>
                )
                : (
                  <div className='events'>
                    {
                      this.props.events.filter(e =>
                        moment(e.start.dateTime
                          ? e.start.dateTime
                          : e.start.date
                        ).isSame(this.props.current, 'month')
                      ).map((e, idx) => {
                        var ref = null
                        var start = moment(e.start.dateTime
                          ? e.start.dateTime
                          : e.start.date
                        )
                        if (!found) {
                          if (start.isAfter(this.props.current)) {
                            ref = this.state.target
                            found = true
                          }
                        }
                        return (
                          <Event key={idx} ref={ref} event={e} />
                        )
                      })
                    }
                  </div>
                )
            )
            : <Loading className='message' />
        }
      </div>
    )
  }
}

export default EventCalendar
