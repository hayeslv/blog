# let的实现原理



原始 es6 代码

```js
var funcs = []
for(let i=0; i<10; i++) {
  funcs[i] = function() {
    console.log(i)
  }
}
funcs[0]() // 0
```

`babel` 编译之后的 `es5` 代码（`polyfill`）

```js
var funcs = []
var _loop = function _loop(i) {
  funcs[i] = function() {
    console.log(i)
  }
}

for(var i=0; i<10; i++) {
  _loop(i)
}
funcs[0]() // 0
```

其实我们根据 `babel` 编译之后的结果可以看得出来 `let` 是借助闭包和函数作用域来实现块级作用域的效果的。在不同的情况下， `let` 的编译结果是不一样的。



















