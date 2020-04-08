// layout.js
import React from 'react';

import "./layout.scss";

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-primary">Twitter Clone</span></a>
        <div className="collapse navbar-collapse">
          Altcademy
        </div>
      </nav>
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
