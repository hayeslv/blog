# TypeScript Study

## 一、TS基本类型

### 1、boolean类型

```js
let flag : boolean = false
flag = true
```



### 2、number类型

```js
let flag : number = 1
flag = 2
```



### 3、string类型

```js
let flag : string = 'a'
flag = 'b'
```



### 4、array类型

```js
const list1 : number[] = [1, 2, 3]
// ES5：var list1 = [1, 2, 3]

const list2 : Array<number> = [1, 2, 3] // Array<number>泛型语法
// ES5：var list2 = [1, 2,3 ]
```

**ReadonlyArray类型**

告诉别人，这个数组不能改变！

```js
function doStuff(values : ReadonlyArray<string>) {
// function doStuff(values : readonly string[]) {
  // 我们可以读取values
  const copy = values.slice()
  // 但是我们不能修改vlaues（下面这行代码会报错）
  values.push("hello!") // !类型“readonly string[]”上不存在属性“push”。
}
```

`注意：没有ReadonlyArray这个构造函数，我们不能 new ReadonlyArray(x1, x2 ...)`

但是我们可以把一个常规的Array分配给ReadonlyArray

```js
const myArray : ReadonlyArray<string> = ["red", "green", "blue"]
```



### 5、枚举类型

TypeScript 支持基于数字和基于字符串的枚举。

#### (1) 数字枚举

```js
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir : Direction = Direction.NORTH
dir = Direction.SOUTH
```

默认情况下，NORTH的初始值为0，其余的成员会从1开始自动增长。

也可以设置每个数字的初始值。

#### (2) 字符串枚举

```js
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

#### (3) 常量枚举

使用`const`关键字修饰枚举。

```js
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir : Direction = Direction.NORTH
```

编译成ES5代码：

```js
"use strict";
var dir = 0 /* NORTH */;
```



### 6、any类型

`any`类型：任何类型都能归为`any`类型。

- 可以对`any`类型进行任何操作，不进行类型错误检查。
- 但滥用`any`将丢失`TS`的保护特性



### 7、unknown类型

- 我们可以给`unknown`类型赋任何值。
- 但并不能把`unknown`的值赋给**非unknown、any的类型**。
- 不能对`unknown`类型进行任何操作（与`any`正好相反）。

```js
let value : unknown

// 赋值
const value1 : unknown = value // OK
const value2 : any = value // OK
const value3 : boolean = value // Error

// 操作
value.foo.bar; // Error
value.trim(); // Error
```



### 8、tuple元组类型

#### (1) 元组类型

元组类型：长度和元素类型都确定的数组。

```js
type StringNumberPair = [string, number]
```

该类型数组第一个元素类型为string，第二个元素为number。

#### (2) 元组可选属性

元组可选属性，只能用于最后一个。

```js
type Either2dOr3d = [number, number, number?]
```

#### (3) 元组readonly

readonly 元组类型，即元素不允许发生改变

```js
function doSomething(pair : readonly [string, number]) {
  pair[0] = "hello"; // Error
}
```



### 9、never类型

`never`类型：永不存在的值。常用于`分支收窄`中（if、switch）。

**使用never的好处**

使用never避免出现新增了联合类型没有对应的实现，保证类型安全。

**分支收窄**

我们需要对参数类型进行区分，进行不同操作。此时在一个if中判断一个类型后，在外边TS会自动缩小范围为另一个类型

```js
function padLeft(padding : number | string, input : string) {
  if(typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input
}
```



### 10、void类型

`void`：没有任何类型。例如没有返回值的函数。

```js
function pop() : void{
  
}
```



### 11、null 和 undefined

TypeScript 里，`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`。



### 12、object、Object 和 {} 类型

#### (1) object

非基础类型，基础类型包括`null` 和 `undefined`、`string`、`number`、`boolean`、`symbol`、`bigint`。

#### (2) Object

Object类的实例的类型

#### (3) {} 类型

没有成员的对象，不允许访问该对象的任意属性。

```js
const obj = {}
obj.prop = "age" // Error
```





































