/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
function createArray<T = string>(length : number, value : T) : Array<T> {
  const result : T[] = [];
  for(let i=0; i<length; i++) {
    result[i] = value
  }
  return result
}