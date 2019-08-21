import React from 'react'
import Page from './Page'
import { FaLine, FaEnvelope } from 'react-icons/fa'

function Contact (props) {
  return (
    <Page className='Contact'>
      <div className='col text'>
        <div className='email'>
          <h1><FaEnvelope /> Email</h1>
          <a
            href='mailto:udonkenajet@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            udonkenajet@gmail.com
          </a>
        </div>
        <div className='social line'>
          <h1><FaLine /> Line</h1>
          <a href='http://nav.cx/gVHcg1H'>
            <img
              src='https://qr-official.line.me/sid/M/876fxbyc.png'
              alt='Line QR Code'
            />
          </a>
        </div>
      </div>
    </Page>
  )
}

export default Contact
