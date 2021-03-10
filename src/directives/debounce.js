const debounce = {
    inserted: function (el, binding) {
      //没绑定函数直接返回
      if (!binding.expression) return
      let timer
      //监听点击事件，限定事件内如果再次点击则清空定时器并重新定时
      el.addEventListener('click', () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          binding.value()
        }, 1000)
      })
    },
  }
  
  export default debounce
  
  