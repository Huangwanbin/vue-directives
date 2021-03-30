const longpress = {
    bind: function (el, binding, vNode) {
      //没绑定函数直接返回
      if (typeof binding.value !== 'function') return
      // 定义定时器变量
      el.pressTimer = null
      // 创建计时器（ 2秒后执行函数 ）
      el._start = (e) => {
        //e.type表示触发的事件类型如mousedown,touchstart等
        //pc端: e.button表示是哪个键按下0为鼠标左键，1为中键，2为右键
        //移动端: e.touches表示同时按下的键为个数
        if (  (e.type === 'mousedown' && e.button && e.button !== 0) || 
              (e.type === 'touchstart' && e.touches && e.touches.length > 1)
        ) return;
        //定时长按两秒后执行事件
        if (el.pressTimer === null) {
          el.pressTimer = setTimeout(() => {
            binding.value()
          }, 2000)
          //取消浏览器默认事件，如右键弹窗
          el.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          })
        }
      }
      // 如果两秒内松手，则取消计时器
      el._cancel = (e) => {
        if (el.pressTimer !== null) {
          clearTimeout(el.pressTimer)
          el.pressTimer = null
        }
      }
      // 添加事件监听器
      el.addEventListener('mousedown', el._start)
      el.addEventListener('touchstart', el._start)
      // 取消计时器
      el.addEventListener('click', el._cancel)
      el.addEventListener('mouseout', el._cancel)
      el.addEventListener('touchend', el._cancel)
      el.addEventListener('touchcancel', el._cancel)
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      // 移除事件监听器
      el.removeEventListener('mousedown', el._start)
      el.removeEventListener('touchstart', el._start)
      // 移除取消计时器
      el.removeEventListener('click', el._cancel)
      el.removeEventListener('mouseout', el._cancel)
      el.removeEventListener('touchend', el._cancel)
      el.removeEventListener('touchcancel', el._cancel)
    },
  }
  
  export default longpress
  
  