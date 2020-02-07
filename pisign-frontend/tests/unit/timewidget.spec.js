import { shallowMount } from '@vue/test-utils'
import TimeWidget from '@/components/TimeWidget.vue'

describe('TimeWidget.vue', () => {
  it('returns a time and date', () => {
    const wrapper = shallowMount(TimeWidget);
    expect(wrapper.vm.$data.time).not.toEqual("");
    expect(wrapper.vm.$data.date).not.toEqual("");
  })
})
