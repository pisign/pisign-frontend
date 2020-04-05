// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

// components
import ClockWidget from '@/components/widget_types/clock.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

let localVue = createLocalVue();
localVue.use(VueMoment, {
    moment,
})

const factory = (vuetify,propsData) => {
  return mount(ClockWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('clockWidget', () => {
    let vuetify;
    let wrapper;
    beforeEach(() => {
      vuetify = new Vuetify();
    })

    afterEach(() => {
      wrapper.destroy();
    })

    it('Setting initial data', () => {
      wrapper = factory(vuetify, {
                                    sentData: {
                                      Status: 'success',
                                      Data: {
                                              Location:"America/Chicago",
                                              Time: 1586120363
                                            }
                                      },
                                    api: {
                                      Location:"America/Chicago"
                                    }
      });

      expect(wrapper.vm.$data.timestamp).toBe(1586120363);
      expect(wrapper.vm.$data.timeZone).toBe("America/Chicago");
      expect(wrapper.find("#timeDisplay").text()).toBe('3:59:23 pm');
      expect(wrapper.find("#dateDisplay").text()).toBe('April 5 2020');
      expect(wrapper.find("#cityDisplay").text()).toBe('Chicago');
    });

    it('Changing timezone', () => {
      wrapper = factory(vuetify, {
                                    sentData: {
                                      Status: 'success',
                                      Data: {
                                              Location:"America/Chicago",
                                              Time: 1486120363
                                            }
                                      },
                                    api: {
                                      Location:"America/Chicago"
                                    }
      });
      wrapper.setProps({api: { Location:"America/Los_Angeles"}})
      expect(wrapper.vm.$data.timeZone).toBe("America/Los_Angeles");
      expect(wrapper.find("#cityDisplay").text()).toBe('Los Angeles');
      expect(wrapper.find("#timeDisplay").text()).toBe('3:12:43 am');
      expect(wrapper.find("#dateDisplay").text()).toBe('February 3 2017');
    });

    it('Passing bad data', () => {
      wrapper = factory(vuetify, {
                                    sentData: {
                                      Status: 'failure',
                                      Data: {
                                              Location:"America/Chicago",
                                              Time: ''
                                            }
                                      },
                                    api: {
                                      Location:"America/Chicago"
                                    }
      });
      expect(wrapper.vm.$data.timeZone).toBe("America/Chicago");
      expect(wrapper.vm.$data.timestamp).toBe("");
      expect(wrapper.find("#cityDisplay").text()).toBe('Chicago');
      expect(wrapper.contains("#timeDisplay")).toBe(false);
      expect(wrapper.contains("#dateDisplay")).toBe(false);
      expect(wrapper.contains("#errorDisplay")).toBe(true);
    });
})