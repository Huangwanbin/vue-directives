import copy from './copy.js'
import longpress from './longpress'
import debounce from './debounce'
import waterMarker from './waterMarker'
import draggable from './draggable'
import clickOut from './clickOut'
import countdown from './countdown'
import scrollPop from './scrollPop'
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  waterMarker,
  draggable,
  clickOut,
  countdown,
  scrollPop
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}