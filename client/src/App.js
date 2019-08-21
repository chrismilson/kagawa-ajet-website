import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Resources from './pages/Resources'
import Destinations from './pages/Destinations'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import Default from './pages/Default'
import License from './pages/License'

const config = {
  title: 'Kagawa AJET',
  pages: [
    {
      name: 'Home',
      path: '/',
      isExactPath: true,
      component: Home
    },
    {
      name: 'Resources',
      path: '/resources',
      component: Resources
    },
    {
      name: 'Destinations',
      path: '/destinations',
      component: Destinations
    },
    {
      name: 'Calendar',
      path: '/calendar',
      component: Calendar
    },
    {
      name: 'Contact',
      path: '/contact',
      component: Contact
    },
    {
      name: 'License',
      path: '/license',
      component: License,
      hidden: true
    }
  ]
}

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header
          title={config.title}
          pages={config.pages.filter(e => !e.hidden)}
        />
        <Switch>
          {
            config.pages.map(page => {
              return (
                <Route
                  key={'page-' + page.name}
                  exact={page.isExactPath}
                  path={page.path}
                  component={page.component}
                />
              )
            })
          }
          <Route component={Default} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
