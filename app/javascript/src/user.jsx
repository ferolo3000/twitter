import React from "react"
import ReactDOM from 'react-dom'

class User extends React.Component {




}

class Userbar extends React.Component{

  render(){
    return(
      <nav id="top-navbar" className="navbar navbar-static-top navbar-expand-sm">
        <a className="navbar-brand" href="#"><img src="https://img.icons8.com/color/48/000000/twitter-squared.png"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#userLinks" aria-controls="userLinks" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userLinks">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-light" type="submit">Go</button>
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active"><a className="nav-link" href="/user"><img src="https://img.icons8.com/ios-glyphs/30/000000/user.png"/></a></li>
            <li className="nav-item active"><a className="nav-link" href="/"><img src="https://img.icons8.com/android/24/000000/logout-rounded.png"/></a></li>
          </ul>
        </div>
       </nav>
    )
  }
}

export default User;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})
