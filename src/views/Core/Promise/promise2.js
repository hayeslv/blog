/* eslint-disable */
/*
 * @Author: Lvhz
 * @Date: 2021-09-08 15:20:45
 * @Description: 异步
 */
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

// 控制台输出： "success 成功"