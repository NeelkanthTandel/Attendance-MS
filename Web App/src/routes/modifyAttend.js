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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
// import studentDetails from "../constants/dummy-data";
import Global from "../components/utils/global";
import { com_name } from "../keys";
import SideBar from "../components/sideBar";

export default function ModifyAttend() {
  const [collapsed, setCollapsed] = useState(true);
  const [attendanceDetail, setAttendanceDetail] = useState();
  const [markAll, setMarkAll] = useState(null);

  const [isPresentCheck, setIsPresentCheck] = useState(false);
  const [isAbsentCheck, setIsAbsentCheck] = useState(false);
  let updatedAttIds = [];

  const [std, setStd] = useState("1");
  const [selClass, setSelClass] = useState([]);
  const [div, setDiv] = useState("0");

  const [date, setDate] = useState("");
  const [oldDate, setOldDate] = useState();
  const [filteredAttDet, setFilteredAttDet] = useState();
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
            onChange={() => {}}
            // onChange={toggleAttendance}
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
    setFilteredAttDet();
    try {
      const data = await Global.httpPOST("/getAttendance", {
        date: new Date(date),
        classId: Global.user.isAdmin
          ? Global.classDetail[0]
            ? div
            : null
          : Global.user.class_id,
      });
      console.log("att det:  Fetch compelete");
      if (!data.isError) {
        console.log("att det: ", data);
        if (data.stu_att[0] && data.stu_att[0].attendance[0]) {
          setAttendanceDetail(data.stu_att.filter((ele) => ele.attendance[0]));
          setFilteredAttDet(data.stu_att);
        } else {
          setAttendanceDetail(null);
          setFilteredAttDet(null);
        }
      }
    } catch (err) {
      console.log("get attendance error:", err);
    }
  };

  const onSaveHandler = async () => {
    if (!updatedAttIds[0]) {
      console.log("Nothing to update");
      toast.dismiss();
      return toast.warn("Nothing to update");
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
    toast.dismiss();
    toast.success("Updated Attendance Successfully");
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
    console.log("filter date");
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
    console.log("tempDate: ", tempDate);
    setDate(
      tempDate[2] +
        "-" +
        (tempDate[0] < 10 ? "0" + tempDate[0] : tempDate[0]) +
        "-" +
        (tempDate[1] < 10 ? "0" + tempDate[1] : tempDate[1])
    );
    // fetchStuAttendance();
  }, []);

  useEffect(() => {
    if (attendanceDetail && attendanceDetail[0]) {
      if (
        (!isPresentCheck && !isAbsentCheck) ||
        (isPresentCheck && isAbsentCheck)
      ) {
        setFilteredAttDet(attendanceDetail);
      } else if (isPresentCheck) {
        //keep stu with status true
        //ish
        //attendance: [null]
        setFilteredAttDet(
          attendanceDetail.filter((data) => data.attendance[0].status)
        );
      } else if (isAbsentCheck) {
        //keep stu with status false
        setFilteredAttDet(
          attendanceDetail.filter((data) => !data.attendance[0].status)
        );
      }
    }
  });

  return (
    <div className="main-container">
      <SideBar
        navigate={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
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
            {Global.user.isAdmin ? (
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
            ) : null}
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
              {/* <div
                style={{
                  color: "#1c2a40",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Apply
              </div> */}
            </div>
          </div>
          <ToastContainer hideProgressBar newestOnTop position="top-center" />

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
                  // display: "flex",
                  // alignItems: "center",
                }}
              >
                Status
                {/* <input
                  type="checkbox"
                  checked={markAll}
                  // className="markAll"
                  onChange={() => setMarkAll(!markAll)}
                  // onChange={toggleAttendance}
                  style={{
                    width: 15,
                    height: 15,
                    accentColor: "#1c2a40",
                    marginLeft: "15px",
                  }}
                /> */}
              </span>
            </div>
            {filteredAttDet ? (
              filteredAttDet.map((data, index) => {
                return (
                  <>
                    <Row
                      name={data.name}
                      id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
                      islast={
                        filteredAttDet.length - 1 === index ? true : false
                      }
                      attId={data.attendance[0] ? data.attendance[0].id : null}
                      stuId={data.stu_id}
                      key={index}
                      isPresent={
                        markAll == null
                          ? data.attendance[0].status
                          : markAll
                          ? true
                          : false
                      }
                    />
                  </>
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
