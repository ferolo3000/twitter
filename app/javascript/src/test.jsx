import React from "react"
import ReactDOM from 'react-dom'

import './tweets.scss';

class Tweets extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      allPosts: [{
        title: 'Loading...',
        body: 'Loading...',
        name: 'Loading...',
        username: 'Loading...'
      }],

      userPosts: []
    }

    this.sortPosts = this.sortPosts.bind(this)
    this.matchAccounts = this.matchAccounts.bind(this)
    this.userPost = this.userPost.bind(this)

    this.loaded = false
    this.postDataWithoutUserInfo = []
    this.newUserPosts = []
  }

  componentDidMount(){

    if(this.loaded === false){
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => this.sortPosts(json))
      .then(()=>{
        return fetch('https://jsonplaceholder.typicode.com/users')
      })
      .then(response => response.json())
      .then(json => this.matchAccounts(json))
      .then(json => this.setState({ allPosts: json }))
      .catch(error=>console.log(error))
    }

    this.loaded = true
  }

  sortPosts(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    this.postDataWithoutUserInfo = array;
    return array;
  }

  matchAccounts(userData){
    let completeFeedData = []
    for(let i = 0; i < this.postDataWithoutUserInfo.length; i++){
      for(let j = 0; j < userData.length; j++){
        if(this.postDataWithoutUserInfo[i].userId === userData[j].id){

          completeFeedData.push({...this.postDataWithoutUserInfo[i], ...userData[j]})
        }
      }
    }

    return completeFeedData
  }

  userPost(post){
    let totalLength = this.state.allPosts.length + this.state.userPosts.length
    let newPostData = {
      userId: 11,
      id: totalLength + 2,
      name: 'Fer',
      username: 'ferolo3000',
      body: post,
      userPost: true
    }

   this.newUserPosts.unshift(newPostData)

    this.setState({
      userPosts: this.newUserPosts
    })
  }
  render(){

    return(

    <div>
      <Userbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <CreatePost post={this.userPost}/>
          </div>
        </div>
      </div>

      <div className="container">
        <UserFeed postData={this.state.userPosts} />
        <Feed postData={this.state.allPosts} />
      </div>

   </div>
    )
  }
}

class Userbar extends React.Component{

  render(){
    return(
      <nav id="top-navbar" className="navbar navbar-static-top navbar-expand-sm">
        <a className="navbar-brand" href="#"><img src="https://img.icons8.com/color/48/000000/twitter-squared.png"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#userLinks" aria-controls="userLinks" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userLinks">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-light" type="submit">Go</button>
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active"><a className="nav-link" href="/user"><img src="https://img.icons8.com/ios-glyphs/30/000000/user.png"/></a></li>
            <li className="nav-item active"><a className="nav-link" href="/"><img src="https://img.icons8.com/android/24/000000/logout-rounded.png"/></a></li>
          </ul>
        </div>
       </nav>
    )
  }
}

class CreatePost extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      postText: '',
    }

    this.updatePostText = this.updatePostText.bind(this)
    this.submitPostText = this.submitPostText.bind(this)
  }

  updatePostText(e){
    this.setState({
      postText: e.target.value
    })
  }

  submitPostText(){
    if(this.state.postText.length > 0 && this.state.postText.length <= 140){
      this.props.post(this.state.postText)
      document.getElementById('postField').value = ''

      this.setState({
        postText: ''
      })
    } else {
      alert("Please check post length")
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-3 profile-trends">
          <div className="profileCard col-xs-12">
            <div className="user-field col-xs-12">
              <a className="username">User</a><br />
              <a className="screenName">@User</a>
            </div>
            <div className="user-stats">
              <div className="col-xs-3">
                <a>
                  <span>Tweets<br /></span>
                  <span className="user-stats-tweets">10</span>
                </a>
              </div>
              <div className="col-xs-4">
                <a>
                  <span>Following<br /></span>
                  <span className="user-stats-following">0</span>
                </a>
              </div>
              <div className="col-xs-4">
                <a>
                  <span>Followers<br /></span>
                  <span className="user-stats-followers">0</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="post-form">
            <input id="postField" onChange={this.updatePostText} type="text" className="form-control" placeholder="What's happening?" />
            <button onClick={this.submitPostText} className="btn btn-primary float-right mt-1"><span>Post</span></button>
          </div>
        </div>
        <div className="trends col-3">
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
    )
  }
}

class UserFeed extends React.Component{
  render(){
    if(this.props.postData.length > 0){
    return(
      <div>
          {this.props.postData.map((post, key)=>
            <Post postData={post} key={post.id} />
          )}
      </div>
    )
    } else {
      return(
        <div></div>
      )
    }
  }
}

class Feed extends React.Component{
  render(){

      return(
        <div>
          {this.props.postData.map((post, key) =>
           <Post postData={post} key={post.id}/>
          )}
        </div>
      )

  }
}

