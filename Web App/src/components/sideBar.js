import React, { useState } from "react";
import Global from "./utils/global";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import "../css/sideBar.css";
import logo from "../images/icon.png";

import {
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdAccountCircle, MdSchool, MdPhone, MdEmail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import {
  IoIosPersonAdd,
  IoMdSchool,
  IoMdClose,
  IoMdPerson,
} from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import color from "../constants/color";
import { com_name } from "../keys";

export default function SideBar(props) {
  const navigate = props.navigate;
  // const [collapsed, setCollapsed] = useState(true);

  if (Global.user.isAdmin) {
    return (
      <ProSidebar
        collapsed={props.collapsed}
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
              style={{ marginRight: props.collapsed ? 0 : 20 }}
            />
            {props.collapsed ? "" : com_name}
          </div>
        </SidebarHeader>
        <SidebarContent>
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
                navigate("/student");
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
            {/* <MenuItem
                    icon={<BsUiChecks color={"white"} />}
                    onClick={() => {
                      navigate("/modify-attend");
                    }}
                  >
                    Attendance
                  </MenuItem> */}
            <SubMenu title="Attendance" icon={<BsUiChecks color={"white"} />}>
              <MenuItem
                onClick={() => {
                  navigate("/view-attend/overall");
                }}
              >
                Overall
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/view-attend/day-day");
                }}
              >
                Day To Day
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter
          style={{
            paddingLeft: 40,
          }}
        >
          <div className="s-footer">
            {props.collapsed ? (
              <FaChevronRight
                className="s-icon"
                onClick={() => props.setCollapsed(!props.collapsed)}
              />
            ) : (
              <FaChevronLeft
                className="s-icon"
                onClick={() => props.setCollapsed(!props.collapsed)}
              />
            )}
          </div>
        </SidebarFooter>
      </ProSidebar>
    );
  } else {
    return (
      <ProSidebar
        collapsed={props.collapsed}
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
              style={{ marginRight: props.collapsed ? 0 : 20 }}
            />
            {props.collapsed ? "" : com_name}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<HiHome color={"white"} />}
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </MenuItem>
            {/* <MenuItem
                  icon={<MdSchool color={"white"} />}
                  onClick={() => {
                    navigate("/student");
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
                </MenuItem> */}
            <MenuItem
              icon={<SiGoogleclassroom color={"white"} />}
              onClick={() => {
                navigate("/modify-attend");
              }}
            >
              Class
            </MenuItem>
            {/* <MenuItem
                  icon={<BsUiChecks color={"white"} />}
                  onClick={() => {
                    navigate("/modify-attend");
                  }}
                >
                  Attendance
                </MenuItem> */}
            <SubMenu title="Attendance" icon={<BsUiChecks color={"white"} />}>
              <MenuItem
                onClick={() => {
                  navigate("/view-attend/overall");
                }}
              >
                Overall
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/view-attend/day-day");
                }}
              >
                Day To Day
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter
          style={{
            paddingLeft: 40,
          }}
        >
          <div className="s-footer">
            {props.collapsed ? (
              <FaChevronRight
                className="s-icon"
                onClick={() => props.setCollapsed(!props.collapsed)}
              />
            ) : (
              <FaChevronLeft
                className="s-icon"
                onClick={() => props.setCollapsed(!props.collapsed)}
              />
            )}
          </div>
        </SidebarFooter>
      </ProSidebar>
    );
  }
}
