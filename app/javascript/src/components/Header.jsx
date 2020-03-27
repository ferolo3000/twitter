import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Tweets from "./Tweets"
import User from "./User";


const NotFound = () => {
    return <h2>404 Not Found</h2>;
  }

function Header() {
    return(
        <Router>
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Feeds</Link>
            <Link to="/stats/" className="text-white">User</Link>
        </nav>
        <Switch>
        <Route path="/" exact component={Tweets} />
        <Route path="/stats/" component={User} />
        <Route component={NotFound} />
      </Switch>

        </Router>

    )
}

export default Header;
