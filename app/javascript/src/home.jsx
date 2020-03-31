import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios';

import './home.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      emailInput: "",
      pwdInput: "",
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePwd = this.handlePwd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };



  handleUsername = event => {
    this.setState({ usernameInput: event.target.value });

  }
  handleEmail = event => {
    this.setState({ emailInput: event.target.value });
    }
  handlePwd = event => {
    this.setState({ pwdInput: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.usernameInput,
      email: this.state.emailInput,
      password: this.state.pwdInput
    };

    axios.post("api/users/create", { user })

  .then(function (response) {
    console.log(response);
    alert("working");
    window.location = "/tweets";
  })
  .catch(function (error) {
    console.log(error);
    alert("NOT working");
  });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="center">
            <img className="logo" src="https://img.icons8.com/color/96/000000/twitter.png"/>
            <h1>Welcome to Twitter</h1>
            <div>
              <div className="log-in col-xs-4 col-xs-offset-1">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      id="username1"
                      type="text"
                      className="form-control username"
                      // value={this.state.usernameInput}
                      // onChange={event =>
                      // this.setState({ usernameInput: event.target.value })
                      // }
                      placeholder="Username" />
                  </div>
                  <div className="form-group col-xs-8">
                    <input
                    id="password1"
                    type="password"
                    className="form-control password"
                    // value={this.state.pwdInput}
                    // onChange={event =>
                    //   this.setState({ pwdInput: event.target.value })
                    // }
                    placeholder="Password" />
                  </div>
                  <button
                    id="log-in-btn"
                    className="btn btn-default btn-primary col-xs-3 col-xs-offset-1"
                    onClick={this.handleLogIn}>Log in</button>
                </form>
              </div>
              <div className="sign-up col-xs-4 col-xs-offset-1">
                <form onSubmit={this.handleSubmit}>
                  <div className="new-to-t">
                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                  </div>
                  <div className="form-group">
                    <input
                    id="username"
                    type="text"
                    className="form-control username"
                    value={this.state.usernameInput}
                    onChange={this.handleUsername}
                    placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input
                    id="email"
                    type="email"
                    className="form-control email"
                    value={this.state.emailInput}
                    onChange={this.handleEmail}
                    placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input
                    id="password"
                    type="password"
                    className="form-control password"
                    value={this.state.pwdInput}
                    onChange={this.handlePwd}
                    placeholder="Password" />
                  </div>
                  <button id="sign-up-btn"
                  className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
