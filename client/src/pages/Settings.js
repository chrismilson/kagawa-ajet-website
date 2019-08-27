import React from 'react'

import * as sw from '../serviceWorker'
import Page from './Page'

import './Settings.scss'

class EnableButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: 'Loading...',
      class: 'unavailable',
      onClick: null
    }

    this.check = this.check.bind(this)
  }

  check () {
    this.props.check()
      .then(state => {
        this.setState(() => ({
          text: state.enabled ? 'Disable' : 'Enable',
          class: 'available',
          onClick: state.enabled ? state.disable : state.enable
        }))
      })
      .catch(err => {
        this.setState(() => ({ text: 'Unavailable', class: 'unavailable' }))
        console.log(err)
      })
  }

  componentDidMount () {
    this.check()
  }

  render () {
    return (
      <div
        className={'EnableButton ' + this.state.class}
        onClick={
          () => {
            if (this.state.onClick === null) return
            this.state.onClick().then(this.check)
          }
        }
      >
        {this.state.text}
      </div>
    )
  }
}

function Settings (props) {
  return (
    <Page className='Settings'>
      <div className='col'>
        <h1>Settings</h1>
        <div className='options'>
          <div className='option'>
            <div className='summary'>Push Notifications</div>
            <EnableButton
              check={sw.isSubscribed}
            />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Settings
