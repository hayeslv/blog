/*
 * @Author: Lvhz
 * @Date: 2021-11-11 08:51:24
 * @Description: Description
 */
(() => {
  function foo() {
    // @ts-ignore
    console.log(this);
  }

  // @ts-ignore
  Function.prototype._call = function(thisArg : any, args : Array<any>) {
    const symbol = Symbol("xxx")
    thisArg[symbol] = this
    const result = thisArg[symbol](...args)
    delete thisArg[symbol]
    return result
  }

  const obj = {x : 1}
  // @ts-ignore
  foo._call(obj)
  // @ts-ignore
  console.log('final', obj[Symbol('xxx')]);




  // !test1
  // const obj = {
  //   f : () => {
  //     // @ts-ignore
  //     console.log('f:', this);
  //   },
  //   g : function() {
  //     console.log('g:', this);
  //   }
  // }

  // obj.f()
  // obj.g()
})()