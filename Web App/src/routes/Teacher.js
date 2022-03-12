import React, { useState } from "react";
import "../css/teacher.css";
import PopupT from "../components/PopupT";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarContent
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import data from "../components/teacherDetail.json";
// import Global from "../components/utils/global";
import { com_name } from "../keys";

const cookies = new Cookies();

export default function Teacher() {
  const [collapsed, setCollapsed] = useState(true);
  const [Popup, setPopup] = useState(false);
  const toggle = () => {
    setPopup(!Popup);
  };
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(data);
  return (
    <div className="main-container">
      <ProSidebar
        collapsed={collapsed}
        collapsedWidth={98}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <SidebarHeader>
          <div
            className="s-logo-container"
            onClick={() => {
              navigate("/home");
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="s-logo"
              style={{ marginRight: collapsed ? 0 : 20 }}
            />
            {collapsed ? "" : com_name}
          </div>
        </SidebarHeader>
        <SidebarContent style={{ paddingLeft: "10px" }}>
          <Menu iconShape="circle">
            <MenuItem
              icon={<HiHome color={"white"} />}
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<MdSchool color={"white"} />}
              onClick={() => {
                navigate("/modify-attend");
              }}
            >
              Students
            </MenuItem>
            <MenuItem
              icon={<FaChalkboardTeacher color={"white"} />}
              onClick={() => {
                navigate("/teacher");
              }}
            >
              Teachers
            </MenuItem>
            <MenuItem
              icon={<SiGoogleclassroom color={"white"} />}
              onClick={() => {
                navigate("/modify-attend");
              }}
            >
              Class
            </MenuItem>
            <MenuItem
              icon={<BsUiChecks color={"white"} />}
              onClick={() => {
                navigate("/modify-attend");
              }}
            >
              Attendance
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter
          style={{
            paddingLeft: 40
          }}
        >
          <div className="s-footer">
            {collapsed ? (
              <FaChevronRight
                className="s-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <FaChevronLeft
                className="s-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
        </SidebarFooter>
      </ProSidebar>
      <div
        className="modify-container"
        onClick={() => {
          setCollapsed(true);
        }}
      >
        <div className="header">
          <div className="title">Teachers</div>
          <div className="Add">
            <div className="save-btn" onClick={toggle}>
              Add Teacher
            </div>
            <PopupT Popup={Popup} toggle={toggle} />
          </div>
        </div>
        <div className="Content">
          <div className="table">
            <div className="table-header">
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Name
              </span>
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Teacher ID
              </span>
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Email
              </span>
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Phone Number
              </span>
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Class
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
