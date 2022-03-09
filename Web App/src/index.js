import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import HomeScreen from "./routes/HomeScreen";
import LoginPage from "./routes/LoginPage";
import ModifyAttend from "./routes/modifyAttend";

// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const checkSession = () => {
//   const navigate = useNavigate();

//   console.log("checking session");
//   if (!cookies.get("token")) {
//     return navigate("/");
//   }
// };

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="home" element={<HomeScreen />} />
      <Route path="modify-attend" element={<ModifyAttend />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
