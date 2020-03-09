import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from '@/store/index';
import router from '../router/index.js'
//要创建一个新的axios，直接在axios上定义属性总会有问题
var instance = axios.create({
  timeout: 3000
});
const analog = {
  substring: '/api', // 替换地址起始位置
  relpaceAdd: 'http://iyouupload.198ty.com' //上传文件
}

let urlObj = /^\/videos/;
//请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = QS.stringify(config.data);
    };
    // 在发送请求之前做些什么（... 这里写你的展示loading的逻辑代码 ）
    //isShowLoading(true);
    // 获取token，配置请求头
    // 演示的token（注意配置请求头，需要后端做cros跨域处理，我这里自己前端配的跨域）
    let TOKEN = sessionStorage.getItem('tata_token')
    if (TOKEN) {
      // 配置请求头 token
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers['Authorization'] = TOKEN;
    }

    if (!urlObj.test(config.url)) {
      config.baseURL = analog.substring
      if (process.env.NODE_ENV == 'production') {
        config.baseURL = ''
      }
    } else if (config.url.indexOf('videos') > -1) {
      config.baseURL = '/videos'
      config.url = config.url.replace('/videos', '');
      config.headers['Authorization'] = TOKEN;
      //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers['fileType'] = '1';
      config.headers['pathType'] = '4';
      if (process.env.NODE_ENV == 'production') {
        config.baseURL = analog.relpaceAdd
      }
    }
    return config;
  },
  error => {
    // 对请求错误做些什么，处理这个错误
    console.warn(error);

    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    //isShowLoading(false);
    /*console.log(response)
    // 根据你们家的后端定义请求过期后返回的参数，处理token过期问题
    // 我这个接口木有token啊，这里演示下
    // 判断
    const {
      status
    } = response.data;
    // 判断状态码401或者其它条件，不知道判断哪个的去问你家后台
    if (Object.is(status, 401)) {
      // token过期后处理
      // 1.删除你本地存储的那个过期的token

      // 2. 跳转到登陆页（因为没有装路由，不写了，重新登陆赋值）

      //  todo...
    }*/
    if (response.data.code == 1001) {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });

      /*MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
        confirmButtonText: '重新登陆',
        showClose: false,
        type: 'error',
        callback: action => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }
      });*/
    } /*else if (response.data.code == 9999) {
      MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
        confirmButtonText: '重新登陆',
        showClose: false,
        type: 'error',
        callback: action => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }
      });
    }*/

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    //isShowLoading(false);
    return Promise.reject(error);
  }
);

/*instance.interceptors.response.use(res => {
  if (res.data.data.code == 9999) {
    MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
      confirmButtonText: '重新登陆',
      showClose: false,
      type: 'error',
      callback: action => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      }
    });
  } else {
    return res.data;
  }
}, error => {
  return Promise.reject(error);
});*/


class http {
  static async get(url, params) {
    console.log(params)
    return await instance.get(url, {
      params
    })
  }
  static async post(url, params) {
    console.log(params)
    return await instance.post(url, params);
  }
}


export default http;
