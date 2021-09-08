## Promise常见问题

1. Promise解决了什么问题？
2. Promise的业界实现都有哪些？
3. Promise常用的API有哪些？
4. 能不能手写一个符合Promise/A+规范的Promise？
5. Promise在事件循环中的执行过程是怎样的？
6. Promise有什么缺陷，可以如何解决？



这几个问题由浅入深，我们一个一个来看：



## Promise出现的原因 & 业界实现

在Promise出现以前，我们处理多个异步请求嵌套时，代码往往是这样的

```js
let fs = require('fs')

fs.readFile('./name.txt','utf8',function(err,data){
  fs.readFile(data, 'utf8',function(err,data){
    fs.readFile(data,'utf8',function(err,data){
      console.log(data);
    })
  })
})
```

​		为了拿到回调的结果，我们必须一层层的嵌套，可以说是相当恶心了。而且基本上我们还要对每次请求的结果进行一系列的处理，使得代码变得更加难以阅读和难以维护，这就是传说中臭名昭著的**回调地狱**。产生**回调地狱**的原因归结起来有两点：

1. **嵌套调用**，第一个函数的输出往往是第二个函数的输入；
2. **处理多个异步请求并发**，开发时往往需要同步请求最终的结果。

> 原因分析出来后，那么问题的解决思路就很清晰了

1. **消灭嵌套调用**：通过Promise的链式调用可以解决；
2. **合并多个任务的请求结果**：使用Promise.all获取合并多个任务的错误处理。



**Promise为我们解决了什么问题？**

​		在传统的异步编程中，如果异步之间存在依赖关系，就需要通过层层回调的方式满足这种依赖，如果嵌套层数过多，可读性和可维护性都会变差，产生所谓的“回调地狱”，而Promise将嵌套调用改为链式调用，增加了可阅读行和可维护性。也就是说，Promise解决的是异步编码风格的问题。

​		业界比较著名的实现Promise的类库有：bluebird、Q、ES6-Promise



## 手写Promise

### Promise/A+

