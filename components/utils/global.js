import { API_URL } from "../../keys";

export default class Global {
  static user = {};
  static token = null;
  static stuTodayAtt = [];

  static setUserInfo = (user, token) => {
    this.user = user;
    this.token = token;
  };

  static logOutHandler = () => {
    this.user = {};
    this.token = null;
    this.stuTodayAtt = [];
  };

  static httpPOST = async (endpoint, bodyData) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    return data;
  };

  static fetchStuAttendance = async (date) => {
    // let prevDate = new Date();
    // prevDate.setDate(prevDate.getDate() - 1);

    const data = await this.httpPOST("/getAttendance", { date });
    console.log("att det:  Fetch compelete");
    if (!data.isError) {
      this.stuTodayAtt = data.stu_att;
      return data.stu_att;
    }
    //handle error
    return;
  };
}
