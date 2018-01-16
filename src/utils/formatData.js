/**
 * Created by Admin on 2017/11/13.
 */
import { isArray } from '@/utils/validata';
/* 用来格式化时间,以及标签取出的id
数据格式化 */

// 对象封装 将对象中无用的参数去除
export function getToObject (data) {
  let object = {};
  for (let key in data) {
    object[key] = data[key];
  }
  return object;
}
// 数组封装将对象中无用的参数去除
export function getToArrObject (data) {
  let newArr = [];
  for (let i = 0; i < data.length; i++) {
    newArr[i] = this.getToObject(data[i]);
  }
  return newArr;
}

// 判断是否重复.在动态添加标签的地方使用
export function checkArr (arr, arr2) {
  let newArr = [];
  let data = arr[arr.length - 1];
  for (let i = 0; i < arr2.length; i++) {
    newArr.push(arr2[i].value);
  }
  if (newArr.indexOf(data) === -1) return data;
}
// 标签取数据arr//放值的地方,pro总值/标签最后保存的时候,把文字标签替换成id
export function setTag (arr, pro) {
  if (arr.length !== 0) {
    for (let i = 0; i < pro.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === pro[i].label) {
          arr[j] = pro[i].value;
        }
      }
    }
  }
}
// 将数组中需要的id取出来合并为一个数组
export function setIdToArr (arr = [], title) {
  if (isArray(arr)) {
    return arr.map(item => item[title]);
  } else {
    return arr;
  }
}

// 将标签转化为字符长串例子'汽车交通、物流、房产服务、
// 体育运动、工业生产'data为总的数组,title为要改变的字段(字符串格式)
export function setTagToString (data = [], title) {
  if (isArray(data)) {
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
    return [];
  }
}
// 如果数据为0,则返回空字符串data为总的数组,title为要改变的字段(字符串格式)
export function setZeroToNull (data, title) {
  if (isArray(data)) {
    data.forEach((x) => {
      if (x[title] === 0) x[title] = '';
    });
  } else {
    return data;
  }
}
// 如果数据为空字符串,则返回0,data为总的数组,title为要改变的字段(字符串格式)
export function setNullToZero (data, title) {
  if (isArray(data)) {
    data.forEach((x) => {
      if (x[title] === '' || x[title] === undefined) x[title] = 0;
    });
  } else {
    return data;
  }
}
//  在没有头像的时候,转化为文字,url为头像的URL地址,name为当前人的名字
export function setUrlChange (url, name = '') {
  let string = '';
  if (url === '') string = name.charAt(0);
  else string = '';
  return string;
}

// 时间戳的处理

// 时间戳转化为正常时间yyyy-mm-dd-hh-m===========单个时间的处理
export function formatDateTime (timeStamp) {
  if (timeStamp === '' || timeStamp === null || timeStamp === undefined) return '';
  let date = new Date();
  if (timeStamp.length > 11) date.setTime(timeStamp);
  else date.setTime(timeStamp * 1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  // var h = date.getHours();
  // h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d;/* +' '+h+':'+minute+':'+second; */
}
// 时间戳转化正常时间,在数组中循环,time为总的数组,title为要改变的字段(字符串格式)
export function setTime (time, title) {
  time.forEach((x) => {
    x[title] = formatDateTime(x[title]);
  });
}
// 时间转化接受从时间戳转化为中国标准时间(单个数据)
export function setTimeToReallyTime1 (time, title) {
  if (time[title]) {
    time[title] = new Date(time[title] * 1000);
  } else {
    return '';
  }
}
// 时间转化接受从标准时间转换为时间戳(单个数据)
export function setReallyTimeToTime1 (time, title, title2) {
  if (time) {
    time[title2] = Date.parse(time[title]) ? Date.parse(time[title]) : ' ';
  } else {
    return time;
  }
}
// 时间转化接受从中国标准时间转化为时间戳title为要转化的字段title2为新赋值的字段
export function setReallyTimeToTime (time, title, title2) {
  if (isArray(time)) {
    time.forEach((x) => {
      x[title2] = Date.parse(x[title]);
    });
  } else {
    return time;
  }
}
// 时间转化接受从时间戳转化为中国标准时间
export function setTimeToReallyTime (time, title) {
  if (isArray(time)) {
    time.forEach((x) => {
      if (x[title] !== null) {
        x[title] = new Date(x[title].length > 11 ? x[title] : x[title] * 1000);
      } else {
        x[title] = '';
      }
    });
  } else {
    return time;
  }
}
