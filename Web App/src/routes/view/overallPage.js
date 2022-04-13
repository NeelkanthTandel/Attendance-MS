import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";

import logo from "../../images/icon.png";
import "../../css/sideBar.css";
import {
  FaChalkboardTeacher,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import Global from "../../components/utils/global";
import { com_name } from "../../keys";
import SideBar from "../../components/sideBar";

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
      <span style={{ width: "50%" }}>{props.name}</span>
      <span style={{ width: "40%" }}>
        {props.totPresent}/{props.totalWorkDays}
      </span>
      <span style={{ width: "20%" }}>{props.perc}%</span>
    </div>
  );
};

export default function OverallPage() {
  const [collapsed, setCollapsed] = useState(true);
  const [overallAtt, setOverallAtt] = useState();
  const [totalWorkD, setTotalWorkD] = useState();
  const [std, setStd] = useState("1");
  const [selClass, setSelClass] = useState([]);
  const [div, setDiv] = useState("0");

  const [date, setDate] = useState("");
  const [oldDate, setOldDate] = useState();
  // const [filteredAttDet, setFilteredAttDet] = useState();
  const navigate = useNavigate();

  const fetchAllAttendance = async () => {
    console.log("Class Id: ", Global.user.class_id);
    if (!Global.user.class_id) {
      return console.log("No class Id");
    }
    try {
      const data = await Global.httpPOST("/getOverallAttendance", {
        classId: Global.user.isAdmin ? div : Global.user.class_id,
      });
      if (!data.isError) {
        console.log(data);
        console.log("fetch overall att complete");
        setOverallAtt(data.totalStuAtt);
        setTotalWorkD(data.totalWorkDays);
      } else {
        //handle error
      }
    } catch (err) {
      console.log("Fetch overall att error:", err);
      //handle error
    }
  };

  useEffect(() => {
    console.log("modify: ", Global.classDetail);
    // cookies.set('token', '', { path: '/' });
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!Global.classDetail[0]) {
      console.log("Fetching user");
      Global.fetchUser()
        .then(() => {
          filterDiv();
          // fetchAllAttendance();
        })
        .catch((e) => {
          console.log("fetch user error: ", e);
        });
    } else {
      if (!overallAtt || !overallAtt[0]) {
        fetchAllAttendance();
      } else if (overallAtt[0].class_id !== div) {
        console.log("Div changed");
        fetchAllAttendance();
      }
    }
  }, [div]);

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
      <SideBar
        navigate={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="modify-container">
        <div className="header">
          <div className="title">Overall Attendance</div>
          {/* <div className="save-btn">Overall Attendance</div> */}
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
          </div>
          <div className="table">
            <div className="table-header">
              <span style={{ width: "10%", fontWeight: "bold", fontSize: 18 }}>
                Id
              </span>
              <span style={{ width: "50%", fontWeight: "bold", fontSize: 18 }}>
                Name
              </span>
              <span style={{ width: "40%", fontWeight: "bold", fontSize: 18 }}>
                Present/Total Days
              </span>
              <span style={{ width: "20%", fontWeight: "bold", fontSize: 18 }}>
                Percentage
              </span>
            </div>
            {overallAtt
              ? overallAtt.map((data, index) => {
                  let noOfPres = data.attendance.length;

                  return (
                    <Row
                      name={data.name}
                      id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
                      attendance={data.attendance}
                      islast={overallAtt.length - 1 === index ? true : false}
                      totPresent={noOfPres}
                      totalWorkDays={totalWorkD}
                      perc={
                        (((noOfPres * 100) / totalWorkD).toFixed(0) < 10
                          ? "0"
                          : "") + ((noOfPres * 100) / totalWorkD).toFixed(0)
                      }
                      key={index}
                    />
                    // <View
                    //   style={{
                    //     flexDirection: "row",
                    //     width: "100%",
                    //     marginBottom: 15,
                    //   }}
                    //   key={index}
                    // >
                    //   <CustomText style={{ width: "12%", minWidth: 18 }}>
                    //     {item.stu_id.charAt(3) + item.stu_id.charAt(4)}
                    //   </CustomText>
                    //   <CustomText style={{ width: "58%" }} numberOfLines={1}>
                    //     {item.name}
                    //   </CustomText>
                    //   <CustomText style={{ width: "15%", minWidth: 28 }}>
                    //     {noOfPres}/{totalWorkD}
                    //   </CustomText>
                    //   <CustomText style={{ width: "15%", minWidth: 28 }}>
                    //     {((noOfPres * 100) / totalWorkD).toFixed(0)}%
                    //   </CustomText>
                    // </View>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
