import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import BrowserRouter from './BrowserRouter.js';
// import Login from './Login.js';
// import BestBooks from './BestBooks.js'
// import Profile from './Profile.js'
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';



class App extends React.Component {
  makeRequest = async() => {
    const {getIdTokenClaims} = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    // just how it works
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`},
    }
    const serverResponse = await axios.get('http://localhost:3001/test', config);

    console.log('Working data: ', serverResponse);
  }

  render() {
    console.log('app', this.props);
    console.log('props', this.props.auth0);
    const { user, IsLoading, isAuthenticated } = this.props.auth0;
    console.log('user', user);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header isAuthenticated={isAuthenticated} />
            <BrowserRouter isAuthenticated={isAuthenticated} makeRequest={this.makeRequest}/>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);

