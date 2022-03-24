import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from "../../images/icon.png";
import "../../css/sideBar.css";
import { FaChalkboardTeacher, FaChevronRight } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import studentDetails from "../../constants/dummy-data";
import Global from "../../components/utils/global";
import { useNavigate } from "react-router-dom";

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
          width: "40%",
          textAlign: "center",
        }}
      ></span>
    </div>
  );
};

export default function DaytoDay() {
  const [collapsed, setCollapsed] = useState(true);
  const [std, setStd] = useState("1");
  const [selClass, setSelClass] = useState([]);
  const [div, setDiv] = useState("0");

  const [date, setDate] = useState("");
  const [oldDate, setOldDate] = useState();
  // const [filteredAttDet, setFilteredAttDet] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("modify: ", Global.classDetail);
    // cookies.set('token', '', { path: '/' });
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!Global.classDetail[0]) {
      console.log("Fetching user");
      Global.fetchUser().then(filterDiv());
    }
  }, [div, date]);

  const filterDiv = () => {
    const tempClass = Global.classDetail.filter(
      (data) => data.standard === parseInt(std)
    );
    setSelClass(
      Global.classDetail.filter((data) => data.standard === parseInt(std))
    );
    setDiv(tempClass[0] ? tempClass[0].class_id : "0");
  };

  useEffect(() => {
    filterDiv();

    // console.log(div);
  }, [std, Global.classDetail]);

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
          <div className="title"> View Day to Day Attendance</div>
          <div className="save-btn">Day to Day Attendance</div>
        </div>

        <div className="body">
          <div className="filter-container">
            <div>
              <select
                className="filter"
                placeholder="Class"
                onChange={(event) => setStd(event.target.value)}
                value={std}
              >
                {Global.classDetail[0] ? (
                  <>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </>
                ) : (
                  <option value="0">Class</option>
                )}
              </select>
              <select
                className="filter"
                onChange={(e) => setDiv(e.target.value)}
                value={div}
              >
                {Global.classDetail[0] ? (
                  selClass.map((data, index) => (
                    <option key={index} value={data.class_id}>
                      {data.div}
                    </option>
                  ))
                ) : (
                  <option value="0">-</option>
                )}
              </select>
            </div>
          </div>
          <div className="table">
            <div className="table-header">
              <span style={{ width: "17%", fontWeight: "bold", fontSize: 18 }}>
                Id
              </span>
              <span style={{ width: "40%", fontWeight: "bold", fontSize: 18 }}>
                Name
              </span>
              <span style={{ width: "40%", fontWeight: "bold", fontSize: 18 }}>
                Day/Days
              </span>
              <span style={{ width: "40%", fontWeight: "bold", fontSize: 18 }}>
                Day/Days
              </span>
              <span style={{ width: "40%", fontWeight: "bold", fontSize: 18 }}>
                Day/Days
              </span>
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Day/Days
              </span>
            </div>
            {studentDetails.map((data, index) => {
              return (
                <Row
                  name={data.name}
                  id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
                  islast={studentDetails.length - 1 === index ? true : false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
