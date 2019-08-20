import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import moment from 'moment'
import { FaMapMarkerAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import renderers from '../../pages/renderers'

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
      <ReactMarkdown
        className='description'
        renderers={renderers}
        source={props.event.description}
        escapeHtml={false}
      />
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
    console.log('boo')
    if (this.state.target.current) {
      window.scroll(0, this.state.target.current.offsetTop - 160)
    }
  }

  render () {
    var found = false

    return (
      <div className='EventCalendar'>
        <div className='picker'>
          <div
            className='previous'
            onClick={() => this.props.setDate(
              this.props.current.clone().add(-1, 'month')
            )}
          >
            <FaAngleLeft />
          </div>
          <div className='date'>
            {this.props.current.format('MMMM YYYY')}
          </div>
          <div
            className='next'
            onClick={() => this.props.setDate(
              this.props.current.clone().add(1, 'month')
            )}
          >
            <FaAngleRight />
          </div>
        </div>
        <div className='events'>

          {
            this.props.events.map((e, idx) => {
              var ref = null
              var start = moment(e.start.dateTime
                ? e.start.dateTime
                : e.start.date
              )
              if (!found) {
                if (start.isAfter(this.props.current) ||
                idx === this.props.events.length - 1) {
                  ref = this.state.target
                  found = true
                  console.log('shmoo', idx)
                }
              }
              return (
                <Event key={idx} ref={ref} event={e} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default EventCalendar
