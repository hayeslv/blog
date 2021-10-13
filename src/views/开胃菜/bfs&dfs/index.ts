/*
 * @Author: Lvhz
 * @Date: 2021-10-12 17:59:09
 * @Description: 请实现两个函数，遍历所有的DOM节点
 */

import jsdom from 'jsdom';
const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<body>
  <div>
    <div>
      <span></span>
      <span></span>
    </div>
    <a />
    <div>
      <span></span>
      <span></span>
    </div>
  </div>
</body>`)

const body = dom.window.document.body;

function *bfs(node: HTMLElement): Generator<HTMLElement> {

}

function *dfs(node: HTMLElement): Generator<HTMLElement> {

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
