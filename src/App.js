import React from 'react';
import Header from './Header';
import Login from './Login.js';
import BestBooks from './BestBooks.js'
import Profile from './Profile.js'
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";



class App extends React.Component {

  render() {
    console.log('app', this.props);
    console.log('props', this.props.auth0);
    const { user, isLoading, isAuthenticated } = this.props.auth0;
    console.log('user', user);

    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);

