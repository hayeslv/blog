/* eslint-disable */
/*
 * @Author: Lvhz
 * @Date: 2021-09-08 14:15:25
 * @Description: 基础promise（同步）
 */
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
  // 执行异步操作就没有返回值了
  // setTimeout(() => {
  //   resolve('成功');
  // }, 1000)
}).then(data => {
  console.log('success', data);
}, err => {
  console.log('failed', err);
})

// 控制台输出： "success 成功"