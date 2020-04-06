// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// components
import SlideshowWidget from '@/components/widget_types/slideshow.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

const factory = (vuetify,propsData) => {
  return mount(SlideshowWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('slideshowWidget', () => {
    let vuetify;
    let wrapper;
    let api;
    let sentData;
    let height;
    let width;
    let edit;

    beforeEach(() => {
      vuetify = new Vuetify();
      api = {
        IncludedTags: ['test'],
        Speed: 10,
        UniqueTags: [
          'test',
          'vue',
          'git'
        ]
      };
      sentData = {
        Status: "success",
        Data: {
          FileImages: [
            '/assets/images/1233',
            '/assets/images/1234',
            '/assets/images/1235',
            '/assets/images/1236',
            '/assets/images/1237'
          ], IncludedTags: [
            'test'
          ], Speed: 10,
          UniqueTags: [
            'test',
            'vue',
            'git'
          ]
        }
      };
      edit = true;
      height = 500;
      width = 500;
    });

    afterEach(() => {
      wrapper.destroy();
    });

    jest.useFakeTimers();

    it('Changes interval timing', () => {
      wrapper = factory(vuetify, { sentData: sentData, api: api, height: height, edit: edit, width:width});

      let interval = wrapper.vm.$data.interval;
      wrapper.setProps({api: {
        IncludedTags: ['test'],
        Speed: 5,
        UniqueTags: [
          'test',
          'vue',
          'git'
        ]
      }});
      expect(wrapper.vm.$data.interval).not.toBe(interval);
      let photoNum = wrapper.vm.$data.photoNum;
      jest.advanceTimersByTime(5000);
      expect(wrapper.vm.$data.photoNum).not.toBe(photoNum)
    });

    it('Changing from edit mode to display mode increases image size', () => {
      wrapper = factory(vuetify, { sentData: sentData, api: api, height: 500, edit: edit, width:width});

      wrapper.setProps({edit: true});
      expect(wrapper.vm.$data.dataHeight).toBeLessThan(500);
      let height = wrapper.vm.$data.dataHeight;
      wrapper.setProps({edit: false});
      expect(wrapper.vm.$data.dataHeight).toBe(500);
    });

    it('Checks rotating images', () => {
      wrapper = factory(vuetify, { sentData: sentData, api: api, height: height, edit: edit, width:width});

      expect(wrapper.vm.$data.interval).toBeTruthy();
      expect(wrapper.vm.$data.photos.length).toEqual(5);
      expect(wrapper.vm.$data.photoNum).toEqual(0);
      let photo = wrapper.vm.$data.image;

      // Next image
      jest.advanceTimersByTime(10000);
      expect(wrapper.vm.$data.photoNum).toEqual(1);
      expect(wrapper.vm.$data.image).not.toBe(photo);
      //Goes back to the first image after we hit the end of the array
      jest.advanceTimersByTime(40000);
      expect(wrapper.vm.$data.photoNum).toEqual(0);
      expect(wrapper.vm.$data.image).not.toBe(photo);
    });

    it('Error Handling', () => {
      sentData.Data.FileImages = [];
      wrapper = factory(vuetify, { sentData: sentData, api: api, height: height, edit: edit, width:width});
      expect(wrapper.contains("#errorDisplay")).toBe(true);
    })
})