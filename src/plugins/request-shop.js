/*
 * @Date: 2021-04-14
 * @Description: axios配置文件:request header配置、拦截器配置
 */

import axios from "axios";

const BASE_PATH = "/shop/v1";

const service = axios.create({
  baseURL: BASE_PATH, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    let code = res.errorCode;
    delete res.errorCode;
    // if the custom code is not 20000, it is judged as an error.
    if (code === 200000) {
      //正常响应====>
      return res;
    } else {
      //返回错误类型
      // return Promise.reject(new Error(res.errorMsg || "Error"));
      //这里暂时不抛出错误
      return res;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
