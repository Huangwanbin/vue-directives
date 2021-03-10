import copy from './copy.js'
import longpress from './longpress'
import debounce from './debounce'
import clickOut from './clickOut'
import scrollPop from './scrollPop'
import waterMarker from './waterMarker'
import draggable from './draggable'
import sensor from './sensor'
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  clickOut,
  scrollPop,
  waterMarker,
  draggable,
  sensor
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}