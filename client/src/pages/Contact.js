import React from 'react'
import Page from './Page'

const contacts = [
  {
    position: ''
  }
]

function Contact (props) {
  return (
    <Page>
      <div className='Contact row'>
        <div className='col text'>
          <h1>Get in touch</h1>
          <p>
            We are available where you need us!
          </p>
        </div>
      </div>
    </Page>
  )
}

export default Contact
