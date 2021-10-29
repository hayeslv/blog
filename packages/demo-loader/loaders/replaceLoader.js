/*
 * @Author: Lvhz
 * @Date: 2021-10-29 10:11:56
 * @Description: Description
 */

// 版本1
// module.exports = function(source) {
//   const { name } = this.query
//   const result = source.replace('world', name)
//   return result
// }

// 版本2
module.exports = function(source) {
  // const { name } = this.query
  const result = source.replace('dylan', 'dddddd')
  // return result
  this.callback(null, result)
}
