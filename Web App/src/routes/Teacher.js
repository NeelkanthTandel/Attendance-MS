import React, { useEffect, useState } from "react";
import "../css/teacher.css";
// import PopupT from "../components/PopupT";
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
import { IoMdClose } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import data from "../components/teacherDetail.json";
// import Global from "../components/utils/global";
import { com_name } from "../keys";
import Global from "../components/utils/global";

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
      <span style={{ width: "15%", minWidth: "65px" }}>{props.className}</span>
      <span style={{ width: "15%", minWidth: "65px" }}>{props.div}</span>
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
                  Delete Teacher Detail
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
                  <b>Mail: </b>
                  {props.mail_id}
                </div>
                <div className="detail">
                  <b>Phone no.: </b>
                  {props.phone_number}
                </div>
                <div className="detail">
                  <b>Address: </b>
                  {props.address}
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

export default function Teacher() {
  const [collapsed, setCollapsed] = useState(true);
  const [Popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState();
  const [filteredDet, setFilteredDet] = useState();
  const [addModal, setAddModal] = React.useState(false);
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

  const fetchTeacherList = async () => {
    const data = await Global.httpGET("/getTeacherList");
    console.log("teacher: ", data);
    if (!data.isError) {
      setTeacher(data.teacherList);
      setFilteredDet(data.teacherList);
    }
  };

  useEffect(() => {
    fetchTeacherList();
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
          <div className="titleT">Teachers</div>
          <div className="Add">
            <div className="save-btn" onClick={toggleAddModal}>
              Add Teacher
            </div>
            {addModal ? (
              <div className="add-modal">
                <div onClick={toggleAddModal} className="overlay"></div>
                <div className="add-modal-content">
                  <div className="add-modal-header">
                    <div className="add-modal-header-title">
                      Add Teacher Detail
                    </div>
                    <IoMdClose
                      className="icon-close"
                      color="black"
                      size={"22px"}
                      onClick={() => {
                        setAddModal(!addModal);
                      }}
                    />
                  </div>
                  <div className="add-modal-innerContent">
                    <div className="row1">
                      <div className="Name" style={{ width: "100%" }}>
                        <label>Name</label>
                        <input
                          className="Name-input"
                          type="text"
                          required="required"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="row2">
                      <div className="Teacher-id">
                        <label>Teacher Id</label>
                        <div
                          className="Teacher-id-input"
                          style={{ fontWeight: "bold" }}
                        >
                          Teacher002
                        </div>
                      </div>
                      <div className="Phone-no">
                        <label>Phone No.</label>
                        <input
                          className="Phone-no-input"
                          type="text"
                          required="required"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="row3">
                      <div className="Email">
                        <label>Email</label>
                        <input
                          className="Email-input"
                          type="text"
                          required="required"
                          placeholder="Email"
                        />
                      </div>
                      <div className="ClassDiv">
                        <div className="ClassHeading">
                          <label>Class</label>
                          <select
                            className="classDD"
                            placeholder="Class"
                            style={{ padding: "3px" }}
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
                        </div>
                        <div className="DivHeading">
                          <label>Div</label>
                          <select className="divDD" style={{ padding: "3px" }}>
                            <option>A</option>
                            <option>B</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row4">
                      <div className="Address" style={{ width: "100%" }}>
                        <label>Address</label>
                        <textarea
                          className="address-input"
                          type="text"
                          required="required"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                  <span
                    className="submit-button"
                    onClick={() => {
                      setAddModal(!addModal);
                    }}
                  >
                    Submit
                  </span>
                </div>
              </div>
            ) : null}
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
                Class
              </span>
              <span style={{ width: "15%", fontWeight: "bold", fontSize: 18 }}>
                Div
              </span>
              <span
                style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}
              />
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
            {filteredDet
              ? filteredDet.map((data, index) => {
                  return (
                    <Row
                      id={data.teacher_id}
                      name={data.name}
                      className={data.class_detail.standard}
                      div={data.class_detail.div}
                      mail_id={data.mail_id}
                      phone_number={data.phone_number}
                      address={data.address}
                      key={index}
                      islast={index == filteredDet.length - 1 ? true : false}
                    />
                  );
                })
              : null}
          </div>
        </div>

        {/* <PopupT Popup={Popup} toggle={toggle} /> */}
      </div>
    </div>
  );
}
