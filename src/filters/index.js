/**
 * Created by Admin on 2017/9/6.
 */
import Vue from 'vue';

Vue.filter('timeToReallTime', (value) => {
  if (value === '' || value === undefined || value === null) return '';
  var date = new Date();
  if (value.length > 11) date.setTime(value);
  else date.setTime(value * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  // var h = date.getHours();
  // h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d;/* +' '+h+':'+minute+':'+second; */
});

Vue.filter('timeToReallTime_pointType', (value) => {
  if (value === '' || value === undefined || value === null) return '';
  var date = new Date();
  if (value.length > 11) date.setTime(value);
  else date.setTime(value * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  // var h = date.getHours();
  // h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  return y + '.' + m;/* +' '+h+':'+minute+':'+second; */
});

Vue.filter('timeToReallTime_lineTopoint', (value) => {
  if (value) {
    return value.substr(0, 4) + '.' + value.substr(5, 2);
  }
});

Vue.filter('timeToReallTimeAll', (value) => {
  if (value === '' || value === undefined || value === null) return '';
  var date = new Date();
  if (value.length > 11) date.setTime(value);
  else date.setTime(value * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
});

Vue.filter('nullToZ', (value) => {
  if (value === '' || value === undefined || value === null) {
    return '暂无数据';
  } else {
    return value;
  }
});

Vue.filter('nullToB', (value) => {
  if (value === '' || value === undefined || value === null) {
    return '暂未编辑';
  } else {
    return value;
  }
});

Vue.filter('nullTo_', (value) => {
  if (value === '' || value === undefined || value === null) {
    return '-';
  } else {
    return value;
  }
});
