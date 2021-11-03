/*
 * @Author: Lvhz
 * @Date: 2021-11-03 08:57:45
 * @Description: Promise：代表一个未来的值，或者代表一个未来计算的值
 */

enum States {
  PENDING,
  FULLFILLED,
  REJECTED
}

type Resolver<T> = (val : T) => void
type Rejector = (ex : any) => void
type Executor<T> = (resolve : Resolver<T>, reject : Rejector) => void
type Fullfiller<T, R> = (val : T) => R
// type PendingWork<T> = (val : T) => void

class MyPromise<T> {
  value!: T
  state : States = States.PENDING
  pendingWorks : Array<Resolver<any>> = []

  // if-else：控制流程
  // switch-case：模式匹配
  private resolve = (val : T) => {
    if(this.state === States.PENDING) {
      this.value = val
      this.state = States.FULLFILLED
    }
    this.pendingWorks.forEach(work => work(this.value))
  }

  private reject = () => {
    this.state = States.REJECTED
  }

  constructor(executor : Executor<T>) {
    executor(this.resolve, this.reject)
  }

  public then<R>(fullfiller : Fullfiller<T, R>) : MyPromise<R> {
    return new MyPromise<R>((resolve, reject) => {
      switch(this.state) {
        case States.PENDING: {
          const pendingWork = (val : T) => resolve(fullfiller(val))
          this.pendingWorks.push(pendingWork)
          break
        }
        case States.FULLFILLED: {
          resolve(fullfiller(this.value))
          break
        }
      }
    })
  }
}

new MyPromise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  })
}).then(data => {
  return data + "-111"
}).then(data => {
  console.log(data);
})


