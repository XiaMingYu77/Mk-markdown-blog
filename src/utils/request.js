import axios from 'axios';
/* eslint-disable-next-line */
import qs from 'qs';
import { message } from 'ant-design-vue';

const request = axios.create();

request.interceptors.request.use((config) => {
  // request 封装request
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (config.method === 'post') {
    if (config.contentType === 'json') {
      config.headers['content-type'] = 'application/json';
    } else {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      config.data = qs.stringify(config.data);
    }
  }
  return config;
}, (error) => {
  // response 错误处理
  message.error({
    content: '请求异常',
    duration: 4,
  })
  Promise.reject(error);
});

// response 拦截
request.interceptors.response.use((response) => {
  // 处理response data
  const res = response.data;
  if (res.code !== undefined && res.code !== 0 && res.code !== 'true') {
    res.msg = res.msg || res.message;
    message.error({
      content: res.msg,
      duration: 4,
    })
    return Promise.reject(res);
  }
  return res.data !== undefined ? res.data : response;
}, (error) => {
  // response 错误处理
  message.error({
    content: '请求异常',
    duration: 4,
  })
  Promise.reject(error);
});

export default request;
