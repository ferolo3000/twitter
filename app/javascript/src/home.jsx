import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './home.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      user_email: "",
      user_pwd: "",
      user_name: "",
      user_pwd: "",
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

  // Request = () => {
  //   var type = '';
  //   var url = '';
  //   var data = {};
  //   var dataType = 'json';
  //   var success = function(response){
  //   };
  //   var error = function(response){
  //   };
  // };
  //
  // //------------------ Create User --------------------
  //
  // createUser = (username, email, password, callback) => {
  //   var newRequest = new Request();
  //   newRequest['type'] = 'POST';
  //   newRequest['url'] = 'users';
  //   newRequest['data'] = {
  //     'user': {
  //       'username': username,
  //       'email': email,
  //       'password': password
  //     }
  //   };
  //   newRequest['success'] = function(response){
  //     console.log(response);
  //     return callback();
  //   };
  //
  //   $.ajax(newRequest);
  // };
  //
  // signInUser = (username, password, callback) => {
  //   var newRequest = new Request();
  //   newRequest['type'] = 'POST';
  //   newRequest['url'] = 'sessions';
  //   newRequest['xhrFields'] = { 'withCredentials': true };
  //   newRequest['data'] = {
  //     'user': {
  //       'username': username,
  //       'password': password
  //     }
  //   };
  //   newRequest['success'] = function(response){
  //     console.log(response);
  //     return callback();
  //   };
  //
  //   $.ajax(newRequest);
  // };
  //
  // //------------------ Authenticate ---------------------
  //
  // authenticate = (successCB,errorCB) => {
  //   var newRequest = new Request();
  //   newRequest['type'] = 'GET';
  //   newRequest['url'] = 'authenticated';
  //   newRequest['xhrFields'] = { 'withCredentials': true };
  //   newRequest['success'] = function(response){
  //     console.log(response);
  //     return successCB(response);
  //   };
  //   newRequest['error'] = function(request, errorMessage) {
  //     return errorCB(errorMessage);
  //   }
  //
  //   $.ajax(newRequest);
  // };

  // authenRedirect = () => {
  //   authenticatefunction = (response) => {
  //     if(response.authenticated) {
  //     window.location = "/tweets";
  //     }
  //   };
  // };

  //------------------- Sign up / Log in Buttons ---------------------
//
//   handleSignUp = (event) => {
//   event.preventDefault();
//   createUser(user_name, user_email, user_pwd, function(){
//     signInUser(user_name, user_pwd, function(){
//       authenRedirect();
//     });
//   });
// }


handleSignUp = (e) => {
  e.preventDefault()
  var userInfo = {
    user: {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
   }
  }
  $.ajax({
   type: "POST",
   url: "/users",
   dataType: 'json',
   data: userInfo,
   error: function (error) {
    console.log(error)
   },
   success: function (res) {
    window.location = "/tweets";
   }
  })
}

  // handleLogIn = (event) => {
  //   event.preventDefault();
  //   //window.location = "/tweets";
  //     signInUser(user_name, user_pwd, function(){
  //         authenRedirect();
  //     });
  // }

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
                      id="username"
                      type="text"
                      className="form-control username"
                      // value={this.state.user_name}
                      // onChange={event =>
                      // this.setState({ user_name: event.target.value })
                      // }
                      placeholder="Username" />
                  </div>
                  <div className="form-group col-xs-8">
                    <input
                    id="password"
                    type="password"
                    className="form-control password"
                    // value={this.state.user_pwd}
                    // onChange={event =>
                    //   this.setState({ user_pwd: event.target.value })
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
                <form>
                  <div className="new-to-t">
                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                  </div>
                  <div className="form-group">
                    <input
                    type="text"
                    className="form-control username"
                    value={this.state.user_name}
                    onChange={event =>
                      this.setState({ user_name: event.target.value })
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
                    value={this.state.user_pwd}
                    onChange={event =>
                    this.setState({ user_pwd: event.target.value })
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
