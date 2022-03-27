// import React, { useState, useEffect } from "react";
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarFooter,
//   SubMenu,
//   SidebarHeader,
//   SidebarContent,
// } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
// import logo from "../../images/icon.png";
// import "../../css/sideBar.css";
// import {
//   FaChalkboardTeacher,
//   FaChevronRight,
//   FaChevronLeft,
// } from "react-icons/fa";
// import { HiHome } from "react-icons/hi";
// import { MdSchool } from "react-icons/md";
// import { SiGoogleclassroom } from "react-icons/si";
// import { BsUiChecks } from "react-icons/bs";
// import Global from "../../components/utils/global";
// import { useNavigate } from "react-router-dom";
// import { com_name } from "../../keys";

// const DayToDayPage = () => {
//   const [collapsed, setCollapsed] = useState(true);
//   const [allDayAtt, setAllDayAtt] = useState();
//   const [workingDays, setWorkingDays] = useState();

//   const [std, setStd] = useState("1");
//   const [selClass, setSelClass] = useState([]);
//   const [classId, setClassId] = useState("0");

//   const navigate = useNavigate();

//   const fetchAllAttendance = async () => {
//     if (!classId) {
//       return console.log("Selecet class");
//     }
//     console.log("get day attendance");
//     try {
//       const data = await Global.httpPOST("/getDayAttendance", {
//         classId: classId,
//       });
//       if (!data.isError) {
//         console.log("fetch overall att complete");
//         console.log(data.workingDays);
//         setAllDayAtt(data.totalStuAtt);
//         setWorkingDays(data.workingDays);
//       } else {
//         //handle error
//       }
//     } catch (err) {
//       console.log("Fetch overall att error:", err);
//       //handle error
//     }
//   };

//   useEffect(() => {
//     console.log("modify: ", Global.classDetail);
//     // cookies.set('token', '', { path: '/' });
//     if (!Global.isLoggedIn()) {
//       return navigate("/");
//     }
//     if (!Global.classDetail[0]) {
//       console.log("Fetching user");
//       Global.fetchUser().then(filterDiv());
//     } else if (!allDayAtt) {
//       console.log("fetch");
//       fetchAllAttendance();
//     } else if (workingDays[0].class_id !== classId) {
//       console.log("classId changed");
//       fetchAllAttendance();
//     }
//   }, [classId]);

//   const filterDiv = () => {
//     console.log("filter class");
//     const tempClass = Global.classDetail.filter(
//       (data) => data.standard === parseInt(std)
//     );
//     setSelClass(
//       Global.classDetail.filter((data) => data.standard === parseInt(std))
//     );
//     setClassId(tempClass[0] ? tempClass[0].class_id : "0");
//   };

//   useEffect(() => {
//     filterDiv();
//   }, [std, Global.classDetail]);

//   const Rows = (props) => {
//     var statusArr = [];
//     for (var i = 0; i < workingDays.length; i++) {
//       var matchingData = props.data.attendance.find(
//         (elem) => elem.date.toString() === workingDays[i].date
//       );

//       if (matchingData) {
//         statusArr.push(matchingData.status ? "P" : "A");
//       } else {
//         statusArr.push("-");
//       }
//     }

//     return statusArr.map((data, ind) => (
//       <span
//         style={{
//           padding: 5,
//           borderColor: "black",
//           borderStyle: "solid",
//           borderTopWidth: 0,
//           borderRightWidth: 0,
//           borderLeftWidth: 0,
//           borderBottomWidth: ind == workingDays.length - 1 ? 0 : 0.5,
//         }}
//         key={ind}
//       >
//         {data}
//       </span>
//     ));
//     // return props.data.attendance.map((att, ind) => {
//     //   // var i = 0;
//     //   // console.log("TEMP: ", i++);
//     //   return (

//     //   );
//     // });
//   };

