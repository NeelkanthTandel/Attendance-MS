import React, { useEffect, useState } from "react";
import "../css/teacher.css";
// import PopupT from "../components/PopupT";
import {
  ProSidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";

import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
// import data from "../components/teacherDetail.json";
// import Global from "../components/utils/global";
import { com_name } from "../keys";
import Global from "../components/utils/global";
import AddStudentModal from "../components/AddStudentModal";

const cookies = new Cookies();

const Row = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div
      style={{
        borderBottomWidth: props.islast ? 0 : 0.5,
      }}
      className="row-tT"
    >
      <span style={{ width: "10%", minWidth: "65px" }}>{props.id}</span>
      <span style={{ width: "50%", minWidth: "180px" }}>{props.name}</span>
      <span style={{ width: "15%", minWidth: "65px" }}>{props.roll_no}</span>
      <span style={{ width: "15%", minWidth: "65px" }}>{props.RFid}</span>
      <span
        style={{
          width: "20%",
          justifyContent: "flex-end",
          display: "flex",
          minWidth: "100px",
        }}
      >
        <span onClick={toggleModal} className="remove-button">
          Remove
        </span>
        {modal ? (
          <div className="remove-modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="remove-modal-content">
              <div className="remove-modal-header">
                <div className="remove-modal-header-title">
                  Delete Student Detail
                </div>
                <IoMdClose
                  className="icon-close"
                  color="black"
                  size={"22px"}
                  onClick={() => {
                    setModal(!modal);
                  }}
                />
              </div>
              <div style={{ padding: "30px", paddingTop: "15px" }}>
                <div className="confirmation-text">
                  Are you sure you want to delete teacher details? You won't be
                  able to see details once you delete
                </div>
                <div className="detail">
                  <b>Name: </b>
                  {props.name}
                </div>
                {/* <div className="detail-container"> */}
                <div className="detail">
                  <b>Id: </b>
                  {props.id}
                </div>
                <div className="detail">
                  <b>Class: </b>
                  {props.className + props.div}
                </div>
                {/* </div> */}
                <div className="detail">
                  <b>RFID: </b>
                  {props.RFid}
                </div>
                <div className="detail">
                  <b>Phone no.: </b>
                  {props.parentsNo}
                </div>
              </div>
              <div className="modal-button">
                <span
                  className="remove-modal-button"
                  // value={newTeacher}
                  // onChange={setNewTeacher(newTeacher)}
                  style={{ borderRightWidth: "0.5px" }}
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Cancel
                </span>
                <span
                  className="remove-modal-button"
                  // value={newTeacher}
                  // onChange={setNewTeacher(newTeacher)}
                  style={{ borderLeftWidth: "0.5px" }}
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Confirm
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </span>
    </div>
  );
};

export default function Students() {
  const [collapsed, setCollapsed] = useState(true);
  const [Popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState();
  const [filteredDet, setFilteredDet] = useState();
  const [addModal, setAddModal] = React.useState(false);

  const [std, setStd] = useState("1");
  const [selClass, setSelClass] = useState([]);
  const [div, setDiv] = useState("0");

  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const searchHandler = (event) => {
    const searchText = event.target.value;
    console.log(parseInt(searchText));
    setFilteredDet(
      teacher.filter((data) =>
        data.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const fetchStudentList = async () => {
    const data = await Global.httpPOST("/getStudentList", {
      classId: div,
    });
    console.log("teacher: ", data);
    if (!data.isError) {
      setTeacher(data.studentList);
      setFilteredDet(data.studentList);
    } else {
      toast.dismiss();
    }
  };

  // useEffect(() => {
  //   if (!Global.isLoggedIn()) {
  //     return navigate("/");
  //   }
  //   if (!Global.user) {
  //     console.log("Fetching user");
  //     Global.fetchUser().then(console.log(Global.classDetail));
  //   }
  //   fetchStudentList();
  // }, []);

  useEffect(() => {
    console.log("modify: ", Global.classDetail);
    // cookies.set('token', '', { path: '/' });
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!Global.classDetail[0]) {
      console.log("Fetching user");
      Global.fetchUser().then(() => {
        console.log("fetch user completed");
        filterDiv();
      });
    } else if (!teacher) {
      console.log("fetch");
      fetchStudentList();
    } else if (teacher[0].class_id !== div) {
      console.log("Div changed");
      fetchStudentList();
    }
  }, [div]);

  const filterDiv = () => {
    console.log("filter div");
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
        className="modify-containerT"
        onClick={() => {
          setCollapsed(true);
        }}
      >
        <div className="headerT">
          <div className="titleT">Students</div>
          <div className="Add">
            <div className="save-btn" onClick={toggleAddModal}>
              Add Students
            </div>
            {addModal ? (
              <AddStudentModal
                setDiv={setDiv}
                selClass={selClass}
                div={div}
                std={std}
                setStd={setStd}
                toggleModal={toggleAddModal}
                lastStudentId={teacher[teacher.length - 1].stu_id}
              />
            ) : null}
            <ToastContainer hideProgressBar newestOnTop position="top-center" />
          </div>
        </div>
        <div className="bodyT" style={{ marginBottom: "60px" }}>
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
          <input
            className="searchBar"
            placeholder="Search"
            onChange={searchHandler}
          />
          <div className="tableT">
            <div className="table-headerT">
              <span
                style={{
                  minWidth: "65px",
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Id
              </span>
              <span
                style={{
                  minWidth: "180px",
                  width: "50%",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Name
              </span>
              <span style={{ width: "15%", fontWeight: "bold", fontSize: 18 }}>
                Roll no.
              </span>
              <span style={{ width: "15%", fontWeight: "bold", fontSize: 18 }}>
                Rfid
              </span>
              <span
                style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}
              />
            </div>
            {filteredDet
              ? filteredDet.map((data, index) => {
                  return (
                    <Row
                      id={data.stu_id}
                      roll_no={
                        data.stu_id.charAt(2) +
                        data.stu_id.charAt(3) +
                        data.stu_id.charAt(4)
                      }
                      name={data.name}
                      RFid={data.rfid_id}
                      parentsNo={data.parents_number}
                      className={data.class_detail.standard}
                      div={data.class_detail.div}
                      key={index}
                      islast={index === filteredDet.length - 1 ? true : false}
                    />
                  );
                })
              : null}
          </div>
        </div>
        {/* <div>
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
        </div> */}

        {/* <PopupT Popup={Popup} toggle={toggle} /> */}
      </div>
    </div>
  );
}
