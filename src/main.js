import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directives/directive'
import sensors from './library/sensor'

Vue.use(sensors)
Vue.use(Directives)

// Vue.use({
//   install(Vue) {
//     console.log('Vue:',Vue,'this:',this);
//   }
// })

Vue.directive('dir', {
  bind: function (el, binding, vnode) {
    console.log("bind");
  },
  inserted:function(){
    console.log("inserted");
  },
  update:function (el, binding, vnode) {
    console.log("update");
  },
  conponentUpdated:function(){
    console.log("conponentUpadte");
  },
  unbind:function(){
    console.log("unbind");
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
