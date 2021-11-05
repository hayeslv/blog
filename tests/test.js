/*
 * @Author: Lvhz
 * @Date: 2021-11-04 14:35:41
 * @Description: Description
 */
var arr = [1,2,3,4,5,6]

function add(arr) {
  if(arr.length === 0) return 0
  if(arr.length === 1) return arr[0]
  
  var a = arr.pop()
  var b = arr.pop()
  arr.push(a + b)

  return add(arr)   
}

console.log(add(arr));