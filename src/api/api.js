/**
 * Created by WengHaoping on 2017/6/5.
 */
import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
// axios.defaults.baseURL = 'https://pc.dev.weitianshi.cn';
axios.defaults.baseURL = 'https://wts.weitianshi.cn';

// POST传参序列化 http request 拦截器
axios.interceptors.request.use((config) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

// code状态码200判断http response 拦截器
axios.interceptors.response.use((res) => {
/*  console.log(res.data.status_code);
  if(res.data.status_code==401){//具体的判断token失效的参数
    alert("您已超时,请重新登陆");
    localStorage.clear();
    window.location.href='/#/login/codeLogin';//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
    setTimeout(()=>{ window.location.reload();},50)
  }else */
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

export default axios;
