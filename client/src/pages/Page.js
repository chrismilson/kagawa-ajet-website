import React from 'react'
import Meta from 'react-meta-tags'

import './Page.scss'

function Page (props) {
  return (
    <div className={[
      'Page',
      props.className,
      props.unbound ? 'unbound' : '',
      props.unmargin ? 'unmargin' : ''
    ].join(' ')}>
      <Meta>
        <title>
          {
            'Kagawa AJET' + (props.title ? ' - ' + props.title : '')
          }
        </title>
        {
          props.description
            ? <meta name='description' content={props.description} />
            : 'Information and events for those in, or interested in Kagawa!'
        }
      </Meta>
      {props.children}
    </div>
  )
}

export default Page
