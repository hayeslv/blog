/*
 * @Author: Lvhz
 * @Date: 2021-09-23 16:27:35
 * @Description: Description
 */
import { ButtonType, ButtonSize, ButtonNativeType } from './types'
import { PropType } from 'vue'
export const props = {
  size: {
    type: String as PropType<ButtonSize>,
    validator(val: string): boolean {
      return ['large', 'medium', 'small', 'mini', ''].includes(val)
    }
  }
}
