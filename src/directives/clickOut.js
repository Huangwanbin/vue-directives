const clickOut = {
    bind(el,binding,vnode){
        function clickHandler(e) {
            //先判断点击的元素是否是本身，如果是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            //判断指令中是否绑定了函数
            if (binding.expression) {//expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
                console.log(binding);
                //如果绑定了函数，则调用函数，此处binding.value就是clickImgOut方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.handler = clickHandler;
        //加个异步，瞬间触发clickHandler函数
        setTimeout(() => {
            document.addEventListener('click',el.handler);
        }, 0);
    },
    unbind(el,binding){
        //解除事件监听
        document.removeEventListener('click',el.handler);
        delete el.handler;
    }
}

export default clickOut
