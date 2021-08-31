/*
 * @Author: Lvhz
 * @Date: 2021-08-31 09:12:55
 * @Description: Description
 */
// import router from './router'
// import { getToken } from '@/utils/auth' // get token from cookie

// const whiteList = ['/login']

// router.beforeEach(async (to, from, next) => {
  // const hasToken = getToken()
  // if(hasToken) {
  //   if (to.path === '/login') {
  //     // 如果已经登录，则跳转至首页
  //     next({ path: '/' })
  //   }
  // } else {
  //   // 没有token
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //   }
  // }
// })

