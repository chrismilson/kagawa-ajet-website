import React from 'react'
import Page from './Page'
import { FaLine } from 'react-icons/fa'

function Contact (props) {
  return (
    <Page className='Contact'>
      <div className='col text'>
        <a href='http://nav.cx/gVHcg1H'>
          <div className='social line'>
            <h1><FaLine /> Line</h1>
            <img
              src='https://qr-official.line.me/sid/M/876fxbyc.png'
              alt='Line QR Code'
            />
          </div>
        </a>
      </div>
    </Page>
  )
}

export default Contact
