import React from 'react'
import { Route, Link } from 'react-router-dom'

import MDPage from '../../../components/MDPage'

import './NewJetResources.scss'

var pages = [
  { name: 'What to Bring', thumb: 'png' }
].map(p => {
  var place = p.name.toLowerCase().replace(/ /g, '-')
  var dir = './' + place + '/'
  let thumb

  switch (p.thumb) {
    case 'jpg':
      thumb = require(dir + place + '.jpg')
      break
    case 'png':
      thumb = require(dir + place + '.png')
      break
    default:
      thumb = require(dir + place + '.jpeg')
  }

  var component = p.component || <MDPage
    fName={require(dir + place + '.md')}
    images={require(dir + 'images')}
  />

  return {
    name: p.name,
    path: place,
    thumbnail: thumb,
    component: component
  }
})

function MenuItem (props) {
  return (
    <Link
      className='MenuItem'
      to={
        '/resources/new-jets/' + props.dest.path
      }
    >
      <img src={props.dest.thumbnail} alt={props.dest.name} />
      <h3>{props.dest.name}</h3>
    </Link>
  )
}

function Menu (props) {
  return (
    <div className='Menu'>
      {
        props.dests.map((d, idx) => (
          <MenuItem key={idx} dest={d} />
        ))
      }
    </div>
  )
}

function NewJetResources (props) {
  return (
    <div className='NewJetResources'>
      <Route
        exact
        path='/resources/new-jets'
        component={() => <Menu dests={pages} />}
      />
      {
        pages.map((page, idx) => (
          <Route
            key={idx}
            path={'/resources/new-jets/' + page.path}
            render={() => page.component}
          />
        ))
      }
    </div>
  )
}

export default NewJetResources
