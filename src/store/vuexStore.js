import { createStore } from 'vuex'
import User from '@utils/user.js'

export default createStore({
  state:{ // 存放数据，使用响应式包装
    user: new User(),
  },
  mutations:{ // 同步修改state内容
    changeUserState(state, payload){
      state.user = payload.user;
    }
  },
})