import React from 'react'
import Meta from 'react-meta-tags'

import './Page.scss'

function Page (props) {
  return (
    <div className={[
      'Page',
      props.className,
      props.unbound ? 'unbound' : ''
    ].join(' ')}>
      <Meta>
        {
          props.title
            ? <title>{props.title}</title>
            : 'Kagawa AJET'
        }
        {
          props.description
            ? <meta name='description' content={props.description} />
            : null
        }
      </Meta>
      {props.children}
    </div>
  )
}

export default Page
