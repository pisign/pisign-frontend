// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// components
import TextWidget from '@/components/widget_types/text.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

const factory = (vuetify,propsData) => {
  return mount(TextWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('textWidget', () => {
    let vuetify;
    let wrapper;

    beforeEach(() => {
      vuetify = new Vuetify();
    })

    afterEach(() => {
      wrapper.destroy();
    })

    it('Handles changing to valid sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'failure', Data: {Text:'Nothing', Title: 'Nothing'}}});

      expect(wrapper.vm.$data.title).toBe('');
      expect(wrapper.find("#titleDisplay").text()).toBe('');
      expect(wrapper.find("#textDisplay").text()).toBe('ERROR in parsing');

      wrapper.setProps({ sentData: {Status: 'success', Data: {Text:'Text is working', Title: 'Title is working'}}})
      expect(wrapper.vm.$data.title).toBe('Title is working');
      expect(wrapper.vm.$data.text).toBe('Text is working');
      expect(wrapper.find("#titleDisplay").text()).toBe('Title is working');
      expect(wrapper.find("#textDisplay").text()).toBe('Text is working');
    });

    it('Handles bad sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'error', msg: 'bad API'}});

      expect(wrapper.vm.$data.title).toBe('');
      expect(wrapper.vm.$data.text).toBe('ERROR: bad API');
      wrapper.setProps({sentData: {}})
      expect(wrapper.vm.$data.title).toBe('');
      expect(wrapper.vm.$data.text).toBe('ERROR in parsing');
    });
})