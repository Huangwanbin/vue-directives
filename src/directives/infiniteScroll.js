// Y轴滚动条滚动距离
function getScrollTop(){
    let bodyScrollTop = document.body?document.body.scrollTop:0;
    let documentScrollTop = document.documentElement?document.documentElement.scrollTop:0;
    let scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

// 文档高度
function getScrollHeight(){
    let bodyScrollHeight = document.body?document.body.scrollHeight:0;
    let documentScrollHeight = document.documentElement?document.documentElement.scrollHeight:0;
    let scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
// 浏览器视口高度
function getWindowHeight(){
    return document.compatMode == "CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;
}
const infiniteScroll = {
    bind:function (el,{value:loadFn}) {
        if (typeof loadFn!== 'function') return
        el.flag = true;
        el.scrollFn = function (e){
            if (!el.flag) return
            if (Math.floor(getScrollTop())+Math.floor(getWindowHeight()) > Math.floor(getScrollHeight())-20 || Math.floor(getScrollTop())+Math.floor(getWindowHeight()) == Math.floor(getScrollHeight())) {//触底事件
                el.flag = false;
                loadFn()
                setTimeout(() => {
                    el.flag =true;
                }, 500);
            }
        }
        window.addEventListener('scroll',el.scrollFn)
        if (getScrollTop()+getWindowHeight()==getScrollHeight()) {//触底事件
            loadFn()
        }
    },
    unbind:function (el,binding) {
        window.removeEventListener('scroll',el.scrollFn)
    }
}
module.exports = infiniteScroll