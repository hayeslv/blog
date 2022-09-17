# Context

​		在 `React` 中组件间的数据通信是通过 `props` 进行的，父组件给子组件设置 `props`，子组件给后代组件设置 `props`，`props` 在组件间自上向下（父传子）的逐层传递数据。但并不是所有的数据都适合这种传递方式，有些数据需要再多个组件中共同使用，如果还通过 `props` 一层一层的传统，就很麻烦。

​		`Context` 为我们提供了一种在**不同组件间共享数据的方式**，它不再拘泥于 `props` 刻板的逐层传递，而是在外层组件中统一设置，设置后内层所有的组件都可以访问到 `Context` 中所存储的数据。换句话说，`Context` 类似于 `JS` 中的**全局作用域**，可以将一些公共数据设置到一个同一个 `Context` 中，使得所有的组件都可以访问到这些数据。



## 使用

放在 `src/store` 中

```js
// src/store/testContext.js
import React from "react"

const TestContext = React.createContext({
  name: "孙悟空",
  age: 18
})

export default TestContext
```

- 使用方式1
  - 引入 `context`
  - 使用 `XXX.Consumer` 组件来创建元素

注意，这里包裹的是一个函数，函数的参数 `ctx` 就是我们 `context` 中定义的对象

```jsx
import React from 'react'
import TestContext from '../store/testContext'

export default function A() {
  return (
    <TestContext.Consumer>
      {/* 这里ctx就是我们context中定义的对象 */}
      {(ctx) => {
        return <div>
          {ctx.name} - {ctx.age}
        </div>
      }}
    </TestContext.Consumer>
  )
}
```



- 使用方式二
  - 导入 `Context`
  - 使用钩子函数 `useContext` 获取 `context`
    - `useContext` 需要一个 `Context` 作为参数
    - 它会将 `Context` 中数据获取并作为返回值返回

```jsx
import React, { useContext } from 'react'
import TextContext from "../store/testContext"

export default function B() {
  // 使用钩子函数获取context
  const ctx = useContext(TextContext)

  return (
    <div>
      {ctx.name} -- {ctx.age}
    </div>
  )
}
```

> 注意，因为这种用法是**钩子函数**，所以只能用于**函数组件**，类组件只能用方法一



- 使用方式三：生产者、消费者

`XXX.Provider` 表示数据的生产者，可以使用它来指定 `Context` 中的数据

通过 `value` 来指定 `Context` 中存储的数据

这样一来，在该组件的所有子组件中都可以通过 `Context` 来访问它所指定的数据

```jsx
import React, { useState } from 'react'
import B from './components/B';
import TextContext from "./store/testContext"

export default function App() {
  return (
    <TextContext.Provider value={{name: "猪八戒", age:28}}>
      <div>
        <B />
      </div>
    </TextContext.Provider>
  )
}
```

> 就近原则：当我们通过 `Context` 访问数据时，他会读取离他最近的 `Provider` 中的数据。
>
> 如果没有 `Provider`，则读取 `Context` 中的默认数据

子组件使用

```jsx
import CartContext from '../../../store/cart-context';
import React, { useContext } from 'react'
export default function Counter(props) {

  const ctx = useContext(CartContext)

  const addButtonHandler = () => {
    ctx.addItem(props.meal)
  }

  const subButtonHandler = () => {
    ctx.removeItem(props.meal)
  }

  return (
    <div className={classes.Counter}>
      ...
    </div>
  )
}
```











