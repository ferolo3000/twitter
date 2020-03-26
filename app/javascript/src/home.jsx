import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import './home.scss';

// const Home = props => (
//   <div>Home page Fer</div>
// )

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
