import React from 'react'
import Page from './Page'

function Default () {
  return (
    <Page>
      <div className='Default row'>
        <div className='col'>
          <h1>Page not found...</h1>
          <p>
            Oh dear...
            It looks like the page you were looking for is gone.
          </p>
        </div>
      </div>
    </Page>
  )
}

export default Default
