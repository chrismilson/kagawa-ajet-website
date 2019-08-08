import React from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'

import pages from './new-jet-resources'
import renderers from './renderers'

import './NewJetResources.scss'

class ResourcePage extends React.Component {
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
      <div className='ResourcePage'>
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
            render={() => <ResourcePage src={page.md} />}
          />
        ))
      }
    </div>
  )
}

export default NewJetResources
