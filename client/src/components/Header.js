import React, { useState } from 'react';
import Nav from './Nav';
import { FaBars } from 'react-icons/fa';

import './Header.scss'

function MobileMenu(props) {
  const [isToggled, setToggle] = useState(false);

  const toggle = () => setToggle(!isToggled);

  return (
    <div onClick={toggle} className="MobileMenu">
      <div className="icon">
        <h1><FaBars /></h1 >
      </div >
      <Nav
        className={isToggled ? 'visible' : 'not-visible'}
        pages={props.pages}
      />
    </div>
  )
}

function Header(props) {
  const [isToggled, setToggle] = useState(
    false
  )

  const toggle = () => setToggle(!isToggled);

  return (
    <div className="Header">
      <div className="title">
        <h1>{props.title.toUpperCase()}</h1>
      </div>
      <Nav pages={props.pages} />
      <MobileMenu pages={props.pages} />
    </div>
  );
}

export default Header;
