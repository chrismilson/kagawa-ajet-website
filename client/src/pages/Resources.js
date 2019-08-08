import React from 'react'
import Page from './Page'
import { Route, Link } from 'react-router-dom'
import { FaExternalLinkAlt, FaEnvelope } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

import './Resources.scss'
import NewJetResources from './NewJetResources'
import renderers from './renderers'

var res = [
  {
    name: 'New JET Resources',
    type: 'local',
    path: '/resources/new-jets/',
    description: 'Some resources we put together for incoming JETs.'
  },
  {
    name: 'National AJET',
    type: 'link',
    link: 'https://ajet.net/',
    description: 'The National AJET page is a great resource for all JETs.'
  },
  {
    name: 'Tofugu',
    type: 'link',
    link: 'https://www.tofugu.com/',
    description: 'Tofugu is a great place to start if you want to learn about anything Japan. They also have [resources for JETs](https://www.tofugu.com/japan/jet-program-teaching-resources/).'
  },
  {
    name: 'Marugame Japanese Lessons',
    type: 'email',
    description: 'Nishi Sensei does a lesson every week on Wednesday Night in Marugame. Get in touch with her by email!',
    email: {
      address: 'mkokusaikoryu-561771@mountain.ocn.ne.jp',
      subject: 'Japanese Lessons in Marugame'
    }
  },
  {
    name: 'IPAL Kagawa',
    type: 'link',
    link: 'http://www.i-pal.or.jp/en/whats-i-pal.html',
    description: 'IPAL is a place in Takamatsu that has cultural events for foreigners and Japanese alike. They have Japanese lessons, international cooking lessons and much more!'
  },
  {
    name: 'Teaching Principals by MEXT',
    type: 'link',
    link: 'http://www.britishcouncil.jp/sites/britishcouncil.jp/files/alt-handbook-en_0.pdf',
    description: 'This book is a great read for experienced teachers. It\'s a little long but holds about the same information as a TEFL course.'
  },
  {
    name: 'ALTopedia',
    type: 'link',
    link: 'https://www.altopedia.org/',
    description: 'This is a great resource for JHS teaching. It explains all the textbooks and breaks down all the lessons into a form that is easy to understand.'
  },
  {
    name: 'Education.com',
    type: 'link',
    link: 'https://www.education.com/worksheets/ela/',
    description: 'So many worksheets you\'ll never need another one.'
  }
]

function ResourceMemo (props) {
  let title
  switch (props.res.type) {
    case 'local':
      title = (
        <div className='title'>
          <Link to={props.res.path}>
            {props.res.name}
          </Link>
        </div>
      )
      break
    case 'link':
      title = (
        <div className='title'>
          <a
            href={props.res.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            {props.res.name} <FaExternalLinkAlt />
          </a>
        </div>
      )
      break
    case 'email':
      title = (
        <div className='title'>
          {props.res.name + ' '}
          <a
            href={
              'mailto:' + props.res.email.address +
              '?subject=' + props.res.email.subject
            }
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaEnvelope />
          </a>
        </div>
      )
      break
    default:
      title = (
        <div className='title'>
          {props.res.name}
        </div>
      )
  }

  return (
    <div className='ResourceMemo'>
      {title}
      <ReactMarkdown
        className='description'
        source={props.res.description}
        renderers={renderers}
      />
    </div>
  )
}

function Main (props) {
  return (
    <div className='col text'>
      <h1>Resources</h1>
      <p>
        There are plenty of resources for JETs out there.
        Here are just a few!
      </p>
      <div className='res-list'>
        {
          res.map((r, idx) => (
            <ResourceMemo key={idx} res={r} />
          ))
        }
      </div>
    </div>
  )
}

function Resources (props) {
  return (
    <Page className='Resources'>
      <Route exact path='/resources' component={() => <Main />} />
      <Route path='/resources/new-jets' render={NewJetResources} />
    </Page >
  )
}

export default Resources
