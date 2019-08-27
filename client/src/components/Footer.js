import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import { FaCog } from 'react-icons/fa'

function Footer () {
  return (
    <div className='Footer'>
      <div className='copyright'>
        {/* <a
          href={
            'mailto:udonkenAJET@shlappas.com' +
              '?subject=Kagawa%20AJET%20Website'
          }
          target='_blank'
          rel='noopener noreferrer'
        >

        </a> */}
        <Link to='/license'>
          {'\xa9'} 2019 Kagawa AJET
        </Link>
      </div>
      <div className='push-subscribe'>
        <Link to='/settings'>
          <FaCog />
        </Link>
      </div>
      <div className='google-calendar-link'>
        <a
          href='https://calendar.google.com/calendar?cid=Z3BycjZlMXNvNWJtMzJnamlnM3ZmNWVoazhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ'
          target='_blank'
          rel='noopener noreferrer'
        >
            Follow the Google Calendar
        </a>
      </div>
    </div>
  )
};

export default Footer
