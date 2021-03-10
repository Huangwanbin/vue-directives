
const scrollPop = {
    // bind: function (el,binding,vnode) {
    //     console.log(el,binding,vnode);
    //     document.getElementsByTagName('body')[0].style.overflow = "hidden"
    // },
    // unbind:function (el,binding,vnode) {
    //     document.getElementsByTagName('body')[0].style.overflow = "auto"
    // }
    bind(el) {
        el.st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let cssStr = `overflow: hidden;width: 100%; height: 100%; position: fixed; top: ${- el.st}px;`
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
    },
    unbind(el) {
        let cssStr = 'overflow: auto; height: 100%; position: relative; top: 0px'
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
        document.documentElement.scrollTop = el.st
        document.body.scrollTop = el.st
    }
}

export default scrollPop
