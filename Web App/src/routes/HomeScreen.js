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

import logo from "../images/icon.png";
import "../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdAccountCircle, MdSchool, MdPhone, MdEmail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import {
  IoIosPersonAdd,
  IoMdSchool,
  IoMdClose,
  IoMdPerson,
} from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import color from "../constants/color";
import { com_name } from "../keys";
import Global from "../components/utils/global";

export default function HomeScreen(props) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const [settingModal, setSettingModal] = React.useState(false);
  const [studentCount, setStudentCount] = useState(Global.studentCount);
  const [totalTeacher, setTotalTeacher] = useState(Global.totalTeacher);

  const profileToggleModal = () => {
    setModal(!modal);
  };
  const ToggleModal = () => {
    setSettingModal(!settingModal);
  };
  useEffect(() => {
    // console.log(Global.user);
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!Global.user.name) {
      Global.fetchUser().then(() => {
        // console.log(Global.studentCount);
        setStudentCount({
          total: Global.studentCount.total,
          totalPresent: Global.studentCount.totalPresent,
        });
        setTotalTeacher(Global.totalTeacher);
      });
    }
  }, []);

  return (
    <>
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
          className="home-container"
          onClick={() => {
            setCollapsed(true);
          }}
        >
          <div
            style={{
              height: "80px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              // cursor: "pointer",
            }}
          >
            <AiFillSetting
              color={color.primary}
              size={24}
              style={{ marginRight: 20, cursor: "pointer" }}
              onClick={ToggleModal}
              // onClick={settingToggleModal}
            />
            {settingModal ? (
              <div className="profileModal">
                <div
                  onClick={ToggleModal}
                  // onClick={settingToggleModal}
                  className="profileModal-overlay"
                />
                <div className="profileModal-content">
                  <div className="profileModal-header">
                    <div className="profileModal-header-title">Setting</div>
                    <IoMdClose
                      className="icon-close"
                      color="black"
                      size={"22px"}
                      // onClick={settingToggleModal}
                      onClick={ToggleModal}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <MdAccountCircle
              color={color.primary}
              size={24}
              style={{ marginRight: 20, cursor: "pointer" }}
              onClick={profileToggleModal}
            />
            {modal ? (
              <div className="profileModal">
                <div
                  onClick={profileToggleModal}
                  className="profileModal-overlay"
                ></div>
                <div className="profileModal-content">
                  <div className="profileModal-header">
                    <div className="profileModal-header-title">
                      Profile Detail
                    </div>
                    <IoMdClose
                      className="icon-close"
                      color="black"
                      size={"22px"}
                      onClick={profileToggleModal}
                    />
                  </div>
                  <div className="profileModal-innerContent">
                    <div className="column1">
                      <div className="profile-circle">
                        <span className="profile-circle-alpha">
                          {Global.user.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="column2">
                      <div className="profile-row1">
                        <IoMdPerson
                          color={color.primary}
                          size={24}
                          onClick={profileToggleModal}
                        />

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label className="profile-labels">Name</label>
                          <div className="profile-data">{Global.user.name}</div>
                        </div>
                      </div>

                      <div className="profile-row2">
                        <MdPhone
                          color={color.primary}
                          size={24}
                          onClick={profileToggleModal}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label className="profile-labels">Phone Number</label>
                          <div className="profile-data">
                            {Global.user.phone_number}
                          </div>
                        </div>
                      </div>
                      <div className="profile-row3">
                        <MdEmail
                          color={color.primary}
                          size={24}
                          onClick={profileToggleModal}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label className="profile-labels">Mail Id </label>
                          <div className="profile-data">
                            {Global.user.mail_id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <FiLogOut
              color={color.primary}
              size={24}
              onClick={() => {
                Global.logOutHandler();
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            />
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 5 }}>Administrator</span>
              <BsFillCaretDownFill
                color={color.primary}
                size={12}
                style={{ marginTop: 3.5 }}
              />
            </div> */}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              paddingLeft: 30,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                paddingTop: 30,
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "white",
                  marginRight: 60,
                  borderRadius: 10,
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              >
                <IoMdSchool size={60} color={color.primary} />
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: "40px",
                    }}
                  >
                    {studentCount.totalPresent}
                  </span>
                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: "10px",
                    }}
                  >
                    students<br></br>present out of {studentCount.total}
                  </div>
                </div>
              </div>
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "white",
                  marginRight: 60,
                  borderRadius: 10,
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              >
                <FaChalkboardTeacher size={60} color={color.primary} />
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: "40px",
                    }}
                  >
                    {totalTeacher}
                  </span>
                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: "10px",
                    }}
                  >
                    Total teachers
                  </div>
                </div>
              </div>
              <div
                style={{
                  // padding: 20,
                  backgroundColor: "#e3e3e3",
                  borderRadius: 10,
                  flex: 1,
                  paddingRight: 30,
                  paddingLeft: 30,
                }}
              ></div>
            </div>
            <div className="quick-tools-container">
              <div
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Quick Tools
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  paddingTop: 30,
                  flexDirection: "row",
                }}
              >
                <div
                  className="quick-tools"
                  onClick={() => navigate("/modify-attend")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <FaUserCheck size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Modify Attendance
                  </div>
                </div>

                <div
                  className="quick-tools"
                  onClick={() => navigate("/student")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <IoIosPersonAdd size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Add Students
                  </div>
                </div>

                <div
                  className="quick-tools"
                  style={{ marginRight: 0 }}
                  onClick={() => navigate("/teacher")}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <FaChalkboardTeacher size={40} color={color.primary} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Add Teachers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
