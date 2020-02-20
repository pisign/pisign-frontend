import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export const mountFn = (comp, options) => {
    return mount(comp, {
        localVue,
        vuetify,
        ...options,
    })
}