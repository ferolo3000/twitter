import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from "axios"

import './user.scss';

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userTweets: [],
      username: "bobby"
    }

  };

//how to get username


  //get users tweets
  getTweets() {
    axios.get(`/api/users/:${this.state.username}/tweets`)
    //axios.get(`/api/users/:bobby/tweets`)
      .then(response => {
        this.setState({ userTweets: response.data.tweets })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTweets()
  }

  render(){
    return(
    <React.Fragment>
    <nav className="top-nav">
      <ul className="nav">
        <li className="nav-item"><a className="nav-link" href="#">Twitter</a></li>
        <li className="nav-item"><a className="nav-link" href="/tweets">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/">Log Out</a></li>
      </ul>
      </nav>
      <header>
      <section className="profile">
        <div className="profile-header">
          <img className="img-circle profile-image" src="https://img.icons8.com/ultraviolet/80/000000/user.png" alt="user" />
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
      {this.state.userTweets.map((data) => {
        return (
        <h3>
          {data.username}
          <small className="text-muted">@{data.username}</small>
          </h3>
        )
        })}
        <ul className="profile-items">
          <li className="profile-entry"><a href="#">World</a></li>
          <li className="profile-entry"><a href="#">altcademy.com</a></li>
          <li className="text-muted profile-entry">Joined 2020</li>
        </ul>
      </aside>
      <main className="timeline">
        <div className="media-user">
          <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
          <div className="media-body">
          {this.state.userTweets.map((tweet) => {
            return (
              <div key={tweet.id}>
                <h4 className="tweet-user"><small className="text-muted">{tweet.username}</small></h4>
                <p>{tweet.message}</p>
              </div>
            )
            })}
          </div>
        </div>
      </main>
      <aside className="who-to-follow">
      <div className="media">
      <h4 className="follow-title">Who to follow</h4>
      </div>
        <div className="media">
          <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
          <div className="media-body">
            <p>James
              <small className="text-muted">@james</small>
            </p>
            <button className="btn btn-sm">Follow</button>
          </div>
        </div>
        <div className="media">
          <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
          <div className="media-body">
            <p>Messi
              <small className="text-muted">@messi</small>
            </p>
            <button className="btn btn-sm">Follow</button>
          </div>
        </div>
        <div className="media">
          <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
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
