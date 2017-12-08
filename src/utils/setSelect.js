/**
 * Created by Admin on 2017/11/13.
 */
//* 请求类
// 获取城市列表
export function getCity (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].area_title;
    obj.value = data[i].area_id;
    arr.push(obj);
  }
  return arr;
}
// 获取期望融资
export function getScale (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].scale_money;
    obj.value = data[i].scale_id;
    arr.push(obj);
  }
  return arr;
}
// 获取轮次信息
export function getStage (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].stage_name;
    obj.value = data[i].stage_id;
    arr.push(obj);
  }
  return arr;
}
// 获取领域
export function getIndustry (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].industry_name;
    obj.value = data[i].industry_id;
    arr.push(obj);
  }
  return arr;
}
// 设置表格表头的筛选内容======表格页都用的到
export function getTitleSift (data) {
  let arr = [];
  for (let key in data) {
    let obj = {};
    obj.text = data[key];
    obj.value = key;
    arr.push(obj);
  }
  return arr;
}
// 设置标签
export function getTagsPro (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].tag_name;
    obj.value = data[i].tag_id;
    arr.push(obj);
  }
  return arr;
}
// 设置阶段
export function getSchedule (data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj.label = data[i].schedule_name;
    obj.value = data[i].schedule_id;
    arr.push(obj);
  }
  return arr;
}