我们想要手写一个Promise，就要遵循 [Promise/A+](https://promisesaplus.com/) 规范，业界所有Promise的类库都遵循这个规范。



### 基础版

先看看最简单的Promise使用方式：

```js
const p1 = new Promise((resolve, reject) => {
  console.log('create a promise');
  resolve('成功了');
})

console.log("after new promise");

const p2 = p1.then(data => {
  console.log(data)
  throw new Error('失败了')
})

const p3 = p2.then(data => {
  console.log('success', data)
}, err => {
  console.log('faild', err)
})
```

控制台输出：

```js
"create a promise"
"after new promise"
"成功了"
"faild Error: 失败了"
```

- 首先我们在调用Promise时，会返回一个Promise对象
- 构建Promise对象时，需要传入一个 **executor** 函数，Promise的主要业务流程都在 executor 函数中执行。
- 如果运行在 executor 函数中的业务执行成功了，会调用 resolve 函数；如果执行失败了，则调用 reject 函数。
- Promise 的状态不可逆，同时调用 resolve 函数和 reject 函数，默认会采取第一次调用的结果

以上简单介绍了Promise的一些主要使用方法，结合 [Promise/A+](https://promisesaplus.com/) 规范，我们可以分析出Promise的基本特征：

1. promise有三个状态：`pending`，`fulfilled`，`rejected`  ；「规范 Promise/A+ 2.1」
2. `new Promise` 时，需要传递一个 `executor()`执行器，执行器立即执行
3. `executor`接受两个参数，分别是 `resolve` 和 `reject`
4. promise的默认状态是 `pending`
5. promise有一个 `value` 保存成功状态的值，可以是 `undefined/thenable/promise`  ； 「规范 Promise/A+ 1.3」
6. promise有一个`reason` 保存失败状态的值  ；  「规范 Promise/A+ 1.5」
7. promise只能从 `pending` 到 `rejected`，或者从 `pending`到`fulfilled`，状态一旦确认，就不会再改变
8. promise必须有一个`then`方法，then接收两个参数，分别是promise成功的回调 onFulfilled，和promise失败的回调 onRejected  ；  「规范 Promise/A+ 2.2」
9. 如果调用then时，promise已经成功，则执行 `onFulfilled` ，参数是 promise 的value
10. 如果调用then时，promise已经失败，则执行 `onRejected` ，参数是promise 的reason
11. 如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调 `onRejected`



按照上面的特征，我们试着勾勒下 Promise 的形状：

```js
//  ./promise1.js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(executor) {
    // 默认状态为：PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = undefined;
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined;

    // 调用此方法就是成功
    let resolve = value => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    }

    // 调用此方法就是失败
    let reject = reason => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }
  // 包含一个then方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if(this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if(this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

// 测试代码
const promise = new myPromise((resolve, reject) => {
  resolve('成功');
}).then(data => {
  console.log('success', data);
}, err => {
  console.log('failed', err);
})

// 控制台输出： "success 成功"
```



现在我们已经实现了一个基础版的Promise，但是这里我们只处理了同步操作的promise。如果在 `executor()` 中传入一个异步操作的话呢，我们试一下：

```js
const promise = new myPromise((resolve, reject) => {
  // resolve('成功');
  setTimeout(() => {
    resolve('成功');
  }, 1000)
}).then(data => {
  console.log('success', data);
}, err => {
  console.log('failed', err);
})
```

执行测试脚本后发现，promise没有任何返回。

​		因为promise调用then方法时，当前的promise并没有成功，一直处于pending状态。所以如果当调用then方法时，当前状态是pending，我们需要先将成功和失败的回调分别存放起来，在 `executor()` 的异步任务被执行时，触发resolve或reject，依次调用成功或失败的回调。

结合这个思路，我们优化一下代码：

```js
//  ./promise2.js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    //! 存放成功的回调
    this.onResolvedCallbacks = [];
    //! 存放失败的回调
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        //! 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        //! 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // 包含一个then方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if(this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if(this.status === REJECTED) {
      onRejected(this.reason)
    }
    //! PENDING状态
    if(this.status === PENDING) {
      //! 如果promise的状态是pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

// 测试代码
const promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000)
}).then(data => {
  console.log('success', data);
}, err => {
  console.log('failed', err);
})
```

控制台等待1s后输出： "success 成功"

大功告成，异步问题以及解决了！

这里其实是一个**发布订阅模式**，这种 `依赖收集 -> 触发通知 -> 取出依赖执行` 的方式，被广泛运用于发布订阅模式的实现。



### then 的链式调用 & 值穿透的特性

​		我们都知道，promise的优势在于可以链式调用。在外面使用Promise的时候，当then函数中return了一个值，不管是什么值，我们都能在下一个then中获取到，这就是所谓的**then的链式调用**。而且，当我们不在then中放入参数，例：`promise.then().then()`，那么其后面的then依旧可以得到之前then返回的值，这就是所谓的**值的穿透**。

​		那具体如何实现呢？简单思考一下，如果每次调用then的时候，我们都重新创建一个promise对象，并把上一个then的返回结果传给这个新的promise的then方法，不就可以一直then下去了么？那我们来试着实现以下。这也是手写Promise源码的重中之重。

有了上面的想法，我们再结合 Promise/A+ 规范梳理一下思路：

1. then的参数 `onFulfilled` 和 `onRejected` 可以缺省，如果 `onFulfilled` 或者 `onRejected` 不是函数，将其忽略，且依旧可以在下面的then中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
2. promise可以then多次，每次执行完 promise.then 方法后返回的都是一个 “新的promise”；「规范 Promise/A+ 2.2.7」
3. 如果then的返回值x是一个普通值，那么就会把这个结果作为参数，传递给下一个then的成功回调中。
4. 如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败回调中。「规范 Promise/A+ 2.2.7.2」
5. 如果then的返回值x是一个promise，那么会等这个promise执行完，promise如果成功，就会走下一个then的成功；如果失败，就会走下一个then的失败；如果抛出异常，就走下一个then的失败。「规范 Promise/A+ 2.2.7.3、2.2.7.4」
6. 如果then的返回值x和promise是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个then的失败回调中。「规范 Promise/A+ 2.3.1」
7. 如果then的返回值x是一个promise，且x同时调用resolve函数和reject函数，则第一次调用优先，其他所有调用被忽略。「规范 Promise/A+ 2.3.3.3.3」



我们将代码补充完整：

```js
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

class myPromise {
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
    let promise2 = new myPromise((resolve, reject) => {
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

// 测试代码
const promise = new myPromise((resolve, reject) => {
  reject('失败');
}).then().then().then(data => {
  console.log(data);
}, err => {
  console.log('err', err);
})
```

控制台输出：err 失败

至此，我们已经完成了promise最关键的部分：then的链式调用和值的穿透。搞清楚了then的链式调用和值的穿透，你也就搞清楚了Promise。



### 测试Promise是否符合规范

Promise/A+规范提供了一个专门的测试脚本，可以测试所编写的代码是否符合Promise/A+的规范。

首先，在 promise 实现的代码中，增加以下代码:

```js
MyPromise.deferred  = function() {
  const defer = {}
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

module.exports = MyPromise
```

安装测试脚本：

```bash
npm install -g promises-aplus-tests
```

如果当前的 promise 源码的文件名为 promise3.js

那么在对应的目录执行以下命令:

```js
promises-aplus-tests promise3.js
```

promises-aplus-tests 中共有 872 条测试用例。以上代码，可以完美通过所有用例。



### setTimeout问题

​	由于原生的Promise是V8引擎提供的微任务，我们无法还原V8引擎的实现，所以这里使用setTimeout模拟异步。所以原生的是微任务，这里是宏任务。

Promise A+ 规范3.1中也提到了：这可以通过 ”宏任务“ 机制（例如setTimeout或setImmediate）或 ”微任务“ 机制（例如 MutationObserver）来实现process.nextTick。



## Promise的API

虽然上述的promise源码已经符合 Promise/A+ 的规范，但是原生的 Promise 还提供了一些其他方法，如：

- Promise.resolve()
- Promise.reject()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()

下面具体说一下每个方法的实现：

### Promise.resolve

默认产生一个成功的promise

```ts
static resolve(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}
```

这里需要注意的是，**promise.resolve 是具备等待功能的**。如果参数是 promise 则会等待这个 Promise 解析完毕，再向下执行，所以这里需要在resolve方法中做一个小小的处理：

```js
let resolve = value => {
  // ====== 新增逻辑 ======
  // 如果 value 是一个promise，那我们的库中应该也要实现一个递归解析
  if(value instanceof Promise) {
    // 递归解析
    return value.then(resolve, reject)
  }
  // ====================
  if(this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;
    this.onResolvedCallbacks.forEach(fn => fn())
  }
}
```

测试一下：

```js
Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
  }, 3000);
})).then(data=>{
  console.log(data,'success')
}).catch(err=>{
  console.log(err,'error')
})
```

控制台等待 `3s` 后输出：

```js
"ok success"
```



### Promise.reject

默认产生一个失败的promise，Promise.reject 是直接将值变成错误结果。

```js
static reject(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}
```



### Promise.prototype.catch

Promise.prototype.catch 用来捕获 promise 的异常，**就相当于一个没有成功的then**。

```js
Promise.prototype.catch = function(errCallback) {
  return this.then(null, errCallback)
}
```



### Promise.prototype.finally

finally 表示不是最终的意思，而是无论如何都会执行的意思。如果返回一个promise会等待这个promise也执行完毕。如果返回的是成功的promise，会采用上一次的结果；如果返回的是失败的promise，会用这个失败的结果，传到 catch 中。











































