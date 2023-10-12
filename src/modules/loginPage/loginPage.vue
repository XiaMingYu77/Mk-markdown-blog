<template>
  <div class="login" ref="login">
    <article class="login-area">
      <header class="header">登<span style="margin: 10px;"></span>录</header>
      <SignIn @goSignIn="goSignIn"/>
      <a-drawer
        placement="right"
        :closable="false"
        v-model:open="showSignUp"
        :get-container="false"
        width="450"
        class="signUp"
      >
        <header class="header">注<span style="margin: 10px;"></span>册</header>
        <SignUp/>
      </a-drawer>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import createRibbons from '@components/coloredRibbon.js';
import SignIn from './components/signIn.vue'
import SignUp from './components/signUp.vue';
const store = useStore();
const router = useRouter();
const login = ref();
const showSignUp = ref(false);

onMounted(() => {
  // 生成背景
  createRibbons({
    body_: login.value,
    color: '#EAE8E9',
    horizontalSpeed: 250,
  })
});

function goSignIn(){
  showSignUp.value = true;
}

// 监听登录状态，自动返回
watchEffect(() => {
  const userIsLogIn = store.state.user.isLogin;
  if(userIsLogIn) {router.back();}
});
</script>

<style lang="less" scoped>
.login{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .login-area{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: linear-gradient(to bottom right, rgba(101, 136, 170, 0.75) 30%, rgba(174, 166, 187, 0.75) 100%);
    width: 650px;
    height: 450px;
    border-radius: 30px;
    padding: 20px;
    overflow: hidden;
    box-shadow: 5px 4px 7px rgba(0, 0, 0, 0.4);

    .header{
      width: 100%;
      height: 45px;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      border-bottom: 1.5px solid #27323c5f;
      color: #eeeeee;
    }

    :deep(.signUp) {
      position: absolute;
      border-radius: 30px;
      background-color: #e6bf72;
    }
  }
}
</style>
