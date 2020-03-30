import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameSign: "",
      emailSign: "",
      passwordSign: "",
      usernameInput: "",
      passwordInput: "",
      // type: "",
      // url:"",
      // data: {},
      // dataType: "json",
      // success: function(response){
      // },
      // error: function(response){
      // }
    }
  };

  Request = () => {
    var type = '';
    var url = '';
    var data = {};
    var dataType = 'json';
    var success = function(response){
    };
    var error = function(response){
    };
  };

  //------------------ Create User --------------------

  createUser = (username, email, password, callback) => {
    var newRequest = new Request();
    newRequest['type'] = 'POST';
    newRequest['url'] = 'users';
    newRequest['data'] = {
      'user': {
        'username': username,
        'email': email,
        'password': password
      }
    };
    newRequest['success'] = function(response){
      console.log(response);
      return callback();
    };

    $.ajax(newRequest);
  };

  signInUser = (username, password, callback) => {
    var newRequest = new Request();
    newRequest['type'] = 'POST';
    newRequest['url'] = 'sessions';
    newRequest['xhrFields'] = { 'withCredentials': true };
    newRequest['data'] = {
      'user': {
        'username': username,
        'password': password
      }
    };
    newRequest['success'] = function(response){
      console.log(response);
      return callback();
    };

    $.ajax(newRequest);
  };

  //------------------ Authenticate ---------------------

  authenticate = (successCB,errorCB) => {
    var newRequest = new Request();
    newRequest['type'] = 'GET';
    newRequest['url'] = 'authenticated';
    newRequest['xhrFields'] = { 'withCredentials': true };
    newRequest['success'] = function(response){
      console.log(response);
      return successCB(response);
    };
    newRequest['error'] = function(request, errorMessage) {
      return errorCB(errorMessage);
    }

    $.ajax(newRequest);
  };

  authenRedirect = () => {
    authenticate(function(response) {
      if(response.authenticated) {
      window.location = "/tweets";
      }
    });
  };

  //------------------- Sign up / Log in Buttons ---------------------

  handleSignUp = (event) => {
  event.preventDefault();
  window.location = "/tweets";
  createUser(usernameSign, emailSign, passwordSign, function(){
    signInUser(usernameSign, passwordSign, function(){
      authenRedirect();
    });
  });
}

  handleLogIn = (event) => {
    event.preventDefault();
    window.location = "/tweets";
      signInUser(usernameInput, passwordInput, function(){
          authenRedirect();
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
                      type="text"
                      className="form-control username"
                      value={this.state.usernameSign}
                      onChange={event =>
                      this.setState({ usernameSign: event.target.value })
                      }
                      placeholder="Username" />
                  </div>
                  <div className="form-group col-xs-8">
                    <input
                    type="password"
                    className="form-control password"
                    value={this.state.passwordSign}
                    onChange={event =>
                    this.setState({ passwordSign: event.target.value })
                    }
                    placeholder="Password" />
                  </div>
                  <button
                    id="log-in-btn"
                    className="btn btn-default btn-primary col-xs-3 col-xs-offset-1"
                    onClick={this.handleSignUp}>Log in</button>
                </form>
              </div>
              <div className="sign-up col-xs-4 col-xs-offset-1">
                <form>
                  <div className="new-to-t">
                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                  </div>
                  <div className="form-group">
                    <input
                    type="text"
                    className="form-control username"
                    value={this.state.usernameInput}
                    onChange={event =>
                    this.setState({ usernameInput: event.target.value })
                    }
                    placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input
                    type="email"
                    className="form-control email"
                    value={this.state.emailInput}
                    onChange={event =>
                    this.setState({ emailInput: event.target.value })
                    }
                    placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input
                    type="password"
                    className="form-control password"
                    value={this.state.passwordInput}
                    onChange={event =>
                    this.setState({ passwordInput: event.target.value })
                    }
                    placeholder="Password" />
                  </div>
                  <button id="sign-up-btn" className="btn btn-default btn-warning pull-right" onClick={this.handleLogIn}>Sign up for Twitter</button>
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
