import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-ne5xyres1vwufx3c.us.auth0.com
// wq6T8Vrwhuqpq5yncpTWOQv895KdU69B
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ne5xyres1vwufx3c.us.auth0.com"
      clientId="wq6T8Vrwhuqpq5yncpTWOQv895KdU69B"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage" // in case loging in with social services doesent get saved when getting back from error page
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
