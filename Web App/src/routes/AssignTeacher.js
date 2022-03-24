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
// import ReactModal from "react-modal";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import studentDetails, { classAllotment } from "../constants/dummy-data";
import Global from "../components/utils/global";
import { com_name } from "../keys";

// const cookies = new Cookies();

const Row = (props) => {
  const [modal, setModal] = React.useState(false);
  const [newTeacherInp, setNewTeacherInp] = React.useState();
  const [newTeacher, setNewTeacher] = React.useState();
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div
      style={{
        borderBottomWidth: props.islast ? 0 : 0.5,
      }}
      className="row-t"
    >
      <span style={{ width: "10%" }}>{props.className}</span>
      <span style={{ width: "20%" }}>{props.div}</span>
      <span style={{ width: "50%" }}>{props.teacherName}</span>
      <span
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span className="edit-button" onClick={toggleModal}>
          Edit
        </span>
        {modal ? (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div className="inputBox1" placeholder="Current Teacher">
                {props.teacherName}
              </div>
              <input
                className="inputBox2"
                type="text"
                placeholder="New Teacher"
                onChange={(event) => setNewTeacherInp(event.target.value)}
              />
              <span
                className="saveModal-button"
                // value={newTeacher}
                // onChange={setNewTeacher(newTeacher)}
                onClick={() => {
                  setNewTeacher(newTeacherInp);
                  setModal(!modal);
                }}
              >
                Save
              </span>
            </div>
          </div>
        ) : null}
      </span>
    </div>
  );
};
export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(true);
  const [classAllotDetail, setClassAllotDetail] = useState(classAllotment);
  const [filteredDet, setFilteredDet] = useState(classAllotment);
  // const [filteredAttDet, setFilteredAttDet] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("modify: ", Global.token);
    // cookies.set('token', '', { path: '/' });
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    // if (!attendanceDetail) {
    //   console.log("fetch");
    //   // fetchStuAttendance();
    // }
  }, []);

  const searchHandler = (event) => {
    const searchText = event.target.value;
    console.log(parseInt(searchText));
    setFilteredDet(
      classAllotDetail.filter((data) =>
        data.teacherName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    console.log(classAllotDetail);
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
        className="assign-container"
        onClick={() => {
          setCollapsed(true);
        }}
      >
        <div className="header">
          <div className="title">Assigning Class</div>
        </div>
        <div className="body">
          <input
            className="searchBar"
            placeholder="Search"
            onChange={searchHandler}
          />
          <div className="table">
            <div className="table-header">
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Class
              </span>
              <span style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}>
                Division
              </span>
              <span style={{ width: "50%", fontWeight: "bold", fontSize: 18 }}>
                Teacher
              </span>
              <span
                style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}
              ></span>
            </div>
            {filteredDet !== [] ? (
              filteredDet.map((data, index) => {
                return (
                  <Row
                    className={"Class " + data.class}
                    div={data.div}
                    teacherName={data.teacherName}
                    key={index}
                    islast={index === filteredDet.length - 1 ? true : false}
                  />
                );
              })
            ) : classAllotDetail !== [] ? (
              classAllotDetail.map((data, index) => {
                return (
                  <Row
                    className={"Class " + data.class}
                    div={data.div}
                    teacherName={data.teacherName}
                    key={index}
                    islast={
                      index === classAllotDetail.length - 1 ? true : false
                    }
                  />
                );
              })
            ) : (
              <div style={{ width: "100%", textAlign: "center", border: 0 }}>
                No data found.
              </div>
            )}
            {/* <Row className={"Class 1"} div="A" teacherName="Teacher001" />
            <Row className={"Class 2"} div="B" teacherName="Teacher002" />
            <Row className={"Class 3"} div="A" teacherName="Teacher003" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
