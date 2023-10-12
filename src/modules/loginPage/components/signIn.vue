<template>
  <div class="signIn">
    <a-form
      ref="formRef"
      name="signIn"
      :labelCol="{
        span: 2,
        offset: 2
      }"
      :wrapperCol="{
        span: 15,
        offset: 0
      }"
      :colon="false"
      size="large"
      labelAlign="left"
      class="form"
      :model="modifyForm"
      :rules="rules">
      <a-form-item label="账号" name="username">
        <a-input
          :bordered="false"
          class="input"
          v-model:value="modifyForm.username"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          :bordered="false"
          class="input"
          v-model:value="modifyForm.password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label=" ">
        <a-switch v-model:checked="modifyForm.remember" />
        <a-popover>
          <span style="margin-left: 10px;">记住我</span>
          <svg class="icon" aria-hidden="true" style="margin-left: 5px;">
            <use xlink:href="#icon-wenhao"></use>
          </svg>
          <template #content>
            <span>记住后一段本机访问可自动登录</span>
          </template>
        </a-popover>
      </a-form-item>
      <a-form-item label=" " class="btn-area">
        <a-space :size="50">
          <a-button class="btn" @click="onLogin" :loading="loading">登录</a-button>
          <a-button @click="goSignIn" class="btn" :loading="loading">去注册</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup scoped>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash'
import User from '@utils/user/index.js';

const emit = defineEmits(['goSignIn']);

function goSignIn(){
  emit('goSignIn');
}

const formRef = ref();

const modifyForm = ref({
  username: '',
  password: '',
  remember: false,
});
const rules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'change',
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'change',
  }]
}
const loading = ref(false);

function onLogin(){
  formRef.value.validate().then(() => {
    handleLogin();
  }).catch((e) => {
    message.error({
      content: "请检查错误",
    })
    console.log(e);
  })
}

function handleLogin(){
  const params = cloneDeep(modifyForm.value);
  const user = new User();
  loading.value = true;
  user.signIn(params.username, params.password, params.remember);
  loading.value = false;
}
</script>

<style lang="less">
.signIn{
  padding: 30px;
  .form{
    margin-top: 50px;
    .input{
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.209);
      background-color: #e9e3f232;
    }
    .btn-area{
      .btn{
        background-color: #aea6bb4b;
      }
    }
  }
}

</style>

