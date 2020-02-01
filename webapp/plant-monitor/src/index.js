import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import decode from "jwt-decode";

import App from "./App";
import rootReducer from "./rootReducer";
import setAuthHeader from "./utils/setAuthHeader";
import { userLoggedIn } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.pppToken) {
  var payload = decode(localStorage.pppToken);
  const user = {
    email: payload.email,
    username: payload.username,
    token: localStorage.pppToken
  };
  setAuthHeader(localStorage.pppToken);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
