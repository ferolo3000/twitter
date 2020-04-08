// tweets.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import User from './user'
import update from 'immutability-helper'
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./tweets.scss"

class Tweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      message: '',
      username: ''
    }
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  componentDidMount() {
    fetch('/api/tweets')
      .then(response => response.json())
      .then(data => this.setState({ tweets: data.tweets }));
  }

  createTweets = (e) => {
    e.preventDefault();
    const data = { message: this.state.message };

    fetch('/api/tweets', safeCredentials({
      method: 'POST',
      body: JSON.stringify(data),
    }))
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  //delete tweets
  deleteTweet = (id) => {
    fetch(`/api/tweets/${id}`, safeCredentials({
      method: 'DELETE',
    }))
      .then(response => {
        const tweetIndex = this.state.tweets.findIndex(x => x.id === id)
        const tweets = update(this.state.tweets, {
          $splice: [[tweetIndex, 1]]
        })
        this.setState({
          tweets: tweets
        })
      })
      .catch(error => console.log(error))
  }

  toggleLike(){
    var unlike = "https://img.icons8.com/metro/24/000000/like.png";
    var like = "https://img.icons8.com/material-rounded/24/000000/like.png"
    var userLike = document.getElementById("liked");
    userLike.src = (userLike.src === like)? unlike : like;
  }

  toggleRetweet(){
    var unret = "https://img.icons8.com/ios-glyphs/24/000000/compare.png";
    var retweet = "https://img.icons8.com/material/24/000000/compare--v1.png";
    var userRetweet = document.getElementById("retweet");
    userRetweet.src = (userRetweet.src === retweet)? unret : retweet;
  }

  render() {
    console.log(this.state.tweets, this.props.username_id);
    return (
      <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-primary">Twitter</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/tweets">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/users/${this.props.username_id}`}>User</a>
            </li>
          </ul>
        </div>
      </nav>
        <div className="row tweet-container">
          <div className="col-4 profile-trends">
            <div className="profileCard col-xs-12 wrapper">
              <div className="user-field col-xs-12">
                <img className="img-circle profile-tweet" src="https://img.icons8.com/ultraviolet/40/000000/user.png" alt="user" /><br />
              </div>
              <div className="user-stats">
                <div className="col-xs-3 stats">
                  <a>
                    <span>Tweets<br /></span>
                    <span className="user-stats-tweets">10</span>
                  </a>
                </div>
                <div className="col-xs-4 stats">
                  <a>
                    <span>Following<br /></span>
                    <span className="user-stats-following">0</span>
                  </a>
                </div>
                <div className="col-xs-4 stats">
                  <a>
                    <span>Followers<br /></span>
                    <span className="user-stats-followers">0</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2 form-content">
              <form onSubmit={this.createTweets}>
                <input id="postField"
                  onChange={this.handleChange}
                  value={this.state.message}
                  type="text"
                  rows={'3'}
                  className="form-control"
                  placeholder="What's up?"
                  maxLength="140" />
                <button className="btn btn-sm btn-primary post-btn float-right"><span>Post</span></button>
              </form>
            </div>
            <div id="post">
                {this.state.tweets.map((tweet) => {
                  return (
                    <div className="tweet-card" key={tweet.id}>
                      <div className="tweet-content">
                        <small className="tweet-username">@{tweet.username}</small>
                        <button className="delete-tweet btn btn-sm float-right" onClick={(e) => this.deleteTweet(tweet.id)}><img src="https://img.icons8.com/small/16/000000/trash--v1.png"/></button><br />
                        <label className="tweet-msg">{tweet.message}</label>
                        <div className="col-sm-12 mt-1 d-flex">
                          <ul className="like-section">
                            <li className="d-inline like"><a><img id="liked" src="https://img.icons8.com/material-outlined/24/000000/like.png" onClick ={this.toggleLike} alt="like"/></a></li>
                            <li className="d-inline like"><a><img id="retweet" src="https://img.icons8.com/ios-glyphs/24/000000/compare.png" onClick ={this.toggleRetweet} alt="retweet"/></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className="col-4">
            <div className="trends">
            <div className="col-xs-12">
              <div className="trends-header">
                <span>Trends</span>
              </div>
              <ul className="trends-list">
                <li><a href="#">#FullStack</a></li>
                <li><a href="#">#Altcademy</a></li>
                <li><a href="#">#React</a></li>
                <li><a href="#">#rails</a></li>
                <li><a href="#">#API</a></li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Tweets

// document.addEventListener('DOMContentLoaded', () => {
//   const node = document.getElementById('params')
//   const data = JSON.parse(node.getAttribute('data-params'))
//
//   ReactDOM.render(
//     <Tweets username_id={data.username_id} />,
//     document.body.appendChild(document.createElement('div')),
//   )
// })

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.body.appendChild(document.createElement('div')),
  )
})
