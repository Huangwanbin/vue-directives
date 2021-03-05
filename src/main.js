import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directives/directive'

Vue.use(Directives)

Vue.use({
  install(e) {
    // console.log('e',e,window);
  }
})

Vue.directive('dir', {
  bind: function (el, binding, vnode) {
    console.log("bind");
    // console.log(binding.value,binding.arg);
  },
  inserted:function(){
    console.log("inserted");
  },
  update:function (el, binding, vnode) {
    console.log("update");
    console.log(binding.value,binding.arg);
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
