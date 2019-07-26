import React from 'react';
import './Page.scss';

function Page(props) {
  return (
    <div className="Page">
      {props.children}
    </div>
  )
}

export default Page;
