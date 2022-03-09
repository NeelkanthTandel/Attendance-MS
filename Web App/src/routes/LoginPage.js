import React, { useEffect, useState } from "react";
import "../css/LoginPage.css";
import logo from "../images/icon.png";
import { useNavigate } from "react-router-dom";
import Global from "../components/utils/global";
import Cookies from "universal-cookie";
import { API_URL } from "../keys";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const cookies = new Cookies();

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    if (Global.isLoggedIn()) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (event) => {
    if (loading) {
      console.log(loading);
      return;
    }
    setLoading(true);
    event.preventDefault();

    const id = event.target.userId.value;
    const password = event.target.password.value;

    if (!id) {
      console.log("No id");
      setLoading(false);
      return event.target.userId.focus();
    } else if (!password) {
      setLoading(false);
      return event.target.password.focus();
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        teacherId: id,
        password,
      }),
    });
    const data = await response.json();
    console.log("User: ", data);
    if (!data.isError && data.isCredMatch) {
      cookies.set("token", data.token, { path: "/" });
      console.log("Navigate: ");
      navigate("/home");
    } else {
      setIsWrong(true);
      setLoading(false);
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
          autoComplete="username"
        />
        <div className="password-input-container">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password-input"
            autoComplete="current-password"
          />
          {showPassword ? (
            <IoIosEye
              size={20}
              style={{
                marginRight: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <IoIosEyeOff
              size={20}
              style={{
                marginRight: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
        {isWrong ? (
          <div
            style={{
              marginLeft: "16px",
              fontSize: 14,
              marginTop: "5px",
              color: "#ed4337",
            }}
          >
            Username or password incorrect.
          </div>
        ) : null}
        <input
          name="loginBtn"
          type={"submit"}
          value={loading ? "Please wait..." : "Login"}
          className="login-btn"
          style={{
            backgroundColor: loading ? "#bcbcbc" : "#1c2a40",
          }}
        />
      </form>
    </div>
  );
};

export default LoginPage;
