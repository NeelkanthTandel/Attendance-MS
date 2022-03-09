import React, { useEffect, useState } from "react";
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
import studentDetails from "../constants/dummy-data";
import Global from "../components/utils/global";
import { com_name } from "../keys";

const cookies = new Cookies();

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
  const [attendanceDetail, setAttendanceDetail] = useState();
  // const [filteredAttDet, setFilteredAttDet] = useState();
  const navigate = useNavigate();

  const fetchStuAttendance = async () => {
    const date = new Date();
    setAttendanceDetail();
    // setFilteredAttDet();
    const data = await Global.httpPOST("/getAttendance", { date });
    console.log("att det:  Fetch compelete");
    if (!data.isError) {
      // console.log("att det: ", data);
      if (data.stu_att[0].attendance[0]) {
        setAttendanceDetail(data.stu_att);
        // setFilteredAttDet(data.stu_att);
      } else {
        setAttendanceDetail(null);
        // setFilteredAttDet(null);
      }
    }
  };

  useEffect(() => {
    console.log("modify: ", Global.token);
    // cookies.set('token', '', { path: '/' });
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!attendanceDetail) {
      console.log("fetch");
      fetchStuAttendance();
    }
  }, []);

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
                navigate("/modify-attend");
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
        className="modify-container"
        onClick={() => {
          setCollapsed(true);
        }}
      >
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
            {attendanceDetail ? (
              attendanceDetail.map((data, index) => {
                return (
                  <Row
                    name={data.name}
                    id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
                    islast={
                      attendanceDetail.length - 1 === index ? true : false
                    }
                    key={index}
                  />
                );
              })
            ) : (
              <div style={{ width: "100%", textAlign: "center", border: 0 }}>
                No data found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
