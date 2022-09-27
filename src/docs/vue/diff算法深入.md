## 一、前言

`diff` 算法是一种优化手段，将墙厚两个模块进行差异化比较，修补（更新）诧异的过程叫做 `patch`，也叫打补丁。



## 二、为什么要说diff算法

因为 `diff` 算法是 `vue2.x`、`vue3.x` 以及 `react` 中关键核心点，理解 `diff` 算法，更有助于理解各个框架本质。

说到 【`diff` 算法】，就不得不说【虚拟Dom】，因为这两个息息相关。



## 三、虚拟dom的diff算法

**虚拟dom**，就是通过 JS 模拟实现 DOM，接下来难点就是如何判断旧对象和新对象之间的差异。

`DOM` 是多叉树结构，如果需要完整的对比两棵树的差异，那么算法的时间复杂度 `O(n^3)`，这个复杂度很难让人接受



https://interview2.poetries.top/principle-docs/vue/16-diff%E7%AE%97%E6%B3%95%E6%B7%B1%E5%85%A5.html#%E4%BA%8C%E3%80%81%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E8%AF%B4%E8%BF%99%E4%B8%AA-diff-%E7%AE%97%E6%B3%95