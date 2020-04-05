// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// components
import WeatherWidget from '@/components/widget_types/weather.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

const factory = (vuetify,propsData) => {
  return mount(WeatherWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('weatherWidget', () => {
    let vuetify;
    let wrapper;

    beforeEach(() => {
      vuetify = new Vuetify();
    })

    afterEach(() => {
      wrapper.destroy();
    })

    it('Handles valid sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'success', Data: {Main: {Temp: 20.23, TempMax: 22.7, TempMin: 17}}}});

      expect(wrapper.vm.$data.temp).toBe('20°F');
      expect(wrapper.vm.$data.temp_min).toBe('17°F');
      expect(wrapper.vm.$data.temp_max).toBe('23°F');
    });

    it('Handles invalid sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'failure', Data: {}}});

      expect(wrapper.vm.$data.temp).toBe('N/A');
      expect(wrapper.vm.$data.temp_min).toBe('N/A');
      expect(wrapper.vm.$data.temp_max).toBe('');
    });

    it('Handles changing sent data', () =>{
      wrapper = factory(vuetify, { sentData: {Status: 'success', Data: {Main: {Temp: 20.23, TempMax: 22.7, TempMin: 17}}}});
      wrapper.setProps({ sentData: {Status: 'success', Data: {Main: {Temp: 50.23, TempMax: 72.7, TempMin: 27}}}})
      expect(wrapper.vm.$data.temp).toBe('50°F');
      expect(wrapper.vm.$data.temp_min).toBe('27°F');
      expect(wrapper.vm.$data.temp_max).toBe('73°F');
    })
})