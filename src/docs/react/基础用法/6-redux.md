# Redux

一个专为JS应用设计的可预期的状态容器，简单来说 `Redux` 是一个可预测的状态容器。



## State

`state` 直译过来就是**状态**，它就是一个**变量**，一个用来记录（组件）状态的变量。组件可以根据不同的状态值切换不同的显示。

例如用户登录和没登录看到的状态应该是不同的，那么用户的登录与否就应该是一个状态。



## 容器

状态容器即用来保存状态的容器。状态多了，自然需要一个东西来存储，但是容器的功能却不是仅仅能存储状态，它实际上是一个**状态管理器**，除了存储状态外，它还可以用来对 `state` 进行查询、修改等操作。



## 可预测的

可预测是指我们在对 `state` 进行各种操作时，其结果是一定的。即以相同的顺序对 `state` 执行相同的操作会得到相同的结果。

简单来说，`Redux` 中对状态的所有操作都封装到了容器内部，外部只能通过调用容器的方法来操作 `state`，而不能直接修改 `state`。

这就意味着外部对 `state` 的操作都被容器所限制，对 `state` 的操作都在容器的掌控之中，这就是**可预测**。

> 总的来说，`Redux` 是一个稳定的、安全的状态管理器。



## 小结

`Redux` 可以理解为是 `reducer` 和 `context` 的结合体，使用 `Redux` 即可管理复杂的 `state`，又可以在不同的组件间方便的共享传递 `state`。

当然，`Redux` 主要使用场景依然是大型应用。大型应用中状态比较复杂，如果只是使用 `reducer` 和 `context`，开发起来并不是那么便利，此时有一个功能强大的状态管理器就变得尤为重要。



## 使用

1. 引入 `redux` 核心包 
   1. 网页中：`<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>`

2. 创建 `reducer` 整合函数
3. 通过 `reducer` 对象创建 `store`
4. 对 `store` 中的 `state` 进行订阅
5. 通过 `dispatch` 派发 `state` 的操作指令



`state` 表示当前 `state`，可以根据这个 `state` 生成新的 `state`

`action` 是一个 `js` 对象，它里面会保存操作的信息

```js
function reducer(state = { count: 1 }, action) {
  switch(action.type) {
    case "ADD": return { ...state, count: state.count + 1 };
    case "SUB": return { ...state, count: state.count - 1 };
    case "ADD_N": return { ...state, count: state.count + action.payload };
    default: return state;
  } 
}

const store = Redux.createStore(reducer)
// 订阅
store.subscribe(() => {
  // 打印state的值
  // console.log(store.getState())
  countSpan.innerText = store.getState().count
})



subBtn.addEventListener("click", () => {
  store.dispatch({type: "SUB"})
})

addBtn.addEventListener("click", () => {
  store.dispatch({type: "ADD_N", payload: 5})
})
```



## 存在问题

1. 如果 `state` 过于复杂，将会非常难以维护

   1. 可以通过对 `state` 进行分解来解决，通过创建多个 `reducer`，然后将其合并为一个

      ```js
      const reducer = Redux.combineReducers({
        stu: stuReducer,
        school: schoolReducer
      })
      const sotre = Redux.createStore(reducer)
      ```

2. `state` 每次操作时，都需要对 `state` 进行复制，然后再去修改

3. `case` 后面的常量，维护起来会比较麻烦



# Redux Toolkit（RTK）

`Redux` 工具包，可以帮助我们处理使用 `Redux` 过程中的重复性工作，简化 `Redux` 中的各种操作。

```bash
npm install -S react-redux @reduxjs/toolkit
```



- 使用 RTK 创建 `store`

