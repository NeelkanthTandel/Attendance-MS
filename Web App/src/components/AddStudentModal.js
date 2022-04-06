import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../css/teacher.css";
import Global from "../components/utils/global";
import { ToastContainer, toast } from "react-toastify";

function AddStudentModal(props) {
  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log("before event consoling");
    const name = event.target.name.value;
    const RFID = event.target.RFID.value;
    const studentID = event.target.studentID.value;
    const parentsPhoneNo = event.target.parentsPhoneNo.value;
    // console.log("before event consoling");
    console.log(name, RFID, parentsPhoneNo, studentID);
    const studentDetail = {
      name,
      stu_id: studentID,
      rfid_id: RFID,
      parents_number: parentsPhoneNo,
      class_id: props.div,
    };

    try {
      const data = await Global.httpPOST("/addStudent", studentDetail);
      console.log("Add student: ", data);
      if (!data.isError) {
        console.log("add Student:", data.RFid);
        toast.dismiss();
        toast.success("Student created successfully");
        props.fetchStudentList();
        props.toggleModal();
      } else {
        toast.dismiss();
        if (data.isUserExist) {
          toast.error(data.message);
        } else {
          toast.error("Something went wrong.\nPlease try again later.");
          props.toggleModal();
        }
      }
    } catch (err) {
      console.log("add student error:", err.message);
    }
  };
  return (
    <>
      <div className="add-modal">
        <div onClick={props.toggleModal} className="overlay"></div>
        <div className="add-modal-content">
          <form onSubmit={submitHandler}>
            <div className="add-modal-header">
              <div className="add-modal-header-title">Add Student Detail</div>
              <IoMdClose
                className="icon-close"
                color="black"
                size={"22px"}
                onClick={props.toggleModal}
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
                    name="name"
                  />
                </div>
              </div>
              <div className="row2">
                <div className="Teacher-id">
                  <label>Student Id</label>
                  {/* <div
                    className="Teacher-id-input"
                    style={{ fontWeight: "bold" }}
                  >
                    1A002
                  </div> */}
                  <input
                    className="Teacher-id-input"
                    type="text"
                    required="required"
                    placeholder={props.lastStudentId}
                    name="studentID"
                  />
                </div>
                <div className="Phone-no">
                  <label>Parents No.</label>
                  <input
                    className="Phone-no-input"
                    type="text"
                    required="required"
                    placeholder="Phone Number"
                    name="parentsPhoneNo"
                  />
                </div>
              </div>
              <div className="row3">
                <div className="Email">
                  <label>RFID</label>
                  <input
                    className="Email-input"
                    type="text"
                    required="required"
                    placeholder="RFID"
                    name="RFID"
                  />
                </div>
                <div className="ClassDiv">
                  <div className="ClassHeading">
                    <label>Class</label>
                    <div
                      className="Teacher-id-input"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.lastStudentId.charAt(0) +
                        "-" +
                        props.lastStudentId.charAt(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input className="submit-button" type="submit" />
          </form>
        </div>
      </div>
      ;
    </>
  );
}

export default AddStudentModal;
