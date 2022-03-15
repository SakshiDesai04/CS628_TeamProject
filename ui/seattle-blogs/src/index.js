import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <React.StrictMode>
     <Auth0Provider
    domain="dev-f-wkt5td.us.auth0.com"
    clientId="59TSUdXQyaP9hh48mgTQP5kwjr8qHlvc"
    redirectUri={window.location.origin}
  > <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

