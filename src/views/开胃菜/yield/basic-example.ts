/*
 * @Author: Lvhz
 * @Date: 2021-10-25 10:40:41
 * @Description: yield 主动交出执行权
 */

(function() {
  function *gen() : Generator<number, void, number> {
    console.log('===start===');
    const x = yield 1
    console.log('before 2', x);
    yield 2
    console.log('before 3');
    yield 3
    console.log('before 4');
    yield 4
  }
  
  const it = gen()
  // console.log(it);
  it.next()
  it.next(9)
  // console.log([...it]);


  function get(url : string) {
    return Promise.resolve('hello')
  }

  function *gen1() : Generator<string, void, string> {
    const response = yield 'http://......api'
    console.log(response);
  }
  const it1 = gen1()
  const { value } = it1.next()
  // promise异步
  const promise = get(value as string)
    .then(response => {
      it1.next(response)
    })
})()


