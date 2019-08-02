import React from 'react'
import { Link } from 'react-router-dom'
import * as Fa from 'react-icons/fa'

import { images } from './destination-info'

function RouterLink (props) {
  return (
    props.href.match(/^\//)
      ? <Link to={props.href}>{props.children}</Link>
      : <a
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
      > {
          props.children
        }
      </a>
  )
}

function LocalImage (props) {
  return (
    props.src.match(/^local:/i)
      ? (() => {
        var fullPath = props.src.split(/^local:/i).pop().split('/')
        var path = fullPath.slice(1)
        let img = images
        for (var i = 0; i < path.length; i++) {
          img = img[path[i]]
        }
        return (
          <img {...props}
            alt={props.alt}
            src={img}
          />
        )
      })()
      : <img {...props} alt={props.alt} />
  )
}

function TextRenderer (props) {
  return React.createElement(
    'div',
    null,
    props.value.split(/:(\w+):/).map((text, idx) => {
      if (idx % 2) {
        return <Fa title={text} />
      } else {
        return text
      }
    }))
}

export default {
  // text: TextRenderer
  link: RouterLink,
  image: LocalImage
}
