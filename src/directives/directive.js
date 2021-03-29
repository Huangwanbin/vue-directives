import copy from './copy.js'
import longpress from './longpress'
import debounce from './debounce'
import throttle from './throttle'
import clickOut from './clickOut'
import scrollPop from './scrollPop'
import loading from './loading'
import sensor from './sensor'
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  throttle,
  clickOut,
  scrollPop,
  loading,
  sensor,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}