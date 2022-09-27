## `patch` 过程

`patch` 过程是一个递归过程，遵循**深度优先、同层比较**策略；以 vue3 的patch为例：

- 首先判断两个节点是否为相同同类节点，不同则删除重新创建
- 如果双方都是文本则更新文本内容
- 如果双方都是元素节点，则递归更新子元素，同时更新元素属性
- 更新子节点时，又分了几种情况：
  - 新的子节点是文本，老的子节点是数组：则清空，并设置文本；
  - 新的子节点是文本，老的子节点是文本：则直接更新文本；
  - 新的子节点是数组，老的子节点是文本：则清空文本，并创建子节点数组中的子元素；
  - 新的子节点是数组，老的子节点也是数组：那么比较两组子节点，更新细节；



## 说一下vue3中的优化

`Vue3` 中引入的更新策略：编译期优化 `pathFlags`、`block`等





## Vue3 Diff --- 最长递增子序列

`vue3` 的 `diff` 借鉴于 [inferno](https://github.com/infernojs/inferno) ，该算法其中有两个理念。第一个是相同的前置和后置元素的预处理；第二个则是最长递增子序列，此思想与 `React` 的 `diff` 类似又不尽相同。



### 1、前置与后置的预处理

我们看这两段文字

```js
Hello World
Hey World
```

其实就简单的看一眼我们就能发现，这两段文字是有一部分是相同的，**这些文字是不需要修改也不需要移动的**，真正需要进行修改中间的几个字母，所以`diff`就变成以下部分。

```js
text1: 'llo'
text2: 'y'
```

接下来换成`vnode`，我们以下图为例。

![1](.\assets\1.png)

图中的被绿色框起来的节点，他们是不需要移动的，只需要进行打补丁`patch`就可以了。我们把该逻辑写成代码。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent)
    j++
    prevNode = prevChildren[j]
    nextNode = nextChildren[j]
  }
  
  prevNode = prevChildren[prevEnd]
  nextNode = prevChildren[nextEnd]
  
  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent)
    prevEnd--
    nextEnd--
    prevNode = prevChildren[prevEnd]
    nextNode = prevChildren[nextEnd]
  }
}
```

这时候，我们就需要考虑边界情况了，这里有两种情况。一种是`j > prevEnd`；另一种是`j > nextEnd`。

![2](.\assets\2.png)

我们以这张图为例，此时`j > prevEnd`且`j <= nextEnd`，我们只需要把**新列表**中`j`到`nextEnd`之间剩下的节点**插入**进去就可以了。相反， 如果`j > nextEnd`时，我们把**旧列表**中`j`到`prevEnd`之间的节点**删除**就可以了。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  // ...
  if (j > prevEnd && j <= nextEnd) {
    let nextpos = nextEnd + 1,
      refNode = nextpos >= nextChildren.length
                ? null
                : nextChildren[nextpos].el;
    while(j <= nextEnd) mount(nextChildren[j++], parent, refNode)
    
  } else if (j > nextEnd && j <= prevEnd) {
    while(j <= prevEnd) parent.removeChild(prevChildren[j++].el)
  }
}
```



### 2、判断是否需要移动

其实几个算法看下来，套路已经很明显了，就是找到移动的节点，然后给他移动到正确的位置。把该加的新节点添加好，把该删的旧节点删了，整个算法就结束了。这个算法也不例外，我们接下来看一下它是如何做的。

当`前/后置`的预处理结束后，我们进入真正的`diff`环节。首先，我们先根据**新列表**剩余的节点数量，创建一个`source`数组，并将数组填满`-1`。

<img src=".\assets\3.png" alt="3"  />

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1);  // 创建数组，填满-1
  }
}
```

那么这个`source`数组，是要做什么的呢？他就是来做新旧节点的对应关系的，我们将**新节点**在**旧列表**的位置存储在该数组中，我们在根据`source`计算出它的`最长递增子序列`用于移动DOM节点。为此，我们先建立一个对象存储当前**新列表**中的`节点`与`index`的关系，再去**旧列表**中去找位置。

在找节点时要注意，**如果旧节点在新列表中没有的话，直接删除就好**。除此之外，我们还需要一个数量表示记录我们已经`patch`过的节点，如果数量已经与**新列表**剩余的节点数量一样，那么剩下的`旧节点`我们就直接删除了就可以了

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1),  // 创建数组，填满-1
      nextIndexMap = {},                      // 新列表节点与index的映射
      patched = 0;                            // 已更新过的节点的数量
      
    // 保存映射关系  
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key
      nextIndexMap[key] = i
    } 
    
    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
      	prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el)
        continue
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i
      patched++
    }
  }
}
```

