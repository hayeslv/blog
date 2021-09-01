/*
 * @Author: Lvhz
 * @Date: 2021-08-31 09:12:55
 * @Description: Description
 */
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login']

// vue-router4.0中将next取消了，可写可不写，return false取消导航，undefined或者是return true验证导航通过
router.beforeEach(async (to) => {
  const hasToken = getToken()
  if(hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，则跳转至首页
      router.replace({path: `/home`})
      return true
    } else {
      const accessRoutes = await store.dispatch('permission/generateRoutes')
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })
      return true
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(123);
      return true
    } else {
      console.log(222);
      router.replace({path: `/login`})
      return false
      // next(`/login?redirect=${to.path}`)
    }
  }
})

