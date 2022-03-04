import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from "../images/icon.png";
import "../css/sideBar.css";
import { FaChalkboardTeacher, FaChevronRight } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    console.log("Toggle");
  };
  const [checked, setChecked] = React.useState(false);

  const CheckBoxHandler = () => {
    setChecked(!checked);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <ProSidebar
        collapsed={collapsed}
        collapsedWidth={98}
        style={{ position: "absolute", left: 0, top: 0 }}
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
        </SidebarFooter>
      </ProSidebar>
      <div
        style={{
          marginLeft: 98,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          overflow: "hidden",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: 25, paddingTop: 25 }}>Modify Attendance</p>

        <div style={{ paddingTop: 30 }}>
          <div
            style={{
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            <select
              style={{
                width: "10%",
                height: "25px",
                marginRight: "10%",
                backgroundColor: "#eeeeee",
                borderRadius: 5,
                placeholder: "Class",
              }}
            >
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>
            <select
              style={{
                width: "10%",
                height: "25px",
                backgroundColor: "#eeeeee",
                borderRadius: 5,
                placeholder: "Div",
              }}
            >
              <option>A</option>
              <option>B</option>
            </select>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                borderRadius: 10,
                flex: 1,
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%", fontWeight: "bold" }}>Id</span>
                <span style={{ width: "75%", fontWeight: "bold" }}>Name</span>
                <span style={{ width: "10%", fontWeight: "bold" }}>Status</span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />

              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>001</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>002</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>003</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>004</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>004</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div
                style={{
                  borderTop: "100%",
                  borderTopWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingTop: 10,
                  paddingLeft: "5%",
                }}
              >
                <span style={{ width: "20%" }}>004</span>
                <span style={{ width: "72%" }}>ABC</span>
                <span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={CheckBoxHandler}
                  />
                </span>
              </div>
            </div>
            <div style={{ paddingTop: 30 }}>
              <button
                style={{
                  backgroundColor: "#1c2a40",
                  color: "white",
                  textAlign: "center",
                  borderRadius: 5,
                  display: "flex",
                  marginLeft: "90%",
                  padding: 7,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
