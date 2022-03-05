import React, { useState } from "react";
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
import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
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
import color from "../constants/color";

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    console.log("Toggle");
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          flex: 1,
          width: "100%",
        }}
      >
        <ProSidebar
          collapsed={collapsed}
          collapsedWidth={98}
          style={{ position: "fixed" }}
        >
          <SidebarHeader>
            <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="s-logo"
                style={{ marginRight: collapsed ? 0 : 10 }}
              />
              {collapsed ? "" : "Attendance-MS"}
            </div>
          </SidebarHeader>
          <SidebarContent style={{ paddingLeft: "10px" }}>
            <Menu iconShape="circle">
              <MenuItem icon={<HiHome color={"white"} />}>Home</MenuItem>
              <MenuItem icon={<MdSchool color={"white"} />}>Students</MenuItem>
              <MenuItem icon={<FaChalkboardTeacher color={"white"} />}>
                Teachers
              </MenuItem>
              <MenuItem icon={<SiGoogleclassroom color={"white"} />}>
                Class
              </MenuItem>
              <MenuItem icon={<BsUiChecks color={"white"} />}>
                Attendance
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter
            style={{
              // textAlign: "center" : "",
              paddingLeft: 40,
            }}
          >
            <div className="s-footer">
              <FaChevronRight
                className="s-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
            {/* <MenuItem icon={<FaChevronRight />}>Attendance</MenuItem> */}
          </SidebarFooter>
        </ProSidebar>
        <div
          style={{
            marginLeft: 98,
            flex: 1,
            paddingRight: "60px",
            backgroundColor: "#e3e3e3",
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
              size={20}
              style={{ marginRight: 15 }}
            />
            <MdAccountCircle
              color={color.primary}
              size={20}
              style={{ marginRight: 15 }}
            />
            <div
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
            </div>
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
                }}
              ></div>
            </div>
            <div
              style={{
                marginTop: 60,
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                  style={{
                    // padding: 20,
                    backgroundColor: "white",
                    marginRight: 60,
                    borderRadius: 10,
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "150px",
                  }}
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
                    }}
                  >
                    Modify Attendance
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
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "150px",
                  }}
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
                    }}
                  >
                    Add Students
                  </div>
                </div>

                <div
                  style={{
                    // padding: 20,
                    backgroundColor: "white",
                    borderRadius: 10,
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "150px",
                  }}
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
