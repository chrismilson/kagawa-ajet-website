import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './MDPage.scss'

export function RouterLink (props) {
  return (
    props.href.match(/^\//)
      ? <Link to={props.href}>{props.children}</Link>
      : <a
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {
          props.children
        }
      </a>
  )
}

class MDPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      md: ''
    }

    this.getSrc = this.getSrc.bind(this)
    this.imageRenderer = this.imageRenderer.bind(this)

    this.getSrc()
  }

  getSrc () {
    axios.get(this.props.fName)
      .then(res => {
        this.setState({
          md: res.data
        })
      })
      .catch(err => console.log(err))
  }

  imageRenderer (props) {
    if (!(props.src in this.props.images)) return null

    return (
      <img {...props}
        alt={props.alt}
        src={this.props.images[props.src]}
      />
    )
  }

  render () {
    return (
      <ReactMarkdown
        className={'MDPage ' + (this.props.className || '')}
        renderers={{
          link: RouterLink,
          image: this.imageRenderer
        }}
        source={this.state.md}
      />
    )
  }
}

export default MDPage
