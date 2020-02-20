import Vue from 'vue'
import App from './App.vue'
// Importing vuetify
import vuetify from './plugins/vuetify.js' // path to vuetify export
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
    moment,
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
