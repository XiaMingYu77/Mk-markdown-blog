import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
import CryptoJS from 'crypto-js';
import request from '@utils/request.js';
import store from '@/store/vuexStore'
const router = useRouter();

export const MANAGE_STATE = {
  USER: 0,
  MANAGER: 1,
}
export const LOG_STATE = {
  LOGOUT: 0,
  LOGIN: 1,
}
export default class User {
  username = ""; // 用户名
  name = ""; // 昵称
  isManager = 0; // 是否是管理员
  isLogin = 0;
  constructor(username = "1", name = "游客", isManager = MANAGE_STATE.USER, isLogin = LOG_STATE.LOGOUT){
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

  async signIn(username, password){ // 登录
    try{
      // eslint-disable-next-line
      const SHApassword = CryptoJS.SHA256(password).toString();
      const ans = await request.post('', {
        username,
        password: SHApassword,
      });
      this.username = ans.username;
      this.name = ans.name;
      this.isManager = ans.isManager;
      this.isLogin = LOG_STATE.LOGIN;
      store.commit('changeUserState', { user: this });
    }catch(e){
      console.error(e);
    }
  }

  async signUp(username, password, remember){ // 注册
    try{
      // eslint-disable-next-line
      const SHApassword = CryptoJS.SHA256(password).toString();
      const ans = await request.post('', {
        username,
        password: SHApassword,
        remember
      });
      this.username = ans.username;
      this.name = ans.name;
      this.isManager = ans.isManager;
      this.isLogin = LOG_STATE.LOGIN;
      store.commit('changeUserState', { user: this });
    }catch(e){
      console.error(e);
    }
  }

  signOut(){ // 退出登录
    try{ // 清空cookie，清除user
      store.commit('changeUserState', {user: new User()});
      // cookie还没写
      message.success('成功退出登录')
    }catch(e){
      console.error(e);
    }
  }
}