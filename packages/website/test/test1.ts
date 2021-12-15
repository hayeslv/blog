/* eslint-disable no-useless-escape */

const str = `<xml><div><p><a/></p><p></p></div></xml>`

interface TNode {
  name: string;
  children: TNode[] | null;
}

const startTagReg: RegExp = /\<(\w+)\>/; // 匹配开始标签
const endTagReg: RegExp = /\<\/(\w+)\>/; // 匹配结束标签
const closeSelfTagReg: RegExp = /\<(\w+)\/\>/; // 匹配自闭合标签
const textNodeReg: RegExp = /\>(.*?)\<\//; // 匹配文本内容
const tagReg: RegExp = /\<\/?(\w+)\/?\>/g; // 全局匹配标签

const matchedTags: string[] = str.match(tagReg); // 在字符串中匹配到的标签数组

let htmlTree: TNode = null; // 保存生成的节点树
const nodeStacks: TNode[] = []; // 保存遍历过程中的节点栈
let currentNode: TNode | undefined = undefined;

// 根据标签创建新节点
function createNode(tag: string): TNode {
  const tagName = tag.replace(tagReg, "$1");
  return {
    name: tagName,
    children: null
  };
}
// 将节点插入到当前操作栈的节点中
function insertNode(node: TNode) {
  if (htmlTree === null) {
    htmlTree = node;
  } else {
    if (currentNode.children === null) {
      currentNode.children = [node];
    } else {
      currentNode.children.push(node);
    }
  }
}

for (const tag of matchedTags) {
  if (startTagReg.test(tag)) {
    // 创建新节点
    const node = createNode(tag);
    // 向树插入新节点
    insertNode(node);
    // 压入栈，并进入该栈
    nodeStacks.push(node);
    currentNode = nodeStacks[nodeStacks.length - 1];
  } else if (endTagReg.test(tag)) {
    // 找栈中的相对应的节点索引
    let index = nodeStacks
      .reverse()
      .findIndex(el => el.name === tag.replace(tagReg, "$1"));
    index = nodeStacks.length - index;
    nodeStacks.reverse();
    // 删除索引外的栈
    nodeStacks.splice(index - 1);
    // 设置删除后的最后一项为当前节点
    currentNode = nodeStacks[nodeStacks.length - 1];
  } else if (closeSelfTagReg.test(tag)) {
    // 创建新节点
    const node = createNode(tag);
    // 插入新节点
    insertNode(node);
    // 自闭合不需要进栈出栈
  }
}

console.log(matchedTags);
console.log(htmlTree);