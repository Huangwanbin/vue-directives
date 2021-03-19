const debounce = {
    inserted: function (el, {value:{fn, event, time}}) {
      //没绑定函数直接返回
      if (typeof fn !== 'function') return
      let timer
      //监听点击事件，限定事件内如果再次点击则清空定时器并重新定时
      el.addEventListener(event, () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn()
        }, time)
      })
    },
  }
  
  export default debounce
  
  