import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../css/teacher.css";
import Global from "../components/utils/global";
import { ToastContainer, toast } from "react-toastify";

function AddStudentModal(props) {
  // const [std, setStd] = useState("1");
  // const [selClass, setSelClass] = useState([]);
  // const [div, setDiv] = useState("0");

  // const toggleAddModal = () => {
  //   setAddModal(!addModal);
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const RFID = event.target.rfid_id.value;
    const studentID = event.target.stu_id.value;
    const parentsPhoneNo = event.target.parents_number.value;
    console.log(name, RFID, parentsPhoneNo);
    const studentDetail = {
      name,
      stu_id: studentID,
      rfid_id: RFID,
      parents_number: parentsPhoneNo,
      class_id: props.div,
      isAdmin: false,
    };

    try {
      const data = await Global.httpPOST("/addStudent", studentDetail);
      if (data.isError) {
        console.log("add Student:", data.RFid);
        toast.dismiss("Details must be provided");
      } else if (!data.isError) {
        console.log("add Student:", data.RFid);
        toast.dismiss();
        toast.success("Student created successfully");
        props.fetchTeacherList();
        props.toggleModal();
      } else {
        toast.dismiss();
        toast.error(data.message);
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
                  <div
                    className="Teacher-id-input"
                    style={{ fontWeight: "bold" }}
                  >
                    1A002
                  </div>
                </div>
                <div className="Phone-no">
                  <label>Parents No.</label>
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
                  <label>RFID</label>
                  <input
                    className="Email-input"
                    type="text"
                    required="required"
                    placeholder="RFID"
                  />
                </div>
                <div className="ClassDiv">
                  <div className="ClassHeading">
                    <label>Class</label>
                    <select
                      className="classDD"
                      placeholder="Class"
                      style={{ padding: "3px" }}
                      onChange={(event) => props.setStd(event.target.value)}
                      value={props.std}
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
                  </div>
                  <div className="DivHeading">
                    <label>Div</label>
                    <select
                      className="divDD"
                      style={{ padding: "3px" }}
                      onChange={(e) => props.setDiv(e.target.value)}
                      value={props.div}
                    >
                      {Global.classDetail[0] ? (
                        props.selClass.map((data, index) => (
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
