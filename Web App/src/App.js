import React, { useState } from "react";
import "./App.css";
import logo from "./images/icon.png";

function App() {
  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo" />
      <form className="login-form">
        <input
          name="user-id"
          type={"text"}
          placeholder="User Id"
          className="user-id-input"
        />
        <input
          name="password"
          type={"password"}
          placeholder="Password"
          className="password-input"
        />
        <input
          name="login-btn"
          type={"submit"}
          value="Login"
          className="login-btn"
        />
      </form>
    </div>
  );
}

export default App;
