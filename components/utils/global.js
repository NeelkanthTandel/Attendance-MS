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
}
