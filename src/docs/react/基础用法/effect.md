# Effect

​		`React` 组件可以将部分逻辑直接编写到组件的函数体中，像是对数据调用的 `filter、map`等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中的。

​		例如，如果直接将修改 `state` 的逻辑编写到了组件中，就会导致组件不断的循环渲染，直接调用次数过多导致内存溢出。



## 示例

```jsx
// index.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>
);
```

```jsx
// App1.js
import React, { useState } from 'react'

export default function App1() {
  const [count, setCount] = useState(0)
  setCount(0)

  return (
    <div>App1</div>
  )
}
```

此时控制台就会报错：`Error: Too many re-renders.`

当我们之间在函数体中调用 `setState`时，就会触发上述错误



## `setState` 的执行流程

函数组件中：

当我们调用 `setCount()` 的时候，内部调用的是 `dispatchSetData()` 这个方法，它会先去判断组件当前属于什么状态

- 渲染阶段
  - 不会检查 `state` 值是否相同
- 非渲染阶段
  - 会检查 `state` 值是否相同。如果值不同则重新渲染，值相同则不会重新渲染。
  - 如果值相同，`React` 在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发其子组件的渲染，同时这次渲染不会产生实际的效果



## 使用

`useEffect` 是一个钩子函数，需要一个函数作为参数，这个作为参数的函数，将会在组件渲染完毕后执行。

```jsx
export default function App1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(1)
  })

  return (
    <div>{count}</div>
  )
}
```

在开发中，可以将那些会产生副作用的代码编写到 `useEffect` 的回调函数中。这样就可以避免这些代码影响到组件的渲染。



## 第二个参数

在 `useEffect` 中可以传递第二个参数。

第二个参数是一个数组，在数组中可以指定 `Effect` 的依赖项。

指定后，只有当依赖发生变化时，`Effect` 才会触发

```js
useEffect(() => {
  if(ctx.totalAmount === 0) {
    setShowDetails(false)
    setShowCheckout(false)
  }
}, [ctx, setShowDetails, setShowCheckout])
```

通常会将 `Effect` 中使用的所有局部变量都设置为依赖项，这样一来可以确保这些值发生变化时，会触发 `Effect` 的执行



## 返回值

在 `Effect` 的回调函数中，可以指定一个函数作为返回值。

这个函数可以称其为**清理函数**，它会在下次 `Effect` 执行前调用。

可以在这个函数中做一些工作，来清除上次 `Effect` 执行所带来的影响

- 第一次执行：`Effect` 内部内容
- 第二次执行：`Effect` 返回函数 -> `Effect` 内部内容

```js
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("effect触发了")
    props.onFilter(keyword)
  }, 1000);

  return () => {
    clearTimeout(timer)
  }
}, [keyword])
```

















