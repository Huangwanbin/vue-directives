const draggable = {
    inserted: function (el) {
      el.style.cursor = 'move'
      el.onmousedown = function (e) {
        let disx = e.pageX - el.offsetLeft
        let disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          let x = e.pageX - disx
          let y = e.pageY - disy
          let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
          let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
          if (x < 0) {
            x = 0
          } else if (x > maxX) {
            x = maxX
          }
  
          if (y < 0) {
            y = 0
          } else if (y > maxY) {
            y = maxY
          }
  
          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
      el.ontouchstart = function (e) {
        //阻止页面的滑动默认事件
        document.body.style.overflow = "hidden"
        let disx = e.touches[0].pageX - el.offsetLeft
        let disy = e.touches[0].pageY - el.offsetTop
        document.ontouchmove = function (e) {
          let x = e.touches[0].pageX - disx
          let y = e.touches[0].pageY - disy
          let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
          let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
          if (x < 0) {
            x = 0
          } else if (x > maxX) {
            x = maxX
          }
  
          if (y < 0) {
            y = 0
          } else if (y > maxY) {
            y = maxY
          }
          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.ontouchend = function () {
          document.ontouchmove = document.ontouchend = null
          document.body.style.overflow = "auto"
        }
      }
    },
  }
  export default draggable
  
  