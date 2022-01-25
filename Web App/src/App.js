import React from "react";
import "./App.css";
import logo from "./images/icon.png";

function App() {
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(event.target.userId.value);
    console.log(event.target.password.value);
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        teacherId: event.target.userId.value,
        password: event.target.password.value,
      }),
    });
    const data = await response.json();
    console.log("User: ", data.user.name);
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo" />
      <form className="login-form" onSubmit={handleLogin}>
        <input
          name="userId"
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
          name="loginBtn"
          type={"submit"}
          value="Login"
          className="login-btn"
        />
      </form>
    </div>
  );
}

export default App;
