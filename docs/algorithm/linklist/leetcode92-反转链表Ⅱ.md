# leetcode92-反转链表Ⅱ

<a href="https://leetcode-cn.com/problems/reverse-linked-list-ii/" target="_blank">反转链表Ⅱ</a>

给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 `反转后的链表` 。

```js
输入：head = [1,2,3,4,5], left=2, right=4
输出：[1,4,3,2,5]
```

注意：left和right从1开始

**递归法**

```js
var _reverseN = function(head, n) {
  if(n===1) return head;
  let tail = head.next;
  let p = _reverseN(head.next, n-1);
  head.next = tail.next;
  tail.next = head;
  return p;
}
var reverseBetween = function(head, left, right) {
  if(!head || !head.next) return head;
  let ret = new ListNode(0, head); // 虚拟头节点
  let p = ret;
  let cnt = right - left + 1; // 一共要反转多少位
  while(--left) p = p.next;
  p.next = _reverseN(p.next, cnt);
  return ret.next;
}
```

**迭代法**

```js
var _reverseN = function(head, n) 
  let pre = null, cur = head;
  while(n--) {
    [cur.next, pre, cur] = [pre, cur, cur.next]
  }
	head.next = cur;
	return pre;
}
var reverseBetween = function(head, left, right) {
  if(!head || !head.next) return head;
  let ret = new ListNode(0, head); // 虚拟头节点
  let p = ret;
  let cnt = right - left + 1; // 一共要反转多少位
  while(--left) p = p.next;
  p.next = _reverseN(p.next, cnt);
  return ret.next;
}
```



