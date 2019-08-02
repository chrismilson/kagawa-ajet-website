import React from 'react'
import Page from './Page'
import { FaExternalLinkAlt, FaEnvelope } from 'react-icons/fa'

import './Resources.scss'

var res = [
  {
    name: 'National AJET',
    type: 'link',
    link: 'https://ajet.net/',
    description: `
      The National AJET page is a great resource for JETs of all
    `
  },
  {
    name: 'Tofugu',
    type: 'link',
    link: 'https://www.tofugu.com/',
    description: [
      `
      Tofugu is a great place to start if you want to learn about
      anything Japan.
      They also have
      `,
      <a
        href='https://www.tofugu.com/japan/jet-program-teaching-resources/'
        target='_blank'
        rel='noopener noreferrer'
        key='open'
      >
        resources for JETs
      </a>,
      '.'
    ]
  },
  {
    name: 'Marugame Japanese Lessons',
    type: 'email',
    description: `
      Nishi Sensei does a lesson every week on Wednesday Night in Marugame.
      Get in touch with her by email!
    `,
    email: {
      address: 'mkokusaikoryu-561771@mountain.ocn.ne.jp',
      subject: 'Marugame Japanese Lessons'
    }
  },
  {
    name: 'IPAL Kagawa',
    type: 'link',
    link: 'http://www.i-pal.or.jp/en/whats-i-pal.html',
    description: `
      IPAL is a place in Takamatsu that has cultural events for foreigners
      and Japanese alike. They have Japanese lessons, international cooking
      lessons and much more!
    `
  }
]

function Resource (props) {
  let title
  switch (props.res.type) {
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
    <div className='Resource'>
      {title}
      <div className='description'>
        {props.res.description}
      </div>
    </div>
  )
}

function Resources (props) {
  return (
    <Page>
      <div className='Resources row'>
        <div className='col text'>
          <h1>Resources</h1>
          <p>
            There are plenty of resources for JETs out there.
            Here are just a few!
          </p>
          <div className='res-list'>
            {
              res.map((r, idx) => (
                <Resource key={idx} res={r} />
              ))
            }
          </div>
        </div>
      </div>
    </Page >
  )
}

export default Resources
