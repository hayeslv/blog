# Reducer

​		在 `React` 的函数组件中，我们可以通过 `useState()` 来创建 `state`。这种创建 `state` 的方式会给我们返回两个东西：`state` 和 `setState()`。`state` 用来读取数据，`setState()` 用来修改数据。

​		但是这种方式也存在着一些不足，因为所有的修改 `state` 的方式都必须通过 `setState()` 来进行，如果遇到一些复杂度比较高的 `state` 时，这种方式似乎就变得不是那么优雅了。



## Reducer 使用

- 原本 `state` 的用法

```jsx
export default function App1() {
  const [count, setCount] = useState(1)

  const addHandler = () => {
    setCount(preState => preState + 1)
  }
  const subHandler = () => {
    setCount(preState => preState - 1)
  }

  return (
    <div>
      <button onClick={subHandler}>减少</button>
      {count}
      <button onClick={addHandler}>增加</button>
    </div>
  )
}
```

- `useReducer`

参数1：整合函数，对于我们当前 `state` 的所有操作都应该在该函数中定义，**该函数的返回值**会成为 `state` 的新值

参数2：`state`初始值

参数3： `init`

返回值：（数组）第一个参数 `state`，第二个参数 `state`修改的**派发器**

通过派发器可以发送操作 `state` 的命令，具体的修改行为将会由另外一个函数执行

`reducer` 在执行时，会收到两个参数：

1. `state`：当前最新的 `state`
2. `action`：需要一个对象，在对象中会存储 `dispatch` 所发送的指令

```js
export default function App1() {
  const [count, countDispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "ADD": return state + 1;
      case "SUB": return state - 1;
      default: return state;
    }
  }, 1)

  const addHandler = () => {
    countDispatch({ type: "ADD" })
  }
  const subHandler = () => {
    countDispatch({ type: "SUB" })
  }


  return (
    <div>
      <button onClick={subHandler}>减少</button>
      {count}
      <button onClick={addHandler}>增加</button>
    </div>
  )
}
```



为了避免 `reducer` 会重复创建，通常 `reducer` 会定义到组件的外部

```js
const countReducer = (state, action) => {
  switch (action.type) {
    case "ADD": return state + 1;
    case "SUB": return state - 1;
    default: return state;
  }
};

export default function App1() {
  const [count, countDispatch] = useReducer(countReducer, 1)

  const addHandler = () => {
    countDispatch({ type: "ADD" })
  }
  const subHandler = () => {
    countDispatch({ type: "SUB" })
  }

  return (
    <div>
      <button onClick={subHandler}>减少</button>
      {count}
      <button onClick={addHandler}>增加</button>
    </div>
  )
}
```







