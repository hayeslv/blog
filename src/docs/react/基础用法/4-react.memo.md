# React.Memo

`React` 组件会在两种情况下发生重新渲染。

- 第一种：当组件自身的 `state` 发生变化时。
- 第二种：当组件的父组件重新渲染时。

第一种情况下的重新渲染无可厚非，`state` 都变了，组件自然应该重新渲染。但是第二种情况下并不是总那么必要。



`React.memo` 可以对组件进行缓存

```jsx
const Comp = () => {
  return (
  	<div>
    	<h2>我是一个组件</h2>
    </div>
  )
}

export default React.memo(Comp)
```



`React.memo()` 是一个高阶组件。

- 它接收另一个组件作为参数，并且会返回一个包装过的新组件
- 包装过的新组件就会具有缓存功能。
  - 包装过后，只有组件的 `props` 发生变化，才会触发组件的重新渲染，否则总是返回缓存中的结果





# useCallback

用来创建 `React` 中的回调函数

作用：`useCallback` 创建的回调函数，不会总在组建重新渲染时重新渲染

`useCallback`

- 参数1：回调函数
- 参数2：依赖数组
  - 当依赖数组中的变量发生变化时，回调函数才会重新创建
  - 如果不指定依赖数据，回调函数每次都会重新创建

```js
const App = () => {
  // 依赖数据为空，则这个回调函数只会在组件第一次渲染的时候创建，因为没有依赖数据
  const clickHandler = useCallback(() => {
    setCount(preState => preState + 1)
  }, [])
}
```







