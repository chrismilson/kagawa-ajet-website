import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RouterLink (props) {
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
    var match = props.src.match(/^local:(.*)/i)
    if (match) {
      if (!(match[1] in this.props.images)) return null

      return (
        <img {...props}
          alt={props.alt}
          src={this.props.images[match[1]]}
        />
      )
    }
    return <img {...props} alt={props.alt} />
  }

  render () {
    return (
      <ReactMarkdown
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