//   return (
//     <div className="main-container">
//       <ProSidebar
//         collapsed={collapsed}
//         collapsedWidth={98}
//         style={{ position: "absolute", left: 0, top: 0 }}
//       >
//         <SidebarHeader>
//           <div
//             className="s-logo-container"
//             onClick={() => {
//               navigate("/home");
//             }}
//           >
//             <img
//               src={logo}
//               alt="logo"
//               className="s-logo"
//               style={{ marginRight: collapsed ? 0 : 20 }}
//             />
//             {collapsed ? "" : com_name}
//           </div>
//         </SidebarHeader>
//         <SidebarContent>
//           <Menu iconShape="circle">
//             <MenuItem
//               icon={<HiHome color={"white"} />}
//               onClick={() => {
//                 navigate("/home");
//               }}
//             >
//               Home
//             </MenuItem>
//             <MenuItem
//               icon={<MdSchool color={"white"} />}
//               onClick={() => {
//                 navigate("/student");
//               }}
//             >
//               Students
//             </MenuItem>
//             <MenuItem
//               icon={<FaChalkboardTeacher color={"white"} />}
//               onClick={() => {
//                 navigate("/teacher");
//               }}
//             >
//               Teachers
//             </MenuItem>
//             <MenuItem
//               icon={<SiGoogleclassroom color={"white"} />}
//               onClick={() => {
//                 navigate("/modify-attend");
//               }}
//             >
//               Class
//             </MenuItem>
//             {/* <MenuItem
//                 icon={<BsUiChecks color={"white"} />}
//                 onClick={() => {
//                   navigate("/modify-attend");
//                 }}
//               >
//                 Attendance
//               </MenuItem> */}
//             <SubMenu title="Attendance" icon={<BsUiChecks color={"white"} />}>
//               <MenuItem
//                 onClick={() => {
//                   navigate("/view-attend/overall");
//                 }}
//               >
//                 Overall
//               </MenuItem>
//               <MenuItem
//                 onClick={() => {
//                   navigate("/view-attend/day-day");
//                 }}
//               >
//                 Day To Day
//               </MenuItem>
//             </SubMenu>
//           </Menu>
//         </SidebarContent>
//         <SidebarFooter
//           style={{
//             paddingLeft: 40,
//           }}
//         >
//           <div className="s-footer">
//             {collapsed ? (
//               <FaChevronRight
//                 className="s-icon"
//                 onClick={() => setCollapsed(!collapsed)}
//               />
//             ) : (
//               <FaChevronLeft
//                 className="s-icon"
//                 onClick={() => setCollapsed(!collapsed)}
//               />
//             )}
//           </div>
//         </SidebarFooter>
//       </ProSidebar>
//       <div className="modify-container">
//         <div className="header">
//           <div className="title"> View Day to Day Attendance</div>
//           <div className="save-btn">Day to Day Attendance</div>
//         </div>

//         <div className="body">
//           <div className="filter-container">
//             <div>
//               <select
//                 className="filter"
//                 placeholder="Class"
//                 onChange={(event) => setStd(event.target.value)}
//                 value={std}
//               >
//                 {Global.classDetail[0] ? (
//                   <>
//                     <option value="1">Class 1</option>
//                     <option value="2">Class 2</option>
//                     <option value="3">Class 3</option>
//                     <option value="4">Class 4</option>
//                     <option value="5">Class 5</option>
//                     <option value="6">Class 6</option>
//                     <option value="7">Class 7</option>
//                     <option value="8">Class 8</option>
//                     <option value="9">Class 9</option>
//                     <option value="10">Class 10</option>
//                     <option value="11">Class 11</option>
//                     <option value="12">Class 12</option>
//                   </>
//                 ) : (
//                   <option value="0">Class</option>
//                 )}
//               </select>
//               <select
//                 className="filter"
//                 onChange={(e) => setClassId(e.target.value)}
//                 value={classId}
//               >
//                 {Global.classDetail[0] ? (
//                   selClass.map((data, index) => (
//                     <option key={index} value={data.class_id}>
//                       {data.div}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="0">-</option>
//                 )}
//               </select>
//             </div>
//           </div>
//           {/* <div className="table">
//             <div className="table-header">
//               <span style={{ width: 30, fontWeight: "bold", fontSize: 18 }}>
//                 Id
//               </span>
//               <span style={{ width: 200, fontWeight: "bold", fontSize: 18 }}>
//                 Name
//               </span>

//               {workingDays && workingDays[0]
//                 ? workingDays.map((data, index) => (
//                     // <CustomText
//                     //   style={{
//                     //     fontWeight: "700",
//                     //     paddingVertical: 5,
//                     //     paddingHorizontal: 10,
//                     //     borderBottomWidth:
//                     //       index == workingDays.length - 1 ? 0 : 0.5,
//                     //   }}
//                     //   key={index}
//                     // >
//                     //
//                     // </CustomText>
//                     <span
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         fontWeight: "bold",
//                         fontSize: 12,
//                       }}
//                     >
//                       {new Date(data.date).getDate() +
//                         "/" +
//                         (new Date(data.date).getMonth() + 1) +
//                         "/" +
//                         new Date(data.date)
//                           .getFullYear()
//                           .toString()
//                           .slice(2, 4)}
//                     </span>
//                   ))
//                 : null}
//             </div>
//             {studentDetails.map((data, index) => {
//               return (
//                 <Row
//                   name={data.name}
//                   id={data.stu_id.charAt(3) + data.stu_id.charAt(4)}
//                   islast={studentDetails.length - 1 === index ? true : false}
//                 />
//               );
//             })}
//           </div> */}

