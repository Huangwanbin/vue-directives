
const scrollPop = {
    bind: function (el,binding,vnode) {
        console.log(el,binding,vnode);
        document.getElementsByTagName('body')[0].style.overflow = "hidden"
    },
    unbind:function (el,binding,vnode) {
        document.getElementsByTagName('body')[0].style.overflow = "auto"
    }
}

export default scrollPop
