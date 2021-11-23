/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
let x! : number;
initialize();

console.log(2 * x); // Error

function initialize() {
  x = 10;
}