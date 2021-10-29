**1、**监控前端方法错误：可以自己编写`loader`检测业务代码中含有`function`关键字时自动用`try...catch...`包含代码块捕获错误，可以避免自己手写`try...catch...`导致的业务代码的臃肿

**2、**实现网站的中英文替换：可以将文字用占位符包裹，检测到占位符则根据环境变量替换为中英文，伪代码如下

```js
module.exports = function (source) {
  if(Node全局变量 === '中文') {
    source.replace('{{title}}', '中文标题')
  } else {
    source.replace('{{title}}', 'english title')
  }

  const result = source.replace('dylan', 'world');
  this.callback(null, result)
}
```