![4](.\assets\4.png)

找到位置后，我们观察这个重新赋值后的`source`，我们可以看出，如果是全新的节点的话，其在`source`数组中对应的值就是初始的`-1`，通过这一步我们可以区分出来哪个为全新的节点，哪个是可复用的。

其次，我们要判断是否需要移动。那么如何判断移动呢？很简单，和`React`一样我们用递增法，如果我们找到的`index`是一直递增的，说明不需要移动任何节点。我们通过设置一个变量来保存是否需要移动的状态。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1),  // 创建数组，填满-1
      nextIndexMap = {},                      // 新列表节点与index的映射
      patched = 0,
      move = false,                           // 是否移动
      lastIndex = 0;                          // 记录上一次的位置
      
    // 保存映射关系  
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key
      nextIndexMap[key] = i
    } 
    
    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
      	prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el)
        continue
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i
      patched++
      
      // 递增方法，判断是否需要移动
      if (nextIndex < lastIndex) {
      	move = false
      } else {
      	lastIndex = nextIndex
      }
    }
    
    if (move) {
    
    // 需要移动
    } else {
	
    //不需要移动
    }
  }
}
```



### 3、DOM如何移动

判断完是否需要移动后，我们就需要考虑如何移动了。一旦需要进行DOM移动，我们首先要做的就是找到`source`的**最长递增子序列**。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
	const seq = lis(source); // [0, 1]
  // 需要移动
  } else {

  //不需要移动
  }
}
```

> 什么是最长递增子序列：给定一个数值序列，找到它的一个子序列，并且子序列中的值是递增的，子序列中的元素在原序列中不一定连续。
>
> 例如给定数值序列为：[ 0, 8, 4, 12 ]。
>
> 那么它的最长递增子序列就是：[0, 8, 12]。
>
> 当然答案可能有多种情况，例如：[0, 4, 12] 也是可以的。

上面的代码中，我们调用`lis` 函数求出数组`source`的最长递增子序列为`[ 0, 1 ]`。我们知道 source 数组的值为 `[2, 3, 1, -1]`，很显然最长递增子序列应该是`[ 2, 3 ]`，但为什么计算出的结果是`[ 0, 1 ]`呢？其实`[ 0, 1 ]`代表的是最长递增子序列中的各个元素在`source`数组中的位置索引，如下图所示：

![5](.\assets\5.png)

我们根据`source`，对**新列表**进行重新编号，并找出了`最长递增子序列`。

我们从后向前进行遍历`source`每一项。此时会出现三种情况：

1. 当前的值为`-1`，这说明该节点是全新的节点，又由于我们是**从后向前**遍历，我们直接创建好DOM节点插入到队尾就可以了。
2. 当前的索引为`最长递增子序列`中的值，也就是`i === seq[j]`，这说说明该节点不需要移动。
3. 当前的索引不是`最长递增子序列`中的值，那么说明该DOM节点需要移动，这里也很好理解，我们也是直接将DOM节点插入到队尾就可以了，因为队尾是排好序的。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
   // 需要移动
	const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],	// 找到vnode
      	nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
        // 情况1，该节点是全新节点
      	mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
 
  } else {
  //不需要移动
  
  }
}
```

说完了需要移动的情况，再说说不需要移动的情况。如果不需要移动的话，我们只需要判断是否有全新的节点给他添加进去就可以了。具体代码如下：

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
	const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],	// 找到vnode
      	nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
        // 情况1，该节点是全新节点
      	mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
  } else {
    //不需要移动
    for (let i = nextLeft - 1； i >= 0; i--) {
      let cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
       let pos = nextStart + i, // 对应新列表的index
          nextNode = nextChildren[pos],	// 找到vnode
          nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
          refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
      	mount(nextNode, parent, refNode)
      }
    }
  }
}
```





















