/*
 * @Author: Lvhz
 * @Date: 2021-10-29 10:11:56
 * @Description: Description
 */

module.exports = function(source) {
  const { name } = this.query
  const result = source.replace('world', name)
  return result
}

