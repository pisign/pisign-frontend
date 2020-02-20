// libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// components
import CloseButton from '@/components/CloseButton.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

describe('CloseButton.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('Checks that it removes from list', () => {
      const wrapper = mount(CloseButton, {
        localVue,
        vuetify,
        propsData: { index: 0, layout: ["test1", "test2"] }
      })
      wrapper.vm.close();
      expect(wrapper.props().layout.length).toBe(1);
    })
})