/*
 * @Author: Lvhz
 * @Date: 2021-11-25 09:32:29
 * @Description: Description
 */
const qs = require('qs') 
// const obj = {
//   a: 1,
//   b: 2,
//   c: 'str'
// }
const url = 'https://blog.csdn.net/qq_41956139/article/details/106569454?a=1&b=2'
console.log(qs.parse(url.split('?')[1]));