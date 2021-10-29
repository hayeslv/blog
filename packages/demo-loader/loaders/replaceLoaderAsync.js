/*
 * @Author: Lvhz
 * @Date: 2021-10-29 10:29:54
 * @Description: Description
 */

module.exports = function (source) {
  const options = this.query
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('world', options.name);
    callback(null, result)
  }, 1000)
}

