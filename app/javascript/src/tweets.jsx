// tweets.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Tweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      user: '',
      error: '',
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }

  updateMessage(e){
    this.setState({
      message: e.target.value
    })
  }

  submitMessage(){
    if(this.state.message.length > 0 && this.state.message.length <= 140){
      this.props.post(this.state.message)
      document.getElementById('postField').value = ''

      this.setState({
        message: ''
      })
    } else {
      alert("Please check length")
    }
  }


  render () {
    return (
      <React.Fragment>
      <Layout>
      <div className="mb-2 fixedMenuFix">
        <input id="postField" onChange={this.updateMessage} type="text" className="form-control"  placeholder="What's up?"/>
        <button onClick={this.submitMessage} className="btn btn-sm btn-primary"><span>Post</span></button>
      </div>
      <div id="post">
      </div>
      </Layout>
      </React.Fragment>
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
