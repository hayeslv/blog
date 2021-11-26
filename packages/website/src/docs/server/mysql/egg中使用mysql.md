# egg.js中使用egg-mysql操作mysql

### 1、安装egg-mysql

```js
npm i egg-mysql --save
```

### 2、在 {app_root}/config/plugin.js 中启用 egg-mysql 插件:

```js
'use strict';
 
/** @type Egg.EggPlugin */
module.exports = {
    //mysql
    mysql:{
        enable:true,
        package:'egg-mysql',
    }
};
```

### 3、配置 mysql 数据库连接地址 {app_root}/config/config.default.js

```js
config.mysql={
  client:{
    host:'192.168.2.135',
    port:'3306',
    user:'root',
    password:'123',
    database:'pc-comp'
  },
};
```



### 4、建表

```js
await this.app.mysql.query(`
  CREATE TABLE IF NOT EXISTS test_pc(
    id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255),
    deptId INT(11),
    salary FLOAT
  )
`);
```

