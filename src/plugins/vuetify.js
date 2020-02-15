// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      dark: {
       primary: "#8bc34a",
       secondary: "#795548",
       accent: "#ff5722",
       error: "#f44336",
       warning: "#ffc107",
       info: "#00bcd4",
       success: "#4caf5"
      }
    }
  }
}

export default new Vuetify(opts)