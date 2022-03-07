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

const Row = (props) => {
  const [checked, setChecked] = React.useState(props.checked);

  return (
    <>
      <div
        style={{
          borderTop: "100%",
          borderTopWidth: 1,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: 15,
          paddingBottom: 15,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: props.islast ? 0 : 0.5,
          borderColor: "black",
          borderStyle: "solid",
          paddingLeft: 30,
          paddingRight: 30,
          // paddingLeft: "5%",
        }}
        onClick={() => setChecked(!checked)}
      >
        <span style={{ width: "10%" }}>{props.id}</span>
        <span style={{ width: "80%" }}>{props.name}</span>
        <span
          style={{
            width: "10%",
            textAlign: "center",
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </span>
      </div>
    </>
  );
};

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    console.log("Toggle");
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "row",
        flex: 1,
        overflow: "hidden",
        backgroundColor: "#e3e3e3",
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
          flex: 1,
          width: "100%",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {/* <p style={{ fontSize: 25, paddingTop: 25 }}>Modify Attendance</p> */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: "bold" }}>
            Modify Attendance
          </div>
          <div
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 24,
              paddingRight: 24,
              backgroundColor: "#1c2a40",
              color: "white",
              borderRadius: 5,
              fontSize: 14,
              alignSelf: "baseline",
            }}
          >
            SAVE
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            marginBottom: 60,
          }}
        >
          <select
            style={{
              // width: "10%",
              // height: "25px",
              marginRight: 30,
              backgroundColor: "#eeeeee",
              borderRadius: 5,
              paddingTop: 5,
              paddingBottom: 5,
              minWidth: 100,
              paddingLeft: 5,
              paddingRight: 5,
              borderWidth: 1,
              borderColor: "#bcbcbc",
            }}
            placeholder="Class"
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
              marginRight: 30,
              backgroundColor: "#eeeeee",
              borderRadius: 5,
              paddingTop: 5,
              paddingBottom: 5,
              minWidth: 100,
              paddingLeft: 5,
              paddingRight: 5,
              borderWidth: 1,
              borderColor: "#bcbcbc",
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
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                flex: 1,
                // paddingLeft: "5%",
                paddingLeft: 30,
                paddingRight: 30,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 2,
                borderColor: "#1c2a40",
                borderStyle: "solid",
                // position: "sticky",
                // top: 0,
              }}
            >
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Id
              </span>
              <span style={{ width: "80%", fontWeight: "bold", fontSize: 18 }}>
                Name
              </span>
              <span
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Status
              </span>
            </div>
            <Row id={1} name={"Hetvi"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} />
            <Row id={2} name={"Neelkanth"} islast />
          </div>
        </div>
      </div>
    </div>
  );
}
