import axios from "axios";
import React, { useState } from "react";

import axiosWithAuth from "../helpers/axiosWithAuth";

const initialState = {
  credentials: {
    username: "",
    password: ""
  },
  error: false
};

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  // when you have handled the token, navigate to the BubblePage route

  const error = "";
  //replace with error state

  const handleChange = (e) => {
    setLoginState({
      ...loginState,
      credentials: {
        ...loginState.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", loginState.credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch((err) => {
        console.log(err);
        setLoginState({
          ...loginState,
          error: true
        });
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={login}>
          <input
            id="username"
            type="text"
            name="username"
            value={loginState.credentials.username}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            value={loginState.credentials.password}
            onChange={handleChange}
          />
          <button id="submit">Login</button>
        </form>
      </div>
      {loginState.error && (
        <p id="error" className="error">
          Username or Password is incorrect
        </p>
      )}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
