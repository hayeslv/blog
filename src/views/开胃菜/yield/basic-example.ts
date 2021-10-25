/*
 * @Author: Lvhz
 * @Date: 2021-10-25 10:40:41
 * @Description: yield 主动交出执行权
 */

(function() {
  function *gen() {
    console.log('===start===');
    yield 1
    console.log('before 2');
    yield 2
    console.log('before 3');
    yield 3
    console.log('before 4');
    yield 4
  }
  
  const it = gen()
  console.log(it);
  it.next()
})()


