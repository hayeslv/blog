# Promise实现并发控制





### 1、null 和 undefined 是其它类型（包括 void）的子类型，可以赋值给其它类型

**默认情况下，编译器会提示错误，这是因为 tsconfig.json 里面有一个配置项是默认开启的。**

```json
// tsconfig.json 

{
 	 /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // 对 null 类型检查，设置为 false 就不会报错了
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
}
```

- **`strictNullChecks`** 参数用于新的严格空检查模式，在严格空检查模式下，null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any



### 2、never 和 void 的区别

- **void 表示没有任何类型（可以被赋值为 null 和 undefined）**。
- **never 表示一个不包含值的类型，即表示永远不存在的值**。
- **拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。**



### 3、枚举成员的特点

- 枚举是只读属性，无法修改
- 枚举成员值默认从 0 开始递增，可以自定义设置初始值





