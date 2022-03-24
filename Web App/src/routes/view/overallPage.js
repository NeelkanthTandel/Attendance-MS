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
import { useNavigate } from "react-router-dom";

import logo from "../../images/icon.png";
import "../../css/sideBar.css";
import { FaChalkboardTeacher, FaChevronRight } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import Global from "../../components/utils/global";

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

  const navigate = useNavigate();

  const fetchAllAttendance = async () => {
    console.log("Class Id: ", Global.user.class_id);
    if (!Global.user.class_id) {
      return console.log("No class Id");
    }
    try {
      const data = await Global.httpPOST("/getOverallAttendance", {
        classId: Global.user.class_id,
      });
      if (!data.isError) {
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
    if (!Global.isLoggedIn()) {
      return navigate("/");
    }
    if (!Global.user.classId) {
      console.log("Fetching user");
      Global.fetchUser()
        .then(() => {
          fetchAllAttendance();
        })
        .catch((e) => {
          console.log("fetch user error: ", e);
        });
    } else {
      if (!overallAtt) {
        fetchAllAttendance();
      }
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
          <div className="title"> View Overall Attendance</div>
          <div className="save-btn">Overall Attendance</div>
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
                      perc={((noOfPres * 100) / totalWorkD).toFixed(0)}
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
