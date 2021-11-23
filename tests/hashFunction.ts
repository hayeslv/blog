/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
function doStuff(values : ReadonlyArray<string>) {
// function doStuff(values : readonly string[]) {
  // 我们可以读取values
  const copy = values.slice()
  // 但是我们不能修改vlaues（下面这行代码会报错）
  values.push("hello!") // !类型“readonly string[]”上不存在属性“push”。
}
