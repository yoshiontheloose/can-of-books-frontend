import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wajr50en.us.auth0.com"
      clientId="OicWcl01VU13GLT7FXyt0VbPSxGlNbSd"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

//NOTE: Do we have to put the domain and clientId into the .env file? There's an alert on log in page about Dev keys