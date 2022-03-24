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
import { API_URL, com_name } from "../keys";

const cookies = new Cookies();

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);
  const [attendanceDetail, setAttendanceDetail] = useState();
  let updatedAttIds = [];

  const [std, setStd] = useState("1");
  const [selClass, setSelClass] = useState([]);
  const [div, setDiv] = useState("0");

  const [date, setDate] = useState("");
  const [oldDate, setOldDate] = useState();
  // const [filteredAttDet, setFilteredAttDet] = useState();
  const navigate = useNavigate();

  const Row = (props) => {
    const [checked, setChecked] = React.useState(props.isPresent);

    const toggleAttendance = () => {
      let currentStatus = checked;
      // console.log(currentStatus);
      setChecked((data) => !data);
      const index = updatedAttIds.findIndex((d) => d.attId == props.attId);
      // console.log(index);

      if (index >= 0) {
        console.log("Removing");
        updatedAttIds.splice(index, 1);
      } else {
        console.log("Inserting");
        updatedAttIds.push({
          stuId: props.stuId,
          attId: props.attId,
          status: !currentStatus,
        });
      }

      // console.log(updatedAttIds);
    };

    return (
      <div
        style={{
          borderBottomWidth: props.islast ? 0 : 0.5,
        }}
        className="row-t"
        onClick={toggleAttendance}
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
            // onChange={toggleAttendance}
            onChange={() => {}}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </span>
      </div>
    );
  };

  const fetchStuAttendance = async () => {
    if (!date) {
      return console.log("select date");
    }
    setOldDate(date);
    setAttendanceDetail();
    // setFilteredAttDet();
    const data = await Global.httpPOST("/getAttendance", {
      date: new Date(date),
      classId: Global.classDetail[0] ? div : null,
    });
    console.log("att det:  Fetch compelete");
    if (!data.isError) {
      console.log("att det: ", data);
      if (data.stu_att[0] && data.stu_att[0].attendance[0]) {
        setAttendanceDetail(data.stu_att);
        // setFilteredAttDet(data.stu_att);
      } else {
        setAttendanceDetail(null);
        // setFilteredAttDet(null);
      }
    }
  };

  const onSaveHandler = async () => {
    if (!updatedAttIds[0]) {
      return console.log("Nothing to update");
    }

    // const response = await fetch(`${API_URL}/modifyAttendance`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: "Bearer " + Global.token,
    //   },
    //   body: JSON.stringify({
    //     updAttDet: updatedAttIds,
    //   }),
    // });
    // const data = await response.json();
    const data = await Global.httpPOST("/modifyAttendance", {
      updAttDet: updatedAttIds,
    });

    console.log(data);
    fetchStuAttendance();
    // if (date.getUTCDate() == new Date().getUTCDate()) {
    //   Global.fetchStuAttendance(new Date());
    // }
  };

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
    if (!attendanceDetail) {
      console.log("fetch");
      fetchStuAttendance();
    } else if (attendanceDetail[0].class_id !== div) {
      console.log("Div changed");
      fetchStuAttendance();
    } else if (date !== oldDate) {
      console.log("date changed: ", date, " | ", oldDate);
      fetchStuAttendance();
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

  useEffect(() => {
    const tempDate = new Date().toLocaleDateString().split("/");
    setDate(
      tempDate[2] +
        "-" +
        (tempDate[0] < 10 ? "0" + tempDate[0] : tempDate[0]) +
        "-" +
        tempDate[1]
    );
    // fetchStuAttendance();
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
          <div className="save-btn" onClick={onSaveHandler}>
            SAVE
          </div>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                onChange={(e) => setDate(e.target.value)}
                value={date}
                type="date"
                placeholder="Date"
                className="filter"
                style={{
                  alignSelf: "baseline",
                }}
              />
              <div
                style={{
                  color: "#1c2a40",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Apply
              </div>
            </div>
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
                    attId={data.attendance[0] ? data.attendance[0].id : null}
                    stuId={data.stu_id}
                    key={index}
                    isPresent={
                      data.attendance[0] ? data.attendance[0].status : false
                    }
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