class Post extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      replyWindowStyling: {display: 'none'},
      replies: []
    }

    this.replyWindowOpen = this.replyWindowOpen.bind(this)
    this.addReply = this.addReply.bind(this)

    this.postReplies = []
  }

  replyWindowOpen(){

    if(this.state.replyWindowStyling.display === 'none'){
      this.setState({
        replyWindowStyling: {
          display: 'flex',
          flexWrap: 'wrap'
        }
      })
    } else {
      this.setState({
        replyWindowStyling: {display: 'none'}
      })
    }
  }

  addReply(reply){
    let replyData = {
      name: 'You',
      username: 'reply_user',
      replyID: this.postReplies.length,
      text: reply,
      userID: 11
    }

    this.postReplies.push(replyData)
    this.setState({
      replies: this.postReplies
    })
  }
  render(){
    return(
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col-6">
          <div className="row mx-auto justify-content-start border mt-1 p-2 align-items-center">
            <PostContent postData={this.props.postData} />
            <PostInput replyWindowOpen={this.replyWindowOpen}/>
            <ReplyWindow post={this.addReply} replies={this.state.replies} inlineStyling={this.state.replyWindowStyling} replyName={this.props.postData.username}/>
          </div>
        </div>
        <div className="col-3">
        </div>
      </div>
    )
  }
}

class PostContent extends React.Component{
  render(){
    let imageSrc = "https://picsum.photos/50?image" + String(this.props.postData.userId)
    return(
      <div>
        <div className="col-12 d-flex align-items-center">
          <img className={"profileThumb"} src={imageSrc}/>
          <h3 className="font-weight-bold ml-2 mb-1 d-inline-block">{this.props.postData.name}</h3>
          <a href="#" className="ml-2 text-muted">@{this.props.postData.username}</a>
        </div>
        <div className="col-12">
          <p className="mb-0">{this.props.postData.body}</p>
        </div>
     </div>
    )
  }
}


class PostInput extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      liked: false,
      retweeted: false
    }

    this.toggleLike = this.toggleLike.bind(this)
    this.toggleRetweet = this.toggleRetweet.bind(this)
    let likeStyle = {}
    let rtStyle = {}
    this.likeClass = 'far fa-heart mr-4 iconStyling'
    this.rtClass = 'fas fa-retweet mr-4 iconStyling'
  }

  toggleLike(){

    if(this.state.liked){
      this.likeClass = this.likeClass.replace('fas', 'far')
      this.likeStyle = {}
      this.setState({
        liked: false
      })
    } else {
      this.likeClass = this.likeClass.replace('far', 'fas')
      this.likeStyle = {color: 'red'}
      this.setState({
        liked: true
      })
    }
  }

  toggleRetweet(){
    if(this.state.retweeted){
      this.rtStyle = {}
      this.setState({
        retweeted: false
      })
    } else {
      this.rtStyle = {color: 'green'}
      this.setState({
        retweeted: true
      })
    }
  }

  render(){
    return(
    <div className="col-sm-12 mt-1">
        <i style={this.likeStyle} onClick={this.toggleLike} className={this.likeClass}></i>
        <i style={this.rtStyle} onClick={this.toggleRetweet} className={this.rtClass}></i>
        <i onClick={this.props.replyWindowOpen} className="fas fa-reply iconStyling"></i>
    </div>

    )
  }
}

class ReplyWindow extends React.Component{

  render(){

    return(
     <div style={this.props.inlineStyling} className="w-100">
       <ReplyDisplay className="col-12" replies={this.props.replies}/>
       <ReplyField  replyName={this.props.replyName} post={this.props.post} />
     </div>
      )
  }
}

class ReplyDisplay extends React.Component{
  render(){
    if(this.props.replies.length > 0){
      return(
      <div className="col-sm-12 mt-2">
            {this.props.replies.map((reply, key) =>
              <Reply reply={reply} key={key} />
            )}
      </div>
      )
    } else {
      return(
      <div></div>
      )
    }
  }
}

class Reply extends React.Component{
  render(){
    return(
    <div className='border-top p-2 replyDisplay'>
        <div className="d-flex align-items-center">
          <img src={"https://picsum.photos/50?image" + String(this.props.reply.userID)}/>
          <h5 className="ml-2 font-weight-bold d-inline-block">{this.props.reply.name}</h5>
          <a href="#" className="ml-2 text-muted">@{this.props.reply.username}</a>
        </div>
        <p>{this.props.reply.text}</p>
    </div>
    )
  }
}

class ReplyField extends React.Component{
    constructor(props){
    super(props)

    this.state ={
      replyText: ''
    }

    this.updateReplyText = this.updateReplyText.bind(this)
    this.submitReply = this.submitReply.bind(this)
    this.id = 'replyField' + String(Math.floor(Math.random() * 100000))
  }

  updateReplyText(e){
    this.setState({
      replyText: e.target.value
    })
  }

  submitReply(){
    if(this.state.replyText.length > 0){
      this.props.post(this.state.replyText)
      document.getElementById(this.id).value = ''
      this.setState({
        replyText: ''
      })
    }
  }

  render(){

    return(
     <div className="col-sm-12 form-inline mt-1">
        <div className="input-group flex-grow-1">
         <div className="input-group-prepend">
          <div className="input-group-text">@{this.props.replyName}</div>
        </div>
         <input type="text" onChange={this.updateReplyText} id={this.id} className="form-control"  placeholder="Say something nice!"/>
        </div>
      <button className="btn btn-warning" onClick={this.submitReply}><span>Reply</span></button>
    </div>
      )
  }
}


export default Tweets;


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.body.appendChild(document.createElement('div')),
  )
})
