import React from 'react'
import Page from './Page'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown/with-html'
import axios from 'axios'
import * as Fa from 'react-icons/fa'

import './Destinations.scss'

import dests, { images } from './destination-info'

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

class Destination extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      md: ''
    }

    this.getSrc = this.getSrc.bind(this)

    this.getSrc()
  }

  getSrc () {
    axios.get(this.props.src)
      .then(res => {
        this.setState({
          md: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='Destination'>
        <ReactMarkdown
          source={this.state.md}
          escapeHtml={false}
          renderers={{
            link: RouterLink,
            image: LocalImage
            // text: TextRenderer // WAITING FOR PULL ON MAIN PACKAGE
          }}
        />
      </div>
    )
  }
}

function MenuItem (props) {
  return (
    <Link
      className='MenuItem'
      to={
        '/destinations/' + props.dest.name.toLowerCase()
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
    <Page>
      <div className='Destinations row'>
        <Route
          exact
          path='/destinations'
          component={() => <Menu dests={dests} />}
        />
        {
          dests.map((d, idx) => (
            <Route
              key={idx}
              path={'/destinations/' + d.name.toLowerCase()}
              render={() => <Destination src={d.md} />}
            />
          ))
        }
      </div>
    </Page>
  )
}

export default Destinations
