const throttle = {
    bind:function (el,binding) {
        if (typeof binding.value !== 'function') return
        el._flag = true;
        el._timer = null
        el.handler = function () {
            // console.log('el',Object.keys(el),Object.values(el));
            if (!el._flag) return;
            el._flag && binding.value()
            el._flag = false
            el._timer && clearTimeout(el.timer)
            el._timer = setTimeout(() => {
                el._flag = true;
            }, 3000);
        }
        el.addEventListener('click',el.handler)
    },
    unbind:function (el,binding) {
        el.removeEventListener('click',el.handler)
    }
}

export default throttle