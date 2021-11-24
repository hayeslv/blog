/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
function log(target : Function, key : string, parameterIndex : number) {
  const functionLogged = key || target.prototype.constructor.name;
  console.log(`位于${functionLogged}第${parameterIndex}个参数`);
}
class Gretter {
  greeting : string;
  constructor(@log name : string, @log type : string) {
    this.greeting = name;
  }
}