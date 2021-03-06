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
    console.log("bind",el.parentNode);
  },
  inserted:function(el){
    console.log("inserted",el.parentNode);
  },
  update:function (el, binding, vnode) {
    // console.log("update");
  },
  componentUpdated:function(){
    // console.log("componentUpdated");
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
