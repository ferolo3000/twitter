// signupWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class SignupWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      error: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
        }
      })
    }))
    .then(handleErrors)
      .then(data => {
        if (data.user) {
          this.login();
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not sign up.',
        })
      })
    }


  login = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });
    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          //const redirect_url = params.get('redirect_url') || '/tweets';
          window.location = "/tweets";
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log in.',
        })
      })
  }

  render () {
    const { email, password, username, error } = this.state;
    return (
      <React.Fragment>
      <img src="https://img.icons8.com/color/48/000000/twitter.png" style={{marginLeft: '45%'}}/>
      <h3 style={{textAlign: "center",}}>Welcome to Twitter</h3>
        <form onSubmit={this.signup}>
          <input
            name="username"
            type="text"
            className="form-control form-control-lg mb-3"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required />
          <input
            name="email"
            type="text"
            className="form-control form-control-lg mb-3"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required />
          <input
            name="password"
            type="password"
            className="form-control form-control-lg mb-3"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg">Sign up</button>
        </form>
        <hr/>
        <p className="mb-0">Already have an account? <a className="text-primary" onClick={this.props.toggle}>Log in</a></p>
      </React.Fragment>
    )
  }
}

export default SignupWidget
