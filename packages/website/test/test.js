/*
 * @Author: Lvhz
 * @Date: 2021-11-25 09:32:29
 * @Description: Description
 */
const R = require('ramda')

const takesThreeArgs = function(a, b, c) {
  return [a, b, c];
}
takesThreeArgs.length; // 3
takesThreeArgs(1, 2, 3); // [1, 2, 3]

const takeTwoArgs = R.binary(takesThreeArgs);
console.log(takeTwoArgs.length);
console.log(takeTwoArgs(1, 2, 3));

