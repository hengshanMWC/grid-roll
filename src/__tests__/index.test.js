import { mount } from '@vue/test-utils'
import classic from '@/components/demo/classic'

describe('Component', () => {
  test('is a Vue instance', () => {
    const param = 4

    const wrapper = mount(classic, {
      propsData: {
        param
      }
    })
    async function handleStart () {
      const b = await wrapper.handleStart()
      toast(b)
    }
    function toast (b) {
      if (b) {
        const id = 17
        const currentIndex = wrapper.currentIndex
        const index = wrapper.items.findIndex(item => item.id === id)
        expect(currentIndex).toBe(param)
        expect(wrapper.$refs.prizes[index].isSelect).toBe(true)
      }
    }
    handleStart()
  })
})
