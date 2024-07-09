import PickerDay from '@/components/PickerDay.vue'
import { mount } from '@vue/test-utils'
import { en } from '@/locale'

describe('PickerDay: DOM', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(PickerDay, {
      shallow: true,
      propsData: {
        allowedToShowView: () => true,
        translation: en,
        pageDate: new Date(2018, 1, 1),
        selectedDate: new Date(2018, 2, 24)
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.findAll('.vdp-datepicker__calendar')).toHaveLength(1)
  })
})
