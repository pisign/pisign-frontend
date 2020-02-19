// libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// components
import App from '@/App.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

describe('App.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('should create widgets and add them to the layout', () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
            propsData: {}
        })

        var nodeCrypto = require('crypto');
        global.crypto = {
            getRandomValues: function(buffer) { return nodeCrypto.randomFillSync(buffer);}
        };

        wrapper.vm.addWidget();

        expect(wrapper.vm.$data.layout.length).toBe(1)
    })
})