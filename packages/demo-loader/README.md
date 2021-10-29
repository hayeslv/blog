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







































