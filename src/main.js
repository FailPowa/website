import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  created () {
    AOS.init({
      duration: 1000,
      delay: 100,
      easing: 'ease',
    });
  },
  render: h => h(App)
}).$mount('#app')
