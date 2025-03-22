import axios from 'axios';
import {Message} from "@arco-design/web-react";

let instance = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
  timeout: 60000,
});

// 请求拦截
instance.interceptors.request.use();

// 响应拦截
instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    let msg = err.response.data.msg
    if (!msg) msg = err.message;
    Message.error({
      content: msg,
      duration: 15000,
      closable: true
    })

    return Promise.reject(err);
  }
)

export default instance;
