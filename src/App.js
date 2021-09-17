import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router className="App">
      {" "}
      {/* class was on the div, but that threw off the browser display.. */}
      <div>
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#">
            logout
          </a>
        </header>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.
