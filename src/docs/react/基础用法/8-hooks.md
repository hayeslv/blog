# Hooks



## useMemo

先来看例子

```jsx
function sum(a, b) {
  console.log("函数执行了")
  return a+b
}

export default function App() {
  const [count, setCount] = useState(1)
  const result = sum(123, 456)

  return (
    <div>
      <h1>App</h1>
      <h2>{result}</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(preState => preState + 1)}>点位</button>
    </div>
  );
}
```

此时每次点击按钮，都会打印 `函数执行了`，这是因为 `count` 的变化引发 `App` 组件的重新渲染，然后每次都会执行 `sum` 函数。

如果函数执行的时间很长，则会对性能产生影响

```jsx
function sum(a, b) {
  const begin = Date.now()
  while(1) {
    if(Date.now() - begin > 3000) {
      break
    }
  }

  console.log("函数执行了")
  return a+b
}

export default function App() {
  const [count, setCount] = useState(1)
  const result = sum(123, 456)

  return (
    <div>
      <h1>App</h1>
      <h2>{result}</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(preState => preState + 1)}>点位</button>
    </div>
  );
}
```

此时 `sum` 函数就会阻塞 `App` 组件的渲染。

有些函数不是每次组件渲染都需要执行的，这样的函数我们就可以使用 `useMemo` 来处理

```jsx
function sum(a, b) {
  const begin = Date.now()
  while(1) {
    if(Date.now() - begin > 3000) {
      break
    }
  }

  console.log("函数执行了")
  return a+b
}

export default function App() {
  const [count, setCount] = useState(1)
  // useMemo用来存储函数的执行结果
  const result = useMemo(() => {
    return sum(123, 456)
  }, [])

  return (
    <div>
      <h1>App</h1>
      <h2>{result}</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(preState => preState + 1)}>点位</button>
    </div>
  );
}
```

但是，当依赖项发生变化时，函数又变得会每次都执行了

```jsx
function sum(a, b) {
  const begin = Date.now()
  while(1) {
    if(Date.now() - begin > 3000) {
      break
    }
  }

  console.log("函数执行了")
  return a+b
}

export default function App() {
  const [count, setCount] = useState(1)

  let a = 123
  let b = 456

  if(count % 10 === 0) {
    a += count
  }

  // count能被10整除时，依赖项发生变化，导致每次组件渲染，sum函数会执行
  const result = useMemo(() => {
    return sum(a, b)
  }, [a, b])

  return (
    <div>
      <h1>App</h1>
      <h2>{result}</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(preState => preState + 1)}>点位</button>
    </div>
  );
}
```

`useCallback` 是用来缓存函数的，`useMemo`是用来缓存函数结果的

- `useMemo` 也可以缓存组件

```jsx
export default function App() {
  const [count, setCount] = useState(1)

  const someEle = useMemo(() => {
    return <Some a={10} b={22} />
  }, [])

  return (
    <div>
      <h1>App</h1>
      {someEle}
      <h3>{count}</h3>
      <button onClick={() => setCount(preState => preState + 1)}>点位</button>
    </div>
  );
}
```



## forwardRef / useImperativeHandle

我们无法直接去获取 `react` 组件的 `dom` 对象。

因为一个 `react` 组件可能包含多个 `dom` 对象，`React` 也不知道应该给你哪个。

```jsx
const Some = React.forwardRef((props, ref) => {
  const clickHandler = () => {

  }
  return (
    <div>
      <h2>Some</h2>
      <input ref={ref} type="text" />
      <button onClick={clickHandler}>Some Btn</button>
    </div>
  )
})
export default Some
```

**forwardRef**

使用 `forwardRef` 对组件进行包裹后，组件的第二个参数 `ref` 可以赋值给相应的 `dom` 元素，外部的 `ref` 就会获取到这个 `dom` 了。

```jsx
export default function App() {
  const ref = useRef()
  return (
    <div>
      <h1>App</h1>
      <Some ref={ref} />
      <button onClick={() => console.log(ref)}>点我</button>
    </div>
  );
}
```

此时点击按钮，即可看到控制台可以拿到 `Some` 组件内的 `input`

**useImperativeHandle**

