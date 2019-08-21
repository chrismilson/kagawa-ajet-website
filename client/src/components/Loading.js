import React from 'react'

import './Loading.scss'

function Loading (props) {
  return (
    <div className={'Loading ' + (props.className ? props.className : '')}>
      Loading...
    </div>
  )
}

export default Loading
