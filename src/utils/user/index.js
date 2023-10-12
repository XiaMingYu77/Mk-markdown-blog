import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
import CryptoJS from 'crypto-js';
import request from '@utils/request.js';
import { USER_API, LOG_STATE, REMEMBER_STATE, MANAGE_STATE } from './constants'
import store from '@/store/vuexStore';
const router = useRouter();

export default class User {
  username = ""; // 用户名
  name = ""; // 昵称
  isManager = 0; // 是否是管理员
  isLogin = 0;
  constructor( username = "1", name = "游客", isManager = MANAGE_STATE.USER, isLogin = LOG_STATE.LOGOUT){
    this.username = username;
    this.name = name;
    this.isManager = isManager;
    this.isLogin = isLogin;
  }

  checkLoginState(){ // 检查用户登录状态，未登录直接跳转去登录页面
    if(this.isLogin === LOG_STATE.LOGIN) {return true;}
    else {
      message.error('未登录，请前往登录页面');
      router.push('/login');
      return false;
    }
  }

  async signIn(username, password, remember){ // 登录
    try{
      // eslint-disable-next-line
      const SHApassword = CryptoJS.SHA256(password).toString();
      const ans = await request.post(USER_API.SIGNIN, {
        username,
        password: SHApassword,
        remember: remember? REMEMBER_STATE.YES: REMEMBER_STATE.NO
      });
      this.username = ans.username;
      this.name = ans.name;
      this.isManager = ans.isManager;
      this.isLogin = LOG_STATE.LOGIN;
      store.commit('changeUserState', { user: this });
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  async signUp(username, password, remember){ // 注册
    try{
      // eslint-disable-next-line
      const SHApassword = CryptoJS.SHA256(password).toString();
      const ans = await request.post(USER_API.SIGNUP, {
        username,
        password: SHApassword,
        remember: remember? REMEMBER_STATE.YES: REMEMBER_STATE.NO
      });
      this.username = ans.username;
      this.name = ans.name;
      this.isManager = ans.isManager;
      this.isLogin = LOG_STATE.LOGIN;
      store.commit('changeUserState', { user: this });
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  async signOut(){ // 退出登录
    try{ // 清空cookie，清除user
      await request.get(USER_API.SIGNOUT);
      store.commit('changeUserState', {user: new User()});
      message.success('成功退出登录');
    }catch(e){
      message.error('退出失败');
      console.error(e);
    }
  }

  // 获取用户登录状态
  async getLoginStatus(){
    try {
      const ans = await request.get(USER_API.LOGIN_STATUS);
      const { isLogin, user } = ans;
      if(isLogin === LOG_STATE.LOGIN){
        this.username = user.username;
        this.name = user.name;
        this.isManager = user.isManager;
        this.isLogin = LOG_STATE.LOGIN;
        store.commit('changeUserState', { user: this });
      }
    }catch(e){
      console.error(e);
    }
  }
}