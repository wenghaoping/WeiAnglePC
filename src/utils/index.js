/**
 * Created by Admin on 2017/12/8.
 */

/* 全局基础工具类 */
// 回到顶部
export function getTop () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;
}

export function scrollTo (element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    console.log(new Date());
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

let hour, minute, second;// 时 分 秒
hour = minute = second = 0;// 初始化
// 计时器返回时分秒毫秒
export function getIntervalTime () {
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
}

// 计时器初始化
export function srtIntervalClearTime () {
  hour = 0;
  minute = 0;
  second = 0;
}
