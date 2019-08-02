import React from 'react'
import { Link } from 'react-router-dom'

function Nav (props) {
  return (
    <div className={'Nav ' + props.className}>
      {
        props.pages.map((page, idx) => {
          return (
            <Link key={idx} to={page.path}>{page.name}</Link>
          )
        })
      }
    </div>
  )
}

export default Nav
