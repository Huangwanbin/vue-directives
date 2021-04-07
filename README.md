# 8个vue自定义指令推荐

在 Vue，除了核心功能默认内置的指令 ( v-model 和 v-show )，Vue 也允许注册自定义指令。它的作用价值在于当开发人员在某些场景下需要对普通 DOM 元素进行操作。

Vue 自定义指令有全局注册和局部注册两种方式。先来看看注册全局指令的方式，通过 `Vue.directive( id, [definition] )` 方式注册全局指令。然后在入口文件中进行 `Vue.use()` 调用。

批量注册指令，新建 `directives/directive.js` 文件

````js
import copy from './copy'
import longpress from './longpress'
// 自定义指令
const directives = {
  copy,
  longpress,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}

````

在 `main.js` 引入并调用

````js
import Vue from 'vue'
import Directives from './directives/directive.js'
Vue.use(Directives)
````

指令定义函数提供了几个钩子函数（可选）：

- bind: 只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作，此时获取父节点为null。
- inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中），此时可以获取到父节点。
- update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: 只调用一次， 指令与元素解绑时调用。

下面分享几个实用的 Vue 自定义指令

- 复制粘贴指令 `v-copy`
- 长按指令 `v-longpress`
- 函数防抖指令 `v-debounce`
- 函数节流指令 `v-throttle`
- 点击元素外部指令 `v-click-out`
- 弹窗限制外部滚动指令 `v-scroll-pop`
- 加载指令 `v-loading`
- 神策埋点指令`v-sensor`

## 1 v-copy

需求：实现一键复制文本内容，用于鼠标右键粘贴。

思路：

1. 动态创建 `textarea` 标签，并设置 `readOnly` 属性及移出可视区域
2. 将要复制的值赋给 `textarea` 标签的 `value` 属性，并插入到 `body`
3. 选中值 `textarea` 并复制
4. 将 `body` 中插入的 `textarea` 移除
5. 在第一次调用时绑定事件，在解绑时移除事件

````js
const copy = {
    bind(el, { value }) {
      el.$value = value
      el.handler = () => {
        if (!el.$value) {
          // 值为空的时候，给出提示。可根据项目UI仔细设计
          console.log('无复制内容')
          return
        }
        // 动态创建 textarea 标签
        const textarea = document.createElement('textarea')
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
        textarea.readOnly = 'readonly'
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        // 将要 copy 的值赋给 textarea 标签的 value 属性
        textarea.value = el.$value
        // 将 textarea 插入到 body 中
        document.body.appendChild(textarea)
        // 选中值并复制
        textarea.select()
        const result = document.execCommand && document.execCommand('Copy') || false;
        if (result) {
          console.log('复制成功') // 可根据项目UI仔细设计
        }else {
          console.log('复制失败，请手动复制')
        }
        document.body.removeChild(textarea)
      }
      // 绑定点击事件
      el.addEventListener('click', el.handler)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
      el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      el.removeEventListener('click', el.handler)
    },
  }
  
  export default copy
````

使用：给 Dom 加上 `v-copy` 及复制的文本即可

````html
<template>
  <button v-copy="copyText">复制</button>
</template>

<script>
  export default {
    data() {
      return {
        copyText: 'text',
      }
    },
  }
</script>

````

## 2 v-longpress

需求：实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

思路：

1. 创建一个计时器， n 秒后执行函数
2. 当用户按下按钮时触发 `mousedown` 事件，启动计时器；用户松开按钮时调用` mouseout` 事件。
3. 如果 `mouseup` 事件 n 秒内被触发，就清除计时器，当作一个普通的点击事件
4. 如果计时器没有在 n秒内清除，则判定为一次长按，可以执行关联的函数。
5. 在移动端要考虑 `touchstart`，`touchend` 事件

