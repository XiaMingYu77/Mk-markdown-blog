export const MANAGE_STATE = {
  USER: 0,
  MANAGER: 1,
}
export const LOG_STATE = {
  LOGOUT: 0,
  LOGIN: 1,
}
export default class user {
  userName = ""; // 用户名
  name = ""; // 昵称
  isManager = 0; // 是否是管理员
  isLogin = 0;
  constructor(userName = "1", name = "游客", isManager = MANAGE_STATE.USER, isLogin = LOG_STATE.LOGOUT){
    this.userName = userName;
    this.name = name;
    this.isManager = isManager;
    this.isLogin = isLogin;
  }
}