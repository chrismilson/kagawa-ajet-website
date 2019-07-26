import React from 'react';
import Nav from './Nav';
import { FaBars } from 'react-icons/fa';

import './Header.scss'

function Header(props) {
  return (
    <div className="Header">
      <div className="title">
        <h1>{props.title.toUpperCase()}</h1>
      </div>
      <Nav pages={props.pages} />
      <div className="icon">
        <h1><FaBars /></h1>
      </div>
    </div>
  );
}

export default Header;
