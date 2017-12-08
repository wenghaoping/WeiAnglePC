 /**
 * Created by WengHaoping on 2017/5/18.
 */
 /* eslint-disable */
/**
 * 总的工具类
 */
import { Notification } from 'element-ui';
let hour, minute, second;// 时 分 秒
hour = minute = second = 0;// 初始化

const tool = {
// 数据封装类
  getToObject (data) {
    let object = {};
    for (let key in data) {
      object[key] = data[key];
    }
    return object;
  }, // 对象封装 将对象中无用的参数去除
  getToArrObject (data) {
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      newArr[i] = tool.getToObject(data[i]);
    }
    return newArr;
  }, //* 数组封装将对象中无用的参数去除
  getTitleSift (data) {
    let arr = [];
    for (let key in data) {
      let obj = {};
      obj.text = data[key];
      obj.value = key;
      arr.push(obj);
    }
    return arr;
  }, // 设置表格表头的筛选内容======表格页都用的到
  checkArr (arr, arr2) {
    let newArr = [];
    let data = arr[arr.length - 1];
    for (let i = 0; i < arr2.length; i++) {
      newArr.push(arr2[i].value);
    }
    if (newArr.indexOf(data) === -1) return data;
  }, // 判断是否重复.在动态添加标签的地方使用
  setTag (arr, pro) {
    if (arr.length !== 0) {
      for (let i = 0; i < pro.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] === pro[i].label) {
            arr[j] = pro[i].value;
          }
        }
      }
    }
  }, // 标签取数据arr//放值的地方,pro总值/标签最后保存的时候,把文字标签替换成id

/// *验证类
  trim (string) {
    return string.replace(/(^\s*)|(\s*$)/g, '');
  }, // 去除参数前后空格

  getNull (data) {
    let reg = /\S/;
    return !reg.test(data);
  }, // 判断是不是空(空字符串也算是空)
  checkNumber (data) {
    let reg = new RegExp('^\\d+(\\.\\d+)?$');
    return reg.test(data);
  }, // 判断是不是非浮点数
  checkEmail (data) {
    let data1 = this.trim(data);
    let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return reg.test(data1);
  }, // 邮箱验证
  checkEmail1 (data) {
    let data1 = this.trim(data);
    let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (reg.test(data1) || !data1) {
      return true;
    } else {
      return false;
    }
  }, // 邮箱验证(可以为空  为空情况不提示)
  checkURL (data) {
    return data.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null
  }, // 网址验证
  checkPhoneNumber (data) {
    let reg = /^1(3|4|5|7|8)\d{9}$/;
    return reg.test(data);
  }, // 电话号码验证
  checkPhoneNumber1 (value) {
    let check = false;
    if (!this.getNull(value)) {
      setTimeout(() => {
        if (!this.checkNumber(value)) {
          this.error('手机号码请输入数字值');
          check = false;
        } else {
          if (!this.checkPhoneNumber(value)) {
            this.error('请输入正确的手机号');
            check = false;
          } else {
            check = true;
          }
        }
      }, 100);
    } else {
      check = true;
    }
    return check;
  }, // 验证手机号高级版
  checkLength (data) {
    if (data.length > 20) {
      return true;
    } else {
      return false;
    }
  }, // 长度认证(1-20)
  checkLength1 (data) {
    if (data.length > 40) {
      return true;
    } else {
      return false;
    }
  }, // 长度认证(1-40)
  checkPassword (data) {
    if (data.length > 20 || data.length < 6) {
      return true;
    } else {
      return false;
    }
  }, // 密码长度认证(6-20)
  isArray (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }, // 是否为数组
  isOwnEmpty (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;// 返回false，不为空对象
      }
    }
    return true;// 返回true，为空对象
  }, // 判断是否为空对象
  simpleClone (myObj) {
    if (typeof (myObj) !== 'object') return myObj;
    if (myObj == null) return myObj;
    let myNewObj = {};
    for (var i in myObj) { myNewObj[i] = myObj[i]; }
    return myNewObj;
  }, // 对象深拷贝

  //* 时间戳的处理
  formatDateTime (timeStamp) {
    if (timeStamp === '') return '';
    var date = new Date();
    if (timeStamp.length > 11) date.setTime(timeStamp);
    else date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;/* +' '+h+':'+minute+':'+second; */
  }, // 时间戳转化为正常时间yyyy-mm-dd-hh-m===========单个时间的处理
  setTime (time, title) {
    time.forEach((x) => {
      x[title] = tool.formatDateTime(x[title]);
    });
  }, // 时间戳转化正常时间,在数组中循环,time为总的数组,title为要改变的字段(字符串格式)
