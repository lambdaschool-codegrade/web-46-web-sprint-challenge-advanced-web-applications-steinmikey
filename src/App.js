import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";

import "./styles.scss";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App() {
  // const isLoggedIn = localStorage.getItem("token");

  const logout = (e) => {
    axiosWithAuth()
      .post("/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Router className="App">
      {" "}
      {/* class was on the div, but that threw off the browser display.. */}
      <div>
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={logout}>
            logout
          </a>
        </header>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubbles" component={BubblePage} />
      </Switch>
    </Router>
  );
}

export default App;
