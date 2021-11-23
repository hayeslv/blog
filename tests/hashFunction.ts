/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
class MySafe {
  private secretKey = 12345;
  protected selfKey = 222;
}
const s = new MySafe();
// console.log(s.secretKey); // 属性“secretKey”为私有属性，只能在类“MySafe”中访问。
console.log(s["secretKey"]); // OK
console.log(s["selfKey"]); // OK