`useImperativeHandle` 可以用来指定 `ref` 返回的值

```jsx
const Some = React.forwardRef((props, ref) => {
  const inputRef = useRef()

  useImperativeHandle(
    ref,
    () => { // 回调函数的返回值，会成为 ref
      return {
        changeInputValue(value) {
          inputRef.current.value = value
        }
      }
    },
  )
  return (
    <div>
      <h2>Some</h2>
      <input ref={inputRef} type="text" />
    </div>
  )
})

export default Some
```

`App` 组件调用

```jsx
export default function App() {
  const someRef = useRef()
  const [count, setCount] = useState(1)

  useEffect(() => {
    someRef.current.changeInputValue(count)
  });

  return (
    <div>
      <h1>App</h1>
      <Some ref={someRef} />
      <button onClick={() => setCount(preState => preState + 1)}>点我</button>
    </div>
  );
}
```



## 3个Effect

`useEffect`、`useInsertionEffect`、`useLayoutEffect`

- `useEffect`：组件挂载 -> state改变 -> DOM改变 -> 绘制屏幕 -> useEffect
- `useInsertionEffect`：组件挂载 -> state改变 -> useInsertionEffect -> DOM改变 -> 绘制屏幕
- `useLayoutEffect`：组件挂载 -> state改变 -> DOM改变 ->useLayoutEffect -> 绘制屏幕

```jsx
export default function App() {
  useEffect(() => {
    console.log("useEffect")
  });
  useLayoutEffect(() => {
    console.log("useLayoutEffect")
  })
  useInsertionEffect(() => {
    console.log("useInsertionEffect")
  })

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}
```

打印顺序：`useInsertionEffect 、 useLayoutEffect 、 useEffect`

- `useInsertionEffect` 访问不到 `ref`

```jsx
export default function App() {
  const ref = useRef()

  useEffect(() => {
    console.log("useEffect", ref)
  });
  useLayoutEffect(() => {
    console.log("useLayoutEffect", ref)
  })
  useInsertionEffect(() => {
    console.log("useInsertionEffect", ref)
  })

  return (
    <div>
      <h1 ref={ref}>App</h1>
    </div>
  );
}
```

打印结果

```
useInsertionEffect {current: undefined}
useLayoutEffect {current: h1}
useEffect {current: h1}
```

此时DOM还没有生成，可以动态向数据中插入一些样式之类的内容

- `useLayoutEffect`是在屏幕渲染之前执行的，`useEffect` 则是在屏幕渲染完成之后执行的

在 `React18` 中，`useEffect` 会动态判断执行时机了



## useDebugValue

给自定义钩子打一个标签，主要在调试中使用



## useDeferredValue

用来设置一个延迟的 `state`，比如我们创建一个 `state`，并使用 `useDeferredValue` 获取延迟值

```jsx
export default function App() {
  console.log("组件重新渲染了~~~")
  const [count, setCount] = useState(1)

  // useDeferredValue 需要一个 state 作为参数，会为该useDeferredValue创建一个延迟值
  // 当设置了延迟值后，每次state修改时都会触发两次重新渲染
  // 这两次执行对于其他的部分没有区别，但是延迟值两次执行的值是不同的
  // 第一次执行，延迟值是state的旧值，第二次执行，延迟值是state的新值
  const deferredCount = useDeferredValue(count)
  console.log(count, deferredCount)

  // useMyHook()

  return (
    <div>
      <h1>App</h1>
      <h3>{count}</h3>
      <button onClick={() => setCount(prevState => prevState + 1)}>点我</button>
    </div>
  );
}
```



## useTransition

当我们在组件中修改 `state` 时，会遇到一些复杂的 `state`，当修改这些 `state` 时，甚至会阻塞到整个应用的运行，为了降低这种 `state` 的影响，`React` 为我们提供了 `useTransition`，通过 `useTransition` 可以降低 `setState` 的优先级。

```js
startTransition(() => {
  setCount(2)
})
```

`startTransition` 的回调函数中设置 `setState` 会在其他的 `setState` 生效后才执行

```js
const [isPending, startTransition] =  useTransition()
```

可以通过 `isPending` 判断执行状态