```js
const longpress = {
    bind: function (el, {value:{fn,time}}, vNode) {
      //没绑定函数直接返回
      if (typeof fn !== 'function') return
      // 定义定时器变量
      el.pressTimer = null
      // 创建计时器（ 2秒后执行函数 ）
      el._start = (e) => {
        //e.type表示触发的事件类型如mousedown,touchstart等
        //pc端: e.button表示是哪个键按下0为鼠标左键，1为中键，2为右键
        //移动端: e.touches表示同时按下的键为个数
        if (  (e.type === 'mousedown' && e.button && e.button !== 0) || 
              (e.type === 'touchstart' && e.touches && e.touches.length > 1)
        ) return;
        //定时长按两秒后执行事件
        if (el.pressTimer === null) {
          el.pressTimer = setTimeout(() => {
            fn()
          }, time)
          //取消浏览器默认事件，如右键弹窗
          el.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          })
        }
      }
      // 如果两秒内松手，则取消计时器
      el._cancel = (e) => {
        if (el.pressTimer !== null) {
          clearTimeout(el.pressTimer)
          el.pressTimer = null
        }
      }
      // 添加事件监听器
      el.addEventListener('mousedown', el._start)
      el.addEventListener('touchstart', el._start)
      // 取消计时器
      el.addEventListener('click', el._cancel)
      el.addEventListener('mouseout', el._cancel)
      el.addEventListener('touchend', el._cancel)
      el.addEventListener('touchcancel', el._cancel)
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      // 移除事件监听器
      el.removeEventListener('mousedown', el._start)
      el.removeEventListener('touchstart', el._start)
      // 移除取消计时器
      el.removeEventListener('click', el._cancel)
      el.removeEventListener('mouseout', el._cancel)
      el.removeEventListener('touchend', el._cancel)
      el.removeEventListener('touchcancel', el._cancel)
    },
  }
  
  export default longpress
  
  
```

使用：给 Dom 加上 `v-longpress` 及回调函数即可

````html
<template>
  <button v-longpress="{fn: longpress,time:2000}">长按</button>
</template>

<script>
export default {
  methods: {
    longpress () {
      alert('长按指令生效')
    }
  }
}
</script>

````

## 3 v-debounce

背景：在开发中，有时遇到要给input或者滚动条添加监听事件，需要做防抖处理。

需求：防止input或scroll事件在短时间内被多次触发，使用防抖函数限制一定时间后触发。

思路：

1. 定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。
2. 将事件绑定在传入的方法上。

````js
const debounce = {
    inserted: function (el, {value:{fn, event, time}}) {
      //没绑定函数直接返回
      if (typeof fn !== 'function') return
      //监听点击事件，限定事件内如果再次点击则清空定时器并重新定时
      el.addEventListener(event, () => {
        if (el._timer) {
          clearTimeout(el._timer)
        }
        el._timer = setTimeout(() => {
          fn()
        }, time)
      })
    },
  }
  
  export default debounce
  
  
````

使用：给 Dom 加上 `v-debounce` 及回调函数即可

````html
<template>
  <input v-debounce="{fn: debounce, event: 'input', time: 5000}" />
      <div v-debounce="{fn: debounce, event: 'scroll', time: 5000}">
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文							字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文							字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文							字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文							字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文							字文字文字文字</p>
      </div>
</template>

<script>
export default {
  methods: {
    debounce(){
      console.log('debounce 防抖')
    },
  }
}
</script>

````



## 4 v-throttle

背景：在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如立即购买按钮，多次点击就会多次调用创建订单接口。

需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

思路：

1. 定义一个由开关（默认为开）控制是否执行的方法，第一次执行函数时将开关关闭，在规定时间内再调用该方法，则不会再次执行，直至规定时间过后开关打开。
2. 将事件绑定在 click 方法上。

````JS
const throttle = {
    bind:function (el,{value:{fn,time}}) {
        if (typeof fn !== 'function') return
        el._flag = true;//开关默认为开
        el._timer = null
        el.handler = function () {
            if (!el._flag) return;
            //执行之后开关关闭
            el._flag && fn()
            el._flag = false
            el._timer && clearTimeout(el.timer)
            el._timer = setTimeout(() => {
                el._flag = true;//三秒后开关开启
            }, time);
        }
        el.addEventListener('click',el.handler)
    },
    unbind:function (el,binding) {
        el.removeEventListener('click',el.handler)
    }
}

export default throttle
````

使用：给Dom加上`v-throttle` 及回调函数即可。

````html
<template>
 <button v-throttle="{fn: throttle,time:3000}">throttle节流</button>
</template>

<script>
export default {
  methods: {
    throttle () {
      console.log('只触发一次')
    }
  }
}
</script>
````



## 5 v-clickOut

背景：在我们的项目里，经常会出现一个弹窗，需要点击弹窗外部关闭该弹窗。

需求：实现一个指令，点击目标区域外部，触发指定函数。

思路：

1. 判断点击的元素是否为目标元素，是则不作为，否则触发指定函数。

