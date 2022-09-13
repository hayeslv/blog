## 观察用法

```jsx
import React from "react";
React.createElement("h1", { className: "title", style: { color: "red" } }, "hello");
```



## 看看实际转换后的类型

```jsx
let element = <h1 className='title' style={{color: "red"}}>hello</h1>
console.log(element);
```

打印结果

```json
{
  $$typeof: Symbol(react.element),
  key: null,
  props: { className: "title", style: {color: "red"}, children: "hello" },
  ref: null,
  type: "h1",
  _owner: null,
  // ...
}
```



## React

先只实现 props、type、children

```js
// react.js
import { REACT_ELEMENT } from './constants';

function createElement(type, config, children) {
  let ref; // 用来获取真实DOM元素
  let key; // 用来实现DOM-DIFF，高效进行DOM比较
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  const props = { ...config };
  if (arguments.length > 3) {
    // 有多个children，此处就是一个数组
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    // 如果只有一个children，则是对象或字符串
    // 如果没有，则是 undefined
    props.children = wrapToVdom(children);
  }

  return {
    $$typeof: REACT_ELEMENT, // 表示这是一个虚拟DOM，也就是说这是一个React元素
    type, // 虚拟DOM元素的类型
    ref,
    key,
    props, // 属性对象：id、className、style...
  };
}

const React = {
  createElement,
};

export default React;
```



### 声明常量文件

```js
// src/constants.js
// React元素
export const REACT_ELEMENT = Symbol('react.element');

export const REACT_TEXT = Symbol('react.text');
```



### 将普通的字符串也包装成元素

```js
// src/utils.js
import { REACT_TEXT } from './constants';
// 此逻辑在源码中是没有的，这里为了方便后面DOM-DIFF
// 经过包装之后，所有的children元素都是对象了，而且也都有类型，可以方便后面的比较
export function wrapToVdom(element) {
  return typeof element === 'string' || typeof element === 'number'
    ? {
      type: REACT_TEXT,
      props: element,
    }
    : element;
}
```



## ReactDOM

### 使用

```jsx
import React from './react';
import ReactDom from './react-dom';

const element = <h1 className='title' style={{ color: 'red' }}>hello</h1>;

// 把虚拟DOM变为真正的DOM，添加到root这个真实的容器中
ReactDom.render(element, document.getElementById('root'));
```



### 实现

```js
// src/react-dom.js
import { REACT_TEXT } from './constants';

/**
 * 需要把虚拟DOM转换成真实DOM，并且插入容器中
 *
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  mount(vdom, container);
}
function mount(vdom, container) {
  const newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}

function createDOM(vdom) {
  const { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) { // 文本
    dom = document.createTextNode(props);
  } else {
    dom = document.createElement(type);
  }

  if (props) {
    // 更新属性 DOM、老属性对象、新属性对象
    updateProps(dom, {}, props);
    // 更新children
    if (typeof props.children === 'object' && props.children.type) {
      // 说明只有一个children
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      // 协调子节点
      reconcileChildren(props.children, dom);
    }
  }

  return dom;
}

function reconcileChildren(children, parentDom) {
  for (let i = 0; i < children.length; i++) {
    mount(children[i], parentDom);
  }
}

// 更新属性
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (const key in newProps) {
    if (key === 'children') continue; // 这里不处理儿子
    if (key === 'style') {
      const styleObj = newProps[key];
      // 更新dom的style
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      // 虚拟DOM的属性一般来说刚好和dom的属性是相同的，都是驼峰命名：例如className
      dom[key] = newProps[key];
    }
  }
  // 遍历完新的，再遍历老的
  for (const key in oldProps) {
    if (!newProps.hasOwnProperty(key)) { // 这个key在新属性上没有，则需要删除
      dom[key] = null;
    }
  }
}

const ReactDOM = {
  render,
};

export default ReactDOM;
```



## 函数式组件

### 使用

```js
import React from './react';
import ReactDom from './react-dom';

function FunctionComponent(props) {
  return <h1 className='title' style={{ color: 'red' }}>{ props.name }</h1>;
}

// 参数被babel后会变成一个props： { name: "hayes", age: 18 }
const element = <FunctionComponent name="hayes" age={18} />;

ReactDom.render(element, document.getElementById('root'));
```

### 实现

```js
// react-dom
function createDOM(vdom) {
  const { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if(typeof type === "function") { 
    // 新增判断条件，如果是函数的话，就挂载函数式组件
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }

  // ...
}
function mountFunctionComponent(vdom) {
  const { type: FunctionComponent, props } = vdom;
  // type 是一个函数
  const renderVdom = FunctionComponent(props);
  return createDOM(renderVdom);
}
```



## 类组件

### 使用

```js
import React from './react';
import ReactDom from './react-dom';

class ClassComponent extends React.Component {
  render() {
    return <h1 className='title' style={{ color: 'red' }}>{ props.name }</h1>;
  }
}

// 参数被babel后会变成一个props： { name: "hayes", age: 18 }
const element = <ClassComponent name="hayes" age={18} />;

ReactDom.render(element, document.getElementById('root'));
```

### 实现

```js
// react.js
import { Component } from './Component';
const React = {
  createElement,
  Component,
};
```

```js
// Component.js
export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
}
```

















