const longpress = {
    bind: function (el, binding, vNode) {
      //没绑定函数直接返回
      if (typeof binding.value !== 'function') return
      // 定义变量
      let pressTimer = null
      // 创建计时器（ 2秒后执行函数 ）
      let start = (e) => {
        //e.type表示触发的事件类型如mousedown,touchstart等，e.button表示是哪个键按下0为鼠标左键，1为中键，2为右键
        if (  (e.type === 'touchstart' && e.button && e.button !== 0) || 
              (e.type === 'mousedown' && e.touches && e.touches.length == 1)
        ) {
          return
        }
        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            handler()
          }, 2000)
          //取消浏览器默认事件，如右键弹窗
          el.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          })
        }
      }
      // 取消计时器
      let cancel = (e) => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }
      // 运行函数
      const handler = (e) => {
        binding.value(e)
      }
      // 添加事件监听器
      el.addEventListener('mousedown', start)
      el.addEventListener('touchstart', start)
      // 取消计时器
      el.addEventListener('click', cancel)
      el.addEventListener('mouseout', cancel)
      el.addEventListener('touchend', cancel)
      el.addEventListener('touchcancel', cancel)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
      el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      el.removeEventListener('click', el.handler)
    },
  }
  
  export default longpress
  
  