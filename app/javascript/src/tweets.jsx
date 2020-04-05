// tweets.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Layout from '@src/layout';
import update from 'immutability-helper'

import "./tweets.scss"

class Tweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      inputValue: ''
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  //get tweets
  getTweets() {
    axios.get('/api/tweets')
      .then(response => {
        this.setState({ tweets: response.data.tweets })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTweets()
  }

//how to get username


  //create tweets
  createTweets = (e) => {
    axios.post('/api/tweets', { tweets: { message: e.target.value } })
      .then(response => {
        const tweets = update(this.state.tweets, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          tweets: tweets,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))
  }

  //delete tweets
  deleteTweet = (id) => {
    axios.delete(`/api/tweets/:${id}`)
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

  render() {
    console.log(this.state.tweets);
    return (
      <Layout>
        <div className="row tweet-container">
          <div className="col-4 profile-trends">
            <div className="profileCard col-xs-12 wrapper">
              <div className="user-field col-xs-12">
                <a className="username">User name</a><br />
                <a className="screenName">@User</a>
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
                  value={this.state.inputValue}
                  type="text"
                  rows={3}
                  className="form-control"
                  placeholder="What's up?"
                  maxLength="140" />
                <button className="btn btn-sm btn-primary post-btn float-right"><span>Post</span></button>
              </form>
            </div>
            <div id="post">
              <ul className="tweets-list">
                {this.state.tweets.map((tweet) => {
                  return (
                    <li className="tweet-content" key={tweet.id}>
                      <label className="tweet-label">{tweet.message}</label>
                      <label className="tweet-label">{tweet.username}</label><br/ >
                      <span className="delete-tweet" onClick={(e) => this.deleteTweet(tweet.id)}>Delete</span>
                    </li>
                  )
                })}
              </ul>
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
      </Layout>
    )
  }
}

export default Tweets

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.body.appendChild(document.createElement('div')),
  )
})