````js
const clickOut = {
    bind(el,binding,vnode){
        function clickHandler(e) {
            //先判断点击的元素是否是本身，如果是本身，则返回
            if (el.contains(e.target)) return;
            //判断指令中是否绑定了函数
            if (typeof binding.value === 'function') {
                console.log(binding);
                //如果绑定了函数，则调用函数，此处binding.value就是clickImgOut方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.handler = clickHandler;
        //添加事件监听
        setTimeout(() => {
            document.addEventListener('click',el.handler);
        }, 0);
    },
    unbind(el,binding){
        //解除事件监听
        document.removeEventListener('click',el.handler);
    }
}

export default clickOut

````

使用，将需要用到该指令的元素添加 `v-clickOut`

````html
<template>
  <div v-if="isPopShow" v-click-out="clickPopOut">
    <p>
      我是内容
    </p>
  </div>
</template>

<script>
  export default {
		data(){
      return {
        isPopShow : false
      }
    },
    mounted(){
      this.isPopShow = true;
    },
    methods:{
      clickPopOut(){
        this.isPopShow = false;
      }
    }
	}
</script>
````

## 6 v-scrollPop

背景：在我们的项目中，经常使用弹窗展示活动规则，活动规则过长需要滚动时，时长会导致外部滚动。这时针对这种情况，我们可以通过全局自定义指令来处理。

需求：自定义一个指令，使得弹窗内部内容可以滚动，外部无法滚动。

思路：

1. 当弹窗展示时，记录滚动条滚动距离，然后给body和html设置固定定位，高度100%，top值为滚动距离。
2. 当弹窗解除时，恢复原先样式，并把滚动距离设置成原来的值。

```js
const scrollPop = {
    bind(el) {
        //定义此时到元素的内容垂直滚动的距离
        el.st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let cssStr = `overflow: hidden;width: 100%; height: 100%; position: fixed; top: ${- el.st}px;`
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
    },
    unbind(el,{value}) {
        let cssStr = 'overflow: auto; height: 100%; position: relative; top: 0px;scroll-behavior: auto'
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
        document.querySelector('html').style.scrollBehavior = 'auto'
        //手动设置滚动距离
        document.documentElement.scrollTop = el.st
        document.body.scrollTop = el.st
        if (value !== 'smooth')return;
        //如果传了滚动方式为smooth平稳滚动即有感滚动，当滚动完毕后，把auto改回smooth
        let timer = setTimeout(() => {
            cssStr = `overflow: auto; height: 100%; position: relative; top: 0px; scroll-behavior: ${value||'smooth'}`
            document.querySelector('html').cssText = cssStr
            document.querySelector('html').style.scrollBehavior = value || 'smooth'
            document.body.style.cssText = cssStr
        }, 1);
    }
}

export default scrollPop

```

使用：给需要限制的弹窗绑定v-scrollPop属性即可

````html
<div class="scroll-pop" v-if="isScrollPopShow" v-scroll-pop>
	<div class="content">
    text...
  </div>
</div>

````

## 7 v-loading

需求：在数据请求时，只对需要阻止用户操作的元素添加 loading 遮罩层。

思路：

1. 通过 createdElement 方法创建遮罩层，在插入和更新钩子函数中判断当前状态值，加载中就添加遮罩层，未加载中则移除遮罩层，在移除时先判断遮罩层是否挂载过。

````js
//创建蒙层，样式自行修改
function createMask() {
    const ele = document.createElement("div");
    ele.style.position = "absolute";
    ele.style.top = 0;
    ele.style.right = 0;
    ele.style.bottom = 0;
    ele.style.left = 0;
    ele.style.zIndex = 9999;
    ele.style.display = "flex";
    ele.style.justifyContent = "center";
    ele.style.alignItems = "center";
    ele.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    ele.innerHTML = "加载中...";
    return ele;
  }
  
  const mask = createMask();
  let mountedFlag = false;//开关，是否已经出现过loading
  //添加 | 删除 loading
  function checkLoading(node, isLoading) {
    if (node) {
      //展示loading
      if (isLoading) {
        node.style.position = "relative";
        node.appendChild(mask);
        mountedFlag = true;
      } else if (mountedFlag) {
        //关闭loading
        node.removeChild(mask);
        mountedFlag = false;
      }
    }
  }
  
  const loading = {
    inserted(el, { value }) {
      checkLoading(el, value);
    },
    update(el, { value }) {
      checkLoading(el, value);
    },
  };
  
  export default loading;
  
````

给需要loading遮罩的指定标签绑定即可。

````html
<template>
	<button @click="fetchData">模拟请求数据</button>
  <div class="data-box" v-loading="loading">
        {{text}}
  </div>
</template>

````

## 8 v-sensor

背景：目前前端埋点代码大量入侵业务，埋点代码量大且难以区分和维护，现做出优化方案以减少其代码量。

#### 埋点类型：

- **ElementShow：页面元素显示**
- **PopupTrack：弹窗显示**
- **$WebClick：点击页面按钮**
- **PopupBtnClick：点击弹窗中按钮**
- **自定义事件**

#### 优化方案：

#####   1.自定义指令 v-sensor=" {el :'Btn_NewActivate_Tag_Common',elClick:'Btn_NewActivate_Tag_Common'} "

​      **注册封装自定义指令的代码**

```js
const sensor = {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el,{value: sensorObj}) {
        let showObj={} ,clickObj={}//showObj代表展示类埋点，clickObj代表点击类埋点
        //如果传入参数格式不为对象，则不向下执行
        if (!Object.prototype.toString.call(sensorObj) === '[object Object]'|| JSON.stringify(sensorObj) == "{}") return
        //遍历传入对象参数，根据key值确定埋点类型
        for (const key in sensorObj) {
            if (Object.hasOwnProperty.call(sensorObj, key)) {
                switch (key) {
                    case 'el':
                        showObj= {
                            name:'ElementShow',
                            value: sensorObj[key]
                        };
                        break;
                    case 'pop':
                        showObj= {
                            name:'PopupTrack',
                            value: sensorObj[key]
                        };
                        break;
                    case 'elClick':
                        clickObj= {
                            name:'$WebClick',
                            value: sensorObj[key]
                        };
                        break;
                    case 'popClick':
                        clickObj= {
                            name:'PopupBtnClick',
                            value: sensorObj[key]
                        };
                        break;  
                    default:
                        break;
                }
            }
        }
        // 展示类埋点执行
        showObj.value && sensors.track(showObj.name, {
            FileName: showObj.value
        });
        //点击类埋点执行
        if (clickObj.value) {
            el.handler = function () {
                clickObj.name === '$WebClick' && sensors.track(clickObj.name, {
                    $element_name: clickObj.value
                });
                clickObj.name === 'PopupBtnClick' && sensors.track(clickObj.name, {
                    FileName: clickObj.value
                });
            }
            el.addEventListener('click',el.handler)
        }
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
        el.handler && el.removeEventListener('click', el.handler)
    }
}
  
  export default sensor
    
  
```



​      对于除自定义事件以外的埋点事件，较好的优化办法就是使用自定义指令。使用 v-sensor=" {el :'Btn_XXX_Tag_Common',elClick:'Btn_XXX_Tag_Common'} " 。v-sensor接收一个对象作为参数，对象的key为事件标识，对象的value为事件属性，key值具体对应关系如下。

- el：ElementShow
- pop：PopupTrack
- elClick：$WebClick
- popClick：PopupBtnClick

```js
//单独使用ElementShow或$WebClick
<div v-sensor="{el :'Btn_XXX_Tag_CXXXon'}">我是一个么得感情的标签</div>
<div v-sensor="{elClick:'Btn_XXX_Tag_Common'}">俺也一样</div>
//ElementShow和$WebClick组合使用方法
<div v-sensor="{el :'Btn_XXX_Tag_Common',elClick:'Btn_XXX_Tag_Common'}">俺也一样</div>
//单独使用PopupTrack和PopupBtnClick
<div v-sensor="{pop :'Pop_XXX_Tag_Common'}">俺也一样</div>
<div v-sensor="{popClick:'Pop_XXX_Tag_Common'}">俺也一样</div>
//PopupTrack和PopupBtnClick组合使用方法
<div v-sensor="{pop :'Pop_XXX_Tag_Common',popClick:'Pop_XXX_Tag_Common'}">俺也一样</div>
//变量使用方法
<div v-sensor="{pop :`${sensorVal}`}">俺也一样</div>
```

 

  提示：

​    由于该自定义指令是在元素插入页面DOM中时执行的，所以如果事件属性值使用变量的话，请在created生命周期内操作完毕，或给该元素绑定v-if为对应变量。



本期分享结束，谢谢大家~~~

