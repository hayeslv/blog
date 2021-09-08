/* eslint-disable */
/*
 * @Author: Lvhz
 * @Date: 2021-09-08 15:20:45
 * @Description: 链式调用 + 值穿透
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

//! x可能是一个proimise
const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉promise  Promise/A+ 2.3.1
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 只能调用一次
  let called;
  // 后续的条件要严格判断，保证代码能和别的库一起使用
  if((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）
      let then = x.then
      if(typeof then === 'function') {
        // 不要写成 x.then，直接写成 then.call 就可以了。因为 x.then 会再次取值，Object.defineProperty
        then.call(x, y => { // 根据promise的状态决定是成功还是失败
          if(called) return;
          called = true;
          // 递归解析的过程（因为可能promise中还有promise）
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          // 只要失败就失败
          if(called) return;
          called = true;
          reject(r);
        });
      } else {
        // 如果x.then是个普通值就直接返回 resolve 作为结构
        resolve(x);
      }
    } catch (e) {
      if(called) return;
      called = true;
      reject(e)
    }
  } else {
    // 如果 x 是个普通值就直接返回resolve作为结果
    resolve(x)
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 解决 onFulfilled，onRejected 没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    // 因为错误的值要让后面访问到，所以这里也要抛出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    // 每次调用then都返回一个新的promise
    let promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        // Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // x可能是一个promise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if(this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2;

    // if(this.status === FULFILLED) {
    //   onFulfilled(this.value)
    // }
    // if(this.status === REJECTED) {
    //   onRejected(this.reason)
    // }
    // if(this.status === PENDING) {
    //   this.onResolvedCallbacks.push(() => {
    //     onFulfilled(this.value)
    //   })
    //   this.onRejectedCallbacks.push(() => {
    //     onRejected(this.reason)
    //   })
    // }
  }
}

MyPromise.deferred  = function() {
  const defer = {}
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

module.exports = MyPromise

// 测试代码
// const promise = new MyPromise((resolve, reject) => {
//   reject('失败');
// }).then().then().then(data => {
//   console.log(data);
// }, err => {
//   console.log('err', err);
// })