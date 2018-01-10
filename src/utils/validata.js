/**
 * Created by Admin on 2017/11/13.
 */
/* eslint-disable */
/* 正则验证函数,
 * 数据判断
 *
 * */
import { error } from './notification';
/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
// 是否为数组
export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}
// 判断是否为空对象
export function isOwnEmpty (obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;// 返回false，不为空对象
    }
  }
  return true;// 返回true，为空对象
}
// 对象深拷贝
export function simpleClone (myObj) {
  if (typeof (myObj) !== 'object') return myObj;
  if (myObj == null) return myObj;
  let myNewObj = {};
  for (let i in myObj) { myNewObj[i] = myObj[i]; }
  return myNewObj;
}

// 去除参数前后空格
export function trim (string) {
  return string.replace(/(^\s*)|(\s*$)/g, '');
}
// 判断是不是空(空字符串也算是空)
export function getNull (data) {
  let reg = /\S/;
  return !reg.test(data);
}
// 判断是不是非浮点数
export function checkNumber (data) {
  let reg = new RegExp('^\\d+(\\.\\d+)?$');
  return reg.test(data);
}
// 邮箱验证
export function checkEmail (data) {
  let data1 = trim(data);
  let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return reg.test(data1);
}
// 邮箱验证(可以为空  为空情况不提示)
export function checkEmail1 (data) {
  let data1 = trim(data);
  let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  if (reg.test(data1) || !data1) {
    return true;
  } else {
    return false;
  }
}
// 网址验证
export function checkURL (data) {
  return data.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null
}
// 电话号码验证
export function checkPhoneNumber (data) {
  let reg = /^1(3|4|5|7|8)\d{9}$/;
  return reg.test(data);
}
// 验证手机号高级版
export function checkPhoneNumber1 (value) {
  let check = false;
  if (!getNull(value)) {
    setTimeout(() => {
      if (!checkNumber(value)) {
        error('手机号码请输入数字值');
        check = false;
      } else {
        if (!checkPhoneNumber(value)) {
          error('请输入正确的手机号');
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
}
// 密码长度认证(6-20)
export function checkPassword (data) {
  if (data.length > 20 || data.length < 6) {
    return true;
  } else {
    return false;
  }
}
