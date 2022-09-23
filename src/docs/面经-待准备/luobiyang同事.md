## 第一个

介绍：公司内负责的项目数据产品，公司员工展示数据，绩效，公司流水，主要pc端。主要技术栈rn、 react。
总结：基础还不错，有自己的想法和思考，一些问题深度一般，表达能力ok，总体建议通过。

react：react的基础不错【3】
hooks 用ref：回答正确，相比于class的this好处是可以指定暴露方法。
useref 与usememo：回答正确。
useeffect 返回函数: 回答正确。
复杂状态处理：useReducer 、redux有自己的想法。
项目遇到难点：【3-】

时序问题，频繁切换选项数据覆盖问题：通过事件id，后通过依赖绑定和数据缓存。为什么取消请求？考虑过未使用，总体复杂度一般。

组件库：【3】
编译：了解，但细节了解不够。
treeshaking：的注意点，引用方式。

业务组件调用接口处理：【3】

暴露路径参数，与回调方法比较，路径简单，回调方式更灵活。

首屏渲染优化：了解，但深度不够【3-】
界面部分延时加载，懒加载，loding。
指标：fp，fcp，lcp，通过performance获取。
requestanimationframe：处理动画，了解不够。【2.5】

多项目公共包编译以及使用：大致逻辑正确，细节比较模糊。【3-】

总结：
2年团队管理，负责过业务和前端团队，做过toc，tob页面，ide编辑器，前端工程化较深。最近在脉脉，做过全栈开发，项目流程管理，小程序，重构页面。技术方面，node react等，需求文档，技术方案，技术基建：优化上线流程，提升部署速度，回滚能力，配置后台优化，性能指标观察指标，生成在线文档，组织学习小组课题讨论等。表达比较清晰，技术广度不错，一些技术细节记得比较模糊，有一定自己的想法。总体建议通过。

- 研发和管理时间分配：
  - 3开发，7管理以及其他，更多的是方案设计等。
- ide编辑器：
  - 比较早做的，开源富文本编辑器，在线编译代码，实时同步。
- 前端工程化：
 - 目的减少开发时间，前端开发全流程方案。
 - 仓库的组织方式：Monorepo，方面统一管理，统一技术栈等。
 -  Monorepo优缺点：大致理解，Monorepo的互相影响怎么解决，多测试。
 - 编译产物：
  - 单页面编译
  - 公共模块，业务模块，三方模块（多项目共享，cdn方式）。
  - 三方模块webpack配置：回答正确，细节不清楚。
- react hooks vs class：
 -  推荐大家使用hooks，封装直观，问题：依赖设置，闭包。
 -  hooks 用ref：细节不清楚了，使用上理解正确。
 -  两个useState 依赖：尽量避免，中间状态。
- 性能指标：
 - 内部封装模块
 - 基本只关注LCP，兼容性利用模拟方式。
 - fcp，tti等？主要端内场景比较多，html等都离线所以没有太关注。
 - 首屏渲染优化：ssg，ssr。
  - ssr：成本高，相对固定场景和seo。
  - ssg：和骨架屏结合。
组件库的编译：
 - webpack编译：源码和dist，理解的不够深入。
 - 按需加载：按目录，treeshaking。



## 第二个

19年毕业，一直在去哪网做过低代码平台，bff，跨端，技术栈自研类似于react，一些基础原理性东西理解较差，总体建议不通过。

自研跨端框架的原理：loader，loader细节不够清楚。
h5和端的差异怎么兼容：通用函数磨平，其他判断平台。
低代码平台：通过新建组件，配置页面，自上往下排，不支持拖拽。
修改代码场景：组件可以修改。
组件发布：通过私有npm
新老版本问题：独立发布。
浏览器缓存：不了解，没做过
webpack：了解不多。
ssr：没了解过。
h5适配屏幕：rem，rem的原理表达不清。
requestanimationframe:回答错误
链式调用：返回自身。



记录：
总结：
候选人近3年在贝壳找房负责了底层基建，前端监控，低代码，工具类等，也带过业务，技术栈主要是node，react，经验比较丰富，自己做过的东西都能有比较顺畅的回答，表达能力和理解能力都比较好，自己不懂的提示后也有较好的思路总体建议通过。

整体优势&劣势：
优势：沟通能力比较好，技术比较全面。
劣势：深度一般。

nodjs场景：工具链，服务处理bff，也有业务node。【3】
低代码：中后台项目，主要是测试研发自己用，
     方式1：node为服务，json转换为界面，物料通过物料库主要采用antd二次封装。
     方式2：平台方式拖拽方式，无代码。
组件使用的统计方式：通过git抽象语法树分析，埋点。【3】
抽象语法树：基本了解
react hooks vs class：class面向对象，hooks高阶组件更方便，声明周期没有class全。【3-】
哪些生命周期hooks不能实现：记不清了。
hooks模拟this：useref。【3】
hooks用ref：forwardRef.【3】
命令式组件的设计：全局插入节点，细节回答比较模糊【3-】
按需加载：es6的treeshaking【3-】
组件定制主题：css3变量语法，less预编译。【3】
mobx原理：用过，但使用较少猜测监听数据变化。【3-】
编译包的生成：生成了解，默认配置了解，自己打包分为复用多的放到一个，分包路由，第三方dll。【3】
cdn引用dll：回答正确【3】


总结：
技术栈方面：候选人主要使用原生小程序，react，taro小程序等；基础方面：有一定的基础，有些深度不够或者记不清楚，提示后都能回答的比较正确。技术方面：深度比较差，一些原理性东西不了解，聪明程度还不错，感觉自学的比较少。沟通能力方面：表达能力还不错，技术问题上的表达很多比较不顺畅可能有些问题比较紧张，有些不稳重，手上动作比较多。总体建议不通过。

