# React-Router



## 版本5

- 安装

```bash
npm install -S react-router-dom@5
```

- 项目中引入

```jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>,
);
```



当 `Route` 的路径被访问，其对应组件就会自动挂载

> 注意，默认情况下 `Route` 并不是严格匹配。只要 `url` 地址的头部和 `path` 一致，组件就会挂载
>
> 使用 `exact`：路径是否完整匹配，默认为 `false`



### 基本使用

```jsx
// app.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';

export default function App() {
  return (
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  );
}
```

```jsx
// Menu.js
export default function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">主页</Link>
        </li>
        <li>
          <Link to="/about">关于</Link>
        </li>
      </ul>
    </div>
  );
}
```

```jsx
// Home.js
export default function Home() {
  return (
    <div>
      <h1>主页中有非常好的内容</h1>
    </div>
  );
}
```

```jsx
// About.js
export default function About() {
  return (
    <div>
      <h2>关于我们</h2>
    </div>
  );
}
```



### NavLink

可以添加激活状态的样式

```jsx
export default function Menu() {
  return (
    <div>
      <ul>
        <li>
          <NavLink exact activeClassName={classes.active} to="/">主页</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={classes.active} to="/about">关于</Link>
        </li>
      </ul>
    </div>
  );
}
```

也可以使用 `activeStyle` 内联样式直接写



### BrowserRoute模式的Nginx配置

```conf
location / {
      root   html;
      index  index.html index.htm;
		  try-files $uri /index.html;
}
```

配置完成后，重启 `nginx`

```bash
D:\nginx\nginx-1.23.1\nginx.exe -s reload
```

> 停止： -s stop



### Route

`component` 属性用来指定路由匹配后被挂载的组件

通过 `component` 构建的组件，它会自动创建组件并且会自动传递参数。

- `match`：匹配的信息
  - `isExact`：检查路径是否完全匹配
  - `params`：请求的参数
- `location`：地址信息
- `history`：控制页面的跳转



**传递参数**

```js
<Route exact path="/about/:id" component={About} />
```

此时访问 `/about/123`，可以再 `About` 组件中看到传参信息：`{ match: { params: { id: 123 } } }`

- 让组件根据不同的参数显示不同的数据

```jsx
const STU_DATA = [
  {
    id: 1,
    name: "孙悟空"
  },
  {
    id: 2,
    name: "猪八戒"
  },
  {
    id: 3,
    name: "沙和尚"
  }
]

export default function About(props) {
  const stu = STU_DATA.find(v => v.id === +props.match.params.id)
  return (
    <div>
      <h2>{stu.id} --- {stu.name}</h2>
    </div>
  );
}
```



### 页面跳转

- `push`：跳转页面

```jsx
export default function About(props) {
  const clickHandler = () => {
    props.history.push({
      pathname: "/"
    })
  }
  return (
    <div>
      <button onClick={clickHandler}>点我跳转</button>
    </div>
  );
}
```



- `replace`：替换页面

```jsx
export default function About(props) {
  const clickHandler = () => {
    props.history.replace({
      pathname: "/",
      state: { name: "哈哈" } // 传参
    })
  }
  return (
    <div>
      <button onClick={clickHandler}>点我跳转</button>
    </div>
  );
}
```



### render 指定要挂载的组件：方便传参

`render` 需要一个回调函数作为参数，回调函数的返回值最终会被挂载

`render` 不会自动传递三个属性（`match、location、history`）

```jsx
// 手动传入
<Route path="/about/:id" render={(routeProps) => <About {...routeProps} />} />
```



### children 也可以指定被挂载的组件

- 用法1：（作用不大）
  - 当 `children` 设置一个回调函数时，该组件无论路径是否匹配，都会挂载

```jsx
<Route path="/about/:id" children={(routeProps) => <About {...routeProps} />} />
```

- 用法2：可以直接传递组件

```jsx
<Route path="/about/:id" children={<About {...routeProps} />} />
```



### 直接通过标签体设置

```jsx
<Route path="/about/:id">
  <About />
</Route>
```

```jsx
<Route path="/about/:id">
  {routeProps => <About {...routeProps} />}
</Route>
```



### 使用钩子函数获取 Route 的参数

```js
const match = useRouteMatch()
const location = useLocation()
const history = useHistory()
const params = useParams()
```



### 路由的嵌套

```jsx
<Route path="/about">
  <About />
  <Route path="/about/hello">
    <Hello />
  </Route>
</Route>
```

- 子路由使用模板字符串

```jsx
// app.js
<Route path="/about">
  <About />
</Route>
```

```jsx
// About.js
export default function About(props) {
  const { path } = useRouteMatch()

  return (
    <div>
      <h2>About</h2>
      
      <Route path={`${path}/hello`}>
        <Hello />
      </Route>
    </div>
  );
}
```



## 版本6

新增组件：`Routes`，作用和 `Switch` 类似，都是用于 `Route` 的容器。`Routes` 中 `Route` 只有一个会被匹配。

v6中，`Route` 的 `component / render / children` 都变了，需要通过 `element` 来指定要挂载的组件



### useMatch

用来检查当前 `url` 是否匹配某个路由

```js
const match = useMatch("/about")
console.log(match)
```

如果路径匹配，则返回一个对象；不匹配则返回 `null`

```js
const match = useMatch("/student/:id")
console.log(match)
```



### useNavigate

获取一个用于跳转条件的函数

```js
const nav = useNavigate()

nav("/about") // 这里使用的是 push，会产生历史记录
nav("/about", { replace: true }) // 使用 replace，不会产生新的记录（替换）
```



### 嵌套路由

v6中默认是严格匹配，但加上 `/*` 后，就关闭了严格匹配

```jsx
// App.js
<Routes>
	<Route path="/about/*" element={<About />} />
</Routes>
```

```jsx
// About.js
<Routes>
  <Route path={"hello"} element={<Hello />} />
</Routes>
```

但是上述的方法嵌套过多，不方便维护

**Outlet**：用来表示嵌套路由中的组件。当嵌套路由中的路径匹配成功了，`Outlet` 则表示嵌套路由中的组件，否则什么都不是

```jsx
// App.js
// 路由为hello，则Outlet匹配Hello组件；路由为abc，则Outlet匹配Abc组件
<Routes>
  <Route path="/about" element={<About />}>
    <Route path='hello' element={<Hello />}></Route>
    <Route path='abc' element={<Abc />}></Route>
  </Route>
</Routes>
```

```jsx
// About.js
export default function About(props) {
  return (
    <div>
      <h2>About</h2>
      <Outlet />
    </div>
  );
}
```



### Navigate组件

用来跳转到指定的位置，默认使用 `push` 跳转，但是跳转回 `About` 页面后，又会被重定向到 `student` 页面

```jsx
<Navigate to="/student/1"></Navigate>
```

可以加入 `replace` 属性

```jsx
<Navigate to="/student/1" replace></Navigate>
```



### NavLink组件

`isActive`：是否选中

```jsx
<NavLink
  style={({ isActive }) => {
    return isActive ? { backgroundColor: "yellow" } : null
  }}
  to="/student/2"
>学生</NavLink>
```





















































