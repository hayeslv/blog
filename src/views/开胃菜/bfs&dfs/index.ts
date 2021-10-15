/*
 * @Author: Lvhz
 * @Date: 2021-10-12 17:59:09
 * @Description: 请实现两个函数，遍历所有的DOM节点
 */

const jsdom = require('jsdom');
const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<body>
  <div>
    <div>
      <span></span>
      <span></span>
    </div>
    <a></a>
    <div>
      <span></span>
      <span></span>
    </div>
  </div>
</body>`)

const body = dom.window.document.body;

function *bfs(node: Element): Generator<Element> {
  // const queue = []
  // 数组的 unshift 是一个 O(n)的操作，这里不建议使用
  // queue.unshift() // O(n)
  // queue.pop() // O(1)

  // 队列中放入用j指针，取出用i指针。当i等于j时，代表队列为空
  const queue = new Array<Element>(1000);
  let i=0, j=0;
  queue[j++] = node;

  while(i !== j) {
    const node = queue[i++]
    yield node
    if(node.children) {
      for(let k=0; k<node.children.length; k++) {
        const child = node.children[k]
        queue[j++] = child
      }
    }
  }
}

function *dfs(node: Element): Generator<Element> {
  yield node
  if(node.children) {
    for(let i=0; i<node.children.length; i++) {
      const child = node.children[i]
      yield * dfs(child)
    }
  }
}


console.log('bfs----------');
for(const node of bfs(body)) {
  console.log(node.tagName);
}

console.log('dfs----------');
for(const node of dfs(body)) {
  console.log(node.tagName);
}

// 第6节：23.46
