/*
 * @Author: Lvhz
 * @Date: 2021-08-27 16:44:17
 * @Description: 用户的状态管理配置
 */
import { reactive } from 'vue';
import api from './api';

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

  const userAction = name => {
    console.log(name, api);
  }

  return {
    [USER_STATE]: user,
    [USER_GETTER]: userGetter,
    [USER_MUTATION]: userMutation,
    [USER_ACTION]: userAction
  };
}

export default storeModel(api);
