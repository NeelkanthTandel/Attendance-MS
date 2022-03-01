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

  return (
    <ProSidebar collapsed={collapsed} collapsedWidth={98}>
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
          <MenuItem icon={<BsUiChecks color={"white"} />}>Attendance</MenuItem>
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
  );
}
