const draggable = {
    inserted: function (el) {
      let isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
      if (!isPhone) {
        el.style.cursor = 'move'
        el.onmousedown = function (e) {
          //pageX：鼠标指针距离文档左侧边缘的距离，不随滚动条变化而变化。offsetLeft元素相对其定位父级(offsetParent)的左偏移量。
          let disx = e.pageX - el.offsetLeft //计算出鼠标距离目标元素左边的长度
          let disy = e.pageY - el.offsetTop
          document.onmousemove = function (e) {
            let x = e.pageX - disx //计算移动时，元素距离带定位的父元素左边的距离
            let y = e.pageY - disy
            let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width) //计算body宽度减去元素的宽度，即最大可位移距离
            let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
            if (x < 0) {//当顶到左边时，元素不做位移
              x = 0 
            } else if (x > maxX) {
              x = maxX //当达到边界鼠标继续移动时，元素不做位移
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
      }else{
        //移动端版本
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
      }
    },
  }
  export default draggable
  
  