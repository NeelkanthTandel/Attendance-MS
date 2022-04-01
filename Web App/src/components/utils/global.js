import { API_URL } from "../../keys";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class Global {
  static user = {};
  static token = null;
  static stuTodayAtt = [];
  static classDetail = [];

  // constructor() {
  //   console.log("Global");

  //   if (!cookies.get("token")) {
  //   }
  // }

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
        authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    return data;
  };

  static httpGET = async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + cookies.get("token"),
      },
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

  static isLoggedIn = () => {
    if (!cookies.get("token")) {
      return false;
    } else {
      return true;
    }
  };

  static logOutHandler = () => {
    cookies.remove("token");
  };

  static fetchUser = async () => {
    if (cookies.get("token")) {
      console.log("Fetch user in global");
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + cookies.get("token"),
          },
        });
        const data = await response.json();
        // console.log(data);
        // Global.user = data.user;
        this.setUserInfo(data.user, cookies.get("token"));
        Global.classDetail = data.classDet;
      } catch (err) {
        console.log("Error fetching user: ", err);
      }
    }
  };
}

const fetchUser = async () => {
  if (cookies.get("token")) {
    console.log("Fetch user");
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + cookies.get("token"),
        },
      });
      const data = await response.json();
      // console.log(data);
      Global.user = data.user;
      Global.classDetail = data.classDet;
    } catch (err) {
      console.log("Error fetching user: ", err);
    }
  }
};

// fetchUser();