app白屏优化：实践比较少。
骨架屏的实现：实现的很简单。
ssr：知道，没时间过
class vs hooks ：说了hooks是为了解决什么问题。
hooks原理：不清楚。
useeffect：回答正确。
hooks模拟this：useref。
hooks怎么用ref：说的比较含糊。
组件之间通讯：props，事件，context等，了解的比较详细
常见产生性能问题：浅比较，尽量少setstate，虚拟列表，节流。
跟随手指移动的节流：节流时间不清楚。
requestanimationframe：用过忘记了
同源策略：协议，域名，端口。防止cookie风险。跨域：jsonp，cors，代理。跨域传递cookie。
webpack 产物包：了解但细节不清楚


总结：
技术栈方面：做个一段时间php，也做过一段php+前端，后边主要都是前端，前端方面主要是vue和flutter,react也了解。技术方面：基础还可以，深度不足，经验比较丰富，代码能力比较差。沟通方面：表达比较流畅，有时候抓不到重点。总体建议不通过。

首屏渲染：骨架屏，ssr，分包，按需加载，压缩，接口优化，缓存。
ssr遇到的问题：表达没遇到什么问题，说了几个问题他不了解。
骨架屏怎么做的：相当于loading比较简单。复杂的没有比较好的思路。
浏览器缓存的实践：回答正确，表达的有点啰嗦。
组件化：主要是基于三方组件修改。
按需加载：不了解。
多主题：过个配置文件。
编译出的产物js：vendor，main,三方包，大致了解，细节不清楚。
requestanimationframe:不了解。


总结：
技术栈方面：主要是vue，其他react、node等都有做过但是不多，主要偏向于pc平台比较多；技术方面：基础还可以，深度和广度一般，思路比较清晰，代码方面略慢，有一定学习能力；沟通方面：表达良好，遇到不懂的有些紧张。本次达不到一面的3+，缺少亮点。总体建议通过。

技术选型：自己和组内熟悉程度，成熟度，社区成熟。
机器学习平台介绍：流程分析，分词分析，语法分析，前端输入输出。
class 与hooks：react了解的不多
webpack 编译速度优化：回答正确。【3】
编译出来的文件结构：单页一个html，js：main，vendors，懒加载的业务包，对应对应的来源不清楚，细节了解比较少。【3-】
首屏渲染：同构ssr，骨架屏，ssr用过吗：没用过，路由懒加载，cdn，缓存。【3】
怎么增加骨架屏：回答正确。【3】
按需加载：es方式，子目录方式。【3】
treeshaking的问题：副作用，看过一些相关内容，但是记不清了。【3-】
浏览器缓存实践：html协商缓存，其他版本标识hash用强缓存。【3】
promise 的then，await方式：await同步写法更已读，错误处理方便。【3-】
requestanimationframe：动画和帧数有关系，其他不清楚。【2.5】


总结：一直在高途，18年3月到67月份，19年做性能优化，工具化小程序，互动课件，20年往后稳定性，直播sdk。带团队，迭代。20年往后代码比较少，总体广度不错，沟通能力比较好，深度细节差一些，代码能力比较慢可能和最近写代码较少有关，后续可以多考察一些基础和代码。建议3-通过。

首屏性能优化：拆包，cdn，图片压缩，懒加载。【3】
ssr：做了内网优化。【3】
ssr服务端压力比较大怎么处理的：并发不高所以没处理。【3-】
同构异构：环境判断，自动执行的代码怎么处理？【3-】
模块化：es，cjs，amd，cmd。es和cjs的主要影响，细节记不清。【3-】
组件库：架构不太了解，独立组件比较多。【3-】
按需加载的原理：了解使用，细节不清楚。【3-】
react hooks：【2.5】 
hooks原理：不清楚
useeffect的清除函数：细节不清楚
hooks怎么模拟this：没有时间过
webpack loader 和 plugin：了解的可以实践比较少【3-】
code列表转树：实现比较慢，性能一般【3-】

```js
const list = [
  { id: 1, name: 'child1', parentId: 0 },
  { id: 2, name: 'child2', parentId: 0 },
  { id: 6, name: 'child2_1', parentId: 2 },
  { id: 0, name: 'root', parentId: null },
  { id: 5, name: 'child1_2', parentId: 1 },
  { id: 4, name: 'child1_1', parentId: 1 },
  { id: 3, name: 'child3', parentId: 0 },
  { id: 7, name: 'child3_1', parentId: 3 },
];


function findChildren(parentId, list) {
  return list.filter((item) => item.parentId === parentId);
}

function getListChildren(childrenList, list) {
  for(let i = 0; i < childrenList.length; i++) {
      let childrenList = findChildren(childrenList[i].id, list);
      if(childrenList.length) {
          getListChildren(childrenList, list)
      }
  }
}

function parseList(list){
    const rootNode = list.filter((item) => item.name === 'root')[0];
    const findRootChildren = findChildren(rootNode.id, list);
	getListChildren(findRootChildren, list);

}
```



## 真同事

- 实现一个图片懒加载组件
- 手写 `eventbus`
- 跨域、安全
- `vue` 双向绑定的实现、`template` 的编译、`diff`算法
- `webpack` 的编译过程、`loader`、`plugin`
- `rollup` 和 `webpack` 的区别
- `https` 原理
- 错误监控机制
- 接口规范化标准
- `npm` 依赖安全扫描

<img src=".\assets\1.png" alt="1" style="zoom:50%;" />

<img src=".\assets\2.png" alt="2" style="zoom:50%;" />

<img src=".\assets\3.png" alt="3" style="zoom:50%;" />



















