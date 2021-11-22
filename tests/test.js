/*
 * @Author: Lvhz
 * @Date: 2021-11-04 14:35:41
 * @Description: Description
 */
let data = []; // 数据域
let next = []; // 指针域
// 在index节点后面添加节点p，节点p的值是val
const add = (index, p, val) => {
  next[p] = next[index]; // 往链表中间插入数据时需要
  next[index] = p;
  data[p] = val;
  return;
}
// 构造链表
let head = 3; // 假设头节点的指针为3
data[3] = 0;
add(3, 5, 1);
add(5, 2, 2);
add(2, 7, 3);
add(7, 9, 100);
add(5, 6, 123);
// 访问链表
let p = head;
while(p) {
  console.log('->', data[p]);
  p = next[p];
}