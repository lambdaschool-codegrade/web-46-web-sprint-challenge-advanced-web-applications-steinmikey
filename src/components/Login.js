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
          Username or Password not valid
        </p>
      )}
    </div>
  );
};

export default Login;
