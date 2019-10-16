import React from 'react'
import Page from './Page'

function Default () {
  return (
    <Page className='Default' title='Page Missing'>
      <div className='col text'>
        <h1>Page not found...</h1>
        <p>
          Oh dear...
          It looks like the page you were looking for is gone.
        </p>
      </div>
    </Page>
  )
}

export default Default
