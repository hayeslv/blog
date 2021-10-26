/*
 * @Author: Lvhz
 * @Date: 2021-10-25 16:43:29
 * @Description: Description
 */

import { createStore } from 'redux'

(function() {
  // const { createStore } = require('redux')

  const initialState = {
    list: [],
    users: []
  }
  function reducer(state : any = initialState, action : any) {
    if(action.type === 'add') {
      state.list.push('xxx')
      
      return {...state}
    }
    return state
  }

  const store = createStore(reducer)

  // 通常不这样监听
  // const state = store.getState()
  // store.dispatch({ type: 'add' })
  // console.log(state);

  // 发布者：store
  // 接收者：UI
  const unsubscribe = store.subscribe(() => {
    const state = store.getState()

    const list = state.list
    console.log(store.getState())
  })


  store.dispatch({ type: 'add' })
  store.dispatch({ type: 'add' })
  unsubscribe() // 取消订阅
})()

