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
import studentDetails from "../constants/dummy-data";

const Row = (props) => {
  const [checked, setChecked] = React.useState(props.checked);

  return (
    <div
      style={{
        borderBottomWidth: props.islast ? 0 : 0.5,
      }}
      className="row-t"
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
          className="status"
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
  );
};

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="main-container">
      <ProSidebar
        collapsed={collapsed}
        collapsedWidth={98}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <SidebarHeader>
          <div className="s-logo-container">
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
      <div className="modify-container">
        <div className="header">
          <div className="title">Modify Attendance</div>
          <div className="save-btn">SAVE</div>
        </div>

        <div className="body">
          <div className="filter-container">
            <div>
              <select className="filter" placeholder="Class">
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
              <select className="filter">
                <option>A</option>
                <option>B</option>
              </select>
            </div>
            <input
              type="date"
              placeholder="Date"
              className="filter"
              style={{
                alignSelf: "baseline",
                marginRight: 0,
              }}
            />
          </div>
          <div className="table">
            <div className="table-header">
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
            {studentDetails.map((data, index) => {
              return (
                <Row
                  name={data.name}
                  id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
                  islast={studentDetails.length - 1 == index ? true : false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
