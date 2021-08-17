### 1、使用elementUI

main.js

```js
import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
createApp(App)
  .use(store)
  .use(router)
  .use(ElementUI)
  .mount('#app');
```



### 2、使用Bus

- Vue到3.0之后的Bus的方式变成了使用mitt。2.0是通过创建一个空的Vue来作为总线
- Vue3.0中使用emit来注册 bus.emit(‘事件’,参数)
- Vue3.0中使用on来监听，bus.on(‘taskLrowClick’, (e)=>{ console.log(e)；其他的逻辑操作 })
- emit和on是成对出现的，一个发起，一个接收，并且接收方可以是多个组件，只要第一个参数匹配，都可以接收到

#### 按需引入，那个组件需要就在哪里引入

（1）安装 mitt

```bash
npm i mitt -S
```

（2）在src目录下创建utils文件夹，文件夹下创建bus.js文件

```js
import mitt from 'mitt';
const bus = mitt()
export default bus;
```

#### 发布方使用

```js
import bus from '@/utils/bus'
setup() {
  const rowClick = (row) => {
    return {
      onClick: () => {
        bus.emit('BusEvent', 'params')
      }
    }
  }
}
```

#### 接受方使用

```js
import bus from '@/utils/bus'
setup() {
  onMounted(() => {
    bus.on('BusEvent', e => {
      console.log(e)
    })
  })
}
```

> 接收方，最好写在onMounted里面，因为mounted自动执行，并且可以赋值给定义好的变量，以便于页面使用传递过来的数据