//           <div className="ver-table">
//             <div className="ver-table-header">
//               <span
//                 style={{
//                   padding: 5,

//                   fontWeight: "700",
//                   paddingHorizontal: 10,
//                   paddingLeft: 30,
//                   paddingRight: 15,
//                   borderColor: "black",
//                   borderStyle: "solid",
//                   borderTopWidth: 0,
//                   borderRightWidth: 0,
//                   borderLeftWidth: 0,
//                   borderBottomWidth: 0.5,
//                 }}
//               >
//                 Id
//               </span>
//               <span
//                 style={{
//                   padding: 5,

//                   fontWeight: "700",
//                   paddingVertical: 0,
//                   paddingLeft: 30,
//                   paddingRight: 15,
//                   // height: 24,
//                   textAlignVertical: "center",
//                   // fontSize: 12,
//                   borderColor: "black",
//                   borderStyle: "solid",
//                   borderTopWidth: 0,
//                   borderRightWidth: 0,
//                   borderLeftWidth: 0,
//                   borderBottomWidth: 0.5,
//                 }}
//               >
//                 Name
//               </span>

//               {workingDays && workingDays[0]
//                 ? workingDays.map((data, index) => (
//                     <span
//                       style={{
//                         padding: 5,
//                         fontWeight: "700",
//                         paddingVertical: 5,
//                         paddingLeft: 30,
//                         paddingRight: 15,
//                         borderColor: "black",
//                         borderStyle: "solid",
//                         borderTopWidth: 0,
//                         borderRightWidth: 0,
//                         borderLeftWidth: 0,
//                         borderBottomWidth:
//                           index == workingDays.length - 1 ? 0 : 0.5,
//                       }}
//                       key={index}
//                     >
//                       {new Date(data.date).getDate() +
//                         "/" +
//                         (new Date(data.date).getMonth() + 1) +
//                         "/" +
//                         new Date(data.date)
//                           .getFullYear()
//                           .toString()
//                           .slice(2, 4)}
//                     </span>
//                   ))
//                 : null}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 overflowX: "scroll",
//               }}
//             >
//               {allDayAtt && allDayAtt[0] ? (
//                 allDayAtt.map((data, index) => (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       // paddingVertical: 10,
//                       minWidth: "fit-content",
//                       width: 150,
//                       borderColor: "black",
//                       borderStyle: "solid",
//                       borderTopWidth: 0,
//                       borderBottomWidth: 0,
//                       borderLeftWidth: 0,
//                       borderRightWidth: index == allDayAtt.length - 1 ? 0 : 0.5,
//                     }}
//                     key={index}
//                   >
//                     <span
//                       style={{
//                         padding: 5,
//                         borderColor: "black",
//                         borderStyle: "solid",
//                         borderTopWidth: 0,
//                         borderRightWidth: 0,
//                         borderLeftWidth: 0,
//                         borderBottomWidth: 0.5,
//                       }}
//                     >
//                       {data.stu_id.slice(3, 5)}
//                     </span>
//                     <span
//                       style={{
//                         padding: 5,
//                         paddingVertical: 0,
//                         // height: 24,
//                         borderColor: "black",
//                         borderStyle: "solid",
//                         borderTopWidth: 0,
//                         borderRightWidth: 0,
//                         borderLeftWidth: 0,
//                         borderBottomWidth: 0.5,
//                         // fontSize: 12,
//                         textAlignVertical: "center",
//                       }}
//                     >
//                       {data.name}
//                     </span>
//                     {workingDays && workingDays[0] ? (
//                       <Rows data={data} />
//                     ) : null}
//                     {/* {data.attendance.map((att, ind) => {
//                       var i = 0;
//                       console.log("TEMP: ", i++);
//                       return (
//                         <CustomText
//                           style={{
//                             padding: 5,
//                             borderBottomWidth:
//                               ind == data.attendance.length - 1 ? 0 : 0.5,
//                           }}
//                           key={ind}
//                         >
//                           {data.attendance && data.attendance[0]
//                             ? att.status
//                               ? "P"
//                               : "A"
//                             : "A"}
//                         </CustomText>
//                       );
//                     })} */}
//                   </div>
//                 ))
//               ) : (
//                 <span>Loading Data...</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayToDayPage;
