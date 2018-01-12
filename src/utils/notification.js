/**
 * Created by Admin on 2017/11/13.
 */
import { Notification } from 'element-ui';

// 弹框类
// 错误弹窗(所有的错误调用,红色叉)
export function error (text, title = '') {
  Notification.error({
    title: title,
    message: text,
    offset: 300,
    duration: 3000
  });
}
// 成功弹窗(绿钩)
export function success (text, title = '') {
  Notification.success({
    title: title,
    message: text,
    offset: 300,
    duration: 1500
  });
}
// 警告弹窗,(黄色叹号)
export function warning (text, title = '') {
  Notification.warning({
    title: title,
    message: text,
    offset: 300,
    duration: 2000
  });
}
// 判断是不是IE(所有版本)
export function IEVersion () {
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
}
