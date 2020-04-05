// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// components
import SystemInfoWidget from '@/components/widget_types/sysInfo.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

const factory = (vuetify,propsData) => {
  return mount(SystemInfoWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('SystemInfoWidget', () => {
    let vuetify;
    let wrapper;

    beforeEach(() => {
      vuetify = new Vuetify();
    })

    afterEach(() => {
      wrapper.destroy();
    })

    it('Handles valid sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'success', Data: {
                                                                        DiskFree: 7516192768,
                                                                        DiskTotal:11012296146,
                                                                        DiskUsed: 0,
                                                                        DiskUsedPercent: 0,
                                                                        MemTotal: 40000,
                                                                        MemUsed: 15000,
                                                                        MemUsedPercent: 50.000000
                                                                        }}});

      expect(wrapper.vm.$data.disk_free).toBe('7GB');
      expect(wrapper.vm.$data.disk_per).toBe('0%');
      expect(wrapper.vm.$data.disk_total).toBe('10.26GB');
      expect(wrapper.vm.$data.disk_used).toBe('0B');
      expect(wrapper.vm.$data.mem_left).toBe('24.41KB');
      expect(wrapper.vm.$data.mem_per).toBe('50%');
      expect(wrapper.vm.$data.mem_used).toBe('14.65KB');
    });

    it('Handles invalid sent data',() => {
      wrapper = factory(vuetify, {sentData: {}});
      expect(wrapper.vm.$data.disk_free).toBe("N/A");
      expect(wrapper.vm.$data.disk_per).toBe("N/A");
      expect(wrapper.vm.$data.disk_total).toBe("N/A");
      expect(wrapper.vm.$data.disk_used).toBe("N/A");
      expect(wrapper.vm.$data.mem_left).toBe("N/A");
      expect(wrapper.vm.$data.mem_per).toBe("N/A");
      expect(wrapper.vm.$data.mem_used).toBe("N/A");

      wrapper.setProps({sentData: {Status:'failure', Data:{}}});
      expect(wrapper.vm.$data.disk_free).toBe("N/A");
      expect(wrapper.vm.$data.disk_per).toBe("N/A");
      expect(wrapper.vm.$data.disk_total).toBe("N/A");
      expect(wrapper.vm.$data.disk_used).toBe("N/A");
      expect(wrapper.vm.$data.mem_left).toBe("N/A");
      expect(wrapper.vm.$data.mem_per).toBe("N/A");
      expect(wrapper.vm.$data.mem_used).toBe("N/A");
    });

    it('Handles changing sent data', () => {
      wrapper = factory(vuetify, { sentData: {Status: 'success', Data: {
                                                                        DiskFree: 7516192768,
                                                                        DiskTotal:11012296146,
                                                                        DiskUsed: 0,
                                                                        DiskUsedPercent: 0,
                                                                        MemTotal: 40000,
                                                                        MemUsed: 15000,
                                                                        MemUsedPercent: 50.000000
                                                                        }}});

      wrapper.setProps({ sentData: {Status: 'success', Data: {
                                                                        DiskFree: 8975811,
                                                                        DiskTotal: 10485760,
                                                                        DiskUsed: 1509949,
                                                                        DiskUsedPercent: 12.456,
                                                                        MemTotal: 50000,
                                                                        MemUsed: 20000,
                                                                        MemUsedPercent: 40.000000
                                                                      }}});
      expect(wrapper.vm.$data.disk_free).toBe('8.56MB');
      expect(wrapper.vm.$data.disk_per).toBe('12.46%');
      expect(wrapper.vm.$data.disk_total).toBe('10MB');
      expect(wrapper.vm.$data.disk_used).toBe('1.44MB');
      expect(wrapper.vm.$data.mem_left).toBe('29.3KB');
      expect(wrapper.vm.$data.mem_per).toBe('40%');
      expect(wrapper.vm.$data.mem_used).toBe('19.53KB');
    });
})