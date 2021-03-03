import Vue from 'vue'
import App from './App.vue'

//Plugins
import './plugins/moment';
import './plugins/vee-validate';

new Vue({
  el: '#app',
  render: h => h(App)
})
