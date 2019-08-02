import React from 'react'
import Page from './Page'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown/with-html'
import axios from 'axios'

import './Destinations.scss'

import dests from './destination-info'
import renderers from './renderers'

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
          renderers={renderers}
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
            path={'/destinations/' + d.name.toLowerCase()}
            render={() => <Destination src={d.md} />}
          />
        ))
      }
    </Page>
  )
}

export default Destinations
