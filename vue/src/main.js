import Vue from 'vue'
import App from './App.vue'

//Plugins
Vue.use(require('vue-moment'));

//Router
import router from './router/router';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
