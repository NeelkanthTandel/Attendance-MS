import React from "react";
import "../css/LoginPage.css";
import logo from "../images/icon.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
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
    console.log("User: ", data);
    if (!data.isError && data.isCredMatch) {
      console.log("Navigate");
      navigate("/home");
    }
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
};

export default LoginPage;
