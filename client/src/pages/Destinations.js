import React from 'react';
import Page from './Page';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './Destinations.scss';

import kanonji from './public/images/Destinations/kanonji.jpeg';
import kotohira from './public/images/Destinations/kotohira.jpeg';
import manno from './public/images/Destinations/manno.jpeg';
import marugame from './public/images/Destinations/marugame.jpeg';
import mitoyo from './public/images/Destinations/mitoyo.jpeg';
import naoshima from './public/images/Destinations/naoshima.jpeg';
import sakaide from './public/images/Destinations/sakaide.jpeg';
import sanuki from './public/images/Destinations/sanuki.jpeg';
import shodoshima from './public/images/Destinations/shodoshima.jpeg';
import takamatsu from './public/images/Destinations/takamatsu.jpg';
import zentsuji from './public/images/Destinations/zentsuji.jpeg';

const dests = [
  {
    name: 'Kanonji',
    img: kanonji,
    description: null
  },
  {
    name: 'Kotohira',
    img: kotohira,
    description: null
  },
  {
    name: 'Manno',
    img: manno,
    description: null
  },
  {
    name: 'Marugame',
    img: marugame,
    description: null
  },
  {
    name: 'Mitoyo',
    img: mitoyo,
    description: null
  },
  {
    name: 'Naoshima',
    img: naoshima,
    description: null
  },
  {
    name: 'Sakaide',
    img: sakaide,
    description: null
  },
  {
    name: 'Sanuki',
    img: sanuki,
    description: null
  },
  {
    name: 'Shodoshima',
    img: shodoshima,
    description: null
  },
  {
    name: 'Takamatsu',
    img: takamatsu,
    description: null
  },
  {
    name: 'Zentsuji',
    img: zentsuji,
    description: null
  }
];

function Destination(props) {
  return (
    <div className="Destination text">
      <h1>{props.dest.name}</h1>
      {props.dest.description ?
        props.dest.description : (
          <div className="defaultDescription">
            <p>
              There is no explanation about {props.dest.name} yet.
            </p>
            <p>
              Maybe you could <a
                href={
                  'mailto:kagawaAJET+suggestions@shlappas.com' +
                  '?subject=Kagawa AJET ' + props.dest.name +
                  ' Destination Page Explanation Suggestion'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                write one
              </a>
              !
            </p>
          </div>
        )
      }
    </div>
  )
}

function MenuItem(props) {
  return (
    <Link
      className="MenuItem"
      to={
        'destinations/' + props.dest.name.toLowerCase()
      }
    >
      <img src={props.dest.img} alt={props.dest.name} />
      <h3>{props.dest.name}</h3>
    </Link>
  )
}

function Menu(props) {
  return (
    <div className="Menu">
      {
        dests.map((d, idx) => (
          <MenuItem key={idx} dest={d} />
        ))
      }
    </div>
  )
}

function Destinations(props) {
  return (
    <Page>
      <div className="Destinations row">
        <Route exact path="/destinations" component={Menu} />
        {
          dests.map((d, idx) => (
            <Route
              key={idx}
              path={'/destinations/' + d.name}
              render={() => (<Destination dest={d} />)}
            />
          ))
        }
      </div>
    </Page>
  )
}

export default Destinations;
