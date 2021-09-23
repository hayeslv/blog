/*
 * @Author: Lvhz
 * @Date: 2021-09-23 16:22:11
 * @Description: Description
 */
import ElButton from './src/Button.vue'

ElButton.install = function(app) {
  app.component(ElButton.name, ElButton)
}

export { ElButton }