import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../css/teacher.css";
import Global from "../components/utils/global";
import { ToastContainer, toast } from "react-toastify";

function AddTeacherModal(props) {
  // const [std, setStd] = useState("1");
  // const [selClass, setSelClass] = useState([]);
  // const [div, setDiv] = useState("0");

  // const toggleAddModal = () => {
  //   setAddModal(!addModal);
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const teacherId = event.target.teacherId.value;
    const phoneNo = event.target.phoneNumber.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const conPassword = event.target.confirmPassword.value;
    console.log(name, phoneNo, email, password, conPassword, teacherId);
    if (password !== conPassword) {
      console.log("error");
      toast.dismiss();
      toast.error("Password must match");
    } else {
      const teacherDetail = {
        name,
        teacher_id: teacherId,
        password,
        mail_id: email,
        phone_number: phoneNo,
        class_id: props.div,
        isAdmin: false,
      };
      // console.log("Teacher Detail: ", teacherDetail);
      try {
        const data = await Global.httpPOST("/addTeacher", teacherDetail);
        if (!data.isError) {
          console.log("add Teacher:", data.teacher_id);
          toast.dismiss();
          toast.success("Teacher created successfully");
          props.fetchTeacherList();
          props.toggleModal();
        } else {
          toast.dismiss();
          toast.error(data.message);
        }
      } catch (err) {
        console.log("add teacher error:", err.message);
      }
    }
  };
  return (
    <>
      <div className="add-modal">
        <div onClick={props.toggleModal} className="overlay"></div>
        <div className="add-modal-content">
          <form onSubmit={submitHandler}>
            <div className="add-modal-header">
              <div className="add-modal-header-title">Add Teacher Detail</div>
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
                  <label>Teacher Id</label>
                  {/* <div
                    className="Teacher-id-input"
                    style={{ fontWeight: "bold" }}
                  >
                    {props.lastTeacherId}
                  </div> */}
                  <input
                    className="Teacher-id-input"
                    type="text"
                    required="required"
                    placeholder={props.lastTeacherId}
                    name="teacherId"
                  />
                </div>
                <div className="Phone-no">
                  <label>Phone No.</label>
                  <input
                    className="Phone-no-input"
                    type="text"
                    required="required"
                    placeholder="Phone Number"
                    name="phoneNumber"
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
                    name="email"
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
              <div className="row4">
                <div className="password">
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    className="confirm-password-input"
                    name="password"
                  />
                </div>
                <div className="password">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="confirm-password-input"
                    name="confirmPassword"
                  />
                </div>
              </div>
            </div>
            <input
              className="submit-button"
              type="submit"
              onClick={props.toggleModal}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTeacherModal;
