// import draggable from './spare/draggable'
import copy from './copy.js'
import longpress from './longpress'
import debounce from './debounce'
import throttle from './throttle'
import clickOut from './clickOut'
import scrollPop from './scrollPop'
import waterMarker from './waterMarker'
import sensor from './sensor'
// 自定义指令
const directives = {
  // draggable,
  copy,
  longpress,
  debounce,
  throttle,
  clickOut,
  scrollPop,
  waterMarker,
  sensor
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}