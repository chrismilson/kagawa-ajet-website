import React from 'react'
import './Footer.scss'

function Footer () {
  return (
    <div className='Footer'>
      <div className='copyright'>
        <p>
          {'\xa9 '}
          <a
            href={
              'mailto:udonkenAJET@shlappas.com' +
              '?subject=Kagawa%20AJET%20Website'
            }
            target='_blank'
            rel='noopener noreferrer'
          >
            Chris Milson 2019
          </a>
        </p>
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