```js
// 使用RTK来构建store
import { createSlice, configureStore } from "@reduxjs/toolkit"

// createSlice 创建 reducer 的切片

// 它需要一个配置对象作为参数，通过对象的不同属性来指定它的配置
const stuSlice = createSlice({
  name: "stu", // 用来自动生成action中的type
  // state的初始值（当前切片的state）
  initialState: {
    name: "孙悟空",
    age: 18,
    gender: "男",
    address: "花果山"
  },
  // 指定state的各种操作
  reducers: {
    setName(state, action) {
      // 可以通过不同的方法来指定对state的不同操作
      // 这里的state是一个代理对象，可以直接修改
      state.name = action.payload // 不用复制其他的内容
    },
    setAge(state, action) {
      state.age = action.payload
    }
  }
})

// 切片对象会自动的帮我们生成action
// actions中存储的是slice自动生成的action创建器（函数），调用函数后会自动创建action对象
// action对象的结构：{ type: name/函数名, payload: 函数的参数 }
export const { setName, setAge } = stuSlice.actions

// const nameAction = setName("哈哈")
// const ageAction = setAge(38)
// console.log(nameAction)
// console.log(ageAction)


// 创建store
const store = configureStore({
  reducer: {
    student: stuSlice.reducer
  }
})

export default store
```

- 在 `index.js` 中引入

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import store from "./store"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

```

- 组件中使用

```jsx
import React from 'react'
import "./store/index"
import { useSelector, useDispatch } from "react-redux"
import { setName } from "./store"

export default function App1() {
  // useSelector() 用来加载state中的数据
  const student = useSelector(state => state.student)
  // 获取派发器对象
  const dispatch = useDispatch()
  // 获取action的构建器
  

  const setNameHandler = () => {
    dispatch(setName("沙和尚"))
  }

  return (
    <div>
      <p>
        {student.name} ---
        {student.age} ---
        {student.gender} ---
        {student.address}
      </p>
      <button onClick={setNameHandler}>修改name</button>
    </div>
  )
}

```

## 拆分 `redux`

- `/store/stuSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit"

const stuSlice = createSlice({
  name: "stu", // 用来自动生成action中的type
  // state的初始值（当前切片的state）
  initialState: {
    name: "孙悟空",
    age: 18,
    gender: "男",
    address: "花果山"
  },
  // 指定state的各种操作
  reducers: {
    setName(state, action) {
      // 可以通过不同的方法来指定对state的不同操作
      // 这里的state是一个代理对象，可以直接修改
      state.name = action.payload // 不用复制其他的内容
    },
    setAge(state, action) {
      state.age = action.payload
    }
  }
})

export const { setName, setAge } = stuSlice.actions
export const { reducer: stuReducer } = stuSlice
```

- `/store/schoolSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit"

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    name: "花果山一小",
    address: "花果山大街28号"
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAddress(state, action) {
      state.address = action.payload
    }
  }
})

export const { setName, setAge } = schoolSlice.actions
export const { reducer: schoolReducer } = schoolSlice
```

- `/store/index.js`

```js
// 使用RTK来构建store
import { configureStore } from "@reduxjs/toolkit"
import { schoolReducer } from "./schoolSlice"
import { stuReducer } from "./stuSlice"

// 创建store
const store = configureStore({
  reducer: {
    student: stuReducer,
    school: schoolReducer
  }
})

export default store
```

- 组件使用

```jsx
import React from 'react'
import "./store/index"
import { useSelector, useDispatch } from "react-redux"
import { setName as setStuName } from "./store/stuSlice"

