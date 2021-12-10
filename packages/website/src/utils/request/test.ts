/*
 * @Author: Lvhz
 * @Date: 2021-12-10 10:46:10
 * @Description: Description
 */

// 拦截器方法
interface InterceptFuncObj {
  request ?: Function,
  requestError ?: Function,
  response ?: Function,
  responseError ?: Function
}
// 拦截器初始
interface InterceptInitObj {
  register : Function,
  clear : Function
}

export default class Fetch {
  private interceptArr : InterceptFuncObj[] = [];
  public originFetch : Function = () => {};
  public newFetch : Function = () => {};
  public interceptor : InterceptInitObj = {
    register: () => {},
    clear: () => {}
  };
  constructor(env : string, timeout : number = 5000) {
    if(env === 'browser' && !window.fetch) {
      try {
        // 对未实现fetch的浏览器 polyfill
        require('whatwg-fetch');
        this.originFetch = window.fetch;
      } catch (error) {
        throw Error('未找到fetch')
      }
    } else if(env === 'browser' && window.fetch) {
      this.originFetch = window.fetch.bind(window);
    }
    if(env === 'node') {
      try {
        this.originFetch = require('node-fetch');
      } catch (error) {
        throw Error('未找到fetch')
      }
    }

    this.newFetch = (url : string, options : object) : Promise<any> => {
      const fetchPromise : Promise<any> = this.originFetch(url, options);
      const timeoutPromise : Promise<any> = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(`Fetch 超时 ${timeout}ms`))
        }, timeout);
      })
      return Promise.race([fetchPromise, timeoutPromise])
    }

    this.interceptor = this.interceptorInit();
  }

  private interceptorInit() : InterceptInitObj {
    const that = this;
    this.newFetch = (function(fetch : Function) : Function {
      return function (...args : any[]) : Promise<any> {
        return that.packageIntercept(fetch, ...args);
      }
    })(this.newFetch)

    return {
      register : (interceptFuncObj : InterceptFuncObj) : Function => {
        this.interceptArr.push(interceptFuncObj);
        return () => { // use to unregister
          const index : number = this.interceptArr.indexOf(interceptFuncObj);
          if(index >= 0) {
            this.interceptArr.splice(index, 1);
          }
        }
      },
      clear : () : void => {
        this.interceptArr = [];
      }
    }
  }

  private packageIntercept(fetch : Function, ...args : any[]) : Promise<any> {
    let promise = Promise.resolve(args);
    this.interceptArr.forEach(({ request, requestError } : InterceptFuncObj) => {
      if(request && requestError) {
        promise = promise.then((args : any[]) => request(...args), requestError());
      } else if(request && !requestError) {
        promise = promise.then((args : any[]) => request(...args));
      } else if(!request && requestError) {
        promise = promise.then((args : any[]) => args, requestError());
      }
    })

    promise = promise.then((args : any[]) => fetch(...args));

    this.interceptArr.forEach(({ response, responseError } : InterceptFuncObj) => {
      if(response && responseError) {
        promise = promise.then((args : any[]) => response(...args), (args : any[]) => responseError(...args));
      } else if(response && !responseError) {
        promise = promise.then((args : any[]) => response(...args));
      } else if(!response && responseError) {
        promise = promise.then((args : any[]) => args, (e : any) => responseError(e))
      }
    })

    return promise;
  }
}