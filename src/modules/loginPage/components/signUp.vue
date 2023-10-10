<template>
  <div class="signUp">
    <a-form
      ref="formRef"
      :labelCol="{
        span: 4,
        offset: 3
      }"
      :wrapperCol="{
        span: 13,
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
          v-model:value="modifyForm.username"
          placeholder="账号：6～15位"
        />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          v-model:value="modifyForm.password"
          placeholder="密码：6～15位"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        v-if="modifyForm.password.length !== 0"
        name="rePassword">
        <a-input-password
          v-model:value="modifyForm.rePassword"
          placeholder="再次输入密码"
        />
      </a-form-item>
      <a-form-item label=" ">
        <a-switch v-model:checked="modifyForm.remember" />
        <a-popover>
          <span style="margin-left: 10px; color: #e54548;">记住我</span>
          <svg class="icon" aria-hidden="true" style="margin-left: 5px;">
            <use xlink:href="#icon-wenhao"></use>
          </svg>
          <template #content>
            <span>记住后一段本机访问可自动登录</span>
          </template>
        </a-popover>
      </a-form-item>
      <a-form-item label=" ">
        <a-button
          style="margin-right: 40px;"
          type="primary"
          @click="onSignUp"
          :loading="loading">注册</a-button>
        <a-button
          :loading="loading">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash'
import CryptoJS from 'crypto-js';
import request from '@utils/request.js';
import User, {LOG_STATE} from '@utils/user.js';
import {useStore} from 'vuex';
const store = useStore();
const formRef = ref();
const modifyForm = ref({
  username: '',
  password: '',
  rePassword: '',
  remember: false
});
const rules = {
  username: [
    {
      required: true,
      min: 6,
      max: 15,
      message: "账号长度应为6～15",
      trigger: 'change',
    }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: "密码长度应为6～15",
      trigger: 'change',
    }
  ],
  rePassword: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if(value === modifyForm.value.password) {callback();}
        else {callback("两次密码输入不一致");}
      },
      trigger: 'change',
    }
  ]
}
const loading = ref(false);

function onSignUp(){
  formRef.value.validate().then(() => {
    handleSignUp();
  }).catch((e) => {
    message.error({
      content: "请检查错误",
    })
    console.log(e);
  })
}

async function handleSignUp(){
  const data = cloneDeep(modifyForm.value);
  // eslint-disable-next-line
  data.password = CryptoJS.SHA256(data.password).toString();
  try{
    loading.value = true;
    const ans = await request.post('', {
      username: data.username,
      password: data.password,
      remember: data.remember
    });
    const user = new User(ans.username, ans.name, ans.isManager, LOG_STATE.LOGIN);
    store.commit('changeUserState', {user});
    loading.value = false;
  } catch(e){
    console.error(e);
  }
}
</script>

<style lang="less" scoped>
.signUp{
  margin-top: 30px;
  left: 0;
  right: 0;
}

</style>