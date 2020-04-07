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
    }

  };

  //get users tweets
  // getTweets() {
  //   axios.get(`/api/users/${this.props.username_id}/tweets`)
  //     .then(response => {
  //       this.setState({ userTweets: response.data.tweets })
  //     })
  //     .catch(error => console.log(error))
  // }

  componentDidMount() {
    fetch(`/api/users/${this.props.username_id}/tweets`)
      .then(response => response.json())
      .then(data => this.setState({ userTweets: data.tweets }));
  }

  render(){
    console.log(this.props.username_id)
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
        <small className="text-muted username">@{this.props.username_id}</small>
        <ul className="profile-items">
          <li className="profile-entry"><a href="#">World</a></li>
          <li className="profile-entry"><a href="#">altcademy.com</a></li>
          <li className="text-muted profile-entry">Joined 2020</li>
        </ul>
      </aside>
      <main className="timeline">
      {this.state.userTweets.map((tweet) => {
        return (
        <div className="media-user" key={tweet.id}>
          <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
          <div className="media-body">
              <h4 className="tweet-user"><small className="text-muted">{tweet.username}</small></h4>
              <p>{tweet.message}</p>
          </div>
        </div>
      )
      })}
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
  const node = document.getElementById('params')
  const data = JSON.parse(node.getAttribute('data-params'))

  ReactDOM.render(
    <User username_id={data.username_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
