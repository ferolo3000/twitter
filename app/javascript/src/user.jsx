import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from "axios"

import './user.scss';

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id:  '',
      title: '',
      body: '',
      data: []
    }

  };

  componentDidMount() {
    axios.get('/api/users/:username/tweets')
    .then(res => {
      let newData = res.data.slice(0,5);
      this.setState({
        id: newData[newData.length - 1].id + 1,
        data: newData
      }, () => console.log(this.state.id))
      console.log(newData)
    })
    .catch(err => console.log("Couldn't fetch data. Error: " + err))
  }

  render(){
    return(
    <React.Fragment>
    <nav className="top-nav">
      <ul className="nav">
        <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Notifications</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Log Out</a></li>
      </ul>
      </nav>
      <header>
      <section className="profile">
        <div className="profile-header">
          <img className="img-circle profile-image" src="https://randomuser.me/api/portraits/women/10.jpg" alt="user" />
        </div>
        <div className="profile-form">
          <form action="#" className="text-right">
            <button className="btn btn-sm btn-edit">Edit profile</button>
          </form>
        </div>
      </section>
      </header>
      <div className="container">
      <aside className="profile-details">
        <h3>
          User Name
          <small className="text-muted">@username</small>
        </h3>
        <ul className="profile-items">
          <li className="profile-entry"><a href="#">World</a></li>
          <li className="profile-entry"><a href="#">altcademy.com</a></li>
          <li className="text-muted profile-entry">Joined 2020</li>
        </ul>
      </aside>
      <main className="timeline">
        <div className="media">
          <img className="media-image img-circle" src="https://randomuser.me/api/portraits/men/25.jpg" alt="Random user" />
          <div className="media-body">
            <h4 className="tweet-user">Bill Gates <span className="text-muted">@bill</span></h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="media">
          <img className="media-image img-circle" src="https://randomuser.me/api/portraits/men/23.jpg" alt="Random user" />
          <div className="media-body">
            <h4 className="tweet-user">Little Idea <span className="text-muted">@littleidea</span></h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </main>
      <aside className="who-to-follow">
      <div className="media">
      <h4 className="follow-title">Who to follow</h4>
      </div>
        <div className="media">
          <img className="media-image img-circle" src="https://randomuser.me/api/portraits/men/35.jpg" alt="Random user" />
          <div className="media-body">
            <p>James
              <small className="text-muted">@james</small>
            </p>
            <button className="btn btn-sm">Follow</button>
          </div>
        </div>
        <div className="media">
          <img className="media-image img-circle" src="https://randomuser.me/api/portraits/men/2.jpg" alt="Random user" />
          <div className="media-body">
            <p>Messi
              <small className="text-muted">@messi</small>
            </p>
            <button className="btn btn-sm">Follow</button>
          </div>
        </div>
        <div className="media">
          <img className="media-image img-circle" src="https://randomuser.me/api/portraits/men/31.jpg" alt="Random user" />
          <div className="media-body">
            <p>Ronaldo
              <small className="text-muted">@ronaldo</small>
            </p>
            <button className="btn btn-sm">Follow</button>
          </div>
        </div>
      </aside>
      </div>
    </React.Fragment>
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
