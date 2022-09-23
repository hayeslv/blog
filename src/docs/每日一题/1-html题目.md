## 1、打印一个 `html` 中所有不重复的标签

```js
[...new Set([...document.querySelectorAll("*")].map(v => v.tagName))]
```

也就是

```js
const allTag = document.querySelectorAll("*") // allTag是伪数组
const tagList = [...allTag] // 将伪数组转为数组
// 转换数组也可以用如下方式
// Array.prototype.slice.call(allTag)
const tagNameList = tagList.map(v => v.tagName) // 拿出标签名
const result = [...new Set(tagNameList)] // 去重
```

