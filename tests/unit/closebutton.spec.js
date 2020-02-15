import { shallowMount } from '@vue/test-utils'
import CloseButton from '@/components/CloseButton.vue'

describe('CloseButton.vue', () => {
  it('Checks that it removes from list', () => {
    const wrapper = shallowMount(CloseButton, {
      propsData: { index: 0, layout: ["test1", "test2"] }
    })
    wrapper.vm.close();
    expect(wrapper.props().layout.length).toBe(1);
  })
})