export default function App1() {
  // const student = useSelector(state => state.student)
  // const school = useSelector(state => state.school)
  // 或者使用如下方式
  const { student, school } = useSelector(state => state)
  // 获取派发器对象
  const dispatch = useDispatch()
  // 获取action的构建器
  

  const setNameHandler = () => {
    dispatch(setStuName("沙和尚"))
  }

  return (
    <div>
      <p>
        {student.name} ---
        {student.age} ---
        {student.gender} ---
        {student.address}
      </p>
      <button onClick={setNameHandler}>修改name</button>

      <hr />

      <p>
        {school.name} ---
        {school.address} 
      </p>
    </div>
  )
}
```



# 连接服务器数据：RTKQ

`RTK` 不仅帮助我们解决了 `state` 的问题，同时它还为我们提供了 `RTK Query` 来帮助处理**数据加载**的问题。

`RTK Query` 是一个强大的数据获取和缓存工具。在它的帮助下，Web 应用中的加载变得十分简单，它使我们不再需要自己编写**获取数据和缓存数据**的逻辑。

**Web应用中加载数据时需要处理的问题：**

1. 根据不同的加载状态显示不同的UI组件
2. 减少对相同数据重复发送请求
3. 使用乐观更新，提示用户体验
4. 在用户与UI交互时，管理缓存的生命周期

这些问题，`RTKQ` 都可以帮助我们处理。首先，可以直接通过 `RTKQ` 想服务器发送请求加载数据，并且 `RTKQ` 会自动对数据进行缓存，避免重复发送不必要的请求。其次`RTKQ` 在发送请求时会根据请求不同的状态返回不同的值，我们可以通过这些值来监视请求发送的过程并随时终止。



## 使用

`RTKQ` 已经集成在 `RTK` 中了，如果我们已经在项目中引入了 `RTK`，则无需再引入其余的模块，如果你不想使用 `RTKQ` 给我们提供的发送请求的方式（简单封装过的 `fetch`），那么你还需引入一下你要使用的发送请求的工具



**创建API切片**

`RTKQ` 中将一组相关功能统一封装到一个 `Api` 对象中，比如：都是学生相关操作统一封装到 `StudentApi` 中，关于学校的相关操作封装到 `ClassApi` 中

```js
// store/studentApi.js
// 这里的导入会自动帮我们生成钩子
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

// 创建Api对象
const studentApi = createApi({
  reducerPath: "studentApi", // Api的标识，不能和其他的Api或Reducer重复
  // 指定查询的基础信息，发送请求的使用工具
  baseQuery:  fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }), 
  // pendpoints用来指定Api中的各种功能，需要一个对象作为返回值
  endpoints(build) { // build是请求的构建器，通过build来设置请求的相关信息
    return {
      getStudents: build.query({
        query() {
          // 用来指定请求的子路径
          return "students"
        },
        // transformResponse 用来转换响应数据的格式
        transformResponse(baseQueryReturnValue) {
          // baseQueryReturnValue 就是返回数据的原始格式
          return baseQueryReturnValue.data
        }
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`
        },
        keepUnusedDataFor: 0, // 设置数据缓存的时间（单位：秒）：0代表不缓存，默认60s
      }),
      delStudent: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: 'delete',
          };
        },
      }),
      // updateStudent: build.mutation()
    }
  }
})
// 钩子函数的命名规则：getStudents --> useGetStudentsQuery
export const {
  useGetStudentsQuery,
  useGetStudentsByIdQuery,
  useDelStudentMudation
} = studentApi

export default studentApi
```

Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数。

通过这些钩子函数，可以向服务器发送请求

钩子函数的命名规则：`getStudents --> useGetStudentsQuery`

- `store` 中使用

```js
// store/index.js
import { configureStore } from "@reduxjs/toolkit"
import studentApi from "./studentApi"

const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer
  },
  // 让缓存生效
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(studentApi.middleware)
  }
})

export default store
```

- `index.js`

```jsx
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import store from "./store"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- 组件中调用api查询数据

```jsx
import { useGetStudentsQuery } from "./store/studentApi"

export default function App1() {
  // 调用Api查询数据
  const { data, isSuccess } = useGetStudentsQuery()

  return (
    <div>
      { isSuccess && data.data.map(v => <p key={v.id}>
        {v.attributes.name} --- 
        {v.attributes.age} --- 
        {v.attributes.gender} --- 
        {v.attributes.address} --- 
      </p>) }
    </div>
  )
}
```



## refetch

一个函数，用来重新加载数据。会忽略缓存，从服务器加载数据

```js
import { useGetStudentsQuery } from './store/studentApi';

export default function App1() {
  const { data, isSuccess, refetch } = useGetStudentsQuery();

  return (
    <div>
      <button onClick={() => refetch()}>刷新</button>
      { isSuccess && data.data.map(v => <p key={v.id}>
        {v.attributes.name} ---
        {v.attributes.age} ---
        {v.attributes.gender} ---
        {v.attributes.address} ---
      </p>) }
    </div>
  );
}
```



## useQuery使用时配置

`useQuery` 可以接收一个对象作为第二个参数，通过该对象来对请求进行配置

```jsx
// App.js
const { data, isSuccess, refetch } = useGetStudentsQuery(null, {
  // 用来指定useQuery返回的结果
  selectFromResult: result => {
    if (result.data) {
      result.data = result.data.filter(v => v.attributes.age < 18);
    }
    return result;
  },
  pollingInterval: 0, // 设置轮询的间隔，单位毫秒，如果为0则不轮询
  // skip: false, // 设置是否跳过当前请求
  skip: !props.id, // 如果有id，则加载详情，否则跳过请求
  refetchOnMountOrArgChange: false, // 是否每次都重新加载数据
  refetchOnFocus: false, // 是否在重新获取焦点时，重载数据（页面切换）
  refetchOnReconnect: false, // 网络中断后重连后，是否重新获取数据
});
```

```js
// store/index.js

...
// 支持 refetchOnFocus、refetchOnReconnect
setupListender(store.dispatch);
```



## 删除数据

```js
// store/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery:  fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }), 
  endpoints(build) {
    return {
      delStudent: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: 'delete',
          };
        },
      }),
    }
  }
})
export const {
  useDelStudentMudation
} = studentApi

