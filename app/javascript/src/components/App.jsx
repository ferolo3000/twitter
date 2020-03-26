import React from "react";

import '../home.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      emailInput: "",
      passwordInput: ""
    }
  }

  function authenRedirect() {
    authenticate(function(response) {
      if(response.authenticated) {
        //window.location.replace("/feeds");
        alert("all good")
      }
    });
  };


  //------------------- Sign up / Log in Buttons ---------------------

  handleSignUp = (event) => {
  event.preventDefault();
  this.setState({usernameInput: event.target.value});
  this.setState({emailInput: event.target.value});
  this.setState({passwordInput: event.target.value});

  createUser(usernameInput, emailInput, passwordInput, function(){
    signInUser(usernameInput, passwordInput, function(){
      authenRedirect();
    });
  });
}
// $(document).on('click', '#sign-up-btn', function(e){
//   e.preventDefault();
//   var usernameInput = $('.sign-up .username').val();
//   var emailInput = $('.sign-up .email').val();
//   var passwordInput = $('.sign-up .password').val();
//   createUser(usernameInput, emailInput, passwordInput, function(){
//     signInUser(usernameInput, passwordInput, function(){
//       authenRedirect();
//     });
//   });
// });
//
// $(document).on('click', '#log-in-btn', function(e){
//   e.preventDefault();
//   var usernameInput = $('.log-in .username').val();
//   var passwordInput = $('.log-in .password').val();
//   signInUser(usernameInput, passwordInput, function(){
//     authenRedirect();
//   });
// });

  // handleChange(event) {    this.setState({value: event.target.value});  }
  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
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
                    <input type="text" className="form-control username" value={this.state.usernameInput} placeholder="Username" />
                  </div>
                  <div className="form-group col-xs-8">
                    <input type="password" className="form-control password" value={this.state.passwordInput} placeholder="Password" />
                  </div>
                  <button id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1" onClick={this.handleSignUp}>Log in</button>
                </form>
              </div>
              <div className="sign-up col-xs-4 col-xs-offset-1">
                <form>
                  <div className="new-to-t">
                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control username" value={this.state.usernameInput} placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control email" value={this.state.emailInput} placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control password" value={this.state.passwordInput} placeholder="Password" />
                  </div>
                  <button id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
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