// 将数组中需要的id取出来合并为一个数组
  setIdToArr (arr, title) {
    if (tool.isArray(arr)) {
      let tags = [];
      arr.forEach((x) => {
        tags.push(x[title]);
      });
      return tags;
    } else {
      return arr;
    }
  },
  //* 将标签转化为字符长串==========例子'汽车交通、物流、房产服务、体育运动、工业生产'data为总的数组,title为要改变的字段(字符串格式)*/
  setTagToString (data, title) {
    if (tool.isArray(data)) {
      let str = '';
      if (data.length === 0) {
        str = '';
      } else {
        data.forEach((x) => {
          str += x[title] + '、';
        });
        str = str.substr(0, str.length - 1);
      }
      return str;
    } else {
      return data;
    }
  },
  // 如果数据为0,则返回空字符串data为总的数组,title为要改变的字段(字符串格式)
  setZeroToNull (data, title) {
    if (tool.isArray(data)) {
      data.forEach((x) => {
        if (x[title] === 0) x[title] = '';
      });
    } else {
      return data;
    }
  },
  // 如果数据为空字符串,则返回0,data为总的数组,title为要改变的字段(字符串格式)
  setNullToZero (data, title) {
    if (tool.isArray(data)) {
      data.forEach((x) => {
        if (x[title] === '' || x[title] === undefined) x[title] = 0;
      });
    } else {
      return data;
    }
  },

// 时间转化接受从时间戳转化为中国标准时间
  setTimeToReallyTime (time, title) {
    if (tool.isArray(time)) {
      time.forEach((x) => {
        x[title] = new Date(x[title].length > 11 ? x[title] : x[title] * 1000);
      });
    } else {
      return time;
    }
  },
  // 时间转化接受从时间戳转化为中国标准时间(单个数据)
  setTimeToReallyTime1 (time, title) {
    if (time[title]) {
      time[title] = new Date(time[title] * 1000);
    } else {
      return '';
    }
  },
// 时间转化接受从中国标准时间转化为时间戳title为要转化的字段title2为新赋值的字段
  setReallyTimeToTime (time, title, title2) {
    if (tool.isArray(time)) {
      time.forEach((x) => {
        x[title2] = Date.parse(x[title]);
      });
    } else {
      return time;
    }
  },
  // 单个数据从标准时间转换为时间戳
  setReallyTimeToTime1 (time, title, title2) {
    if (time) {
      time[title2] = Date.parse(time[title]) ? Date.parse(time[title]) : ' ';
    } else {
      return time;
    }
  },

  //* 在没有头像的时候,转化为文字,url为头像的URL地址,name为当前人的名字
  setUrlChange (url, name = '') {
    let string = '';
    if (url === '') string = name.charAt(0);
    else string = '';
    return string;
  },

  // 计时器返回时分秒毫秒
  getIntervalTime () {
    second = second + 2;
    if (second >= 60) {
      second = 0;
      minute = minute + 1;
    }

    if (minute >= 60) {
      minute = 0;
      hour = hour + 1;
    }
    return hour + '时' + minute + '分' + second + '秒';
  },
  // 计时器初始化
  srtIntervalClearTime () {
    hour = 0;
    minute = 0;
    second = 0;
  },
// ===========================================================
//* 弹框类
  error (text) {
    Notification.error({
      message: text,
      offset: 300,
      duration: 1500
    });
  }, // 错误弹窗(所有的错误调用,红色叉)
  success (text) {
    Notification.success({
      message: text,
      offset: 300,
      duration: 1500
    });
  }, // 成功弹窗(绿钩)
  warning (text) {
    Notification.warning({
      message: text,
      offset: 300,
      duration: 3000
    });
  }, // 警告弹窗,(黄色叹号)
  IEVersion () {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion === 7) {
        return 7;
      } else if (fIEVersion === 8) {
        return 8;
      } else if (fIEVersion === 9) {
        return 9;
      } else if (fIEVersion === 10) {
        return 10;
      } else {
        return 6;// IE版本<=7
      }
    } else if (isEdge) {
      return 'edge';// edge
    } else if (isIE11) {
      return 11; // IE11
    } else {
      return -1;// 不是ie浏览器
    }
  }, // 判断是不是IE(所有版本)
// ===========================================================
//* 请求类
  getCity (data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].area_title;
      obj.value = data[i].area_id;
      arr.push(obj);
    }
    return arr;
  }, // 获取城市列表
  getScale (data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].scale_money;
      obj.value = data[i].scale_id;
      arr.push(obj);
    }
    return arr;
  }, // 获取期望融资
  getStage (data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].stage_name;
      obj.value = data[i].stage_id;
      arr.push(obj);
    }
    return arr;
  }, // 获取轮次信息
  getIndustry (data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].industry_name;
      obj.value = data[i].industry_id;
      arr.push(obj);
    }
    return arr;
  }, // 获取领域
  getTagsPro (data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].tag_name;
      obj.value = data[i].tag_id;
      arr.push(obj);
    }
    return arr;
  }, // 设置标签

//* 页面回到顶部
  getTop () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
  },

  console () {
    let type = false;// true代表开发环境,false代表上线环境
    if (type) console.log(...arguments);
  }// console控制

};

export default{
  install (Vue) {
    Vue.prototype.$tool = tool;
  }
};
