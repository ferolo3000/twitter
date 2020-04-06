import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userTweets: [],
    }

  };

  //get users tweets
  // componentDidMount() {
  //   fetch('/api/tweets')
  //     .then(response => response.json())
  //     .then(data => this.setState({ userTweets: data.tweets }));
  // }

  // state = {
  //   userTweets: [],
  //   loading: true,
  // }

  componentDidMount() {
    fetch(`/api/users/${this.props.username}/tweets`)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => this.setState({ userTweets: data.tweets }));
  }

  render(){
    // const { tweets, loading } = this.state;
    // if (loading) {
    //   return <p>loading...</p>;
    // };
    //
    // const {
    //   id,
    //   username,
    //   message
    //   } = tweets

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
      {this.state.userTweets.map((data, index) => {
        return (
          <small className="text-muted">@{data.username}</small>
        )
        })}
        <ul className="profile-items">
          <li className="profile-entry"><a href="#">World</a></li>
          <li className="profile-entry"><a href="#">altcademy.com</a></li>
          <li className="text-muted profile-entry">Joined 2020</li>
        </ul>
      </aside>
      <main className="timeline">
      {this.state.userTweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <div className="media-user">
              <img className="media-image img-circle" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="Random user" />
              <div className="media-body">
                <h4 className="tweet-user"><small className="text-muted">{tweet.username}</small></h4>
                <p>{tweet.message}</p>
              </div>
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
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})
