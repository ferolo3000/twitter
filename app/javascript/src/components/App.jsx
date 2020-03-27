import React from "react";

import '../home.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameSign: "",
      emailSign: "",
      passwordSign: "",
      usernameInput: "",
      passwordInput: "",

          // Q1. should I use differente states for form? when using the same it render in the same field.

    }
  }

  // function authenRedirect() {
  //   authenticate(function(response) {
  //     if(response.authenticated) {
  //     window.location.replace("/feeds");
  //     }
  //   });
  // };

          //Q2. this authentication is comming from request file?? How to connect that file here or wherever is needed.


  //------------------- Sign up / Log in Buttons ---------------------

  handleSignUp = (event) => {
  event.preventDefault();
  this.setState({usernameSign: event.target.value});
  this.setState({emailSign: event.target.value});
  this.setState({passwordSign: event.target.value});
  window.location.replace("/tweets");
  // createUser(usernameSign, emailSign, passwordSign, function(){
  //   signInUser(usernameSign, passwordSign, function(){
  //     authenRedirect();
  //   });
  // });
}

  handleLogIn = (event) => {
    event.preventDefault();
    this.setState({usernameInput: event.target.value});
    this.setState({passwordInput: event.target.value});
    window.location.replace("/tweets");
      // signInUser(usernameInput, passwordInput, function(){
      //     authenRedirect();
      // });
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
