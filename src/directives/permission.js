function checkArray(key) {
    let arr = ['1', '2', '3', '4']
    let index = arr.indexOf(key)
    if (index > -1) {
      return true // 有权限
    } else {
      return false // 无权限
    }
}
  
const permission = {
    inserted: function (el, binding) {
        let permission = binding.value // 获取到 v-permission的值
        if (permission) {
          let hasPermission = checkArray(permission)
          if (!hasPermission) {
              // 没有权限 移除Dom元素
              el.parentNode && el.parentNode.removeChild(el)
          }
        }
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, binding) {
      let permission = binding.value // 获取到 v-permission的值
        if (permission) {
          let hasPermission = checkArray(permission)
          if (!hasPermission) {
              // 没有权限 移除Dom元素
              el.parentNode && el.parentNode.removeChild(el)
          }else{
            el.parentNode && el.parentNode.appendChild(el)
          }
        }
    },
}
  
  export default permission