export default studentApi
```

- `useMutation` 的钩子返回的是一个数组，数组中是操作的触发器、结果集

```jsx
const Student = (props) => {
  const [deleteStudent, result] = useDelStudentMudation()
  const { isSuccess } = result
  
  const deleteHandler = () => {
    deleteStudent(props.stu.id)
  }
}
```



## 添加/更新数据

- `studentApi.js`

```js
const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  endpoints(build) {
    return {
      addStudent: build.mutation({
        query(stu) {
          return {
            url: `students`,
            method: "post",
            body: { data: stu }
          }
        }
      }),
      updateStudent: build.mutation({
        query(stu) {
          return {
            url: `students/${stu.id}`,
            method: "put",
            body: { data: stu.attributes }
          }
        }
      })
    };
  },
});
export const {
  useAddStudentMutation,
  useUpdateStudentMutation
} = studentApi;
```

- 使用

```jsx
const [addStudent, { isSuccess: isAddSuccess }] = useAddStudentMutation()
const [updateStudent, { isSuccess: isUpdateSuccess }] = useUpdateStudentMutation()

const submitHandler = () => {
  addStudent(inputData)
}

const updateHandler = () => {
  updateStudent({
    id: props.stuId,
    attributes: inputData
  })
}
```



## 设置缓存失效

修改了数据后，再次查询的时候，需要主动让缓存失效

```js
const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  tagTypes: ['student'], // 用来指定Api中的标签类型
  endpoints(build) {
    return {
      getStudentsById: build.query({
        query() {
          return `students/${id}`;
        },
        providesTags: ['student'], // 只要满足其中一个标签失效，就会重新加载数据
      }),
      addStudent: build.mutation({
        query(stu) {
          return {
            url: 'students',
            method: 'post',
            body: { data: stu.attributes },
          };
        },
        invalidatesTags: ['student'], // 使标签失效：当我们调用addStudent去添加学生的时候，它会自动让“带student标签”的数据失效
      }),
    };
  },
});
```

但是这里又有一个问题，其他数据并没有失效，只是当前修改的这个数据缓存失效了

```js
const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  tagTypes: ['student'],
  endpoints(build) {
    return {
      getStudents: build.query({
        query() {
          return `students`;
        },
        providesTags: [{type: "student", id: "LIST"}],
      }),
      getStudentsById: build.query({
        query() {
          return `students/${id}`;
        },
        // 1、返回信息；2、错误信息；3、传参
        providesTags: (result, error, id) => [{type: "student", id: id}],
      }),
      updateStudent: build.mutation({
        query(stu) {
          return {
            url: 'students',
            method: 'put',
            body: { data: stu.attributes },
          };
        },
        // 让指定id的标签失效
        invalidatesTags: (result, error, stu) => [{type: "student", id: stu.id}, {type: "student", id: "LIST"}],
      }),
      addStudent: build.mutation({
        query(stu) {
          return {
            url: 'students',
            method: 'post',
            body: { data: stu.attributes },
          };
        },
        // 让指定id的标签失效
        invalidatesTags: (result, error, stu) => [{type: "student", id: "LIST"}],
      }),
    };
  },
});
```















