// tweets.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Layout from '@src/layout';
import update from 'immutability-helper'

class Tweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      inputValue: ''
    }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

//get tweets
  getTweets() {
    axios.get('/api/tweets')
    .then(response => {
      this.setState({tweets: response.data.tweets})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTweets()
  }

//create tweets
  createTweets = (e) => {
      axios.post('/api/tweets', {tweets: {message: e.target.value}})
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

  render () {
    console.log(this.state.tweets);
    return (
        <Layout>
          <div className="mb-2 fixedMenuFix">
            <form onSubmit={this.createTweets}>
              <input id="postField"
                onChange={this.handleChange}
                value={this.state.inputValue}
                type="text"
                className="form-control"
                placeholder="What's up?"
                maxLength="140" />
              <button className="btn btn-sm btn-primary"><span>Post</span></button>
            </form>
          </div>
          <div id="post">
            <ul className="tweets-list">
              {this.state.tweets.map((tweet) => {
                return(
                  <li className="tweet-content" key={tweet.id}>
                    <label className="tweet-label">{tweet.message}</label>
                    <label className="tweet-label">{tweet.user}</label>
                    <span className="delete-tweet" onClick={(e) => this.deleteTweet(tweet.id)}>Delete</span>
                  </li>
                )
              })}
            </ul>
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
