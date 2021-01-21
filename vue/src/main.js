import Vue from 'vue'
import App from './App.vue'


//Router
import router from './router/router';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
