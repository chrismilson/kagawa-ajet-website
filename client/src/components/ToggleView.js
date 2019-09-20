import React from 'react'

class ToggleView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      toggled: false
    }
  }

  render () {
    const messages = [
      'See More...',
      'Check it out...',
      'Have a closer look...',
      'I\'m interested...'
    ]
    return this.state.toggled
      ? this.props.children
      : <div
        className='Toggle'
        onClick={() => this.setState({ toggled: true })}
      >
        {messages[~~(Math.random() * messages.length)]}
      </div>
  }
}

export default ToggleView
