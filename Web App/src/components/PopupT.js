import React from "react";
import "../css/teacher.css";
import Drop from "./Drop";
// import "bootstrap/dist/css/bootstrap.min.css";

function PopupT(props) {
  return (
    <>
      {props.Popup && (
        <div className="one">
          <div className="two" onClick={props.toggle} />
          <div className="popup">
            <form className="Div">
              {/* <div className="Image">
                <Drop />
              </div> */}

              <div className="input1">
                <div className="fname">
                  <label>First Name</label>
                  <input
                    className="fname-input"
                    type="text"
                    required="required"
                    placeholder="First Name"
                  />
                </div>
                <div className="TeacherId">
                  <label>Id</label>
                  <div className="Id-input">SNT000</div>
                </div>
                <div className="email">
                  <label>Email</label>
                  <input
                    className="email-input"
                    type="text"
                    required="required"
                    placeholder="Email"
                  />
                </div>
                {/* <div className="dob">
                  <label className="">Date of Birth</label>
                  <input
                    className="dob-input"
                    type="date"
                    required="required"
                    placeholder="Date of Birth"
                  />
                </div>
                <div className="Uni">
                  <label className="">University</label>
                  <input
                    className="Uni-input"
                    type="text"
                    required="required"
                    placeholder="University"
                  />
                </div> */}
                <div className="address">
                  <label className="">Address</label>
                  <textarea
                    className="add-input"
                    type="text"
                    required="required"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="input2">
                {/* <div className="lname">
                  <label className="">Last Name</label>
                  <input
                    className="lname-input"
                    type="text"
                    required="required"
                    placeholder="Last Name"
                  />
                </div> */}
                <div className="phone">
                  <label className="">Phone</label>
                  <input
                    className="phone-input"
                    type="text"
                    required="required"
                    placeholder="Phone"
                  />
                </div>
                <div className="ClassDiv">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <select className="Class" placeholder="Class">
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
                    <select className="Div">
                      <option>A</option>
                      <option>B</option>
                    </select>
                  </div>
                </div>
                {/* <div className="pob">
                  <label className="">Place of birth</label>
                  <input
                    className="pob-input"
                    type="text"
                    required="required"
                    placeholder="Place of Birth"
                  />
                </div>
                <div className="degree">
                  <label className="">Degree</label>
                  <input
                    className="degree-input"
                    type="text"
                    required="required"
                    placeholder="Degree"
                  />
              //   </div> */}
              </div>

              <input className="submit1" type="submit"></input>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupT;
