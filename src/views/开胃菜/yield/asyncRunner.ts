/*
 * @Author: Lvhz
 * @Date: 2021-10-25 16:24:36
 * @Description: Description
 */

// asyncFunction(function *(){
//   const orderID = yield * getOrderID('...')
//   const product = yield * getProductByOrderID(orderID)

// })


export function isIterator(obj : any) : obj is Iterator<any> {
  if(obj === null){
    return false
  }

  return typeof obj[Symbol.iterator] === 'function'
}

async function resolvePromise(promise : Promise<any>) {
  // eslint-disable-next-line no-useless-catch
  try {
    while(promise instanceof Promise) {
      promise = await promise
    }
    return promise
  } catch (ex) {
    throw ex
  }
  
}

// 将上一步的返回传给下一个函数
// const id = yield * getUserId()
// const order = yield getOrders(id)

function runIterator(it : Iterator<any, any, any>, val : any = null) {
  const p = it.next(val)
  if(!p.done) {
    resolvePromise(p.value)
      .then(res => {
        runIterator(it, res)
      })
      .catch(err => {
        throw err
      })
    // runIterator(it, p.value)
  }
}

export function asyncFunction(fn : () => Generator<any, any, any>) {
  const it = fn()

  if(isIterator(it)) {
    runIterator(it)
  }
}

function error() {
  throw new Error('this is an error.')
}


function *t() {
  yield 1
  yield 2
  yield 3
  yield 4
}

asyncFunction(function * () {
  try {
    const x = yield 1
    const y = x + (yield 2)
    const z = y + (yield Promise.resolve(3))
    const w = z + (yield * t())
    console.log(w);
    // yield error()
  } catch (error) {
    console.log(error);
  }
  // console.log(z);
})



