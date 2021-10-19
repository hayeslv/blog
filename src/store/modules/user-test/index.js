/*
 * @Author: Lvhz
 * @Date: 2021-08-27 16:44:17
 * @Description: 使用provide替代vuex。用户的状态管理配置
 */
//使用
// import { USER_STATE, USER_ACTION } from '@/store/modules/user';
// const user = inject(USER_STATE);
// const userGetter = inject(USER_GETTER);
// const userMutation = inject(USER_MUTATION);
// const userAction = inject(USER_ACTION);

// userAction('login', loginForm).then(() => {
//   loading.value = false
//   router.push({ path: redirect || '/', query: otherQuery })
// }).catch(() => {
//   loading.value = false
// })


import { reactive, toRaw } from 'vue';
import { UserApi } from '@api';

const namespace = 'user';
const r = ac => `store/${namespace}/${ac}`;

export const USER_STATE = r('USER_STATE');
export const USER_GETTER = r('USER_GETTER');
export const USER_MUTATION = r('USER_MUTATION');
export const USER_ACTION = r('USER_ACTION');

const state = {
  name: '',
  age: '',
  address: '',
  phone: ''
}

const storeModel = api => {
  const user = reactive(state);

  const userGetter = () => {
    const newUser = {
      name: 'zhang_san',
      age: 18,
      address: '成都市',
      phone: '18888888888'
    };
    for(const key in user) {
      user[key] = newUser[key] || null
    }
  };

  const userMutation = obj => {
    for(const key in user) {
      user[key] = obj[key] || null
    }
  };

  const userAction = (type, userForm) => {
    const { username, password } = toRaw(userForm)
    return new Promise((resolve, reject) => {
      if(!api[type]) return reject('api中不存在此方法')
      if(username === 'admin' && password === '123456') {
        userMutation({
          name: '超级管理员',
          age: 30,
          address: '广东',
          phone: '13333333333'
        })
        return resolve(true)
      }
      api.login({ username, password })
        .then(res => {
          resolve(res)
        })
        .error(err => {
          reject(err)
        })
    })
  }

  return {
    [USER_STATE]: user,
    [USER_GETTER]: userGetter,
    [USER_MUTATION]: userMutation,
    [USER_ACTION]: userAction
  };
}

export default storeModel(UserApi);
