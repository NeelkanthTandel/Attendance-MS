import React, { useState } from "react";
import "../css/teacher.css";
import PopupT from "../components/PopupT";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import data from "../components/teacherDetail.json";
// import Global from "../components/utils/global";
import { com_name } from "../keys";

const cookies = new Cookies();

const Row = (props) => {
  return (
    <div
      style={{
        borderBottomWidth: props.islast ? 0 : 0.5,
      }}
      className="row-tT"
    >
      <span style={{ width: "10%" }}>{props.id}</span>
      <span style={{ width: "30%" }}>{props.name}</span>
      <span style={{ width: "30%" }}>{props.mail_id}</span>
      <span style={{ width: "20%" }}>{props.phone_number}</span>
      <span style={{ width: "10%" }}>{props.class_id}</span>
    </div>
  );
};

export default function Teacher() {
  const [collapsed, setCollapsed] = useState(true);
  const [Popup, setPopup] = useState(false);
  const toggle = () => {
    setPopup(!Popup);
  };
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(data);
  const [filteredDet, setFilteredDet] = useState(teacher);

  const searchHandler = (event) => {
    const searchText = event.target.value;
    console.log(parseInt(searchText));
    setFilteredDet(
      teacher.filter((data) =>
        data.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };
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
            paddingLeft: 0,
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
        className="modify-containerT"
        onClick={() => {
          setCollapsed(true);
        }}
      >
        <div className="headerT">
          <div className="titleT">Teachers</div>
          <div className="Add">
            <div className="save-btn" onClick={toggle}>
              Add Teacher
            </div>
          </div>
        </div>
        <div className="bodyT">
          <input
            className="searchBar"
            placeholder="Search"
            onChange={searchHandler}
          />
          <div className="tableT">
            <div className="table-headerT">
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Id
              </span>
              <span style={{ width: "30%", fontWeight: "bold", fontSize: 18 }}>
                Name
              </span>
              <span style={{ width: "30%", fontWeight: "bold", fontSize: 18 }}>
                Mail Id
              </span>
              <span style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}>
                Phone Number
              </span>
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Class ID
              </span>
              {/* <table>
              <thead className="table-headerT">
                <div className="table-headerT">
                  <tr>
                    <th>Name</th>
                    <th>Teacher ID</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Class</th>
                  </tr>
                </div>
              </thead>
              <tbody>
                {teacher.map((teacher) => (
                  <tr>
                    <td>{teacher.name}</td>
                    <td>{teacher.teacher_id}</td>
                    <td>{teacher.mail_id}</td>
                    <td>{teacher.phone_number}</td>
                    <td>{teacher.class_id}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            </div>
            {filteredDet.map((data, index) => {
              return (
                <Row
                  id={data.teacher_id}
                  name={data.name}
                  mail_id={data.mail_id}
                  phone_number={data.phone_number}
                  class_id={data.class_id}
                  key={index}
                  islast={index == filteredDet.length - 1 ? true : false}
                />
              );
            })}
          </div>
        </div>
        <PopupT Popup={Popup} toggle={toggle} />
      </div>
    </div>
  );
}
