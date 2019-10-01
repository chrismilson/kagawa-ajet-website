import React from 'react'
import Page from '../Page'
import { Route, Link } from 'react-router-dom'

import './Destinations.scss'
import MDPage from '../../components/MDPage'

/**
 * Place names should match the regular expression
 * ```
 *  /^([A-Z][a-z]*) - (.*)$/
 * ```
 * where $1 is the place name in english and $2 is the place name in Kanji
 */
const dests = [
  { name: 'Ayagawa - 綾川' },
  { name: 'Kanonji - 観音寺' },
  { name: 'Kotohira - 琴平' },
  { name: 'Mannō - 満農' },
  { name: 'Marugame - 丸亀' },
  { name: 'Mitoyo - 三豊' },
  { name: 'Naoshima - 直島' },
  { name: 'Ritsurin Garden - 栗林公園' },
  // { name: 'Sakaide - 坂出' },
  // { name: 'Sanuki - 讃岐' },
  { name: 'Shōdoshima - 小豆島' },
  // { name: 'Takamatsu - 高松' },
  { name: 'Zentsuji - 善通寺' }
].map(p => {
  var place = p.name.split(/ - /)[0].toLowerCase().replace(' ', '-')
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
        '/destinations/' + props.dest.path
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

function Destinations (props) {
  return (
    <Page className='Destinations'>
      <Route
        exact
        path='/destinations'
        component={() => <Menu dests={dests} />}
      />
      {
        dests.map((d, idx) => (
          <Route
            key={idx}
            path={'/destinations/' + d.path}
            render={() => d.component}
          />
        ))
      }
    </Page>
  )
}

export default Destinations
