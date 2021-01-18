import copy from './/copy.js'
import longpress from './longpress'
import debounce from './debounce'
import permission from './permission'
import waterMarker from './waterMarker'
import draggable from './draggable'
import clickOut from './clickOut'
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  permission,
  waterMarker,
  draggable,
  clickOut
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}