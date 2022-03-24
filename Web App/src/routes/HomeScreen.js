import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdAccountCircle, MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import {
  BsCheck2Square,
  BsFillCaretDownFill,
  BsUiChecks,
} from "react-icons/bs";
import { AiFillSetting, AiOutlineCaretDown } from "react-icons/ai";
import { IoIosPersonAdd, IoMdSchool } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import color from "../constants/color";
import { com_name } from "../keys";
import Global from "../components/utils/global";

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(Global.user.name);
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
  }, []);

  return (
    <>
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
              paddingLeft: 40,
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
          className="home-container"
          onClick={() => {
            setCollapsed(true);
          }}
        >
          <div
            style={{
              height: "80px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <AiFillSetting
              color={color.primary}
              size={24}
              style={{ marginRight: 20 }}
            />
            <MdAccountCircle
              color={color.primary}
              size={24}
              style={{ marginRight: 20 }}
            />
            <FiLogOut
              color={color.primary}
              size={24}
              onClick={() => {
                Global.logOutHandler();
                navigate("/");
              }}
            // style={{ marginRight: 15 }}
            />
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 5 }}>Administrator</span>
              <BsFillCaretDownFill
                color={color.primary}
                size={12}
                style={{ marginTop: 3.5 }}
              />
            </div> */}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              paddingLeft: 30,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                paddingTop: 30,
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "white",
                  marginRight: 60,
                  borderRadius: 10,
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              >
                <IoMdSchool size={60} color={color.primary} />
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: "40px",
                    }}
                  >
                    450
                  </span>
                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: "10px",
                    }}
                  >
                    students<br></br>present out of 468
                  </div>
                </div>
              </div>
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "white",
                  marginRight: 60,
                  borderRadius: 10,
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              >
                <FaChalkboardTeacher size={60} color={color.primary} />
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: "40px",
                    }}
                  >
                    30
                  </span>
                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: "10px",
                    }}
                  >
                    Total teachers
                  </div>
                </div>
              </div>
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "#e3e3e3",
                  borderRadius: 10,
                  flex: 1,
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              ></div>
            </div>
            <div className="quick-tools-container">
              <div
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Quick Tools
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  paddingTop: 30,
                  flexDirection: "row",
                }}
              >
                <div
                  className="quick-tools"
                  onClick={() => navigate("/modify-attend")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <FaUserCheck size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Modify Attendance
                  </div>
                </div>

                <div
                  className="quick-tools"
                  onClick={() => navigate("/modify-attend")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <IoIosPersonAdd size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Add Students
                  </div>
                </div>

                <div
                  className="quick-tools"
                  style={{ marginRight: 0 }}
                  onClick={() => navigate("/modify-attend")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <FaChalkboardTeacher size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Add Teachers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
