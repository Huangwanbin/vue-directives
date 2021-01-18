const clickOut = {
    bind(el,binding,vnode){
        console.log(binding)
        function clickHandler(e) {
            //先判断电机的元素是否是本身，如果是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            //判断指令中是否绑定了函数
            if (binding.expression) {
                //如果绑定了函数，则调用函数，此处binding.value就是handleClose方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener('click',clickHandler);
    },
    unbind(el,binding){
        //解除事件监听
        document.removeEventListener('click',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
}

export default clickOut
