使用`webpack`往往离不开loader的安装配置，手写一个`loader`其实非常简单，类似手写一个功能函数，下面我们来实现一个替换字符串的`loader`

### 初始化项目

创建一个根目录`demo-loader`，此目录下 `npm init -y`生成默认的`package.json`文件 ,在文件中配置打包命令

```json
"scripts": {
  "build": "webpack"
}
```

之后`npm i -D webpack webpack-cli`,安装完`webpack`，在根目录 创建配置文件`webpack.config.js`

```js
const path = require('path')
module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

在根目录创建一个`src`目录，里面创建`index.js`,输入`console.log('hello, world')`

之后运行`npm run build`即可打包项目，初始化项目完成



### 编写 replace-loader

根目录创建`loaders`文件夹，里面创建`replaceLoader.js`

```js
module.exports = function(source) {
  const { name } = this.query
  const result = source.replace('world', name)
  return result
}
```

这里我们可以考虑采用官方推荐的`loader-utils`读取`options`配置，也可用`this.query`获取配置对象，`name`是我们在`loader`配置项输入的字段名，`source`是源文件内容，最后需要返回，注意这里不能使用箭头函数，否则`this`指向会有错误，之后便可在`webpack.config.js`配置文件使用这个`loader`

```json
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        options: {
          name: 'dylan'
        }
      }
    }
  ]
}
```

效果是会把`world`替换为`name`中得字符串，`npm run build` 后在`main.js`里面则可以看到此效果



### loader 返回更多内容

官方文档 API 中有`loader`的许多`API` ,除了`this.query`，常用的还有`this.callback`

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap, // 可选参数，返回source-map
  meta?: any // 可选参数，返回meta
);
```

可使用此`API`替代`return`

```js
module.exports = function(source) {
  const { name } = this.query
  const result = source.replace('world', name)
  // return result
  this.callback(null, result)
}
```



### loader 中编写异步代码

在`loader`中编写异步代码需要用`this.async`，我们可以再实现一个异步`loader`，创建`replaceLoderAsync.js`

```js
module.exports = function (source) {
  const options = this.query
  const callback = this.async()

  setTimeout(() => {
    const result = source.replace('world', options.name);
    callback(null, result)
  }, 1000)
}
```

其中`this.async`返回的是`this.callback`，因此可以当做`return`来使用，将`replaceLoder.js`中的代码改为

```js
module.exports = function(source) {
  // const { name } = this.query
  const result = source.replace('dylan', 'dddddd')
  // return result
  this.callback(null, result)
}
```

我们实现先调用异步`loader`，将`world`改为`dylan`，之后再调用同步`loader`将`dylan`改为`dddddd`，在配置文件的相应配置为

```js
const path = require('path')
module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    // 会依次在node_modules、loaders文件夹中查找是否存在对应loader
    modules: [
      path.resolve(__dirname, './node_modules'), 
      path.resolve(__dirname, './loaders')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'replaceLoader.js' },
          {
            loader: 'replaceLoaderAsync.js',
            options: {
              name: 'dylan'
            }
          }
        ]
      }
    ]
  }
}
```

之后运行`npm run build`即可在`dist`的`main.js`验证效果



























